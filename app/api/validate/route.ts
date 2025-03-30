import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth"
import { validateQuery } from "@/lib/query-processor"

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

    // Validate the natural language query
    const validation = await validateQuery(query)

    return NextResponse.json(validation)
  } catch (error) {
    console.error("Error validating query:", error)
    return NextResponse.json({ error: "Failed to validate query" }, { status: 500 })
  }
}

