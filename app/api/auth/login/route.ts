import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {Ratelimit} from "@upstash/ratelimit";
import {Redis} from "@upstash/redis";

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});
const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
});

export async function POST(req: Request) {
    try {


        // Lấy IP của người dùng (Vercel tự động cung cấp qua header)
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

        // Kiểm tra xem IP này có vi phạm luật (5 lần/phút) không
        const {success} = await ratelimit.limit(ip);

        if (!success) {
            // Nếu vi phạm, đá văng ngay lập tức không cần xét mật khẩu
            return NextResponse.json(
                {success: false, message: "Bạn nhập sai quá nhiều. Vui lòng đợi 1 phút rồi thử lại."},
                {status: 429} // 429 là mã lỗi chuẩn quốc tế cho "Too Many Requests"
            );
        }

        const body = await req.json();


        if (body.password === process.env.ADMIN_PASSWORD) {
            // Nếu đúng pass, tạo cookie tên là 'admin_token'
            const cookieStore = await cookies();
            cookieStore.set("admin_token", "da-dang-nhap", {
                httpOnly: true, // Chống hacker đánh cắp bằng JavaScript (XSS)
                secure: process.env.NODE_ENV === "production", // Chỉ chạy trên HTTPS khi deploy
                maxAge: 60 * 60 * 24, // Sống trong 1 ngày
                path: "/",
            });

            return NextResponse.json({success: true});
        }
        return NextResponse.json({success: false, message: "Sai mật khẩu!"}, {status: 401});

    } catch (error) {
        console.error("Lỗi login:", error);
        return NextResponse.json({success: false, message: "Lỗi hệ thống"}, {status: 500});
    }
}