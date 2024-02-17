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
        width: fit-content;
        letter-spacing: 0.01rem;
        font-size: 15px;
        font-weight: 500;
        color: #aaa;
    }

    a:last-child {
        margin-left: 2rem;
    }

    a.active {
        font-weight: 600;
        color: #555;
    }

    @media only screen and (max-width: 600px) {
        a {
            font-size: 14px;
        }

        a:last-child {
            margin-left: 1rem;
        }
    }
</style>
