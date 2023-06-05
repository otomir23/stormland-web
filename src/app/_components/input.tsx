import { ComponentProps } from 'react'

export default function Input({
    className,
    ...props
}: ComponentProps<'input'>) {
    return (
        <input
            className={`rounded-lg border border-neutral-300 px-4 py-2 transition-colors placeholder:text-neutral-300
        focus:border-neutral-500 focus:outline-none focus:ring focus:ring-neutral-300 ${className}`}
            {...props}
        />
    )
}
