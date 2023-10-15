<script>
    import { activeRouteID } from '$lib/stores.js'

    const links = [
        { id: 1, href: '/calendar', label: 'Calendar'},
        { id: 2, href: '/movies', label: 'All Movies'}
    ]
</script>

<nav>
    {#each links as link}
    <a href={link.href}
        class:active={$activeRouteID === link.id}>
        {link.label}
    </a>
    {/each}
</nav>

<style>
    a {
        display: inline-block;
        text-align: center;
        text-decoration: none;
		cursor: pointer;
		border: none;
		padding: 8px;
		width: 120px;
		font-size: 16px;
		border-radius: 5px;
		background: white;
		margin-right: 12px;
		color: #555;
		border: 1px solid #eee;
	}

    a:last-child {
		margin-right: 0;
	}

	a.active {
		background: #6d7a8b;
		border: 1px solid #6d7a8b;
		color: rgba(255, 255, 255, 0.98);
	}

    @media only screen and (max-width: 480px) {
		a {
			padding: 8px;
			font-size: 14px;
			width: 100px;
		}
    }
</style>