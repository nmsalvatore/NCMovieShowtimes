import { fetchShowings } from '$lib/db'

export async function load({ params }) {
    const route = params.date
    const year = route.slice(0, 4)
    const month = route.slice(4, 6)
    const day = route.slice(6, 8)
    const date = `${month}/${day}/${year}`
    const showings = await fetchShowings(date)

    return { showings }
}