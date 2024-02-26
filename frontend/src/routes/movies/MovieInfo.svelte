<script>
    export let movie
</script>

<div>
    <h2 class="movie-title">{ movie.title }</h2>

    {#if (movie.rating && movie.runtime)}
        <span>{ movie.rating }, { movie.runtime }</span>
    {:else if movie.rating }
        <span>{ movie.rating }</span>
    {:else if movie.runtime }
        <span>{ movie.runtime }</span>
    {/if}

    <span>{ movie.venue }</span>
    <span>{ movie.dateRange }</span>
</div>

<style>
    div {
        text-align: right;
    }

    span {
        display: block;
        font-size: 13px;
        color: #666;
        margin-bottom: 4px;
    }

    h2 {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
    }

    @media only screen and (max-width: 600px) {
        h2 {
            font-size: 15px;
            margin-bottom: 12px;
        }

        span {
            font-size: 12px;
        }
    }
</style>