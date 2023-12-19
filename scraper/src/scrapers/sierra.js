import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import * as utils from '../utils/utils.js'
import { downloadMoviePoster } from '../utils/posters.js'
import userAgentStrings from '../utils/agents.js'
import logger from '../utils/logger.js'

async function getShowings() {
    let browser

    try {
        browser = await puppeteer.launch({ headless: 'new' })
        const page = await browser.newPage()
        const url = 'https://www.sierratheaters.com/movies/Showtimes'
        await navigateToURL(page, url)
        
        let showings = []
        const dayButtons = await page.$$('button.showdate')

        for (let button of dayButtons) {
            button.click()
            const daysShowings = await getDaysShowings(page)
            showings = showings.concat(daysShowings)
        }

        logger.info(`Retrieved ${showings.length} showings from Sierra Theaters.`)
        await browser.close()
        return showings
    } catch (error) {
        logger.error('Error retrieving showings from Sierra Theaters:', error)
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

async function getDaysShowings(page) {
    await page.waitForSelector('div#loading')
    await page.waitForSelector('div.times-block')
    await utils.delay(10000)

    const pageShowings = []
    const html = await page.content()
    const $ = cheerio.load(html)
    const showdate = $('button.showdate-active').attr('data-date')
    const films = $('div.times-block')
    
    for (let film of films) {
        const $film = $(film)

        if ($film.find('div.times-info').length > 0) {
            const title = getTitle($film)
            const rating = getRating($film)
            const runtime = getRuntime($film)
            const venue = getVenue($film)
            const address = getAddress(venue)
            const date = getDate(showdate)
            const posterUrl = getPosterUrl($film)

            downloadMoviePoster(posterUrl, title + '.jpg')

            const showtimes = $(film).find('a.showtime-active')
            for (let showtime of showtimes) {
                const $showtime = $(showtime)
                const time = getTime($showtime)
                const url = getUrl($showtime)

                pageShowings.push({
                    title,
                    rating,
                    runtime,
                    venue,
                    address,
                    date,
                    time,
                    url,
                })
            }
        }
    }

    return pageShowings
}

const getTitle = film => {
    const title = film.find('span.times-title').first().text()
    return utils.removeRating(title)
}

const getRating = film => {
    const title = film.find('span.times-title').first().text()
    const regex = /\((?<rating>G|PG|PG-13|NR|UR|NC-17|R)\)/
    const match = regex.exec(title)
    return match ? match.groups.rating : null
}

const getRuntime = film => {
    const runtime = film.find('span.times-runtime').first().text()
    const runtimeFormatted = runtime.replace('Runtime:', '').replaceAll('.', '').trim()
    return runtimeFormatted
}

const getVenue = film => film.find('div.choice-house > mark').first().text()

const getDate = showdate => utils.formatDate(showdate)

const getTime = showtime => showtime.prop('children')[0].data

const getUrl = showtime => showtime.attr('href')

const getAddress = venue => {
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

    const result = locations.find(location => location.venue === venue)
    return result.address || null
}

const getPosterUrl = el => {
    const url = el.find('aside.times-side > a > img').first().attr('src')
    return url
}

export const sierra = { getShowings }
