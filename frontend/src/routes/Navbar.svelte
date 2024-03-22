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
        height: 45px;
        width: 120px;
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        background: #fff;
        border: 1px solid #aaa;
        font-weight: 400;
        letter-spacing: 0.02rem;
        font-size: 16px;
        color: #555;
        border-radius: 4px;
    }

    a.page-link:last-child {
        margin-left: 1rem;
    }

    a.page-link.active {
        color: #fff;
        background: #333;
        border: 1px solid #333;
        font-weight: 500;
    }

    @media only screen and (max-width: 600px) {
        a.page-link {
            height: 40px;
            width: 100px;
            font-size: 14px;
        }

        a.page-link:last-child {
            margin-left: 0.75rem;
        }
    }
</style>
