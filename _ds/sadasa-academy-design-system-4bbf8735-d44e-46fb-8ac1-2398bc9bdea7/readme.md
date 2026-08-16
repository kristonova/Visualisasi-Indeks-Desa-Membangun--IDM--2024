# SADASA Academy — Design System

Brand and interface system for **PT Sadasa Akademi Indonesia** (Sadasa Academy), a data-analytics
training and consulting company founded 1 May 2019 in Yogyakarta, Indonesia.

---

## 1. The company

Sadasa Academy trains and consults on data: analytics, data governance, data architecture, and the
data-science toolchain (SQL, Python, R, Tableau, Power BI, Google Data Studio). Customers come from
government, corporate, academia and retail.

**Four services** (the deck names these consistently, in this order):

| Service | What it is |
| --- | --- |
| **Training** | On-scheduled / interactive learning delivered live, corporate and public classes. |
| **Video Learning** | On-demand course library produced in Studio Sadasa. 18 courses, 152 videos at the time of the master deck. |
| **Consulting** | Data architecture, analytics dashboards, market-research modelling, data-driven policy work. |
| **DigiTalent Bridge** | Talent pipeline between trained learners and hiring organisations. |

Their own product vocabulary, from the master deck (p. 32): **Video** is the smallest unit →
**Course** is a group of videos → **Learning Path** is a group of courses. Delivery modes are
**Training** (on-schedule), **Video Learning** (on-demand) and **Blended Learning** (both).

Named clients that appear in the source deck: Kementerian Kesehatan RI, Jogja Smart Province, Dewan
Energi Nasional, Biofarma, PANDI, UNDP Indonesia, Universitas ‘Aisyiyah Yogyakarta, PT Wesolve
Solusi Indonesia, plus partner marks for Nongsa Digital Park, Yamaha, Efison, Glints, Skill Academy,
Pandi Institute, CfDS and BMKG.

**Contact block used across collateral**
`https://sadasa.id` · `info@sadasa.id` · `+62 851-5983-3441` · Sapen GK1 No. 256, Caturtunggal,
Depok, Sleman, D.I. Yogyakarta · phone `+62 813 8834 4688`

**People named in the source deck:** Krisostomus Nova R. (Director), Ridho Haga Pratama (Product
Development Manager), Claudius Andika D. (Marketing & Partnership Manager), Elisabeth Cesaria D. N.
(Business Administrator & General Affair), Aulia Suryaprayoga (Chief Management Officer, on the ID
card specimen).

### The name, and why the identity looks the way it does

*Sadasa* is short for **Sekolah Data Sains** (School of Data Science). In Javanese, *sadasa* means
**ten** — and ten stands for completeness in an academic system: a student who finishes at Sadasa
should leave with complete knowledge of data science.

The mark encodes that. The letters **S** and **A** (Sadasa Academy) are drawn as the Javanese
numeral for **1**, and the circle that frames them is the **0** → **10**, the perfect number, and
also a nod to digital/binary. The identity guideline is explicit that the mark is meant to read as
"njogjani, jogja banget" — thoroughly Yogyakarta — because Yogyakarta is Indonesia's city of
education.

The secondary motif is the **¾ ring**: two concentric arcs, open at one side, representing rows of
classroom desks facing the SADASA mark as the centre of study.

---

## 2. Sources this system was built from

Everything here was derived from files the client supplied. No live codebase or Figma file was
provided, so there is no product-code source of truth — noted per surface in §8.

| Source | Used for |
| --- | --- |
| `uploads/SADASA Identity Guideline v2.pdf` (12 pp., © 2019) | Logo construction and rationale, colour definitions, typeface specification, all stationery specs. |
| `uploads/Slides Template - Master-compressed.pdf` (67 pp.) | The working digital palette, Montserrat specification, slide layout inventory, product icons, mascots, chart styling, real company copy. |
| `uploads/SADASA Logo Red/White Horizontal/Vertical.png` | Logo artwork → `assets/logo/`. |
| `uploads/SADASA Letterhead Front/Back/Blank.png`, `SADASA Identity Guideline - HeadLetter.png` | Letterhead layout reference → `assets/stationery/`. |

Assets in `assets/icons`, `assets/illustrations` and `assets/photos` were extracted programmatically
from the embedded images of the master deck PDF, so they are the company's own artwork, not
substitutes.

**Not supplied, and therefore not recreated:** the sadasa.id website, the Video Learning platform
UI, and any app screens. See §8 for how the two UI kits handle that.

---

## 3. Content fundamentals

