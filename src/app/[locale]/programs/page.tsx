import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

const PROGRAMS = [
  {
    titleKey: 'socialLeadershipTitle' as const,
    descKey: 'socialLeadershipPageSubtitle' as const,
    href: '/programs/social-leadership' as const,
    image: '/images/hero/hero-2.jpg',
    color: 'primary' as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
      </svg>
    ),
  },
  {
    titleKey: 'leadershipInstituteTitle' as const,
    descKey: 'leadershipInstitutePageSubtitle' as const,
    href: '/programs/leadership-institute' as const,
    image: '/images/hero/hero-1.jpg',
    color: 'accent' as const,
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
      </svg>
    ),
  },
];

const colorStyles = {
  primary: {
    badge: 'bg-primary text-white',
    button: 'bg-primary hover:bg-primary-dark',
    border: 'border-primary/20',
  },
  accent: {
    badge: 'bg-accent text-white',
    button: 'bg-accent hover:bg-accent-dark',
    border: 'border-accent/20',
  },
};

export default async function ProgramsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ProgramsContent />;
}

function ProgramsContent() {
  const t = useTranslations('programs');

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          {t('sectionTitle')}
        </h1>
        <p className="mt-2 text-lg text-muted">{t('sectionSubtitle')}</p>
        <div className="mt-4 flex justify-center">
          <span className="inline-block h-1 w-20 rounded-full bg-accent" />
        </div>
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {PROGRAMS.map((program) => {
          const styles = colorStyles[program.color];
          return (
            <Link
              key={program.href}
              href={program.href}
              className={`group rounded-xl overflow-hidden shadow-md border ${styles.border} bg-card transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              {/* Image */}
              <div className="relative w-full h-48 sm:h-56">
                <Image
                  src={program.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-0 start-0 end-0 p-5 flex items-end gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full ${styles.badge} shadow-lg`}>
                    {program.icon}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                    {t(program.titleKey)}
                  </h2>
                </div>
              </div>

              {/* Description */}
              <div className="p-5">
                <p className="text-sm sm:text-base text-muted leading-relaxed">
                  {t(program.descKey)}
                </p>
                <span className={`mt-4 inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-md ${styles.button}`}>
                  {t('learnMore')}
                  <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
