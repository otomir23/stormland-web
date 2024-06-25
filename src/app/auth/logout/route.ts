import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { AUTH_COOKIE_NAME } from "@/auth"

export function GET(request: NextRequest) {
    cookies().delete(AUTH_COOKIE_NAME)
    return NextResponse.redirect(new URL("/", request.url))
}
