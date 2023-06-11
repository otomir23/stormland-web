import { NextRequest, NextResponse } from 'next/server'
import { Auth } from 'msmc'
import {
    AUTH_COOKIE_NAME,
    generateAccessToken,
    getMicrosoftToken,
} from '@/auth'
import { cookies } from 'next/headers'
import { getUserProfile, useUser } from '@/users'
import { normalizeUUID } from '@/util'

export async function GET(request: NextRequest) {
    const user = await useUser()
    if (user) return NextResponse.redirect(new URL('/', request.url))

    const url = new URL(request.url)
    const code = url.searchParams.get('code')
    const msa = new Auth(getMicrosoftToken(url.href.split('?')[0]))
    if (code) {
        try {
            const xbox = await msa.login(code)
            const mc = await xbox.getMinecraft()
            const profile = mc.profile
            if (!profile)
                return NextResponse.redirect(
                    new URL('/auth?error=msa_not_found', request.url)
                )
            const uuid = normalizeUUID(profile.id)
            if (!(await getUserProfile(uuid)))
                return NextResponse.redirect(
                    new URL('/auth?error=not_whitelisted', request.url)
                )
            const accessToken = await generateAccessToken(uuid)
            cookies().set(AUTH_COOKIE_NAME, accessToken)
            return NextResponse.redirect(new URL('/', request.url))
        } catch (e) {
            console.error(e)
            ;(e as any)?.response?.body?.pipe(process.stderr)
            return NextResponse.redirect(
                new URL('/auth?error=unknown', request.url)
            )
        }
    }
    return NextResponse.redirect(msa.createLink())
}
