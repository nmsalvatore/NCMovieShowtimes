<script>
    import Navbar from './Navbar.svelte'
    import { activeRouteID } from '$lib/stores.js'
</script>

<header>
	<h1>Nevada County Movie Showtimes</h1>
    <Navbar />
</header>

<style>
    header {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 100px;
		padding: 0 2rem;
		margin-top: 1rem;
	}

	h1 {
		font-size: 1rem;
		font-weight: 400;
		color: #555;
		text-align: left;
	}

	@media only screen and (max-width: 480px) {
		header {
			padding: 0 1rem;
			margin-bottom: 1rem;
		}
	}

	@media only screen and (min-width: 1080px) {
		header {
			padding: 0;
		}
	}
</style>