import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'
import Link from 'next/link'

// Mock data
const tasks = [
  {
    id: 1,
    title: 'Fix navbar responsiveness',
    description: 'The navigation bar is not responsive on mobile devices. Need to implement proper breakpoints.',
    status: 'In Progress',
    progress: 60,
    dueDate: '2024-03-15',
    organization: 'DataSprout AI',
  },
  {
    id: 2,
    title: 'Implement user authentication',
    description: 'Add JWT-based authentication system with login and registration functionality.',
    status: 'Pending Review',
    progress: 100,
    dueDate: '2024-03-20',
    organization: 'DataSprout AI',
  },
]

export default function Tasks() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Tasks</h1>
          <div className="flex space-x-4">
            <select className="input max-w-xs">
              <option value="">All Status</option>
              <option value="in-progress">In Progress</option>
              <option value="pending">Pending Review</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <Card key={task.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
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
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>Organization: {task.organization}</span>
                  <span>Due: {task.dueDate}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} />
                </div>
                <div className="flex justify-end space-x-4">
                  <Link href={`/tasks/${task.id}`} className="btn-secondary">
                    View Details
                  </Link>
                  {task.status === 'In Progress' && (
                    <button className="btn-primary">Submit for Review</button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 