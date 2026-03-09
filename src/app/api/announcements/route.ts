import { NextResponse } from 'next/server';
import { getAnnouncements } from '@/lib/mock-data';

export async function GET() {
  const announcements = getAnnouncements(true);
  return NextResponse.json({ announcements });
}
