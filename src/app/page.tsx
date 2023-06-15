import Main from '@/app/_components/main'
import { Suspense } from 'react'
import OnlinePlayers from '@/app/_components/online-players'

export default function Home() {
    return (
        <Main>
            <span className="font-bold text-neutral-700">
                всем привет я разработчик этого веб site и мне нечего сюда
                написать 🥸
            </span>
            <Suspense fallback={null}>
                <OnlinePlayers />
            </Suspense>
        </Main>
    )
}
