// Developed by ElevateX
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { z } from 'zod';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-05-27.dahlia' as any,
});

const checkoutSchema = z.object({
  orderId: z.string().cuid(),
});

export async function POST(req: Request) {
  try {
    const { orderId } = checkoutSchema.parse(await req.json());
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: { include: { menuItem: true } } },
    });
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    const lineItems = order.items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.menuItem.name },
        unit_amount: Math.round(Number(item.menuItem.price) * 100),
      },
      quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/checkout?orderId=${orderId}`,
    });
    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }
}
