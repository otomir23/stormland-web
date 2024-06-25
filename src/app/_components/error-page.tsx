import { AlertCircle, LucideIcon } from "lucide-react"
import Main from "@/app/_components/main"

export default function ErrorPage({
    icon: Icon = AlertCircle,
    title,
    description,
    advancedDescription,
}: {
    icon?: LucideIcon,
    title: string,
    description?: string,
    advancedDescription?: string,
}) {
    return (
        <Main className="flex min-h-screen flex-col items-center justify-center">
            <div className="contents text-center">
                <Icon size={48} className="mb-4" />
                <h1 className="max-w-md text-2xl font-bold">{title}</h1>
                {description && (
                    <p className="max-w-md text-lg">{description}</p>
                )}
                {advancedDescription && (
                    <>
                        <p className="text-md mt-6 font-bold text-neutral-700">
                            Дополнительная информация:
                        </p>
                        <p className="text-md max-w-md text-neutral-500">
                            {advancedDescription}
                        </p>
                    </>
                )}
            </div>
        </Main>
    )
}
