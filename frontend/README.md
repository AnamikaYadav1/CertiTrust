# CertiTrust Frontend

A modern blockchain-based certificate verification system frontend built with Next.js, React, and Tailwind CSS.

## 🚀 Features

- **MetaMask Integration** - Connect with Web3 wallets
- **Certificate Issuance** - Issue certificates on Polygon blockchain
- **Certificate Verification** - Verify certificate authenticity in real-time
- **QR Code Generation** - Generate QR codes for easy sharing
- **Admin Dashboard** - Manage issuers and certificates
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Real-time Notifications** - Toast notifications for user actions

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- MetaMask browser extension
- Polygon Amoy Testnet funds (MATIC)

## 🔧 Installation

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Update environment variables in `.env.local`:
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_CONTRACT_ADDRESS=0x7999B3374aa6dbddC6619e7B9ad3be9F5Ff346e4
NEXT_PUBLIC_NETWORK_ID=80002
```

## 🏃 Running the Application

Development mode:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm run start
```

The application will be available at `http://localhost:3000`

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/              # Next.js app routes
│   │   ├── page.tsx      # Home page
│   │   ├── issuer/       # Issuer dashboard
│   │   ├── verify/       # Verification page
│   │   ├── admin/        # Admin dashboard
│   │   └── layout.tsx    # Root layout
│   ├── components/       # Reusable React components
│   ├── services/         # API and blockchain services
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript definitions
│   └── styles/           # CSS files
├── public/               # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL (default: http://localhost:5000) |
| `NEXT_PUBLIC_CONTRACT_ADDRESS` | Smart contract address on Polygon |
| `NEXT_PUBLIC_NETWORK_ID` | Polygon Amoy network ID (80002) |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint for Polygon Amoy |

## 🌐 Pages

- **Home** (`/`) - Landing page with features and how-it-works
- **Issue** (`/issuer`) - Certificate issuance form (for whitelisted issuers)
- **Verify** (`/verify`) - Certificate verification interface
- **Admin** (`/admin`) - Admin dashboard (for administrators)

## 🔗 Web3 Integration

The application uses:
- **ethers.js v6** - For blockchain interactions
- **MetaMask** - For wallet connection
- **Polygon Amoy** - Test network

## 📦 Key Dependencies

- **Next.js 14** - React framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Ethers.js** - Blockchain interaction
- **Axios** - HTTP client
- **qrcode.react** - QR code generation
- **react-hot-toast** - Notifications
- **react-icons** - Icon library

## 🎨 UI Components

- **Header** - Navigation bar with wallet connection
- **Footer** - Footer with links and info
- **IssueCertificate** - Form for issuing certificates
- **VerifyForm** - Form for verifying certificates
- **VerificationResult** - Display verification results

## 🛠️ Custom Hooks

- **useWeb3** - Wallet connection and management
- **useCertificates** - Certificate operations (issue, get, verify)

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

## 🔒 Security Notes

- Private keys never exposed in frontend
- All transactions signed by user's wallet
- Environment variables for sensitive data
- Input validation on all forms

## 🐛 Troubleshooting

### MetaMask Not Connecting
- Ensure MetaMask is installed
- Check if you're on Polygon Amoy network
- Try disconnecting and reconnecting

### API Connection Error
- Ensure backend is running on localhost:5000
- Check `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
- Check CORS configuration on backend

## 📄 License

ISC License

## 👥 Contributing

Contributions are welcome! Please follow standard Git workflows.

## 📞 Support

For support, contact: support@certitrust.com
