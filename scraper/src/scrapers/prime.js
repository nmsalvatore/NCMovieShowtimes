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
        const url = 'https://prime-cinemas.com/showtimes'
        await navigateToURL(page, url)

        const delOroShowings = await getTheaterShowings(page, 'Del Oro')
        const suttonShowings = await getTheaterShowings(page, 'Sutton')
        const showings = [].concat(delOroShowings, suttonShowings)
        
        logger.info(`Retrieved ${showings.length} showings from Prime Cinemas.`)
        await browser.close()

        if (showings.length === 0) {
            const error = 'Failed to retrieve showings from The Onyx Theatre'
            logger.error(error)
            throw new Error(error)
        }
        
        return showings
    } catch(error) {
        logger.error('Error retrieving showings from Prime Cinemas')
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

async function getTheaterShowings(page, theaterName) {
    let showings = []

    await selectTheater(page, theaterName)
    const dateButtons = await getDateButtons(page)

    for (const button of dateButtons) {
        await checkForCookiePrompt(page)
        await button.click()
        await utils.delay(10000)
        const daysShowings = await getDaysShowingsData(page, theaterName)
        showings = showings.concat(daysShowings)
    }

    return showings
}

async function selectTheater(page, theaterName) {
    // Get select location button
    await page.waitForSelector('.css-totqjd', { visible: true })
    await utils.delay(5000)
    const selectLocationButton = await page.$('.css-totqjd')
    selectLocationButton.click()
    await utils.delay(5000)

    // Click button for given theater
    const theaterOptions = await page.$$('button')
    for (const option of theaterOptions) {
        const optionText = await page.evaluate(el => el.textContent, option)

        if (optionText.includes(theaterName)) {
            option.click()
        }
    }

    await utils.delay(5000)
}

async function getDateButtons(page) {
    await page.waitForSelector('[data-role="card"]', { visible: true })
    await utils.delay(5000)
    return await page.$$('.css-hj4bhw')
}

async function checkForCookiePrompt(page) {
    const agreeButton = await page.$('#didomi-notice-agree-button')
    if (agreeButton) {
        await agreeButton.click()
    }
}

async function getDaysShowingsData(page, theaterName) {
    const pageShowings = []
    const html = await page.content()
    const $ = cheerio.load(html)
    const movies = $('div.css-1hrrla4')

    for (const movie of movies) {
        const $movie = $(movie)

        const title = getTitle($movie)
        const date = getShowdate($movie)
        const address = getAddress(theaterName)
        const rating = getRating($movie)
        const runtime = getRuntime($movie)
        const venue = getVenue(theaterName)
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

const getShowtimes = el => el.find('.css-1trjsle')

const getTime = el => el.text()

const getURL = el => el.attr().href

const getAddress = theaterName => {
    const locations = [
        {
            venue: 'Del Oro Theatre',
            address: '165 Mill Street, Grass Valley, CA 95945'
        },
        {
            venue: 'Sutton Cinemas',
            address: '399 Sutton Way, Grass Valley, CA 95945'
        }
    ]

    const result = locations.find(location => location.venue.includes(theaterName))
    return result.address || null
}

const getVenue = name => {
    const venues = ['Del Oro Theatre', 'Sutton Cinemas']
    return venues[0].includes(name) ? venues[0] : venues[1]
}

const getRating = el => {
    const specs = el.find('div.css-1ilu45h').first().text().split('•')
    const regex = /G|PG|PG-13|NR|UR|NC-17|R/

    for (let item of specs) {
        if (item.match(regex)) {
            return item
        }
    }
}

const getRuntime = el => {
    const specs = el.find('div.css-1ilu45h').first().text().split('•')
    const regex = /hr|min/

    for (let item of specs) {
        if (item.match(regex)) {
            return item
        }
    }
}

const getPosterUrl = el => {
    const url = el.find('.css-bi7rho').first().attr('src')
    return url
}

export const prime = { getShowings }
