<script>
    import ShowingsContainer from './ShowingsContainer.svelte'
    import DateScrollbar from './DateScrollbar.svelte'
    import { onMount } from 'svelte'
    import { 
        renderShowings, 
        activeRouteID, 
        activeDate } from '$lib/stores'

    export let data
    
    const { showings, dates, date } = data
    
    let activeShowings

    $: if ($activeDate) {
        activeShowings = showings.filter(showing => showing.date === $activeDate)
        renderShowings.set(true)
    }

    onMount(() => {
        activeRouteID.set(1)
        activeDate.set(date)
    })
</script>

<DateScrollbar {dates} />
{#if $renderShowings}
    <ShowingsContainer showings={activeShowings} />
{:else}
    <div class="loading"></div>
{/if}

<style>
    .loading {
        height: 3000px;
    }
</style>