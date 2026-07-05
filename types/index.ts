export type SqlDialect = 'mysql' | 'postgresql' | 'sqlite' | 'mssql' | 'oracle'

export interface Query {
  id: string
  naturalLanguage: string
  sql: string
  dialect: SqlDialect
  explanation: string
  optimization: string
  createdAt: string
}

export interface Settings {
  apiKey: string
  defaultDialect: SqlDialect
  theme: 'light' | 'dark' | 'auto'
}

export interface GenerationResult {
  sql: string
  explanation: string
  optimization: string
}
