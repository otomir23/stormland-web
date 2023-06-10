import HeaderLink from '@/app/_components/header-link'
import { Download, Home, Map } from 'lucide-react'
import HeaderUserLink from '@/app/_components/header-user-link'
import { Suspense } from 'react'

export default function Header() {
    return (
        <header className="sticky left-0 right-0 top-0 flex w-full gap-4 bg-white bg-opacity-50 px-16 py-8 text-lg backdrop-blur-sm">
            <nav className="text-neut flex w-full flex-row gap-6 text-neutral-700">
                <HeaderLink href="/">
                    <Home height={16} /> Главная
                </HeaderLink>
                <HeaderLink href="/map">
                    <Map height={16} />
                    Карта
                </HeaderLink>
                <HeaderLink href="/download">
                    <Download height={16} />
                    Скачать
                </HeaderLink>
                <div className="h-full flex-1" />
                <Suspense
                    fallback={
                        <div className="h-6 w-16 animate-pulse rounded-full bg-neutral-300" />
                    }
                >
                    <HeaderUserLink />
                </Suspense>
            </nav>
        </header>
    )
}
