import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { getSeoConfig } from './seo.mjs'

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = path.join(rootDirectory, 'dist')
const config = getSeoConfig()

await mkdir(outputDirectory, { recursive: true })

const robots = config.indexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${config.siteUrl}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n'

await writeFile(path.join(outputDirectory, 'robots.txt'), robots)

if (config.indexable) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${config.siteUrl}/</loc>\n  </url>\n</urlset>\n`
  await writeFile(path.join(outputDirectory, 'sitemap.xml'), sitemap)
}
