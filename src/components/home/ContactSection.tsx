'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

const EMAIL = 'arab@noal.org.il';

export default function ContactSection() {
  const t = useTranslations('home');

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4">
        <ScrollReveal direction="up">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              {t('contactTitle')}
            </h2>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-muted text-base">
              {t('contactSubtitle')}
            </p>

            {/* Email CTA */}
            <div className="mt-8">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-br from-primary to-primary-dark px-8 py-4 text-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 no-underline"
              >
                {/* Email icon */}
                <svg className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="text-lg font-bold">{t('contactButton')}</span>
              </a>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
