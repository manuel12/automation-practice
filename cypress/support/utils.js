export const generateUniqueEmail = (email) => {
    const timestamp = new Date().getTime() % 10000 // Ensure timestamp is at most 4 digits
    const [username, domain] = email.split("@")
    const uniqueEmail = `${username}+${timestamp}@${domain}`
    return uniqueEmail
}
