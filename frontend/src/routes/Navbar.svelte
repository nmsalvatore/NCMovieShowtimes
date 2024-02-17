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
        width: 120px;
        padding: 10px;
        letter-spacing: 0.01rem;
        font-size: 16px;
        font-weight: 500;
        color: #555;
        background: #f4f4f4;
    }

    a:last-child {
        margin-left: 1rem;
    }

    a.active {
        color: #fff;
        background: #444;
    }

    @media only screen and (max-width: 600px) {
        a {
            font-size: 14px;
            padding: 10px;
            width: 100px;
        }

        a:last-child {
            margin-left: 12px;
        }
    }
</style>
