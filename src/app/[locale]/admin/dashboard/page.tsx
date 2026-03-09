import { setRequestLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboardContent from './AdminDashboardContent';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminDashboardPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Auth guard
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (!session?.value) {
    redirect(`/${locale === 'he' ? '' : locale + '/'}admin`);
  }

  return <AdminDashboardContent />;
}
