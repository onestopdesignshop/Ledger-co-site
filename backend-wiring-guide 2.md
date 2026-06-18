# Backend Wiring Guide: Lemon Squeezy + Supabase

This turns the demo dashboard/auth on your site into a real, secure membership system. Follow in order — each step depends on the last.

-----

## Part 1 — Supabase setup (auth + database)

1. Create a free project at supabase.com.
1. In **Authentication → Providers**, enable **Email** (password-based is simplest to start).
1. In the **SQL Editor**, run this to create your entitlements table:

```sql
create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_email text not null unique,
  tier int not null,              -- 1 = Yield Map, 2 = Full Ledger, 3 = Annotated Portfolio
  billing_interval text not null, -- 'monthly' | 'quarterly' | 'annual' | 'lifetime'
  status text not null default 'active', -- 'active' | 'cancelled' | 'past_due'
  lemon_squeezy_subscription_id text,
  renews_at timestamp with time zone,
  created_at timestamp with time zone default now()
);

-- Row Level Security: each user can only ever read their own row
alter table subscriptions enable row level security;

create policy "Users can read own subscription"
  on subscriptions for select
  using (auth.jwt() ->> 'email' = user_email);
```

1. Grab your **Project URL** and **anon public key** from Settings → API. You’ll add these into the site’s JS later (replacing the `demoState` logic).

-----

## Part 2 — Lemon Squeezy product setup

1. In Lemon Squeezy, create **3 products** (Yield Map, Full Ledger, Annotated Portfolio).
1. For each, create **4 variants**: Monthly, Quarterly, Annual, Lifetime — matching the prices already on your site ($19/$57/$171/$300, etc.). Lifetime should be a one-time “Single Payment” variant; the other three are “Subscription” variants.
1. Update the `#checkout` links and `START THE [PLAN]` buttons on your site to point to each variant’s real Lemon Squeezy checkout URL (Lemon Squeezy gives you a unique link per variant).
1. Go to **Settings → Webhooks** and add a webhook pointing at the Supabase Edge Function you’ll create in Part 3. Subscribe to these events: `subscription_created`, `subscription_updated`, `subscription_cancelled`, `order_created` (the last one catches Lifetime one-time payments, which aren’t “subscriptions”).

-----

## Part 3 — The webhook function (the glue)

Create a Supabase Edge Function (`supabase functions new ls-webhook`) with logic like this:

```ts
// supabase/functions/ls-webhook/index.ts
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")! // service role, NOT anon key — this function needs write access
);

// Map your Lemon Squeezy variant IDs to tier numbers — fill in your real IDs
const VARIANT_TO_TIER: Record<string, number> = {
  "12345_monthly_yieldmap": 1, "12345_quarterly_yieldmap": 1, "12345_annual_yieldmap": 1, "12345_lifetime_yieldmap": 1,
  "67890_monthly_fullledger": 2, /* ...etc for all 12 variants */
};

Deno.serve(async (req) => {
  // IMPORTANT: verify the Lemon Squeezy signature header before trusting any payload —
  // see Lemon Squeezy's webhook signing docs. Skipping this lets anyone fake a "paid" event.
  const payload = await req.json();
  const eventName = payload.meta.event_name;
  const email = payload.data.attributes.user_email;
  const variantId = String(payload.data.attributes.variant_id);
  const tier = VARIANT_TO_TIER[variantId] ?? null;

  if (!tier || !email) return new Response("ignored", { status: 200 });

  if (eventName === "subscription_created" || eventName === "subscription_updated" || eventName === "order_created") {
    await supabase.from("subscriptions").upsert({
      user_email: email,
      tier,
      billing_interval: payload.data.attributes.billing_interval ?? "lifetime",
      status: "active",
      lemon_squeezy_subscription_id: payload.data.id,
      renews_at: payload.data.attributes.renews_at ?? null,
    }, { onConflict: "user_email" });
  }

  if (eventName === "subscription_cancelled") {
    await supabase.from("subscriptions")
      .update({ status: "cancelled" })
      .eq("user_email", email);
  }

  return new Response("ok", { status: 200 });
});
```

Deploy with `supabase functions deploy ls-webhook`, then paste that function’s URL into the Lemon Squeezy webhook config from Part 2.

-----

## Part 4 — Replace the demo JS on your site

In `index.html`, replace the `demoState` logic with real Supabase calls. Roughly:

```js
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_ANON_KEY');

async function handleSignIn(e){
  e.preventDefault();
  const email = document.getElementById('signinEmail').value;
  const password = document.getElementById('signinPassword').value;
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { alert(error.message); return false; }

  const { data: sub } = await supabase.from('subscriptions').select('*').eq('user_email', email).single();
  if (!sub || sub.status !== 'active') { alert('No active membership found for this account.'); return false; }

  demoState = { email, tier: sub.tier, billing: sub.billing_interval };
  closeAuthModal();
  showDashboard();
  return false;
}
```

