<script>
    import { activeRouteID } from '$lib/stores.js'
    import CalendarIcon from '$lib/assets/calendar.svg'
    import FilmIcon from '$lib/assets/film.svg'
</script>

<nav>
    <a 
        href='/calendar'
        class:active={ $activeRouteID === 1 }
        on:click={ () => activeRouteID.set(1) }
    >
        <img src={ CalendarIcon } alt="Calendar Icon" />
        <span>Calendar</span>
    </a>
    <a 
        href='/movies'
        class:active={ $activeRouteID === 2 }
        on:click={ () => activeRouteID.set(2) }
    >
        <img src={ FilmIcon } alt="Film Icon" />
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
        border-radius: 4px;
        width: fit-content;
        padding: 10px;
        letter-spacing: 0.01rem;
        font-weight: 500;
        color: #555;
    }

    a:last-child {
        margin-left: 2rem;
    }

    a > img {
        height: 28px;
        filter: invert(65%) sepia(0%) saturate(0%) hue-rotate(189deg) brightness(88%) contrast(81%);
    }

    a > span {
        font-size: 12px;
        margin-top: 4px;
        color: #8f8f8f;
    }

    a.active > img {
        filter: invert(31%) sepia(0%) saturate(1%) hue-rotate(90deg) brightness(95%) contrast(80%);
    }

    a.active > span {
        color: #555;
    }

    @media only screen and (max-width: 600px) {
        a {
            padding: 10px;
        }

        a:last-child {
            margin-left: 12px;
        }

        a > img {
            height: 24px;
        }

        a > span {
            font-size: 10px;
        }
    }
</style>
