import type { NextRequest } from "next/server"


export function verifyAuth(request: NextRequest) {
  const authHeader = request.headers.get("Authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { success: false, message: "Missing or invalid authorization header" }
  }

  const token = authHeader.split(" ")[1]


  if (token === "demo-api-key-123") {
    return { success: true, userId: "demo-user" }
  }

  return { success: false, message: "Invalid token" }
}

