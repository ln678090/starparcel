import { prisma } from "@/lib/prisma";

export async function getServices() {
    return await prisma.service.findMany({
        orderBy: { price: 'asc' } // Sắp xếp giá từ thấp đến cao
    });
}