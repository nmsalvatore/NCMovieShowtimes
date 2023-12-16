<script>
    import Dates from './Dates.svelte'
    import Showings from './Showings.svelte'
    import { activeRouteID, activeDate } from '$lib/stores.js'
    import { updateShowingsData } from '$lib/helpers/showings';
    import { onMount } from 'svelte';

    export let data
    
    let showings = data.showings
    let dates = data.dates
    let activeDateValue = data.activeDateValue
    let shouldRenderShowings = false

    activeRouteID.set(1)
    activeDate.set(activeDateValue)

    onMount(() => {
        setRenderDelay(300)
    })

    async function updateCalendar(e) {
        shouldRenderShowings = false
        showings = await updateShowingsData(e.detail)
        setRenderDelay(300)
    }

    function setRenderDelay(ms) {
        setTimeout(() => {
            shouldRenderShowings = true
        }, ms)
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
        transition: opacity 1500ms, visible ease-in;
    }

    .hidden {
        opacity: 0;
        visibility: hidden;
    }
</style>
