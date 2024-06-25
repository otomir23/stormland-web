import { NextRequest, NextResponse } from "next/server"
import { getUserProfile } from "@/users"
import { notFound } from "next/navigation"

export async function GET(
    request: NextRequest,
    { params: { uuid } }: { params: { uuid: string } }
) {
    const profile = await getUserProfile(uuid)
    if (!profile) notFound()
    const skin = await fetch(
        "http://skinsystem.ely.by/skins/" + profile.username
    )
    if (skin.ok)
        return new NextResponse(skin.body, {
            headers: {
                "Content-Type": "image/png",
            },
        })
    return NextResponse.redirect(new URL("/default.png", request.url))
}
