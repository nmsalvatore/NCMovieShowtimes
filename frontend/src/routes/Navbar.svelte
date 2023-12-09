<script>
    import { activeRouteID, windowWidth } from '$lib/stores.js'

    const links = [
        { id: 1, href: '/calendar', label: 'Calendar' },
        { id: 2, href: '/movies', label: 'All Movies' }
    ]
</script>

<nav>
    {#each links as link}
        <a href={link.href} class="text-link" class:active={$activeRouteID === link.id}>
            {link.label}
        </a>
    {/each}
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
