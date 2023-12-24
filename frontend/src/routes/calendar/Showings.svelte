<script>
    import { convertToLongDateString } from "$lib/helpers/dates.js"
    import { formatShowingsByVenue, getCurrentDatetime } from "$lib/helpers/showings.js";
    import { activeDate } from '$lib/stores.js'
    import { getPosterUrl } from '$lib/helpers/posters.js'
    import { fade } from 'svelte/transition'

    export let showings = []

    let now
    let loadedImages = 0
    let allImagesLoaded = false
    let uniqueMovieTitles = new Set()

    $: showingsByVenue = formatShowingsByVenue(showings)
    $: showings, now = getCurrentDatetime()
    $: showingsDateValid = checkShowingsDate(showings)
    $: showings, allImagesLoaded = false
    $: showings, loadedImages = 0
    $: {
        uniqueMovieTitles = new Set(showings.map(showing => showing.movie_title))
        allImagesLoaded = loadedImages >= uniqueMovieTitles.size;
    }

    function onPosterLoad() {
        loadedImages++
    }

    function checkShowingsDate(showings) {
        const dates = new Set(showings.map(showing => showing.date))
        return dates.size === 1 && dates.has($activeDate)
    }
</script>

<div class={allImagesLoaded ? 'showings-container' : 'hidden'}>

    {#if showings.length > 0 && showingsDateValid }

        {#each showingsByVenue as showings}
            <div class="venue-showings">
                <h2>{showings.venue}</h2>
                <small>{showings.venue_address}</small>

                {#each showings.showings as showing}
                    <div class="movie-container">
                        <img 
                            crossorigin="true" 
                            src={getPosterUrl(showing.title)} 
                            on:load={onPosterLoad}
                            alt="{showing.title} 
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

                                    {#if new Date(`${$activeDate} ${showtime.time}`) > now}
                                    <a href={showtime.url} target="_blank" class="showtime">{showtime.time}</a>
                                    {:else}
                                    <a href={showtime.url} target="_blank" class="showtime old">{showtime.time}</a>
                                    {/if}

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
    }

    small {
        font-variant: all-small-caps;
        margin-left: 6px;
        letter-spacing: 1px;
        color: #ccc;
        font-weight: 500;
        display: block;
        margin-bottom: 40px;
    }

    img {
        width: auto;
        height: auto;
        max-width: 110px;
        height: 100%;
        border-radius: 5px;
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

    .showtime {
        cursor: pointer;
        display: inline-block;
        background: rgba(0, 0, 0, 0.06);
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        font-weight: 500;
        padding: 0.7rem 1rem;
        border-radius: 5px;
        margin-right: 12px;
        margin-top: 14px;
        width: 90px;
        text-align: center;
        text-decoration: none;
    }

    .showtime.old {
        color: rgba(0, 0, 0, 0.15);
        pointer-events: none;
    }

    .showtime:last-child {
        margin-right: none;
    }

    .movie-container {
        text-decoration: none;
        display: flex;
        padding: 22px;
        margin: 12px 0;
        border-radius: 8px;
        color: #555;
        background: #fcfafa;
        border: 1px solid #fbf9f9;
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

        .showtime {
            margin-right: 6px;
            margin-top: 6px;
            width: 68px;
            padding: 10px 0;
            font-size: 10px;
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
