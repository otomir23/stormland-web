import { NextRequest, NextResponse } from 'next/server'
import { notFound } from 'next/navigation'
import { getEnvVariable } from '@/util'

export async function GET(
    _: NextRequest,
    { params: { path } }: { params: { path: string[] } }
) {
    const mapSource = getEnvVariable('MAP_URL')
    if (!mapSource) notFound()
    const target
        = path.length === 1 && path[0] === 'embed' ? '' : path.join('/')
    try {
        const res = await fetch(mapSource + '/' + target)
        if (res.ok) {
            const content = await res.text()
            console.log(content)
            return new NextResponse(content, {
                headers: res.headers,
                status: res.status,
                statusText: res.statusText,
            })
        }
    } catch { /* noop */
    }
    if (target === '')
        return new NextResponse(
            `Не удалось создать прокси карты, попробуйте перейти на неё \
            <a href='${mapSource}' target='_blank'>напрямую</a>`,
            {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                },
                status: 500,
            }
        )
    return new NextResponse(null, {
        status: 500,
    })
}
