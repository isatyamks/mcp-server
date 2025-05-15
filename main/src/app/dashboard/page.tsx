'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import type { Task, Organization, Badge, Contribution, Certificate } from '@/lib/api'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { CalendarIcon, ClockIcon, CheckCircleIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import './ContributionGrid.css'

ChartJS.register(ArcElement, Tooltip, Legend)

// Priority and task type colors
const priorityColors = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
}

const taskTypeColors = {
  bug: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  feature: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  improvement: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
}

// Helper function to get deadline status
const getDeadlineStatus = (dueDate: string) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) return { color: 'text-red-600 dark:text-red-400', text: 'Overdue' }
  if (diffDays <= 3) return { color: 'text-orange-600 dark:text-orange-400', text: 'Due soon' }
  return { color: 'text-gray-600 dark:text-gray-400', text: 'On track' }
}

// Calculate the start date (previous Sunday before 1 year ago)
const now = new Date();
const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const startDate = new Date(endDate);
startDate.setDate(startDate.getDate() - 364);
// Move startDate to previous Sunday
const startDay = startDate.getDay();
startDate.setDate(startDate.getDate() - startDay);
// Calculate the end date (next Saturday after today)
const endDay = endDate.getDay();
const paddedEndDate = new Date(endDate);
paddedEndDate.setDate(paddedEndDate.getDate() + (6 - endDay));

// Build the grid: 53 weeks x 7 days
const totalWeeks = 53;
const contributionGridWeeks: ({ date: Date; count: number } | null)[][] = [];
let current = new Date(startDate);
for (let week = 0; week < totalWeeks; week++) {
  const weekArr: ({ date: Date; count: number } | null)[] = [];
  for (let day = 0; day < 7; day++) {
    if (current < startDate || current > endDate) {
      weekArr.push(null);
    } else {
      weekArr.push({ date: new Date(current), count: Math.floor(Math.random() * 5) });
    }
    current.setDate(current.getDate() + 1);
  }
  contributionGridWeeks.push(weekArr);
}

// Helper for month labels
const getMonthLabels = (weeks: ({ date: Date; count: number } | null)[][]) => {
  const months: string[] = [];
  let lastMonth = -1;
  for (let weekIdx = 0; weekIdx < weeks.length; weekIdx++) {
    const firstDay = weeks[weekIdx][0]?.date;
    if (firstDay) {
      const month = firstDay.getMonth();
      if (month !== lastMonth) {
        months.push(firstDay.toLocaleString('default', { month: 'short' }));
        lastMonth = month;
      } else {
        months.push('');
      }
    } else {
      months.push('');
    }
  }
  return months;
};

const monthLabels = getMonthLabels(contributionGridWeeks);
const weekdayLabels = ['Mon', 'Wed', 'Fri'];

// Calculate total contributions
const totalContributions = contributionGridWeeks.flat().reduce((sum, cell) => sum + (cell?.count || 0), 0);

// Mock data for recent activity
const recentActivity = [
  {
    id: 1,
    type: 'course',
    title: 'Web Development Fundamentals',
    description: 'Completed Module 3: Advanced CSS',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'project',
    title: 'E-commerce Website',
    description: 'Submitted final project for review',
    time: '5 hours ago'
  },
  {
    id: 3,
    type: 'achievement',
    title: 'JavaScript Mastery',
    description: 'Earned JavaScript Fundamentals badge',
    time: '1 day ago'
  }
]

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

// Mock data for current package
const currentPackage = {
  orgLogo: orgLogos['PyTorch'] || orgLogos.default,
  orgName: 'PyTorch',
  packageName: 'PyTorch (DF44)', // Show package name with ID
  packageDescription: 'Deep learning framework package (ID: DF44) for scalable and flexible AI research.'
};

