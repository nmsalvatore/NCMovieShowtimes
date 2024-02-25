<script>
    import MovieContainer from './MovieContainer.svelte'
    export let showings
</script>

<div>
    {#each showings.showings as showing}
        <MovieContainer { showing } />
    {/each}
</div>

<style>
    div {
        padding-bottom: 3rem;
    }

    @media only screen and (max-width: 600px) {
        div {
            padding-bottom: 2rem;
        }
    }
</style>