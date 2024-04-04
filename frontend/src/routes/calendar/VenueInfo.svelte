<script>
    export let showings
</script>

<div class="venue-info">
    <h2 class="venue-name">{ showings.venue }</h2>
    <small class="venue-address">{ showings.venue_address }</small>
</div>

<style>
    div.venue-info {
        margin-bottom: 1.5rem;
    }

    h2.venue-name {
        color: #333;
        margin-left: 4px;
        margin-bottom: 6px;
        font-size: 22px;
        font-weight: 700;
        line-height: 1.5;
    }

    small.venue-address {
        text-transform: uppercase;
        margin-left: 6px;
        letter-spacing: 0.02rem;
        color: #767676;
        font-weight: 500;
        font-size: 12px;
        display: block;
    }

    @media only screen and (max-width: 600px) {
        div.venue-info {
            margin-bottom: 1.25rem;
        }

        h2.venue-name {
            font-size: 18px;
            margin-bottom: 4px;
        }

        small.venue-address {
            font-size: 11px;
        }
    }
</style>