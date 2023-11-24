<script>
    import { convertDateToLongString } from "$lib/helpers/dates.js"
    import { formatShowingsByVenue, getCurrentDatetime } from "$lib/helpers/showings.js";
    import { activeDate } from '$lib/stores.js'

    export let showings = []

    let now

    $: showingsByVenue = formatShowingsByVenue(showings)
    $: showings, now = getCurrentDatetime()
</script>


{#if showings.length > 0}

    {#each showingsByVenue as showings}
    <div class="venue-showings">
        <h2>{showings.venue}</h2>
        <small>{showings.venue_address}</small>

        {#each showings.showings as showing}
        <div class="movie-container">
            <span class="movie-title">{showing.title}</span>

            {#if (showing.rating && showing.runtime)}
                <span class="rating">{showing.rating},</span>
                <span class="runtime">{showing.runtime}</span>
            {:else if showing.rating}
                <span class="rating">{showing.rating}</span>
            {:else if showing.runtime}
                <span class="runtime">{showing.runtime}</span>
            {/if}

            <span class="showdate">{convertDateToLongString($activeDate)}</span>
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
        {/each}

    </div>
    {/each}

{:else}

<div class="venue-showings">No showings for this date.</div>

{/if}


<style>
    h2 {
        margin-bottom: 10px;
        color: #555;
        margin-left: 4px;
    }

    small {
        font-variant: all-small-caps;
        margin-left: 6px;
        letter-spacing: 1px;
        color: #ccc;
        font-weight: 600;
        display: block;
        margin-bottom: 40px;
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
        font-weight: 600;
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
        margin-top: 14px;
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
        /* margin-top: 12px; */
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
        display: block;
        padding: 30px;
        margin: 12px 0;
        border-radius: 8px;
        color: #555;
        background: #fcfafa;
        border: 1px solid #fbf9f9;
    }

    @media only screen and (max-width: 600px) {
        .venue-showings {
            padding: 1rem;
            margin-bottom: 2rem;
        }

        .movie-container {
            padding: 24px;
        }
    }

    @media only screen and (min-width: 1080px) {
        .venue-showings {
            padding: 0;
        }
    }
</style>
