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
        height: 36px;
        width: 120px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        background: #262626;
        border: 1px solid #333;
        font-weight: 500;
        letter-spacing: 0.02rem;
        font-size: 13px;
        color: #6f6f6f;
        border-radius: 4px;
    }

    a.page-link:last-child {
        margin-left: 1rem;
    }

    a.page-link.active {
        color: #fff;
    }

    @media only screen and (max-width: 600px) {
        a.page-link {
            height: 32px;
            width: 96px;
            font-size: 11px;
        }

        a.page-link:last-child {
            margin-left: 0.5rem;
        }
    }
</style>
