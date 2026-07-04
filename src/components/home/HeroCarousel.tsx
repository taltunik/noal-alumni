'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import clsx from 'clsx';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/images/hero/hero-1.jpg',
    textAr: 'معاً نبني المستقبل',
    textHe: 'יחד בונים עתיד',
    textEn: 'Building the Future Together',
  },
  {
    id: 2,
    image: '/images/hero/hero-2.jpg',
    textAr: 'ذكريات لا تُنسى',
    textHe: 'זיכרונות שלא נשכח',
    textEn: 'Unforgettable Memories',
  },
  {
    id: 3,
    image: '/images/hero/hero-3.jpg',
    textAr: 'قيادة شبابية',
    textHe: 'מנהיגות צעירה',
    textEn: 'Youth Leadership',
  },
  {
    id: 4,
    image: '/images/hero/hero-4.jpg',
    textAr: 'فخر وانتماء',
    textHe: 'גאווה ושייכות',
    textEn: 'Pride and Belonging',
  },
];

export default function HeroCarousel() {
  const locale = useLocale();
  const tNav = useTranslations('nav');
  const isRTL = locale === 'he' || locale === 'ar';

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, direction: isRTL ? 'rtl' : 'ltr' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const getText = (slide: (typeof HERO_SLIDES)[0]) => {
    if (locale === 'ar') return slide.textAr;
    if (locale === 'en') return slide.textEn;
    return slide.textHe;
  };

  return (
    <section className="relative w-full">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {HERO_SLIDES.map((slide) => (
            <div key={slide.id} className="embla__slide">
              <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-primary-dark sm:aspect-[16/9] lg:aspect-[21/9]">
                {/* Real photo background */}
                <Image
                  src={slide.image}
                  alt={getText(slide)}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={slide.id === 1}
                />

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Text overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 p-4 text-center">
                  <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
                    {getText(slide)}
                  </h2>
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 sm:px-8 sm:py-3 text-sm sm:text-base font-bold text-white shadow-lg transition-all duration-300 hover:bg-accent-dark hover:shadow-xl hover:-translate-y-0.5"
                  >
                    {tNav('joinFamily')}
                    <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 start-0 end-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-4 start-0 end-0 flex justify-center gap-2">
        {HERO_SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={clsx(
              'h-2.5 rounded-full transition-all duration-300 cursor-pointer',
              selectedIndex === index
                ? 'w-8 bg-white'
                : 'w-2.5 bg-white/50 hover:bg-white/75'
            )}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
