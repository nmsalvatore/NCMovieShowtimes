export async function fetchDates() {
    try {
        const apiUrl = import.meta.env.VITE_API_URL
        const res = await fetch(`${apiUrl}/api/dates`, {
            method: 'GET',
            headers: {
                'X-API_KEY': import.meta.env.VITE_API_KEY,
            }
        })
        const dates = await res.json()
        const today = new Date()
        today.setHours(0, 0, 0, 0)
    
        return dates.filter(dateString => {
            const dateParts = dateString.split('/')
            const date = new Date(dateParts[2], dateParts[0] - 1, dateParts[1])
            return date >= today
        })
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
                'X-API_KEY': import.meta.env.VITE_API_KEY,
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
                    'X-API_KEY': import.meta.env.VITE_API_KEY,
                }
            })
        const movies = await response.json()
        return movies
    } catch (error) {
        throw new Error(error)
    }
}