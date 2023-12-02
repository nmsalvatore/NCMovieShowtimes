<script>
    import { activeRouteID } from '$lib/stores.js'
    import { getPosterUrl } from '$lib/helpers/posters.js'

    export let data

    $activeRouteID = 2
</script>

<div class="all-movies-container">
    {#each data.data as movie}
    <div class="movie-container">
        <div class="movie-data">
            <div class="movie-title">{movie.title}</div>

            {#if (movie.rating && movie.runtime)}
                <div class="movie-specs">{movie.rating}, {movie.runtime}</div>
            {:else if movie.rating}
                <div class="movie-specs">{movie.rating}</div>
            {:else if movie.runtime}
                <div class="movie-specs">{movie.runtime}</div>
            {/if}

            <div class="movie-venue">{movie.venue}</div>
            <div class="movie-date-range">{movie.dateRange}</div>
        </div>
        <img crossorigin="true" src={getPosterUrl(movie.title)} alt="{movie.title} Movie Poster">
    </div>
    {/each}
</div>

<style>
    img {
        width: auto;
        height: auto;
        max-width: 100px;
        height: 100%;
        border-radius: 5px;
        opacity: 0.85;
        margin-left: 2rem;
    }

    .all-movies-container {
        margin: 2rem;
        padding: 3rem 2rem;
        background: #fcfafa;
        border-radius: 10px;
    }

    .movie-container {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        margin-bottom: 4rem;
    }

    .movie-container:last-child {
        margin-bottom: 0;
    }

    .movie-data {
        text-align: right;
    }

    .movie-data:last-child {
        margin-bottom: 0;
    }

    .movie-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #555;
    }

    .movie-specs,
    .movie-date-range,
    .movie-venue {
        font-size: 13px;
        color: #777;
        margin-bottom: 4px;
    }

    @media only screen and (max-width: 600px) {
        .all-movies-container {
            margin: 1rem;
            padding: 2rem 1rem;
        }

       .movie-title {
            font-size: 14px;
        }

        .movie-date-range,
        .movie-venue,
        .movie-specs {
            font-size: 12px;
        }

        .movie-container {
            margin-bottom: 3rem;
        }

        img {
            max-width: 80px;
            margin-left: 1.5rem;
        }
    }

    @media only screen and (min-width: 1080px) {
        .all-movies-container {
            margin: 2rem 0;
        }
    }
</style>
