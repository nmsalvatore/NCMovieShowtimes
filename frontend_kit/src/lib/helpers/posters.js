export function getPosterUrl(title) {
    const apiUrl = import.meta.env.VITE_API_URL
    return `${apiUrl}/api/posters/${title}.jpg`
}
