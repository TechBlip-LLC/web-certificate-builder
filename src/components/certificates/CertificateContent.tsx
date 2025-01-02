import React, { useState } from 'react';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';
import { Button } from '../ui/Button';

interface CertificateContentProps {
  publicKey: string;
  privateKey: string;
}

export function CertificateContent({ publicKey, privateKey }: CertificateContentProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedKey, setCopiedKey] = useState<'public' | 'private' | null>(null);

  const handleCopy = async (content: string, type: 'public' | 'private') => {
    await navigator.clipboard.writeText(content);
    setCopiedKey(type);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700">Public Key</h4>
          <Button
            variant="outline"
            size="sm"
            icon={copiedKey === 'public' ? Check : Copy}
            onClick={() => handleCopy(publicKey, 'public')}
          >
            {copiedKey === 'public' ? 'Copied!' : 'Copy'}
          </Button>
        </div>
        <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto text-sm font-mono text-gray-700">
          {publicKey}
        </pre>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-700">Private Key</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={showPrivateKey ? EyeOff : Eye}
              onClick={() => setShowPrivateKey(!showPrivateKey)}
            >
              {showPrivateKey ? 'Hide' : 'Show'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={copiedKey === 'private' ? Check : Copy}
              onClick={() => handleCopy(privateKey, 'private')}
            >
              {copiedKey === 'private' ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
        {showPrivateKey ? (
          <pre className="p-4 bg-gray-50 rounded-lg overflow-x-auto text-sm font-mono text-gray-700">
            {privateKey}
          </pre>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-500 flex items-center justify-center">
            <Eye className="w-4 h-4 mr-2" />
            Click Show to reveal private key
          </div>
        )}
      </div>
    </div>
  );
}