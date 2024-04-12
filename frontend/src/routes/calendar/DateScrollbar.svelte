<script>
    import { onMount } from 'svelte'
    import * as listeners from '$lib/listeners'
    import DateButton from './DateButton.svelte'
    import ArrowLeft from '$lib/assets/icons/arrow-left.svg'
    import ArrowRight from '$lib/assets/icons/arrow-right.svg'

    export let dates = []

    let scrollContainer;

    onMount(async () => {
        listeners.arrowClick(scrollContainer)
        listeners.horizontalScroll(scrollContainer)
        listeners.verticalScroll()
    });
</script>
  

<div class="dates-scrollbar-container" on>
    <button class="nav-arrow left">
        <img src={ ArrowLeft } alt="Left facing arrow">
    </button>
    <div class="dates-scrollbar" bind:this={ scrollContainer }>

        {#each dates as date}
            <DateButton { date }/>
        {/each}

    </div>
    <button class="nav-arrow right">
        <img src={ ArrowRight } alt="Right facing arrow">
    </button>
</div>


<style>
    div.dates-scrollbar-container {
        position: sticky;
        top: -1;
    }

    button.nav-arrow {
        cursor: pointer;
        position: absolute;
        top: 48px;
        transform: translateY(-50%);
        background: #fff;
        border: none;
        opacity: 0.9;
        padding: 1rem;
        height: 94px;
        z-index: 10;
    }

    button.left.nav-arrow {
        left: 0;
    }

    button.right.nav-arrow {
        right: 0;
    }

    div.dates-scrollbar {
        display: flex;
        align-items: center;
        overflow-x: auto;
        white-space: nowrap;
        cursor: grab;
        scrollbar-width: none;
        -ms-overflow-style: none;
        margin-bottom: 4rem;
        padding: 0 56px;
        height: 96px;
        position: relative;
        background: #fff;
    }

    div.dates-scrollbar::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 600px) {
        div.dates-scrollbar {
            height: 80px;
            padding: 0 1rem;
            margin-bottom: 3rem;
        }

        button.nav-arrow {
            display: none;
        }
    }
</style>
