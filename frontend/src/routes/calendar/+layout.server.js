import { updateShowingsData } from '$lib/helpers/showings.js';
import { updateDatesData, getTodayDateString } from '$lib/helpers/dates.js';

export async function load() {
    const today = getTodayDateString()
    const showings = await updateShowingsData(today)
    const dates = await updateDatesData()

    return {
        showings,
        dates,
        today
    }
}
