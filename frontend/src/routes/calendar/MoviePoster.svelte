<script>
    import { loadedImages } from '$lib/stores'

    export let showing

    function onPosterLoad() {
        $loadedImages++
    }

    function uniqueUrl(url) {
        const timestamp = new Date().getTime()
        return url + `?timestamp=${timestamp}`
    }
</script>

<img 
    crossorigin="true" 
    src={ uniqueUrl(showing.posterUrl) } 
    on:load={ onPosterLoad }
    alt="{ showing.title } Movie Poster"
>

<style>
    img {
        width: auto;
        height: auto;
        max-width: 110px;
        height: 100%;
        border-radius: 4px;
        margin-right: 2rem;
    }

    @media only screen and (max-width: 600px) {
        img {
            margin-right: 1rem;
            max-width: 92px;
        }
    }
</style>