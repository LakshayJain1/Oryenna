# Oryenna — Sanity Content Map

How the Sanity CMS (`projectId: djdiiitp`, `dataset: production`) drives the website.
Everything below maps a **document type in Sanity** to **what it renders on the site** and **how it links to other content**.

> Tip: In Studio, click **⋮ → View all → "Documents"** or use the search bar to open a doc by its `_id` (listed below).

---

## Layer 1 — Page documents (each = one URL)

These are the "page" shell. `slug` controls the URL. They do NOT hold content directly — they reference section documents (Layer 2).

| Sanity type | Route | Rendered by | Seeded doc `_id` (slug) |
|---|---|---|---|
| `homePage` | `/` | `src/app/page.tsx` → `SectionRenderer` | `home` (`home`) |
| `shopPage` | `/shop/[slug]` | — | *(not seeded / no route — see Gotchas)* |
| `aboutPage` | `/about/[slug]` | `src/app/about/[slug]/page.tsx` | `page-about` (`about`) |
| `contactPage` | `/contact/[slug]` | `src/app/contact/[slug]/page.tsx` | `page-contact` (`contact`) |
| `faqPage` | `/faq-page/[slug]` | `src/app/faq-page/[slug]/page.tsx` | `page-faq` (`faq`) |
| `privacyPolicyPage` | `/privacy-policy/[slug]` | `src/app/privacy-policy/[slug]/page.tsx` | `page-privacy` (`privacy-policy`) |
| `termsPage` | `/terms/[slug]` | `src/app/terms/[slug]/page.tsx` | `page-terms` (`terms`) |
| `shippingPage` | `/shipping-page/[slug]` | `src/app/shipping-page/[slug]/page.tsx` | `page-shipping` (`shipping`) |
| `returnsPage` | `/returns-page/[slug]` | `src/app/returns-page/[slug]/page.tsx` | `page-returns` (`returns`) |

Key fields:
- All pages: `title` (string), `slug` (required).
- `homePage` / `shopPage` / `aboutPage` / `contactPage`: `sections[]` → references, minimum 1.
- `faqPage`: `faqs[] { question, answer }` (NOT sections).
- `privacyPolicyPage` / `termsPage` / `shippingPage` / `returnsPage`: `content` (rich text block array).

---

## Layer 2 — Section documents (modular building blocks)

Referenced by pages via `sections[]`. One section doc can be reused on many pages. Render order is set by the `sections[]` array order in the page doc.

| Sanity type | Renders as | Editable fields | Seeded `_id` | Used on |
|---|---|---|---|---|
| `heroSection` | Big headline + eyebrow + subhead + CTA + image | `title`, `subtitle`, `eyebrow`, `ctaText`, `ctaUrl`, `image` (+`alt`), `backgroundColor`, `textColor` | `sec-home-hero` | home |
| `productGrid` | Product grid ✱ | `title`, `subtitle`, `productFilter` (`all`/`inStock`/`bestseller`/`limited`), `columns`, `showVendor`, `showBadge` | `sec-home-product-grid` | home |
| `collectionGrid` | Featured collection + its products | `title`, `collection` (ref), `columns`, `showImage` | `sec-home-collection-grid` | home |
| `imageText` | Image beside headline/text | `image`, `title`, `subtitle`, `text`, `imageAlignment`, `textAlignment` | `sec-home-sanctuary` | home |
| `editorialSection` | Manifesto/editorial block (headline + image + rich text + CTA) | `title`, `subtitle`, `image`, `text` (rich), `ctaText`, `ctaUrl` | `sec-home-manifesto` | home |
| `testimonialSection` | Testimonial cards | `title`, `testimonials[] { author, content, rating }`, `showNames` | — | *(not seeded)* |
| `newsletterSection` | Newsletter CTA + email form | `title`, `subtitle`, `ctaText`, `ctaUrl`, `showForm`, `backgroundColor` | `sec-home-newsletter` | home |
| `faqSection` | FAQ list (question/answer) | `title`, `faqs[] { question, answer }` | `sec-home-faq` | home |
| `richTextSection` | Heading + paragraphs | `title`, `content` (rich), `ctaText`, `ctaUrl` | — | — |
| `ctaSection` | Two-button CTA band | `title`, `subtitle`, `ctaText`, `ctaSecondaryText`, `ctaUrl`, `ctaSecondaryUrl`, `backgroundColor`, `textColor` | `sec-home-cta` | home |
| `productInsider` | Deep-dive product info | `title`, `provenanceStory`, `topNotes`, `heartNotes`, `baseNotes`, `ingredientsList`, `gallery[]` | — | linked from `product.insiderInfo` |
| `journalInsider` | Deep-dive article info | `title`, … | — | linked from `journalArticle.insiderArticle` |

