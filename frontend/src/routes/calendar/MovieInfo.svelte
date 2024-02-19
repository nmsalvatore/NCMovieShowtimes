<script>
    import { convertToLongDateString } from '$lib/helpers/dates'
    import { activeDate } from '$lib/stores'
    import Showtime from './Showtime.svelte'

    export let showing
</script>

<div>
    <span class="movie-title">{ showing.title }</span>

    {#if (showing.rating && showing.runtime)}
        <span class="rating">{ showing.rating },</span>
        <span class="runtime">{ showing.runtime }</span>
    {:else if showing.rating}
        <span class="rating">{ showing.rating }</span>
    {:else if showing.runtime}
        <span class="runtime">{ showing.runtime }</span>
    {/if}

    <span class="showdate">{ convertToLongDateString($activeDate) }</span>
    <div class="showtimes">

        {#each showing.times as showtime}
            <Showtime { showtime } />
        {/each}

    </div>
</div>

<style>
    .movie-title {
        display: block;
        color: #333;
        margin-right: 12px;
        font-weight: 500;
        font-size: 16px;
        margin-bottom: 10px;
    }

    .showdate {
        display: block;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.02rem;
        color: #aaa;
        margin-top: 24px;
        margin-left: 1px;
        font-variant: all-small-caps;
    }

    .showtimes {
        margin-bottom: 6px;
    }

    .rating,
    .runtime {
        display: inline-block;
        font-size: 13px;
        margin-left: 1px;
        color: #666;
    }

    @media only screen and (max-width: 600px) {
        .movie-title {
            font-size: 15px;
            margin-bottom: 2px;
            margin-top: 2px;
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
    }
</style>