<script>
    import { activeDate, now } from '$lib/stores'

    export let showtime
</script>

{#if new Date(`${ $activeDate } ${ showtime.time }`) > $now}
    <a class="movie-showtime" href={showtime.url} target="_blank">{showtime.time}</a>
{:else}
    <a class="movie-showtime old" href={showtime.url} target="_blank">{showtime.time}</a>
{/if}

<style>
    a.movie-showtime {
        cursor: pointer;
        display: inline-block;
        background: #eee;
        /* border: 1px solid #e4e4e4; */
        color: #333;
        font-size: 12px;
        font-weight: 600;
        padding: 10px;
        border-radius: 4px;
        margin-right: 8px;
        margin-top: 14px;
        width: 90px;
        text-align: center;
        text-decoration: none;
    }

    a.movie-showtime.old {
        background: none;
        border: 1px solid #e2e2e2;
        color: rgba(0, 0, 0, 0.23);
        pointer-events: none;
    }

    a.movie-showtime:last-child {
        margin-right: 0;
    }

    @media only screen and (max-width: 600px) {
        a.movie-showtime {
            margin-right: 6px;
            margin-top: 6px;
            width: 76px;
            padding: 9px 0;
            font-size: 11px;
        }
    }
</style>