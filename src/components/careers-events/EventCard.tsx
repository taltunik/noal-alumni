'use client';

import { useLocale, useTranslations } from 'next-intl';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';
import type { CommunityEvent } from '@/types';

interface EventCardProps {
  event: CommunityEvent;
  onInterest: (id: string, title: string) => void;
}

export default function EventCard({ event, onInterest }: EventCardProps) {
  const locale = useLocale();
  const t = useTranslations('careersEvents');

  const title = locale === 'he' ? (event.titleHe || event.title) : locale === 'en' ? (event.titleEn || event.title) : event.title;
  const description = locale === 'he' ? (event.descriptionHe || event.description) : locale === 'en' ? (event.descriptionEn || event.description) : event.description;

  return (
    <Card hover className="border-s-4 border-s-accent">
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>

        <div className="flex flex-wrap gap-4 text-sm text-muted mb-3">
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatDate(event.date, locale)}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted line-clamp-3 mb-4 flex-1">{description}</p>

        <Button
          variant="accent"
          size="sm"
          onClick={() => onInterest(event.id, title)}
          className="w-full"
        >
          {t('interested')}
        </Button>
      </div>
    </Card>
  );
}
