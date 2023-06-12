import Main from '@/app/_components/main'
import { getUserProfile } from '@/users'
import SkinRenderer from '@/app/profile/_components/skin-renderer'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'

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

    return (
        <Main>
            <h1 className="tesxt-lg font-bold">{profile.username}</h1>
            <Image
                width={64}
                height={64}
                alt={profile.username + "'s Minecraft Skin"}
                src={`/profile/${profile.uuid}/skin.png`}
            />
            <div className="h-96 w-64 rounded-lg border border-neutral-300">
                <SkinRenderer src={`/profile/${profile.uuid}/skin.png`} />
            </div>
            <p>Subscription until: {profile.until.toDateString()}</p>
        </Main>
    )
}
