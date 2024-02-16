<script>
    import { activeDate, now } from '$lib/stores'

    export let showtime
</script>

{#if new Date(`${ $activeDate } ${ showtime.time }`) > $now}
    <a href={showtime.url} target="_blank" class="showtime">{showtime.time}</a>
{:else}
    <a href={showtime.url} target="_blank" class="showtime old">{showtime.time}</a>
{/if}

<style>
    .showtime {
        cursor: pointer;
        display: inline-block;
        background: #eaeaea;
        color: #555;
        font-size: 12px;
        font-weight: 600;
        padding: 0.7rem 1rem;
        border-radius: 5px;
        margin-right: 8px;
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
        margin-right: 0;
    }

    @media only screen and (max-width: 600px) {
        .showtime {
            margin-right: 6px;
            margin-top: 6px;
            width: 68px;
            padding: 10px 0;
            font-size: 10px;
        }
    }
</style>