import { cva, VariantProps } from 'cva'
import { ComponentProps } from 'react'

const mainStyles = cva('px-16')

export default function Main({
    className,
    ...props
}: ComponentProps<'main'> & VariantProps<typeof mainStyles>) {
    return <main className={mainStyles({ className })} {...props} />
}
