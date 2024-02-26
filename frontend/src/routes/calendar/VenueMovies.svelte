<script>
    import MovieContainer from './MovieContainer.svelte'
    export let showings
</script>

<div class="venue-movies">
    {#each showings.showings as showing}
        <MovieContainer { showing } />
    {/each}
</div>

<style>
    div.venue-movies {
        padding-bottom: 3rem;
    }

    @media only screen and (max-width: 600px) {
        div.venue-movies {
            padding-bottom: 2rem;
        }
    }
</style>