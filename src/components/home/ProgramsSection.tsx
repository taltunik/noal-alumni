'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

const PROGRAMS = [
  {
    id: 'social-leadership',
    titleKey: 'socialLeadershipTitle' as const,
    descKey: 'socialLeadershipDesc' as const,
    expandedKey: 'socialLeadershipExpanded' as const,
    href: '/programs/social-leadership' as const,
    bgImage: '/images/hero/hero-2.jpg',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
    color: 'primary' as const,
  },
  {
    id: 'leadership-institute',
    titleKey: 'leadershipInstituteTitle' as const,
    descKey: 'leadershipInstituteDesc' as const,
    expandedKey: 'leadershipInstituteExpanded' as const,
    href: '/programs/leadership-institute' as const,
    bgImage: '/images/hero/hero-1.jpg',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
    color: 'accent' as const,
  },
];

const colorStyles = {
  primary: {
    badge: 'bg-primary text-white',
    button: 'bg-primary hover:bg-primary-dark',
    border: 'border-primary/20',
    expandBg: 'bg-primary/5',
  },
  accent: {
    badge: 'bg-accent text-white',
    button: 'bg-accent hover:bg-accent-dark',
    border: 'border-accent/20',
    expandBg: 'bg-accent/5',
  },
};

export default function ProgramsSection() {
  const t = useTranslations('programs');

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4">
        {/* Section heading */}
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              {t('sectionTitle')}
            </h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-muted text-base sm:text-lg">
              {t('sectionSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Program Cards */}
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {PROGRAMS.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                t={t}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ProgramCard({
  program,
  t,
}: {
  program: (typeof PROGRAMS)[number];
  t: ReturnType<typeof useTranslations>;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const styles = colorStyles[program.color];

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-md border ${styles.border} bg-card transition-all duration-300 hover:shadow-lg`}
    >
      {/* Image + Title Area */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="relative w-full h-44 sm:h-52 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-expanded={isExpanded}
      >
        <Image
          src={program.bgImage}
          alt=""
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Content over image */}
        <div className="absolute bottom-0 start-0 end-0 p-5 flex items-end justify-between">
          <div className="flex items-center gap-3">
            <span className={`flex h-10 w-10 items-center justify-center rounded-full ${styles.badge} shadow-lg`}>
              {program.icon}
            </span>
            <div className="text-start">
              <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg">
                {t(program.titleKey)}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                {t(program.descKey)}
              </p>
            </div>
          </div>

          {/* Chevron */}
          <svg
            className={`h-5 w-5 flex-shrink-0 text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Expandable Content */}
      <div
        className={`overflow-hidden transition-all duration-400 ease-in-out ${
          isExpanded ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`p-5 ${styles.expandBg}`}>
          <p className="text-sm sm:text-base text-muted leading-relaxed mb-4">
            {t(program.expandedKey)}
          </p>
          <Link
            href={program.href}
            className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${styles.button}`}
          >
            {t('learnMore')}
            <svg
              className="h-4 w-4 rtl:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
