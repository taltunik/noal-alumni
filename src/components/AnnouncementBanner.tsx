'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import type { Announcement } from '@/types';

const COLOR_MAP: Record<string, string> = {
  primary: 'bg-primary text-white',
  accent: 'bg-accent text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-amber-500 text-white',
};

export default function AnnouncementBanner() {
  const locale = useLocale();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load dismissed IDs from localStorage
    try {
      const stored = localStorage.getItem('dismissed-announcements');
      if (stored) setDismissed(new Set(JSON.parse(stored)));
    } catch { /* ignore */ }

    // Fetch active announcements
    fetch('/api/announcements')
      .then((res) => res.ok ? res.json() : { announcements: [] })
      .then((data) => setAnnouncements(data.announcements || []))
      .catch(() => {});
  }, []);

  function dismiss(id: string) {
    const updated = new Set(dismissed);
    updated.add(id);
    setDismissed(updated);
    try {
      localStorage.setItem('dismissed-announcements', JSON.stringify([...updated]));
    } catch { /* ignore */ }
  }

  // Get localized title
  function getTitle(ann: Announcement): string {
    if (locale === 'he' && ann.titleHe) return ann.titleHe;
    if (locale === 'en' && ann.titleEn) return ann.titleEn;
    return ann.title; // default Arabic
  }

  // Get localized content
  function getContent(ann: Announcement): string {
    if (locale === 'he' && ann.contentHe) return ann.contentHe;
    if (locale === 'en' && ann.contentEn) return ann.contentEn;
    return ann.content;
  }

  const visible = announcements.filter((a) => !dismissed.has(a.id));
  if (visible.length === 0) return null;

  return (
    <div className="space-y-0">
      {visible.map((ann) => {
        const colorClass = COLOR_MAP[ann.color] || COLOR_MAP.primary;
        const title = getTitle(ann);
        const content = getContent(ann);

        return (
          <div key={ann.id} className={`${colorClass} relative`}>
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold">
                  {title}
                  {content && <span className="font-normal ms-2 opacity-90">{content}</span>}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {ann.link && (
                  <a
                    href={ann.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white/20 px-3 py-1 text-xs font-medium hover:bg-white/30 transition-colors"
                  >
                    &rarr;
                  </a>
                )}
                <button
                  onClick={() => dismiss(ann.id)}
                  className="rounded-full p-1 hover:bg-white/20 transition-colors cursor-pointer"
                  aria-label="Dismiss"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
