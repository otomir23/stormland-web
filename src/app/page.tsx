import Main from '@/app/_components/main'
import { Suspense } from 'react'
import OnlinePlayers from '@/app/_components/online-players'
import Image from 'next/image'
import logo from '@/app/logo.png'
import Gallery from '@/app/_components/gallery'

export default function Home() {
    return (
        <Main className="flex flex-row flex-col gap-16 xl:flex-row">
            <div className="flex flex-col items-center gap-2 text-center xl:w-1/2 xl:py-8">
                <h2 className="text-4xl font-bold">Добро пожаловать на</h2>
                <Image
                    src={logo}
                    alt="Stormland: Create & Delight"
                    className="my-4 w-[32rem]"
                />
                <p className="max-w-xl text-2xl text-neutral-800">
                    StormLand - уникальный Minecraft сервер для друзей, где
                    можно просто насладится игрой и завести знакомых. Мы уважаем
                    и ценим каждого игрока и прислушиваемся ко всем мнениям.
                </p>
                <Suspense fallback={null}>
                    <OnlinePlayers />
                </Suspense>
            </div>
            <Suspense fallback={<div className="xl:w-1/2" />}>
                <Gallery className="xl:w-1/2" />
            </Suspense>
        </Main>
    )
}
