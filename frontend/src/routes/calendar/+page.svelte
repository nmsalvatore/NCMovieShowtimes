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

    $: if ($activeDate && showings) {
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
    <div class="loading-container">
        <p>Loading...</p>
    </div>
{/if}

<style>
    div.loading-container {
        height: 3000px;
        color: #6f6f6f;
        padding: 2rem;
    }

    div.loading-container > p {
        margin-left: 4px;
    }

    @media only screen and (max-width: 600px) {
        div.loading-container {
            padding: 1rem;
        }
    }
</style>