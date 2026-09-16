# Oryenna — Sanity Content Map

How the Sanity CMS (`projectId: djdiiitp`, `dataset: production`) drives the website.
Everything below maps a **document type in Sanity** to **what it renders on the site** and **how it links to other content**.

> Tip: In Studio, click **⋮ → View all → "Documents"** or use the search bar to open a doc by its `_id` (listed below).

---

## Layer 1 — Page documents (each = one fixed URL)

These are the "page" shell. They do NOT hold content directly — they reference section documents (Layer 2).
**Important:** these are fixed routes with clean URLs — there is **no `/[slug]` segment**. Each route queries its Sanity doc by a hardcoded slug (e.g. `about` → `/about`). Only dynamic content (products / collections / journal articles) uses `[slug]` URLs.

| Sanity type | Route | Rendered by / query | Seeded doc `_id` (fixed slug) |
|---|---|---|---|
| `homePage` | `/` | `src/app/page.tsx` → `HOME_PAGE_QUERY` (`slug: "home"`) | `home` (`home`) |
| `shopPage` | `/shop` | `src/app/shop/page.tsx` → `SHOP_PAGE_QUERY` | `page-shop` (`shop`) |
| `aboutPage` | `/about` | `src/app/about/page.tsx` → `ABOUT_PAGE_QUERY` | `page-about` (`about`) |
| `contactPage` | `/contact` | `src/app/contact/page.tsx` → `CONTACT_PAGE_QUERY` | `page-contact` (`contact`) |
| `faqPage` | `/faq` | `src/app/faq/page.tsx` → `FAQ_PAGE_QUERY` | `page-faq` (`faq`) |
| `privacyPolicyPage` | `/privacy-policy` | `src/app/privacy-policy/page.tsx` → `PRIVACY_POLICY_PAGE_QUERY` | `page-privacy` (`privacy-policy`) |
| `termsPage` | `/terms` | `src/app/terms/page.tsx` → `TERMS_PAGE_QUERY` | `page-terms` (`terms`) |
| `shippingPage` | `/shipping` | `src/app/shipping/page.tsx` → `SHIPPING_PAGE_QUERY` | `page-shipping` (`shipping`) |
| `returnsPage` | `/returns` | `src/app/returns/page.tsx` → `RETURNS_PAGE_QUERY` | `page-returns` (`returns`) |

> **Old `/about/about`-style URLs are gone.** Clean URLs (`/about`, `/contact`, `/faq`, `/terms`, …), no redundant slug. Old bookmarked slug URLs now hit the custom `/404` page (`src/app/not-found.tsx`).

Key fields:
- All pages: `title` (string), `slug` (required — the fixed slug each route queries).
- `homePage` / `shopPage` / `aboutPage` / `contactPage`: `sections[]` → references, minimum 1.
- `faqPage`: `faqs[] { question, answer }` (NOT sections).
- `privacyPolicyPage` / `termsPage` / `shippingPage` / `returnsPage`: `content` (rich text block array).

---

## Layer 1b — Dynamic URL documents (slug-drive URLs)

These genuinely need `[slug]` — more than one instance of each, so the URL carries which one.

| Sanity type | Route | Rendered by | Seeded `_id`s |
|---|---|---|---|
| `product` | `/product/[slug]` | `src/app/product/[slug]/page.tsx` | `product-amber`, `product-santal`, `product-palo-santo`, `product-hinoki` |
| `collection` | `/collections/[slug]` | `src/app/collections/[slug]/page.tsx` | `collection-signature` |
| `journalArticle` (list) | `/journal` | `src/app/journal/page.tsx` → `JOURNAL_ARTICLES_QUERY` | *(all articles)* |
| `journalArticle` (detail) | `/journal/[slug]` | `src/app/journal/[slug]/page.tsx` → `JOURNAL_ARTICLE_BY_SLUG_QUERY` | `article-evening-reset`, `article-notes-grasse`, `article-negative-space`, `article-why-paraffin` |

---

## Layer 2 — Section documents (modular building blocks)

