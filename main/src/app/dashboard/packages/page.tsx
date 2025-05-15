'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Organization, Package } from '@/lib/api'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function PackagesPage() {
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgs = await api.getOrganizations()
        setOrganizations(orgs)
      } catch (error) {
        console.error('Error fetching organizations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const content = loading ? (
    <div className="text-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
    </div>
  ) : (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Available Internship Packages
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Browse and apply for internship packages from verified organizations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <div
            key={org.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {org.name}
                </h3>
                {org.isVerified && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Verified
                  </span>
                )}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {org.description}
              </p>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {org.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                {org.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className="border dark:border-gray-700 rounded-lg p-4"
                  >
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {pkg.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {pkg.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Duration: {pkg.duration} weeks
                      </span>
                      <button
                        onClick={() => setSelectedOrg(org)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <DashboardLayout>
      {content}
      {selectedOrg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Apply for {selectedOrg.name}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Select Package
                </label>
                <select className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700">
                  {selectedOrg.packages.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Cover Letter
                </label>
                <textarea
                  className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                  rows={4}
                  placeholder="Tell us why you're interested in this internship..."
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrg(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
} 