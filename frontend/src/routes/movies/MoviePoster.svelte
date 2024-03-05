<script>    
    import { loadedImages } from '$lib/stores'
    export let movie

    function uniqueUrl(url) {
        const timestamp = new Date().getTime()
        return url + `?timestamp=${timestamp}`
    }

    function onPosterLoad() {
        loadedImages.update(num => num + 1)
    }
</script>

<img 
    class="movie-poster"
    crossorigin="true" 
    src={ uniqueUrl(movie.posterUrl) } 
    on:load={() => onPosterLoad()}
    alt="{ movie.title } Movie Poster"
>

<style>
    img.movie-poster {
        width: auto;
        height: auto;
        max-width: 100px;
        height: 100%;
        border-radius: 5px;
        margin-left: 2rem;
        padding: 4px;
        background: #fff;
    }

    @media only screen and (max-width: 600px) {
        img.movie-poster {
            max-width: 80px;
            margin-left: 1.5rem;
        }
    }
</style>