import { revalidatePath } from 'next/cache'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  let body: { _type?: string; slug?: string | { current?: string } }
  try {
    body = await request.json()
  } catch {
    return Response.json({ message: 'Invalid JSON body' }, { status: 400 })
  }

  const _type = body._type
  const slug =
    typeof body.slug === 'string'
      ? body.slug
      : typeof body.slug === 'object' && body.slug !== null
        ? body.slug.current
        : undefined

  switch (_type) {
    case 'product':
      if (slug) revalidatePath(`/product/${slug}`, 'page')
      revalidatePath('/', 'layout')
      break
    case 'collection':
      if (slug) revalidatePath(`/collections/${slug}`, 'page')
      revalidatePath('/', 'layout')
      break
    case 'journalArticle':
      if (slug) revalidatePath(`/journal/${slug}`, 'page')
      revalidatePath('/', 'layout')
      break
    default:
      revalidatePath('/', 'layout')
      break
  }

  return Response.json({ revalidated: true, now: Date.now(), _type, slug })
}
