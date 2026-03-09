'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';
import YouTubePlayer from '@/components/ui/YouTubePlayer';

export default function AboutSection() {
  const t = useTranslations('home');

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section heading */}
        <ScrollReveal direction="up">
          <div className="mb-12 text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary">
              {t('aboutTitle')}
            </h2>
            <SectionBar className="mt-4" />
          </div>
        </ScrollReveal>

        {/* Two-column: Text + Video */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Text side */}
          <ScrollReveal direction="right">
            <div className="space-y-5 text-lg leading-relaxed text-foreground">
              <p>{t('aboutP1')}</p>
              <p>{t('aboutP2')}</p>
              <p>{t('aboutP3')}</p>
              <p>{t('aboutP4')}</p>
              <p>{t('aboutP5')}</p>
              <p className="font-semibold text-primary text-xl">
                {t('aboutP6')}
              </p>
            </div>
          </ScrollReveal>

          {/* YouTube Video side — autoplay muted, with mobile fallback */}
          <ScrollReveal direction="left">
            <YouTubePlayer
              videoId="GXUREVXP0eM"
              title={t('aboutVideoTitle')}
              aspectClass="aspect-video"
              className="rounded-xl shadow-lg border border-border bg-card"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
