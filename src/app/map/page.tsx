import { getEnvVariable } from '@/util'
import Main from '@/app/_components/main'
import ErrorPage from '@/app/_components/error-page'
import { Info, MapPinOff } from 'lucide-react'
import { Suspense } from 'react'
import Profiles from '@/app/map/_components/profiles'
import Link from 'next/link'

export const metadata = {
    title: 'Карта сервера',
}

export default function Map() {
    const mapSource = getEnvVariable('MAP_URL')
    if (!mapSource)
        return (
            <ErrorPage
                icon={MapPinOff}
                title="Карта не настроена"
                description="Мы сообщим в наших социальных сетях когда она станет доступна."
                advancedDescription="Отсутствует переменная окружения MAP_URL."
            />
        )

    return (
        <Main>
            <iframe
                className="min-h-screen w-full rounded-lg border border-neutral-300"
                src={'/map/embed'}
            >
                Ору чё у тебя за говно браузер
            </iframe>
            <div className="mt-2 flex items-center gap-2 text-neutral-600">
                <Info size={16} />
                <p>
                    Если у вас некорректно отображается карта, вы можете открыть
                    её{' '}
                    <Link
                        className="text-red-500"
                        href={mapSource}
                        target="_blank"
                    >
                        отдельной страницей
                    </Link>
                    .
                </p>
            </div>
            <Suspense fallback={null}>
                <Profiles />
            </Suspense>
        </Main>
    )
}
