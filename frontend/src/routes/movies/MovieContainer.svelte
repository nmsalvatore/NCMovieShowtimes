<script>
    import MovieInfo from './MovieInfo.svelte'
    import MoviePoster from './MoviePoster.svelte';
    export let movie
</script>

<div class="movie-container">
    <MovieInfo { movie } />
    <MoviePoster { movie } />
</div>

<style>
    div.movie-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 4rem;
    }

    div.movie-container:last-child {
        margin-bottom: 0;
    }

    @media only screen and (max-width: 600px) {
        div.movie-container {
            margin-bottom: 3rem;
        }
    }
</style>