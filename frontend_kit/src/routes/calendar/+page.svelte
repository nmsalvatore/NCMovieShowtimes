<script>
	import Dates from './Dates.svelte'
	import Showings from './Showings.svelte'
    import { activeRouteID } from '$lib/stores.js'
    import { updateShowingsData } from '$lib/helpers/showings';

    export let data

    $activeRouteID = 1

    let showings = data.showings
    let dates = data.dates

    async function updateCalendar(e) {
        showings = await updateShowingsData(e.detail)
    }
</script>

<Dates {dates} on:updateActiveDate={updateCalendar}/>
<Showings {showings} />
