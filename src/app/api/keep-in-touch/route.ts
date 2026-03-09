import { NextResponse } from 'next/server';
import { addKeepInTouchSubmission, getKeepInTouchSubmissions } from '@/lib/mock-data';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, email, town, currentJob, yearActive, branch, memories, wantToVolunteer } = body;

    // Validate required fields
    if (!fullName || fullName.trim().length < 2) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    }

    // Validate phone if provided
    if (phone && !/^05\d{8}$/.test(phone.replace(/[-\s]/g, ''))) {
      return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
    }

    const submission = addKeepInTouchSubmission({
      fullName: fullName.trim(),
      phone: phone || '',
      email: email || '',
      town: town || '',
      currentJob: currentJob || '',
      yearActive: yearActive || '',
      branch: branch || '',
      memories: memories || '',
      wantToVolunteer: wantToVolunteer || '',
    });

    return NextResponse.json({ success: true, id: submission.id });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  const submissions = getKeepInTouchSubmissions();
  return NextResponse.json({ submissions });
}
