import React, { useState } from 'react';
import { Certificate } from '../../types/certificate';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Download, ArrowLeft, Calendar, Building2, MapPin, Shield, Key, Globe } from 'lucide-react';
import { CertificateContent } from './CertificateContent';
import { CertificateTestModal } from '../testing/CertificateTestModal';

interface CertificateDetailsProps {
  certificate: Certificate;
  onDownload: () => void;
  onBack: () => void;
}

export function CertificateDetails({ certificate, onDownload, onBack }: CertificateDetailsProps) {
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const daysUntilExpiry = Math.ceil(
    (new Date(certificate.expires).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
      <div className="space-y-6">
        <Card className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Certificate Details</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your certificate has been generated successfully
                </p>
              </div>
              <Badge variant="success" icon={Shield}>
                Valid
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Domain</h4>
                  <p className="mt-1 text-sm text-gray-900 font-mono">{certificate.domain}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Organization</h4>
                  <p className="mt-1 text-sm text-gray-900">{certificate.organization}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Key Size</h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <Key className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{certificate.keySize} bits</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Created</h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {new Date(certificate.created).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Expires</h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">
                      {new Date(certificate.expires).toLocaleDateString()}
                      <span className="ml-2 text-gray-500">
                        ({daysUntilExpiry} days remaining)
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span>
                  {certificate.locality}, {certificate.state}, {certificate.country}
                </span>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-200">
              <Button variant="secondary" icon={ArrowLeft} onClick={onBack}>
                Create Another
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  icon={Globe} 
                  onClick={() => setIsTestModalOpen(true)}
                >
                  Test Certificate
                </Button>
                <Button variant="primary" icon={Download} onClick={onDownload}>
                  Download Certificate
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {certificate.publicKey && certificate.privateKey && (
          <Card className="max-w-2xl mx-auto">
            <CertificateContent
              publicKey={certificate.publicKey}
              privateKey={certificate.privateKey}
            />
          </Card>
        )}
      </div>

      <CertificateTestModal
        isOpen={isTestModalOpen}
        onClose={() => setIsTestModalOpen(false)}
        certificate={certificate}
      />
    </>
  );
}