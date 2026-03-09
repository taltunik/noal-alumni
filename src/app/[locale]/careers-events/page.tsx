import { setRequestLocale } from 'next-intl/server';
import CareersEventsContent from './CareersEventsContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function CareersEventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CareersEventsContent />;
}
