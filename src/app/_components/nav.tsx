'use client'

import { PropsWithChildren, useState } from 'react'
import { Menu, XIcon } from 'lucide-react'

export default function Nav({ children }: PropsWithChildren<{}>) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Menu
                onClick={() => setOpen(true)}
                className="text-neutral-700 md:hidden"
            />
            <nav
                className={`fixed inset-0 h-screen w-full flex-col gap-6 p-8 text-neutral-700 md:static md:flex md:h-auto md:flex-row md:p-0 ${
                    open ? 'flex' : 'hidden'
                } z-10 bg-white bg-opacity-90 backdrop-blur-3xl md:bg-opacity-0 md:backdrop-blur-0`}
                onClick={() => {
                    setOpen(false)
                }}
            >
                {children}
            </nav>
            {open && (
                <XIcon
                    onClick={() => setOpen(false)}
                    className="fixed right-8 top-8 z-20 text-neutral-700 md:hidden"
                />
            )}
        </>
    )
}
