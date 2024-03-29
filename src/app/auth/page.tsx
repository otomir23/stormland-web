import Link from 'next/link'
import Image from 'next/image'
import {
    AUTH_COOKIE_NAME,
    authErrors,
    generateAccessToken,
    getOfflineUUIDWithCredentials,
} from '@/auth'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { validateFormDataEntry } from '@/util'
import { AlertCircle } from 'lucide-react'
import microsoftIcon from '@/app/auth/_assets/microsoft.svg'
import SubmitButton from '@/app/_components/submit-button'
import Button from '@/app/_components/button'
import Input from '@/app/_components/input'
import OfflineAuthFormWrapper from '@/app/auth/_components/offline-auth-form-wrapper'
import { getUserProfile, useUser } from '@/users'
import Main from '@/app/_components/main'

export const metadata = {
    title: 'Войти в аккаунт',
}

export default async function Auth({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    async function credentialsSignIn(formData: FormData) {
        'use server'

        const username = formData.get('username')
        const password = formData.get('password')
        if (
            !validateFormDataEntry(username) ||
            !validateFormDataEntry(password)
        )
            redirect('/auth?error=missing_credentials')
        let uuid = null
        try {
            uuid = await getOfflineUUIDWithCredentials(username, password)
        } catch (e) {
            console.error(e)
            redirect('/auth?error=unknown')
        }
        if (!uuid) redirect('/auth?error=invalid_credentials')
        if (!(await getUserProfile(uuid)))
            redirect('/auth?error=not_whitelisted')
        const accessToken = await generateAccessToken(uuid)
        cookies().set(AUTH_COOKIE_NAME, accessToken)
    }

    const errorId = searchParams['error']
    const error =
        errorId && typeof errorId === 'string'
            ? authErrors.get(errorId) || null
            : null

    if ((await useUser()) !== null) {
        redirect('/')
    }

    return (
        <Main>
            <OfflineAuthFormWrapper
                className="absolute inset-x-0 mx-auto flex w-full max-w-sm flex-col gap-4 rounded-2xl border-neutral-100 p-8 sm:static sm:mt-8 sm:border"
                action={credentialsSignIn}
            >
                {error && (
                    <div className="flex items-center gap-4 rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm text-red-600">
                        <AlertCircle height={16} className="min-w-fit" />
                        <p>{error}</p>
                    </div>
                )}
                <h1 className="text-lg font-bold">Авторизация</h1>
                <Link href="/auth/msa" className="contents">
                    <Button type="reset" intent="primary">
                        Войти через
                        <Image
                            src={microsoftIcon}
                            alt="Microsoft Logo"
                            className="pointer-events-none -mr-1.5 h-8 w-min"
                        />
                        Microsoft
                    </Button>
                </Link>
                <p className="mx-auto text-neutral-400">или</p>
                <Input
                    name="username"
                    placeholder="Имя пользователя"
                    required
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required
                />
                <SubmitButton>Войти через пиратку</SubmitButton>
            </OfflineAuthFormWrapper>
        </Main>
    )
}
