import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAnnouncements, addAnnouncement, updateAnnouncement, deleteAnnouncement } from '@/lib/mock-data';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session?.value;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const announcements = getAnnouncements(false);
  return NextResponse.json({ announcements });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const announcement = addAnnouncement({
      title: body.title || '',
      titleHe: body.titleHe,
      titleAr: body.titleAr,
      titleEn: body.titleEn,
      content: body.content || '',
      contentHe: body.contentHe,
      contentAr: body.contentAr,
      contentEn: body.contentEn,
      link: body.link || '',
      color: body.color || 'primary',
      isActive: body.isActive !== false,
    });

    return NextResponse.json({ success: true, announcement });
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
    const announcement = updateAnnouncement(id, data);

    if (!announcement) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, announcement });
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
    const success = deleteAnnouncement(id);

    if (!success) {
      return NextResponse.json({ error: 'Announcement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