**Bilingual, Javanese-flavoured, plainly stated.** English is the default for outward-facing decks
and product copy; Indonesian is used for internal/technical guidance; **Javanese appears at the
emotional beats** — the master deck opens a section with *"Sugeng Rawuh!"* (welcome) and closes with
*"Matur Nuwun"* (thank you) rather than "Welcome" and "Thank you". Keep that. It is the single most
characteristic thing about how this brand speaks.

**Voice: "we", stated as fact.** Sentences are declarative and unhedged, and the company speaks in
first-person plural about itself:

> "PT Sadasa Akademi Indonesia or Sadasa Academy is a company that focuses on data analytics
> training and consulting."

> "We have four services: Training, Video Learning, Consulting, Digital Talent Bridge. All about
> data."

> "Our company believes that knowledge management, data management, and data analytics are an
> integral part of planning and decision-making, especially in the public sector, where public
> goodwill is the primary goal."

Note the register: institutional, a little formal, no marketing adjectives. There is no "unlock",
"supercharge", "revolutionise" anywhere in the source material. Claims are backed with countable
facts — *18 Courses, 152 Videos, 48 Videos / 8h Duration, established 1st May 2019* — and clients
are named rather than described.

**Second person only in instructions.** Guidance to the reader uses "you", numbered and imperative,
with a light closing joke:

> "1. Make a new Blank Presentation in your folder, 2. Copy any slide here… 6. Voila! You are
> officially Slides-Designer by now!"

**Casing.**
- Slide titles: Title Case, short — *About Us, Our Team, Our Partners & Clients, Price List*.
- Eyebrows / category labels above titles: ALL CAPS, wide-tracked — *TEXT, AGENDA, DATA, MOCKUP,
  CONTACT, PEOPLE, CO-FOUNDERS*.
- Person names in listings: ALL CAPS (*KRISOSTOMUS NOVA R.*), role in sentence case underneath.
- Numbers as ordinals in agendas and flows: `01 02 03`, always two digits.
- Course levels are a fixed three-term ladder: **Basic Course / Intermediate Course / Advance
  Course** (their spelling — "Advance", not "Advanced"; keep it).

**Numbers and units.** Indonesian thousands separators in financial tables (`193.864.728`),
`IDR` for currency, `8h` for duration, `+62` phone format, dates written `01 September 2022` or
`Yogyakarta, 16 August 2022` on covers.

**Emoji: never.** None appear in any source file. Bulleted lists use a small round `●`. Do not
introduce emoji anywhere.

**Vibe.** A university department that ships: competent, warm to people, unshowy about itself.
Written like a syllabus, not like a startup landing page.

---

## 4. Visual foundations

### 4.1 The one big rule: red is the signal, not the field

The identity is **SADASA Red `#C40000`** on **SADASA White** — and the guideline requires one of the
two (logotype/logogram or ground) to be white. That is correct for print, where ink is reflective.
On a backlit screen a saturated red field at full area is fatiguing, which is exactly the problem
this system is built to solve. So:

- **Red covers at most ~10–15% of any screen.** It is the accent, the rule, the active state, the
  one filled button — not the page.
- **Large red areas use `--red-800` `#8C1A10` (SADASA Maroon) or `--red-950` (red ink),** never
  `#C40000` at full bleed. Both are already in the company's own deck palette.
- **The page is paper, not white.** `--surface-page` is `--n-25`, a barely-warm off-white; cards sit
  on it in true white. Pure `#FFFFFF` full-page plus pure red is the combination that hurts.
- **Gold `#F1B91A` is the relief colour.** It is already SADASA's chart colour and the colour of
  their product icons, so promoting it to a full second accent adds nothing foreign. Gold carries
  the "eye-catching" load in charts, highlights, illustrations and dark sections; red keeps the
  authority.
- Rough budget per screen: **60% paper / 30% ink + neutrals / 10% red + gold.**

### 4.2 Colour

Two brand constants (`--sadasa-red`, `--sadasa-white`), three inherited working colours
(`--sadasa-maroon`, `--sadasa-gold`, `--sadasa-charcoal`), and three ramps built from them:

- **Red** `--red-50 … --red-950`, hue locked to the identity red. `--red-600` **is** `#C40000`;
  `--red-500` is `#DF2C27`, the red as actually reproduced in the supplied logo artwork; `--red-800`
  is the deck's maroon.
- **Gold** `--gold-50 … --gold-800`, `--gold-500` is `#F1B91A`.
- **Neutrals** `--n-0 … --n-950`, very slightly warm (hue ≈ 45, chroma ≤ 0.01) so red never vibrates
  against grey. `--n-500` is `#58595B`, the letterhead body grey; `--n-800` is `#313132`, the deck's
  neutral.

