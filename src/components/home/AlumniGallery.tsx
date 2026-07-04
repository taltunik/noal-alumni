'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';
import YouTubePlayer from '@/components/ui/YouTubePlayer';

// Fields where movement alumni lead today — icon per field
const FIELDS = [
  {
    id: 1,
    // Academic cap — education
    icon: 'M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
  },
  {
    id: 2,
    // Heart — medicine & health
    icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z',
  },
  {
    id: 3,
    // Code brackets — hi-tech
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
  },
  {
    id: 4,
    // Book — academia & research
    icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
  },
  {
    id: 5,
    // Building — local government
    icon: 'M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m7.5-10.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z',
  },
  {
    id: 6,
    // People group — civil society
    icon: 'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  },
  {
    id: 7,
    // Scales — law
    icon: 'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z',
  },
  {
    id: 8,
    // Music note — culture & arts
    icon: 'M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z',
  },
];

export default function AlumniGallery() {
  const t = useTranslations('home');

  return (
    <section className="bg-background py-16 sm:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              {t('alumniTitle')}
            </h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-muted text-base">
              {t('alumniSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Layout: field cards next to video */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">
          {/* YouTube Shorts video — right side in RTL */}
          <ScrollReveal direction="right" className="shrink-0">
            <div className="w-56 sm:w-64 lg:w-72">
              <YouTubePlayer
                videoId="yp1mQcZhxBg"
                title={t('alumniVideoTitle')}
                aspectClass="aspect-[9/16]"
                showControls={false}
                className="rounded-2xl shadow-xl border-4 border-primary/10"
              />
            </div>
          </ScrollReveal>

          {/* Field cards — 2 rows of 4 */}
          <ScrollReveal direction="left" className="flex-1">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 justify-items-center">
              {FIELDS.map((field) => (
                <div
                  key={field.id}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Circle icon */}
                  <div className="flex h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 items-center justify-center rounded-full bg-primary-light border-3 border-primary/20 shadow-md transition-all duration-300 group-hover:border-primary group-hover:shadow-xl group-hover:scale-105 group-hover:bg-primary group-hover:text-white text-primary">
                    <svg
                      className="h-9 w-9 sm:h-11 sm:w-11 transition-transform duration-300 group-hover:scale-110"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={field.icon} />
                    </svg>
                  </div>

                  {/* Field name */}
                  <h3 className="mt-3 text-sm sm:text-base font-bold text-primary leading-tight">
                    {t(`alumniField${field.id}Name`)}
                  </h3>

                  {/* Who */}
                  <p className="mt-1 text-[11px] sm:text-xs text-muted leading-tight">
                    {t(`alumniField${field.id}Role`)}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
