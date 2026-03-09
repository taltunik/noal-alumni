import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return <NotFoundContent />;
}

function NotFoundContent() {
  const t = useTranslations('notFound');

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      {/* Big 404 */}
      <div className="relative mb-6">
        <h1 className="text-[120px] sm:text-[160px] font-black text-primary/10 leading-none">
          {t('title')}
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">🏕️</span>
        </div>
      </div>

      <h2 className="mb-2 text-2xl font-bold text-foreground">
        {t('subtitle')}
      </h2>
      <p className="mb-8 max-w-md text-muted">
        {t('message')}
      </p>

      <Link href="/">
        <Button variant="primary" size="lg">
          {t('backHome')}
        </Button>
      </Link>
    </div>
  );
}
