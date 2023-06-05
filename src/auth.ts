import { jwtVerify, SignJWT } from 'jose'

const alg = 'HS256'

/**
 * Gets JWT secret env variable
 * @returns JWT secret for signing
 * @throws Will throw if there is no secret in production environment
 */
function getJWTSecret() {
    const secret = process.env.JWT_SECRET
    if (!secret) {
        if (process.env.NODE_ENV === 'production')
            throw new Error('No JWT secret in production')
        return new Uint8Array()
    }
    return new TextEncoder().encode(secret)
}

/**
 * Validates and gets an offline UUID associated with provided credentials
 * @returns offline UUID string or null if credentials are invalid
 */
export async function getOfflineUUIDWithCredentials(
    username: string,
    password: string
): Promise<string | null> {
    // TODO placeholder
    return username === 'test' && password === 'stormcraft228'
        ? '5392538a-0394-11ee-be56-0242ac120002'
        : null
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
        .setExpirationTime('7d')
        .sign(getJWTSecret())
}

/**
 * Gets user's UUID from their access token
 * @param accessToken Access Token JWT of the user
 * @returns UUID or null if token verification failed
 */
export async function getUUID(accessToken: string): Promise<string | null> {
    const { payload } = await jwtVerify(accessToken, getJWTSecret())
    if (!payload.uuid || typeof payload.uuid !== 'string') return null
    return payload.uuid
}

/**
 * Map of auth error IDs as their human-readable descriptions.
 */
export const authErrors = new Map([
    [
        'invalid_credentials',
        'Введён неправильный пароль или аккаунт не зарегистрирован как пиратский на сервере.',
    ],
    ['missing_credentials', 'Не заполнено одно или несколько полей.'],
    [
        'msa_forbidden',
        'Аккаунт используется как пиратский на сервере, войдите по паролю.',
    ],
    [
        'msa_not_whitelisted',
        'Аккаунт найден, но не в белом списке. Свяжитесь с администратором.',
    ],
])
