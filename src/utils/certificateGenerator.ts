import { Certificate, CertificateFormData } from '../types/certificate';
import { generateKeyPair } from './crypto/keyGeneration';
import { serializeKeyPair } from './crypto/serialization';

export async function generateCertificate(formData: CertificateFormData): Promise<Certificate> {
  try {
    // Generate key pair with the specified configuration
    const keyPair = await generateKeyPair({
      keySize: formData.keySize,
      scheme: formData.scheme
    });

    // Serialize the key pair to PEM format
    const serializedKeys = await serializeKeyPair(keyPair);
    
    const now = new Date();
    const expiryDate = new Date(now.getTime() + formData.validityDays * 24 * 60 * 60 * 1000);

    return {
      ...formData,
      created: now.toISOString(),
      expires: expiryDate.toISOString(),
      ...serializedKeys
    };
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw new Error('Failed to generate certificate');
  }
}