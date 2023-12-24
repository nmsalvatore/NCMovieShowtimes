<script>
    import Dates from './Dates.svelte'
    import Showings from './Showings.svelte'
    import { activeRouteID, activeDate } from '$lib/stores.js'
    import { updateShowingsData } from '$lib/helpers/showings';

    export let data
    
    let showings = data.showings
    let dates = data.dates
    let activeDateValue = data.activeDateValue
    let renderShowings = true

    activeRouteID.set(1)
    activeDate.set(activeDateValue)

    async function updateCalendar(e) {
        renderShowings = false
        showings = await updateShowingsData(e.detail)
        renderShowings = true
    }
</script>

<Dates {dates} on:updateActiveDate={updateCalendar}/>

{#if renderShowings}
    <Showings {showings} />
{/if}
