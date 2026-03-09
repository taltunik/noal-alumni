import { Assistant, IBM_Plex_Sans_Arabic } from 'next/font/google';

export const assistantFont = Assistant({
  subsets: ['hebrew', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-assistant',
  display: 'swap',
});

export const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
});

export function getFontClass(locale: string): string {
  if (locale === 'ar') {
    return `${ibmPlexArabic.variable} ${ibmPlexArabic.className}`;
  }
  return `${assistantFont.variable} ${assistantFont.className}`;
}
