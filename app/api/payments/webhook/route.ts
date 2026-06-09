import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2026-05-27.dahlia' as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? '';

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature') ?? '';
  const buf = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed.', err);
    return new NextResponse('Invalid signature', { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID' },
      });
      // Send email notification
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
      const mailOptions = {
        from: `"ElevateX" <${process.env.EMAIL_USER}>`,
        to: 'owner@example.com', // replace with real recipient if needed
        subject: 'New payment received',
        text: `Payment for order ${orderId} completed. Stripe session ID: ${session.id}`,
      };
      try {
        await transporter.sendMail(mailOptions);
        console.log('✅ Email sent for order', orderId);
      } catch (emailErr) {
        console.error('❗️ Failed to send email', emailErr);
      }
    }
  }

  return new NextResponse('OK', { status: 200 });
}
