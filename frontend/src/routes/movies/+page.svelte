<script>
    import { activeRouteID, loadedImages } from '$lib/stores.js'
    import { onMount } from 'svelte'
    import MovieContainer from './MovieContainer.svelte'

    export let data

    let allImagesLoaded = false

    $: if (data) loadedImages.set(0)
    $: allImagesLoaded = $loadedImages >= data.allMovies.length

    onMount(() => {
        activeRouteID.set(2)
        loadedImages.set(0)
    })
</script>

<div class={allImagesLoaded ? 'visible' : 'hidden'}>
    {#each data.allMovies as movie}
        <MovieContainer { movie } />
    {/each}
</div>

<style>
    .hidden {
        opacity: 0;
        visibility: hidden;
    }

    .visible {
        opacity: 1;
        visibility: visible;
        transition: opacity 500ms ease-in, visibility 500ms ease-in;
        transition-delay: 100ms;
        padding: 4rem 2rem;
    }

    @media only screen and (max-width: 600px) {
        .visible {
            padding: 3rem 1.75rem;
        }
    }
</style>
