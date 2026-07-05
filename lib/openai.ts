import { SqlDialect, GenerationResult } from '@/types'

const dialectDescriptions: Record<SqlDialect, string> = {
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  sqlite: 'SQLite',
  mssql: 'Microsoft SQL Server',
  oracle: 'Oracle',
}

export async function generateSQL(
  naturalLanguage: string,
  dialect: SqlDialect,
  apiKey: string
): Promise<GenerationResult> {
  const dialectName = dialectDescriptions[dialect]

  const systemPrompt = `You are an expert SQL developer. Generate SQL queries based on natural language descriptions.
You must respond with a JSON object containing exactly these fields:
- sql: The SQL query (${dialectName} syntax)
- explanation: Brief explanation of what the query does
- optimization: One suggestion to optimize the query

Always use valid ${dialectName} syntax. For dialects with differences:
- MySQL: Use LIMIT for pagination, backticks for identifiers if needed
- PostgreSQL: Use LIMIT/OFFSET, support CTEs and window functions
- SQLite: Use LIMIT, no CROSS APPLY, basic feature set
- MSSQL: Use TOP, CROSS APPLY, CTE-friendly
- Oracle: Use ROWNUM/ROW_NUMBER, different date functions

Return ONLY valid JSON, no markdown or other text.`

  const userMessage = `Generate a ${dialectName} SQL query for: ${naturalLanguage}`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error?.message || 'OpenAI API error')
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    try {
      const parsed = JSON.parse(content)
      return {
        sql: parsed.sql || '',
        explanation: parsed.explanation || '',
        optimization: parsed.optimization || '',
      }
    } catch {
      throw new Error('Failed to parse OpenAI response as JSON')
    }
  } catch (error) {
    throw error instanceof Error ? error : new Error('Unknown error occurred')
  }
}

export async function optimizeQuery(
  sql: string,
  dialect: SqlDialect,
  apiKey: string
): Promise<string> {
  const dialectName = dialectDescriptions[dialect]

  const systemPrompt = `You are an expert SQL optimizer. Provide optimization suggestions for ${dialectName} SQL queries.
Return ONLY a JSON object with a "suggestion" field containing the optimization tip. No markdown or other text.`

  const userMessage = `Provide an optimization suggestion for this ${dialectName} query:\n${sql}`

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.3,
        max_tokens: 200,
      }),
    })

    if (!response.ok) {
      throw new Error('OpenAI API error')
    }

    const data = await response.json()
    const content = data.choices[0].message.content
    const parsed = JSON.parse(content)
    return parsed.suggestion || 'Unable to generate optimization'
  } catch (error) {
    return 'Unable to generate optimization suggestions'
  }
}