`handleSignUp` should call `supabase.auth.signUp(...)` and then redirect to the correct Lemon Squeezy checkout URL for the plan they picked — access only unlocks once the webhook in Part 3 fires after real payment.

-----

## Part 5 — Welcome email automation (free lead magnet)

For the popup’s free “Stock Evaluation Framework” delivery:

1. Easiest path: connect the popup form to a Lemon Squeezy **newsletter** integration, or a free-tier email tool like **MailerLite** or **ConvertKit**.
1. Set up one automation: “On new subscriber → send Email #1” with `stock-evaluation-framework.md` attached as a PDF (export it from this chat or any markdown-to-PDF tool) plus this week’s rate sheet pasted into the email body.
1. Replace the `console.log` placeholder in `handleEmailCapture()` with a `fetch()` POST to that provider’s signup API endpoint (each provider documents this — typically a single API call with the email and a list/tag ID).

-----

## Part 6 — Single active session per account (stop simultaneous sharing)

This stops two people from being logged into the same paid account at the same time on different devices.

1. Add a column to track the current valid session:

```sql
alter table subscriptions add column current_session_token text;
```

1. On every sign-in, generate a new random token and overwrite the stored one:

```js
async function signInAndLockSession(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;

  const newToken = crypto.randomUUID();
  await supabase.from('subscriptions')
    .update({ current_session_token: newToken })
    .eq('user_email', email);

  localStorage.setItem('ledgerSessionToken', newToken); // this device's copy
  return data;
}
```

1. On every dashboard page load (and ideally every few minutes while the dashboard is open), re-check that this device’s token still matches the server’s:

```js
async function verifySessionStillValid(email) {
  const { data } = await supabase.from('subscriptions').select('current_session_token').eq('user_email', email).single();
  const localToken = localStorage.getItem('ledgerSessionToken');
  if (data?.current_session_token !== localToken) {
    // a newer sign-in elsewhere has invalidated this device's session
    await supabase.auth.signOut();
    alert('You were signed out because this account was signed in elsewhere.');
    window.location.reload();
  }
}
// call this on dashboard load, and optionally setInterval(..., 60000) to catch it quickly
```

This is “single active device,” not full DRM — someone could still log in, log out, and hand credentials to a friend sequentially. Combined with the visible watermark (Part 7) and Terms of Sale enforcement, this covers the realistic abuse cases without breaking the experience for honest customers using multiple devices of their own one at a time.

## Part 7 — Per-user watermark (already live in the front-end demo)

The site’s content viewer (`openViewer()` in `index.html`) already tiles the signed-in member’s email across any guide they view. No backend change needed here — just make sure `demoState.email` is replaced with the real authenticated user’s email once Part 4 is wired in, so the watermark reflects their real account, not a placeholder.

## Part 8 — All-Access plan & tier stacking

**All-Access** is just a 4th Lemon Squeezy product (same pattern as the other 3 — 4 variants: Monthly/Quarterly/Annual/Lifetime at $99/$297/$891/$1,200). It maps to `tier: 4` in the `VARIANT_TO_TIER` map from Part 3, and since the front-end’s unlock check is `effectiveTier >= item.minTier`, tier 4 automatically unlocks everything without further logic changes.

**Stacking** is more involved since it means a member can hold multiple independent Lemon Squeezy subscriptions simultaneously:

1. Change the `subscriptions` table to allow multiple rows per email instead of a unique constraint:

```sql
alter table subscriptions drop constraint subscriptions_user_email_key;
create index idx_subscriptions_email on subscriptions(user_email);
```

1. The webhook handler (Part 3) should `insert` a new row per tier instead of `upsert`-by-email when `purchase_mode = 'stack'`.
1. To apply the 15% stacking discount automatically in Lemon Squeezy, create a discount code (e.g. `STACK15`) restricted to the relevant variants, and have your checkout flow apply it automatically to the 2nd+ tier a member adds — Lemon Squeezy’s checkout API accepts a `discount_code` parameter you can pass programmatically once you know the customer already owns ≥1 active tier.
1. On the dashboard, compute `effectiveTier = Math.max(...allActiveTiersForThisEmail)` from all of that member’s active rows, exactly as the demo’s `showDashboard()` already does with `demoState.stackedTiers`.

## Order of operations checklist

- [ ] Supabase project + table + RLS policy created
- [ ] Lemon Squeezy: 3 products × 4 variants = 12 checkout links created
- [ ] Webhook deployed and connected, signature verification added
- [ ] Site JS swapped from `demoState` to real Supabase auth calls
- [ ] Email provider connected for the free lead magnet
- [ ] `current_session_token` column added + sign-in/verify logic wired (Part 6)
- [ ] Confirm watermark uses real authenticated email, not placeholder (Part 7)
- [ ] Test end-to-end: sign up → pay with Lemon Squeezy test mode → confirm row appears in Supabase → sign in → correct tier’s library unlocks
- [ ] Test single-session: sign in on two browsers with the same account, confirm the first gets signed out