✱ **Known gap:** `productGrid` currently renders a **placeholder paragraph** in `src/components/section-renderer.tsx` — it does not yet query products. Use `collectionGrid` for a working product display until that's wired.

### `home` page section order (current)
`sec-home-hero` → `sec-home-sanctuary` → `sec-home-manifesto` → `sec-home-product-grid` → `sec-home-collection-grid` → `sec-home-faq` → `sec-home-newsletter` → `sec-home-cta`.

---

## Layer 3 — Content documents (products, collections, editorial)

| Sanity type | Where it appears | Key fields | Seeded `_id`s |
|---|---|---|---|
| `product` | `/product/[slug]`, product/collection grids, checkout | `name`, `slug`, `price`, `priceINR` (both required), `badge`, `notes`, `description`, `longDescription` (rich), `weight`, `burnTime`, `accentNotes[]`, `topNotes`, `heartNotes`, `baseNotes`, `image` (+`alt`), `insiderInfo` (ref), `inStock`, `orderRank`, `collection` (ref) | `product-amber`, `product-santal`, `product-palo-santo`, `product-hinoki` |
| `collection` | `/collections/signature`, `collectionGrid` | `name`, `slug`, `description`, `image`, `products[]` (refs), `orderRank` | `collection-signature` |
| `moodRecommendation` | Scent-finder logic (mood → product) | `mood`, `label`, `tagline`, `description`, `product` (ref, required), `bestFor`, `warmth`, `intensity`, `clarity`, `orderRank` | `mood-quiet`, `mood-grounded`, `mood-uplifted`, `mood-warm` |
| `journalArticle` | `/journal` listing + article pages | `title`, `slug`, `category`, `readTime`, `publishedAt` (date), `summary`, `coverImage` (required), `content` (rich), `author`, `insiderArticle` (ref), `orderRank` | `article-evening-reset`, `article-notes-grasse`, `article-negative-space`, `article-why-paraffin` |
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

Current nav links (editable in `navbar`): Collection `/collections/signature`, Journal `/journal`, About `/about/about`, Contact `/contact/contact`.

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

1. **Homepage FAQ vs FAQ page are different types.** The homepage FAQ block is a `faqSection` (`sec-home-faq`). The `/faq-page/faq` page is a `faqPage` (`page-faq`). Editing the wrong one won't change what you expect.
2. **`productGrid` doesn't render products yet** (placeholder in `section-renderer.tsx`). Use `collectionGrid` for now.
3. **`shopPage` has no seeded document and no route** — `/shop/[slug]` will 404 until it's created. Nav currently points to `/collections/signature` instead.
4. **No Sanity write token in the repo.** Migration ran with a one-off token; that token was shown in chat — rotate it at manage.sanity.io → API → Tokens.
5. **Revalidation relies on the webhook** (`/api/revalidate`). Publish → Sanity webhook → `revalidatePath('/','layout')`. If the Vercel env `SANITY_REVALIDATE_SECRET` and the webhook URL `?secret=` don't match exactly, you get 401 and content stays stale up to 60s (or until manual revalidate).