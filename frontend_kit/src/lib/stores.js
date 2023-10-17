import { writable } from 'svelte/store'
import { getTodayDateString } from './helpers/dates.js'

const today = getTodayDateString()

export const activeRouteID = writable(null)
export const activeDate = writable(today)
