import got from 'got'
import * as cheerio from 'cheerio'
import * as utils from '../utils/utils.js'
import { notify } from '../utils/notify.js'


export const onyx = { getShowings }


async function getShowings() {
    try {
        // Initialize showings array
        const showings = []

        // Get link to showtimes page
        const url = 'https://theonyxtheatre.com/'
        const home = await got(url).text()
        const $home = cheerio.load(home)
        const showtimesLink = $home('a.buyTix').attr('href')
        
        // Navigate to showtimes page and load page content
        const showtimesPage = await got(showtimesLink).text()
        const $ = cheerio.load(showtimesPage)

        // Get container elements for each film
        const films = $('div.Item')

        // Loop through each film container element
        for (let film of films) {

            // Get relative path to ticket link
            const href = $(film).find('a.ViewLink')
            
            // Get elements for each showing within film container element
            const showingElements = $(film).find('span.Showing')

            // Loop through elements for each showing
            for (let element of showingElements) {

                // Exclude movies without a set date
                const classNames = element.attribs.class
                if (classNames.includes('DateTBD') || !classNames) {
                    continue
                }

                // Get film data
                const title = getTitle(element)
                const venue = getVenue(element)
                const address = getAddress(venue)
                const date = getDate(element)
                const time = getTime(element)
                const url = getURL(href)

                // Add film data to showings array
                showings.push({
                    'title': title,
                    'venue': venue,
                    'city': address,
                    'date': date,
                    'time': time,
                    'url': url,
                })
            }
        }

        console.log(`Retrieved ${showings.length} showings from The Onyx Theatre.`)

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


const getTitle = el => el.attribs['data-agl_name']


const getVenue = el => {
    const venue = el.attribs['data-agl_datesecondary']
    return venue.split(' ')[0] == 'General' ? 'The Onyx Theatre' : venue
}


const getDatetime = el => {
    const date = `${el.attribs['data-agl_date']}M`
    return new Date(date)
}


const getDate = el => {
    const datetime = getDatetime(el)
    const date = datetime.toLocaleDateString()
    return utils.formatOnyxDate(date)
}


const getTime = el => {
    const datetime = getDatetime(el)
    const time = datetime.toLocaleTimeString()
    return utils.formatTime(time)
}


const getURL = link => {
    const ROOT_URL = 'https://prod5.agileticketing.net/websales/pages/'
    const url = ROOT_URL + link.attr('href')
    return url
}

const getAddress = venue => {
    const locations = [
        {
            venue: 'The Onyx Theatre',
            address: '107 Argall Way, Nevada City, CA 95959'
        },
        {
            venue: 'Onyx Downtown',
            address: '401 Broad Street, Nevada City, CA 95959'
        }
    ]

    const result = locations.find(location => location.venue === venue)
    return result.address || null
}