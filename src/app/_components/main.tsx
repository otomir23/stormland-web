import { cva, VariantProps } from 'cva'
import { ComponentProps } from 'react'

const mainStyles = cva('px-8 md:px-12 lg:px-16 min-h-screen')

export default function Main({
    className,
    ...props
}: ComponentProps<'main'> & VariantProps<typeof mainStyles>) {
    return <main className={mainStyles({ className })} {...props} />
}
