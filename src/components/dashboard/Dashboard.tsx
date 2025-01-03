import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import JobSelectModal from './JobSelectModal'
import { getEmployerJobs, type Job } from '@/lib/actions'
import { useRouter } from 'next/navigation'

interface DashboardProps {
  userType: 'employer' | 'worker'
  userData: {
    name: string
    matches: number
    unreadMessages: number
  }
}

export default function Dashboard({ userType, userData }: DashboardProps) {
  const router = useRouter()
  const [isJobSelectModalOpen, setIsJobSelectModalOpen] = useState(false)
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    if (userType === 'employer') {
      loadJobs()
    }
  }, [userType])

  const loadJobs = async () => {
    try {
      const jobsData = await getEmployerJobs()
      setJobs(jobsData)
    } catch (error) {
      console.error('Error loading jobs:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Welcome Message */}
      <div className="text-center mb-12">
        <h1 className="heading-lg gradient-text mb-4">Hey {userData.name}! 👋</h1>
        <p className="text-gray-600">
          {userType === 'worker' 
            ? 'Ready to find your dream job? Start swiping!' 
            : 'Ready to find great talent? Start swiping!'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
          <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">👥</span>
          </div>
          <div className="text-2xl font-bold gradient-text mb-1">{userData.matches}</div>
          <div className="text-gray-600 text-sm">New Matches</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center">
          <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">💌</span>
          </div>
          <div className="text-2xl font-bold gradient-text mb-1">{userData.unreadMessages}</div>
          <div className="text-gray-600 text-sm">Messages</div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col items-center gap-6">
        {userType === 'employer' && (
          <Link 
            href="/dashboard/employer/create-job"
            className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer"
          >
            <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-4xl">✨</span>
            </div>
            <h2 className="text-xl font-bold gradient-text mb-2">Create New Job</h2>
            <p className="text-gray-600">Post a new job opportunity</p>
          </Link>
        )}

        <div
          onClick={() => {
            if (userType === 'employer') {
              setIsJobSelectModalOpen(true)
            } else {
              router.push('/match')
            }
          }}
          className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group cursor-pointer"
        >
          <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <span className="text-4xl">💘</span>
          </div>
          <h2 className="text-xl font-bold gradient-text mb-2">Start Matching</h2>
          <p className="text-gray-600">
            {userType === 'worker'
              ? 'Swipe through job opportunities'
              : 'Swipe through potential candidates'}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <Link 
            href="/messages"
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💬</span>
            </div>
            <div className="font-semibold">Messages</div>
          </Link>

          <Link 
            href="/matches"
            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all text-center group"
          >
            <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <span className="text-2xl">❤️</span>
            </div>
            <div className="font-semibold">Matches</div>
          </Link>
        </div>
      </div>

      {/* Job Select Modal */}
      <JobSelectModal
        isOpen={isJobSelectModalOpen}
        onClose={() => setIsJobSelectModalOpen(false)}
        jobs={jobs}
      />
    </div>
  )
} 