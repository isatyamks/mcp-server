'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Task } from '@/lib/api'
import DashboardLayout from '@/components/layout/DashboardLayout'
import './ContributionGrid.css'
import { useParams } from 'next/navigation'

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

type CellData = {
  date: Date;
  count: number;
} | null;

const greenShades = [
  '#161b22', // 0: empty
  '#0e4429', // 1: lowest
  '#006d32', // 2
  '#26a641', // 3
  '#39d353', // 4: highest
];

const ContributionGrid: React.FC = () => {
  const now = new Date();
  const endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 364);
  const startDay = startDate.getDay();
  startDate.setDate(startDate.getDate() - startDay);

  const totalWeeks = 53;
  const contributionGridWeeks: CellData[][] = [];
  let current = new Date(startDate);

  for (let week = 0; week < totalWeeks; week++) {
    const weekArr: CellData[] = [];
    for (let day = 0; day < 7; day++) {
      if (current < startDate || current > endDate) {
        weekArr.push(null);
      } else {
        const count = Math.floor(Math.random() * 5); // 0-4
        weekArr.push({
          date: new Date(current),
          count,
        });
      }
      current.setDate(current.getDate() + 1);
    }
    contributionGridWeeks.push(weekArr);
  }

  return (
    <div className="grid">
      {contributionGridWeeks.map((week, weekIdx) => (
        <div className="column" key={weekIdx}>
          {week.map((cell, dayIdx) => (
            <div
              key={dayIdx}
              className={`cell ${cell ? 'active' : 'empty'}`}
              title={
                cell
                  ? `${cell.date.toDateString()}: ${cell.count} contributions`
                  : ''
              }
              style={{
                backgroundColor: cell
                  ? greenShades[cell.count]
                  : '#0d1117',
              }}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

// Organization logo mapping
const orgLogos: { [key: string]: string } = {
  'PyTorch': 'https://github.com/pytorch/pytorch/raw/main/docs/source/_static/img/pytorch-logo-dark.png',
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

interface Package {
  orgName: string;
  orgLogo: string;
  packageName: string;
  packageDescription: string;
}

const currentPackage: Package = {
  orgName: 'PyTorch',
  orgLogo: orgLogos['PyTorch'] || orgLogos.default,
  packageName: 'PyTorch (DF44)',
  packageDescription: 'Deep learning framework package (ID: DF44) for scalable and flexible AI research.'
};

const logoUrl = orgLogos[currentPackage.orgName];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'in_progress' | 'completed'>('all')
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedPackage, setSelectedPackage] = useState(currentPackage)
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '1' // Mock user ID
        const userTasks = await api.getTasks(userId)
        setTasks(userTasks)
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    return task.status === filter
  })

  const handleStatusChange = async (taskId: string, newStatus: "in_progress" | "completed" | "open" | "pending_review") => {
    try {
      await api.updateTaskStatus(taskId, newStatus)
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ))
    } catch (error) {
      console.error('Error updating task status:', error)
    }
  }

  const handlePackageChange = (pkgId: string) => {
    const pkg = currentPackage;
    setSelectedPackage(pkg);
  };

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
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Assigned Tasks
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Manage and track your assigned tasks
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'all'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('in_progress')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'in_progress'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    filter === 'completed'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredTasks.map((task) => {
              const deadlineStatus = getDeadlineStatus(task.dueDate)
              return (
                <div
                  key={task.id}
                  className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
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
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {task.description}
                      </p>
                      <div className="flex items-center space-x-4 text-sm">
                        <p className={`${deadlineStatus.color}`}>
                          Due: {new Date(task.dueDate).toLocaleDateString()} ({deadlineStatus.text})
                        </p>
                        {task.submission && (
                          <span className="text-gray-500 dark:text-gray-400">
                            Status: {task.submission.status}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value as "in_progress" | "completed" | "open" | "pending_review")}
                        className="rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 text-sm"
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="pending_review">Pending Review</option>
                      </select>
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {selectedTask.title}
              </h3>
              <button
                onClick={() => setSelectedTask(null)}
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
                  Description
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {selectedTask.description}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Requirements
                </h4>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Requirement 1</li>
                  <li>Requirement 2</li>
                  <li>Requirement 3</li>
                </ul>
              </div>
              {selectedTask.submission && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Submission
                  </h4>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-600 dark:text-gray-400">
                      {selectedTask.submission.content}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Submitted on {new Date(selectedTask.submission.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                >
                  Close
                </button>
                {!selectedTask.submission && (
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                  >
                    Submit Work
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
} 