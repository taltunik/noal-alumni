import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getFontClass } from '@/lib/fonts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AnnouncementBanner from '@/components/AnnouncementBanner';
import PageViewTracker from '@/components/layout/PageViewTracker';
import { Toaster } from 'react-hot-toast';

const RTL_LOCALES = ['he', 'ar'];

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const direction = RTL_LOCALES.includes(locale) ? 'rtl' : 'ltr';
  const fontClass = getFontClass(locale);

  return (
    <html lang={locale} dir={direction}>
      <body className={`${fontClass} bg-background text-foreground antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <PageViewTracker />
          <Toaster
            position={direction === 'rtl' ? 'top-left' : 'top-right'}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#ffffff',
                color: '#1a202c',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
            }}
          />
          <div className="flex min-h-screen flex-col">
            <Header />
            <AnnouncementBanner />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
