import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import PageHeader from '@/components/layout/PageHeader';

type Props = {
  params: Promise<{ locale: string }>;
};

// Icons for the four value blocks
const VALUE_ICONS = [
  // Roots / movement heritage
  'M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z',
  // Active citizenship — people
  'M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z',
  // Identity & culture — globe/language
  'M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802',
  // Wasatiyyah / balance — scales
  'M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z',
];

export default async function OurStoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OurStoryContent />;
}

function OurStoryContent() {
  const t = useTranslations('ourStory');
  const tNav = useTranslations('nav');

  return (
    <>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        {/* Photo band */}
        <div className="relative mb-12 h-56 sm:h-72 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/images/hero/hero-2.jpg"
            alt={t('title')}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        </div>

        {/* Value blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((n, i) => (
            <div
              key={n}
              className={`rounded-2xl border p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                i % 2 === 1
                  ? 'border-accent/15 bg-accent/[0.04]'
                  : 'border-primary/15 bg-primary/[0.04]'
              }`}
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-md ${
                  i % 2 === 1 ? 'bg-accent' : 'bg-primary'
                }`}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={VALUE_ICONS[i]} />
                </svg>
              </div>
              <p className="text-lg leading-relaxed text-foreground">
                {t(`content${n}`)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 sm:p-10 text-center shadow-lg">
          <p className="text-xl sm:text-2xl font-bold text-white !text-center" dir="rtl">
            كنت جزءاً من القصة... ابقَ جزءاً من العائلة
          </p>
          <Link
            href="/register"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3 text-base font-bold text-primary shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
          >
            {tNav('joinFamily')}
            <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
