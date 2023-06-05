import { ComponentProps } from 'react'

export default function Button({
    className,
    ...props
}: ComponentProps<'button'>) {
    return (
        <button
            className={`text-md flex items-center justify-center gap-1 rounded-lg border border-neutral-300
                bg-neutral-50 px-4 py-2 transition-colors hover:bg-neutral-100 focus:border-neutral-500 focus:outline-none 
                focus:ring focus:ring-neutral-300 active:bg-neutral-200 disabled:animate-pulse disabled:text-neutral-400
                ${className}`}
            {...props}
        />
    )
}
