import { getOnlineProfiles } from "@/users"
import Link from "next/link"

export default async function OnlinePlayers() {
    const profiles = await getOnlineProfiles()
    if (profiles.length === 0) return null
    return (
        <>
            <h2 className="mt-8 text-2xl font-bold">Игроки онлайн</h2>
            <div className="mt-2 flex flex-wrap gap-4">
                {profiles.map(u => (
                    <Link href={`/profile/${u.uuid}`} key={u.uuid}>
                        <div
                            className="h-8 w-8 rounded bg-gradient-to-b from-red-300 to-red-500"
                        />
                    </Link>
                ))}
            </div>
        </>
    )
}
