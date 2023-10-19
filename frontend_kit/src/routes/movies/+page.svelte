<script>
    import { activeRouteID } from '$lib/stores.js'

    export let data

    $activeRouteID = 2
</script>

<div class="all-movies-container">
    {#each data.data as movie}
    <div class="movie">
        <div class="movie-title">{movie.title}</div>
        <div class="movie-date-range">{movie.dateRange}</div>
        <div class="movie-venue">{movie.venue}</div>
    </div>
    {/each}
</div>

<style>
    .all-movies-container {
        margin: 2rem;
        padding: 4rem;
        background: #fcfafa;
        border-radius: 10px;
    }

    .movie {
        margin-bottom: 4rem;
        text-align: right;
    }

    .movie:last-child {
        margin-bottom: 0;
    }

    .movie-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 18px;
        color: #555;
    }

    .movie-date-range {
        margin-bottom: 8px;
    }

    .movie-date-range,
    .movie-venue {
        font-weight: 300;
        font-size: 14px;
        color: #666;
    }

    @media only screen and (max-width: 480px) {
        .all-movies-container {
            margin: 1rem;
            padding: 3rem 2rem;
        }
    }

    @media only screen and (min-width: 1080px) {
        .all-movies-container {
            margin: 2rem 0;
        }
    }
</style>
