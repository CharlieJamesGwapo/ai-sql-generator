'use client'

import { useState } from 'react'
import { Play, ChevronDown, ChevronUp } from 'lucide-react'
import { testQuery } from '@/lib/testQuery'

interface Props {
  sql: string
}

export function TestQueryPanel({ sql }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTest = async () => {
    setIsLoading(true)
    try {
      const testResult = testQuery(sql)
      setResult(testResult)
    } catch (error) {
      console.error('Test failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Test Query</span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {isOpen && (
        <div className="flex flex-col gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
          <button
            onClick={handleTest}
            disabled={isLoading || !sql}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white transition-colors text-sm font-medium"
          >
            <Play size={16} />
            {isLoading ? 'Running...' : 'Run Test'}
          </button>

          {result && (
            <div className="flex flex-col gap-2">
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Execution time: {result.executionTime} | Rows: {result.rowCount}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr>
                      {result.columns.map((col: string) => (
                        <th
                          key={col}
                          className="border border-gray-300 dark:border-gray-600 px-2 py-1 bg-gray-200 dark:bg-gray-700 text-left font-medium"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.rows.map((row: any, idx: number) => (
                      <tr key={idx}>
                        {result.columns.map((col: string) => (
                          <td
                            key={`${idx}-${col}`}
                            className="border border-gray-300 dark:border-gray-600 px-2 py-1"
                          >
                            {String(row[col] ?? '')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
