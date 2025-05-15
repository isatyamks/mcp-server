import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

// Mock data
const task = {
  id: 1,
  title: 'Fix navbar responsiveness',
  description: 'The navigation bar is not responsive on mobile devices. Need to implement proper breakpoints.',
  status: 'In Progress',
  progress: 60,
  dueDate: '2024-03-15',
  organization: 'DataSprout AI',
  requirements: [
    'Implement mobile-first design',
    'Add hamburger menu for mobile',
    'Ensure smooth transitions',
    'Test on various screen sizes',
  ],
  submission: {
    status: 'Not Submitted',
    lastUpdated: null,
  },
}

export default function TaskDetails({ params }: { params: { id: string } }) {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/tasks" className="btn-secondary">
            <ArrowLeftIcon className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Task Details</h1>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-2">{task.title}</h2>
              <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                task.status === 'In Progress'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {task.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  {task.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium mb-2">Progress</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Completion</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Details</h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>Organization: {task.organization}</p>
                  <p>Due Date: {task.dueDate}</p>
                  <p>Submission Status: {task.submission.status}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Submit Work</h3>
                <div className="space-y-4">
                  <textarea
                    className="input h-32"
                    placeholder="Describe your changes and implementation details..."
                  />
                  <div className="flex justify-end space-x-4">
                    <button className="btn-secondary">Save Draft</button>
                    <button className="btn-primary">Submit for Review</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
} 