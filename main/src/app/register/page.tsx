import Link from 'next/link'

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white dark:bg-dark-200 rounded-lg shadow-md">
        <div>
          <h2 className="text-3xl font-bold text-center text-primary-600">Commit</h2>
          <p className="mt-2 text-center text-gray-600 dark:text-gray-300">Create your account</p>
        </div>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="input mt-1"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="input mt-1"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="input mt-1"
                placeholder="Create a password"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                I am a
              </label>
              <select
                id="role"
                name="role"
                required
                className="input mt-1"
              >
                <option value="">Select your role</option>
                <option value="student">Student</option>
                <option value="mentor">Mentor</option>
                <option value="organization">Organization</option>
              </select>
            </div>
          </div>
          <div>
            <button type="submit" className="btn-primary w-full">
              Create Account
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{' '}
          <Link href="/login" className="text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
} 