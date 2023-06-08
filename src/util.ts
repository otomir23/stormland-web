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
