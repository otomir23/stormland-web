import './globals.css'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Stormland',
    description: 'Тот самый секретный Minecraft сервер для друзей.',
}

export default function RootLayout({ children }: PropsWithChildren<{}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
