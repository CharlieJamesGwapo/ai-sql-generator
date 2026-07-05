'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Database, Settings, History } from 'lucide-react'
import { NaturalLanguageInput } from '@/components/NaturalLanguageInput'
import { DialectSelector } from '@/components/DialectSelector'
import { GenerateButton } from '@/components/GenerateButton'
import { SQLOutput } from '@/components/SQLOutput'
import { ExplanationPanel } from '@/components/ExplanationPanel'
import { OptimizationSuggestions } from '@/components/OptimizationSuggestions'
import { CopyButton } from '@/components/CopyButton'
import { SaveButton } from '@/components/SaveButton'
import { TestQueryPanel } from '@/components/TestQueryPanel'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { SqlDialect, Query } from '@/types'
import { getSettings } from '@/lib/storage'
import { generateSQL, optimizeQuery } from '@/lib/openai'

export default function Home() {
  const [naturalLanguage, setNaturalLanguage] = useState('')
  const [dialect, setDialect] = useState<SqlDialect>('postgresql')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [sql, setSql] = useState('')
  const [explanation, setExplanation] = useState('')
  const [optimization, setOptimization] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const settings = getSettings()
    setApiKey(settings.apiKey)
    setDialect(settings.defaultDialect)
  }, [])

  const handleGenerate = async () => {
    if (!naturalLanguage.trim()) {
      setError('Please describe your query')
      return
    }

    if (!apiKey) {
      setError('Please set your OpenAI API key in settings')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await generateSQL(naturalLanguage, dialect, apiKey)
      setSql(result.sql)
      setExplanation(result.explanation)
      setOptimization(result.optimization)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate SQL')
      setSql('')
      setExplanation('')
      setOptimization('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoadQuery = (query: Query) => {
    setNaturalLanguage(query.naturalLanguage)
    setDialect(query.dialect)
    setSql(query.sql)
    setExplanation(query.explanation)
    setOptimization(query.optimization)
    window.scrollTo({ top: 0, behavior: 'smooth' })
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
              <Database className="text-blue-600 dark:text-blue-400" size={28} />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI SQL Generator
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <Link
                href="/history"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                <History size={20} />
                <span className="hidden sm:inline">History</span>
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-300"
              >
                <Settings size={20} />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Input */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 space-y-4">
              <NaturalLanguageInput
                value={naturalLanguage}
                onChange={setNaturalLanguage}
              />
              <DialectSelector value={dialect} onChange={setDialect} />
              <GenerateButton
                isLoading={isLoading}
                onClick={handleGenerate}
                disabled={!naturalLanguage.trim() || !apiKey}
              />

              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 text-red-800 dark:text-red-200 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {!apiKey && (
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 text-yellow-800 dark:text-yellow-200 rounded-lg text-sm">
                  <p className="font-medium mb-1">API Key Required</p>
                  <p>Configure your OpenAI API key in <Link href="/settings" className="underline font-medium">settings</Link></p>
                </div>
              )}
            </div>

            {/* Examples */}
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Examples</h3>
              <div className="space-y-2 text-xs">
                <button
                  onClick={() => setNaturalLanguage('Show all customers with their total order amounts')}
                  className="w-full text-left p-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  Customer Orders
                </button>
                <button
                  onClick={() => setNaturalLanguage('Find users who registered in the last 30 days')}
                  className="w-full text-left p-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  Recent Users
                </button>
                <button
                  onClick={() => setNaturalLanguage('Get the top 5 best-selling products')}
                  className="w-full text-left p-2 rounded bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
                >
                  Top Products
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Output */}
          <div className="lg:col-span-2 space-y-4">
            {sql && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6 space-y-6">
                <SQLOutput sql={sql} />

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <SaveButton
                    query={{
                      naturalLanguage,
                      sql,
                      dialect,
                      explanation,
                      optimization,
                    }}
                  />
                  <CopyButton text={sql} label="Copy" />
                </div>

                {explanation && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <ExplanationPanel explanation={explanation} />
                  </div>
                )}

                {optimization && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <OptimizationSuggestions optimization={optimization} />
                  </div>
                )}

                {sql && (
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <TestQueryPanel sql={sql} />
                  </div>
                )}
              </div>
            )}

            {!sql && !isLoading && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-12 text-center">
                <Database size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">
                  Describe your query to generate SQL
                </p>
              </div>
            )}

            {isLoading && (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-12 text-center">
                <div className="inline-block">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
                <p className="text-gray-500 dark:text-gray-400 mt-4">
                  Generating SQL...
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
