<script>
	import { onMount } from 'svelte';
	import Movies from './components/Movies.svelte'
    import Calendar from './components/Calendar.svelte';
	import { updateMovieData } from './helpers/moviesHelpers.js'
	import { updateDatesData, getTodayDateString } from './helpers/datesHelpers.js'
	import { updateShowingsData } from './helpers/showingsHelpers.js';

	const today = getTodayDateString()

	let movies = []
	let dates = []
	let showings = []

	let activeDate = today
	let activeViewButtonID = 1
	let calendarDisplay = 'block'
	let moviesDisplay = 'none'

	onMount(async () => {
		dates = await updateDatesData()
		showings = await updateShowingsData(activeDate)
	})

	function setActiveViewButton(id) {
		activeViewButtonID = id
	}

	async function showCalendar() {
		dates = await updateDatesData()
		showings = await updateShowingsData(activeDate)
		calendarDisplay = 'block'
		moviesDisplay = 'none'
		setActiveViewButton(1)
	}

	async function showMovies() {
		movies = await updateMovieData()
		calendarDisplay = 'none'
		moviesDisplay = 'block'
		setActiveViewButton(2)
	}
</script>


<header>
	<h1>
		<span>Nevada County</span>
		<span>Movie</span>
		<span>Showtimes</span>
	</h1>
	<nav>
		<button 
			on:click={showCalendar} 
			class:active={activeViewButtonID === 1}>
			Calendar
		</button>
		<button 
			on:click={showMovies} 
			class:active={activeViewButtonID === 2}>
			All Movies
		</button>
	</nav>
</header>

<main>
	<section style="display: {calendarDisplay};">
		<Calendar {dates} {showings} {activeDate} />
	</section>
	
	<section style="display: {moviesDisplay};">
		<Movies {movies} />
	</section>	
</main>

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

	button {
		cursor: pointer;
		border: none;
		padding: 8px;
		width: 120px;
		font-size: 16px;
		border-radius: 5px;
		background: white;
		margin-right: 6px;
		color: #555;
		border: 1px solid #eee;
	}

	button.active {
		background: #6d7a8b;
		border: 1px solid #6d7a8b;
		color: rgba(255, 255, 255, 0.98);
	}

	button:last-child {
		margin-right: 0;
	}

	@media only screen and (max-width: 480px) {
		button {
			padding: 8px;
			font-size: 14px;
			width: 100px;
		}

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

