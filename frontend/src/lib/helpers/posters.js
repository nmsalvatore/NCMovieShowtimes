export function getPosterUrl(title) {
    const apiUrl = import.meta.env.VITE_API_URL
    const timestamp = new Date().getTime()
    return `${apiUrl}/api/posters/${title}.jpg?timestamp=${timestamp}`
}
