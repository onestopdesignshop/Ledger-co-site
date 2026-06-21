// ============ SUPABASE CLIENT ============
// Project: onestopdesignshop's Project (wtlftsaigiehropidurn)
// The key below is the anon/public key — safe to expose in browser code.
// It only works within the limits of your Row Level Security policies.
const SUPABASE_URL = "https://wtlftsaigiehropidurn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bGZ0c2FpZ2llaHJvcGlkdXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgxMDgsImV4cCI6MjA5NzQwNDEwOH0.tXL7p_ULHp-HePXceMNbOKJAsHHlAlfR6v4UDWaZ1Z0";

// window.supabase here is the UMD library global from the CDN script tag in index.html.
// We immediately overwrite it with our initialized client (this is the standard
// pattern Supabase's own docs use) so the rest of this file can just call `supabase.auth...`.
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============ CHECKOUT URL MAP ============
// Mirrors the same Lemon Squeezy URLs used on the product buttons in index.html.
// Keyed by tier (1-4) -> billing interval -> URL. Lemon Squeezy checkout
// overlay/buy links support a [data-lemonsqueezy]-style query param for
// prefilling email; we append ?checkout[email]=... below so the person
// doesn't have to retype the email they just signed up with.
//
// NOTE: these are the exact same 4 URLs already on the START buttons —
// each Lemon Squeezy "buy" link covers all billing intervals for that
// product via its own checkout page variant selector, EXCEPT this site's
// checkout pages are one-URL-per-product (variant chosen at signup time
// here, not on the Lemon Squeezy page itself). If your Lemon Squeezy buy
// links are actually variant-specific (one per billing interval), replace
// the single URL per tier below with the four billing-specific URLs.
const CHECKOUT_URLS = {
  1: "https://aldgateco.lemonsqueezy.com/checkout/buy/8abad108-253b-4bb2-aaa6-599fff90a506",
  2: "https://aldgateco.lemonsqueezy.com/checkout/buy/37257542-7ae5-4689-af24-9a2205e08e86",
  3: "https://aldgateco.lemonsqueezy.com/checkout/buy/bf5d135b-4f21-47ac-a9a6-f607740bfd28",
  4: "https://aldgateco.lemonsqueezy.com/checkout/buy/f3a9e598-c22b-40f5-8a80-adad5a75ec6a",
};

// Builds the checkout URL for a given tier, pre-filling the email and
// passing the chosen billing interval through as custom checkout data so
// it's available on the webhook payload if needed downstream.
function buildCheckoutUrl(tier, email, billingInterval){
  const base = CHECKOUT_URLS[tier];
  if(!base) return null;
  const url = new URL(base);
  if(email) url.searchParams.set('checkout[email]', email);
  if(billingInterval) url.searchParams.set('checkout[custom][billing_interval]', billingInterval);
  return url.toString();
}

