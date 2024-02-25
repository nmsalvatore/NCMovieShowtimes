<script>
    export let showings
</script>

<div>
    <h2>{ showings.venue }</h2>
    <small>{ showings.venue_address }</small>
</div>

<style>
    div {
        margin-bottom: 2rem;
    }

    h2 {
        color: #333;
        margin-left: 4px;
        margin-bottom: 4px;
        font-size: 22px;
        font-weight: 700;
        line-height: 1.5;
    }

    small {
        font-variant: all-small-caps;
        margin-left: 6px;
        letter-spacing: 0.02rem;
        color: #aaa;
        font-weight: 500;
        font-size: 16px;
        display: block;
    }

    @media only screen and (max-width: 600px) {
        div {
            margin-bottom: 1.5rem;
        }

        h2 {
            font-size: 18px;
        }

        small {
            font-size: 14px;
        }
    }
</style>