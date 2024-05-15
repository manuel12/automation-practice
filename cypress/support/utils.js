/**
 * Generates a unique email address based on the current timestamp.
 * @returns {string} The generated unique email address.
 */

export const generateUniqueEmail = () => {
  const email = "testuser@gmail.com"
  const timestamp = new Date().getTime() % 1000000 // Ensure timestamp is at most 6 digits
  const [username, domain] = email.split("@")
  const uniqueEmail = `${username}_${timestamp}@${domain}`
  return uniqueEmail
}
