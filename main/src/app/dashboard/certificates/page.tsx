'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Certificate } from '@/lib/api'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '1' // Mock user ID
        const userCertificates = await api.getCertificates(userId)
        setCertificates(userCertificates)
      } catch (error) {
        console.error('Error fetching certificates:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleDownload = async (certificateId: string) => {
    try {
      // Mock download functionality
      console.log('Downloading certificate:', certificateId)
      // In a real application, this would trigger a file download
    } catch (error) {
      console.error('Error downloading certificate:', error)
    }
  }

  return (
    <DashboardLayout>
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Certificates
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              View and download your earned certificates
            </p>
          </div>

          {certificates.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 text-center">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                No certificates yet
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-300">
                Complete tasks and earn certificates as you progress
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {certificate.packageId}
                      </h3>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Verified
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <p>
                        <span className="font-medium">Organization:</span>{' '}
                        {certificate.organizationId}
                      </p>
                      <p>
                        <span className="font-medium">Mentor:</span>{' '}
                        {certificate.mentorId}
                      </p>
                      <p>
                        <span className="font-medium">Completed Tasks:</span>{' '}
                        {certificate.completedTasks.length}
                      </p>
                      <p>
                        <span className="font-medium">Issued On:</span>{' '}
                        {new Date(certificate.issuedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        onClick={() => setSelectedCertificate(certificate)}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => handleDownload(certificate.id)}
                        className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white text-sm font-medium"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Certificate Detail Modal */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Certificate Details
              </h3>
              <button
                onClick={() => setSelectedCertificate(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Package
                </h4>
                <p className="text-gray-900 dark:text-white">
                  {selectedCertificate.packageId}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Organization
                </h4>
                <p className="text-gray-900 dark:text-white">
                  {selectedCertificate.organizationId}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Mentor
                </h4>
                <p className="text-gray-900 dark:text-white">
                  {selectedCertificate.mentorId}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Completed Tasks
                </h4>
                <ul className="list-disc list-inside text-gray-900 dark:text-white">
                  {selectedCertificate.completedTasks.map((task) => (
                    <li key={task}>{task}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Verification
                </h4>
                <p className="text-gray-900 dark:text-white">
                  Certificate ID: {selectedCertificate.id}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  This certificate can be verified using the QR code
                </p>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDownload(selectedCertificate.id)}
                  className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                  Download Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
} 