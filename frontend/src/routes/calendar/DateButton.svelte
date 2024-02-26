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
    class:active={ $activeDate === date }
    on:click={ () => handleButtonClick(date) }>
    { convertToShortDateString(date) }
</button>

<style>
    button {
        cursor: pointer;
        padding: 12px;
        min-width: 140px;
        border: none;
        border-radius: 4px;
        margin-right: 8px;
        color: #888;
        font-size: 16px;
        font-weight: 400;
        font-family: inherit;
        background: #f4f4f4;
        border: 1px solid #ddd;
    }

    button:last-child {
        margin-right: 0;
    }

    button.active {
        background: hsl(0, 50%, 57%);
        border: 1px solid hsl(0, 50%, 57%);
        color: #fff;
        font-weight: 500;
    }

    @media only screen and (max-width: 600px) {
        button {
            min-width: 120px;
            font-size: 14px;
        }
    }
</style>