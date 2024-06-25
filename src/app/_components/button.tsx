import { ComponentProps } from "react"
import { cva, VariantProps } from "cva"

const buttonStyles = cva(
    `text-md flex items-center justify-center gap-2 rounded-lg border px-4 py-2 flex-wrap
    transition-colors focus:outline-none focus:ring disabled:animate-pulse font-bold`,
    {
        variants: {
            intent: {
                primary: "border-red-700 bg-red-500 ring-red-300 hover:bg-red-600 active:bg-red-500 \
                    disabled:text-red-400 text-red-50",
                secondary: "border-neutral-300 bg-neutral-50 ring-neutral-300 hover:bg-neutral-100 \
                    focus:border-neutral-500 active:bg-neutral-50 disabled:text-neutral-400 text-neutral-900",
            },
        },
        defaultVariants: {
            intent: "secondary",
        },
    }
)

export default function Button({
    className,
    intent,
    ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonStyles>) {
    return <button className={buttonStyles({ intent, className })} {...props} />
}
