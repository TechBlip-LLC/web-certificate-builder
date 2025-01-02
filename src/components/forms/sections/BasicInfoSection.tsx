import React from 'react';
import { Input } from '../../ui/Input';

interface BasicInfoSectionProps {
  domain: string;
  organization: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BasicInfoSection({ domain, organization, onChange }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Basic Information</h3>
      <div className="space-y-4">
        <Input
          label="Domain Name"
          name="domain"
          value={domain}
          onChange={onChange}
          placeholder="example.com"
          required
        />
        <Input
          label="Organization"
          name="organization"
          value={organization}
          onChange={onChange}
          placeholder="Your Organization"
          required
        />
      </div>
    </div>
  );
}