import Main from '@/app/_components/main'
import { getUserProfile, subsEnabled, useUser } from '@/users'
import SkinRenderer from '@/app/profile/_components/skin-renderer'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { Calendar } from 'lucide-react'
import Link from 'next/link'

type Props = {
    params: { uuid: string }
}

export async function generateMetadata({
    params: { uuid },
}: Props): Promise<Metadata> {
    const profile = await getUserProfile(uuid)
    if (!profile) notFound()

    return {
        title: profile.username,
        description: `${profile.username} играет на Stormland, приватном Minecraft сервере для друзей.`,
        openGraph: {
            type: 'profile',
        },
    }
}

export default async function Profile({ params: { uuid } }: Props) {
    const profile = await getUserProfile(uuid)
    if (!profile) notFound()
    const self = await useUser()

    return (
        <Main className="flex flex-col gap-8 md:flex-row">
            <SkinRenderer
                className="h-[32rem] w-full max-w-md rounded-lg border border-neutral-300"
                skinUrl={`/profile/${profile.uuid}/skin.png`}
                options={{
                    zoom: 0.7,
                }}
            />
            <section className="flex flex-1 flex-col gap-4 py-4">
                <div>
                    <h1 className="text-2xl font-bold">{profile.username}</h1>
                    {profile.online ? (
                        <p className="text-lg font-bold text-red-500">
                            В игре --{'>'}
                        </p>
                    ) : (
                        <p className="text-lg font-bold text-neutral-600">
                            Не на сервере
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-x-2 rounded-lg border border-neutral-300 px-6 py-4 text-lg">
                    <span className="contents text-neutral-700">
                        <Calendar size={16} /> Подписка:
                    </span>
                    <span className="text-neutral-800">
                        {subsEnabled
                            ? profile.until > new Date()
                                ? 'Активна до ' +
                                  profile.until.toLocaleDateString('ru-RU', {
                                      day: 'numeric',
                                      month: 'long',
                                      year: 'numeric',
                                  })
                                : 'просрочена'
                            : 'бесплатная'}
                    </span>
                    <div className="hidden flex-1 lg:block" />
                    {subsEnabled && (
                        <Link
                            href={`/profile/${profile.uuid}/sub`}
                            className="text-red-500"
                        >
                            {self?.uuid === profile.uuid
                                ? 'Продлить подписку -->'
                                : 'Подарить подписку -->'}
                        </Link>
                    )}
                </div>
            </section>
        </Main>
    )
}
