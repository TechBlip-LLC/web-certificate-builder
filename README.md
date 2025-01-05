# Certificate Builder

A modern, secure SSL/TLS certificate generator for local development.

![React](https://img.shields.io/badge/react-18.3-61DAFB.svg)  ![TypeScript](https://img.shields.io/badge/typescript-5.5-3178C6.svg)  ![Vite](https://img.shields.io/badge/vite-5.4-646CFF.svg)  ![TailwindCSS](https://img.shields.io/badge/tailwindcss-3.4-38B2AC.svg)  ![WebCrypto](https://img.shields.io/badge/webcrypto-supported-success.svg)  ![Mobile](https://img.shields.io/badge/mobile-ready-brightgreen.svg)

## Features

- Generate SSL/TLS certificates for local development
- Multiple encryption schemes (RSA-PSS, RSASSA-PKCS1-v1_5, RSA-OAEP, ECDSA)
- Configurable key sizes (2048-8192 bits)
- Mobile-responsive design
- Real-time certificate preview
- Local certificate storage
- Certificate validity testing

![Certbuild1](public/images/certbuild1.png)

![Certbuild2](public/images/certbuild2.png)

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Security

All cryptographic operations are performed client-side using the WebCrypto API. No sensitive data leaves your browser.

## Creator

Ed Bates (TECHBLIP LLC)

## Acknowledgments

Some sections of this code were generated with the assistance of AI tools.  These contributions were reviewed and integrated by the project creator(s).

## License

Apache-2.0 license - see the [LICENSE](LICENSE) file for details
