import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['he', 'ar', 'en'],
  defaultLocale: 'he',
  localePrefix: 'as-needed',
});
