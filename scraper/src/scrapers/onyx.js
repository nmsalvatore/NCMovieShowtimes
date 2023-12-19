import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import * as utils from '../utils/utils.js'
import { downloadMoviePoster } from '../utils/posters.js'
import userAgentStrings from '../utils/agents.js'
import logger from '../utils/logger.js'
import 'dotenv/config'

async function getShowings() {
    let browser

    try {
        browser = await puppeteer.launch({ headless: 'new' })
        const page = await browser.newPage()
        const url = 'https://theonyxtheatre.com/showtimes'
        await navigateToURL(page, url)
        
        let showings = []
        const dateButtons = await getDateButtons(page)

        for (const button of dateButtons) {
            await checkForCookiePrompt(page)
            await button.click()
            await utils.delay(10000)
            const daysShowings = await getDaysShowingsData(page)
            showings = showings.concat(daysShowings)
        }

        logger.info(`Retrieved ${showings.length} showings from The Onyx Theatre.`)
        await browser.close()
        return showings
    } catch(error) {
        logger.error('Error retrieving showings from The Onyx Theatre:', error)
        await browser.close()
        throw error
    }
}

async function navigateToURL(page, url) {
    const userAgentStringsRandomized = utils.shuffle(userAgentStrings)
    for (let index in userAgentStringsRandomized) {
        try {
            const string = userAgentStringsRandomized[index]
            await page.setUserAgent(string)
            await page.goto(url, { timeout: 60000 })
            logger.info(`Successfully connected to ${url}`)
            break
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

async function getDateButtons(page) {
    await page.waitForSelector('[data-role="card"]', { visible: true })
    await utils.delay(5000)
    return await page.$$('.css-68am72')
}

async function checkForCookiePrompt(page) {
    const agreeButton = await page.$('#didomi-notice-agree-button')
    if (agreeButton) {
        await agreeButton.click()
    }
}

async function getDaysShowingsData(page) {
    const pageShowings = []
    const html = await page.content()
    const $ = cheerio.load(html)
    const movies = $('div.css-1hrrla4')

    for (const movie of movies) {
        const $movie = $(movie)
        const title = getTitle($movie)
        const date = getShowdate($movie)
        const venue = getVenue($movie)
        const address = getAddress(venue)
        const rating = getRating($movie)
        const runtime = getRuntime($movie)
        const posterUrl = getPosterUrl($movie)

        downloadMoviePoster(posterUrl, title + '.jpg')

        const showtimes = getShowtimes($movie)
        for (let showtime of showtimes) {
            const $showtime = $(showtime)
            const time = getTime($showtime)
            const url = getURL($showtime)

            pageShowings.push({
                title,
                rating,
                runtime,
                venue,
                address,
                date,
                time,
                url
            })
        }
    }

    return pageShowings
}

const getTitle = el => el.find('a.css-erexzk').first().attr('title')

const getVenue = el => {
    const venueBlurb = el.find('.css-93dbvy').first().text()
    let venue = 'The Onyx Theatre'

    if (venueBlurb) {
        const regex = /Onyx Theatre|Nevada Theatre/
        const match = venueBlurb.match(regex)
        venue = 'The ' + match[0]
    }

    return venue
}

const getShowdate = el => {
    const scheduleHeading = el.find('h4.scheduleHeading').first().text()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const todayDateString = utils.convertToLosAngelesDateString(today)
    const tomorrowDateString = utils.convertToLosAngelesDateString(tomorrow)

    let showdate

    switch(scheduleHeading) {
        case 'Today':
            showdate = todayDateString
            break
        case 'Tomorrow':
            showdate = tomorrowDateString
            break
        default:
            showdate = utils.formatOnyxDate(scheduleHeading)
    }

    return showdate
}

const getShowtimes = el => el.find('a.css-1ouxaa0');

const getTime = el => el.text()

const getURL = el => el.attr().href

const getAddress = venue => {
    const locations = [
        {
            venue: 'The Onyx Theatre',
            address: '107 Argall Way, Nevada City, CA 95959'
        },
        {
            venue: 'The Nevada Theatre',
            address: '401 Broad Street, Nevada City, CA 95959'
        }
    ]

    const result = locations.find(location => location.venue === venue)
    return result.address || null
}

const getRating = el => {
    const rating = el.find('div.css-uyt4dk').first().text();
    const regex = /G|PG|PG-13|NR|UR|NC-17|R/
    const match = rating.match(regex)

    if (match) {
        return rating
    }
}

const getRuntime = el => {
    const first = el.find('div.css-uyt4dk').first().text().replace('•', '').trim()
    const next = el.find('div.css-uyt4dk').next().text().replace('•', '').trim()
    const regex = /hr|min/

    let runtime
    
    if (first.match(regex)) {
        runtime = first
    } else if (next.match(regex)) {
        runtime = next
    }

    return runtime
}

const getPosterUrl = el => {
    const url = el.find('.css-bi7rho').first().attr('src')
    return url
}

export const onyx = { getShowings }