Referenced by pages via `sections[]`. One section doc can be reused on many pages. Render order is set by the `sections[]` array order in the page doc.

| Sanity type | Renders as | Editable fields | Seeded `_id` | Used on |
|---|---|---|---|---|
| `heroSection` | Big headline + eyebrow + subhead + CTA + image | `title`, `subtitle`, `eyebrow`, `ctaText`, `ctaUrl`, `image` (+`alt`), `backgroundColor`, `textColor` | `sec-home-hero` | home, **shop** |
| `productGrid` | Product grid ✱ | `title`, `subtitle`, `productFilter` (`all`/`inStock`/`bestseller`/`limited`), `columns`, `showVendor`, `showBadge` | `sec-home-product-grid` | home |
| `collectionGrid` | Featured collection + its products | `title`, `collection` (ref), `columns`, `showImage` | `sec-home-collection-grid` | home, **shop** |
| `imageText` | Image beside headline/text | `image`, `title`, `subtitle`, `text`, `imageAlignment`, `textAlignment` | `sec-home-sanctuary` | home |
| `editorialSection` | Manifesto/editorial block (headline + image + rich text + CTA) | `title`, `subtitle`, `image`, `text` (rich), `ctaText`, `ctaUrl` | `sec-home-manifesto` | home |
| `testimonialSection` | Testimonial cards | `title`, `testimonials[] { author, content, rating }`, `showNames` | — | *(not seeded)* |
| `newsletterSection` | Newsletter CTA + email form | `title`, `subtitle`, `ctaText`, `ctaUrl`, `showForm`, `backgroundColor` | `sec-home-newsletter` | home, **shop** |
| `faqSection` | FAQ list (question/answer) | `title`, `faqs[] { question, answer }` | `sec-home-faq` | home |
| `richTextSection` | Heading + paragraphs | `title`, `content` (rich), `ctaText`, `ctaUrl` | — | — |
| `ctaSection` | Two-button CTA band | `title`, `subtitle`, `ctaText`, `ctaSecondaryText`, `ctaUrl`, `ctaSecondaryUrl`, `backgroundColor`, `textColor` | `sec-home-cta` | home |
| `productInsider` | Deep-dive product info | `title`, `provenanceStory`, `topNotes`, `heartNotes`, `baseNotes`, `ingredientsList`, `gallery[]` | — | linked from `product.insiderInfo` |
| `journalInsider` | Deep-dive article info | `title`, … | — | linked from `journalArticle.insiderArticle` |

✱ **Known gap:** `productGrid` currently renders a **placeholder paragraph** in `src/components/section-renderer.tsx` — it does not yet query products. Use `collectionGrid` for a working product display until that's wired.

### `home` page section order (current)
`sec-home-hero` → `sec-home-sanctuary` → `sec-home-manifesto` → `sec-home-product-grid` → `sec-home-collection-grid` → `sec-home-faq` → `sec-home-newsletter` → `sec-home-cta`.

### `shop` page section order (current)
`sec-home-hero` → `sec-home-collection-grid` → `sec-home-newsletter` (reuses the same section docs — edits reflect on both pages).

---

## Layer 3 — Content documents (products, collections, editorial)

| Sanity type | Where it appears | Key fields | Seeded `_id`s |
|---|---|---|---|
| `product` | `/product/[slug]`, product/collection grids, checkout | `name`, `slug`, `price`, `priceINR` (both required), `badge`, `notes`, `description`, `longDescription` (rich), `weight`, `burnTime`, `accentNotes[]`, `topNotes`, `heartNotes`, `baseNotes`, `image` (+`alt`), `insiderInfo` (ref), `inStock`, `orderRank`, `collection` (ref) | `product-amber`, `product-santal`, `product-palo-santo`, `product-hinoki` |
| `collection` | `/collections/signature`, `collectionGrid` | `name`, `slug`, `description`, `image`, `products[]` (refs), `orderRank` | `collection-signature` |
| `moodRecommendation` | Scent-finder logic (mood → product) | `mood`, `label`, `tagline`, `description`, `product` (ref, required), `bestFor`, `warmth`, `intensity`, `clarity`, `orderRank` | `mood-quiet`, `mood-grounded`, `mood-uplifted`, `mood-warm` |
| `journalArticle` | `/journal` (listing) + `/journal/[slug]` (article) | `title`, `slug`, `category`, `readTime`, `publishedAt` (date), `summary`, `coverImage` (required), `content` (rich), `author`, `insiderArticle` (ref), `orderRank` | `article-evening-reset`, `article-notes-grasse`, `article-negative-space`, `article-why-paraffin` |
| `complimentarySample` | Checkout free-sample selector | `name`, `notes`, `volume`, `description`, `orderRank` | `sample-hinoki`, `sample-fig`, `sample-santal` |

