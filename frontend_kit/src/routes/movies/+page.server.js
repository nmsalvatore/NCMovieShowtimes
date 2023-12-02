import { getTodayDateString } from "$lib/helpers/dates.js"

export async function load() {
    const res = await fetch('http://localhost:3000/api/movies')
    let movies = await res.json()
    const data = []
    const titles = []

    movies = await movies.sort((a, b) => {
        const dateComparison = new Date(a.date) - new Date(b.date)
        if (dateComparison === 0) {
            return a.movie_title.localeCompare(b.movie_title)
        }
        return dateComparison
    })

    movies = movies.filter(movie => movie.date >= getTodayDateString())

    movies.forEach(movie => {
        if (!titles.some(title => title === movie.movie_title)) {
            titles.push(movie.movie_title)

            const title = movie.movie_title
            const rating = movie.rating
            const runtime = movie.runtime
            const dateRange = getMovieDateRange(title, movies)
            const venue = getVenue(title, movies)
    
            data.push({
                title,
                dateRange,
                venue,
                rating,
                runtime
            })
        }})

    return { data }
}

function getMovieDateRange(title, data) {
    const showings = data.filter(movie => movie.movie_title === title)
    const nearest = new Date(showings[0].date).toLocaleDateString()
    const latest = new Date(showings[showings.length - 1].date).toLocaleDateString()
    
    if (nearest === latest) {
        return nearest
    }

    return `${nearest} - ${latest}`
}

function getVenue(title, data) {
    const showings = data.filter(movie => movie.movie_title === title)
    const venuesSet = new Set(showings.map(showing => showing.venue_name))
    const venues = [...venuesSet]
    
    if (venues.length === 1) {
        return venues[0]
    }

    if (venues.length == 2) {
        return `${venues[0]} & ${venues[1]}`
    }

    if (venues.length == 3) {
        return `${venues[0]}, ${venues[1]} & ${venues[2]}`
    }

    return 'Playing everywhere! Check out the calendar for details.'
}
