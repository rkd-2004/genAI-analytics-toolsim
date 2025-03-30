import type { NextRequest } from "next/server"

// In a real application, you would use a more secure authentication method
// This is a simplified version for the challenge
export function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { success: false, message: "Missing or invalid authorization header" }
  }

  const token = authHeader.split(" ")[1]

  // For demo purposes, we'll accept a simple token
  // In a real app, you would verify JWT tokens or use a proper auth system
  if (token === "demo-api-key-123") {
    return { success: true, userId: "demo-user" }
  }

  return { success: false, message: "Invalid token" }
}