Semantic aliases do the work in components: `--surface-page/card/sunken/inverse/brand/brand-deep`,
`--text-strong/body/muted/subtle/brand/on-brand/on-gold`, `--border-hairline/strong/brand`,
`--accent`/`--accent-hover`/`--accent-press`, `--accent-2*` for gold.

**Dark mode is red ink, not black.** `[data-theme="ink"]` re-points the same aliases onto
`--red-950` surfaces, with gold as the accent — use it for deck covers, section breaks and dark UI.

**Data visualisation** follows the deck's own charts: gold leads (`--chart-1`), red highlights the
one number that matters (`--chart-2`), maroon and charcoal carry the rest. Grids are `--n-200`
hairlines; no gridline is ever red.

### 4.3 Type

**Montserrat** is the system typeface, at weights 300–900. This is not a guess: the master deck
specifies "[Title] Montserrat Bold – 30pt" and "[Body Text] Montserrat – Normal – 9pt", and tells
the designer to "play with width and size of the typeface (Thin to Black) [to give] hierarchy".

The 2019 identity guideline specifies **Gotham Narrow** (Book/Bold + italics) for print body text
and **Galano Grotesque** (Light / SemiBold) for business cards. No licence or font file was
supplied, so `--font-print` and `--font-stationery` still name those families and fall back to
Montserrat. **See §10 — we need those files, or confirmation that Montserrat is now the single
family.**

`--font-mono` is **IBM Plex Mono** — an intentional addition (§7) for metrics, code and data labels,
which a data-science brand needs and the sources never defined.

Type behaviour that comes from the sources:
- Headline stack is **small wide-tracked eyebrow → large bold title → light subtitle**, exactly the
  "The title / then maybe subtitle / And then the body text" pattern the deck demonstrates.
- Eyebrows: `--text-micro`, `--fw-bold`, `--tracking-eyebrow` (0.18em), uppercase, red.
- Display sizes get negative tracking (`--tracking-display`, −0.03em) so Bold/Black weights hold
  together.
- Stationery names are letter-spaced far apart (`--tracking-stationery`, 0.28em) — that is what makes
  the ID card and business card look like this brand.
- Body copy sits at 1.55 line-height; letterhead copy at 1.25 (the 10pt/12pt print spec).

### 4.4 Layout, geometry and the ¾ ring

- **Circles against hard rectangles.** The mark is a circle, the letterhead's contact icons are
  circles, the ¾ ring is a circle — and they sit against zero-radius blocks (the letterhead address
  panel) and plain tables. Containers therefore stay crisp: `--radius-sm` 4px for controls and
  inputs, `--radius-md` 8px for cards and panels, `--radius-lg` 12px for large surfaces,
  `--radius-pill` for tags and chips, `--radius-circle` for avatars/icon chips. Nothing in this
  system uses a 24px+ "friendly" radius.
