<script>
    import { onMount } from 'svelte'
    import { enableSideScroll, enableArrowClick } from '$lib/helpers/utils.js'
    import DateButton from './DateButton.svelte'
    import ArrowLeft from '$lib/assets/arrow-left.svg'
    import ArrowRight from '$lib/assets/arrow-right.svg'

    export let dates = []

    let scrollContainer;

    onMount(async () => {
        enableArrowClick(scrollContainer)
        enableSideScroll(scrollContainer)
    });
</script>
  

<div class="container">
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
    .container {
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
        height: 108px;
        z-index: 10;
    }

    .left.arrow {
        left: 0;
    }

    .right.arrow {
        right: 0;
    }

    .scrollbar {
        overflow-x: auto;
        white-space: nowrap;
        cursor: grab;
        scrollbar-width: none;
        -ms-overflow-style: none;
        margin-bottom: 4rem;
        padding: 0 56px;
        height: 108px;
        line-height: 108px;
        box-shadow: 0 1px 8px -6px;
        position: relative;
        background: #fff;
    }

    .scrollbar::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 600px) {
        .scrollbar {
            height: 80px;
            line-height: 80px;
            padding: 0 1rem;
            margin-bottom: 3rem;
        }

        .arrow {
            display: none;
        }
    }
</style>
