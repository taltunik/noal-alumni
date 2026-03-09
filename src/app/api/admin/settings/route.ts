import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSiteSettings, updateSiteSettings } from '@/lib/mock-data';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session?.value;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const settings = getSiteSettings();
  return NextResponse.json({ settings });
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const settings = updateSiteSettings(body);
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
