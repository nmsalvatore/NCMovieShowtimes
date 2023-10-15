<script>
	import Dates from './Dates.svelte'
	import Showings from './Showings.svelte'
    import { getTodayDateString } from '$lib/helpers/datesHelpers.js';
    import { activeRouteID } from '$lib/stores.js'

    export let data

    $activeRouteID = 1

    let showings = data.showings
    let dates = data.dates
    let activeDate = getTodayDateString()

	async function updateCalendar(e) {
		activeDate = e.detail
        showings = await updateShowingsData(activeDate)
	}
</script>

<Dates {dates} {activeDate} on:updateActiveDate={updateCalendar} />
<Showings {showings} {activeDate} />
