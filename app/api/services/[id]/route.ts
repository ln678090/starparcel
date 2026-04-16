import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    await prisma.service.delete({ where: { id: id } });
    return NextResponse.json({ message: "Đã xóa" });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await req.json();
    const updated = await prisma.service.update({
        where: { id: id },
        data: {
            name: body.name,
            subtitle: body.subtitle,
            price: body.price,
            features: body.features,
            isPopular: body.isPopular,
        },
    });
    return NextResponse.json(updated);
}