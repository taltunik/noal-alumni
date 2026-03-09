'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import clsx from 'clsx';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'home', href: '/' },
  { key: 'events', href: '/careers-events' },
  { key: 'jobs', href: '/careers-events' },
  { key: 'volunteer', href: '/keep-in-touch' },
  { key: 'programs', href: '/programs/social-leadership' },
  { key: 'joinFamily', href: '/register' },
] as const;

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-primary shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary font-bold text-lg">
            N
          </div>
          <span className="hidden sm:block text-lg font-bold text-white">
            NOAL
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={clsx(
                'rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200',
                pathname === href
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        {/* Language Switcher + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden rounded-lg p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/20 bg-primary-dark/50">
          <nav className="flex flex-col px-4 py-2">
            {NAV_ITEMS.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={clsx(
                  'rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200',
                  pathname === href
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {t(key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
