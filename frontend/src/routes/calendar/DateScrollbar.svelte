<script>
    import { onMount } from 'svelte'
    import * as listeners from '$lib/listeners'
    import DateButton from './DateButton.svelte'
    import ArrowLeft from '$lib/assets/arrow-left.svg'
    import ArrowRight from '$lib/assets/arrow-right.svg'

    export let dates = []

    let scrollContainer;

    onMount(async () => {
        listeners.arrowClick(scrollContainer)
        listeners.horizontalScroll(scrollContainer)
        listeners.verticalScroll()
    });
</script>
  

<div class="scrollbar-container" on>
    <button class="arrow left">
        <img src={ ArrowLeft } alt="Left facing arrow">
    </button>
    <div class="scrollbar" bind:this={ scrollContainer }>

        {#each dates as date}
            <DateButton { date }/>
        {/each}

    </div>
    <button class="arrow right">
        <img src={ ArrowRight } alt="Right facing arrow">
    </button>
</div>


<style>
    .scrollbar-container {
        position: relative;
        position: sticky;
        top: 0;
    }

    .arrow {
        cursor: pointer;
        position: absolute;
        top: 54px;
        transform: translateY(-50%);
        background: #fff;
        border: none;
        opacity: 0.9;
        padding: 1rem;
        height: 106px;
        z-index: 10;
    }

    .left.arrow {
        left: 0;
    }

    .right.arrow {
        right: 0;
    }

    .scrollbar {
        display: flex;
        align-items: center;
        overflow-x: auto;
        white-space: nowrap;
        cursor: grab;
        scrollbar-width: none;
        -ms-overflow-style: none;
        margin-bottom: 4rem;
        padding: 0 56px;
        height: 108px;
        border-bottom: 1px solid #e4e4e4;
        position: relative;
        background: #fff;
    }

    .scrollbar::-webkit-scrollbar {
        display: none;
    }

    :global(.scrollbar.shadow) {
        box-shadow: 0 1px 8px -6px;
        border-bottom: 0;
    }

    @media only screen and (max-width: 600px) {
        .scrollbar {
            height: 80px;
            padding: 0 1rem;
            margin-bottom: 3rem;
        }

        .arrow {
            display: none;
        }
    }
</style>
