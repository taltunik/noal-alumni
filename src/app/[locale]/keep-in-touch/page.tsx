import { setRequestLocale } from 'next-intl/server';
import KeepInTouchForm from './KeepInTouchForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function KeepInTouchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <KeepInTouchForm />;
}
