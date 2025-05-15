'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { MagnifyingGlassIcon, StarIcon, BookmarkIcon, ClockIcon, CurrencyDollarIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline'

// Mock data for trending packages
const trendingPackages = [
  {
    id: 1,
    name: 'Web Development Bootcamp',
    organization: 'TechAcademy',
    description: 'Comprehensive web development course covering frontend and backend technologies',
    issues: 5,
    price: 'Free',
    timeline: '3 months',
    tags: ['web-development', 'javascript', 'react']
  },
  {
    id: 2,
    name: 'Machine Learning Fundamentals',
    organization: 'DataScience Pro',
    description: 'Learn the basics of machine learning and AI with hands-on projects',
    issues: 3,
    price: 'Paid',
    timeline: '6 months',
    tags: ['machine-learning', 'python', 'ai']
  },
  {
    id: 3,
    name: 'DevOps Mastery',
    organization: 'CloudExperts',
    description: 'Master DevOps practices, tools, and methodologies',
    issues: 2,
    price: 'Paid',
    timeline: '4 months',
    tags: ['devops', 'cloud', 'automation']
  }
]

// Mock data for popular topics
const popularTopics = [
  { name: 'Web Development', description: 'Learn modern web development technologies and frameworks' },
  { name: 'Data Science', description: 'Master data analysis, visualization, and machine learning' },
  { name: 'DevOps', description: 'Learn continuous integration, deployment, and infrastructure as code' },
  { name: 'Mobile Development', description: 'Build native and cross-platform mobile applications' },
  { name: 'Cloud Computing', description: 'Master cloud platforms and serverless architecture' }
]

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Explore
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Discover trending packages, topics, and collections
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search packages, topics, or collections..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        {/* Trending Packages */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Trending Packages
            </h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
              See more
            </button>
          </div>
          <div className="space-y-4">
            {trendingPackages.map((pkg) => (
              <div key={pkg.id} className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                      {pkg.organization}/{pkg.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                      {pkg.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ExclamationCircleIcon className="h-4 w-4 mr-1" />
                        {pkg.issues} issues
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                        {pkg.price}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        {pkg.timeline}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-500">
                    <BookmarkIcon className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {pkg.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Topics */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Popular Topics
            </h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
              See more
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularTopics.map((topic) => (
              <div
                key={topic.name}
                className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                  #{topic.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                  {topic.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Collections */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">
              Featured Collections
            </h2>
            <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
              See more
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Free Learning Paths
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                Curated collection of free learning packages for beginners
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                12 packages in this collection
              </div>
            </div>
            <div className="border dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Premium Courses
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                High-quality paid packages with expert instructors
              </p>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                8 packages in this collection
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 