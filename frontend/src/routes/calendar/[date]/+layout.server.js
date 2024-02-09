import { getTodayPath } from '$lib/helpers/dates.js'
import { fetchDates } from '$lib/db'
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    const route = params.date
    const year = route.slice(0, 4)
    const month = route.slice(4, 6)
    const day = route.slice(6, 8)
    const date = `${month}/${day}/${year}`
    const dates = await fetchDates()
    const todayPath = getTodayPath()
    const todayRoute = todayPath.split('/')[2]

    if (!dates.includes(date) || route.length !== 8 || todayRoute > route) {
        throw redirect(302, todayPath)
    }

    return { date, dates }
}
