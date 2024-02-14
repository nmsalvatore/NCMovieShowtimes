<script>
    import { onMount } from 'svelte'
    import { convertToShortDateString } from '$lib/helpers/dates.js'
    import { enableSideScroll } from '$lib/helpers/utils.js'
    import { activeDate, renderShowings } from '$lib/stores.js'

    export let dates = []

    let scrollContainer;

    onMount(async () => {
        const leftArrow = document.querySelector('.left-arrow')
        const rightArrow = document.querySelector('.right-arrow')
        const scrollAmount = scrollContainer.offsetWidth - 48

        leftArrow.addEventListener('click', () => {
            scrollContainer.style.scrollBehavior = 'smooth'
            scrollContainer.scrollLeft -= scrollAmount

        });

        rightArrow.addEventListener('click', () => {
            scrollContainer.style.scrollBehavior = 'smooth'
            scrollContainer.scrollLeft += scrollAmount
        });

        enableSideScroll(scrollContainer)
    });

    function handleButtonClick(date) {
        if (date !== $activeDate) {
            activeDate.set(date)
            renderShowings.set(false)
        }
    }
</script>
  

<div class="nav-wrapper">
    <button class="left-arrow">←</button>
    <div class="dates-scrollbar" bind:this={scrollContainer}>

        {#each dates as date}
            <button 
                class:active={ $activeDate === date }
                on:click={ () => handleButtonClick(date) }>
                { convertToShortDateString(date) }
            </button>
        {/each}

    </div>
    <button class="right-arrow">→</button>
</div>


<style>
    .nav-wrapper {
        position: relative;
    }

    .left-arrow, 
    .right-arrow {
        cursor: pointer;
        position: absolute;
        top: 95%;
        transform: translateY(-50%);
        opacity: 0.8;
        background: none;
        border: none;
        z-index: 10;
        margin: 0;
        width: auto;
        padding: 8px;
        color: #b4b4b4;
        font-size: 16px;
        font-family: inherit;
        font-weight: 400;
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

    .dates-scrollbar {
        overflow-x: auto;
        white-space: nowrap;
        cursor: grab;
        scrollbar-width: none;
        -ms-overflow-style: none;
        padding: 1rem 0 2rem 0;
        margin-bottom: 60px;
        position: relative;
    }

    .dates-scrollbar::-webkit-scrollbar {
        display: none;
    }

    .dates-scrollbar > button {
        cursor: pointer;
        padding: 12px;
        width: 140px;
        border: none;
        border-radius: 5px;
        margin-right: 12px;
        color: #b4b4b4;
        font-size: 16px;
        font-weight: 400;
        font-family: inherit;
        background: #f4f4f4;
        letter-spacing: 0.3px;
    }

    .dates-scrollbar > button:last-child {
        margin-right: 0;
    }

    .dates-scrollbar > button.active {
        background: lightcoral;
        color: rgba(255, 255, 255, 0.98);
        font-weight: 500;
    }

    @media only screen and (max-width: 1080px) {
        .dates-scrollbar {
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
        .dates-scrollbar {
            padding: 1rem;
            margin-bottom: 18px;
        }

        .dates-scrollbar > button {
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
