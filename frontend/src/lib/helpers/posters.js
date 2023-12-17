export function getPosterUrl(title) {
    const apiUrl = import.meta.env.VITE_API_URL;
    // Append a unique query string to the URL
    const timestamp = new Date().getTime();
    return `${apiUrl}/api/posters/${title}.jpg?timestamp=${timestamp}`;
}

