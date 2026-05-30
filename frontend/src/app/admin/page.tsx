'use client'

import { useAuthStore } from '@/store'

export default function AdminPage() {
  const { isConnected, user } = useAuthStore()

  if (!isConnected) {
    return (
      <div className="card max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-gray-600 mb-6">
          Please connect your MetaMask wallet to access admin panel.
        </p>
        <a href="/" className="btn-primary inline-block">
          Go to Home
        </a>
      </div>
    )
  }

  if (user?.role !== 'admin') {
    return (
      <div className="card max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Admin Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You don't have permission to access the admin panel.
        </p>
        <a href="/" className="btn-primary inline-block">
          Go to Home
        </a>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage issuers, certificates, and system settings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Certificates</h3>
          <p className="text-4xl font-bold">0</p>
        </div>

        <div className="card">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Approved Issuers</h3>
          <p className="text-4xl font-bold">0</p>
        </div>

        <div className="card">
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Fraud Attempts</h3>
          <p className="text-4xl font-bold">0</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-4">Admin Features (Coming Soon)</h2>
        <ul className="space-y-2 text-gray-600">
          <li>✓ Issuer Whitelisting</li>
          <li>✓ Certificate Revocation Management</li>
          <li>✓ Fraud Detection & Alerts</li>
          <li>✓ Analytics Dashboard</li>
          <li>✓ System Settings</li>
        </ul>
      </div>
    </div>
  )
}
