'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import JobCard from '@/components/careers-events/JobCard';
import EventCard from '@/components/careers-events/EventCard';
import InterestModal from '@/components/careers-events/InterestModal';
import type { Job, CommunityEvent } from '@/types';

type Filter = 'all' | 'jobs' | 'events';

export default function CareersEventsContent() {
  const t = useTranslations('careersEvents');

  const [filter, setFilter] = useState<Filter>('all');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [events, setEvents] = useState<CommunityEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<{
    id: string;
    type: 'job' | 'event';
    title: string;
  } | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/careers-events');
        const data = await res.json();
        setJobs(data.jobs || []);
        setEvents(data.events || []);
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function handleInterest(id: string, title: string, type: 'job' | 'event') {
    setModalItem({ id, type, title });
    setModalOpen(true);
  }

  const FILTERS: { key: Filter; label: string }[] = [
    { key: 'all', label: t('all') },
    { key: 'jobs', label: t('jobs') },
    { key: 'events', label: t('events') },
  ];

  const showJobs = filter === 'all' || filter === 'jobs';
  const showEvents = filter === 'all' || filter === 'events';
  const hasResults = (showJobs && jobs.length > 0) || (showEvents && events.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          {t('title')}
        </h1>
        <p className="mt-2 text-lg text-muted">{t('subtitle')}</p>
        <div className="mt-4 flex justify-center">
          <span className="inline-block h-1 w-20 rounded-full bg-accent" />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-lg bg-white border border-border p-1 gap-1">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={clsx(
                'rounded-md px-5 py-2 text-sm font-medium transition-all duration-200 cursor-pointer',
                filter === key
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-foreground hover:bg-card-hover'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )}

      {/* Content */}
      {!loading && !hasResults && (
        <div className="text-center py-12">
          <p className="text-lg text-muted">{t('noResults')}</p>
        </div>
      )}

      {!loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {showJobs &&
            jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onInterest={(id, title) => handleInterest(id, title, 'job')}
              />
            ))}
          {showEvents &&
            events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onInterest={(id, title) => handleInterest(id, title, 'event')}
              />
            ))}
        </div>
      )}

      {/* Interest Modal */}
      {modalItem && (
        <InterestModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setModalItem(null);
          }}
          itemId={modalItem.id}
          itemType={modalItem.type}
          itemTitle={modalItem.title}
        />
      )}
    </div>
  );
}
