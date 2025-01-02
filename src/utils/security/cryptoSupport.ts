export function checkCryptoSupport(): boolean {
  return !!(window.crypto?.subtle);
}

export function checkAlgorithmSupport(algorithm: string): Promise<boolean> {
  if (!checkCryptoSupport()) return Promise.resolve(false);
  
  return window.crypto.subtle.generateKey(
    {
      name: algorithm,
      hash: 'SHA-256',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1])
    },
    true,
    ['sign']
  )
  .then(() => true)
  .catch(() => false);
}