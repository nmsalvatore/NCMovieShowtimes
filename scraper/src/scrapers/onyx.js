import { downloadMoviePoster } from "../utils/posters.js";

async function getSchedule() {
    const movieIdsAsString = await getMovieIdsAsString();
    const startDate = getStartDate();
    const endDate = getEndDate();
    const bodyString = `{"circuit":null,"theaters":[{"id":"X065X","timeZone":"America/Los_Angeles"}],"movieIds":${movieIdsAsString},"from":"${startDate}","to":"${endDate}","nin":[],"sin":[],"websiteId":"V2Vic2l0ZU1hbmFnZXJXZWJzaXRlOjhmNzhiNTE3LTlhZjUtNDEzZi04ZWU0LWVjYzNlNmI3NmI0Zg=="}`;

    const response = await fetch(
        "https://www.theonyxtheatre.com/api/gatsby-source-boxofficeapi/schedule",
        {
            credentials: "include",
            referrer: "https://www.theonyxtheatre.com/showtimes/",
            body: bodyString,
            method: "POST",
            mode: "cors",
        },
    );

    const data = await response.json();
    const dates = await data.X065X.schedule;
    return dates;
}

async function getOnyxShowings() {
    const showings = [];

    const schedule = await getSchedule();
    for (const id in schedule) {
        const movieShowtimesByDate = await schedule[id];

        for (const movieDate in movieShowtimesByDate) {
            const daysMovieShowtimeData = await movieShowtimesByDate[movieDate];

            for (const showtimeData of daysMovieShowtimeData) {
                const title = await getMovieTitleById(id);
                const venue = await getMovieVenue(showtimeData);
                const address = await getAddress(venue);
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
        "https://cms-assets.webediamovies.pro/prod/the-onyx-theatre/669879108762661ea59669ae/public/page-data/sq/d/1443148036.json",
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

async function getMovieVenue(data) {
    const tags = await data.tags;
    const venuesByTag = {
        "Showtime.Restriction.Adults": "The Onyx Theatre",
        "Auditorium.Experience.TraditionalAuditorium":
            "Onyx Downtown at the Nevada Theatre",
    };

    const tag = tags[0];
    if (tag in venuesByTag) {
        return venuesByTag[tag];
    }

    throw Error(
        `Could not identify venue for movie with id ${data.id.split("-")[0]}`,
    );
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

function getAddress(venue) {
    const addresses = {
        "The Onyx Theatre": "107 Argall Way, Nevada City, CA 95959",
        "Onyx Downtown at the Nevada Theatre":
            "401 Broad Street, Nevada City, CA 95959",
    };

    if (venue in addresses) {
        return addresses[venue];
    }

    throw Error("Could not retrieve venue address");
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

export default getOnyxShowings;
