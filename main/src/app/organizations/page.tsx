import DashboardLayout from '@/components/layout/DashboardLayout'
import { Card } from '@/components/ui/Card'

// Mock data
const organizations = [
  {
    id: 1,
    name: 'DataSprout AI',
    description: 'Building the future of AI-powered analytics',
    techStack: ['Python', 'TensorFlow', 'React'],
    packages: [
      { title: '5-Issue Internship', duration: '3 weeks', paid: false },
      { title: '10-Issue Internship', duration: '4 weeks', paid: true },
    ],
  },
  {
    id: 2,
    name: 'CodeNova',
    description: 'Revolutionizing web development',
    techStack: ['React', 'Node.js', 'TypeScript'],
    packages: [
      { title: '5-Issue Internship', duration: '3 weeks', paid: false },
      { title: 'Long-term Contribution', duration: '12 weeks', paid: true },
    ],
  },
]

export default function Organizations() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Organizations</h1>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Search organizations..."
              className="input max-w-xs"
            />
            <select className="input max-w-xs">
              <option value="">All Tech Stacks</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="node">Node.js</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {organizations.map((org) => (
            <Card key={org.id} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{org.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{org.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {org.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="space-y-2">
                {org.packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-300 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{pkg.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {pkg.duration} • {pkg.paid ? 'Paid' : 'Unpaid'}
                      </p>
                    </div>
                    <button className="btn-primary">Apply</button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
} 