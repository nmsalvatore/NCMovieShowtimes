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
        text-decoration: none;
        cursor: pointer;
        font-weight: 600;
        font-size: 16px;
        width: 118px;
        height: 50px;
        color: #767676;
        border-radius: 4px;
        margin-bottom: 3px;
    }

    a.page-link.active {
        color: #333;
        text-decoration: underline;
        text-decoration-color: #333;
        text-decoration-thickness: 2px;
        text-underline-offset: 8px;
    }

    @media only screen and (max-width: 600px) {
        a.page-link {
            font-size: 14px;
            width: 96px;
            height: 40px;
        }
    }
</style>
