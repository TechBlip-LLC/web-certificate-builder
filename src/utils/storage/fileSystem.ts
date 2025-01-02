import { Certificate } from '../certificateTypes';
import * as fs from 'fs';
import * as path from 'path';

const CERTS_DIR = path.join(process.cwd(), 'certs');

export const fileSystem = {
  ensureCertDir: (): void => {
    if (!fs.existsSync(CERTS_DIR)) {
      fs.mkdirSync(CERTS_DIR, { recursive: true });
    }
  },

  getCertPath: (domain: string): string => {
    return path.join(CERTS_DIR, `${domain}.cert`);
  },

  save: (certificate: Certificate): void => {
    fileSystem.ensureCertDir();
    const certPath = fileSystem.getCertPath(certificate.domain);
    fs.writeFileSync(certPath, JSON.stringify(certificate, null, 2));
  },

  load: (domain: string): Certificate | undefined => {
    const certPath = fileSystem.getCertPath(domain);
    if (fs.existsSync(certPath)) {
      const content = fs.readFileSync(certPath, 'utf-8');
      return JSON.parse(content);
    }
    return undefined;
  },

  loadAll: (): Certificate[] => {
    fileSystem.ensureCertDir();
    return fs.readdirSync(CERTS_DIR)
      .filter(file => file.endsWith('.cert'))
      .map(file => {
        const content = fs.readFileSync(path.join(CERTS_DIR, file), 'utf-8');
        return JSON.parse(content);
      });
  },

  remove: (domain: string): boolean => {
    const certPath = fileSystem.getCertPath(domain);
    if (fs.existsSync(certPath)) {
      fs.unlinkSync(certPath);
      return true;
    }
    return false;
  }
};