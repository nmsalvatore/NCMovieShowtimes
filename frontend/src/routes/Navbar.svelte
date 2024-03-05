<script>
    import { activeRouteID } from '$lib/stores.js'
    import CalendarIcon from '$lib/assets/icons/calendar.svg'
    import MovieIcon from '$lib/assets/icons/movies.svg'
</script>

<nav class="page-links">
    <a 
        class="page-link"
        class:active={ $activeRouteID === 1 }
        href='/calendar' 
    >
        <img class="icon" src={ CalendarIcon } alt="Calendar icon" />
        <span>Calendar</span>
    </a>
    <a 
        class="page-link"
        class:active={ $activeRouteID === 2 }
        href='/movies'
    >
        <img class="icon" src={ MovieIcon } alt="Movie icon" />
        <span>All Movies</span>
    </a>
</nav>

<style>
    nav.page-links {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: fit-content;
    }

    a.page-link {
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

    a.page-link:last-child {
        margin-left: 1rem;
    }

    a.page-link > img.icon {
        filter: invert(40%) sepia(37%) saturate(0%) hue-rotate(179deg) brightness(96%) contrast(75%);
    }

    a.page-link.active > img.icon {
        filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(201deg) brightness(106%) contrast(106%);
    }

    a.page-link > span {
        font-size: 12px;
        margin-left: 8px;
        color: #6f6f6f;
    }

    a.page-link.active > span {
        color: #fff;
    }

    @media only screen and (max-width: 600px) {
        a.page-link {
            width: 80px;
            font-size: 14px;
        }

        a.page-link:last-child {
            margin-left: 1rem;
        }

        a.page-link > span {
            display: none;
        }
    }
</style>
