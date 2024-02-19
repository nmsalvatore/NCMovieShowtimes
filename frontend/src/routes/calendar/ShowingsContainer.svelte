<script>
    import { getCurrentDatetime } from '$lib/helpers/dates.js'
    import { formatShowingsByVenue } from '$lib/helpers/showings.js'
    import { now, loadedImages } from '$lib/stores.js'
    import VenueContainer from './VenueContainer.svelte';

    export let showings = []

    let allImagesLoaded = false
    let uniqueMovieTitles = new Set()

    $: showingsByVenue = formatShowingsByVenue(showings)
    $: showings, now.update(getCurrentDatetime)
    $: showings, allImagesLoaded = false
    $: showings, loadedImages.set(0)
    $: {
        uniqueMovieTitles = new Set(showings.map(showing => showing.movie_title))
        allImagesLoaded = $loadedImages >= uniqueMovieTitles.size;
    }
</script>

<div class={allImagesLoaded ? 'visible' : 'hidden'}>
    {#if showings.length > 0}
        {#each showingsByVenue as showings}
            <VenueContainer { showings } />
        {/each}
    {:else}
        <p>No showings for this date.</p>
    {/if}
</div>

<style>
    .hidden {
        visibility: hidden;
        opacity: 0;
    }

    .visible {
        opacity: 1;
        visibility: visible;
        transition: opacity 500ms ease-in, visibility 500ms ease-in;
        transition-delay: 100ms;
    }

    @media only screen and (max-width: 1080px) {
        p {
            padding: 0 2rem;
            margin-bottom: 4rem;
            margin-top: 2rem;
        }
    }

    @media only screen and (max-width: 600px) {
        p {
            padding: 1rem;
            margin-bottom: 0;
            margin-top: 0;
        }
    }
</style>
