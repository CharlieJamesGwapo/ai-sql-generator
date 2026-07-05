'use client'

import { useState } from 'react'
import { Save, Check } from 'lucide-react'
import { Query } from '@/types'
import { saveQuery } from '@/lib/storage'

interface Props {
  query: Partial<Query>
}

export function SaveButton({ query }: Props) {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    const fullQuery: Query = {
      id: query.id || crypto.randomUUID(),
      naturalLanguage: query.naturalLanguage || '',
      sql: query.sql || '',
      dialect: query.dialect || 'postgresql',
      explanation: query.explanation || '',
      optimization: query.optimization || '',
      createdAt: query.createdAt || new Date().toISOString(),
    }
    saveQuery(fullQuery)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <button
      onClick={handleSave}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors text-sm font-medium"
      aria-label="Save query"
    >
      {saved ? <Check size={16} /> : <Save size={16} />}
      {saved ? 'Saved!' : 'Save Query'}
    </button>
  )
}
