export async function GET() {
    const today = new Date().toISOString().split('T')[0]

    return new Response(
`<?xml version="1.0" encoding="UTF-8" ?>
<urlset
    xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="https://www.w3.org/1999/xhtml"
    xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
>
    <url>
        <loc>https://ncmovies.info/calendar</loc>
        <lastmod>${ today }</lastmod>
    </url>
    <url>
        <loc>https://ncmovies.info/movies</loc>
        <lastmod>${ today }</lastmod>
    </url>
</urlset>`
    )
  }
  