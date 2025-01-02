import { CertificateFormData } from '../../types/certificate';
import { ValidationResult } from '../types/validation';
import { validateDomain } from './domainValidation';

export function validateForm(data: CertificateFormData): ValidationResult {
  const errors: string[] = [];
  
  const domainValidation = validateDomain(data.domain);
  if (!domainValidation.isValid) {
    errors.push(...domainValidation.errors);
  }

  if (!data.organization) {
    errors.push('Organization is required');
  }

  if (data.validityDays < 1 || data.validityDays > 3650) {
    errors.push('Validity must be between 1 and 3650 days');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}