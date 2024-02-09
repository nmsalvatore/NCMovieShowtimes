<script>
    import Header from './Header.svelte'
    import { activeCalendarPath } from '$lib/stores'
    import { onMount } from 'svelte'

    export let data

    onMount(() => {
        activeCalendarPath.set(data.activeCalendarPath)
    })
</script>

<Header />
<main>
    <slot />
</main>
