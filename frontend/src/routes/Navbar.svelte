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
        border: none;
        padding: 8px;
        width: 120px;
        font-size: 15px;
        font-weight: 500;
        border-radius: 4px;
        margin-right: 12px;
        color: #555;
    }

    a:last-child {
        margin-right: 0;
    }

    a.active {
        background: #333;
        font-weight: 500;
        color: #fff;
    }

    @media only screen and (max-width: 600px) {
        a {
            padding: 9px;
            font-size: 14px;
            width: 96px;
        }
    }
</style>
