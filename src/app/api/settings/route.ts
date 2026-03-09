import { NextResponse } from 'next/server';
import { getSiteSettings } from '@/lib/mock-data';

export async function GET() {
  const settings = getSiteSettings();
  return NextResponse.json({ settings });
}
