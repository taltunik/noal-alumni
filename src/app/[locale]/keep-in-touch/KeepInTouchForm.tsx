'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import toast from 'react-hot-toast';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import PageHeader from '@/components/layout/PageHeader';
import { TOWNS, getTownLabel } from '@/lib/constants';
import { validatePhone, cleanPhone } from '@/lib/validation';

export default function KeepInTouchForm() {
  const t = useTranslations('keepInTouch');
  const locale = useLocale();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    town: '',
    currentJob: '',
    yearActive: '',
    branch: '',
    memories: '',
    wantToVolunteer: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const townOptions = TOWNS.map((town) => ({
    value: town.value,
    label: getTownLabel(town, locale),
  }));

  const volunteerOptions = [
    { value: 'yes', label: t('yes') },
    { value: 'maybe', label: t('maybe') },
    { value: 'notNow', label: t('notNow') },
  ];

  function validate(): boolean {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = t('nameError');
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = t('phoneError');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/keep-in-touch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          fullName: formData.fullName.trim(),
          phone: formData.phone ? cleanPhone(formData.phone) : '',
        }),
      });

      if (response.ok) {
        toast.success(t('successMessage'));
        setIsSubmitted(true);
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-primary mb-4">{t('successMessage')}</h2>
          </div>
        </ScrollReveal>
      </section>
    );
  }

  return (
    <>
    <PageHeader title={t('title')} subtitle={t('subtitle')} />
    <section className="relative bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4">
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
                  options={townOptions}
                  placeholder={t('selectTown')}
                />
              </div>

              {/* Current job */}
              <Input
                id="currentJob"
                label={t('currentJob')}
                value={formData.currentJob}
                onChange={(e) => setFormData({ ...formData, currentJob: e.target.value })}
                placeholder={t('currentJob')}
              />

              {/* Row 3: Years active + Branch */}
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

              {/* Memories textarea */}
              <div>
                <label
                  htmlFor="memories"
                  className="mb-1.5 block text-sm font-medium text-foreground"
                >
                  {t('memories')}
                </label>
                <textarea
                  id="memories"
                  rows={3}
                  value={formData.memories}
                  onChange={(e) => setFormData({ ...formData, memories: e.target.value })}
                  placeholder={t('memoriesPlaceholder')}
                  className="w-full rounded-lg border border-border bg-white px-4 py-3 text-base text-foreground transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
                />
              </div>

              {/* Volunteer */}
              <Select
                id="wantToVolunteer"
                label={t('wantToVolunteer')}
                value={formData.wantToVolunteer}
                onChange={(e) => setFormData({ ...formData, wantToVolunteer: e.target.value })}
                options={volunteerOptions}
                placeholder="---"
              />

              <Button
                type="submit"
                variant="accent"
                size="lg"
                isLoading={isSubmitting}
                className="w-full mt-3 text-lg font-bold"
              >
                {t('submit')}
              </Button>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
    </>
  );
}
