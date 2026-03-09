'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import clsx from 'clsx';

const LOCALES = [
  { code: 'he', label: 'עב' },
  { code: 'ar', label: 'عر' },
  { code: 'en', label: 'EN' },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="flex items-center gap-1 rounded-lg bg-white/15 p-1">
      {LOCALES.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => switchLocale(code)}
          className={clsx(
            'rounded-md px-2.5 py-1 text-sm font-medium transition-all duration-200 cursor-pointer',
            locale === code
              ? 'bg-white text-primary shadow-sm'
              : 'text-white/70 hover:text-white hover:bg-white/10'
          )}
          aria-current={locale === code ? 'true' : undefined}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
