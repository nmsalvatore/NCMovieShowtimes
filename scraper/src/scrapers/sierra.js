import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import * as utils from '../utils/utils.js'
import { notify } from '../utils/notify.js'


export const sierra = { getShowings }


async function getShowings() {
    // Launch headless browser
    const browser = await puppeteer.launch({ headless: 'new' })

    try {
        // Initialize showings array
        let showings = []

        // Navigate to showtimes page
        const page = await browser.newPage()
        await page.goto('https://www.sierratheaters.com/movies/Showtimes')

        // Gather all showdate buttons
        const dayButtons = await page.$$('button.showdate')

        // Loop through each showdate button
        for (let button of dayButtons) {

            // Click each button
            button.click()

            // Get showing data for each page
            const daysShowings = await getDaysShowings(page)
            showings = showings.concat(daysShowings)
        }

        await browser.close()
        console.log(`Retrieved ${showings.length} showings from Sierra Theaters.`)

        return showings

    } catch (error) {
        await browser.close()
        console.error(error)

        notify.sendEmail(
            'Web Scraper Error: Sierra Theaters', `
            <p>An error occurred:<p>
            <pre>${error.message}</pre>
            <p>Please view the systemd journal for error details.</p>`
        )

        return []
    }
}

async function getDaysShowings(page) {
    // Wait for page content to fully render
    await page.waitForSelector('div#loading')
    await page.waitForSelector('div.times-block')
    await new Promise(r => setTimeout(r, 2000))

    // Initialize showings array for page
    const pageShowings = []

    // Load cheerio wrapper for page content
    const html = await page.content()
    const $ = cheerio.load(html)

    // Get container elements for all films on page
    const showdate = $('button.showdate-active').attr('data-date')
    const films = $('div.times-block')
    
    // Loop through each container element
    for (let film of films) {

        // Apply cheerio wrapper to film container element
        const $film = $(film)

        // Exclude elements without times-info class
        if ($film.find('div.times-info').length > 0) {

            // Get film-specific data
            const title = getTitle($film)
            const venue = getVenue($film)
            const date = getDate(showdate)

            // Get all showtimes for film
            const showtimes = $(film).find('a.showtime-active')

            // Loop through each showtime
            for (let showtime of showtimes) {

                // Apply cheerio wrapper to showtime element
                const $showtime = $(showtime)

                // Get time-specific data
                const time = getTime($showtime)
                const url = getUrl($showtime)

                // Add film data to showings array for page
                pageShowings.push({
                    title: title,
                    venue: venue,
                    city: 'Grass Valley',
                    date: date,
                    time: time,
                    url: url,
                })
            }
        }
    }

    // Return showings for page
    return pageShowings
}


const getTitle = film => {
    const title = film.find('span.times-title').first().text()
    return utils.removeRating(title)
}


const getVenue = film => film.find('div.choice-house > mark').first().text()


const getDate = showdate => utils.formatDate(showdate)


const getTime = showtime => showtime.prop('children')[0].data


const getUrl = showtime => showtime.attr('href')