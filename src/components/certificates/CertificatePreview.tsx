import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calendar, Key, Shield } from 'lucide-react';
import { EncryptionScheme } from '../../utils/crypto/types';

interface CertificatePreviewProps {
  domain: string;
  organization: string;
  keySize: number;
  scheme: EncryptionScheme;
  validityDays: number;
}

export function CertificatePreview({ 
  domain, 
  organization, 
  keySize,
  scheme,
  validityDays 
}: CertificatePreviewProps) {
  const now = new Date();
  const expiryDate = new Date(now.getTime() + validityDays * 24 * 60 * 60 * 1000);

  return (
    <Card className="h-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Certificate Preview</h3>
          <Badge variant="success" icon={Shield}>Preview</Badge>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500">Domain</label>
                <p className="mt-1 font-mono text-sm text-gray-900">
                  {domain || 'example.com'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Organization</label>
                <p className="mt-1 text-sm text-gray-900">
                  {organization || 'Your Organization'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500">Encryption Scheme</label>
                <p className="mt-1 text-sm text-gray-900">{scheme.name}</p>
                <p className="text-xs text-gray-500 mt-1">{scheme.description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-gray-400" />
              <span>{keySize} bits</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Valid until {expiryDate.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            This is a preview of your certificate. The actual certificate will be generated
            with real cryptographic keys when you submit the form.
          </div>
        </div>
      </div>
    </Card>
  );
}