'use client'

import { useState } from 'react'
import { useCertificates } from '@/hooks/useCertificates'
import VerificationResult from '@/components/VerificationResult'
import { Certificate } from '@/types'
import { FiSearch, FiLoader } from 'react-icons/fi'
import toast from 'react-hot-toast'

export default function VerifyForm() {
  const [certId, setCertId] = useState('')
  const [result, setResult] = useState<Certificate | null>(null)
  const { getCertificateById, isLoading } = useCertificates()

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!certId.trim()) {
      toast.error('Please enter a certificate ID')
      return
    }

    try {
      const certificate = await getCertificateById(certId)
      setResult(certificate)
    } catch (error) {
      console.error('Verification error:', error)
      setResult(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="card max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Verify Certificate</h2>

        <form onSubmit={handleVerify} className="flex gap-2">
          <input
            type="text"
            value={certId}
            onChange={(e) => setCertId(e.target.value)}
            placeholder="Enter Certificate ID or Transaction Hash"
            className="input-field flex-1"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center gap-2"
          >
            {isLoading ? <FiLoader className="animate-spin" /> : <FiSearch />}
            Verify
          </button>
        </form>
      </div>

      {result && <VerificationResult result={result} />}
    </div>
  )
}
