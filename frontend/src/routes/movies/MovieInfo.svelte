<script>
    export let movie
</script>

<div class="movie-info">
    <h2 class="movie-title">{ movie.title }</h2>

    {#if (movie.rating && movie.runtime)}
        <span class="movie-rating">{ movie.rating }, { movie.runtime }</span>
    {:else if movie.rating }
        <span class="movie-rating">{ movie.rating }</span>
    {:else if movie.runtime }
        <span class="movie-runtime">{ movie.runtime }</span>
    {/if}

    <span class="movie-venue">{ movie.venue }</span>
    <span class="movie-dates">{ movie.dateRange }</span>
</div>

<style>
    div.movie-info {
        text-align: right;
    }

    h2.movie-title {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
        color: #333;
    }

    span {
        display: block;
        font-size: 13px;
        color: #666;
        margin-bottom: 4px;
    }

    @media only screen and (max-width: 600px) {
        h2.movie-title {
            font-size: 15px;
            margin-bottom: 12px;
        }

        span {
            font-size: 12px;
        }
    }
</style>