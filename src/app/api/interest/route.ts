import { NextRequest, NextResponse } from 'next/server';
import { validatePhone, cleanPhone } from '@/lib/validation';
import { addLead } from '@/lib/mock-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const fullName = String(body.fullName || '').trim();
    const phone = cleanPhone(String(body.phone || ''));
    const relatedItemId = String(body.relatedItemId || '');
    const relatedItemType = body.relatedItemType as 'job' | 'event';

    if (!fullName || fullName.length < 2) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!validatePhone(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    if (!relatedItemId || !['job', 'event'].includes(relatedItemType)) {
      return NextResponse.json(
        { error: 'Invalid item reference' },
        { status: 400 }
      );
    }

    const lead = addLead({
      fullName,
      phone,
      relatedItemId,
      relatedItemType,
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
