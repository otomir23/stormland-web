import { jwtVerify, SignJWT } from "jose"
import { getEnvVariable, namedJavaUUID } from "@/util"
import { MSToken } from "msmc/types/auth/auth"
import { prisma } from "@/db"
import { verify } from "argon2"

export const AUTH_COOKIE_NAME = "token"
const alg = "HS256"

/**
 * Gets JWT secret env variable
 * @returns JWT secret for signing
 * @throws Will throw if there is no secret in production environment
 */
function getJWTSecret(): Uint8Array {
    return (
        new TextEncoder().encode(getEnvVariable("JWT_SECRET"))
            || new Uint8Array()
    )
}

/**
 * Validates and gets an offline UUID associated with provided credentials
 * @returns offline UUID string or null if credentials are invalid
 */
export async function getOfflineUUIDWithCredentials(
    username: string,
    password: string
): Promise<string | null> {
    const uuid = namedJavaUUID(`OfflinePlayer:${username}`)
    const offlineAuthData = await prisma.offlineAuth.findFirst({
        where: {
            uuid,
        },
    })
    if (!offlineAuthData) return null
    const { data } = offlineAuthData
    if (
        !data
        || typeof data !== "object"
        || Array.isArray(data)
        || !data.password
        || typeof data.password !== "string"
    )
        throw "Offline Auth Data JSON is not valid: " + JSON.stringify(data)

    if (!(await verify(data.password, password))) return null

    return uuid
}

/**
 * Generates and signs Access Token JWT using provided UUID
 * @param uuid online or offline UUID associated with user's Minecraft profile
 * @returns Access Token JWT
 */
export async function generateAccessToken(uuid: string): Promise<string> {
    return await new SignJWT({ uuid })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(getJWTSecret())
}

/**
 * Gets user's UUID from their access token
 * @param accessToken Access Token JWT of the user
 * @returns UUID or null if token verification failed
 */
export async function getUUID(accessToken: string): Promise<string | null> {
    const { payload } = await jwtVerify(accessToken, getJWTSecret()).catch(() => ({ payload: null }))
    if (!payload || !payload.uuid || typeof payload.uuid !== "string") return null
    return payload.uuid
}

/**
 * Generates data for MSMC lib
 * @param callbackURL URL that Microsoft will redirect to
 * @returns MSToken object to work with auth
 */
export function getMicrosoftToken(callbackURL: string): MSToken {
    return {
        client_id: getEnvVariable("MSA_CLIENT_ID", true),
        redirect: callbackURL,
        clientSecret: getEnvVariable("MSA_CLIENT_SECRET", true),
    }
}

/**
 * Map of auth error IDs as their human-readable descriptions.
 */
export const authErrors = new Map([
    [
        "invalid_credentials",
        "Введён неправильный пароль или аккаунт не зарегистрирован как пиратский на сервере.",
    ],
    ["missing_credentials", "Не заполнено одно или несколько полей."],
    [
        "msa_not_found",
        "Аккаунт не владеет лицензией Minecraft, попробуйте войти по паролю.",
    ],
    [
        "not_whitelisted",
        "Аккаунт найден, но не в белом списке. Свяжитесь с администратором",
    ],
    ["unknown", "Произошла неизвестная ошибка. Свяжитесь с администратором."],
])
