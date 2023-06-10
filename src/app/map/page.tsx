import { getEnvVariable } from '@/util'
import Main from '@/app/_components/main'
import { AlertCircle } from 'lucide-react'

export default function Map() {
    const mapSource = getEnvVariable('MAP_URL')
    if (!mapSource)
        return (
            <Main className="flex min-h-screen flex-col items-center justify-center">
                <div className="contents text-center">
                    <AlertCircle size={32} className="mb-4" />
                    <p className="max-w-xs text-lg font-bold">
                        Сожалеем, но карта в настоящий момент не доступна.
                        Проверьте страницу позже.
                    </p>
                    <p className="mt-4 text-sm font-bold">
                        Информация для администрации:
                    </p>
                    <p className="text-sm">Переменная MAP_URL не настроена.</p>
                </div>
            </Main>
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
