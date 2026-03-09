import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getJobs, addJob, updateJob, deleteJob } from '@/lib/mock-data';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session?.value;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const jobs = getJobs(false);
  return NextResponse.json({ jobs });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const job = addJob({
      title: body.title || '',
      titleHe: body.titleHe,
      titleAr: body.titleAr,
      titleEn: body.titleEn,
      company: body.company || '',
      location: body.location || '',
      description: body.description || '',
      descriptionHe: body.descriptionHe,
      descriptionAr: body.descriptionAr,
      descriptionEn: body.descriptionEn,
      type: body.type || 'full-time',
      contactPhone: body.contactPhone,
      contactEmail: body.contactEmail,
      isActive: body.isActive !== false,
    });

    return NextResponse.json({ success: true, job });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ...data } = body;
    const job = updateJob(id, data);

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, job });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await req.json();
    const success = deleteJob(id);

    if (!success) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
