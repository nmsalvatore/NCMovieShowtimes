<script>
    import { activeRouteID, activeCalendarPath } from '$lib/stores.js'

    function handleClick(routeID) {
        activeRouteID.set(routeID)
    }
</script>

<nav>
    <a 
        href={ $activeCalendarPath }
        class:active={ $activeRouteID === 1 }
        on:click={ () => handleClick(1) }
    >
        Calendar
    </a>
    <a 
        href="/movies"
        class:active={ $activeRouteID === 2 }
        on:click={ () => handleClick(2) }
    >
        Movies
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
        font-weight: 400;
        border-radius: 5px;
        background: #fcfafa;
        margin-right: 12px;
        color: #777;
    }

    a:last-child {
        margin-right: 0;
    }

    a.active {
        background: #6d7a8b;
        border: 1px solid #6d7a8b;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.98);
    }

    @media only screen and (max-width: 600px) {
        a {
            padding: 9px;
            font-size: 14px;
            width: 96px;
        }
    }
</style>
