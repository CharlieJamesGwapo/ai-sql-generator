'use client'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function NaturalLanguageInput({
  value,
  onChange,
  placeholder = 'Describe what SQL query you need...',
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Query Description
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-24"
      />
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Example: "Get all users who made purchases over $100 in the last 30 days"
      </p>
    </div>
  )
}
