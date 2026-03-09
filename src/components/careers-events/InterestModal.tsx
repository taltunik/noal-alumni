'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import Modal from '@/components/ui/Modal';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { validatePhone, cleanPhone } from '@/lib/validation';

interface InterestModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string;
  itemType: 'job' | 'event';
  itemTitle: string;
}

export default function InterestModal({
  isOpen,
  onClose,
  itemId,
  itemType,
  itemTitle,
}: InterestModalProps) {
  const t = useTranslations('careersEvents.interestModal');
  const tHome = useTranslations('home');

  const [formData, setFormData] = useState({ fullName: '', phone: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName || formData.fullName.trim().length < 2) {
      newErrors.fullName = tHome('nameError');
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = tHome('phoneError');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: cleanPhone(formData.phone),
          relatedItemId: itemId,
          relatedItemType: itemType,
        }),
      });

      if (response.ok) {
        toast.success(t('success'));
        setFormData({ fullName: '', phone: '' });
        setErrors({});
        onClose();
      } else {
        toast.error('Error submitting');
      }
    } catch {
      toast.error('Network error');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t('title')}>
      <p className="mb-4 text-sm text-muted">{t('subtitle')}</p>
      <p className="mb-4 text-sm font-semibold text-primary">{itemTitle}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="interest-name"
          label={t('name')}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          error={errors.fullName}
          placeholder={t('name')}
        />

        <Input
          id="interest-phone"
          label={t('phone')}
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          error={errors.phone}
          placeholder="05X-XXXXXXX"
          dir="ltr"
        />

        <div className="flex gap-3 pt-2">
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="flex-1"
          >
            {t('submit')}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            {t('cancel')}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
