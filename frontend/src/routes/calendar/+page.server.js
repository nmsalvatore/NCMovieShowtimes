import { fetchAllShowings, fetchDates } from '$lib/db'
import { getTodayDateString, removeOldDates } from '$lib/helpers/dates.js'

export async function load({ url }) {
    const date = getTodayDateString()
    const allDates = await fetchDates()
    const dates = removeOldDates(allDates)
    const showings = await fetchAllShowings()
    const pageTitle = 'Calendar'
    const description = 'Check out movie showtimes for all theaters in Nevada City and Grass Valley, California!'
    const href = url.href
    const ogTitle = 'Nevada County Movie Showtimes | Calendar'

    return { 
        showings, 
        date, 
        dates, 
        description, 
        pageTitle, 
        href, 
        ogTitle
    }
}
