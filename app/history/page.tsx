'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { History, ArrowLeft } from 'lucide-react'
import { HistoryList } from '@/components/HistoryList'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { Query } from '@/types'
import { getQueries } from '@/lib/storage'
import { useRouter } from 'next/navigation'

export default function HistoryPage() {
  const [queries, setQueries] = useState<Query[]>([])
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    loadQueries()
  }, [])

  const loadQueries = () => {
    const stored = getQueries()
    setQueries(stored)
  }

  const handleSelectQuery = (query: Query) => {
    // Store the selected query in sessionStorage for the home page to pick up
    sessionStorage.setItem('selectedQuery', JSON.stringify(query))
    router.push('/')
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="text-blue-600 dark:text-blue-400" size={28} />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Query History
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
          <HistoryList
            queries={queries}
            onSelect={handleSelectQuery}
            onDelete={loadQueries}
          />
        </div>
      </main>
    </div>
  )
}
