export function getPosterUrl(title) {
    const formattedTitle = title.toLowerCase().replace(/[\s'"]/g, '_').replace(/[^\w_]/g, '')
    return `http://localhost:3000/api/posters/${title}.jpg`
}
