<script>
    import { convertToShortDateString } from '$lib/helpers/dates.js'
    import { activeDate, renderShowings } from '$lib/stores'

    export let date

    function handleButtonClick(date) {
        if (date !== $activeDate) {
            activeDate.set(date)
            renderShowings.set(false)
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
        width: 140px;
        border: none;
        border-radius: 4px;
        margin-right: 12px;
        color: #b4b4b4;
        font-size: 16px;
        font-weight: 400;
        font-family: inherit;
        background: #f6f6f6;
        letter-spacing: 0.3px;
    }

    button:last-child {
        margin-right: 0;
    }

    button.active {
        background: hsl(190, 40%, 30%);
        color: #fff;
        font-weight: 600;
    }

    @media only screen and (max-width: 600px) {
        button {
            width: 120px;
            font-size: 14px;
        }
    }
</style>