import { Certificate, CertificateOptions } from './certificateTypes';
import { createCertificate } from './certificateGenerator';
import { certificateStore } from './certificateStore';

export async function createLocalCertificate(options: CertificateOptions): Promise<Certificate> {
  const certificate = createCertificate(options);
  await certificateStore.add(certificate);
  return certificate;
}

export function getAllCertificates(): Certificate[] {
  return certificateStore.getAll();
}

export function getCertificate(domain: string): Certificate | undefined {
  return certificateStore.get(domain);
}

export async function removeCertificate(domain: string): Promise<boolean> {
  return certificateStore.remove(domain);
}

export function validateCertificate(certificate: Certificate): boolean {
  const now = new Date();
  const expiryDate = new Date(certificate.expiryDate);
  return now < expiryDate;
}