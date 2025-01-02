import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { CertificateForm } from './components/forms/CertificateForm';
import { CertificateDetails } from './components/certificates/CertificateDetails';
import { generateCertificate } from './utils/certificateGenerator';
import { Certificate, CertificateFormData } from './types/certificate';
import { BackgroundPattern } from './components/ui/BackgroundPattern';
import { Footer } from './components/ui/Footer';
import { CertificateError } from './utils/errors/CertificateError';

function App() {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: CertificateFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const newCertificate = await generateCertificate(formData);
      setCertificate(newCertificate);
    } catch (err) {
      const message = err instanceof CertificateError 
        ? err.message 
        : 'Failed to generate certificate. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackgroundPattern />
      <div className="relative min-h-screen flex flex-col">
        <div className="flex-grow max-w-7xl mx-auto px-4 py-6 sm:px-6 sm:py-12 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-3 sm:p-4 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl sm:rounded-2xl shadow-xl">
                <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 lg:text-5xl">
              Certificate Builder
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto">
              Generate secure SSL/TLS certificates for your local dev app
            </p>
          </div>

          {error && (
            <div className="max-w-2xl mx-auto mb-6">
              <div className="p-4 bg-red-50 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            </div>
          )}

          <div className="mt-8 sm:mt-12 animate-fade-in">
            {!certificate ? (
              <CertificateForm 
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            ) : (
              <CertificateDetails 
                certificate={certificate}
                onBack={() => setCertificate(null)}
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;