import { getTodayDateString } from '$lib/helpers/dates.js'
import { getPosterUrl } from '$lib/helpers/posters.js'
import { fetchAllMovies } from '$lib/db'

export async function load({ url }) {
    const movies = await fetchAllMovies()
    const allMovies = []
    const titles = []
    const moviesSorted = await movies.sort((a, b) => {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        const dateComparison = dateA - dateB
        if (dateComparison === 0) {
            return a.movie_title.localeCompare(b.movie_title)
        }
        return dateComparison
    });
    
    const todayStr = getTodayDateString()
    const todayDate = new Date(todayStr)
    const moviesFiltered = moviesSorted.filter(movie => {
        const movieDate = new Date(movie.date)
        return movieDate >= todayDate
    })

    moviesFiltered.forEach(movie => {
        if (!titles.some(title => title === movie.movie_title)) {
            titles.push(movie.movie_title)

            const title = movie.movie_title
            const rating = movie.rating
            const runtime = movie.runtime
            const posterUrl = getPosterUrl(movie.movie_title)
            const dateRange = getMovieDateRange(title, movies)
            const venue = getVenue(title, movies)
    
            allMovies.push({
                title,
                dateRange,
                venue,
                rating,
                runtime,
                posterUrl,
            })
        }})

    const pageTitle = 'All Movies'
    const description = 'A complete list of all movies currently playing in Nevada City and Grass Valley, California!'
    const href = url.href
    const ogTitle = 'Nevada County Movie Showtimes | All Movies'

    return { 
        allMovies, 
        description, 
        pageTitle, 
        href, 
        ogTitle
    }
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
