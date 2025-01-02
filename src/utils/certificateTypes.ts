export interface Certificate {
  domain: string;
  expiryDate: string;
  isValid: boolean;
  issuer: string;
  publicKey?: string;
  privateKey?: string;
}

export interface CertificateOptions {
  domain: string;
  validityDays?: number;
  issuer?: string;
}