- **The ¾ ring is the only decoration.** Two concentric arcs, red at 8–20% opacity, anchored
  **off-canvas** so they bleed past an edge — bottom-right on the letterhead, corner-anchored on
  slides. Use `assets/motif/accent-ring*.png` (extracted from the company's own files) at 40–120% of
  the container's smaller dimension, always behind content, never at full opacity, never more than
  one per surface.
- Left-aligned everything; centred type only on covers and stamps.
- Fixed elements: slide eyebrow top-left, page number and logo bottom-right (the master deck's
  furniture). In UI, sidebars are fixed, content scrolls.
- Slide canvas is **1280×720**, margins 72px × 56px.

### 4.5 Surfaces, borders and shadows

This is a **print-derived brand, so hairlines do the work and shadows are almost absent**:

- Cards: `--surface-card` (white) + 1px `--border-hairline` + `--radius-md`. Optional `--shadow-1`
  only when a card overlaps another surface.
- `--shadow-2` on hover for clickable cards; `--shadow-3` only for dialogs and menus.
- Shadows are **warm** (`oklch(0.30 0.05 30 / …)`) — a neutral grey shadow reads foreign next to red.
- No inner shadows anywhere except `--shadow-inset-top` as a 1px highlight on filled buttons.
- **Never** a coloured left border as decoration.

### 4.6 Imagery

The company's photography is **warm, real and documentary**: staff and learners in red SADASA
t-shirts, the Yogyakarta studio, a camera monitor mid-shoot, the office exterior. Skin tones warm,
lighting practical, no filters, no cool-blue tech gloss, no grain.

Rules:
- Photos are laid **full-bleed or in hard-edged rectangles**, never in a rounded frame.
- Text over photography always gets a **protection gradient** (`--scrim-bottom` / `--scrim-left`),
  never a flat scrim and never a blurred plate.
- Cut-out people (`assets/photos/cutout-*.png`) sit directly on a red or paper field — this is a
  signature of their deck.
- The flat cartoon **mascots** (`assets/illustrations/mascot-*.png`) are for warm, human, "learner"
  moments; they are already SADASA-branded (red t-shirts with the mark). Never mix mascot
  illustration and photography inside the same frame.
- Transparency and blur: `--glass` / `--glass-blur` exist for one job only — a sticky nav or a video
  control bar over moving content. Nothing else in this brand is frosted.

### 4.7 Motion and states

Restrained and quick. **No bounce, no spring, no long reveals.**

- `--duration-fast` 140ms for state changes, `--duration-base` 200ms for panels, `--duration-reveal`
  520ms for a section fade-up on scroll (opacity + 8px translate, once).
- Easing is `--ease-out` `cubic-bezier(0.22,0.84,0.24,1)`.
- **Hover:** solid buttons darken one step (`--accent-hover`), outline/ghost fill with
  `--accent-soft`, cards lift 1px (`--lift-hover`) and take `--shadow-2`, links keep colour and gain
  a solid underline. Opacity is never used to express hover.
- **Press:** darken a second step (`--accent-press`) plus `--press-scale` 0.985. No colour change on
  press for ghost controls, only the soft fill deepening.
- **Focus:** always visible — 3px `--focus-ring` (red at 38%) via `--shadow-focus`, or a 2px
  `--red-500` outline offset 2px.
- **Disabled:** `--n-100` fill, `--text-subtle` label, no shadow, `cursor:not-allowed`. Never a
  faded red.
- `prefers-reduced-motion` zeroes every duration and disables lift/press transforms (already wired
  in `tokens/motion.css`).

---

## 5. Iconography

**The source deck carries the company's own icon language, and it is not a downloadable set.**
Pages 50–56 of the master deck hold sheets of icons labelled "Marketing Icon" and "General Icon";
page 49 holds "(Logo) Product". Those sheets are vector artwork inside the PDF and cannot be
extracted losslessly, so this system does two things:

1. **The product/service icons were recovered as raster artwork** and are in `assets/icons/`:
   `product-code.png` (code in a gear), `product-insight.png` (magnifier over a trend line),
   `product-tuning.png` (three sliders), `product-conversation.png` (donut + speech bubble),
   `product-play.png` (the Video Learning play mark), `product-growth.png` (rising bar arrow) and
   `digitalent-bridge.png` (the DIGITALENT BRIDGE lockup). Their style is **two-colour outline: red
   `#C40000` stroke with `#F1B91A` gold details, ~2px relative stroke, rounded joins, no fill.**
   Use these, at their native colours, for the four services.
2. **Interface icons substitute [Lucide](https://lucide.dev) from CDN** — closest available match to
   that outline style (consistent 2px stroke, round caps and joins, no fill). **This is a
   substitution and it is flagged in §10.** Set `stroke-width:2`, size 16/20/24, and colour with
   `currentColor` so icons inherit `--text-*`. Never mix Lucide and the extracted product icons in
   the same row.

Other rules:
- Icons in the letterhead sit as **white glyphs inside solid red circles** (`--radius-circle`) — the
  brand's contact-detail pattern; `IconChip` reproduces it.
- **No emoji, ever** (§3). Unicode is used as typography, not as iconography: `●` for list bullets,
  `→` for forward actions.
- Never recolour the SADASA mark to fit a UI. Use `assets/logo/sadasa-mark-red.png` on light,
  `sadasa-mark-white.png` on red/ink.

---

## 6. What is in this project

```
styles.css              the one file consumers link — @import list only
tokens/                 fonts · colors · typography · spacing · shape · elevation · motion · print · base
assets/
  logo/                 red + white, horizontal + vertical + mark-only (cropped from the artwork)
  motif/                the ¾-ring accent, three tint strengths
  icons/                the seven product/service icons + DigiTalent Bridge lockup
  illustrations/        four mascot illustrations + the "SADASA = SEDASA = 10" brand-story graphic
  photos/               team, studio, learners, office, cut-out people, keyboard detail
  stationery/           letterhead front/back/blank reference scans
  fonts/                Montserrat (variable) + IBM Plex Mono woff2
components/
  core/                 Button · IconButton · Badge · Tag · Card · SectionTitle · AccentRule
  forms/                Input · Select · Checkbox · Radio · Switch
  navigation/           Tabs · Breadcrumb
  feedback/             Alert · ProgressBar
  data/                 StatCard · DataTable · CourseCard
  brand/                Logo · AccentRing · IconChip · ServiceIcon
guidelines/             foundation specimen cards (Design System tab)
ui_kits/
  video_learning/       course catalogue + player + dashboard (proposal — see §8)
  stationery/           letterhead, business card, ID card, envelope, stamps (recreation)
slides/                 sample slides in the master-deck layout language
templates/              copyable starting folders (deck)
readme.md · SKILL.md
```

---

## 7. Intentional additions

Things in this system that the source materials did not define. Each is here because a working
system needs it; none of them override a brand decision.

- **IBM Plex Mono** as `--font-mono`. The sources specify no monospace, but this is a data-science
  company whose collateral is full of SQL/Python/R names, counts and durations.
- **Status colours** (`--status-success/warning/danger/info`). The palette defines none. Success is a
  desaturated green, info a muted blue, both kept low-chroma so they read as system feedback rather
  than brand colour; warning reuses gold and danger reuses red.
- **The neutral ramp.** The sources give exactly two greys (`#58595B`, `#313132`); a UI needs eleven.
  Both originals sit in the ramp at their exact values.
- **`[data-theme="ink"]`** inverse scope. Extrapolated from the deck's red covers and the guideline's
  "negative colour" rule.
- **Lucide** for interface icons (§5), pending the real icon sheets.
- **`Tabs`, `Breadcrumb`, `Switch`, `ProgressBar`, `Alert`** — no component library was supplied, so
  the primitive set is authored to standard scope rather than copied from a source inventory.

---

## 8. UI kits, and what is a recreation vs. a proposal

- **`ui_kits/stationery/` is a recreation.** Every dimension, margin, type size and material note
  comes from the identity guideline (A4 letterhead with 5/2/2/6.5cm margins, 90×55mm die-cut
  business card, 54×86mm PVC ID card, 230×110mm envelope, 32×60mm round and 35×35mm square stamps).
- **`ui_kits/video_learning/` is a proposal.** No website or platform design was supplied. Its
  content is real — course titles, level ladder, video/duration counts and service names all come
  from the master deck — and every visual decision comes from this system's foundations, but the
  screens themselves are **not** recreations of an existing Sadasa product. Treat them as the first
  application of the system, to be corrected against the real product.
- **`slides/`** follows the master deck's layout language directly (eyebrow furniture, cover, agenda,
  quote, stat, chart, team, closing) and is a recreation.

---

## 9. Using this system

1. Link `styles.css`. Everything else reads from custom properties.
2. Compose from `components/` before writing new CSS; use the semantic aliases, not the raw ramps
   (`var(--text-body)`, not `var(--n-700)`).
3. Respect the red budget in §4.1. If a design feels flat without a big red area, reach for
   `--red-800` ink sections, gold, or the ¾-ring motif — in that order.
4. Keep the Javanese greetings in Indonesian/Javanese contexts; do not translate them away.
5. Never redraw the mark. The PNGs in `assets/logo/` are the only approved artwork here; ask the
   brand owner for vector originals before any large-format use.

---

## 10. Open questions for the brand owner

1. ~~**Font licences.**~~ *Resolved.* Gotham Narrow and Galano Grotesque were supplied and are
   self-hosted (`assets/fonts/gotham/`, `assets/fonts/galano/`, wired in `tokens/fonts-brand.css`).
   `--font-sans` is now Gotham Narrow with Montserrat as fallback; `--font-stationery` is Galano
   Grotesque. Confirm whether the deck should stay on Montserrat (as the master PPT specifies) or
   move to Gotham Narrow too — right now decks follow `--font-sans`, i.e. Gotham.
2. **Vector logo.** Only PNGs exist here. An SVG/AI original is needed for print, favicons and large
   formats. The mark-only files were cropped from the horizontal artwork.
3. **The real icon sheets.** Pages 50–56 of the master deck hold SADASA's own marketing and general
   icons as vectors. Send them as SVG and Lucide can be dropped.
4. **The exact deck palette values.** Primary / Secondary / Contrast / Neutral were read from a
   screenshot of the PowerPoint custom-colour row, so Secondary (`#8C1A10`) and Contrast (`#F1B91A`)
   are within a shade of the originals. Confirm the exact hex values.
5. **The real product UI.** If sadasa.id or the Video Learning platform exists in code or Figma,
   share it and `ui_kits/video_learning/` becomes a recreation instead of a proposal.
