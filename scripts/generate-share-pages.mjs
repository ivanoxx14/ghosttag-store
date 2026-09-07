import sharp from 'sharp'
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises'
import { join } from 'node:path'

const DIST = 'dist'
const MANIFEST = join('src', 'data', 'products.json')
const WEBP_DIR = join('public', 'mockups')
const SITE_URL = process.env.SITE_URL || 'https://dist-bay-iota-26.vercel.app'

async function run() {
  const ids = JSON.parse(await readFile(MANIFEST, 'utf-8'))
  const pagesDir = join(DIST, 'p')
  const thumbsDir = join(DIST, 'thumb')
  await mkdir(pagesDir, { recursive: true })
  await mkdir(thumbsDir, { recursive: true })

  let thumbCount = 0

  for (const id of ids) {
    const name = `GHOSTTAG #${id}`
    const thumbPath = join(thumbsDir, `${id}.jpg`)
    const webpPath = join(WEBP_DIR, `${id}.webp`)

    const thumbExists = await stat(thumbPath).catch(() => null)
    if (!thumbExists) {
      try {
        await sharp(webpPath)
          .resize({ width: 600, withoutEnlargement: true })
          .jpeg({ quality: 80 })
          .toFile(thumbPath)
        thumbCount++
      } catch (err) {
        console.error(`  Thumb error ${id}: ${err.message}`)
      }
    }

    const thumbUrl = `${SITE_URL}/thumb/${id}.jpg`
    const pageUrl = `${SITE_URL}/p/${id}`

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — GHOSTTAG</title>
<meta property="og:title" content="${name}">
<meta property="og:site_name" content="GHOSTTAG Streetwear Premium">
<meta property="og:description" content="Playera streetwear premium, edición limitada. Pide la tuya por WhatsApp.">
<meta property="og:image" content="${thumbUrl}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="600">
<meta property="og:image:height" content="1067">
<meta property="og:url" content="${pageUrl}">
<meta property="og:type" content="product">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${name} — GHOSTTAG">
<meta name="twitter:image" content="${thumbUrl}">
<meta name="theme-color" content="#0A0A0E">
<style>
*{margin:0;box-sizing:border-box}
body{background:#0A0A0E;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'Segoe UI',system-ui,sans-serif}
.wrap{text-align:center;padding:1.5rem;max-width:400px}
img{width:100%;border-radius:12px;aspect-ratio:9/16;object-fit:cover}
h1{color:#F0EDE6;font-size:1.5rem;margin:1.2rem 0 .4rem;letter-spacing:.02em}
p{color:#888;font-size:.9rem;margin:0 0 1.5rem}
a{display:inline-block;background:#C8FF00;color:#0A0A0E;text-decoration:none;padding:.75rem 2rem;border-radius:8px;font-weight:600;font-size:.95rem}
a:hover{filter:brightness(1.1)}
</style>
</head>
<body>
<div class="wrap">
<img src="/mockups/${id}.webp" alt="${name}">
<h1>${name}</h1>
<p>Streetwear Premium — Edición Limitada</p>
<a href="${SITE_URL}">Ver toda la colección</a>
</div>
</body>
</html>`

    await writeFile(join(pagesDir, `${id}.html`), html)
  }

  console.log(`Generated ${ids.length} share pages, ${thumbCount} new thumbnails`)
}

run().catch(err => { console.error(err); process.exit(1) })
