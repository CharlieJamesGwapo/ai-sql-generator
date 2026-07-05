'use client'

import { SqlDialect } from '@/types'

interface Props {
  value: SqlDialect
  onChange: (dialect: SqlDialect) => void
}

const dialects: { value: SqlDialect; label: string }[] = [
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mysql', label: 'MySQL' },
  { value: 'sqlite', label: 'SQLite' },
  { value: 'mssql', label: 'MSSQL' },
  { value: 'oracle', label: 'Oracle' },
]

export function DialectSelector({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        SQL Dialect
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SqlDialect)}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {dialects.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  )
}
