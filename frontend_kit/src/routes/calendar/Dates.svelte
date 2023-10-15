<script>
    import { onMount } from 'svelte'
    import { createEventDispatcher } from 'svelte'
    import { convertToAbbreviatedDateString, enableSideScroll } from '$lib/helpers/datesHelpers.js'

    export let dates = []
    export let activeDate

    let scrollContainer;
    onMount(async () => {
        enableSideScroll(scrollContainer)
    });

    const dispatch = createEventDispatcher()
    function dispatchActiveDate(date) {
        dispatch('updateActiveDate', date)
    }
</script>
  

<nav bind:this={scrollContainer}>

    {#each dates as date}
    <button 
        class:active={activeDate === date}
        on:click={() => activeDate = date}
        on:click={() => dispatchActiveDate(date)}>
        {convertToAbbreviatedDateString(new Date(date))}
    </button>
    {/each}

</nav>

<style>
    nav {
		overflow-x: auto;
        white-space: nowrap;
		cursor: grab;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding: 2rem;
	}

    nav::-webkit-scrollbar {
        display: none;
    }

	button {
        cursor: pointer;
		padding: 12px;
		width: 140px;
		border: none;
		border-radius: 5px;
		margin-right: 12px;
		color: #aaa;
        font-size: 16px;
        font-weight: 300;
        font-family: Helvetica, sans-serif;
        background: #f4f4f4;
        letter-spacing: 0.3px;
	}

    button.active {
        background: lightcoral;
        color: rgba(255, 255, 255, 0.98);
        font-weight: 400;
    }


    @media only screen and (max-width: 480px) {
        nav {
            padding: 1rem;
        }

        button {
            width: 138px;
            padding: 10px;
        }
    }

    @media only screen and (min-width: 1080px) {
		nav {
            padding: 2rem 0;
        }
	}
</style>