import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getEvents, addEvent, updateEvent, deleteEvent } from '@/lib/mock-data';

async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  return !!session?.value;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const events = getEvents(false);
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const event = addEvent({
      title: body.title || '',
      titleHe: body.titleHe,
      titleAr: body.titleAr,
      titleEn: body.titleEn,
      description: body.description || '',
      descriptionHe: body.descriptionHe,
      descriptionAr: body.descriptionAr,
      descriptionEn: body.descriptionEn,
      date: body.date || '',
      time: body.time || '',
      location: body.location || '',
      imageUrl: body.imageUrl,
      isActive: body.isActive !== false,
    });

    return NextResponse.json({ success: true, event });
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
    const event = updateEvent(id, data);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, event });
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
    const success = deleteEvent(id);

    if (!success) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