Notes:
- `priceINR` was seeded with **placeholder values** (₹6,499 / 6,499 / 6,999 / 7,199). Set real INR prices in Studio before enabling Indian checkout.
- Product images are Sanity assets (uploaded from `public/images/products/*.png`); journal `coverImage`s reuse those same assets.

---

## Layer 4 — Global / config documents (no URL)

Exactly **one** of each — queried with `[0]`, visible site-wide in the layout.

| Sanity type | Where it appears | Key fields | Seeded `_id` |
|---|---|---|---|
| `navbar` | Header announcement bar + nav links | `title`, `announcementText`, `navLinks[] { label, url }` | `navbar` |
| `footer` | Footer newsletter + link columns | `title`, `brandTagline`, `copyrightText`, `footerColumns[] { columnTitle, links[] { label, url } }` | `footer` |
| `siteSettings` | SEO/hero metadata | `title`, `description`, `announcementBar`, `heroEyebrow`, `heroHeadline`, `heroTagline`, `heroSubtext` (+ legacy editorial fields retained on the doc) | `siteSettings` |

Current nav links (editable in `navbar`): Shop `/shop`, Journal `/journal`, About `/about`, Contact `/contact`.

---

## How things are linked

```
navbar / footer / siteSettings  ──► Header / Footer / metadata      (Layer 4, always on)
        ▲
Pages (homePage, aboutPage, ...)                                    (Layer 1)
   └── sections[] ──► heroSection, productGrid, collectionGrid,
                     imageText, editorialSection, testimonialSection,
                     newsletterSection, faqSection, richTextSection,
                     ctaSection                                      (Layer 2)
        ▲
collection ── products[] ──► product ──► insiderInfo ──► productInsider
product ◄── moodRecommendation.product
journalArticle ──► insiderArticle ──► journalInsider                 (Layer 3)
```

Page → Sections: reference array `sections[]`.
Collection ↔ Product: `collection.products[]` refs, and `product.collection` points back.
Every "➜" relationship is a Sanity **reference** — editing the referenced doc updates it everywhere.

---

## Gotchas

1. **Homepage FAQ vs FAQ page are different types.** The homepage FAQ block is a `faqSection` (`sec-home-faq`). The `/faq` page is a `faqPage` (`page-faq`). Editing the wrong one won't change what you expect.
2. **`productGrid` doesn't render products yet** (placeholder in `section-renderer.tsx`). Use `collectionGrid` for now.
3. **`shopPage` route exists but needs the seeded doc.** `/shop` (`src/app/shop/page.tsx`) queries slug `shop`; run `npm run migrate` to create `page-shop` — until then `/shop` shows "Page not found".
4. **No Sanity write token in the repo.** Migration ran with a one-off token; that token was shown in chat — rotate it at manage.sanity.io → API → Tokens.
5. **Revalidation relies on the webhook** (`/api/revalidate`). Publish → Sanity webhook → `revalidatePath('/','layout')`. If the Vercel env `SANITY_REVALIDATE_SECRET` and the webhook URL `?secret=` don't match exactly, you get 401 and content stays stale up to 60s (or until manual revalidate).
6. **Custom 404 lives at `src/app/not-found.tsx`.** Any unmatched route (including old `/about/about`-style bookmarks) returns the branded 404 page.