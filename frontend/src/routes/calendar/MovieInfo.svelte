<script>
    import { convertToLongDateString } from '$lib/helpers/dates'
    import { activeDate } from '$lib/stores'
    import Showtime from './Showtime.svelte'

    export let showing
</script>

<div class="movie-info">
    <h3 class="movie-title">{ showing.title }</h3>

    {#if (showing.rating && showing.runtime)}
        <span class="movie-rating">{ showing.rating },</span>
        <span class="movie-runtime">{ showing.runtime }</span>
    {:else if showing.rating}
        <span class="movie-rating">{ showing.rating }</span>
    {:else if showing.runtime}
        <span class="movie-runtime">{ showing.runtime }</span>
    {/if}

    <span class="movie-showdate">{ convertToLongDateString($activeDate) }</span>
    <div class="movie-showtimes">

        {#each showing.times as showtime}
            <Showtime { showtime } />
        {/each}

    </div>
</div>

<style>
    h3.movie-title {
        color: #333;
        margin-right: 12px;
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 10px;
    }

    span.movie-showdate {
        display: block;
        font-weight: 500;
        font-size: 16px;
        letter-spacing: 0.02rem;
        color: #aaa;
        margin-top: 24px;
        margin-left: 1px;
        font-variant: all-small-caps;
    }

    span.movie-rating,
    span.movie-runtime {
        display: inline-block;
        font-size: 13px;
        margin-left: 1px;
        color: #666;
    }

    div.movie-showtimes {
        margin-bottom: 6px;
    }

    @media only screen and (max-width: 600px) {
        h3.movie-title {
            font-size: 15px;
            margin-bottom: 2px;
            margin-top: 2px;
        }

        span.movie-runtime,
        span.movie-rating {
            font-size: 12px;
        }

        span.movie-showdate {
            font-size: 14px;
            margin-top: 20px;
            margin-bottom: 4px;
        }
    }
</style>