<script>
    import { activeRouteID, windowWidth } from '$lib/stores.js'

    const links = [
        { id: 1, href: '/calendar', label: 'Calendar', iconPath: "M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" },
        { id: 2, href: '/movies', label: 'All Movies', iconPath: "M280-600v-80h560v80H280Zm0 160v-80h560v80H280Zm0 160v-80h560v80H280ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" }
    ]
</script>

<nav>
    {#if $windowWidth !== 0}
        {#each links as link}
            {#if $windowWidth > 500}
                <a href={link.href} class="text-link" class:active={$activeRouteID === link.id}>
                    {link.label}
                </a>
            {:else}
                <a href={link.href} class="svg-link" class:active={$activeRouteID === link.id}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="{link.iconPath}"/></svg>
                </a>
            {/if}
        {/each}
    {/if}
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

    a.active > svg {
        fill: rgba(255, 255, 255, 0.98);
    }
    
    a > svg {
        fill: #666;
    }

    a.active > svg,
    a > svg {
        position: relative;
        top: 2px;
    }

    .svg-link {
        width: 60px;
    }
</style>
