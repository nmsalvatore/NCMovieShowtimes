<script>
    import { activeRouteID } from '$lib/stores.js'
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

    a.page-link.active {
        background: hsl(180, 50%, 40%);
    }

    a.page-link:last-child {
        margin-left: 1rem;
    }

    @media only screen and (max-width: 600px) {
        a.page-link {
            height: 34px;
            width: 100px;
            font-size: 14px;
        }

        a.page-link:last-child {
            margin-left: 10px;
        }
    }
</style>
