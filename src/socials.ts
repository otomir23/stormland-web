import { getEnvVariable } from "@/util"

export type Social = {
    name: string,
    href: string,
    color: string,
}

const sourceSocials = new Map([
    ["telegram", "#2AABEE"],
    ["discord", "#5865F2"],
])

function getSocials(): Social[] {
    const socials: Social[] = []
    sourceSocials.forEach((color, name) => {
        const href = getEnvVariable(`${name.toUpperCase()}_URL`)
        if (href)
            socials.push({
                name,
                href,
                color,
            })
    })
    return socials
}

export default getSocials()
