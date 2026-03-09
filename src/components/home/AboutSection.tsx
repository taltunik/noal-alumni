'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';

export default function AboutSection() {
  const t = useTranslations('home');
  const [isMuted, setIsMuted] = useState(true);

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

          {/* YouTube Video side — autoplay muted */}
          <ScrollReveal direction="left">
            <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-border bg-card">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/GXUREVXP0eM?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=GXUREVXP0eM&playsinline=1&rel=0`}
                  title={t('aboutVideoTitle')}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              {/* Mute/Unmute button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute bottom-3 end-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/70 hover:scale-110"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
