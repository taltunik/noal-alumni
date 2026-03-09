import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getLeads, getAlumni, getKeepInTouchSubmissions } from '@/lib/mock-data';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session?.value;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const leads = getLeads();
    const registrations = getAlumni();
    const keepInTouch = getKeepInTouchSubmissions();

    return NextResponse.json({ leads, registrations, keepInTouch });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
