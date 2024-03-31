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
        Calendar
    </a>
    <a 
        class="page-link"
        class:active={ $activeRouteID === 2 }
        href='/movies'
    >
        All Movies
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
        text-decoration: none;
        cursor: pointer;
        font-weight: 400;
        letter-spacing: 0.02rem;
        font-size: 16px;
        color: #6f6f6f;
        border-radius: 4px;
        padding: 1rem;
    }

    a.page-link:last-child {
        margin-left: 1rem;
    }

    a.page-link.active {
        color: #333;
        font-weight: 600;
        text-decoration: underline;
        text-decoration-color: #eee;
        text-decoration-thickness: 2px;
        text-underline-offset: 10px;
    }

    @media only screen and (max-width: 600px) {
        a.page-link {
            height: 40px;
            font-size: 14px;
            padding: 0.5rem;
        }

        a.page-link:last-child {
            margin-left: 0.5rem;
        }
    }
</style>
