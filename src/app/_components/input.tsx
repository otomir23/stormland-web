import { ComponentProps } from "react"
import { cva, VariantProps } from "cva"

const inputStyles = cva("transition-colors focus:outline-none focus:ring", {
    variants: {
        type: {
            text: "",
            password: "",
        },
        intent: {
            secondary: "focus:ring-neutral-300",
        },
    },
    compoundVariants: [
        {
            type: ["text", "password"],
            class: "rounded-lg border px-4 py-2",
        },
        {
            type: ["text", "password"],
            intent: "secondary",
            class: "border-neutral-300 placeholder:text-neutral-300 focus:border-neutral-500",
        },
    ],
    defaultVariants: {
        type: "text",
        intent: "secondary",
    },
})

export default function Input({
    type,
    className,
    ...props
}: ComponentProps<"input"> & VariantProps<typeof inputStyles>) {
    return (
        <input
            type={type}
            className={inputStyles({
                type,
                className,
            })}
            {...props}
        />
    )
}
