import Main from '@/app/_components/main'
import { getUserProfile } from '@/users'
import { notFound } from 'next/navigation'

export default async function Profile({
    params: { uuid },
}: {
    params: { uuid: string }
}) {
    const profile = await getUserProfile(uuid)
    if (!profile) notFound()

    return <Main>{profile.username}</Main>
}
