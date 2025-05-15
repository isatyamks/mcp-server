'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Task, Badge, Contribution } from '@/lib/api'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import { Doughnut, Bar } from 'react-chartjs-2'
import { CalendarIcon, ClockIcon, CheckCircleIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

// Mock data for commit timeline
const commitTimeline = [
  {
    date: '2024-03-15',
    commits: [
      { time: '10:30 AM', message: 'Completed Web Development Fundamentals', type: 'course' },
      { time: '02:15 PM', message: 'Submitted final project for React Basics', type: 'project' },
      { time: '04:45 PM', message: 'Earned JavaScript Fundamentals badge', type: 'achievement' }
    ]
  },
  {
    date: '2024-03-14',
    commits: [
      { time: '09:00 AM', message: 'Started Node.js Advanced Concepts', type: 'course' },
      { time: '11:30 AM', message: 'Completed 5 coding challenges', type: 'challenge' }
    ]
  },
  {
    date: '2024-03-13',
    commits: [
      { time: '01:00 PM', message: 'Submitted Database Design Assignment', type: 'project' },
      { time: '03:30 PM', message: 'Earned SQL Mastery badge', type: 'achievement' }
    ]
  }
]

// Mock data for activity overview
const activityOverview = {
  totalCommits: 156,
  activeDays: 45,
  currentStreak: 7,
  longestStreak: 14,
  averageDailyCommits: 3.5
}

// Mock data for contribution activity
const contributionActivity = {
  courses: {
    completed: 8,
    inProgress: 3,
    upcoming: 5
  },
  projects: {
    completed: 12,
    inProgress: 2
  },
  achievements: {
    badges: 15,
    certificates: 4
  }
}

export default function ProgressReportPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [badges, setBadges] = useState<Badge[]>([])
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '1' // Mock user ID
        const [userTasks, userBadges, userContributions] = await Promise.all([
          api.getTasks(userId),
          api.getBadges(userId),
          api.getContributions(userId)
        ])
        setTasks(userTasks)
        setBadges(userBadges)
        setContributions(userContributions)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Prepare data for task completion chart
  const taskCompletionData = {
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

  // Prepare data for weekly activity chart
  const weeklyActivityData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [2, 3, 1, 4, 2, 1, 0],
        backgroundColor: 'rgb(59, 130, 246)', // blue-500
      },
    ],
  }

  const weeklyActivityOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Weekly Activity',
      },
    },
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
              Progress Report
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Track your progress and achievements
            </p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Total Tasks
              </h3>
              <p className="mt-2 text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                {tasks.length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Completed Tasks
              </h3>
              <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                {tasks.filter(t => t.status === 'completed').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Earned Badges
              </h3>
              <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {badges.length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Contributions
              </h3>
              <p className="mt-2 text-3xl font-bold text-purple-600 dark:text-purple-400">
                {contributions.length}
              </p>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Task Completion
              </h3>
              <div className="w-64 h-64 mx-auto">
                <Doughnut data={taskCompletionData} />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Weekly Activity
              </h3>
              <div className="h-64">
                <Bar data={weeklyActivityData} options={weeklyActivityOptions} />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {contributions.map((contribution) => (
                <div
                  key={contribution.id}
                  className="flex items-start space-x-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-indigo-600 rounded-full"></div>
                  <div>
                    <p className="text-gray-900 dark:text-white">
                      {contribution.type === 'issue_completed'
                        ? 'Completed an issue'
                        : contribution.type === 'pr_merged'
                        ? 'Merged a pull request'
                        : 'Approved a review'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(contribution.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Earned Badges
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className="border dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{badge.icon}</span>
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                        {badge.title}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {badge.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Overview */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Activity Overview
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Total Commits</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {activityOverview.totalCommits}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Active Days</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {activityOverview.activeDays}
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Current Streak</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {activityOverview.currentStreak} days
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Longest Streak</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {activityOverview.longestStreak} days
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Avg. Daily Commits</span>
                </div>
                <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
                  {activityOverview.averageDailyCommits}
                </p>
              </div>
            </div>
          </div>

          {/* Contribution Activity */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Contribution Activity
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Courses
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Completed</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {contributionActivity.courses.completed}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">In Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {contributionActivity.courses.inProgress}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Upcoming</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {contributionActivity.courses.upcoming}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Projects
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Completed</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {contributionActivity.projects.completed}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">In Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {contributionActivity.projects.inProgress}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
                  Achievements
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Badges Earned</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {contributionActivity.achievements.badges}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Certificates</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {contributionActivity.achievements.certificates}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commit Timeline */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Commit Timeline
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setSelectedTimeframe('week')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeframe === 'week'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setSelectedTimeframe('month')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeframe === 'month'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => setSelectedTimeframe('year')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    selectedTimeframe === 'year'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Year
                </button>
              </div>
            </div>
            <div className="space-y-6">
              {commitTimeline.map((day) => (
                <div key={day.date} className="border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    {new Date(day.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="space-y-3">
                    {day.commits.map((commit, index) => (
                      <div key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-indigo-600"></div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {commit.time}
                          </div>
                          <div className="text-sm text-gray-900 dark:text-white">
                            {commit.message}
                          </div>
                          <div className="mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                              commit.type === 'course'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                : commit.type === 'project'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : commit.type === 'achievement'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                            }`}>
                              {commit.type.charAt(0).toUpperCase() + commit.type.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
} 