import React, { useState } from 'react';
import { CertificateFormData } from '../../types/certificate';
import { validateForm } from '../../utils/validation/formValidation';
import { checkCryptoSupport } from '../../utils/security/cryptoSupport';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AlertCircle, Eye, Key } from 'lucide-react';
import { CertificatePreview } from '../certificates/CertificatePreview';
import { defaultCertificateValues } from '../../utils/defaults/certificateDefaults';
import { ENCRYPTION_SCHEMES } from '../../utils/crypto/schemes';
import { BasicInfoSection } from './sections/BasicInfoSection';
import { LocationSection } from './sections/LocationSection';
import { SecuritySection } from './sections/SecuritySection';

interface CertificateFormProps {
  onSubmit: (data: CertificateFormData) => void;
  isLoading?: boolean;
}

export function CertificateForm({ onSubmit, isLoading }: CertificateFormProps) {
  const [formData, setFormData] = useState<CertificateFormData>(defaultCertificateValues);
  const [errors, setErrors] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);

  if (!checkCryptoSupport()) {
    return (
      <Card>
        <div className="p-4 flex items-start space-x-3 text-amber-700 bg-amber-50 rounded-lg">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium">Browser Not Supported</h3>
            <p className="text-sm mt-1">
              Your browser doesn't support the required cryptographic features.
              Please use a modern browser like Chrome, Firefox, or Edge.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    setErrors([]);
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              name === 'keySize' ? Number(value) : 
              name === 'scheme' ? ENCRYPTION_SCHEMES.find(s => s.name === value)! : 
              value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Mobile Preview Toggle */}
      <div className="lg:hidden">
        <Button
          type="button"
          variant="outline"
          icon={Eye}
          onClick={() => setShowPreview(!showPreview)}
          className="w-full"
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </Button>
      </div>

      {/* Mobile Preview */}
      {showPreview && (
        <div className="lg:hidden">
          <CertificatePreview {...formData} />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card>
            <form onSubmit={handleSubmit} className="space-y-8">
              {errors.length > 0 && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                  <ul className="list-disc list-inside space-y-1">
                    {errors.map((error, index) => (
                      <li key={index} className="text-sm text-red-600">{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              <BasicInfoSection
                domain={formData.domain}
                organization={formData.organization}
                onChange={handleChange}
              />

              <LocationSection
                country={formData.country}
                state={formData.state}
                locality={formData.locality}
                onChange={handleChange}
              />

              <SecuritySection
                scheme={formData.scheme}
                keySize={formData.keySize}
                validityDays={formData.validityDays}
                isCA={formData.isCA}
                onChange={handleChange}
              />

              <div className="flex justify-end pt-4 border-t border-gray-200">
                <Button 
                  type="submit" 
                  variant="primary" 
                  icon={Key}
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? 'Generating...' : 'Generate Certificate'}
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Desktop Preview */}
        <div className="hidden lg:block">
          <div className="sticky top-6">
            <CertificatePreview {...formData} />
          </div>
        </div>
      </div>
    </div>
  );
}