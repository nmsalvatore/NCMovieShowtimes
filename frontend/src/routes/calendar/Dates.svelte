<script>
    import { onMount, createEventDispatcher } from 'svelte'
    import { convertToShortDateString } from '$lib/helpers/dates.js'
    import { enableSideScroll } from '$lib/helpers/utils.js'
    import { activeDate } from '$lib/stores.js'

    export let dates = []

    let scrollContainer;

    onMount(async () => {
        const leftArrow = document.querySelector('.left-arrow')
        const rightArrow = document.querySelector('.right-arrow')
        const scrollAmount = 500

        leftArrow.addEventListener('click', () => {
            scrollContainer.scrollLeft -= scrollAmount
        });

        rightArrow.addEventListener('click', () => {
            scrollContainer.scrollLeft += scrollAmount
        });

        enableSideScroll(scrollContainer)
    });

    const dispatch = createEventDispatcher()
    function handleButtonClick(date) {
        $activeDate = date;
        dispatch('updateActiveDate', $activeDate);
    }
</script>
  

<div class="nav-wrapper">
    <button class="left-arrow">←</button>
    <nav class="nav-container" bind:this={scrollContainer}>

        {#each dates as date}
            <button 
                class:active={$activeDate === date}
                on:click={() => handleButtonClick(date)}>
                {convertToShortDateString(date)}
            </button>
        {/each}

    </nav>
    <button class="right-arrow">→</button>
</div>


<style>
    .nav-wrapper {
        position: relative;
    }

    .left-arrow, 
    .right-arrow {
        position: absolute;
        top: 95%;
        transform: translateY(-50%);
        opacity: 0.8;
        background: none;
        z-index: 10;
        margin: 0;
        width: auto;
        padding: 8px
    }

    .left-arrow:hover,
    .right-arrow:hover {
        color: #555;
    }

    .left-arrow {
        left: 0;
    }

    .right-arrow {
        right: 0;
    }

    nav {
        overflow-x: auto;
        white-space: nowrap;
        cursor: grab;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding: 1rem 0 2rem 0;
        margin-bottom: 60px;
        position: relative;
        scroll-behavior: smooth;
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
        color: #ccc;
        font-size: 16px;
        font-weight: 400;
        font-family: inherit;
        background: #f4f4f4;
        letter-spacing: 0.3px;
    }

    button:last-child {
        margin-right: 0;
    }

    button.active {
        background: lightcoral;
        color: rgba(255, 255, 255, 0.98);
        font-weight: 500;
    }

    @media only screen and (max-width: 1080px) {
        nav {
            padding: 1rem 2rem 2rem 2rem;
        }

        .left-arrow {
            left: 30px;
        }

        .right-arrow {
            right: 30px;
        }
    }

    @media only screen and (max-width: 600px) {
        nav {
            padding: 1rem;
            margin-bottom: 18px;
        }

        button {
            width: 120px;
            font-size: 14px;
            padding: 10px;
        }

        .left-arrow,
        .right-arrow {
            display: none;
        }
    }
</style>
