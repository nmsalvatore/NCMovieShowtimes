<script>
    import { activeRouteID } from '$lib/stores.js'
</script>

<nav>
    <a href='/calendar' 
        class:active={ $activeRouteID === 1 }
        on:click={ () => activeRouteID.set(1) }
    >
        Calendar
    </a>
    <a href='/movies'
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
        align-items: center;
        width: fit-content;
    }

    a {
        height: 34px;
        line-height: 32px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        width: 100px;
        background: #444;
        letter-spacing: 0.01rem;
        font-weight: 500;
        font-size: 14px;
        color: #fff;
        border-radius: 4px;
    }

    a.active {
        background: cadetblue;
    }

    a:last-child {
        margin-left: 1rem;
    }

    @media only screen and (max-width: 600px) {
        a:last-child {
            margin-left: 10px;
        }
    }
</style>
