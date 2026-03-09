import { setRequestLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminLoginForm from './AdminLoginForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AdminPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Check if already authenticated
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');

  if (session?.value) {
    redirect(`/${locale === 'he' ? '' : locale + '/'}admin/dashboard`);
  }

  return <AdminLoginForm />;
}
