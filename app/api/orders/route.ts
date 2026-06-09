import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for an order
const orderSchema = z.object({
  tableId: z.string().cuid(),
  items: z.array(
    z.object({
      menuItemId: z.string().cuid(),
      quantity: z.number().int().min(1),
    })
  ),
});

export async function GET() {
  const orders = await prisma.order.findMany({
    include: { items: { include: { menuItem: true } }, table: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = orderSchema.parse(json);
    // Fetch menu items to calculate total price
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: data.items.map((i) => i.menuItemId) } },
      select: { id: true, price: true },
    });
    const priceMap = Object.fromEntries(menuItems.map((m) => [m.id, Number(m.price)]));
    const total = data.items.reduce((sum, i) => sum + (priceMap[i.menuItemId] || 0) * i.quantity, 0);
    const order = await prisma.order.create({
      data: {
        tableId: data.tableId,
        status: 'PENDING',
        total: total,
        items: {
          create: data.items.map((i) => ({
            menuItemId: i.menuItemId,
            quantity: i.quantity,
          })),
        },
      },
    });
    return NextResponse.json(order, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