export default function DashboardPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [organizations, setOrganizations] = useState<Organization[]>([])
  const [badges, setBadges] = useState<Badge[]>([])
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'task', message: 'New task assigned: Fix navbar responsiveness', time: '2 hours ago' },
    { id: 2, type: 'comment', message: 'New comment on your submission', time: '5 hours ago' },
    { id: 3, type: 'certificate', message: 'New certificate available', time: '1 day ago' },
  ])
  const [selectedTimeframe, setSelectedTimeframe] = useState('year')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Mock user ID for testing
        const userId = '1'
        const [userTasks, userBadges, userContributions] = await Promise.all([
          api.getTasks(userId),
          api.getBadges(userId),
          api.getContributions(userId)
        ])
        setTasks(userTasks)
        setBadges(userBadges)
        setContributions(userContributions)
        
        const orgs = await api.getOrganizations()
        setOrganizations(orgs)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  // Prepare data for progress chart
  const progressData = {
    labels: ['Completed', 'In Progress', 'Pending'],
    datasets: [
      {
        data: [
          tasks.filter(t => t.status === 'completed').length,
          tasks.filter(t => t.status === 'in_progress').length,
          tasks.filter(t => t.status === 'open').length,
        ],
        backgroundColor: [
          'rgb(34, 197, 94)', // green-500
          'rgb(59, 130, 246)', // blue-500
          'rgb(156, 163, 175)', // gray-400
        ],
      },
    ],
  }

  // Function to get color based on contribution count
  const getContributionColor = (count: number) => {
    if (count === 0) return 'bg-gray-100 dark:bg-gray-800'
    if (count === 1) return 'bg-green-100 dark:bg-green-900'
    if (count === 2) return 'bg-green-200 dark:bg-green-800'
    if (count === 3) return 'bg-green-300 dark:bg-green-700'
    return 'bg-green-400 dark:bg-green-600'
  }

  return (
    <DashboardLayout>
      {/* Current Package Section */}
      <Link href={`/dashboard/packages/${currentPackage.packageName.split(' ')[1].replace(/[()]/g, '')}`} className="block">
        <div className="bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-xl shadow-lg p-6 flex items-center mb-8 hover:opacity-90 transition-opacity cursor-pointer">
          <img
            src={currentPackage.orgLogo}
            alt={currentPackage.orgName + ' logo'}
            className="w-16 h-16 rounded-lg shadow-md border-2 border-white bg-white object-contain p-2"
          />
          <div className="ml-6 flex-1">
            <div className="flex items-center space-x-3">
              <span className="text-lg font-semibold text-white drop-shadow">{currentPackage.orgName}</span>
              <span className="px-3 py-1 rounded-full bg-white bg-opacity-20 text-white text-xs font-medium border border-white border-opacity-30">Active Package</span>
            </div>
            <h2 className="text-2xl font-bold text-white mt-1 drop-shadow">{currentPackage.packageName}</h2>
            <p className="text-white text-opacity-90 mt-2 text-sm">{currentPackage.packageDescription}</p>
          </div>
        </div>
      </Link>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Welcome back! Here's your learning progress
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center">
                <AcademicCapIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Active Courses
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    3
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center">
                <CheckCircleIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Completed Tasks
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    12
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center">
                <ChartBarIcon className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Current Streak
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    7 days
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <div className="flex items-center">
                <CalendarIcon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Hours
                  </p>
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                    48
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Current Tasks */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Current Tasks
            </h2>
            <div className="space-y-4">
              {tasks
                .filter(task => task.status === 'in_progress')
                .map((task) => {
                  const deadlineStatus = getDeadlineStatus(task.dueDate)
                  return (
                    <div
                      key={task.id}
                      className="border dark:border-gray-700 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {task.title}
                            </h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors.high}`}>
                              High Priority
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs ${taskTypeColors.feature}`}>
                              Feature
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mt-1">
                            {task.description}
                          </p>
                          <div className="flex items-center mt-2 space-x-4">
                            <p className={`text-sm ${deadlineStatus.color}`}>
                              Due: {new Date(task.dueDate).toLocaleDateString()} ({deadlineStatus.text})
                            </p>
                            {task.submission && (
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Status: {task.submission.status}
                              </span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => router.push(`/dashboard/tasks/${task.id}`)}
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 text-sm"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Contribution Grid (GitHub style) */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {totalContributions} contributions in the last year
            </div>
            <div className="flex">
              {/* Weekday labels */}
              <div className="flex flex-col justify-between mr-2 py-2">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs text-gray-400 dark:text-gray-500 h-3 ${i === 1 || i === 3 || i === 5 ? '' : 'invisible'}`}
                  >
                    {weekdayLabels[(i - 1) / 2] || ''}
                  </span>
                ))}
              </div>
              <div className="overflow-x-auto">
                {/* Month labels */}
                <div className="flex mb-1 ml-4">
                  {monthLabels.map((label, idx) => (
                    <span
                      key={idx}
                      className={`text-xs text-gray-400 dark:text-gray-500 w-3 text-center`}
                      style={{ minWidth: '12px' }}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                {/* Grid: render by week (column), then day (row) */}
                <div className="contribution-grid">
                  {contributionGridWeeks.map((week, weekIdx) =>
                    week.map((cell, dayIdx) => (
                      cell ? (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className={`contribution-cell contribution-level-${Math.min(cell.count, 4)}`}
                          title={`${cell.date.toLocaleDateString()}: ${cell.count} contributions`}
                        />
                      ) : (
                        <div
                          key={`${weekIdx}-${dayIdx}`}
                          className="contribution-cell contribution-level-0"
                        />
                      )
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="mt-4 flex items-center justify-end space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
              <div className="flex space-x-1">
                {[0, 1, 2, 3, 4].map((count) => (
                  <div
                    key={count}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(count)}`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex-shrink-0">
                    {activity.type === 'course' ? (
                      <AcademicCapIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    ) : activity.type === 'project' ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <ChartBarIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <span className="text-4xl mb-4 block">{selectedBadge.icon}</span>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedBadge.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {selectedBadge.description}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                Earned on {new Date(selectedBadge.earnedAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => setSelectedBadge(null)}
              className="mt-6 w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
} 