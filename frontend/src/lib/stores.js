import { writable } from 'svelte/store'

export const activeRouteID = writable(null)
export const activeCalendarPath = writable(null)
export const activeDate = writable(null)
export const renderShowings = writable(false)