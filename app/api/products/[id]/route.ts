import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

// 1. Hàm XÓA (DELETE)
export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params; // Đừng quên await params ở Next.js 15+

    try {
        await prisma.product.delete({
            where: { id: id },
        });
        return NextResponse.json({ message: "Đã xóa thành công" });
    } catch (error) {
        return NextResponse.json(
            { message: "Không tìm thấy sản phẩm hoặc lỗi hệ thống" },
            { status: 500 }
        );
    }
}

// 2. Thêm Hàm SỬA (PATCH) vào đây!
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        const body = await req.json(); // Lấy dữ liệu gửi lên từ form

        const updatedProduct = await prisma.product.update({
            where: { id: id },
            data: {
                name: body.name,
                price: body.price,
                img: body.img,
                tag: body.tag,
            },
        });

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error("Lỗi khi update:", error);
        return NextResponse.json(
            { message: "Lỗi khi cập nhật sản phẩm" },
            { status: 500 }
        );
    }
}