import { ISRAELI_PHONE_REGEX, BIRTH_YEAR_RANGE } from './constants';

export function cleanPhone(phone: string): string {
  return phone.replace(/[-\s()]/g, '');
}

export function validatePhone(phone: string): boolean {
  const cleaned = cleanPhone(phone);
  return ISRAELI_PHONE_REGEX.test(cleaned);
}

export function validateBirthYear(year: number): boolean {
  return (
    Number.isInteger(year) &&
    year >= BIRTH_YEAR_RANGE.min &&
    year <= BIRTH_YEAR_RANGE.max
  );
}

export interface RegistrationData {
  fullName: string;
  phone: string;
  town: string;
  birthYear: number;
  website?: string; // honeypot
}

export function validateRegistration(data: RegistrationData): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'nameError';
  }

  if (!validatePhone(data.phone)) {
    errors.phone = 'phoneError';
  }

  if (!data.town) {
    errors.town = 'townError';
  }

  if (!validateBirthYear(data.birthYear)) {
    errors.birthYear = 'yearError';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
