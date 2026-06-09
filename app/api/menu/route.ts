import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for a menu item
const menuItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().gt(0),
  image: z.string().url().optional(),
  available: z.boolean().optional(),
  categoryId: z.string().cuid(),
});

export async function GET() {
  const items = await prisma.menuItem.findMany({
    include: { category: true },
  });
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = menuItemSchema.parse(json);
    const item = await prisma.menuItem.create({
      data,
    });
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
