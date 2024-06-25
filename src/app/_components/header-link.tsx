"use client"

import { PropsWithChildren } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import Link from "next/link"

export default function HeaderLink({
    href,
    children,
}: PropsWithChildren<{
    href: string,
}>) {
    const currentSegment = useSelectedLayoutSegment()
    const segment = href.split("/").at(-1)
    const isActive
        = (segment === "" && !currentSegment) || segment === currentSegment

    return (
        <Link
            href={href}
            className={`flex items-center gap-1 transition-colors hover:text-neutral-700 ${
                isActive ? "text-neutral-800" : "text-neutral-600"
            }`}
        >
            {children}
        </Link>
    )
}
