<script>
    import { activeRouteID } from '$lib/stores.js'
    import CalendarIcon from '$lib/assets/calendar.svg'
    import CalendarIconSolid from '$lib/assets/calendar_solid.svg'
    import MovieIcon from '$lib/assets/film.svg'
    import MovieIconSolid from '$lib/assets/film_solid.svg'

    let icon1 = CalendarIcon
    let icon2 = MovieIcon
    let activeIconsRendered = false

    $: if ($activeRouteID && !activeIconsRendered) {
        setActiveIcon($activeRouteID)
        activeIconsRendered = true
    }

    function handleClick(routeId) {
        setActiveIcon(routeId)
        activeRouteID.set(routeId)
    }

    function setActiveIcon(id) {
        if (id === 1) {
            icon1 = CalendarIconSolid
            icon2 = MovieIcon
        }

        if (id === 2) {
            icon1 = CalendarIcon
            icon2 = MovieIconSolid
        }
    }
</script>

<nav>
    <a 
        href='/calendar'
        class:active={ $activeRouteID === 1 }
        on:click={ () => handleClick(1) }
    >
        <img src={ icon1 } alt="Calendar icon" />
        <span>Calendar</span>
    </a>
    <a 
        href='/movies'
        class:active={ $activeRouteID === 2 }
        on:click={ () => handleClick(2) }
    >
        <img src={ icon2 } alt="Movie Icon" />
        <span>All Movies</span>
    </a>
</nav>

<style>
    nav {
        display: flex;
        flex-direction: row;
        width: fit-content;
    }

    a {
        display: inline-flex;
        flex-direction: column;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        background: #fff;
        width: fit-content;
        letter-spacing: 0.01rem;
        font-weight: 500;
        color: #555;
    }

    a:last-child {
        margin-left: 3rem;
    }

    a > img {
        height: 28px;
        filter: invert(76%) sepia(1%) saturate(0%) hue-rotate(344deg) brightness(90%) contrast(92%);
    }

    a > span {
        font-size: 12px;
        margin-top: 4px;
        color: #aaa;
    }

    a.active > img {
        filter: invert(17%) sepia(0%) saturate(1574%) hue-rotate(159deg) brightness(89%) contrast(87%);
    }

    a.active > span {
        color: #555;
    }

    @media only screen and (max-width: 600px) {
        a:last-child {
            margin-left: 1.5rem;
        }

        a > img {
            height: 24px;
        }

        a > span {
            font-size: 10px;
        }
    }
</style>
