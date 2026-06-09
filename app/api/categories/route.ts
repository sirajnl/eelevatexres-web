import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { items: true },
  });
  return NextResponse.json(categories);
}
