import { writable } from 'svelte/store'

export const activeRouteID = writable(null)
export const activeDate = writable(null)
export const windowWidth = createWindowWidthStore()

function createWindowWidthStore() {
    const { subscribe, set } = writable(0)

    if (typeof window !== 'undefined') {
        set(window.innerWidth)

        window.addEventListener('resize', () => {
            set(window.innerWidth)
        })
    }

    return { subscribe }
}