// ============ CONTENT LIBRARY (still static — not yet backend-driven) ============
const LIBRARY = [
  { title:"The Yield Map — Current Edition", desc:"This month's ranked savings, CD, and money-market comparison.", minTier:1,
    body:`<h4>This Month's Top Verified Rates</h4>
    <p>Varo Bank Savings — 5.00% APY, capped at a $5,000 balance, requires qualifying direct deposit.</p>
    <p>Axos One — 4.21% APY "boosted" rate, requires meeting deposit/balance conditions.</p>
    <p>Pibank — 4.40% APY, no monthly fee — confirm current minimum opening deposit before applying.</p>
    <h4>The Catch Behind Each Headline Rate</h4>
    <p>Promotional APYs almost always have a balance cap, a direct-deposit requirement, or a time limit. We check the issuer's own fine print every month so you don't have to dig for it.</p>` },
  { title:"Fee & Minimum-Balance Trap Guide", desc:"The most common ways promo APYs cost more than they pay.", minTier:1,
    body:`<h4>The Three Most Common Traps</h4>
    <p>1. Tiered rates that only apply above a balance most people don't keep.</p>
    <p>2. "Boosted" promotional periods that quietly revert to a much lower base rate.</p>
    <p>3. Monthly fees that exceed the interest earned on smaller balances.</p>` },
  { title:"Web3 Due-Diligence Checklist", desc:"Custody, audit, and exit-liquidity questions to ask before funding anything.", minTier:2,
    body:`<h4>Before You Fund Anything</h4>
    <p>Who holds the private keys — you or the platform? Has the smart contract been audited, by whom, and how recently? Can you exit instantly, or is there a lockup period?</p>
    <h4>Red Flags, Not Features</h4>
    <p>"Guaranteed" fixed monthly returns. Pressure to deposit quickly. Anonymous teams with no audit history.</p>` },
  { title:"This Month's Web3 Mini-Guide", desc:"New topic each month — this month: liquid staking, explained plainly.", minTier:2,
    body:`<h4>Liquid Staking, Plainly</h4>
    <p>Liquid staking lets you stake an asset while receiving a tradeable token representing your staked position. The yield comes from network rewards — not from new depositor funds, which is the key distinction from unsustainable "yield" products.</p>` },
  { title:"Income-Layering Worksheet", desc:"Build a savings/CD/T-bill ladder using your own numbers.", minTier:3,
    body:`<h4>How Layering Works</h4>
    <p>Split funds across instruments with different liquidity: immediate-access savings, 3–12 month CDs, and T-bills for the portion you won't need soon. This worksheet walks through sizing each layer based on your own timeline — not a one-size-fits-all percentage.</p>` },
  { title:"Live Q&A Call Recording — Latest", desc:"This month's recorded member call, available to replay anytime.", minTier:3,
    body:`<h4>This Month's Call</h4>
    <p>[Recording embed placeholder] — topics covered: reading promotional CD ladders, evaluating a member-submitted web3 yield product, and Q&A on position sizing.</p>` },
];
const TIER_NAMES = {1:"The Yield Map", 2:"The Full Ledger", 3:"The Annotated Portfolio", 4:"All-Access"};

// ============ SESSION STATE ============
// Holds the signed-in user's email + their real subscription row (or null if
// they have no active subscription yet — e.g. signed up but haven't checked
// out, or their subscription was cancelled). Populated from Supabase on
// sign-in, not from localStorage/demo data anymore.
let currentUser = null;       // { email, id } from Supabase Auth
let currentSubscription = null; // row from the `subscriptions` table, or null

function openAuthModal(view){
  document.getElementById('authModal').classList.add('show');
  switchAuthView(view || 'signin');
  if(view === 'signup' || !view) updateSignupPlanUI();
}
function closeAuthModal(){
  document.getElementById('authModal').classList.remove('show');
}
function switchAuthView(view){
  document.getElementById('signinView').style.display = view === 'signin' ? 'block' : 'none';
  document.getElementById('signupView').style.display = view === 'signup' ? 'block' : 'none';
  clearAuthError();
  if(view === 'signup') updateSignupPlanUI();
}

function showAuthError(message){
  let el = document.getElementById('authError');
  if(!el){
    el = document.createElement('div');
    el.id = 'authError';
    el.style.cssText = 'color:#e08585; font-size:13px; margin-top:10px; text-align:center;';
    document.querySelector('.modal-box').appendChild(el);
  }
  el.textContent = message;
}
function clearAuthError(){
  const el = document.getElementById('authError');
  if(el) el.textContent = '';
}

