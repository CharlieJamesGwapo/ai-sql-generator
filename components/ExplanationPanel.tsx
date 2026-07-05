'use client'

import { HelpCircle } from 'lucide-react'

interface Props {
  explanation: string
}

export function ExplanationPanel({ explanation }: Props) {
  if (!explanation) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <HelpCircle size={18} className="text-blue-500" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">What This Query Does</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {explanation}
      </p>
    </div>
  )
}
