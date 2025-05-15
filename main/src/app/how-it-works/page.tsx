import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav className="border-b border-gray-200 dark:border-dark-300 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-bold text-primary-600">Commit</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="btn-secondary">
                Sign in
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-8">
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">How It Works</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're revolutionizing the way students gain real-world experience through meaningful open-source contributions
          </p>
        </div>

        {/* Problem Statement */}
        <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-red-800 dark:text-red-300 text-center">The Problem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="font-medium mb-3 text-red-700 dark:text-red-400">Limited Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-300">High competition and limited internship positions make it difficult for students to gain real-world experience.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="font-medium mb-3 text-red-700 dark:text-red-400">Scam Internships</h3>
              <p className="text-gray-600 dark:text-gray-300">Many companies offer fake internships focused on marketing and sales rather than actual skill development.</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <h3 className="font-medium mb-3 text-red-700 dark:text-red-400">Domain Mismatch</h3>
              <p className="text-gray-600 dark:text-gray-300">Students often end up working on projects unrelated to their field of study or career goals.</p>
            </div>
          </div>
        </div>

        {/* Our Solution */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-xl font-medium ml-4">Choose Your Path</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Browse through verified organizations and select projects that match your tech stack and interests. Our platform ensures you work on relevant, meaningful projects.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-xl font-medium ml-4">Submit Proposals</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Send proposals to organizations you're interested in. Showcase your skills and explain how you can contribute to their open-source projects.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-xl font-medium ml-4">Get Mentored</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Work directly with experienced mentors from the organization. Receive guidance, code reviews, and valuable feedback on your contributions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-600">4</span>
                </div>
                <h3 className="text-xl font-medium ml-4">Earn Recognition</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Get verified certificates and recommendations. Build a strong portfolio with real open-source contributions that showcase your skills to future employers.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Verified Organizations</h3>
              <p className="text-gray-600 dark:text-gray-300">All organizations are thoroughly vetted to ensure legitimate opportunities.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Real Projects</h3>
              <p className="text-gray-600 dark:text-gray-300">Work on actual open-source projects that make a real impact.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-medium mb-2">Career Growth</h3>
              <p className="text-gray-600 dark:text-gray-300">Build a strong portfolio and gain valuable industry connections.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Join our platform today and take the first step towards building your career through meaningful open-source contributions.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/register" className="btn-primary">
              Get Started
            </Link>
            <Link href="/explore" className="btn-secondary">
              Explore Organizations
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
} 