// ============ SIGNUP FORM: PROGRESSIVE PLAN PICKER ============
// Three-step reveal so a plan is never required to sign up:
//   1. "Want to choose a plan now?" — Not yet (default) / Yes
//   2. If Yes: "How do you want to buy?" — Single / Stack
//   3. If Single: one tier + one billing dropdown
//      If Stack: checkboxes for any combo of the 3 individual tiers
//      (All-Access is intentionally excluded from stacking — it already
//      includes everything, so stacking it with anything else is redundant),
//      each with its own billing dropdown that only enables once checked.
function updateSignupPlanUI(){
  const wantsPlanEl = document.querySelector('input[name="wantsPlan"]:checked');
  const wantsPlan = wantsPlanEl ? wantsPlanEl.value : 'no';

  const purchaseModeField = document.getElementById('purchaseModeField');
  const singleFields = document.getElementById('singlePlanFields');
  const stackFields = document.getElementById('stackPlanFields');
  const submitBtn = document.getElementById('signupSubmitBtn');
  const stackWarning = document.getElementById('stackEmptyWarning');

  if(wantsPlan === 'no'){
    purchaseModeField.style.display = 'none';
    singleFields.style.display = 'none';
    stackFields.style.display = 'none';
    if(stackWarning) stackWarning.style.display = 'none';
    if(submitBtn) submitBtn.textContent = 'CREATE ACCOUNT';
    return;
  }

  purchaseModeField.style.display = 'block';
  const modeEl = document.querySelector('input[name="purchaseMode"]:checked');
  const mode = modeEl ? modeEl.value : 'single';

  if(mode === 'single'){
    singleFields.style.display = 'block';
    stackFields.style.display = 'none';
    if(stackWarning) stackWarning.style.display = 'none';
    if(submitBtn) submitBtn.textContent = 'CREATE ACCOUNT & CONTINUE TO CHECKOUT';
  } else {
    singleFields.style.display = 'none';
    stackFields.style.display = 'block';

    // Enable/disable each tier's billing dropdown based on whether its
    // checkbox is checked — keeps the form honest about what's actually
    // going to be purchased.
    let anyChecked = false;
    document.querySelectorAll('input[name="stackTier"]').forEach(cb=>{
      const billingSelect = document.querySelector('.stack-tier-billing[data-tier="'+cb.value+'"]');
      if(billingSelect) billingSelect.disabled = !cb.checked;
      if(cb.checked) anyChecked = true;
    });
    if(stackWarning) stackWarning.style.display = 'none'; // only shown on submit attempt, not while editing
    if(submitBtn) submitBtn.textContent = anyChecked ? 'CREATE ACCOUNT & CONTINUE TO CHECKOUT' : 'CREATE ACCOUNT';
  }
}

