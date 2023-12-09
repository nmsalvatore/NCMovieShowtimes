<script>
    import Navbar from './Navbar.svelte'
</script>

<header>
    <img src="logo.png" alt="NCMS Logo">
    <Navbar />
</header>

<style>
    header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 100px;
        padding: 0 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }

    img {
        position: relative;
        left: -8px;
        height: 64px;
        filter: invert(17%) sepia(0%) saturate(1%) hue-rotate(218deg) brightness(94%) contrast(88%);
        font-weight: 600;
        color: #555;
        text-align: left;
    }

    @media only screen and (max-width: 600px) {
        header {
            /* flex-direction: column; */
            padding: 0rem 1rem 1rem 1rem;
            height: auto;
            margin-bottom: 0;
        }

        img {
            height: 48px;
        }
    }

    @media only screen and (min-width: 1080px) {
        header {
            padding: 0;
        }
    }
</style>
