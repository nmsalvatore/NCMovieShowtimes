<script>
    import { convertToLongDateString, getCurrentDatetime } from '$lib/helpers/dates.js'
    import { formatShowingsByVenue } from '$lib/helpers/showings.js'
    import { activeDate, now } from '$lib/stores.js'
    import Showtime from './Showtime.svelte';

    export let showings = []

    let loadedImages = 0
    let allImagesLoaded = false
    let uniqueMovieTitles = new Set()

    $: showingsByVenue = formatShowingsByVenue(showings)
    $: showings, now.update(getCurrentDatetime)
    $: showings, allImagesLoaded = false
    $: showings, loadedImages = 0
    $: {
        uniqueMovieTitles = new Set(showings.map(showing => showing.movie_title))
        allImagesLoaded = loadedImages >= uniqueMovieTitles.size;
    }

    function onPosterLoad() {
        loadedImages++
    }

    function uniqueUrl(url) {
        const timestamp = new Date().getTime()
        return url + `?timestamp=${timestamp}`
    }
</script>

<div class={allImagesLoaded ? 'showings-container' : 'hidden'}>

    {#if showings.length > 0}

        {#each showingsByVenue as showings}
            <div class="venue-showings">

                <h2>{showings.venue}</h2>
                <small>{showings.venue_address}</small>

                {#each showings.showings as showing}
                    <div class="movie-container">
                        <img 
                            crossorigin="true" 
                            src={ uniqueUrl(showing.posterUrl) } 
                            on:load={ onPosterLoad }
                            alt="{ showing.title } 
                                Movie Poster">
                        <div>
                            <span class="movie-title">{showing.title}</span>

                            {#if (showing.rating && showing.runtime)}
                                <span class="rating">{showing.rating},</span>
                                <span class="runtime">{showing.runtime}</span>
                            {:else if showing.rating}
                                <span class="rating">{showing.rating}</span>
                            {:else if showing.runtime}
                                <span class="runtime">{showing.runtime}</span>
                            {/if}
                
                            <span class="showdate">{convertToLongDateString($activeDate)}</span>
                            <div class="showtimes">
                
                                {#each showing.times as showtime}
                                    <Showtime { showtime } />
                                {/each}

                            </div>
                        </div>
                    </div>
                {/each}

            </div>
        {/each}

    {:else}
        <div class="venue-showings">No showings for this date.</div>
    {/if}

</div>

<style>
    .hidden {
        visibility: hidden;
        opacity: 0;
    }

    .showings-container {
        opacity: 1;
        visibility: visible;
        transition: opacity 500ms ease-in, visibility 500ms ease-in;
        transition-delay: 100ms;
    }

    h2 {
        margin-bottom: 4px;
        color: #555;
        margin-left: 4px;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.5;
    }

    small {
        font-variant: all-small-caps;
        margin-left: 6px;
        letter-spacing: 1px;
        color: #b4b4b4;
        font-weight: 500;
        display: block;
        margin-bottom: 40px;
    }

    img {
        width: auto;
        height: auto;
        max-width: 110px;
        height: 100%;
        border-radius: 4px;
        opacity: 0.85;
        margin-right: 2rem;
    }

    .venue-showings {
        padding: 0 2rem;
        margin-bottom: 5rem;
        margin-top: 2rem;
    }

    .showdate,
    .movie-title {
        display: inline-block;
        color: #555;
    }

    .movie-title {
        display: block;
        margin-right: 12px;
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .showdate {
        display: block;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.4px;
        color: #b4b4b4;
        margin-top: 24px;
        margin-left: 1px;
        font-variant: all-small-caps;
    }

    .rating,
    .runtime {
        display: inline-block;
        font-size: 13px;
        margin-left: 1px;
        color: #777;
    }

    .showtimes {
        margin-bottom: 6px;
    }

    .movie-container {
        text-decoration: none;
        display: flex;
        padding: 22px;
        margin: 1rem 0;
        border-radius: 6px;
        color: #555;
        border: 1px solid #eee;
        box-shadow: 0 1px 8px -7px;
    }

    @media only screen and (max-width: 600px) {
        .venue-showings {
            padding: 1rem;
            margin-bottom: 0;
            margin-top: 0;
        }

        .movie-container {
            padding: 12px;
        }

        .movie-title {
            font-size: 15px;
            margin-bottom: 2px;
        }

        .runtime,
        .rating {
            font-size: 12px;
        }

        .showdate {
            font-size: 14px;
            margin-top: 20px;
            margin-bottom: 4px;
        }

        small {
            margin-bottom: 26px;
        }

        img {
            margin-right: 1rem;
            max-width: 92px;
        }

        h2 {
            font-size: 18px;
            margin-bottom: 2px;
            margin-top: 16px;
        }
    }

    @media only screen and (min-width: 1080px) {
        .venue-showings {
            padding: 0;
        }
    }
</style>
