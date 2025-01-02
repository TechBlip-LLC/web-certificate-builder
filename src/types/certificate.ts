import { EncryptionScheme } from '../utils/crypto/types';

export interface Certificate {
  domain: string;
  organization: string;
  country: string;
  state: string;
  locality: string;
  validityDays: number;
  keySize: number;
  scheme: EncryptionScheme;
  isCA: boolean;
  created: string;
  expires: string;
  publicKey?: string;
  privateKey?: string;
}

export interface CertificateFormData {
  domain: string;
  organization: string;
  country: string;
  state: string;
  locality: string;
  validityDays: number;
  keySize: number;
  scheme: EncryptionScheme;
  isCA: boolean;
}