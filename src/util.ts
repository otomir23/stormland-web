import { createHash } from 'crypto'

export function validateFormDataEntry(
    value: FormDataEntryValue | null
): value is string {
    return value !== null && typeof value === 'string' && value !== ''
}

/**
 * Gets and validates env variable
 * @param name name of th env variable
 * @param required if set to true and the env var is missging will throw
 * @returns string value of the env variable
 * @throws Will throw if required amd not set in production environment
 */
export function getEnvVariable(
    name: string,
    required: boolean = false
): string {
    const variable = process.env[name]
    if (!variable) {
        if (required) {
            if (process.env.NODE_ENV === 'production')
                throw new Error(
                    name + ' env variable is required in production'
                )
            console.warn(name + ' env variable is missing')
        }
        return ''
    }
    return variable
}

/**
 * Generates UUID mimicking JDK's UUID::nameUUIDFromBytes method
 * @param name string to be used to construct a UUID
 * @returns A UUID generated from the specified string
 */
export function namedJavaUUID(name: string) {
    let md5Bytes = createHash('md5').update(name).digest()
    md5Bytes[6] &= 0x0f // clear version
    md5Bytes[6] |= 0x30 // set to version 3
    md5Bytes[8] &= 0x3f // clear variant
    md5Bytes[8] |= 0x80 // set to IETF variant
    return normalizeUUID(md5Bytes.toString('hex'))
}

export function normalizeUUID(uuid: string) {
    return uuid.replace(
        /(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/,
        '$1-$2-$3-$4-$5'
    )
}

export function shuffle<T>(src: T[]): T[] {
    const array: T[] = src.map((e) => e)
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}
