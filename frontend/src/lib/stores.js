import { writable } from 'svelte/store'

export const activeRouteID = writable(null)
export const activeDate = writable(null)
export const renderShowings = writable(false)
export const now = writable(null)