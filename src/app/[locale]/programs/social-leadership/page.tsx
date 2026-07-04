import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import PageHeader from '@/components/layout/PageHeader';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function SocialLeadershipPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SocialLeadershipContent />;
}

function SocialLeadershipContent() {
  const t = useTranslations('programs');

  return (
    <>
    <PageHeader title={t('socialLeadershipTitle')} subtitle={t('socialLeadershipPageSubtitle')} />
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Hero image */}
      <div className="relative w-full h-64 sm:h-80 rounded-xl overflow-hidden shadow-lg mb-10">
        <Image
          src="/images/hero/hero-2.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>

      {/* Content sections */}
      <div className="space-y-8">
        <ContentBlock
          number="01"
          text={t('socialLeadershipContent1')}
          accent={false}
        />
        <ContentBlock
          number="02"
          text={t('socialLeadershipContent2')}
          accent={true}
        />
        <ContentBlock
          number="03"
          text={t('socialLeadershipContent3')}
          accent={false}
        />
      </div>

      {/* Decorative bottom */}
      <div className="mt-12 flex justify-center gap-2">
        <span className="inline-block h-1 w-12 rounded-full bg-primary" />
        <span className="inline-block h-1 w-8 rounded-full bg-accent" />
        <span className="inline-block h-1 w-12 rounded-full bg-primary" />
      </div>
    </div>
    </>
  );
}

function ContentBlock({
  number,
  text,
  accent,
}: {
  number: string;
  text: string;
  accent: boolean;
}) {
  return (
    <div className={`rounded-xl p-6 border ${accent ? 'border-accent/20 bg-accent/5' : 'border-primary/20 bg-primary/5'}`}>
      <div className="flex items-start gap-4">
        <span
          className={`flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${accent ? 'bg-accent' : 'bg-primary'}`}
        >
          {number}
        </span>
        <p className="text-lg leading-relaxed text-foreground">
          {text}
        </p>
      </div>
    </div>
  );
}
