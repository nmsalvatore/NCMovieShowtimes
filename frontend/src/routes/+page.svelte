<script>
    import { browser } from '$app/environment'
    import { goto } from '$app/navigation'

    export let data
    
    $: activeCalendarPath = data.activeCalendarPath
    $: if (browser && data) {
        goto(activeCalendarPath)
    }
</script>