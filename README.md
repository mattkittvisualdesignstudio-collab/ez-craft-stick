# EZ Craft Stick: landing page prototype

This is a one-page website for EZ Craft Stick. It's where people land from Instagram, Marketplace listings and the printed guide. On the page they can see what the stick is, browse the finished pieces, download the free DIY guide, and sign up for launch updates or send feedback.

It's plain HTML, CSS and JavaScript: no framework and no build step. To preview it, open `index.html` in any browser. You can host it almost anywhere, including ChatGPT Sites, Netlify, Cloudflare Pages or GitHub Pages.

## Files

| File | What it is |
|---|---|
| `index.html` | All page content and copy |
| `styles.css` | Colors, type and layout. The palette is defined at the top. |
| `main.js` | Sticky header, hero slideshow, step-by-step diagram, order pop-up, updates sign-up. Etsy links live in `ETSY` at the top. |
| `assets/img/` | Real product photos, AI-styled scenes (`styled-*.jpg`), the black stick render, the original EZ-CarSeat ad, the guide cover |
| `assets/ez-craft-stick-diy-guide.pdf` | The rebranded DIY guide (source is in the `guide/` folder next to `website/`) |
| `makers.html` | Meet the makers page. Not linked from the home page yet. |
| `guide.html` | Web version of the DIY guide in reading order. It works on phones and in the preview link. |
| `assets/guide/` | Step photos used by `guide.html` |
| `assets/fonts/` | Figtree and Young Serif, self-hosted so the site looks the same on any host (both under the free Open Font License) |

## Before it goes live

- [ ] **Etsy links.** Paste the shop link and the two section links (sticks, finished pieces) into `ETSY` at the top of `main.js`. Until then the order pop-up says the shop opens soon. When the shop is live, change "Our shop is opening soon on Etsy" back to "Our shop is on Etsy."
- [ ] **Email the DIY guide to buyers.** The stick ships without a printed guide. For now buyers get it as a download. Next step: send it by email automatically after each order. Simple options are a link in Etsy's message to buyers on each receipt, a small card in the package with a QR code to the guide, or an email service connected to the website.
- [ ] **Supply kits on Amazon (affiliate).** No kits are built or sold here. Instead, make a kits page that groups ribbon, tulle and accents as Amazon affiliate links, and point the "Supply kits are coming soon" note in the order pop-up at it. Amazon requires the line "As an Amazon Associate I earn from qualifying purchases" on any page with those links.
- [ ] **Updates sign-up.** Set `FORM_ENDPOINT` in `main.js` to a mailing list or form service. Right now it only shows a thank-you message.
- [ ] **Idea images.** The "One stick, a look for every season" cards use drawn placeholders. Swap each one for an idea image when you have it, and keep the "Idea" badge.
- [ ] **Reels.** The "Watch one come together" section is in the page but hidden. When the videos and Instagram account exist, remove `hidden` from that section.
- [ ] **Makers page.** `makers.html` has placeholders for names, a photo and a quote. Link it from the nav or footer when it's ready.
- [ ] **Content review, items 8 to 22.** Wording fixes from the Nov 8 content check (site, guide, makers page and Etsy plan) are waiting for a go-ahead.
- [ ] **Car seat warning.** Have the wording checked by someone who knows product liability.
- [ ] **Real product photo.** The stick image is rendered from the 3D model. Swap in a real photo of a black stick when you have one.
- [ ] **Domain.** Point a domain at whichever host you choose.

## Brand notes

- **Name:** EZ Craft Stick (said "Easy Craft Stick")
- **Colors:** EZ orange `#ee8a2b` and EZ blue `#2b86c5` carry over from the original EZ-CarSeat® brand. Plum `#2a1530`, velvet `#4a1832`, tulle `#f4eff5` and champagne `#d2b072` come from the finished pieces.
- **Type:** Young Serif for headings, Figtree for everything else. Both are Google Fonts.
- **Product facts:** black plastic, 14 in long, 2.4 in wide, ½ in deep, 7 tabs (4 short on one edge, 3 tall on the other, alternating about every 1.9 in), about 2.5 oz.
- **How-it-works diagram:** generated from the real tab positions in the 3D model. Tab positions in mm from center: short tabs at ±145.6 and ±48.6, tall tabs at 0 and ±97.
