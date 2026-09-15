import { createClient } from '@sanity/client'
import * as fs from 'fs'
import * as path from 'path'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const parts = line.split('=')
    if (parts.length >= 2) {
      const key = parts[0].trim()
      const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '')
      process.env[key] = value
    }
  })
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'djdiiitp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-02-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function uploadNdjson() {
  const ndjsonPath = path.resolve(process.cwd(), 'studio/data.ndjson')
  if (!fs.existsSync(ndjsonPath)) {
    console.error('data.ndjson not found')
    return
  }

  const lines = fs.readFileSync(ndjsonPath, 'utf8').split('\n')
  for (const line of lines) {
    if (!line.trim()) continue
    try {
      const doc = JSON.parse(line)
      // Add Navbar and Footer and page contents if not present in ndjson
      await client.createOrReplace(doc)
      console.log(`Imported: ${doc._id} (${doc._type})`)
    } catch (err) {
      console.error(`Failed line: ${err.message}`)
    }
  }

  // Also create Navbar, Footer, homePage, blogPage documents
  try {
    await client.createOrReplace({
      _id: 'navbar-settings',
      _type: 'navbar',
      title: 'Main Website Navbar',
      announcementText: 'Complimentary White-Glove Shipping on Orders Over $150 · Hand-Poured in Provence',
      navLinks: [
        { label: 'Collection', url: '#shop' },
        { label: 'Ritual', url: '#ritual' },
        { label: 'Sanctuary', url: '#about' },
        { label: 'Journal', url: '#journal' },
      ],
    })
    console.log('Created: navbar-settings')

    await client.createOrReplace({
      _id: 'footer-settings',
      _type: 'footer',
      title: 'Main Website Footer',
      brandTagline: 'Scents and spaces designed for slower moments. Hand-poured in Grasse and Aix-en-Provence.',
      copyrightText: '© 2026 Oryenna Atelier de Parfum. All Rights Reserved.',
      footerColumns: [
        {
          columnTitle: 'Atelier',
          links: [
            { label: 'Our Story', url: '#about' },
            { label: 'Grasse Heritage', url: '#ritual' },
          ],
        },
        {
          columnTitle: 'Client Care',
          links: [
            { label: 'Shipping & Transit', url: '/checkout' },
            { label: 'Returns & Calm Guarantee', url: '#' },
          ],
        },
      ],
    })
    console.log('Created: footer-settings')

    await client.createOrReplace({
      _id: 'home-page-content',
      _type: 'homePage',
      title: 'Homepage',
      heroEyebrow: 'Atelier de Parfum d\'Intérieur',
      heroHeading: 'Silence. Light. Scent.',
      heroDescription: 'Hand-poured candles and quiet room fragrances crafted in Provence from wild botanicals and organic beeswax.',
      heroCtaText: 'Explore Winter Solstice Release',
    })
    console.log('Created: home-page-content')

    await client.createOrReplace({
      _id: 'blog-page-content',
      _type: 'blogPage',
      title: 'Journal & Stories',
      eyebrow: 'Atelier Chronicles',
      introText: 'Reflections on slow living, botanical extraction in Grasse, and the architecture of stillness.',
    })
    console.log('Created: blog-page-content')

  } catch (e) {
    console.error('Error creating custom layout docs:', e.message)
  }
}

uploadNdjson()
