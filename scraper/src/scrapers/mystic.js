import got from 'got'
import * as cheerio from 'cheerio'
import * as utils from '../utils/utils.js'
import { gpt } from '../utils/gpt.js'
import { downloadMoviePoster } from '../utils/posters.js'
import userAgentStrings from '../utils/agents.js'
import logger from '../utils/logger.js'

async function getShowings() {
    try {
        const url = 'https://www.kvmr.org/venue/mystic-theater/'
        const html = await getHTML(url)
        const $ = cheerio.load(html)
        const showings = []
        const films = $('.tribe-events-calendar-list__event-row')

        for (let film of films) {
            const $film = $(film)
            const title = await getTitle($film)
            const date = getDate($film)
            const time = getTime($film)
            const url = getURL($film)
            const posterUrl = getPosterUrl($film)

            downloadMoviePoster(posterUrl, title + '.jpg')

            showings.push({
                title: title,
                venue: 'Mystic Theater',
                address: '240 Commercial Street, Nevada City, CA 95959',
                date: date,
                time: time,
                url: url
            })
        }

        logger.info(`Retrieved ${showings.length} showings from Mystic Theater.`)
        return showings
    } catch (error) {
        logger.error('Error retrieving showings from The Mystic Theater:', error)
        throw error
    }
}

async function getHTML(url) {
    const userAgentStringsRandomized = utils.shuffle(userAgentStrings)
    for (let index in userAgentStringsRandomized) {
        try {
            const string = userAgentStringsRandomized[index]
            const options = { headers: { 'User-Agent': string }}
            const html = await got(url, options).text()
            logger.info(`Successfully connected to ${url}`)
            return html
        } catch (error) {
            logger.error(`Failed to connect to ${url}:`, error)
            if (index == userAgentStrings.length-1) {
                throw error
            } else {
                continue
            }
        }
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

export const mystic = { getShowings }
