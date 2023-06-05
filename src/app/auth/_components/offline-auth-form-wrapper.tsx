'use client'

import { ComponentProps } from 'react'
import { useRouter } from 'next/navigation'

export default function OfflineAuthFormWrapper({
    action,
    ...props
}: ComponentProps<'form'> & {
    action: (formData: FormData) => void
}) {
    const router = useRouter()

    return (
        <form
            action={async (formData: FormData) => {
                await action(formData)
                router.refresh()
            }}
            {...props}
        />
    )
}
