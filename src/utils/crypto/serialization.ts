import { KeyPair, SerializedKeyPair } from './types';

export async function serializeKeyPair(keyPair: KeyPair): Promise<SerializedKeyPair> {
  try {
    const publicKeyBuffer = await window.crypto.subtle.exportKey(
      'spki',
      keyPair.publicKey
    );
    const privateKeyBuffer = await window.crypto.subtle.exportKey(
      'pkcs8',
      keyPair.privateKey
    );

    const publicKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(publicKeyBuffer)));
    const privateKeyBase64 = btoa(String.fromCharCode(...new Uint8Array(privateKeyBuffer)));

    return {
      publicKey: formatPEM(publicKeyBase64, 'PUBLIC KEY'),
      privateKey: formatPEM(privateKeyBase64, 'PRIVATE KEY')
    };
  } catch (error) {
    console.error('Error serializing key pair:', error);
    throw new Error('Failed to process certificate keys');
  }
}

function formatPEM(base64: string, type: string): string {
  const chunkSize = 64;
  const lines = base64.match(new RegExp(`.{1,${chunkSize}}`, 'g')) || [];
  return `-----BEGIN ${type}-----\n${lines.join('\n')}\n-----END ${type}-----`;
}