import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const services = await prisma.service.findMany();
    return NextResponse.json(services);
}

export async function POST(req: Request) {
    const body = await req.json();
    const service = await prisma.service.create({
        data: {
            name: body.name,
            subtitle: body.subtitle,
            price: body.price,
            features: body.features,
            isPopular: body.isPopular,
        },
    });
    return NextResponse.json(service);
}