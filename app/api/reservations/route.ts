import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';

// Validation schema for a reservation
const reservationSchema = z.object({
  tableId: z.string().cuid(),
  customerName: z.string().min(1),
  phone: z.string().min(1),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
  time: z.string().refine((val) => /^\d{2}:\d{2}$/.test(val), { message: 'Invalid time' }),
  partySize: z.number().int().min(1),
});

export async function GET() {
  const reservations = await prisma.reservation.findMany({
    include: { table: true },
    orderBy: { date: 'desc' },
  });
  return NextResponse.json(reservations);
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const data = reservationSchema.parse(json);
    const reservation = await prisma.reservation.create({
      data,
    });
    return NextResponse.json(reservation, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
