import { getAllProfiles } from '@/users'
import Link from 'next/link'

export default async function Profiles() {
    const profiles = await getAllProfiles()
    if (profiles.length === 0) return null
    return (
        <>
            <h2 className="mt-8 text-2xl font-bold">Игроки</h2>
            <aside className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {profiles
                    .sort((a, b) => Number(b.online) - Number(a.online))
                    .map((u) => (
                        <Link
                            href={`/profile/${u.uuid}`}
                            key={u.uuid}
                            className="flex items-center gap-4 rounded-lg border border-neutral-300 px-6 py-4 text-lg transition-colors duration-300 ease-in-out hover:border-red-500"
                        >
                            <div className="relative">
                                <div
                                    className={`h-12 w-12 rounded bg-gradient-to-b from-red-300 to-red-500 ${
                                        u.online ? '' : 'saturate-0'
                                    }`}
                                />
                                {u.online && (
                                    <div className="absolute -bottom-1.5 -right-1.5 h-4 w-4 rounded-full border-2 border-white bg-red-500" />
                                )}
                            </div>
                            <span
                                className={`text-ellipsis ${
                                    u.online
                                        ? 'text-neutral-800'
                                        : 'text-neutral-600'
                                }`}
                            >
                                {u.username}
                            </span>
                        </Link>
                    ))}
            </aside>
        </>
    )
}
