export async function fetchDates() {
    try {
        const apiUrl = import.meta.env.VITE_API_URL
        const res = await fetch(`${apiUrl}/api/dates`, {
            method: 'GET',
            headers: {
                'X-API-KEY': import.meta.env.VITE_API_KEY,
            }
        })
        const dates = await res.json()
        return dates
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchAllShowings() {
    try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${apiUrl}/api/showings`, {
            method: 'GET',
            headers: {
                'X-API-KEY': import.meta.env.VITE_API_KEY,
            }
        })
        const showings = await response.json()
        return showings
    } catch (error) {
        throw new Error(error)
    }
}

export async function fetchAllMovies() {
    try {
        const apiUrl = import.meta.env.VITE_API_URL
        const response = await fetch(`${apiUrl}/api/movies`, {
                method: 'GET',
                headers: {
                    'X-API-KEY': import.meta.env.VITE_API_KEY,
                }
            })
        const movies = await response.json()
        return movies
    } catch (error) {
        throw new Error(error)
    }
}