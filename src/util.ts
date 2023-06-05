export function validateFormDataEntry(
    value: FormDataEntryValue | null
): value is string {
    return value !== null && typeof value === 'string' && value !== ''
}
