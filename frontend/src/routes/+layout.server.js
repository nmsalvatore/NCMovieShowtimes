import { getTodayPath } from '$lib/helpers/dates.js'

export function load() {
    const activeCalendarPath = getTodayPath()
    return { activeCalendarPath }
}