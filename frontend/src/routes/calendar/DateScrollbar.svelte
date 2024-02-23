<script>
    import { onMount } from 'svelte'
    import { enableSideScroll, enableArrowClick } from '$lib/helpers/utils.js'
    import DateButton from './DateButton.svelte'

    export let dates = []

    let scrollContainer;

    onMount(async () => {
        enableArrowClick(scrollContainer)
        enableSideScroll(scrollContainer)
    });
</script>
  

<div class="container">
    <button class="arrow left">←</button>
    <div class="scrollbar" bind:this={ scrollContainer }>

        {#each dates as date}
            <DateButton { date }/>
        {/each}

    </div>
    <button class="arrow right">→</button>
</div>


<style>
    .container {
        position: relative;
    }

    .arrow {
        cursor: pointer;
        position: absolute;
        top: 95%;
        transform: translateY(-50%);
        background: none;
        border: none;
        padding: 8px;
        color: #b4b4b4;
        font-size: 16px;
        font-family: inherit;
        z-index: 10;
    }

    .arrow:hover {
        color: #555;
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
        padding: 24px 0 2rem 0;
        margin-bottom: 48px;
        position: relative;
    }

    .scrollbar::-webkit-scrollbar {
        display: none;
    }

    @media only screen and (max-width: 1080px) {
        .scrollbar {
            padding: 1rem 2rem 2rem 2rem;
        }

        .left.arrow {
            left: 30px;
        }

        .right.arrow {
            right: 30px;
        }
    }

    @media only screen and (max-width: 600px) {
        .scrollbar {
            padding: 1.75rem 1rem 1rem 1rem;
            margin-bottom: 1rem;
        }

        .arrow {
            display: none;
        }
    }
</style>
