"use client"

import { ComponentProps } from "react"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import Button from "@/app/_components/button"

export default function SubmitButton({
    disabled,
    ...props
}: Omit<ComponentProps<typeof Button>, "type">) {
    const { pending } = useFormStatus()
    return <Button type="submit" disabled={disabled || pending} {...props} />
}
