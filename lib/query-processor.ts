import { mockDatabase } from "./mock-database"

// Process a natural language query and return results
export async function processQuery(query: string) {
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim()

  // Simple NL to SQL conversion logic
  const sqlQuery = convertToSQL(normalizedQuery)

  // Execute the query against our mock database
  const results = mockDatabase.executeQuery(sqlQuery)

  return {
    originalQuery: query,
    sqlQuery,
    results,
    executionTime: Math.floor(Math.random() * 200) + 50 + "ms", // Simulate execution time
  }
}

// Explain how a natural language query would be processed
export async function explainQuery(query: string) {
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim()

  // Generate SQL
  const sqlQuery = convertToSQL(normalizedQuery)

  // Generate explanation
  const tables = extractTablesFromQuery(normalizedQuery)
  const fields = extractFieldsFromQuery(normalizedQuery)
  const filters = extractFiltersFromQuery(normalizedQuery)

  return {
    originalQuery: query,
    sqlQuery,
    explanation: {
      intent: detectQueryIntent(normalizedQuery),
      dataSourcesUsed: tables,
      fieldsAnalyzed: fields,
      filtersApplied: filters,
      processingSteps: generateProcessingSteps(normalizedQuery),
    },
  }
}

// Validate if a query can be processed
export async function validateQuery(query: string) {
  // Normalize the query
  const normalizedQuery = query.toLowerCase().trim()

  // Check if query is valid
  const tables = extractTablesFromQuery(normalizedQuery)
  const isValid = tables.length > 0

  // Check if we have the required data
  const requiredTables = tables
  const availableTables = mockDatabase.getTables()
  const missingTables = requiredTables.filter((table) => !availableTables.includes(table))

  return {
    isValid,
    confidence: isValid ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 10,
    missingData: missingTables,
    suggestedReformulation: isValid
      ? null
      : "Try specifying which data you want to analyze. For example: 'Show me sales by region for last quarter'",
  }
}

// Helper functions for query processing

function convertToSQL(query: string): string {
  // This is a simplified conversion logic
  // In a real system, this would use NLP or LLMs

  if (query.includes("sales") && query.includes("region")) {
    return "SELECT region, SUM(sales_amount) FROM sales GROUP BY region ORDER BY SUM(sales_amount) DESC"
  }

  if (query.includes("customers") && query.includes("country")) {
    return "SELECT country, COUNT(*) FROM customers GROUP BY country ORDER BY COUNT(*) DESC"
  }

  if (query.includes("revenue") && (query.includes("month") || query.includes("monthly"))) {
    return "SELECT DATE_TRUNC('month', order_date) as month, SUM(order_total) FROM orders GROUP BY month ORDER BY month"
  }

  if (query.includes("top") && query.includes("products")) {
    return "SELECT product_name, SUM(quantity_sold) FROM sales JOIN products ON sales.product_id = products.id GROUP BY product_name ORDER BY SUM(quantity_sold) DESC LIMIT 10"
  }

  // Default fallback
  return "SELECT * FROM data_table LIMIT 100"
}

function detectQueryIntent(query: string): string {
  if (query.includes("compare") || query.includes("versus") || query.includes("vs")) {
    return "Comparison Analysis"
  }

  if (query.includes("trend") || query.includes("over time") || query.includes("growth")) {
    return "Trend Analysis"
  }

  if (query.includes("top") || query.includes("bottom") || query.includes("highest") || query.includes("lowest")) {
    return "Ranking Analysis"
  }

  if (query.includes("average") || query.includes("mean") || query.includes("median")) {
    return "Statistical Analysis"
  }

  return "General Data Query"
}

function extractTablesFromQuery(query: string): string[] {
  const tables = []

  if (query.includes("sales")) tables.push("sales")
  if (query.includes("customer") || query.includes("customers")) tables.push("customers")
  if (query.includes("product") || query.includes("products")) tables.push("products")
  if (query.includes("order") || query.includes("orders")) tables.push("orders")
  if (query.includes("employee") || query.includes("employees")) tables.push("employees")

  return tables.length > 0 ? tables : ["data_table"]
}

function extractFieldsFromQuery(query: string): string[] {
  const fields = []

  if (query.includes("sales") || query.includes("revenue")) fields.push("sales_amount")
  if (query.includes("region") || query.includes("location")) fields.push("region")
  if (query.includes("country")) fields.push("country")
  if (query.includes("date") || query.includes("time") || query.includes("month") || query.includes("year"))
    fields.push("date")
  if (query.includes("product") || query.includes("item")) fields.push("product_name")
  if (query.includes("customer")) fields.push("customer_name")

  return fields
}

function extractFiltersFromQuery(query: string): Record<string, string> {
  const filters: Record<string, string> = {}

  // Time-based filters
  if (query.includes("last year")) {
    filters["time_period"] = "last year"
  } else if (query.includes("last quarter")) {
    filters["time_period"] = "last quarter"
  } else if (query.includes("last month")) {
    filters["time_period"] = "last month"
  } else if (query.includes("this year")) {
    filters["time_period"] = "this year"
  }

  // Region filters
  if (query.includes("north america")) {
    filters["region"] = "North America"
  } else if (query.includes("europe")) {
    filters["region"] = "Europe"
  } else if (query.includes("asia")) {
    filters["region"] = "Asia"
  }

  return filters
}

function generateProcessingSteps(query: string): string[] {
  return [
    "Parse natural language query",
    "Identify query intent and required data sources",
    "Convert to structured query language",
    "Execute query against relevant data sources",
    "Format and return results",
  ]
}

