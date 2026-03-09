'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

export default function RegistrationForm() {
  const t = useTranslations('home');

  return (
    <section className="relative bg-white py-16 sm:py-20">
      {/* Accent top border */}
      <div className="absolute top-0 start-0 end-0 h-1 bg-accent" />

      <div className="mx-auto max-w-3xl px-4">
        {/* Section heading */}
        <ScrollReveal direction="up">
          <div className="mb-10 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              {t('joinFamilyTitle')}
            </h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-muted text-base">
              {t('joinFamilyNewSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* CTA Card — links to registration page */}
        <ScrollReveal direction="up" delay={150}>
          <div className="flex justify-center">
            <Link
              href="/register"
              className="group block w-full max-w-xl rounded-xl bg-gradient-to-br from-primary to-primary-dark p-8 sm:p-10 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 no-underline"
            >
              <div className="flex flex-col items-center text-center">
                {/* Icon */}
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
                  <svg className="h-9 w-9 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  {t('joinFamilyCardTitle')}
                </h3>

                {/* Description */}
                <p className="text-white/80 text-base sm:text-lg mb-6 max-w-md leading-relaxed">
                  {t('joinFamilyCardDesc')}
                </p>

                {/* Register button */}
                <span className="inline-flex items-center gap-2.5 rounded-lg bg-white text-primary font-bold px-8 py-3 text-base transition-all duration-200 group-hover:bg-white/90 group-hover:scale-105 shadow-md">
                  {t('joinFamilyButton')}
                </span>
              </div>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
