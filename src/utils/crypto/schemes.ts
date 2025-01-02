import { EncryptionScheme } from './types';

export const ENCRYPTION_SCHEMES: EncryptionScheme[] = [
  {
    name: 'RSA-PSS',
    algorithm: 'RSA-PSS',
    hash: 'SHA-256',
    description: 'Modern RSA variant with better security properties',
    keyUsages: ['sign', 'verify']
  },
  {
    name: 'RSASSA-PKCS1-v1_5',
    algorithm: 'RSASSA-PKCS1-v1_5',
    hash: 'SHA-256',
    description: 'Traditional RSA, widely supported',
    keyUsages: ['sign', 'verify']
  },
  {
    name: 'RSA-OAEP',
    algorithm: 'RSA-OAEP',
    hash: 'SHA-256',
    description: 'RSA encryption with optimal padding',
    keyUsages: ['encrypt', 'decrypt']
  },
  {
    name: 'ECDSA P-256',
    algorithm: 'ECDSA',
    hash: 'SHA-256',
    description: 'Elliptic Curve Digital Signature Algorithm',
    keyUsages: ['sign', 'verify']
  }
];