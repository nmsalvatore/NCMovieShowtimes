import { redirect } from '@sveltejs/kit'

export function load({ url }) {
    const validPaths = ['/calendar', '/movies']
    if (!validPaths.includes(url.pathname)) {
        throw redirect(302, '/calendar')
    }
}