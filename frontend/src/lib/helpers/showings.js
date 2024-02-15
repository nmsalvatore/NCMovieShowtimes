import { getPosterUrl } from '$lib/helpers/posters'

export function formatShowingsByVenue(showings) {
    let venues = new Set(showings.map(showing => showing.venue_name));

    return [...venues].map(venue => {
        const showingsWithTimes = []
        const address = showings.find(showing => showing.venue_name === venue).address
        const venueShowings = showings.filter(showing => showing.venue_name === venue);

        venueShowings.forEach(showing => {
            if (!showingsWithTimes.some(arr => arr.title === showing.movie_title)) {
                showingsWithTimes.push({
                    title: showing.movie_title,
                    posterUrl: getPosterUrl(showing.movie_title),
                    rating: showing.rating,
                    runtime: showing.runtime,
                    times: getTimesByTitle(showing.movie_title, venueShowings)
                })
            }
        })
        
        return {
            venue: venue,
            venue_address: address,
            showings: showingsWithTimes
        }
    })
}

function getTimesByTitle(title, arr) {
    const times = [];
    const titleShowings = getTitleShowings(title, arr)

    titleShowings.forEach(showing => {
        times.push({
            time: showing.time,
            url: showing.url
        })
    })

    times.sort((a, b) => {
        return a.time.localeCompare(b.time)
    });

    return times;
}

function getTitleShowings(title, arr) {
    return arr.filter(showing => showing.movie_title === title)
}
