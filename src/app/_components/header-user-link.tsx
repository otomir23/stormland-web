import { useUser } from "@/users"
import { User } from "lucide-react"
import HeaderLink from "@/app/_components/header-link"

export default async function HeaderUserLink() {
    const user = await useUser()

    if (!user)
        return (
            <HeaderLink href="/auth">
                <User height={16} />
                Войти
            </HeaderLink>
        )

    return (
        <HeaderLink href={"/profile/" + user.uuid}>
            <User height={16} />
            {user.username}
        </HeaderLink>
    )
}
