import { PropsWithChildren } from "react"

export default async function SocialIcon({
    name,
    className,
    children,
}: PropsWithChildren<{
    name: string,
    className?: string,
}>) {
    const Icon = await import(`@/app/_icons/${name}`).then(
        m => m.default,
        () => null
    )

    return <div className={className}>{Icon ? <Icon /> : children}</div>
}
