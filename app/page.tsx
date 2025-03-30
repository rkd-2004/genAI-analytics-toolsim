"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-gray-50">
      <div className="max-w-5xl w-full">
        <h1 className="text-3xl font-bold mb-2 text-primary">Gen AI Analytics Tool</h1>
        <p className="text-gray-600 mb-8">
          Ask complex business questions and get instant, accurate insights from your data
        </p>

        <Tabs defaultValue="query" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="query">Query Data</TabsTrigger>
            <TabsTrigger value="explain">Explain Query</TabsTrigger>
            <TabsTrigger value="validate">Validate Query</TabsTrigger>
            <TabsTrigger value="docs">API Docs</TabsTrigger>
          </TabsList>

          <TabsContent value="query">
            <QueryInterface />
          </TabsContent>

          <TabsContent value="explain">
            <ExplainInterface />
          </TabsContent>

          <TabsContent value="validate">
            <ValidateInterface />
          </TabsContent>

          <TabsContent value="docs">
            <ApiDocs />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function QueryInterface() {
  const [query, setQuery] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer demo-api-key-123",
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process query")
      }

      setResult(data.result)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Ask a Business Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="e.g., Show me sales by region for last quarter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Query"}
          </Button>
        </div>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">{error}</div>}

      {result && (
        <div className="mt-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Original Query</h3>
            <p className="text-gray-900">{result.originalQuery}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Translated to SQL</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{result.sqlQuery}</pre>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Results</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {result.results.length > 0 &&
                      Object.keys(result.results[0]).map((key) => (
                        <th
                          key={key}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result.results.map((row: any, i: number) => (
                    <tr key={i}>
                      {Object.values(row).map((value: any, j: number) => (
                        <td key={j} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">Query executed in {result.executionTime}</p>
          </div>
        </div>
      )}

      {!result && !loading && !error && (
        <div className="text-center py-8 text-gray-500">Enter a business question above to get started</div>
      )}
    </Card>
  )
}

function ExplainInterface() {
  const [query, setQuery] = useState("")
  const [explanation, setExplanation] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer demo-api-key-123",
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to explain query")
      }

      setExplanation(data.explanation)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Explain a Query</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="e.g., Show me sales by region for last quarter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Explain"}
          </Button>
        </div>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">{error}</div>}

      {explanation && (
        <div className="mt-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Original Query</h3>
            <p className="text-gray-900">{explanation.originalQuery}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Translated to SQL</h3>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">{explanation.sqlQuery}</pre>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Query Intent</h3>
            <p className="text-gray-900">{explanation.explanation.intent}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Data Sources Used</h3>
            <ul className="list-disc pl-5">
              {explanation.explanation.dataSourcesUsed.map((source: string) => (
                <li key={source} className="text-gray-900">
                  {source}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Fields Analyzed</h3>
            <ul className="list-disc pl-5">
              {explanation.explanation.fieldsAnalyzed.map((field: string) => (
                <li key={field} className="text-gray-900">
                  {field}
                </li>
              ))}
            </ul>
          </div>

          {Object.keys(explanation.explanation.filtersApplied).length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Filters Applied</h3>
              <ul className="list-disc pl-5">
                {Object.entries(explanation.explanation.filtersApplied).map(([key, value]) => (
                  <li key={key} className="text-gray-900">
                    {key}: {value as string}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Processing Steps</h3>
            <ol className="list-decimal pl-5">
              {explanation.explanation.processingSteps.map((step: string, index: number) => (
                <li key={index} className="text-gray-900">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      {!explanation && !loading && !error && (
        <div className="text-center py-8 text-gray-500">
          Enter a business question above to see how it would be processed
        </div>
      )}
    </Card>
  )
}

function ValidateInterface() {
  const [query, setQuery] = useState("")
  const [validation, setValidation] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer demo-api-key-123",
        },
        body: JSON.stringify({ query }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to validate query")
      }

      setValidation(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Validate a Query</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-6">
          <Input
            placeholder="e.g., Show me sales by region for last quarter"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Validate"}
          </Button>
        </div>
      </form>

      {error && <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">{error}</div>}

      {validation && (
        <div className="mt-4">
          <div className="flex items-center mb-4">
            <div className={`w-3 h-3 rounded-full mr-2 ${validation.isValid ? "bg-green-500" : "bg-amber-500"}`}></div>
            <h3 className="text-lg font-medium">{validation.isValid ? "Query is valid" : "Query needs refinement"}</h3>
          </div>

          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-500">Confidence Score</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className={`h-2.5 rounded-full ${validation.confidence > 70 ? "bg-green-500" : "bg-amber-500"}`}
                style={{ width: `${validation.confidence}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{validation.confidence}% confidence</p>
          </div>

          {validation.missingData && validation.missingData.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Missing Data</h3>
              <ul className="list-disc pl-5">
                {validation.missingData.map((item: string) => (
                  <li key={item} className="text-gray-900">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {validation.suggestedReformulation && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Suggested Reformulation</h3>
              <p className="text-gray-900">{validation.suggestedReformulation}</p>
            </div>
          )}
        </div>
      )}

      {!validation && !loading && !error && (
        <div className="text-center py-8 text-gray-500">
          Enter a business question above to check if it can be processed
        </div>
      )}
    </Card>
  )
}

function ApiDocs() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">API Documentation</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Query Endpoint
          </h3>
          <p className="text-gray-600 mb-2">Process natural language queries and return results</p>

          <div className="bg-gray-100 p-4 rounded-md">
            <p className="font-mono text-sm mb-2">POST /api/query</p>
            <p className="text-xs text-gray-500 mb-2">Request Body:</p>
            <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
              {`{
  "query": "Show me sales by region for last quarter"
}`}
            </pre>

            <p className="text-xs text-gray-500 mt-3 mb-2">Response:</p>
            <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
              {`{
  "result": {
    "originalQuery": "Show me sales by region for last quarter",
    "sqlQuery": "SELECT region, SUM(sales_amount) FROM sales GROUP BY region",
    "results": [
      { "region": "North America", "sales": 1245000 },
      { "region": "Europe", "sales": 1042000 },
      ...
    ],
    "executionTime": "120ms"
  }
}`}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Explain Endpoint
          </h3>
          <p className="text-gray-600 mb-2">Get detailed explanation of how a query would be processed</p>

          <div className="bg-gray-100 p-4 rounded-md">
            <p className="font-mono text-sm mb-2">POST /api/explain</p>
            <p className="text-xs text-gray-500 mb-2">Request Body:</p>
            <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
              {`{
  "query": "Show me sales by region for last quarter"
}`}
            </pre>

            <p className="text-xs text-gray-500 mt-3 mb-2">Response:</p>
            <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
              {`{
  "explanation": {
    "originalQuery": "Show me sales by region for last quarter",
    "sqlQuery": "SELECT region, SUM(sales_amount) FROM sales GROUP BY region",
    "explanation": {
      "intent": "Comparison Analysis",
      "dataSourcesUsed": ["sales"],
      "fieldsAnalyzed": ["region", "sales_amount"],
      "filtersApplied": { "time_period": "last quarter" },
      "processingSteps": [...]
    }
  }
}`}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2 flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Validate Endpoint
          </h3>
          <p className="text-gray-600 mb-2">Check if a query can be processed and get suggestions</p>

          <div className="bg-gray-100 p-4 rounded-md">
            <p className="font-mono text-sm mb-2">POST /api/validate</p>
            <p className="text-xs text-gray-500 mb-2">Request Body:</p>
            <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
              {`{
  "query": "Show me sales by region for last quarter"
}`}
            </pre>

            <p className="text-xs text-gray-500 mt-3 mb-2">Response:</p>
            <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
              {`{
  "isValid": true,
  "confidence": 85,
  "missingData": [],
  "suggestedReformulation": null
}`}
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Authentication</h3>
          <p className="text-gray-600 mb-2">All API endpoints require authentication using a Bearer token</p>

          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-xs text-gray-500 mb-2">Example Header:</p>
            <pre className="bg-gray-200 p-2 rounded text-xs overflow-x-auto">
              {`Authorization: Bearer demo-api-key-123`}
            </pre>

            <p className="text-xs text-gray-500 mt-3">
              Note: For this demo, use the token "demo-api-key-123". In a production environment, you would use a secure
              authentication system.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

