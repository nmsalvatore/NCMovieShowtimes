import { updateShowingsData } from '$lib/helpers/showingsHelpers.js';
import { updateDatesData, getTodayDateString } from '$lib/helpers/datesHelpers.js';

export async function load() {
    const today = getTodayDateString(

    )
    return {
        showings: updateShowingsData(today),
        dates: updateDatesData()
    }
}