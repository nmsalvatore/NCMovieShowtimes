<script>
    import Dates from './Dates.svelte'
    import Showings from './Showings.svelte'
    import { activeRouteID, activeDate } from '$lib/stores.js'
    import { updateShowingsData } from '$lib/helpers/showings';

    export let data
    
    let showings = data.showings
    let dates = data.dates
    let activeDateValue = data.activeDateValue
    let clearShowingsView = false

    activeRouteID.set(1)
    activeDate.set(activeDateValue)

    async function updateCalendar(e) {
        clearShowingsView = true
        showings = await updateShowingsData(e.detail)
        clearShowingsView = false
    }
</script>

<Dates {dates} on:updateActiveDate={updateCalendar}/>

{#if !clearShowingsView}
    <Showings {showings} />
{/if}