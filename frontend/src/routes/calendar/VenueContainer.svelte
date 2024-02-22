<script>
    import MovieContainer from './MovieContainer.svelte'

    export let showings
</script>

<div>
    <h2>{ showings.venue }</h2>
    <small>{ showings.venue_address }</small>

    {#each showings.showings as showing}
        <MovieContainer { showing } />
    {/each}
</div>

<style>
    h2 {
        margin-bottom: 4px;
        color: #333;
        margin-left: 4px;
        font-size: 22px;
        font-weight: 600;
        line-height: 1.5;
    }

    small {
        font-variant: all-small-caps;
        margin-left: 6px;
        letter-spacing: 1px;
        color: #aaa;
        font-weight: 500;
        font-size: 16px;
        display: block;
        margin-bottom: 36px;
    }

    div {
        margin-bottom: 4rem;
    }

    @media only screen and (max-width: 1080px) {
        div {
            padding: 0 2rem;
            margin-bottom: 4rem;
            margin-top: 2rem;
        }
    }

    @media only screen and (max-width: 600px) {
        div {
            padding: 1rem;
            margin-bottom: 1rem;
            margin-top: 0;
        }

        h2 {
            font-size: 18px;
            margin-bottom: 2px;
        }

        small {
            margin-bottom: 26px;
            font-size: 14px;
        }
    }
</style>