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

    let shouldRenderShowings = true

    async function updateCalendar(e) {
        shouldRenderShowings = false
        showings = await updateShowingsData(e.detail)

        setTimeout(() => {
            shouldRenderShowings = true
        }, 100)
    }
</script>

<Dates {dates} on:updateActiveDate={updateCalendar}/>

<div class={shouldRenderShowings ? 'showings-container' : 'hidden'}>
    <Showings {showings} />
</div>

<style>
    .showings-container {
        opacity: 1;
        visibility: visible;
        transition: opacity 200ms, visible ease-in;
    }

    .hidden {
        opacity: 0;
        visibility: hidden;
    }
</style>
