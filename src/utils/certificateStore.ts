import { Certificate } from './certificateTypes';
import { indexedDB } from './storage/indexedDB';

class CertificateStore {
  private certificates: Map<string, Certificate>;

  constructor() {
    this.certificates = new Map();
    this.loadFromDB();
  }

  private async loadFromDB(): Promise<void> {
    const certs = await indexedDB.loadAll();
    certs.forEach(cert => this.certificates.set(cert.domain, cert));
  }

  async add(certificate: Certificate): Promise<void> {
    this.certificates.set(certificate.domain, certificate);
    await indexedDB.save(certificate);
  }

  get(domain: string): Certificate | undefined {
    return this.certificates.get(domain);
  }

  getAll(): Certificate[] {
    return Array.from(this.certificates.values());
  }

  async remove(domain: string): Promise<boolean> {
    const removed = this.certificates.delete(domain);
    if (removed) {
      await indexedDB.remove(domain);
    }
    return removed;
  }

  async clear(): Promise<void> {
    this.certificates.clear();
    await indexedDB.clear();
  }
}

export const certificateStore = new CertificateStore();