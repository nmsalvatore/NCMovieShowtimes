<script>
    import Header from './Header.svelte'
    import Footer from './Footer.svelte'
    import { page } from '$app/stores'
    import { onMount } from 'svelte'

    onMount(() => {
        window.scrollTo(0, 0)
    })
</script>

<svelte:head>
    <title>Nevada County Movie Showtimes | { $page.data.pageTitle }</title>
    <meta name="description" content={ $page.data.description }>
    <meta property="og:type" content="website">
    <meta property="og:url" content={ $page.data.href}>
    <meta property="og:site_name" content="Nevada County Movie Showtimes">
    <meta property="og:title" content={ $page.data.ogTitle }>
    <meta property="og:description" content={ $page.data.description }>
    <meta property="og:locale" content="en_US">
    <link rel="canonical" href={ $page.data.href }>
</svelte:head>

<Header />
<main class="page-content">
    <slot />
</main>
<Footer />

<style>
    main.page-content {
        background: #fff;
    }
</style>