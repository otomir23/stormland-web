import { cookies } from 'next/headers'
import { getUUID } from '@/auth'
import { prisma } from '@/db'
import { Profile } from '@prisma/client'
import { cache } from 'react'
import { getEnvVariable } from '@/util'

export async function useUser(): Promise<Profile | null> {
    const accessToken = cookies().get('token')
    if (!accessToken) return null

    const uuid = await getUUID(accessToken.value)
    if (!uuid) return null

    return await getUserProfile(uuid)
}

export const getUserProfile = cache(
    async (uuid: string): Promise<Profile | null> => {
        return prisma.profile.findFirst({
            where: {
                uuid,
            },
        })
    }
)

export const getAllProfiles = cache(
    (): Promise<Profile[]> => prisma.profile.findMany()
)

export const subsEnabled =
    (getEnvVariable('SUBSCRIPTIONS_ENABLED') || 'false').toLowerCase() ===
    'true'
