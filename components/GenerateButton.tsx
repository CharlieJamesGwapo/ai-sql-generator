'use client'

import { Wand2 } from 'lucide-react'

interface Props {
  isLoading: boolean
  onClick: () => void
  disabled?: boolean
}

export function GenerateButton({ isLoading, onClick, disabled = false }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium transition-colors"
    >
      <Wand2 size={20} />
      {isLoading ? 'Generating...' : 'Generate SQL'}
    </button>
  )
}
