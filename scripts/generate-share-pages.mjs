import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const DIST = 'dist'
const MANIFEST = join('src', 'data', 'products.json')
const SITE_URL = process.env.SITE_URL || 'https://dist-bay-iota-26.vercel.app'

async function run() {
  const ids = JSON.parse(await readFile(MANIFEST, 'utf-8'))
  const outDir = join(DIST, 'p')
  await mkdir(outDir, { recursive: true })

  for (const id of ids) {
    const name = `GHOSTTAG #${id}`
    const imageUrl = `${SITE_URL}/mockups/${id}.webp`
    const pageUrl = `${SITE_URL}/p/${id}`

    const html = `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name} — GHOSTTAG</title>
<meta property="og:title" content="${name} — GHOSTTAG Streetwear Premium">
<meta property="og:description" content="Playera de streetwear premium, edición limitada.">
<meta property="og:image" content="${imageUrl}">
<meta property="og:image:width" content="900">
<meta property="og:image:height" content="1600">
<meta property="og:url" content="${pageUrl}">
<meta property="og:type" content="product">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${name} — GHOSTTAG">
<meta name="twitter:image" content="${imageUrl}">
<meta name="theme-color" content="#0A0A0E">
<style>
body{margin:0;background:#0A0A0E;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif}
.wrap{text-align:center;padding:1rem}
img{max-width:340px;width:100%;border-radius:12px}
h1{color:#F0EDE6;font-size:1.4rem;margin:1rem 0 .5rem}
p{color:#999;font-size:.9rem;margin:0 0 1.5rem}
a{display:inline-block;background:#C8FF00;color:#0A0A0E;text-decoration:none;padding:.8rem 2rem;border-radius:8px;font-weight:600;font-size:1rem}
</style>
</head>
<body>
<div class="wrap">
<img src="${imageUrl}" alt="${name}">
<h1>${name}</h1>
<p>Streetwear Premium — Edición Limitada</p>
<a href="/">Ver toda la colección</a>
</div>
</body>
</html>`

    await writeFile(join(outDir, `${id}.html`), html)
  }

  console.log(`Generated ${ids.length} share pages in dist/p/`)
}

run().catch(err => { console.error(err); process.exit(1) })
