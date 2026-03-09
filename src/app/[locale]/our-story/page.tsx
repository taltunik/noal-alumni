import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OurStoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OurStoryContent />;
}

function OurStoryContent() {
  const t = useTranslations('ourStory');

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
          {t('title')}
        </h1>
        <p className="mt-2 text-lg text-muted">{t('subtitle')}</p>
        <div className="mt-4 flex justify-center">
          <span className="inline-block h-1 w-20 rounded-full bg-accent" />
        </div>
      </div>

      {/* Content sections */}
      <div className="space-y-8">
        <ContentBlock
          number="01"
          text={t('content1')}
          accent={false}
        />
        <ContentBlock
          number="02"
          text={t('content2')}
          accent={true}
        />
        <ContentBlock
          number="03"
          text={t('content3')}
          accent={false}
        />
        <ContentBlock
          number="04"
          text={t('content4')}
          accent={true}
        />
      </div>

      {/* Decorative bottom */}
      <div className="mt-12 flex justify-center gap-2">
        <span className="inline-block h-1 w-12 rounded-full bg-primary" />
        <span className="inline-block h-1 w-8 rounded-full bg-accent" />
        <span className="inline-block h-1 w-12 rounded-full bg-primary" />
      </div>
    </div>
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
