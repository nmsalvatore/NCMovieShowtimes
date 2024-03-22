<script>
    import { convertToShortDateString } from '$lib/helpers/dates.js'
    import { activeDate, renderShowings } from '$lib/stores'

    export let date

    function handleButtonClick(date) {
        if (date !== $activeDate) {
            activeDate.set(date)
            renderShowings.set(false)
            
            if (window.innerWidth >= 600 && window.scrollY >= 96) {
                window.scrollTo(0, 96)
            } else if (window.scrollY >= 80) {
                window.scrollTo(0, 80)
            }
        }
    }
</script>

<button 
    class="date"
    class:active={ $activeDate === date }
    on:click={ () => handleButtonClick(date) }>
    { convertToShortDateString(date) }
</button>

<style>
    button.date {
        cursor: pointer;
        padding: 12px;
        min-width: 140px;
        border: none;
        border-radius: 4px;
        margin-right: 8px;
        color: #8f8f8f;
        font-size: 16px;
        font-weight: 400;
        font-family: inherit;
        background: #fff;
        border: 1px solid #ccc;
    }

    button.date:last-child {
        margin-right: 0;
    }

    button.date.active {
        background: #c85b5b;
        border: 1px solid #c85b5b;
        color: #fff;
        font-weight: 500;
    }

    @media only screen and (max-width: 600px) {
        button.date {
            min-width: 120px;
            font-size: 14px;
        }
    }
</style>