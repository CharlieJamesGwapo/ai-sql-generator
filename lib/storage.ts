import { Query, Settings } from '@/types'

const QUERIES_KEY = 'sql_generator_queries'
const SETTINGS_KEY = 'sql_generator_settings'

export const getQueries = (): Query[] => {
  if (typeof window === 'undefined') return []
  const stored = localStorage.getItem(QUERIES_KEY)
  return stored ? JSON.parse(stored) : []
}

export const saveQuery = (query: Query): void => {
  if (typeof window === 'undefined') return
  const queries = getQueries()
  const index = queries.findIndex(q => q.id === query.id)
  if (index >= 0) {
    queries[index] = query
  } else {
    queries.unshift(query)
  }
  localStorage.setItem(QUERIES_KEY, JSON.stringify(queries))
}

export const deleteQuery = (id: string): void => {
  if (typeof window === 'undefined') return
  const queries = getQueries()
  const filtered = queries.filter(q => q.id !== id)
  localStorage.setItem(QUERIES_KEY, JSON.stringify(filtered))
}

export const getSettings = (): Settings => {
  if (typeof window === 'undefined') {
    return { apiKey: '', defaultDialect: 'postgresql', theme: 'auto' }
  }
  const stored = localStorage.getItem(SETTINGS_KEY)
  return stored ? JSON.parse(stored) : { apiKey: '', defaultDialect: 'postgresql', theme: 'auto' }
}

export const saveSettings = (settings: Settings): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}
