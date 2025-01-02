import { Certificate } from '../../types/certificate';

export async function simulateCertificateTest(certificate: Certificate) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const now = new Date();
  const expiryDate = new Date(certificate.expires);
  const isValid = now < expiryDate;

  if (!isValid) {
    return {
      success: false,
      details: 'Certificate has expired or is not yet valid'
    };
  }

  // Simulate certificate validation
  const validationChecks = [
    checkDomain(certificate.domain),
    checkKeyStrength(certificate.keySize),
    checkOrganization(certificate.organization)
  ];

  const failedCheck = validationChecks.find(check => !check.success);
  
  if (failedCheck) {
    return {
      success: false,
      details: failedCheck.details
    };
  }

  return {
    success: true,
    details: `Successfully validated certificate for ${certificate.domain}`
  };
}

function checkDomain(domain: string) {
  const isValidDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(domain);
  return {
    success: isValidDomain,
    details: isValidDomain ? 'Domain valid' : 'Invalid domain format'
  };
}

function checkKeyStrength(keySize: number) {
  const isStrongKey = keySize >= 2048;
  return {
    success: isStrongKey,
    details: isStrongKey ? 'Key strength sufficient' : 'Key size too weak'
  };
}

function checkOrganization(organization: string) {
  const isValidOrg = organization.length >= 2;
  return {
    success: isValidOrg,
    details: isValidOrg ? 'Organization valid' : 'Invalid organization name'
  };
}