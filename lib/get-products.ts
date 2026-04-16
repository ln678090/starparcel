import { prisma } from "@/lib/prisma";

export async function getProducts() {
    try {
        // Lấy dữ liệu trực tiếp từ DB
        const products = await prisma.product.findMany({
            orderBy: { id: 'asc' } // Hoặc sắp xếp theo createdAt
        });
        return products;
    } catch (error) {
        console.error("Lỗi lấy sản phẩm:", error);
        return [];
    }
}