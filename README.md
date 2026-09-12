# Januar Maksum Portfolio

A Vue and Vite portfolio for Januar Maksum, Frontend Engineer.

## Deploying to Vercel

Set `SITE_URL` in **Vercel → Project Settings → Environment Variables** for the **Production** environment. Its value must be the final HTTPS origin only, for example `https://your-project.vercel.app` (no trailing path, query, or hash).

Production builds require `SITE_URL` and generate indexable metadata, `/robots.txt`, and `/sitemap.xml`. Preview deployments and local builds are deliberately `noindex` and have no production canonical URL or sitemap.

After deploying, inspect the rendered page source and confirm that canonical, Open Graph, Twitter Card, and JSON-LD URLs use the production domain. Refresh social previews with LinkedIn Post Inspector or Facebook Sharing Debugger after the public URL is available.
