import { fetchAllShowings, fetchDates } from '$lib/db'
import { getTodayDateString } from '$lib/helpers/dates.js'

export async function load() {
    const date = getTodayDateString()
    const dates = await fetchDates()
    const showings = await fetchAllShowings()

    return { showings, date, dates }
}
