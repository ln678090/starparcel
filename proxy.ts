import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isAuth = request.cookies.get('admin_token');

    // Nếu người dùng đang cố vào trang /admin (nhưng không phải trang login)
    if (path.startsWith('/admin') && path !== '/admin/login') {
        // Mà chưa có cookie đăng nhập -> Đuổi ra trang /
        if (!isAuth) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    // Nếu muốn bảo vệ cả đường dẫn API Thêm/Xóa sản phẩm không cho hacker gọi từ ngoài
    if (path.startsWith('/api/products') && request.method !== 'GET') {
        if (!isAuth) {
            return NextResponse.json({ message: "Không có quyền!" }, { status: 401 });
        }
    }

    return NextResponse.next();
}

// Chỉ định những đường dẫn nào anh bảo vệ cần đứng canh
export const config = {
    matcher: ['/admin/:path*', '/api/products/:path*'],
};