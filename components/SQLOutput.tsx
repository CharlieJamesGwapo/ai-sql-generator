'use client'

import { useEffect, useRef } from 'react'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import { CopyButton } from './CopyButton'

interface Props {
  sql: string
}

export function SQLOutput({ sql }: Props) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current && sql) {
      codeRef.current.textContent = sql
      hljs.highlightElement(codeRef.current)
    }
  }, [sql])

  if (!sql) {
    return (
      <div className="p-4 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 text-center">
        Generated SQL will appear here
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated SQL</h3>
        <CopyButton text={sql} label="Copy SQL" />
      </div>
      <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
        <pre className="p-4 overflow-x-auto">
          <code ref={codeRef} className="language-sql text-sm leading-relaxed" />
        </pre>
      </div>
    </div>
  )
}
