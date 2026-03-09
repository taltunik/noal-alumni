import { NextResponse } from 'next/server';
import { getJobs, getEvents } from '@/lib/mock-data';

export async function GET() {
  try {
    const jobs = getJobs(true);
    const events = getEvents(true);

    return NextResponse.json({ jobs, events });
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
