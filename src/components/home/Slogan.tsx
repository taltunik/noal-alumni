'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from '@/components/ui/ScrollReveal';

export default function Slogan() {
  const t = useTranslations('home');

  return (
    <section className="relative overflow-hidden bg-primary py-16 sm:py-20 md:py-24">
      {/* Symmetric decorative stripes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -start-1/4 h-[200%] w-1/3 bg-primary-dark/10 rotate-12" />
        <div className="absolute -top-1/2 -end-1/4 h-[200%] w-1/3 bg-primary-dark/10 -rotate-12" />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-5xl px-6 flex flex-col items-center justify-center">
        {/* Site title */}
        <ScrollReveal direction="up">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white/90 text-center mb-6">
            {t('siteTitle')}
          </h1>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={100}>
          <div className="mb-6 flex justify-center gap-3">
            <span className="inline-block h-1 w-12 rounded-full bg-accent" />
            <span className="inline-block h-1 w-6 rounded-full bg-white/30" />
            <span className="inline-block h-1 w-12 rounded-full bg-accent" />
          </div>
        </ScrollReveal>

        {/* Arabic slogan */}
        <ScrollReveal direction="up" delay={200}>
          <p
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-snug tracking-tight text-center w-full whitespace-nowrap"
            dir="rtl"
            style={{ textAlign: 'center' }}
          >
            {t('slogan')}
          </p>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={300}>
          <div className="mt-8 flex justify-center gap-3">
            <span className="inline-block h-1.5 w-16 rounded-full bg-accent" />
            <span className="inline-block h-1.5 w-10 rounded-full bg-white/40" />
            <span className="inline-block h-1.5 w-16 rounded-full bg-accent" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
