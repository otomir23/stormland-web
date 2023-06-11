import Main from '@/app/_components/main'
import { getUserProfile } from '@/users'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

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
            <img
                src={`http://skinsystem.ely.by/skins/${profile.username}.png`}
            />
            <p>Subscription until: {profile.until.toDateString()}</p>
        </Main>
    )
}
