import React from 'react';
import { Shield, Clock, CheckCircle, XCircle } from 'lucide-react';

interface CertificateProps {
  domain: string;
  expiryDate: string;
  isValid: boolean;
  issuer: string;
}

export function CertificateCard({ domain, expiryDate, isValid, issuer }: CertificateProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-600" />
            <h3 className="text-lg font-semibold text-gray-900">{domain}</h3>
          </div>
          <p className="mt-2 text-sm text-gray-600">Issued by: {issuer}</p>
        </div>
        {isValid ? (
          <CheckCircle className="w-6 h-6 text-green-500" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500" />
        )}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-4 h-4" />
        <span>Expires: {expiryDate}</span>
      </div>
    </div>
  );
}