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

        {#each showings.showings as showing}
        <a class="buy-tickets" href={showing.url} target="_blank">
            <span class="movie-title">{showing.title}</span>
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
        </a>
        {/each}

    </div>
    {/each}

{:else}

<div class="venue-showings">No showings for this date.</div>

{/if}


<style>
    h2 {
        margin-bottom: 26px;
        color: #555;
        margin-left: 4px;
    }

    .venue-showings {
        padding: 0 2rem;
        margin-bottom: 3rem;
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
        margin-bottom: 20px;
    }

    .showdate {
        display: block;
        font-weight: 300;
        font-size: 14px;
        color: #777;
    }

    .showtimes {
        margin-top: 2rem;
        margin-bottom: 12px;
    }

    .showtime {
        cursor: pointer;
        border: 1px solid rgba(0, 0, 0, 0.15);
        color: rgba(0, 0, 0, 0.6);
        font-size: 12px;
        padding: 0.7rem 1rem;
        border-radius: 5px;
        margin-right: 12px;
        text-decoration: none;
    }

    .showtime.old {
        color: rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(0, 0, 0, 0.07);
        pointer-events: none;
    }

    .showtime:last-child {
        margin-right: none;
    }

    .buy-tickets {
        text-decoration: none;
        display: block;
        padding: 24px;
        margin: 12px 0;
        border-radius: 8px;
        color: #555;
        background: #fcfafa;
    }

    @media only screen and (max-width: 480px) {
        .venue-showings {
            padding: 1rem;
        }
    }

    @media only screen and (min-width: 1080px) {
        .venue-showings {
            padding: 0;
        }
    }
</style>
