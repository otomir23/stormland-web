import socials from "@/socials"
import { notFound, redirect } from "next/navigation"

export default function Social({
    params: { name },
}: {
    params: { name: string },
}) {
    const social = socials.find(
        s => s.name.toLowerCase() === name.toLowerCase()
    )
    if (!social) notFound()
    redirect(social.href)
}
