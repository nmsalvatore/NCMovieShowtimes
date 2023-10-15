<script>
    import Header from "./Header.svelte";
</script>


<Header />

<main>
    <slot />
</main>


<style>
    :global(*) {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    :global(body) {
        color: #333;
        font-family: Helvetica, sans-serif;
        letter-spacing: 0.3px;
        max-width: 960px;
        margin: 0 auto;
    }

    :global(ul) {
        list-style-type: none;
    }
</style>
