import React, { useState } from 'react';
import { Globe, Lock, ShieldCheck, AlertTriangle } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Certificate } from '../../types/certificate';
import { simulateCertificateTest } from '../../utils/testing/certificateTester';

interface CertificateTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: Certificate;
}

export function CertificateTestModal({ isOpen, onClose, certificate }: CertificateTestModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    details: string;
  } | null>(null);

  const handleTest = async () => {
    setIsLoading(true);
    const result = await simulateCertificateTest(certificate);
    setTestResult(result);
    setIsLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Test Certificate">
      <div className="space-y-6">
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <Globe className="w-6 h-6 text-gray-400" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Testing domain</p>
            <p className="text-sm text-gray-500">{certificate.domain}</p>
          </div>
          <Lock className="w-5 h-5 text-indigo-500" />
        </div>

        {!testResult && !isLoading && (
          <div className="text-center py-4">
            <p className="text-sm text-gray-600 mb-4">
              This will simulate browsing to {certificate.domain} using the generated certificate
            </p>
            <button
              onClick={handleTest}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Start Test
            </button>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-pulse flex flex-col items-center">
              <div className="rounded-full bg-gray-200 h-12 w-12 mb-4"></div>
              <div className="text-sm text-gray-500">Testing certificate...</div>
            </div>
          </div>
        )}

        {testResult && (
          <div className={`p-4 rounded-lg ${
            testResult.success ? 'bg-green-50' : 'bg-red-50'
          }`}>
            <div className="flex items-start">
              {testResult.success ? (
                <ShieldCheck className="w-5 h-5 text-green-400 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
              )}
              <div className="ml-3">
                <h3 className={`text-sm font-medium ${
                  testResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResult.success ? 'Certificate Valid' : 'Certificate Error'}
                </h3>
                <p className={`text-sm ${
                  testResult.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {testResult.details}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}