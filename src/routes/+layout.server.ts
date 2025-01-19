export const load = async ({ locals }) => {
    return {
        token: locals.token,
        priviledged: locals.priviledged
    }
}
