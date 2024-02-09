<script>
    import Dates from './Dates.svelte'
    import { activeRouteID, activeDate } from '$lib/stores.js'
    import { onMount } from 'svelte';

    export let data
    
    let { date, dates } = data

    onMount(() => {
        activeRouteID.set(1)
        activeDate.set(date)
    })
</script>

<Dates {dates} />
<slot />
