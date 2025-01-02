import React from 'react';
import { Select } from '../../ui/Select';
import { Input } from '../../ui/Input';
import { Checkbox } from '../../ui/Checkbox';
import { ENCRYPTION_SCHEMES } from '../../../utils/crypto/schemes';
import { KEY_SIZES } from '../../../utils/defaults/certificateDefaults';
import { EncryptionScheme } from '../../../utils/crypto/types';

interface SecuritySectionProps {
  scheme: EncryptionScheme;
  keySize: number;
  validityDays: number;
  isCA: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export function SecuritySection({ 
  scheme, 
  keySize, 
  validityDays, 
  isCA, 
  onChange 
}: SecuritySectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Security Settings</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Encryption Scheme"
            name="scheme"
            value={scheme.name}
            onChange={onChange}
            options={ENCRYPTION_SCHEMES.map(s => ({
              value: s.name,
              label: s.name
            }))}
            description={scheme.description}
          />
          <Select
            label="Key Size"
            name="keySize"
            value={keySize}
            onChange={onChange}
            options={KEY_SIZES}
            description="Larger keys provide better security but may impact performance"
          />
        </div>
        <Input
          type="number"
          label="Validity (days)"
          name="validityDays"
          value={validityDays}
          onChange={onChange}
          min={1}
          max={3650}
          required
        />
        <Checkbox
          label="Certificate Authority"
          name="isCA"
          checked={isCA}
          onChange={onChange}
          description="Enable this if you want to create a CA certificate"
        />
      </div>
    </div>
  );
}