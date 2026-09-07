import sharp from 'sharp'
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises'
import { join, extname, basename } from 'node:path'

const MOCKUP_DIR = 'Mockup'
const OUTPUT_DIR = join('public', 'mockups')
const MANIFEST_PATH = join('src', 'data', 'products.json')
const MAX_WIDTH = 900
const WEBP_QUALITY = 82
const VALID_EXT = new Set(['.png', '.jpg', '.jpeg'])

async function run() {
  const dirExists = await stat(MOCKUP_DIR).catch(() => null)
  if (!dirExists) {
    console.log('Mockup/ folder not found — skipping optimization (using pre-built assets)')
    return
  }

  await mkdir(OUTPUT_DIR, { recursive: true })
  await mkdir(join('src', 'data'), { recursive: true })

  const files = (await readdir(MOCKUP_DIR))
    .filter(f => VALID_EXT.has(extname(f).toLowerCase()))
    .sort((a, b) => parseInt(a) - parseInt(b))

  console.log(`Found ${files.length} mockups to optimize`)

  const ids = []
  let created = 0
  let skipped = 0

  for (const file of files) {
    const id = basename(file, extname(file))
    ids.push(id)
    const src = join(MOCKUP_DIR, file)
    const dest = join(OUTPUT_DIR, `${id}.webp`)

    try {
      const destStat = await stat(dest).catch(() => null)
      const srcStat = await stat(src)
      if (destStat && destStat.mtimeMs >= srcStat.mtimeMs) {
        skipped++
        continue
      }
    } catch {}

    try {
      await sharp(src)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(dest)
      created++
      if (created % 10 === 0) console.log(`  ${created} optimized...`)
    } catch (err) {
      console.error(`  Error: ${file}: ${err.message}`)
    }
  }

  await writeFile(MANIFEST_PATH, JSON.stringify(ids), 'utf-8')
  console.log(`Done: ${created} created, ${skipped} skipped, ${ids.length} products in manifest`)
}

run().catch(err => { console.error(err); process.exit(1) })
