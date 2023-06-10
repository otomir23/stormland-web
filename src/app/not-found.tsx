import ErrorPage from '@/app/_components/error-page'
import { SearchX } from 'lucide-react'

export const metadata = {
    title: 'Страница не найдена',
}

export default function NotFound() {
    return (
        <ErrorPage
            icon={SearchX}
            title="Страница не найдена"
            description="Если вы считаете что так не должно быть, сявжитесь с администрацией."
            advancedDescription="Путь вызвал функцию `notFound` или не был найден сервером Next.js."
        />
    )
}
