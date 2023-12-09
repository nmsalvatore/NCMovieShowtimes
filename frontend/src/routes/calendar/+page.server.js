import { updateShowingsData } from '$lib/helpers/showings.js';
import { updateDatesData, getTodayDateString } from '$lib/helpers/dates.js';

export async function load() {
    const today = getTodayDateString()

    return {
        showings: await updateShowingsData(today),
        dates: await updateDatesData(),
        activeDateValue: today
    }
}
