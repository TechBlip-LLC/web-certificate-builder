import { ValidationResult } from '../types/validation';

export function validateDomain(domain: string): ValidationResult {
  const errors: string[] = [];
  
  if (!domain) {
    errors.push('Domain is required');
    return { isValid: false, errors };
  }

  const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
  if (!domainRegex.test(domain)) {
    errors.push('Invalid domain format');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}