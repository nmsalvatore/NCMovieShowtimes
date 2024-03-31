<script>
    import Navbar from './Navbar.svelte'
    import Logo from '$lib/assets/icons/logo.png'
</script>

<header>
    <a href="/calendar">
        <img class="site-logo" src={ Logo } alt="NCMS Logo">
    </a>
    <Navbar />
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 96px;
        padding: 0 2rem;
        margin-top: 1rem;
        background: #fff;
        max-width: 960px;
    }

    a {
        display: flex;
    }

    img.site-logo {
        position: relative;
        left: -6px;
        height: 64px;
        filter: invert(18%) sepia(5%) saturate(0%) hue-rotate(151deg) brightness(95%) contrast(91%);
    }

    @media only screen and (max-width: 600px) {
        header {
            padding: 0 1rem;
            height: 80px;
            margin-top: 0.5rem;
        }

        img.site-logo {
            height: 48px;
        }
    }
</style>
