import { cookies } from 'next/headers'
import { getUUID } from '@/auth'

export type User = {
    uuid: string
    username: string
}

export async function useUser(): Promise<User | null> {
    const accessToken = cookies().get('token')
    if (!accessToken) return null

    const uuid = await getUUID(accessToken.value)
    if (!uuid) return null

    return await getUserProfile(uuid)
}

export async function getUserProfile(uuid: string): Promise<User | null> {
    // TODO placeholder
    if (uuid !== '5392538a-0394-11ee-be56-0242ac120002') return null
    return {
        uuid,
        username: 'test',
    }
}
