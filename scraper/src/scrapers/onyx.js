import puppeteer from 'puppeteer'
import * as cheerio from 'cheerio'
import * as utils from '../utils/utils.js'
import { notify } from '../utils/notify.js'


export const onyx = { getShowings }

async function getShowings() {
    const browser = await puppeteer.launch({ headless: 'new' })

    try {
        // Initialize showings array
        let showings = []

        // Navigate to showtimes page
        const page = await browser.newPage()
        const url = 'https://theonyxtheatre.com/showtimes'
        await page.goto(url)

        // Collect all showdate buttons
        await page.waitForSelector('[data-role="card"]', { visible: true })
        await new Promise(r => setTimeout(r, 5000))
        const dateButtons = await page.$$('.css-68am72')
        
        for (const button of dateButtons) {
            // Click date button
            button.click()

            // Wait 5 seconds for page to load
            await new Promise(r => setTimeout(r, 5000))

            // Get showings data for each day
            const daysShowings = await getDaysShowingsData(page, button)

            // Concatenate showings array
            showings = showings.concat(daysShowings)
        }

        console.log(`Retrieved ${showings.length} showings from The Onyx Theatre.`)

        // Close browser
        await browser.close()

        // Return showings array
        return showings

    } catch(error) {
        console.error(error)

        notify.sendEmail(
            'Web Scraper Error: The Onyx Theatre', `
            <p>An error occurred:<p>
            <pre>${error.message}</pre>
            <p>Please view the systemd journal for error details.</p>`
        )

        return []
    }
}

const getDaysShowingsData = async (page, button) => {
    // Initialize showings array for page
    const pageShowings = []

    // Load cheerio wrapper for page content
    const html = await page.content()
    const $ = cheerio.load(html)

    // Get container element for all movies on page
    const movies = $('div.css-1hrrla4')

    for (const movie of movies) {
        // Apply cheerio wrapper to movie container element
        const $movie = $(movie)

        // Get movie-specific data
        const title = getTitle($movie)
        const date = getShowdate($movie)
        const venue = getVenue($movie)
        const address = getAddress(venue)

        // Get showtimes
        const showtimes = getShowtimes($movie)
        for (let showtime of showtimes) {

            // Apply cheerio wrapper to showtime element
            const $showtime = $(showtime)

            // Get time-specific data
            const time = getTime($showtime)
            const url = getURL($showtime)

            // Add film data to showings array for page
            pageShowings.push({
                title,
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
    const regex = /Onyx Theatre|Nevada Theatre/
    const match = venueBlurb.match(regex)
    const venue = 'The ' + match[0]
    return venue
}

const getShowdate = el => {
    const scheduleHeading = el.find('h4.scheduleHeading').first().text()
    const today = new Date()
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

    // const showtimes = []

    // times.each(function() {
    //     const href = this.attribs.href;
    //     const timeString = $(this).text();

    //     if (timeString) {
    //         showtimes.push(timeString)
    //     }
    // });

    // return showtimes



// -------------------------------------------------


const getDatetime = el => {
    const date = `${el.attribs['data-agl_date']}M`
    return new Date(date)
}


const getDate = el => {
    const datetime = getDatetime(el)
    const date = datetime.toLocaleDateString()
    return utils.formatOnyxDate(date)
}


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