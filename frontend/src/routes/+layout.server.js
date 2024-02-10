import { getTodayPath } from '$lib/helpers/dates.js'
import { redirect } from '@sveltejs/kit'

export function load({ url }) {
    const validPaths = ['/calendar', '/movies']
    if (!validPaths.includes(url.pathname)) {
        throw redirect(302, '/calendar')
    }
    
    const activeCalendarPath = getTodayPath()
    return { activeCalendarPath }
}