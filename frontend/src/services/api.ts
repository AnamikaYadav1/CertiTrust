import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000'

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export interface CertificatePayload {
  studentAddr: string
  name: string
  issuer: string
  file: File
}

export interface CertificateResponse {
  message: string
  ipfsHash: string
  txHash: string
  certId: string
  docId: string
}

export interface CertificateData {
  id: string
  docId: string
  name: string
  issuer: string
  studentAddr: string
  ipfsHash: string
  txHash: string
  certId: string
  date: string
}

// Certificate API endpoints
export const certificateAPI = {
  /**
   * Issue a new certificate
   */
  issueCertificate: async (payload: CertificatePayload): Promise<CertificateResponse> => {
    const formData = new FormData()
    formData.append('studentAddr', payload.studentAddr)
    formData.append('name', payload.name)
    formData.append('issuer', payload.issuer)
    formData.append('file', payload.file)

    const { data } = await api.post<CertificateResponse>('/certificates/issue', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  /**
   * Get all certificates
   */
  getAllCertificates: async (): Promise<CertificateData[]> => {
    const { data } = await api.get<CertificateData[]>('/certificates')
    return data
  },

  /**
   * Get certificate by ID
   */
  getCertificateById: async (id: string): Promise<CertificateData> => {
    const { data } = await api.get<CertificateData>(`/certificates/${id}`)
    return data
  },

  /**
   * Verify certificate
   */
  verifyCertificate: async (certId: string) => {
    const { data } = await api.get(`/certificates/verify/${certId}`)
    return data
  },
}

export default api
