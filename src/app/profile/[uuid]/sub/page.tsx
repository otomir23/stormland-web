/* eslint-disable @stylistic/max-len */

import { subsEnabled } from "@/users"
import { notFound } from "next/navigation"
import ErrorPage from "@/app/_components/error-page"
import { CalendarX2 } from "lucide-react"

export default function Sub() {
    if (!subsEnabled) notFound()

    return (
        <ErrorPage
            icon={CalendarX2}
            title="Подписки не готовы"
            description="Свяжитесь с администрацией и сообщите им, что они обосрались."
            advancedDescription="Переменная окружения SUBSCRIPTIONS_ENABLED равна true, но функционал подписки не готов."
        />
    )
}
