import { ENCRYPTION_SCHEMES } from '../crypto/schemes';

export const KEY_SIZES = [
  { value: 2048, label: '2048 bits - Good' },
  { value: 3072, label: '3072 bits - Better' },
  { value: 4096, label: '4096 bits - Best' },
  { value: 8192, label: '8192 bits - Maximum' },
] as const;

export const defaultCertificateValues = {
  domain: 'example.com',
  organization: 'Example Organization',
  country: 'US',
  state: 'California',
  locality: 'San Francisco',
  validityDays: 365,
  keySize: 2048,
  scheme: ENCRYPTION_SCHEMES[0], // RSA-PSS by default
  isCA: false,
};