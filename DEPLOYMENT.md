# Capital Systems Suite — Deployment Map

Where each of the 7 deliverables goes, and the order to set them up.

-----

## Your 7 Files

|File                              |Type    |Tier      |
|----------------------------------|--------|----------|
|`Tier1_Foundation_Toolkit.xlsx`   |Excel   |$2,500    |
|`Tier1_Foundation_Playbook.pdf`   |PDF     |$2,500    |
|`Tier2_Operator_Toolkit.xlsx`     |Excel   |$5,000    |
|`Tier2_Operator_Playbook.pdf`     |PDF     |$5,000    |
|`Tier3_Institutional_Toolkit.xlsx`|Excel   |$10,000   |
|`Tier3_Institutional_Playbook.pdf`|PDF     |$10,000   |
|`capital-systems-suite.html`      |Web page|Sales page|

-----

## Where Each One Goes

### 1. Lemon Squeezy — sells and delivers the 6 product files

Create **3 products** in your `aldgateco.lemonsqueezy.com` store (one per tier). Upload each tier’s
toolkit + playbook pair as that product’s downloadable files. Lemon Squeezy hosts them and delivers
automatically after purchase — **these 6 files do not go on GitHub.**

|Product      |Price  |Files to Upload                                                        |
|-------------|-------|-----------------------------------------------------------------------|
|Foundation   |$2,500 |`Tier1_Foundation_Toolkit.xlsx` + `Tier1_Foundation_Playbook.pdf`      |
|Operator     |$5,000 |`Tier2_Operator_Toolkit.xlsx` + `Tier2_Operator_Playbook.pdf`          |
|Institutional|$10,000|`Tier3_Institutional_Toolkit.xlsx` + `Tier3_Institutional_Playbook.pdf`|

### 2. GitHub Pages — hosts the sales page

`capital-systems-suite.html` is the **only** file from this batch that goes into GitHub. It belongs in
your existing `Ledger-co-site` repository, alongside your other site files.

```
Ledger-co-site/
├── index.html
├── css/
├── js/
├── capital-systems-suite.html   ← add this file here
└── ...
```

Commit and push to `main` (or your default branch) — GitHub Pages will publish it automatically at:

```
https://onestopdesignshop.github.io/Ledger-co-site/capital-systems-suite.html
```

**Note:** the file currently has placeholder `href="#"` buttons for “Get Foundation / Operator /
Institutional.” These need to be swapped for real Lemon Squeezy checkout links (step 3 below) before
or after pushing — either order works, but the buttons won’t take real payments until that’s done.

-----

## Order of Operations

1. **Create the 3 products in Lemon Squeezy** and upload each tier’s toolkit + playbook pair as that
   product’s files.
1. **Copy the 3 checkout URLs** Lemon Squeezy generates — one per product.
1. **Send the URLs back here** so the landing page’s buttons can be updated to point at them.
1. **Push `capital-systems-suite.html` to the `Ledger-co-site` repo** on GitHub — the funnel goes live:
   page loads → button click goes to checkout → purchase triggers automatic file delivery.

-----

## Quick Reference

- **GitHub gets:** 1 file (`capital-systems-suite.html`)
- **Lemon Squeezy gets:** 6 files (3 toolkits + 3 playbooks, as product downloads)
- **Nothing else from this batch needs Supabase, the GitHub Actions workflows, or any backend work** —
  these are one-time purchases, not subscriptions.