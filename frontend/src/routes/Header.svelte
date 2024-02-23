<script>
    import Navbar from './Navbar.svelte'
    import Logo from '$lib/assets/logo.png'
</script>

<header>
    <div>
        <a href="/calendar"><img src={ Logo } alt="NCMS Logo"></a>
        <Navbar />
    </div>
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 84px;
        padding: 0 2rem;
        background: #333;
    }

    header > div {
        display: flex;
        justify-content: space-between;
        width: 960px;
    }

    a {
        display: flex;
    }

    img {
        position: relative;
        left: -6px;
        height: 64px;
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(143deg) brightness(103%) contrast(102%);
    }

    @media only screen and (max-width: 600px) {
        header {
            padding: 1rem;
            height: auto;
            margin-bottom: 0;
        }

        img {
            height: 48px;
        }
    }
</style>
