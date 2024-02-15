<script>
    import { activeRouteID } from '$lib/stores.js'
    import { onMount } from 'svelte';

    export let data

    let loadedImages = 0
    let allImagesLoaded = false

    $: if (data) loadedImages = 0
    $: allImagesLoaded = loadedImages >= data.allMovies.length

    onMount(() => {
        activeRouteID.set(2)
    })

    function onPosterLoad() {
        loadedImages++
    }

    function uniqueUrl(url) {
        const timestamp = new Date().getTime()
        return url + `?timestamp=${timestamp}`
    }
</script>

<div class="all-movies-container">
    <div class={allImagesLoaded ? 'all-movies-inner-container' : 'hidden'}>
    
    {#each data.allMovies as movie}
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
            <img 
                crossorigin="true" 
                src={ uniqueUrl(movie.posterUrl) } 
                on:load={() => onPosterLoad()}
                alt="{movie.title} 
                    Movie Poster">
        </div>
    {/each}

    </div>
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

    .hidden {
        opacity: 0;
        visibility: hidden;
    }

    .all-movies-inner-container {
        opacity: 1;
        visibility: visible;
        transition: opacity 500ms ease-in, visibility 500ms ease-in;
        transition-delay: 100ms;
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
        font-weight: 500;
        margin-bottom: 18px;
        color: #555;
    }

    .movie-specs,
    .movie-date-range,
    .movie-venue {
        font-size: 12px;
        color: #777;
        margin-bottom: 4px;
    }

    @media only screen and (max-width: 600px) {
        .all-movies-container {
            margin: 1rem;
            padding: 2rem 1rem;
        }

       .movie-title {
            font-size: 15px;
            margin-bottom: 12px;
        }

        .movie-date-range,
        .movie-venue,
        .movie-specs {
            font-size: 12px;
        }

        .movie-container {
            margin-bottom: 4rem;
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
