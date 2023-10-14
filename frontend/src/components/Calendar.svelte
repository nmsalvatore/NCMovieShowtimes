<script>
	import Dates from './Dates.svelte'
	import Showings from './Showings.svelte'
    import { updateShowingsData } from '../helpers/showingsHelpers.js';

    export let activeDate
    export let dates = []
    export let showings = []

	async function updateCalendar(e) {
		activeDate = e.detail
        showings = await updateShowingsData(activeDate)
	}
</script>

<Dates {dates} {activeDate} on:updateActiveDate={updateCalendar} />
<Showings {showings} {activeDate} />
