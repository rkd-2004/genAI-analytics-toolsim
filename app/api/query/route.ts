import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { processQuery } from "@/lib/query-processor"

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authResult = verifyAuth(request)
    if (!authResult.success) {
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { query } = body

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Query is required and must be a string" }, { status: 400 })
    }

    // Process the natural language query
    const result = await processQuery(query)

    return NextResponse.json({ result })
  } catch (error) {
    console.error("Error processing query:", error)
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 })
  }
}

