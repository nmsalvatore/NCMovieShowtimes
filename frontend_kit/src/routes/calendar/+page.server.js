import { updateShowingsData } from '$lib/helpers/showings.js';
import { updateDatesData } from '$lib/helpers/dates.js';
import { activeDate } from '$lib/stores.js'

let date
activeDate.subscribe(val => date = val)

export async function load() {
    return {
        showings: updateShowingsData(date),
        dates: updateDatesData()
    }
}
