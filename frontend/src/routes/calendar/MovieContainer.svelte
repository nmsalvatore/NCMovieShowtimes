<script>
    import MoviePoster from './MoviePoster.svelte'
    import MovieInfo from './MovieInfo.svelte'

    export let showing
</script>

<div class="movie-container">
    <MoviePoster { showing } />
    <MovieInfo { showing } />
</div>

<style>
    div.movie-container {
        text-decoration: none;
        display: flex;
        padding: 22px;
        margin-bottom: 1rem;
        border-radius: 6px;
        color: #555;
        background: #fafafa;
        border: 1px solid #eee;
    }

    @media only screen and (max-width: 600px) {
        div.movie-container {
            padding: 12px;
        }
    }
</style>