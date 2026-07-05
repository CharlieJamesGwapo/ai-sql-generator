'use client'

import { Query } from '@/types'
import { Trash2, Copy, ArrowRight } from 'lucide-react'
import { deleteQuery } from '@/lib/storage'

interface Props {
  queries: Query[]
  onSelect: (query: Query) => void
  onDelete: () => void
}

export function HistoryList({ queries, onSelect, onDelete }: Props) {
  const handleDelete = (id: string) => {
    deleteQuery(id)
    onDelete()
  }

  const handleCopy = async (sql: string) => {
    try {
      await navigator.clipboard.writeText(sql)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (queries.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        No saved queries yet. Generate one to get started!
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {queries.map((query) => (
        <div
          key={query.id}
          className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {query.naturalLanguage}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(query.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">
              {query.dialect}
            </span>
          </div>

          <div className="mb-3 p-2 bg-gray-900 rounded text-xs text-gray-300 overflow-x-auto font-mono max-h-20">
            {query.sql}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onSelect(query)}
              className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition-colors"
            >
              <ArrowRight size={14} />
              Use
            </button>
            <button
              onClick={() => handleCopy(query.sql)}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-900 dark:text-gray-100 text-sm font-medium transition-colors"
            >
              <Copy size={14} />
            </button>
            <button
              onClick={() => handleDelete(query.id)}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
