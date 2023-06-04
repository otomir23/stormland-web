import HeaderLink from '@/app/_components/header-link'
import { Download, Home, Map, User } from 'lucide-react'

export default function Header() {
    return (
        <header className="sticky left-0 right-0 top-0 flex w-full gap-4 px-16 py-8 text-lg">
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
                <HeaderLink href="/auth">
                    <User height={16} />
                    Войти
                </HeaderLink>
            </nav>
        </header>
    )
}
