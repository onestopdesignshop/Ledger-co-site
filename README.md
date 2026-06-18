# Ledger & Co.

> “Finally, money advice worth paying for.”

The marketing site, member dashboard demo, and supporting docs for Ledger & Co. — a financial education membership business (rate comparisons, web3/digital-asset literacy, and income-strategy guides), sold via Monthly / Quarterly / Annual / Lifetime subscriptions, with a separate All-Access plan and the option to stack individual tiers.

## Live demo status

This repo currently contains a **fully designed front-end** with a **working demo** of sign-up, sign-in, and the member dashboard (content library, watermarking, savings tracker). The demo runs on `localStorage` as a stand-in for a real backend — **no real payments or accounts are processed yet.** See [`docs/backend-wiring-guide.md`](docs/backend-wiring-guide.md) for the exact steps to connect real billing and accounts (Lemon Squeezy + Supabase).

## Repo structure

```
.
├── index.html                          → main site (pricing, guides, brokers, dashboard, etc.)
├── terms-of-sale.html                  → full Terms of Sale (all plans, billing options, refund policy)
├── css/
│   └── styles.css                      → all site styles
├── js/
│   └── main.js                         → all site behavior (billing toggle, auth demo, dashboard, content viewer)
└── docs/
    ├── backend-wiring-guide.md         → step-by-step: Lemon Squeezy + Supabase real backend setup
    ├── stock-evaluation-framework.md   → free lead-magnet PDF source content (Markdown)
    └── guides/
        ├── The Yield Map - June 2026.pdf       → first real member guide deliverable (Tier 1 content)
        └── yield-map-guide-source.html         → editable HTML source — re-export to PDF monthly with fresh rates
```

## What’s real vs. demo right now

|Feature                                                              |Status                                                                    |
|---------------------------------------------------------------------|--------------------------------------------------------------------------|
|Visual design, pricing tiers, copy                                   |Real, final                                                               |
|Pricing logic (Monthly/Quarterly/Annual/Lifetime/All-Access/Stacking)|Real, final — matches Terms of Sale exactly                               |
|Sign up / sign in modal                                              |Working UI, **not connected to real auth yet**                            |
|Member dashboard + content library                                   |Working UI, **gated by demo `localStorage` state, not real subscriptions**|
|Per-user watermark on guide content                                  |Real logic, works once real auth is connected                             |
|Single-session-per-account enforcement                               |Designed, **needs the Supabase trigger in the wiring guide to be live**   |
|Checkout buttons (`#checkout`)                                       |**Placeholder anchors — need real Lemon Squeezy checkout URLs**           |
|Email capture popup                                                  |Working UI, **not connected to an email provider yet**                    |

## Before going live — checklist

1. Create your products/variants in Lemon Squeezy (4 plans × 4 billing intervals = 16 checkout links).
1. Replace every `href="#checkout"` and `START THE [PLAN]` button with the real Lemon Squeezy checkout URL for that variant.
1. Follow `docs/backend-wiring-guide.md` to connect Supabase auth + the webhook that grants real access.
1. Replace placeholder contact info (`hello@yourdomain.com`) throughout `index.html` and `terms-of-sale.html` with your real domain/email.
1. Have a real lawyer review `terms-of-sale.html` before launch — it’s a strong draft, not a substitute for legal review.
1. Connect an email provider (ConvertKit, Mailchimp, or Lemon Squeezy’s own list tool) for the free lead-magnet popup.

## Monthly content refresh workflow

The Yield Map guide is sold as “refreshed monthly” — to keep that promise:

1. Re-verify current rates (search Bankrate, NerdWallet, Fortune/Curinos, The Motley Fool, WalletHub for current HYSA/CD rates).
1. Edit `docs/guides/yield-map-guide-source.html` with the new numbers and an updated edition date.
1. Re-export to PDF: `wkhtmltopdf --enable-local-file-access --margin-top 0 --margin-bottom 15mm --margin-left 0 --margin-right 0 yield-map-guide-source.html "The Yield Map - [Month Year].pdf"`
1. Replace the old PDF in `docs/guides/` and in whatever delivery mechanism your dashboard/email system uses (see `js/main.js`’s `LIBRARY` array, which currently has placeholder body content for this item).
1. Update the `[MEMBER NAME / EMAIL]` placeholder on the cover page dynamically per-member if you want personalized, watermarked copies — same principle as the in-dashboard watermark already built into the site.

## Deploying with GitHub Pages

This is a static site — no build step required.

1. Push this repo to GitHub.
1. In the repo, go to **Settings → Pages**.
1. Under “Build and deployment,” set **Source** to “Deploy from a branch,” branch `main`, folder `/ (root)`.
1. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.
1. If using a custom domain, add a `CNAME` file at the repo root with your domain, and configure DNS per [GitHub’s custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## License

See [`LICENSE`](LICENSE). All site copy, design, and original written content © Ledger & Co. Third-party trademarks (Fidelity®, Charles Schwab®, E*TRADE®, etc.) referenced on the site belong to their respective owners and are used solely for identification — see the disclosure in `index.html`’s footer and `terms-of-sale.html` for full detail.