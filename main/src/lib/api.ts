// Types
export interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'mentor' | 'organization'
  badges?: Badge[]
  contributions?: Contribution[]
}

export interface Badge {
  id: string
  title: string
  description: string
  icon: string
  earnedAt: string
}

export interface Contribution {
  id: string
  date: string
  type: 'issue_completed' | 'pr_merged' | 'review_approved'
  taskId: string
}

export interface Task {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'pending_review' | 'completed'
  organizationId: string
  assignedTo?: string
  dueDate: string
  submission?: {
    content: string
    submittedAt: string
    reviewedBy?: string
    reviewComments?: string
    status: 'pending' | 'approved' | 'rejected'
  }
}

export interface Organization {
  id: string
  name: string
  description: string
  techStack: string[]
  packages: Package[]
  mentors: string[]
  isVerified: boolean
}

export interface Package {
  id: string
  title: string
  duration: string
  isPaid: boolean
  totalIssues: number
  price?: number
}

export interface Certificate {
  id: string
  studentId: string
  organizationId: string
  mentorId: string
  packageId: string
  completedTasks: string[]
  startDate: string
  endDate: string
  issuedAt: string
  qrCode: string
}

// Mock Data
const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'student',
    badges: [
      {
        id: '1',
        title: 'First PR Merged',
        description: 'Successfully merged your first pull request',
        icon: '🎯',
        earnedAt: '2024-03-01'
      }
    ],
    contributions: [
      {
        id: '1',
        date: '2024-03-01',
        type: 'pr_merged',
        taskId: '1'
      }
    ]
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'mentor'
  }
]

const tasks: Task[] = [
  {
    id: '1',
    title: 'Fix navbar responsiveness',
    description: 'Make the navbar responsive for mobile devices',
    status: 'in_progress',
    organizationId: '1',
    assignedTo: '1',
    dueDate: '2024-03-15',
    submission: {
      content: 'Implemented responsive design using Tailwind CSS',
      submittedAt: '2024-03-10',
      status: 'pending'
    }
  }
]

const organizations: Organization[] = [
  {
    id: '1',
    name: 'DataSprout AI',
    description: 'Building the future of AI-powered analytics',
    techStack: ['Python', 'TensorFlow', 'React'],
    packages: [
      {
        id: '1',
        title: '5-Issue Internship',
        duration: '3 weeks',
        isPaid: false,
        totalIssues: 5
      }
    ],
    mentors: ['2'],
    isVerified: true
  }
]

const certificates: Certificate[] = []

// API Functions
export const api = {
  // Auth
  login: async (email: string, password: string): Promise<User> => {
    // Accept any email/password combination and return a default student user
    return {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: 'student',
      badges: [],
      contributions: []
    }
  },

  register: async (userData: Omit<User, 'id'>): Promise<User> => {
    const newUser = { ...userData, id: String(users.length + 1) }
    users.push(newUser)
    return newUser
  },

  // Tasks
  getTasks: async (userId: string): Promise<Task[]> => {
    return tasks.filter(task => task.assignedTo === userId)
  },

  getTask: async (taskId: string): Promise<Task> => {
    const task = tasks.find(t => t.id === taskId)
    if (!task) throw new Error('Task not found')
    return task
  },

  updateTaskStatus: async (taskId: string, status: Task['status']): Promise<Task> => {
    const taskIndex = tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) throw new Error('Task not found')
    tasks[taskIndex].status = status
    return tasks[taskIndex]
  },

  submitTask: async (taskId: string, content: string): Promise<Task> => {
    const taskIndex = tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) throw new Error('Task not found')
    tasks[taskIndex].submission = {
      content,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    }
    tasks[taskIndex].status = 'pending_review'
    return tasks[taskIndex]
  },

  reviewTask: async (taskId: string, mentorId: string, approved: boolean, comments?: string): Promise<Task> => {
    const taskIndex = tasks.findIndex(t => t.id === taskId)
    if (taskIndex === -1) throw new Error('Task not found')
    if (!tasks[taskIndex].submission) throw new Error('No submission found')
    
    tasks[taskIndex].submission.reviewedBy = mentorId
    tasks[taskIndex].submission.reviewComments = comments
    tasks[taskIndex].submission.status = approved ? 'approved' : 'rejected'
    tasks[taskIndex].status = approved ? 'completed' : 'in_progress'
    
    return tasks[taskIndex]
  },

  // Organizations
  getOrganizations: async (): Promise<Organization[]> => {
    return organizations
  },

  getOrganization: async (orgId: string): Promise<Organization> => {
    const org = organizations.find(o => o.id === orgId)
    if (!org) throw new Error('Organization not found')
    return org
  },

  applyToPackage: async (userId: string, packageId: string): Promise<void> => {
    console.log(`User ${userId} applied to package ${packageId}`)
  },

  // Certificates
  generateCertificate: async (studentId: string, packageId: string): Promise<Certificate> => {
    const student = users.find(u => u.id === studentId)
    const pkg = organizations.flatMap(o => o.packages).find(p => p.id === packageId)
    if (!student || !pkg) throw new Error('Invalid student or package')

    const certificate: Certificate = {
      id: String(certificates.length + 1),
      studentId,
      organizationId: '1', // Mock org ID
      mentorId: '2', // Mock mentor ID
      packageId,
      completedTasks: tasks.filter(t => t.assignedTo === studentId && t.status === 'completed').map(t => t.id),
      startDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 3 weeks ago
      endDate: new Date().toISOString(),
      issuedAt: new Date().toISOString(),
      qrCode: `https://commit.example.com/verify/${String(certificates.length + 1)}`
    }

    certificates.push(certificate)
    return certificate
  },

  getCertificate: async (certificateId: string): Promise<Certificate> => {
    const certificate = certificates.find(c => c.id === certificateId)
    if (!certificate) throw new Error('Certificate not found')
    return certificate
  },

  // Badges and Contributions
  getBadges: async (userId: string): Promise<Badge[]> => {
    const user = users.find(u => u.id === userId)
    return user?.badges || []
  },

  getContributions: async (userId: string): Promise<Contribution[]> => {
    const user = users.find(u => u.id === userId)
    return user?.contributions || []
  }
} 