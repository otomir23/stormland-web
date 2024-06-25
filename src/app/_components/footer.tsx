import socials from "@/socials"
import Link from "next/link"
import { getEnvVariable } from "@/util"
import SocialIcon from "@/app/_components/social-icon"

export default function Footer() {
    const mcUrl = getEnvVariable("MINECRAFT_URL")

    return (
        <footer className="flex w-full items-center justify-between gap-2 px-8 py-8 md:px-12 lg:px-16">
            <nav className="flex gap-4">
                {socials.map(({ name, href, color }) => (
                    <Link
                        href={href}
                        key={name}
                        target="_blank"
                        style={{ color }}
                    >
                        <SocialIcon
                            name={name}
                            className="h-6 text-neutral-600 transition-colors hover:text-current"
                        >
                            {name}
                        </SocialIcon>
                    </Link>
                ))}
            </nav>
            {mcUrl && <p>{mcUrl}</p>}
        </footer>
    )
}
