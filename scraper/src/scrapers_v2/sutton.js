import { downloadMoviePoster } from "../utils/posters.js";

async function getSchedule() {
    const movieIdsAsString = await getMovieIdsAsString();
    const startDate = getStartDate();
    const endDate = getEndDate();

    const response = await fetch(
        "https://www.prime-cinemas.com/api/gatsby-source-boxofficeapi/schedule",
        {
            credentials: "include",
            referrer:
                "https://www.prime-cinemas.com/showtimes/g0241-prime-cinemas-sutton/",
            body: `{"circuit":null,"theaters":[{"id":"G0241","timeZone":"America/Los_Angeles"}],"movieIds":${movieIdsAsString},"from":"${startDate}","to":"${endDate}","nin":[],"sin":[],"websiteId":"V2Vic2l0ZU1hbmFnZXJXZWJzaXRlOjZkZmVkZWQzLTc5MDUtNGY3ZS05M2JiLWFkOWZjOTk0ZDFhMA=="}`,
            method: "POST",
            mode: "cors",
        },
    );

    const data = await response.json();
    const dates = await data.G0241.schedule;
    return dates;
}

async function getSuttonShowings() {
    const schedule = await getSchedule();
    const showings = [];

    for (const id in schedule) {
        const movieShowtimesByDate = await schedule[id];

        for (const movieDate in movieShowtimesByDate) {
            const daysMovieShowtimeData = await movieShowtimesByDate[movieDate];

            for (const showtimeData of daysMovieShowtimeData) {
                const title = await getMovieTitleById(id);
                const venue = "Prime Cinemas Sutton";
                const address = "399 Sutton Way, Grass Valley, CA 95945";
                const time = await getMovieTime(showtimeData);
                const url = await getShowingUrl(showtimeData);
                const poster = await getMoviePoster(id);
                const rating = await getMovieRating(id);
                const runtime = await getMovieRuntime(id);
                const synopsis = await getMovieSynopsis(id);
                const date = formatDate(movieDate);

                downloadMoviePoster(poster, title + ".jpg");

                const showing = {
                    title,
                    rating,
                    runtime,
                    synopsis,
                    venue,
                    address,
                    date,
                    time,
                    url,
                    poster,
                };

                showings.push(showing);
            }
        }
    }

    return showings;
}

async function getMovieNodes() {
    const response = await fetch(
        "https://www.prime-cinemas.com/page-data/sq/d/1945441818.json",
    );
    const data = await response.json();
    const nodes = await data.data.allMovie.nodes;
    return nodes;
}

async function getMovieIds() {
    const nodes = await getMovieNodes();
    const ids = await nodes.map((node) => node.id);
    return ids;
}

async function getMovieIdsAsString() {
    const ids = await getMovieIds();
    const idsAsString = JSON.stringify(ids);
    return idsAsString;
}

async function getMovieInfoById(id) {
    const nodes = await getMovieNodes();

    for (const node of nodes) {
        if (node.id === id) {
            return node;
        }
    }

    throw Error(`Could not find movie with id ${id}`);
}

async function getMovieTitleById(id) {
    const info = await getMovieInfoById(id);
    return info.title;
}

async function getShowingUrl(data) {
    const url = data.data.ticketing[0].urls[0];
    return url;
}

async function getMoviePoster(id) {
    const info = await getMovieInfoById(id);
    const url = info.poster;

    if (url.startsWith("http")) {
        return url;
    }

    const root = "http://all.web.img.acsta.net/";
    return root + url;
}

async function getMovieSynopsis(id) {
    const info = await getMovieInfoById(id);
    return info.synopsis;
}

async function getMovieRating(id) {
    const info = await getMovieInfoById(id);
    return info.certificate;
}

async function getMovieRuntime(id) {
    const info = await getMovieInfoById(id);
    const seconds = info.runtime;
    const hours = Math.floor(seconds / (60 * 60));
    const remainingSeconds = seconds % (60 * 60);
    const minutes = Math.floor(remainingSeconds / 60);
    const runtime = `${hours} hr ${minutes} min`;
    return runtime;
}

async function getMovieTime(data) {
    const time = await data.startsAt.split("T")[1];
    let [hours, mins] = time.split(":");
    let period = "PM";

    hours = Number(hours);
    if (hours > 12) {
        hours -= 12;
    } else if (hours < 12) {
        period = "AM";
    }

    return `${hours}:${mins} ${period}`;
}

function getTodayFormatted() {
    const date = new Date();
    const today = date.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    });
    return today;
}

function getStartDate() {
    const today = getTodayFormatted();
    const [month, day, year] = today.split("/");
    const startDate = `${year}-${month}-${day}T03:00:00`;
    return startDate;
}

function getEndDate() {
    const today = getTodayFormatted();
    const [month, day, year] = today.split("/");
    const nextYear = Number(year) + 1;
    const endDate = `${nextYear}-${month}-${day}T03:00:00`;
    return endDate;
}

function formatDate(date) {
    const [year, month, day] = date.split("-");
    return `${month}/${day}/${year}`;
}

export default getSuttonShowings;
