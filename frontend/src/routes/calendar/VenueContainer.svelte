<script>
    import VenueInfo from './VenueInfo.svelte'
    import VenueMovies from './VenueMovies.svelte'

    export let showings
</script>

<div>
    <VenueInfo { showings } />
    <VenueMovies { showings } />
</div>

<style>
    div {
        padding: 0 2rem;
    }

    @media only screen and (max-width: 600px) {
        div {
            padding: 0 1rem;
        }
    }
</style>