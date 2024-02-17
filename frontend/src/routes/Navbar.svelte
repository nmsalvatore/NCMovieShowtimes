<script>
    import { activeRouteID } from '$lib/stores.js'
</script>

<nav>
    <a 
        href='/calendar'
        class:active={ $activeRouteID === 1 }
        on:click={ () => activeRouteID.set(1) }
    >
        Calendar
    </a>
    <a 
        href='/movies'
        class:active={ $activeRouteID === 2 }
        on:click={ () => activeRouteID.set(2) }
    >
        All Movies
    </a>
</nav>

<style>
    nav {
        display: flex;
        flex-direction: row;
        width: fit-content;
    }

    a {
        display: inline-block;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        background: #fff;
        border-radius: 4px;
        width: 240px;
        padding: 11px;
        width: 120px;
        letter-spacing: 0.01rem;
        font-size: 16px;
        font-weight: 500;
        color: #555;
    }

    a:last-child {
        margin-left: 1rem;
    }

    a.active {
        font-weight: 600;
        color: #fff;
        background: #555;
    }

    @media only screen and (max-width: 600px) {
        a {
            font-size: 14px;
            width: 100px;
        }

        a:last-child {
            margin-left: 12px;
        }
    }
</style>
