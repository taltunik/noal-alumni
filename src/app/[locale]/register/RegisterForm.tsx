'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import ScrollReveal, { SectionBar } from '@/components/ui/ScrollReveal';
import { TOWNS, BIRTH_YEAR_RANGE, getTownLabel } from '@/lib/constants';
import { validatePhone, cleanPhone, validateBirthYear } from '@/lib/validation';

export default function RegisterForm() {
  const t = useTranslations('register');
  const locale = useLocale();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    town: '',
    birthYear: '',
    currentJob: '',
    yearActive: '',
    branch: '',
    website: '', // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const townOptions = TOWNS.map((town) => ({
    value: town.value,
    label: getTownLabel(town, locale),
  }));

  const yearOptions = [];
  for (let year = BIRTH_YEAR_RANGE.max; year >= BIRTH_YEAR_RANGE.min; year--) {
    yearOptions.push({ value: String(year), label: String(year) });
  }

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = t('nameError');
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = t('phoneError');
    }

    if (!formData.town) {
      newErrors.town = t('townError');
    }

    if (!formData.birthYear || !validateBirthYear(Number(formData.birthYear))) {
      newErrors.birthYear = t('yearError');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: cleanPhone(formData.phone),
          email: formData.email.trim(),
          town: formData.town,
          birthYear: Number(formData.birthYear),
          currentJob: formData.currentJob.trim(),
          yearActive: formData.yearActive.trim(),
          branch: formData.branch.trim(),
          website: formData.website, // honeypot
        }),
      });

      if (response.ok) {
        toast.success(t('successMessage'));
        setIsSubmitted(true);

        // Redirect to WhatsApp after 2 seconds
        const whatsappLink = process.env.NEXT_PUBLIC_WHATSAPP_LINK;
        if (whatsappLink && whatsappLink !== 'https://chat.whatsapp.com/your-group-invite-link') {
          toast(t('redirectingWhatsapp'), { icon: '📱' });
          setTimeout(() => {
            window.open(whatsappLink, '_blank');
          }, 2000);
        }
      } else {
        const data = await response.json();
        toast.error(data.error || 'Error');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center">
        <ScrollReveal direction="scale">
          <div className="rounded-lg bg-white p-10 shadow-md border-t-4 border-t-primary">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary-light">
              <svg className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">{t('successMessage')}</h2>
            <p className="text-muted">{t('successSubtext')}</p>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <section className="relative bg-white py-16 sm:py-20">
      <div className="absolute top-0 start-0 end-0 h-1 bg-accent" />

      <div className="mx-auto max-w-2xl px-4">
        {/* Section heading */}
        <ScrollReveal direction="up">
          <div className="mb-10 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">
              {t('title')}
            </h1>
            <SectionBar className="mt-4" />
            <p className="mt-4 text-muted text-base">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <div className="rounded-lg bg-background p-6 sm:p-8 shadow-md border-t-4 border-t-primary">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="fullName"
                  label={t('fullName')}
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  error={errors.fullName}
                  placeholder={t('fullName')}
                  autoComplete="name"
                />
                <Input
                  id="phone"
                  label={t('phone')}
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  error={errors.phone}
                  placeholder="05X-XXXXXXX"
                  autoComplete="tel"
                  dir="ltr"
                />
              </div>

              {/* Row 2: Email + Town */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="email"
                  label={t('email')}
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t('email')}
                  autoComplete="email"
                  dir="ltr"
                />
                <Select
                  id="town"
                  label={t('town')}
                  value={formData.town}
                  onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                  error={errors.town}
                  options={townOptions}
                  placeholder={t('selectTown')}
                />
              </div>

              {/* Row 3: Birth Year + Current Job */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  id="birthYear"
                  label={t('birthYear')}
                  value={formData.birthYear}
                  onChange={(e) => setFormData({ ...formData, birthYear: e.target.value })}
                  error={errors.birthYear}
                  options={yearOptions}
                  placeholder={t('selectYear')}
                />
                <Input
                  id="currentJob"
                  label={t('currentJob')}
                  value={formData.currentJob}
                  onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
                  placeholder={t('currentJobPlaceholder')}
                />
              </div>

              {/* Row 4: Years active + Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  id="yearActive"
                  label={t('yearActive')}
                  value={formData.yearActive}
                  onChange={(e) => setFormData({ ...formData, yearActive: e.target.value })}
                  placeholder={t('yearActivePlaceholder')}
                />
                <Input
                  id="branch"
                  label={t('branch')}
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  placeholder={t('branchPlaceholder')}
                />
              </div>

              {/* Honeypot field - hidden from users */}
              <div
                aria-hidden="true"
                className="absolute opacity-0 h-0 overflow-hidden"
                style={{ position: 'absolute', left: '-9999px' }}
              >
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-3 inline-flex items-center justify-center gap-2.5 rounded-lg bg-[#25D366] text-white font-bold px-7 py-3 text-lg transition-all duration-200 hover:bg-[#20bd5a] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="me-2 inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                )}
                {t('joinCommunity')}
              </button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
