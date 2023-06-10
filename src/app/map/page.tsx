import { getEnvVariable } from '@/util'
import Main from '@/app/_components/main'
import ErrorPage from '@/app/_components/error-page'
import { MapPinOff } from 'lucide-react'

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
                src={mapSource}
            >
                Ору чё у тебя за говно браузер
            </iframe>
        </Main>
    )
}
