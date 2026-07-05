'use client'

import { Zap } from 'lucide-react'

interface Props {
  optimization: string
}

export function OptimizationSuggestions({ optimization }: Props) {
  if (!optimization) return null

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Zap size={18} className="text-amber-500" />
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Optimization Suggestion</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {optimization}
      </p>
    </div>
  )
}
