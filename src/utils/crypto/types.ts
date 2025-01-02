export type EncryptionScheme = {
  name: string;
  algorithm: string;
  hash: string;
  description: string;
  keyUsages: KeyUsage[];
};

export type KeyUsage = 'sign' | 'verify' | 'encrypt' | 'decrypt';

export interface KeyPair {
  publicKey: CryptoKey;
  privateKey: CryptoKey;
}

export interface SerializedKeyPair {
  publicKey: string;
  privateKey: string;
}

export interface CryptoConfig {
  keySize: number;
  scheme: EncryptionScheme;
}