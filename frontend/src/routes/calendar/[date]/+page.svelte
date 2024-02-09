<script>
    import Showings from './Showings.svelte'
    import { renderShowings } from '$lib/stores'
    import { goto } from '$app/navigation'
    import { browser } from '$app/environment'

    export let data

    let showings

    $: if (data) {
        showings = data.showings
        renderShowings.set(true)
    }
</script>

{#if $renderShowings}
    <Showings {showings} />
{/if}