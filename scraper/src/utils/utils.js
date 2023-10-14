import 'dotenv/config'


export function removeRating(title) {
    return title.replace(/ \(?(G|PG|PG-13|R|NC-17|NR|\d+)?\)?$/, '')
}


export function formatTime(time) {
    const dayPeriod = time.slice(7)
    const hour = Number(time[0])

    if (hour < 10) {
        return time.slice(0, 4) + dayPeriod
    } else if (hour >= 10) {
        return time.slice(0, 5) + dayPeriod
    } else {
        return null
    }
}


export function formatDate(date) {
    let [year, month, day] = date.split('-')

    if (Number(month) < 10) {
        month = '0' + Number(month)
    }

    if (Number(day) < 10) {
        day = '0' + Number(day)
    }

    return `${month}/${day}/${year}`
}


export function formatOnyxDate(date) {
    let [month, day, year] = date.split('/')

    if (Number(month) < 10) {
        month = '0' + Number(month)
    }

    if (Number(day) < 10) {
        day = '0' + Number(day)
    }

    return `${month}/${day}/${year}`
}


export function capitalize(str) {
    if (typeof str !== 'string') {
        throw new TypeError('Expected a string')
    }
  
    return str.toLowerCase().replace(/\b\p{L}/gu, function(match) {
        return match.toUpperCase()
    })
}
