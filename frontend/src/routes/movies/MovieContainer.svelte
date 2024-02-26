<script>
    import MovieInfo from './MovieInfo.svelte'
    import MoviePoster from './MoviePoster.svelte';
    export let movie
</script>

<div>
    <MovieInfo { movie } />
    <MoviePoster { movie } />
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 4rem;
    }

    div:last-child {
        margin-bottom: 0;
    }

    @media only screen and (max-width: 600px) {
        div {
            margin-bottom: 3rem;
        }
    }
</style>