import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendLeadNotification } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, businessName, phone, email, service, budget, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: { name, businessName, phone, email, service, budget, message },
    });

    // Send email notification (async, don't block response)
    sendLeadNotification({ name, email, businessName, phone, service, budget, message }).catch(console.error);

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (error) {
    console.error('Lead creation error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(leads);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
