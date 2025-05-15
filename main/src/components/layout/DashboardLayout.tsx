'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import {
  HomeIcon,
  BriefcaseIcon,
  BellIcon,
  UserIcon,
  FolderIcon,
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  DocumentTextIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  SunIcon,
  MoonIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const studentNavItems: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'My Packages', href: '/dashboard/packages', icon: FolderIcon },
  { name: 'Assigned Tasks', href: '/dashboard/tasks', icon: ClipboardDocumentListIcon },
  { name: 'Submit Work', href: '/dashboard/submit', icon: DocumentCheckIcon },
  { name: 'Certificates', href: '/dashboard/certificates', icon: DocumentTextIcon },
  { name: 'Progress Report', href: '/dashboard/progress', icon: ChartBarIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

// Mock notifications
const mockNotifications = [
  { id: 1, type: 'task', message: 'New task assigned: Fix navbar responsiveness', time: '2 hours ago' },
  { id: 2, type: 'comment', message: 'New comment on your submission', time: '5 hours ago' },
  { id: 3, type: 'certificate', message: 'New certificate available', time: '1 day ago' },
]

// Mock user progress
const mockProgress = {
  completedTasks: 12,
  totalTasks: 20,
  earnedBadges: 5,
  totalBadges: 10,
  currentStreak: 7,
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)

  // Handle navigation
  const handleNavigation = (href: string) => {
    if (pathname === '/dashboard') {
      router.replace(href)
    } else {
      router.push(href)
    }
  }

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (pathname !== '/dashboard') {
        router.replace('/dashboard')
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [pathname, router])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.profile-dropdown') && !target.closest('.profile-button')) {
        setIsProfileOpen(false)
      }
      if (!target.closest('.notifications-dropdown') && !target.closest('.notifications-button')) {
        setIsNotificationsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation Bar */}
      <nav className="fixed top-0 z-50 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <button
                onClick={() => handleNavigation('/dashboard')}
                className="flex ml-2 md:mr-24"
              >
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  Commit
                </span>
              </button>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleNavigation('/dashboard')}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    title="Home"
                  >
                    <HomeIcon className="h-6 w-6" />
                  </button>
                  <button
                    onClick={() => handleNavigation('/explore')}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    title="Explore"
                  >
                    <BriefcaseIcon className="h-6 w-6" />
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                      className="notifications-button text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white relative"
                      title="Notifications"
                    >
                      <BellIcon className="h-6 w-6" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {mockNotifications.length}
                      </span>
                    </button>
                    {isNotificationsOpen && (
                      <div className="notifications-dropdown absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                        <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            Notifications
                          </h3>
                          <button
                            onClick={() => setIsNotificationsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {mockNotifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                            >
                              <p className="text-sm text-gray-900 dark:text-white">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                  >
                    {theme === 'dark' ? (
                      <SunIcon className="h-6 w-6" />
                    ) : (
                      <MoonIcon className="h-6 w-6" />
                    )}
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="profile-button flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                      title="Profile Menu"
                    >
                      <span className="sr-only">Open user menu</span>
                      <UserIcon className="h-8 w-8 text-white" />
                    </button>
                    {isProfileOpen && (
                      <div className="profile-dropdown absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-50">
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              <UserIcon className="h-10 w-10 text-gray-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                John Doe
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                john@example.com
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                          <div className="space-y-2">
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Task Progress
                              </p>
                              <div className="mt-1 flex items-center">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-indigo-600 h-2 rounded-full"
                                    style={{
                                      width: `${(mockProgress.completedTasks / mockProgress.totalTasks) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                  {mockProgress.completedTasks}/{mockProgress.totalTasks}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Badges Earned
                              </p>
                              <div className="mt-1 flex items-center">
                                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                  <div
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{
                                      width: `${(mockProgress.earnedBadges / mockProgress.totalBadges) * 100}%`,
                                    }}
                                  ></div>
                                </div>
                                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                  {mockProgress.earnedBadges}/{mockProgress.totalBadges}
                                </span>
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Current Streak
                              </p>
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {mockProgress.currentStreak} days
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              handleNavigation('/profile')
                              setIsProfileOpen(false)
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Profile
                          </button>
                          <button
                            onClick={() => {
                              handleNavigation('/settings')
                              setIsProfileOpen(false)
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Settings
                          </button>
                          <button
                            onClick={() => {
                              // Add logout functionality here
                              console.log('Logout clicked')
                              setIsProfileOpen(false)
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            Sign out
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {studentNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center p-2 rounded-lg ${
                      isActive
                        ? 'text-white bg-indigo-600'
                        : 'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <item.icon className="w-6 h-6" />
                    <span className="ml-3">{item.name}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`p-4 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        } pt-20 min-h-screen`}
      >
        {children}
      </div>
    </div>
  )
} 