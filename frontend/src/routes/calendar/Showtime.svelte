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
        border: 1px solid #e2e2e2;
        color: #666;
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

    .showtime.old {
        background: none;
        border: 1px solid #e2e2e2;
        color: rgba(0, 0, 0, 0.23);
        pointer-events: none;
    }

    .showtime:last-child {
        margin-right: 0;
    }

    @media only screen and (max-width: 600px) {
        .showtime {
            margin-right: 6px;
            margin-top: 6px;
            width: 76px;
            padding: 9px 0;
            font-size: 11px;
        }
    }
</style>