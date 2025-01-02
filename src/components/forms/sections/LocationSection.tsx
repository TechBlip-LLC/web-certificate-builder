import React from 'react';
import { Input } from '../../ui/Input';

interface LocationSectionProps {
  country: string;
  state: string;
  locality: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function LocationSection({ country, state, locality, onChange }: LocationSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-700">Location Information</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Input
          label="Country"
          name="country"
          value={country}
          onChange={onChange}
          placeholder="US"
          maxLength={2}
          required
        />
        <Input
          label="State/Province"
          name="state"
          value={state}
          onChange={onChange}
          placeholder="California"
          required
        />
        <Input
          label="City/Locality"
          name="locality"
          value={locality}
          onChange={onChange}
          placeholder="San Francisco"
          required
        />
      </div>
    </div>
  );
}