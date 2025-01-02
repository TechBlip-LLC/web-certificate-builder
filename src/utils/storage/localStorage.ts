import { Certificate } from '../certificateTypes';

const STORAGE_KEY = 'local_certificates';

export const localStorage = {
  save: (certificates: Certificate[]): void => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(certificates));
  },

  load: (): Certificate[] => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  clear: (): void => {
    window.localStorage.removeItem(STORAGE_KEY);
  }
};