# Hnýfill — targeted review, 22 October 2026

## Changes and evidence
- Exact three-line Icelandic hero requested by owner; cyan location line, responsive type and preserved salmon photograph/motion/CTAs.
- Support: “Með áherslu á handverkið og náttúrulegar aðferðir. Reykti laxinn okkar er án aukaefna.” Owner explicitly confirmed the claim applies only to smoked salmon. Source: https://www.instagram.com/hnyfill/p/DcsxMDPnYy5/ . The earlier “Reykt, grafið og unnið af natni…” was editorial copy, not a direct company quote; removed from hero and metadata.
- Three source links added for verified Instagram recipes: potato soup (DeTw_t_jRTp), breaded fish with lemon sauce (DdQ_64EjxKo), smoked-salmon pasta (Db72FQyGHTq). No inferred quantities, stock portraits or new AI photography. Recipe graphics inspected; authentic existing photography retained rather than using text-heavy social graphics as hero images.
- Team retains equal alphabetical cards and all nine names/roles/contact details. Published contact links now 44px minimum touch height, 15px semibold.
- Repeated smoker hero now reserved for Team. Story uses existing hand-filleting archive photograph and fish-on-ice detail; Smokehouse uses existing smoking-material photograph. Images are illustrative archive assets, not claimed to document a specific year or named employee.
- Existing responsive WebP variants, lazy loading and intrinsic sizes retained. No Instagram embed/third-party script added.
- GitHub Pages build explicitly forces preview mode, even if production environment is inherited. Organization schema now includes /hnyfill/.

## Contact decision
Keep the current truthful mailto flow and copy-for-webmail fallback for this static preview. A real submission flow would improve reliability but requires an approved endpoint/provider, recipient ownership, privacy/retention decisions, spam protection and an end-to-end delivery test. GitHub Pages cannot run a server handler. No message is labelled sent; no test enquiry was transmitted.

## Catalogue audit
29 research candidates; 15 published entries match seed slugs. No new products published. Seed is a research candidate list, not an approved active SKU catalogue. Packaging facts remain limited to existing sourced evidence. Ingredients/allergens/storage require current labels.

14 candidates not published:
- **Reykt hvalkjöt** (`reykt-hvalkjot`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://www.hnyfill.is/verslanir, https://www.noraseafood.com/products.php?category=reykt-og-grafid
- **Pastramilax** (`pastrami-lax`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://www.hnyfill.is/items, https://www.noraseafood.com/products.php?category=reykt-og-grafid
- **Reyktur lax 100 g** (`reyktur-lax-100g`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://www.hnyfill.is/items/reyktur-lax-100g
- **Balik-laxahnakki** (`balik-laxahnakki`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://www.hnyfill.is/reykh%C3%BAs, https://www.noraseafood.com/products.php?category=reykt-og-grafid
- **Kirsuberjaviðarreykt bleikja** (`kirsuberjavida-reykt-bleikja`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://www.noraseafood.com/products.php?category=reykt-og-grafid, https://kronan.is/vara/100270202-hnyfill-kirsuberja-vidarreykt-bleikja
- **Reykt ýsa** (`reykt-ysa`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://www.noraseafood.com/products.php?category=reykt-og-grafid, https://kronan.is/vara/100260076-hnyfill-reykt-ysa
- **Beykireyktur lax – biti** (`beykireyktur-lax-biti`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://kronan.is/vara/100270582-hnyfill-beykireyktur-lax-biti, https://www.noraseafood.com/products.php?category=reykt-og-grafid
- **Ferskur plokkfiskur** (`ferskur-plokkfiskur`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://kronan.is/vara/100268118-hnyfill-ferskur-plokkfiskur
- **Fiskur í Black Garlic marineringu** (`fiskur-black-garlic`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://kronan.is/vara/100267172-hnyfill-fiskur-i-black-garlic-marineringu
- **Þorskflök** (`thorskflok`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://kronan.is/vara/100267175-hnyfill-thorskflok
- **Þorskhnakki** (`thorskhnakki`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://kronan.is/vara/100267173-hnyfill-thorskhnakki
- **Ýsuflök** (`ysuflok`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://kronan.is/vara/100267169-hnyfill-ysuflok
- **Bleikjuflök** (`bleikjuflok`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://kronan.is/vara/100267170
- **Lax** (`lax`): verify current SKU, packaging, imagery and availability with Hnýfill; sources: https://kronan.is/vara/100267171-hnyfill-lax

Instagram newly corroborates kirsuberjaviðarreykt bleikja (DbsZT9AgSXt), but that alone does not settle current packaging, catalogue variant or available product photograph. Tvíreyktur lax is also promoted (DebRpjniEWp); establish whether it is a distinct SKU before adding or equating it with taðreyktur lax. Balik/Baliq naming, sliced 100g duplicate and blinis pack count still require owner clarification.

## Production-domain launch (separate from this preview)
Keep GitHub /hnyfill/ preview noindex. For the approved production domain: build with HNYFILL_ENV=production, NEXT_PUBLIC_SITE_URL=https://www.hnyfill.is (or the explicitly chosen canonical HTTPS origin), and NEXT_PUBLIC_BASE_PATH empty. Use the regular Next export build, not build:pages which intentionally forces preview configuration. Deploy out/ at domain root, configure DNS/TLS and redirects for the noncanonical host, verify canonical/hreflang/OG/sitemap URLs and remove noindex only on production. Preserve preview noindex. Test form delivery if a real endpoint is introduced. Verify final content/packaging approval before launch.

## Verification
Build/type checks and published browser verification are recorded in the accompanying QA results. Manual gaps: real iOS/Android devices, assistive-technology user testing, email delivery (no backend), final SKU/label approval and production DNS/TLS remain outside the preview test.

### Final results
- Production export/type checks and targeted ESLint passed.
- Export audit: 68 pages, 2,342 internal links, zero errors.
- Published HTTP check: 179 unique route/asset URLs, all HTTP 200.
- Published browser: 11 key routes × 5 widths (320, 390, 768, 1024, 1440), no horizontal overflow, missing headings, missing noindex or broken loaded images. Lazy images not yet loaded are covered separately by the HTTP asset check.
- Hero visually reviewed at all five widths; Team, Story and Smokehouse compositions visually reviewed. Team keeps nine equal cards; all four contact links measure 44px high. English hero also checked at 320px.
- Filtering/search persistence, empty-state reset, language switch and mobile navigation passed. No warnings/errors in captured browser log.
- Role-based self-review found mobile support text too close to the salmon; added photographic breathing room and reinspected. Existing typography, cinematic treatment and equal staff hierarchy retained.
- Reduced-motion guards and static fallback reviewed in source; live OS-preference switching was not emulated in this browser session. Physical-device testing, screen-reader testing and actual email delivery remain manual. No numerical speed/CLS benchmark is claimed.
