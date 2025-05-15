'use client'

import { useEffect, useState } from 'react'
import { api } from '@/lib/api'
import type { Task } from '@/lib/api'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function SubmitWorkPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [submissionContent, setSubmissionContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = '1' // Mock user ID
        const userTasks = await api.getTasks(userId)
        setTasks(userTasks.filter(task => task.status === 'in_progress'))
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedTask) return

    setSubmitting(true)
    try {
      await api.submitTask(selectedTask.id, {
        content: submissionContent,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        comments: []
      })
      setTasks(tasks.filter(task => task.id !== selectedTask.id))
      setSelectedTask(null)
      setSubmissionContent('')
    } catch (error) {
      console.error('Error submitting task:', error)
    } finally {
      setSubmitting(false)
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
              Submit Work
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Submit your completed tasks for review
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Task List */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Tasks Ready for Submission
              </h2>
              {tasks.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-300">
                  No tasks are ready for submission
                </p>
              ) : (
                tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedTask(task)}
                  >
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {task.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">
                      {task.description}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Submission Form */}
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              {selectedTask ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {selectedTask.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {selectedTask.description}
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="submission"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Your Submission
                    </label>
                    <textarea
                      id="submission"
                      rows={8}
                      className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700"
                      placeholder="Describe your work, include links to code repositories, and any other relevant information..."
                      value={submissionContent}
                      onChange={(e) => setSubmissionContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedTask(null)
                        setSubmissionContent('')
                      }}
                      className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {submitting ? 'Submitting...' : 'Submit Work'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-300">
                    Select a task to submit your work
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
} 