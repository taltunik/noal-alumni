'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

type FooterProps = {
  instagramUrl?: string;
  facebookUrl?: string;
  youtubeUrl?: string;
  contactEmail?: string;
};

const QUICK_LINKS = [
  { key: 'home', href: '/' },
  { key: 'ourStory', href: '/our-story' },
  { key: 'careersEvents', href: '/careers-events' },
  { key: 'programs', href: '/programs' },
  { key: 'joinFamily', href: '/register' },
] as const;

export default function Footer({
  instagramUrl = 'https://www.instagram.com/noal.arab/',
  facebookUrl = 'https://www.facebook.com/noal.arab',
  youtubeUrl = 'https://www.youtube.com/channel/UCpj6JtKiRv0gNsU6ArrUtKg',
  contactEmail = 'arab@noal.org.il',
}: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const slogan = t('slogan');
  const rawTranslation = t('sloganTranslation');
  // Show the translated line only when it differs from the Arabic slogan (i.e., in he/en)
  const sloganTranslation = rawTranslation !== slogan ? rawTranslation : null;

  return (
    <footer className="mt-auto">
      {/* Red accent divider line */}
      <div className="h-1 bg-accent" />

      {/* Main footer content */}
      <div className="bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:text-start">
            {/* Brand + slogan */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white p-1 shadow-sm">
                  <Image
                    src="/images/logo.png"
                    alt="NOAL"
                    width={44}
                    height={44}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-white leading-tight">
                  {tNav('brandName')}
                </span>
              </Link>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-white/90" dir="rtl">
                  {t('slogan')}
                </p>
                {sloganTranslation && (
                  <p className="text-sm text-white/60">{sloganTranslation}</p>
                )}
              </div>
            </div>

            {/* Quick links */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <span className="text-sm font-bold uppercase tracking-wide text-white/70">
                {t('quickLinks')}
              </span>
              <nav className="flex flex-col items-center md:items-start gap-2">
                {QUICK_LINKS.map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {tNav(key)}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social + contact */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <span className="text-sm font-bold uppercase tracking-wide text-white/70">
                {t('followUs')}
              </span>
              <div className="flex gap-3">
                {/* Instagram */}
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors duration-300"
                  aria-label="Instagram"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                {/* Facebook */}
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors duration-300"
                  aria-label="Facebook"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-accent transition-colors duration-300"
                  aria-label="YouTube"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-1 inline-flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
                dir="ltr"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {contactEmail}
              </a>
            </div>
          </div>

          {/* Copyright + Admin link */}
          <div className="mt-10 border-t border-white/20 pt-6 flex flex-col items-center gap-2">
            <p className="text-xs text-white/60">
              {t('rights')}
            </p>
            <Link
              href="/admin"
              className="text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              {t('admin')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
