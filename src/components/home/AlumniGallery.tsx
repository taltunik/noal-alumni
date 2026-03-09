'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';
import YouTubePlayer from '@/components/ui/YouTubePlayer';

// Demo alumni data — famous Arab personalities (temporary)
const ALUMNI = [
  { id: 1, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Mohamed_Salah_2018.jpg/500px-Mohamed_Salah_2018.jpg' },
  { id: 2, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Fairuz_1971.jpg/500px-Fairuz_1971.jpg' },
  { id: 3, image: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Bassem_Youssef_white_background.png' },
  { id: 4, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Nancy_Ajram_signing_ceremony.jpg/500px-Nancy_Ajram_signing_ceremony.jpg' },
  { id: 5, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Mohammed_Assaf.jpg/500px-Mohammed_Assaf.jpg' },
  { id: 6, image: 'https://upload.wikimedia.org/wikipedia/commons/0/04/Majida_in_Abu_Dhabi_2013_%28Cropped%29.jpg' },
  { id: 7, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Tamer_Hosny%27s_NYE_Concert_%282025%29_%28cropped%29.png/500px-Tamer_Hosny%27s_NYE_Concert_%282025%29_%28cropped%29.png' },
  { id: 8, image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Elissa_-_August_24%2C_2012_%282%29.jpg/500px-Elissa_-_August_24%2C_2012_%282%29.jpg' },
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

        {/* Layout: Alumni cards next to video */}
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

          {/* Alumni profile cards — 2 rows of 4 */}
          <ScrollReveal direction="left" className="flex-1">
            <div className="grid grid-cols-4 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 justify-items-center">
              {ALUMNI.map((alumni) => (
                <div
                  key={alumni.id}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Circle profile image */}
                  <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 overflow-hidden rounded-full border-3 border-primary/20 shadow-md transition-all duration-300 group-hover:border-primary group-hover:shadow-xl group-hover:scale-105">
                    <Image
                      src={alumni.image}
                      alt={t('alumniProfileAlt', { name: t(`alumni${alumni.id}Name`) })}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 112px"
                    />
                  </div>

                  {/* Name */}
                  <h3 className="mt-2.5 text-sm sm:text-base font-bold text-primary leading-tight">
                    {t(`alumni${alumni.id}Name`)}
                  </h3>

                  {/* Role */}
                  <p className="mt-0.5 text-[11px] sm:text-xs text-muted leading-tight">
                    {t(`alumni${alumni.id}Role`)}
                  </p>

                  {/* Read more link */}
                  <Link
                    href="/our-story"
                    className="mt-1.5 inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-primary/70 hover:text-primary transition-colors duration-200 no-underline"
                  >
                    {t('alumniReadMore')}
                    <svg className="h-3 w-3 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
