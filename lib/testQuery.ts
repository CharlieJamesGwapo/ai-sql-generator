export interface TestResult {
  columns: string[]
  rows: Record<string, string | number | boolean | null>[]
  rowCount: number
  executionTime: string
}

export function testQuery(sql: string): TestResult {
  const startTime = performance.now()

  // Sample data for different tables
  const sampleData: Record<string, Record<string, string | number | boolean | null>[]> = {
    users: [
      { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28 },
      { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34 },
      { id: 3, name: 'Carol White', email: 'carol@example.com', age: 29 },
      { id: 4, name: 'David Brown', email: 'david@example.com', age: 42 },
    ],
    orders: [
      { id: 101, user_id: 1, amount: 150.50, status: 'completed', created_at: '2024-01-15' },
      { id: 102, user_id: 2, amount: 200.00, status: 'completed', created_at: '2024-01-16' },
      { id: 103, user_id: 1, amount: 75.25, status: 'pending', created_at: '2024-01-17' },
      { id: 104, user_id: 3, amount: 320.00, status: 'completed', created_at: '2024-01-18' },
    ],
    products: [
      { id: 1, name: 'Laptop', price: 999.99, stock: 5 },
      { id: 2, name: 'Mouse', price: 29.99, stock: 50 },
      { id: 3, name: 'Keyboard', price: 79.99, stock: 20 },
      { id: 4, name: 'Monitor', price: 299.99, stock: 10 },
    ],
  }

  // Simple mock execution - just return sample data
  let columns: string[] = []
  let rows: Record<string, string | number | boolean | null>[] = []

  const sqlLower = sql.toLowerCase()

  if (sqlLower.includes('from users')) {
    columns = ['id', 'name', 'email', 'age']
    rows = sampleData.users.slice(0, 3)
  } else if (sqlLower.includes('from orders')) {
    columns = ['id', 'user_id', 'amount', 'status', 'created_at']
    rows = sampleData.orders.slice(0, 3)
  } else if (sqlLower.includes('from products')) {
    columns = ['id', 'name', 'price', 'stock']
    rows = sampleData.products.slice(0, 3)
  } else {
    // Default response
    columns = ['result']
    rows = [{ result: 'Query executed successfully' }]
  }

  const endTime = performance.now()
  const executionTime = `${(endTime - startTime).toFixed(2)}ms`

  return {
    columns,
    rows,
    rowCount: rows.length,
    executionTime,
  }
}
