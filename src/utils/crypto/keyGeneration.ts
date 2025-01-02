import { CryptoConfig, KeyPair, EncryptionScheme } from './types';

export async function generateKeyPair(config: CryptoConfig): Promise<KeyPair> {
  const algorithm = getAlgorithmParams(config);

  try {
    const keyPair = await window.crypto.subtle.generateKey(
      algorithm,
      true, // extractable
      config.scheme.keyUsages
    );
    return keyPair as KeyPair;
  } catch (error) {
    console.error('Error generating key pair:', error);
    throw new Error('Failed to generate certificate keys');
  }
}

function getAlgorithmParams(config: CryptoConfig): any {
  switch (config.scheme.algorithm) {
    case 'RSA-PSS':
    case 'RSASSA-PKCS1-v1_5':
    case 'RSA-OAEP':
      return {
        name: config.scheme.algorithm,
        modulusLength: config.keySize,
        publicExponent: new Uint8Array([1, 0, 1]), // 65537
        hash: config.scheme.hash,
      };
    case 'ECDSA':
      return {
        name: config.scheme.algorithm,
        namedCurve: 'P-256'
      };
    default:
      throw new Error(`Unsupported algorithm: ${config.scheme.algorithm}`);
  }
}