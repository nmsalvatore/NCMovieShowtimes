import got from 'got'
import * as cheerio from 'cheerio'
import * as utils from '../utils/utils.js'
import { notify } from '../utils/notify.js'
import { gpt } from '../utils/gpt.js'
import { downloadMoviePoster } from '../utils/posters.js'


export const mystic = { getShowings }


async function getShowings() {
    try {
        
        // Initialize showings array
        const showings = []

        // Load page content
        const url = 'https://www.kvmr.org/venue/mystic-theater/'
        const html = await got(url).text()
        const $ = cheerio.load(html)

        // Get element container for all films
        const films = $('.tribe-events-calendar-list__event-row')
        
        // Loop through each film container
        for (let film of films) {

            // Apply cheerio wrapper to film element container
            const $film = $(film)

            // Get film data
            const title = await getTitle($film)
            const date = getDate($film)
            const time = getTime($film)
            const url = getURL($film)
            const posterUrl = getPosterUrl($film)

            downloadMoviePoster(posterUrl, title + '.jpg')

            // Add film data to showings array
            showings.push({
                title: title,
                venue: 'Mystic Theater',
                address: '240 Commercial Street, Nevada City, CA 95959',
                date: date,
                time: time,
                url: url
            })
        }

        console.log(`Retrieved ${showings.length} showings from Mystic Theater.`)

        // Return showings array
        return showings

    } catch (error) {
        console.error(error)

        notify.sendEmail(
            'Web Scraper Error: Mystic Theater', `
            <p>An error occurred:<p>
            <pre>${error.message}</pre>
            <p>Please view the systemd journal for error details.</p>`
        )

        return []
    }
}


const getTitle = async film => {
    const titleStr = film.find('.tribe-events-calendar-list__event-title').first().text()
    const title = await gpt.getMovieTitle(titleStr)
    return utils.capitalize(title)
}


const getDate = film => {
    const dateStr = film.find('time.tribe-events-calendar-list__event-datetime').first().attr('datetime')
    return utils.formatDate(dateStr)
}


const getTime = film => {
    const datetime = film.find('.tribe-event-date-start').first().text()
    const date = new Date(datetime)
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    return time
}


const getURL = film => film.find('.tribe-events-calendar-list__event-title-link').first().attr('href')


const getPosterUrl = el => {
    const url = el.find('.tribe-events-calendar-list__event-featured-image').first().attr('src')
    return url
}
