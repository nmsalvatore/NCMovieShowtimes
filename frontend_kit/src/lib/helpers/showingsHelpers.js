export async function updateShowingsData(date) {
    const response = await fetch(`http://localhost:3000/api/showings?date=${date}`)
    const data = response.json()
    return data
}

export function formatShowingsByVenue(showings) {
    let venues = new Set(showings.map(showing => showing.venue_name));

    return [...venues].map(venue => {
        const showingsWithTimes = []
        const venueShowings = showings.filter(showing => showing.venue_name === venue);
        const venueShowingsAllTitles = venueShowings.map(showing => showing.movie_title)
        const venueShowingsTitles = new Set(venueShowingsAllTitles)

        venueShowingsTitles.forEach(title => {
            showingsWithTimes.push({
                title: title,
                times: getTimesByTitle(title, venueShowings)
            })
        })
        
        return {
            venue: venue, 
            showings: showingsWithTimes
        }
    })
}

function getTimesByTitle(title, arr) {
    const times = []
    const titleShowings = getTitleShowings(title, arr)

    titleShowings.forEach(showing => {
        times.push({
            time: showing.time,
            url: showing.url
        })
    })

    return times
}

function getTitleShowings(title, arr) {
    return arr.filter(showing => showing.movie_title === title)
}

export function getCurrentDatetime() {
    const options = { timeZone: 'America/Los_Angeles'}
    const date = new Date().toLocaleDateString('en-US', options)
    const time = new Date().toLocaleTimeString('en-US', options)
    return new Date(`${date} ${time}`)
}
