"use client"

import { PropsWithChildren, useState } from "react"
import { Menu, XIcon } from "lucide-react"

export default function Nav({ children }: PropsWithChildren) {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Menu
                onClick={() => setOpen(true)}
                className="text-neutral-700 md:hidden"
            />
            <nav
                className={`fixed inset-0 h-screen w-full flex-col gap-6 p-8 text-neutral-700 md:static md:flex md:p-0 \
                md:h-auto md:flex-row z-50 max-md:bg-white/90 max-md:backdrop-blur-3xl ${open ? "flex" : "hidden"}`}
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