// ============ REAL SIGN IN ============
async function handleSignIn(e){
  e.preventDefault();
  clearAuthError();
  const email = document.getElementById('signinEmail').value;
  const password = document.getElementById('signinPassword').value;

  const submitBtn = e.target.querySelector('.modal-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'SIGNING IN…';

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  submitBtn.disabled = false;
  submitBtn.textContent = 'SIGN IN';

  if(error){
    showAuthError(error.message);
    return false;
  }

  currentUser = { email: data.user.email, id: data.user.id };
  await loadSubscriptionAndShowDashboard();
  checkStackQueue(currentUser.email);
  closeAuthModal();
  return false;
}

// ============ REAL SIGN UP ============
// Creates the Supabase account first, always — no plan selection is ever
// required to get an account. What happens next depends on what (if
// anything) was chosen on the form:
//   - "Not yet": account created, dashboard shown with no active plan.
//   - "Single": redirect straight to that one tier's Lemon Squeezy checkout.
//   - "Stack": redirect to the FIRST checked tier's checkout (Lemon Squeezy
//     buy links are one-product-at-a-time, so multiple tiers can't be paid
//     in a single checkout). The remaining checked tiers are saved to
//     localStorage as a queue; after returning from checkout and signing
//     back in, the dashboard offers a "continue stacking" prompt that walks
//     through the rest one at a time. This keeps every tier individually
//     billed and cancellable, as advertised, without losing track of what
//     they originally asked to stack.
async function handleSignUp(e){
  e.preventDefault();
  clearAuthError();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  const wantsPlanEl = document.querySelector('input[name="wantsPlan"]:checked');
  const wantsPlan = wantsPlanEl ? wantsPlanEl.value : 'no';

  let checkoutPlan = null; // { tier, billingInterval } for the first checkout to send them to
  let stackQueue = [];     // remaining { tier, billingInterval } pairs, if stacking

  if(wantsPlan === 'yes'){
    const modeEl = document.querySelector('input[name="purchaseMode"]:checked');
    const mode = modeEl ? modeEl.value : 'single';

    if(mode === 'single'){
      const tierSelect = document.getElementById('signupTier');
      const billingSelect = document.getElementById('signupBillingInterval');
      checkoutPlan = {
        tier: tierSelect ? parseInt(tierSelect.value, 10) : 2,
        billingInterval: billingSelect ? billingSelect.value : 'monthly',
      };
    } else {
      const checked = Array.from(document.querySelectorAll('input[name="stackTier"]:checked'));
      if(checked.length === 0){
        const stackWarning = document.getElementById('stackEmptyWarning');
        if(stackWarning) stackWarning.style.display = 'block';
        return false; // don't submit — nothing was actually picked to stack
      }
      const plans = checked.map(cb=>{
        const billingSelect = document.querySelector('.stack-tier-billing[data-tier="'+cb.value+'"]');
        return { tier: parseInt(cb.value, 10), billingInterval: billingSelect ? billingSelect.value : 'monthly' };
      });
      checkoutPlan = plans[0];
      stackQueue = plans.slice(1);
    }
  }
  // wantsPlan === 'no' → checkoutPlan stays null, account is created with no purchase.

  const submitBtn = e.target.querySelector('.modal-submit');
  submitBtn.disabled = true;
  submitBtn.textContent = 'CREATING ACCOUNT…';

  const { data, error } = await supabase.auth.signUp({ email, password });

  submitBtn.disabled = false;

  if(error){
    showAuthError(error.message);
    submitBtn.textContent = checkoutPlan ? 'CREATE ACCOUNT & CONTINUE TO CHECKOUT' : 'CREATE ACCOUNT';
    return false;
  }

  // No plan chosen — just land them in the (empty) dashboard. No purchase
  // was ever required to get here.
  if(!checkoutPlan){
    currentUser = { email: data.user.email, id: data.user.id };
    closeAuthModal();
    await loadSubscriptionAndShowDashboard();
    return false;
  }

  const checkoutUrl = buildCheckoutUrl(checkoutPlan.tier, email, checkoutPlan.billingInterval);

  if(!checkoutUrl){
    // Account still exists even if we can't build the URL — don't strand them.
    showAuthError("Account created, but we couldn't find a checkout link for that plan. Please use a START button on the pricing section above.");
    switchAuthView('signin');
    document.getElementById('signinEmail').value = email;
    return false;
  }

  if(stackQueue.length > 0){
    try {
      localStorage.setItem('ledgerStackQueue_' + email, JSON.stringify(stackQueue));
    } catch(err){
      console.error('Could not save stack queue:', err);
    }
  }

  closeAuthModal();
  window.location.href = checkoutUrl;
  return false;
}

// ============ CONTINUE STACKING (after returning from a checkout) ============
// If this user has a saved stack queue (more tiers they wanted to add when
// they originally signed up), offer to send them to the next one. Called
// after sign-in, alongside the normal dashboard load.
function checkStackQueue(email){
  let queue = [];
  try {
    queue = JSON.parse(localStorage.getItem('ledgerStackQueue_' + email) || '[]');
  } catch(err){
    queue = [];
  }
  if(!queue.length) return;

  const next = queue[0];
  const proceed = confirm(
    "You still have " + queue.length + " more guide" + (queue.length > 1 ? "s" : "") +
    " to finish adding to your stack. Continue to checkout for " +
    (TIER_NAMES[next.tier] || ('Tier ' + next.tier)) + " now?"
  );
  if(!proceed) return;

  const remaining = queue.slice(1);
  if(remaining.length > 0){
    try { localStorage.setItem('ledgerStackQueue_' + email, JSON.stringify(remaining)); }
    catch(err){ console.error('Could not update stack queue:', err); }
  } else {
    try { localStorage.removeItem('ledgerStackQueue_' + email); }
    catch(err){ /* non-fatal */ }
  }

  const checkoutUrl = buildCheckoutUrl(next.tier, email, next.billingInterval);
  if(checkoutUrl) window.location.href = checkoutUrl;
}

// ============ REAL SIGN OUT ============
async function signOut(){
  await supabase.auth.signOut();
  currentUser = null;
  currentSubscription = null;
  document.getElementById('dashboard').classList.remove('show');
  document.body.style.overflow = '';
}

// ============ LOAD REAL SUBSCRIPTION DATA ============
// Reads the signed-in user's row from the `subscriptions` table (RLS-protected,
// SELECT-only for authenticated users — writes only happen via the ls-webhook
// Edge Function using the service role key). If no row exists yet, the person
// has an account but no active plan, and the dashboard reflects that honestly
// instead of showing fake demo data.
async function loadSubscriptionAndShowDashboard(){
  if(!currentUser) return;

  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_email', currentUser.email)
    .eq('status', 'active')
    .order('created_at', { ascending: false });

  if(error){
    console.error('Error loading subscription:', error);
    currentSubscription = null;
  } else if(data && data.length > 0){
    // If someone is stacking tiers, they'll have multiple active rows.
    currentSubscription = data;
  } else {
    currentSubscription = null;
  }

  showDashboard();
}

function showDashboard(){
  if(!currentUser) return;
  document.getElementById('demoEmailDisplay').textContent = currentUser.email;

  const dashHero = document.querySelector('.dash-hero');

  if(!currentSubscription || currentSubscription.length === 0){
    // Real "no active plan" state — not demo data.
    const statusNote = document.getElementById('dashStatusNote');
    if(statusNote){
      statusNote.textContent = "No active subscription found yet. If you just checked out, this can take a minute to sync — try refreshing. Otherwise, pick a plan above to get started.";
      statusNote.style.display = 'block';
    }
    document.getElementById('dashPlanName').textContent = 'NO ACTIVE PLAN';
    document.getElementById('dashPlanVal').textContent = '—';
    document.getElementById('dashBillingVal').textContent = '—';
    const planBadge = document.querySelector('.dash-plan-badge');
    if(planBadge) planBadge.innerHTML = '<span class="tick" style="background:var(--gold); width:14px; height:1px; display:inline-block;"></span> NO ACTIVE PLAN';
    document.getElementById('libraryGrid').innerHTML =
      '<p style="color:var(--slate); font-size:14px;">No active subscription found for this account yet. ' +
      'If you just checked out, this can take a minute to sync — try refreshing. ' +
      'Otherwise, pick a plan above to get started.</p>';
    document.getElementById('dashboard').classList.add('show');
    document.body.style.overflow = 'hidden';
    return;
  }

  // Effective tier = the highest tier among all active rows (handles both
  // single-plan members with one row and stacked members with several).
  const statusNote = document.getElementById('dashStatusNote');
  if(statusNote) statusNote.style.display = 'none';
  const tiers = currentSubscription.map(row => row.tier);
  const effectiveTier = Math.max(...tiers);
  const planLabel = currentSubscription.map(row => TIER_NAMES[row.tier] || ('Tier ' + row.tier)).join(' + ');
  const billingLabel = currentSubscription[0].billing_interval
    ? currentSubscription[0].billing_interval.charAt(0).toUpperCase() + currentSubscription[0].billing_interval.slice(1)
    : '—';

  document.getElementById('dashPlanName').textContent = planLabel.toUpperCase();
  document.getElementById('dashPlanVal').textContent = planLabel;
  document.getElementById('dashBillingVal').textContent = billingLabel;

  const renewsEl = document.querySelector('.dash-meta-item .val'); // first .val = current plan, so target renews specifically below
  const renewsValEl = document.querySelectorAll('.dash-meta .val')[2];
  if(renewsValEl){
    renewsValEl.textContent = currentSubscription[0].renews_at
      ? new Date(currentSubscription[0].renews_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' })
      : 'Lifetime — no renewal';
  }

  renderSavings();

  const grid = document.getElementById('libraryGrid');
  grid.innerHTML = '';
  LIBRARY.forEach((item, idx)=>{
    const unlocked = effectiveTier >= item.minTier;
    const card = document.createElement('div');
    card.className = 'library-item' + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <div class="lib-tag">${unlocked ? 'INCLUDED IN YOUR PLAN' : 'REQUIRES ' + (TIER_NAMES[item.minTier] || '').toUpperCase()}</div>
      <h4>${item.title}</h4>
      <p>${item.desc}</p>
      <div class="lib-action ${unlocked ? '' : 'locked-action'}" data-idx="${idx}">
        ${unlocked ? 'VIEW →' : '🔒 LOCKED — UPGRADE TO UNLOCK'}
      </div>`;
    if(unlocked){
      card.querySelector('.lib-action').addEventListener('click', ()=> openViewer(idx));
    }
    grid.appendChild(card);
  });

  document.getElementById('dashboard').classList.add('show');
  document.body.style.overflow = 'hidden';
}

// DEMO: a simple self-reported savings tracker. Still localStorage-based —
// not yet wired to a per-user backend table. Left as-is for this pass since
// it's independent of the auth/subscription wiring.
function renderSavings(){
  const total = parseFloat(localStorage.getItem('ledgerTotalSavings') || '0');
  document.getElementById('totalSavings').textContent = '$' + total.toLocaleString();
  document.getElementById('savingsSub').textContent = total > 0
    ? "Nice. That's already more than this tier costs for the year."
    : "Log your first one — it takes 10 seconds.";
}
function logWin(){
  const amount = prompt("Roughly how much did this save or protect you? (e.g. extra interest earned this year, or an amount you avoided losing)");
  const num = parseFloat(amount);
  if(isNaN(num) || num <= 0) return;
  const total = parseFloat(localStorage.getItem('ledgerTotalSavings') || '0') + num;
  localStorage.setItem('ledgerTotalSavings', total.toString());
  renderSavings();
}

// ============ CONTENT VIEWER: PER-USER WATERMARK + COPY DETERRENCE ============
// NOTE: this deters casual copy/paste and identifies the source of any leaked
// screenshot or photo via the visible watermark. It does not and cannot block
// screenshots themselves — no website can detect or prevent OS-level screenshots,
// regardless of what JS or CSS tricks are used. Don't let anyone tell you otherwise.
function buildWatermark(email){
  const stamp = email + ' · ' + new Date().toLocaleDateString();
  const layer = document.createElement('div');
  layer.className = 'watermark-layer';
  for(let i=0; i<24; i++){
    const s = document.createElement('span');
    s.textContent = stamp;
    layer.appendChild(s);
  }
  return layer;
}

function openViewer(idx){
  const item = LIBRARY[idx];
  if(!item || !currentUser) return;
  document.getElementById('viewerTitle').textContent = item.title;
  document.getElementById('viewerLicenseEmail').textContent = currentUser.email;

  const contentEl = document.getElementById('viewerContent');
  contentEl.innerHTML = '';
  const body = document.createElement('div');
  body.innerHTML = item.body || '<p>Content coming soon.</p>';
  contentEl.appendChild(body);
  contentEl.appendChild(buildWatermark(currentUser.email)); // per-user visible watermark

  document.getElementById('contentViewer').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeViewer(){
  document.getElementById('contentViewer').classList.remove('show');
  // The dashboard sits underneath the viewer and is itself a full-screen
  // overlay, so scroll should stay locked only if the dashboard is still
  // open. Previously this unconditionally re-locked scroll, which left the
  // page stuck even after both overlays were closed.
  const dashboardOpen = document.getElementById('dashboard').classList.contains('show');
  document.body.style.overflow = dashboardOpen ? 'hidden' : '';
}

// Copy/right-click/print deterrence scoped to the content viewer only —
// never applied site-wide, so the marketing pages stay normal to use and to search-engine-index.
document.addEventListener('copy', (e)=>{
  if(document.getElementById('contentViewer').classList.contains('show')){
    e.preventDefault();
  }
});
document.addEventListener('keydown', (e)=>{
  const viewerOpen = document.getElementById('contentViewer').classList.contains('show');
  if(viewerOpen && ((e.ctrlKey||e.metaKey) && ['c','p','s'].includes(e.key.toLowerCase()))){
    e.preventDefault();
  }
});

function setBilling(period){
  document.querySelectorAll('.billing-seg').forEach(b=>{
    b.classList.toggle('active', b.dataset.billing === period);
  });
  ['monthly','quarterly','annual','lifetime'].forEach(p=>{
    document.querySelectorAll('.price-'+p).forEach(el=> el.style.display = (p===period) ? 'inline' : 'none');
    document.querySelectorAll('.price-period-'+p).forEach(el=> el.style.display = (p===period) ? 'inline' : 'none');
  });
  document.querySelectorAll('.annual-note').forEach(el=> el.style.display = (period==='annual') ? 'block' : 'none');
  document.querySelectorAll('.quarterly-note').forEach(el=> el.style.display = (period==='quarterly') ? 'block' : 'none');
  document.querySelectorAll('.lifetime-note').forEach(el=> el.style.display = (period==='lifetime') ? 'block' : 'none');

  // Keep the signup modal's billing dropdown in sync with whichever toggle
  // the person last clicked on the pricing section, so if they then click a
  // START button (which opens signup pre-set to that product) the billing
  // interval they were already looking at carries through.
  const signupBillingSelect = document.getElementById('signupBillingInterval');
  if(signupBillingSelect) signupBillingSelect.value = period;
}

// When a pricing-section START button is clicked, open the signup modal
// pre-set to that exact tier (and whatever billing interval is currently
// toggled) instead of sending the person straight to checkout with no
// account. This keeps "create account" and "checkout" as one flow.
function initProductButtons(){
  document.querySelectorAll('.product-btn[data-tier]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      e.preventDefault();
      const tier = btn.getAttribute('data-tier');

      // Pre-set the form to "yes, single plan, this tier" so clicking a
      // specific product button takes someone straight to the right
      // dropdowns already filled in, rather than landing on the generic
      // "want a plan now?" question they'd have to answer again.
      const wantsPlanYes = document.querySelector('input[name="wantsPlan"][value="yes"]');
      if(wantsPlanYes) wantsPlanYes.checked = true;
      const modeSingle = document.querySelector('input[name="purchaseMode"][value="single"]');
      if(modeSingle) modeSingle.checked = true;

      const tierSelect = document.getElementById('signupTier');
      if(tierSelect) tierSelect.value = tier;
      const activeBilling = document.querySelector('.billing-seg.active');
      const billingSelect = document.getElementById('signupBillingInterval');
      if(billingSelect && activeBilling) billingSelect.value = activeBilling.dataset.billing;

      openAuthModal('signup');
      updateSignupPlanUI();
    });
  });
}

function toggleFaq(el){
  const item = el.parentElement;
  const answer = item.querySelector('.faq-a');
  const wasOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i=>{
    i.classList.remove('open');
    i.querySelector('.faq-a').style.maxHeight = null;
  });
  if(!wasOpen){
    item.classList.add('open');
    answer.style.maxHeight = answer.scrollHeight + 'px';
  }
}

// ============ MOBILE NAV MENU ============
function initMobileNav(){
  const toggle = document.getElementById('navMobileToggle');
  const links = document.getElementById('navLinks');
  if(!toggle || !links) return;

  toggle.addEventListener('click', ()=>{
    const isOpen = links.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.textContent = isOpen ? '×' : '☰';
  });

  links.addEventListener('click', (e)=>{
    if(e.target.tagName === 'A'){
      links.classList.remove('mobile-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }
  });
  document.addEventListener('click', (e)=>{
    if(!links.classList.contains('mobile-open')) return;
    if(links.contains(e.target) || toggle.contains(e.target)) return;
    links.classList.remove('mobile-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = '☰';
  });
}
initMobileNav();
initProductButtons();

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); }
  });
},{threshold:0.12});
revealEls.forEach(el=>obs.observe(el));

// ============ EMAIL CAPTURE POPUP ============
function showEmailPopup(){
  if(sessionStorage.getItem('ledgerEmailPopupSeen')) return;
  if(currentUser) return; // don't bug existing members
  const overlay = document.getElementById('emailPopup');
  overlay.classList.add('show');
  requestAnimationFrame(()=> overlay.classList.add('in'));
  sessionStorage.setItem('ledgerEmailPopupSeen', '1');
}
function closeEmailPopup(){
  const overlay = document.getElementById('emailPopup');
  overlay.classList.remove('in');
  setTimeout(()=> overlay.classList.remove('show'), 300);
}
function handleEmailCapture(e){
  e.preventDefault();
  const email = document.getElementById('popupEmail').value;
  // DEMO: in production, send this email to your list provider (e.g. via a
  // Lemon Squeezy newsletter integration, ConvertKit, or Mailchimp API call),
  // and trigger an automated welcome email that delivers
  // "stock-evaluation-framework.md" (rendered as a PDF) — see build notes
  // for the exact automation steps.
  console.log('Captured lead email:', email);
  document.getElementById('emailPopupForm').style.display = 'none';
  document.getElementById('emailPopupSuccess').style.display = 'block';
  setTimeout(closeEmailPopup, 2200);
  return false;
}
setTimeout(showEmailPopup, 4000);

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){ closeAuthModal(); closeEmailPopup(); closeViewer(); }
});

// ============ RESTORE SESSION ON PAGE LOAD ============
// If the person already has a valid Supabase session (e.g. they refreshed
// the page), restore it instead of forcing them to sign in again.
(async function restoreSession(){
  const { data } = await supabase.auth.getSession();
  if(data && data.session && data.session.user){
    currentUser = { email: data.session.user.email, id: data.session.user.id };
    await loadSubscriptionAndShowDashboard();
    checkStackQueue(currentUser.email);
  }
})();
