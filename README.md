# AI SQL Generator

An AI-powered web application that converts natural language descriptions into SQL queries. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Natural Language to SQL**: Convert plain English descriptions into SQL queries using OpenAI's API
- **Multi-Dialect Support**: Generate queries for PostgreSQL, MySQL, SQLite, MSSQL, and Oracle
- **Query Explanation**: AI-generated explanations of what each query does
- **Optimization Suggestions**: Get AI-powered tips to optimize your queries
- **Syntax Highlighting**: Beautiful syntax-highlighted SQL output
- **Query Testing**: Simulate query execution with sample data
- **Save & History**: Save frequently used queries in localStorage
- **Export Options**: Export queries as SQL file, JSON, or individual SQL statements
- **Dark Mode**: Full dark mode support
- **Client-Side Only**: No backend database required, everything stored in localStorage

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: React 18
- **Syntax Highlighting**: Highlight.js
- **Icons**: Lucide React
- **AI Provider**: OpenAI API

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Configuration

1. Go to the Settings page (`/settings`)
2. Enter your OpenAI API key (get one from [platform.openai.com](https://platform.openai.com/api-keys))
3. Select your default SQL dialect
4. Click "Save Settings"

## Pages

- **Home (`/`)**: Main page for generating SQL queries
- **History (`/history`)**: View and manage your saved queries
- **Settings (`/settings`)**: Configure API key, preferences, and export/import data

## How It Works

1. **Input**: Describe what SQL query you need in natural language
2. **Select Dialect**: Choose your target SQL database (PostgreSQL, MySQL, etc.)
3. **Generate**: Click "Generate SQL" to convert your description to SQL
4. **Review**: Get the SQL query, explanation, and optimization suggestions
5. **Test**: Run a test query with sample data
6. **Save**: Save queries you like for later use

## Sample Queries

Try these descriptions to get started:

- "Get all customers with their total order amounts"
- "Find users who registered in the last 30 days"
- "Get the top 5 best-selling products"
- "Show all orders with amounts over $100"
- "Find customers who made purchases but haven't made another one in 60 days"

## Local Storage

Data is stored entirely in your browser's localStorage:

- **Queries**: Saved SQL queries with descriptions and metadata
- **Settings**: API key, default dialect, theme preference

Export your data at any time from the Settings page.

## Privacy & Security

- Your API key is stored locally in your browser (not on our servers)
- Queries are sent directly to OpenAI's API
- No data is stored on external servers except when you explicitly choose to export
- Clear all data from Settings page when you're done

## Supported SQL Dialects

- PostgreSQL
- MySQL
- SQLite
- Microsoft SQL Server (MSSQL)
- Oracle

## Tips & Tricks

- Be specific in your descriptions for better SQL generation
- Use "recent" or date ranges for time-based queries
- Mention table and column names if you know them
- The AI works best when you describe the desired outcome clearly

## License

Created by Charlie James
