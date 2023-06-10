import { getEnvVariable } from '@/util'
import ErrorPage from '@/app/_components/error-page'
import { redirect } from 'next/navigation'

export default function Map() {
    const downloadLink = getEnvVariable('DOWNLOAD_URL')
    if (!downloadLink)
        return (
            <ErrorPage
                title="Загрузка не доступна"
                description="Мы сообщим в наших социальных сетях когда модпак можно будет скачать."
                advancedDescription="Отсутствует переменная окружения DOWNLOAD_URL."
            />
        )
    redirect(downloadLink)
}
