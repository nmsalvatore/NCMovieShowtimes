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
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 120px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        background: #333;
        font-weight: 500;
        font-size: 16px;
        color: #fff;
        border-radius: 4px;
    }

    a.active {
        background: hsl(180, 50%, 40%);
    }

    a:last-child {
        margin-left: 1rem;
    }

    @media only screen and (max-width: 600px) {
        a {
            height: 34px;
            width: 100px;
            font-size: 14px;
        }

        a:last-child {
            margin-left: 10px;
        }
    }
</style>
