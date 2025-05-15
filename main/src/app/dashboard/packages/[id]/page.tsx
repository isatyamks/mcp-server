'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { api } from '@/lib/api'
import type { Package, Organization } from '@/lib/api'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { CalendarIcon, UserGroupIcon, CurrencyDollarIcon, AcademicCapIcon, QuestionMarkCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

// Organization logo mapping
const orgLogos: { [key: string]: string } = {
  'PyTorch': 'https://pytorch.org/assets/images/pytorch-logo.png',
  'TensorFlow': 'https://www.tensorflow.org/images/tf_logo_social.png',
  'React': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
  'Node.js': 'https://nodejs.org/static/images/logo.svg',
  'Django': 'https://www.djangoproject.com/m/img/logos/django-logo-positive.png',
  'Flutter': 'https://storage.googleapis.com/cms-storage-bucket/6e19fee6b47b36ca613f.png',
  'Angular': 'https://angular.io/assets/images/logos/angular/angular.svg',
  'Vue.js': 'https://vuejs.org/images/logo.png',
  'MongoDB': 'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
  'PostgreSQL': 'https://www.postgresql.org/media/img/about/press/elephant.png',
  'Docker': 'https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png',
  'Kubernetes': 'https://kubernetes.io/images/kubernetes-horizontal-color.png',
  'AWS': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'Google Cloud': 'https://cloud.google.com/_static/cloud/images/social-icon-google-cloud-1200-630.png',
  'Microsoft Azure': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
  'GitHub': 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
  'GitLab': 'https://about.gitlab.com/images/press/logo/svg/gitlab-icon-rgb.svg',
  'Bitbucket': 'https://wac-cdn.atlassian.com/assets/img/favicons/bitbucket/favicon.png',
  'Jira': 'https://wac-cdn.atlassian.com/assets/img/favicons/jira/favicon.png',
  'Confluence': 'https://wac-cdn.atlassian.com/assets/img/favicons/confluence/favicon.png',
  'Slack': 'https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png',
  'Discord': 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_white_RGB.png',
  'Zoom': 'https://zoom.us/img/download/msi/ZoomLogo.png',
  'Microsoft Teams': 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
  'Notion': 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
  'Figma': 'https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg',
  'Adobe XD': 'https://upload.wikimedia.org/wikipedia/commons/c/c2/Adobe_XD_CC_icon.svg',
  'Sketch': 'https://upload.wikimedia.org/wikipedia/commons/5/59/Sketch_Logo.svg',
  'InVision': 'https://www.invisionapp.com/static/img/invision-logo.svg',
  'Zeplin': 'https://cdn.worldvectorlogo.com/logos/zeplin.svg',
  'Abstract': 'https://cdn.worldvectorlogo.com/logos/abstract-1.svg',
  'default': 'https://via.placeholder.com/150?text=Organization'
}

interface PackageDetails extends Package {
  organization: Organization;
  mentors: {
    id: string;
    name: string;
    role: string;
    email: string;
    image: string;
  }[];
  timeline: {
    phase: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  conditions: {
    title: string;
    description: string;
  }[];
  certifications: {
    title: string;
    description: string;
    requirements: string[];
  }[];
  faq: {
    question: string;
    answer: string;
  }[];
}

export default function PackageDetailsPage() {
  const params = useParams()
  const [packageDetails, setPackageDetails] = useState<PackageDetails | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        // In a real app, this would be an API call
        // For now, using mock data
        const mockPackageDetails: PackageDetails = {
          id: params.id as string,
          title: "PyTorch Deep Learning Internship",
          description: "Deep learning framework package for scalable and flexible AI research.",
          duration: 12,
          organization: {
            id: "1",
            name: "PyTorch",
            description: "An open source machine learning framework",
            logo: "https://pytorch.org/assets/images/pytorch-logo.png",
            isVerified: true,
            techStack: ["Python", "PyTorch", "Deep Learning", "AI"]
          },
          mentors: [
            {
              id: "1",
              name: "Dr. Sarah Chen",
              role: "Lead Research Scientist",
              email: "sarah.chen@pytorch.org",
              image: "https://randomuser.me/api/portraits/women/1.jpg"
            },
            {
              id: "2",
              name: "Alex Kumar",
              role: "Senior ML Engineer",
              email: "alex.kumar@pytorch.org",
              image: "https://randomuser.me/api/portraits/men/1.jpg"
            }
          ],
          timeline: [
            {
              phase: "Phase 1: Onboarding",
              startDate: "2024-03-01",
              endDate: "2024-03-14",
              description: "Initial setup, environment configuration, and project overview"
            },
            {
              phase: "Phase 2: Development",
              startDate: "2024-03-15",
              endDate: "2024-05-15",
              description: "Core development and implementation of assigned features"
            },
            {
              phase: "Phase 3: Testing & Documentation",
              startDate: "2024-05-16",
              endDate: "2024-05-31",
              description: "Testing, documentation, and final deliverables"
            }
          ],
          conditions: [
            {
              title: "Eligibility",
              description: "Must be enrolled in a computer science or related program"
            },
            {
              title: "Commitment",
              description: "Minimum 20 hours per week commitment required"
            },
            {
              title: "Equipment",
              description: "Must have access to a computer meeting minimum specifications"
            }
          ],
          certifications: [
            {
              title: "PyTorch Developer Certification",
              description: "Certification for PyTorch development expertise",
              requirements: [
                "Complete all assigned projects",
                "Pass technical assessment",
                "Submit final documentation"
              ]
            },
            {
              title: "Deep Learning Specialist",
              description: "Advanced certification in deep learning implementation",
              requirements: [
                "Implement complex neural networks",
                "Optimize model performance",
                "Document best practices"
              ]
            }
          ],
          faq: [
            {
              question: "Is this a paid internship?",
              answer: "Yes, this is a paid internship with competitive compensation based on experience and location."
            },
            {
              question: "Can I work remotely?",
              answer: "Yes, this internship is fully remote with flexible working hours."
            },
            {
              question: "What is the selection process?",
              answer: "The selection process includes resume screening, technical assessment, and interview rounds."
            }
          ]
        }
        setPackageDetails(mockPackageDetails)
      } catch (error) {
        console.error('Error fetching package details:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPackageDetails()
  }, [params.id])

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </DashboardLayout>
    )
  }

  if (!packageDetails) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-300">Package not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <img
              src={orgLogos[packageDetails.organization.name] || orgLogos.default}
              alt={packageDetails.organization.name}
              className="w-16 h-16 rounded-lg object-contain bg-white p-2"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {packageDetails.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {packageDetails.organization.name}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Duration
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {packageDetails.duration} weeks
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Compensation
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Paid
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center">
              <UserGroupIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Mentors
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {packageDetails.mentors.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center">
              <AcademicCapIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Certifications
                </p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {packageDetails.certifications.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            About the Package
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            {packageDetails.description}
          </p>
        </div>

        {/* Mentors */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Mentors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {packageDetails.mentors.map((mentor) => (
              <div key={mentor.id} className="flex items-center space-x-4">
                <img
                  src={mentor.image}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {mentor.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{mentor.role}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {mentor.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Timeline
          </h2>
          <div className="space-y-6">
            {packageDetails.timeline.map((phase, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {phase.phase}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(phase.startDate).toLocaleDateString()} - {new Date(phase.endDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Conditions
          </h2>
          <div className="space-y-4">
            {packageDetails.conditions.map((condition, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {condition.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {condition.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Available Certifications
          </h2>
          <div className="space-y-6">
            {packageDetails.certifications.map((cert, index) => (
              <div key={index} className="border dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {cert.description}
                </p>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Requirements:
                  </h4>
                  <ul className="list-disc list-inside space-y-1">
                    {cert.requirements.map((req, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-gray-300">
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {packageDetails.faq.map((item, index) => (
              <div key={index} className="border-b dark:border-gray-700 last:border-0 pb-4 last:pb-0">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
} 