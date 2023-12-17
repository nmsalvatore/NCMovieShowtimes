<script>
    import Dates from './Dates.svelte'
    import Showings from './Showings.svelte'
    import { activeRouteID, activeDate } from '$lib/stores.js'
    import { updateShowingsData } from '$lib/helpers/showings';

    export let data
    
    let showings = data.showings
    let dates = data.dates
    let activeDateValue = data.activeDateValue

    activeRouteID.set(1)
    activeDate.set(activeDateValue)

    async function updateCalendar(e) {
        showings = await updateShowingsData(e.detail)
    }
</script>

<Dates {dates} on:updateActiveDate={updateCalendar}/>
<Showings {showings} />
