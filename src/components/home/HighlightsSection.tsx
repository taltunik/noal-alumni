'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

const CARDS = [
  {
    titleKey: 'eventsTitle',
    descKey: 'eventsDesc',
    buttonKey: 'eventsButton',
    href: '/careers-events',
    bgImage: '/images/hero/hero-7.jpg',
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
      </svg>
    ),
    color: 'primary' as const,
  },
  {
    titleKey: 'jobsTitle',
    descKey: 'jobsDesc',
    buttonKey: 'jobsButton',
    href: '/careers-events',
    bgImage: '/images/hero/hero-6.jpg',
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
      </svg>
    ),
    color: 'accent' as const,
  },
  {
    titleKey: 'volunteerTitle',
    descKey: 'volunteerDesc',
    buttonKey: 'volunteerButton',
    href: '/keep-in-touch',
    bgImage: '/images/hero/hero-5.jpg',
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    color: 'primary' as const,
  },
] as const;

const colorStyles = {
  primary: {
    iconBg: 'bg-primary',
    iconText: 'text-white',
    border: 'border-t-primary',
    button: 'bg-primary hover:bg-primary-dark text-white',
    titleColor: 'text-primary',
  },
  accent: {
    iconBg: 'bg-accent',
    iconText: 'text-white',
    border: 'border-t-accent',
    button: 'bg-accent hover:bg-accent-dark text-white',
    titleColor: 'text-accent',
  },
};

export default function HighlightsSection() {
  const t = useTranslations('home');

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              {t('highlightsTitle')}
            </h2>
            <SectionBar className="mt-4" />
          </div>
        </ScrollReveal>

        {/* 3 Cards Grid */}
        <ScrollReveal stagger className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {CARDS.map((card) => {
              const styles = colorStyles[card.color];
              return (
                <div
                  key={card.titleKey}
                  className={`group relative flex flex-col items-center rounded-xl overflow-hidden shadow-lg border-t-4 ${styles.border} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 min-h-[280px]`}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={card.bgImage}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Default: dark gradient so title is readable over image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-opacity duration-400 group-hover:opacity-0" />
                    {/* Hover: white overlay for text/icon readability */}
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                  </div>

                  {/* === DEFAULT STATE: Image + bold title === */}
                  <div className="relative z-10 flex flex-col items-center justify-end h-full w-full p-8 transition-opacity duration-400 group-hover:opacity-0">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center drop-shadow-lg">
                      {t(card.titleKey)}
                    </h3>
                  </div>

                  {/* === HOVER STATE: Icon + title + description + button === */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 opacity-0 translate-y-4 transition-all duration-400 group-hover:opacity-100 group-hover:translate-y-0">
                    {/* Icon */}
                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${styles.iconBg} ${styles.iconText} shadow-lg`}>
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h3 className={`mb-2 text-xl font-extrabold ${styles.titleColor} text-center`}>
                      {t(card.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className="mb-4 text-sm text-foreground/70 text-center leading-relaxed">
                      {t(card.descKey)}
                    </p>

                    {/* Button */}
                    <Link
                      href={card.href}
                      className={`inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-semibold shadow-md transition-all duration-200 hover:shadow-lg ${styles.button}`}
                    >
                      {t(card.buttonKey)}
                    </Link>
                  </div>
                </div>
              );
            })}
        </ScrollReveal>
      </div>
    </section>
  );
}
