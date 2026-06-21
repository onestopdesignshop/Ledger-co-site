# Add a Link to Capital Systems Suite — Patch Instructions

This adds a link from your main Ledger & Co. site over to the new Capital Systems Suite page.
You’re pasting a small snippet into a file that’s already live — this does **not** require
rebuilding anything, just editing the HTML directly in GitHub (or locally, then re-uploading).

-----

## Option A — Add to the main nav bar (recommended)

This makes the link visible on every page that shares your site’s header/nav.

### 1. Open `index.html` (or whichever file holds your shared nav) in the GitHub web editor

- Go to your repo: `onestopdesignshop/Ledger-co-site`
- Click into `index.html`
- Click the pencil icon (✏️) in the top right to edit

### 2. Find your existing nav links

Look for a block that looks something like this (your actual class names/structure may differ
slightly — match the pattern, not necessarily the exact text):

```html
<nav>
  <a href="#pricing">Pricing</a>
  <a href="#about">About</a>
  <!-- other nav links -->
</nav>
```

### 3. Add this single line inside that `<nav>` block

```html
<a href="capital-systems-suite.html">Capital Systems</a>
```

So it ends up looking like:

```html
<nav>
  <a href="#pricing">Pricing</a>
  <a href="#about">About</a>
  <a href="capital-systems-suite.html">Capital Systems</a>
</nav>
```

> **Note on the path:** this assumes `capital-systems-suite.html` lives in the same folder as
> `index.html` (the repo root). If you placed it in a subfolder, adjust the `href` to match —
> e.g. `href="suite/capital-systems-suite.html"`.

### 4. Commit the change

Scroll down, add a commit message like `Add Capital Systems Suite nav link`, and click
**Commit changes directly to the main branch**.

GitHub Pages will rebuild automatically — give it 1–2 minutes, then check in an incognito tab.

-----

## Option B — Add a promotional banner instead (or in addition)

If you want something more visible than a small nav link — e.g. on the dashboard, aimed at
existing members as an upsell — paste this block wherever you want the banner to appear
(for example, near the top of the dashboard content area):

```html
<a href="capital-systems-suite.html" style="
  display: block;
  background: #1B2A4A;
  color: #F7F4EC;
  text-decoration: none;
  padding: 18px 24px;
  border-radius: 4px;
  margin: 20px 0;
  font-family: sans-serif;
">
  <strong style="color: #C9A227;">NEW — Capital Systems Suite</strong><br>
  Sixteen fully-linked Excel systems for personal wealth, business operations, and trading.
  Starting at $2,500. <span style="text-decoration: underline;">See the tiers →</span>
</a>
```

This is plain inline-styled HTML so it’ll render correctly regardless of what CSS framework
the rest of the page uses — no separate stylesheet edits needed.

-----

## Where each option goes

|Option      |Best for                  |Visibility                             |
|------------|--------------------------|---------------------------------------|
|A — Nav link|Site-wide discoverability |Small, persistent, on every page       |
|B — Banner  |Upselling existing members|Large, prominent, wherever you place it|

You can do both — they’re not mutually exclusive.

-----

## After you make the change

Verify in an **incognito/private browser tab** (not your regular browser, due to the known
GitHub Pages CDN caching delay) that:

1. The new link/banner appears where you placed it.
1. Clicking it correctly navigates to `capital-systems-suite.html`.

If the link 404s, the most likely cause is a path mismatch — double check whether
`capital-systems-suite.html` is actually sitting in the repo root or in a subfolder, and adjust
the `href` to match its real location.