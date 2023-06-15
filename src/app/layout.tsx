import './globals.css'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import Header from '@/app/_components/header'
import Footer from '@/app/_components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: {
        template: '%s | Stormland',
        default: 'Stormland',
    },
    description: 'Тот самый секретный Minecraft сервер для друзей.',
}

export default function RootLayout({ children }: PropsWithChildren<{}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    )
}
