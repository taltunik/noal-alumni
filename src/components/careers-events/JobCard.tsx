'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import type { Job } from '@/types';

interface JobCardProps {
  job: Job;
  onInterest: (id: string, title: string) => void;
}

export default function JobCard({ job, onInterest }: JobCardProps) {
  const locale = useLocale();
  const t = useTranslations('careersEvents');

  const title = locale === 'he' ? (job.titleHe || job.title) : locale === 'en' ? (job.titleEn || job.title) : job.title;
  const description = locale === 'he' ? (job.descriptionHe || job.description) : locale === 'en' ? (job.descriptionEn || job.description) : job.description;

  const typeLabel =
    job.type === 'full-time'
      ? t('fullTime')
      : job.type === 'part-time'
        ? t('partTime')
        : t('volunteerType');

  const typeBg =
    job.type === 'full-time'
      ? 'bg-primary/10 text-primary'
      : job.type === 'part-time'
        ? 'bg-amber-100 text-amber-800'
        : 'bg-green-100 text-green-800';

  return (
    <Card hover>
      <div className="flex flex-col h-full">
        {/* Attachment: Image */}
        {job.attachmentUrl && job.attachmentType === 'image' && (
          <div className="-mx-6 -mt-6 mb-4 rounded-t-xl overflow-hidden">
            <Image
              src={job.attachmentUrl}
              alt={title}
              width={400}
              height={200}
              className="w-full h-40 object-cover"
            />
          </div>
        )}

        {/* Attachment: PDF */}
        {job.attachmentUrl && job.attachmentType === 'pdf' && (
          <div className="mb-3 rounded-lg bg-red-50 border border-red-200 p-3 flex items-center gap-2">
            <svg className="h-6 w-6 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <a
              href={job.attachmentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-700 hover:underline font-medium"
            >
              PDF &rarr;
            </a>
          </div>
        )}

        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${typeBg}`}>
            {typeLabel}
          </span>
        </div>

        <p className="text-sm font-medium text-primary mb-1">{job.company}</p>

        <div className="flex items-center gap-1 text-sm text-muted mb-3">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{job.location}</span>
        </div>

        <p className="text-sm text-muted line-clamp-3 mb-4 flex-1">{description}</p>

        <Button
          variant="primary"
          size="sm"
          onClick={() => onInterest(job.id, title)}
          className="w-full"
        >
          {t('interested')}
        </Button>
      </div>
    </Card>
  );
}
