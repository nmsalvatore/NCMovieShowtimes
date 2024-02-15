export async function fetchDates() {
    const apiUrl = import.meta.env.VITE_API_URL
    const res = await fetch(`${apiUrl}/api/dates`)
    const dates = await res.json()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return dates.filter(dateString => {
        const dateParts = dateString.split('/')
        const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1])
        return date >= today
    })
}

export async function fetchAllShowings() {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(`${apiUrl}/api/showings`)
    const data = await response.json()

    return data
}

export async function fetchAllMovies() {
    const apiUrl = import.meta.env.VITE_API_URL
    const response = await fetch(`${apiUrl}/api/movies`)

    return await response.json()
}