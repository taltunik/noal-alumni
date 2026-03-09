import { NextRequest, NextResponse } from 'next/server';
import { validateRegistration, cleanPhone } from '@/lib/validation';
import { addAlumni } from '@/lib/mock-data';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot check: if filled, silently return success
    if (body.website) {
      return NextResponse.json({ success: true });
    }

    const data = {
      fullName: String(body.fullName || ''),
      phone: cleanPhone(String(body.phone || '')),
      town: String(body.town || ''),
      birthYear: Number(body.birthYear),
      website: body.website,
    };

    const validation = validateRegistration(data);
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Validation failed', details: validation.errors },
        { status: 400 }
      );
    }

    const alumni = addAlumni({
      fullName: data.fullName,
      phone: data.phone,
      email: String(body.email || ''),
      town: data.town,
      birthYear: data.birthYear,
      currentJob: String(body.currentJob || ''),
      yearActive: String(body.yearActive || ''),
      branch: String(body.branch || ''),
    });

    return NextResponse.json({ success: true, id: alumni.id });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
