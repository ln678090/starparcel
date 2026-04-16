import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
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

        return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, message: "Sai mật khẩu!" }, { status: 401 });
}