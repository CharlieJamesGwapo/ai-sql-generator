'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Settings, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { DarkModeToggle } from '@/components/DarkModeToggle'
import { DialectSelector } from '@/components/DialectSelector'
import { SqlDialect, Settings as SettingsType } from '@/types'
import { getSettings, saveSettings } from '@/lib/storage'

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsType>({
    apiKey: '',
    defaultDialect: 'postgresql',
    theme: 'auto',
  })
  const [showApiKey, setShowApiKey] = useState(false)
  const [saved, setSaved] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const loaded = getSettings()
    setSettings(loaded)
  }, [])

  const handleSave = () => {
    saveSettings(settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleExportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'sql-generator-settings.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExportQueries = () => {
    const queries = localStorage.getItem('sql_generator_queries') || '[]'
    const dataBlob = new Blob([queries], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'sql-queries.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleExportAsSQL = () => {
    const queries = JSON.parse(localStorage.getItem('sql_generator_queries') || '[]')
    const sqlLines = queries.map((q: any) => `-- ${q.naturalLanguage}\n${q.sql}`).join('\n\n')
    const dataBlob = new Blob([sqlLines], { type: 'text/plain' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'queries.sql'
    link.click()
    URL.revokeObjectURL(url)
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
              <Settings className="text-blue-600 dark:text-blue-400" size={28} />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Settings
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
      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* API Key Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              OpenAI Configuration
            </h2>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                API Key
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={settings.apiKey}
                    onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  />
                </div>
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle API key visibility"
                >
                  {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Get your API key from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="underline text-blue-600 dark:text-blue-400">openai.com</a>
              </p>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Preferences
            </h2>
            <DialectSelector
              value={settings.defaultDialect}
              onChange={(dialect) => setSettings({ ...settings, defaultDialect: dialect })}
            />
          </div>

          {/* Export Section */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Export
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleExportAsSQL}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors text-sm"
              >
                Export Queries as SQL
              </button>
              <button
                onClick={handleExportQueries}
                className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-medium transition-colors text-sm"
              >
                Export as JSON
              </button>
              <button
                onClick={handleExportSettings}
                className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 text-white font-medium transition-colors text-sm"
              >
                Export Settings
              </button>
              <button
                onClick={() => {
                  localStorage.clear()
                  setSettings({
                    apiKey: '',
                    defaultDialect: 'postgresql',
                    theme: 'auto',
                  })
                }}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors text-sm"
              >
                Clear All Data
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              {saved ? 'Saved!' : 'Save Settings'}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
