// ============ DEMO CONTENT LIBRARY (replace with real data from your backend) ============
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

// ============================================================================
// REAL SUPABASE AUTH (replaces the old demo/localStorage auth)
// ============================================================================
const SUPABASE_URL = "https://wtlftsaigiehropidurn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bGZ0c2FpZ2llaHJvcGlkdXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgxMDgsImV4cCI6MjA5NzQwNDEwOH0.tXL7p_ULHp-HePXceMNbOKJAsHHlAlfR6v4UDWaZ1Z0";
const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
// Expose the client so paddle-checkout.js can read the live session at
// checkout time (so the buyer's email is always attached without sign-out).
window.__ledgerSupabaseClient = sb;

// Tier names now include the Capital Systems Suite (5/6/7).
const TIER_NAMES = {
  1:"The Yield Map",
  2:"The Full Ledger",
  3:"The Annotated Portfolio",
  4:"All-Access",
  5:"Capital Systems — Foundation",
  6:"Capital Systems — Operator",
  7:"Capital Systems — Institutional",
};

// Current signed-in user's resolved access. Null when logged out.
let currentUser = null; // { email, tier, billing_interval, status }

// Exposed so paddle-checkout.js can attach the email to checkout.
window.__ledgerUserEmail = null;

function openAuthModal(view){
  document.getElementById('authModal').classList.add('show');
  switchAuthView(view || 'signin');
}
function closeAuthModal(){
  document.getElementById('authModal').classList.remove('show');
}
function switchAuthView(view){
  document.getElementById('signinView').style.display = view === 'signin' ? 'block' : 'none';
  document.getElementById('signupView').style.display = view === 'signup' ? 'block' : 'none';
  var resetView = document.getElementById('resetRequestView');
  if(resetView) resetView.style.display = view === 'reset' ? 'block' : 'none';
}

// Send a password-reset email. Supabase emails the user a secure link that
// lands on reset-password.html, where they set a new password.
async function handleResetRequest(e){
  e.preventDefault();
  const email = document.getElementById('resetEmail').value.trim().toLowerCase();
  const btn = document.getElementById('resetRequestBtn');
  if(btn){ btn.disabled = true; btn.textContent = 'SENDING…'; }

  const { error } = await sb.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://onestopdesignshop.github.io/Ledger-co-site/reset-password.html'
  });

  if(btn){ btn.disabled = false; btn.textContent = 'SEND RESET LINK'; }

  // Always show the same confirmation whether or not the email exists —
  // this avoids revealing which emails have accounts (a privacy best practice).
  if(error){
    console.error('Reset request error:', error.message);
  }
  var formWrap = document.getElementById('resetRequestForm');
  var doneWrap = document.getElementById('resetRequestDone');
  if(formWrap) formWrap.style.display = 'none';
  if(doneWrap) doneWrap.style.display = 'block';
  return false;
}

// Look up this user's tier from the subscriptions table.
async function fetchAccess(email){
  const { data, error } = await sb
    .from("subscriptions")
    .select("tier, billing_interval, status")
    .eq("user_email", email)
    .order("tier", { ascending: false }) // if multiple rows, take highest tier
    .limit(1)
    .maybeSingle();
  if (error) {
    console.error("Access lookup failed:", error.message);
    return null;
  }
  return data; // null if no active purchase yet
}

async function handleSignIn(e){
  e.preventDefault();
  const email = document.getElementById('signinEmail').value.trim().toLowerCase();
  const password = document.getElementById('signinPassword').value;

  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    alert("Sign-in failed: " + error.message);
    return false;
  }
  await loadUserAndShow(email);
  return false;
}

async function handleSignUp(e){
  e.preventDefault();
  const email = document.getElementById('signupEmail').value.trim().toLowerCase();
  const password = document.getElementById('signupPassword').value;
  const modeEl = document.querySelector('input[name="purchaseMode"]:checked');
  const mode = modeEl ? modeEl.value : 'single';

  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) {
    alert("Sign-up failed: " + error.message);
    return false;
  }

  // If "Confirm email" is ON in Supabase, there's no session until they verify.
  if (data.session) {
    await loadUserAndShow(email);
    // After sign-up, send them to checkout for the plan they picked.
    // (Their dashboard will show "No active plan" until the purchase webhook fires.)
  } else {
    alert("Account created. Check your email to confirm, then sign in.");
    switchAuthView("signin");
  }
  return false;
}

// Shared post-auth: resolve access, expose email to checkout, show dashboard.
async function loadUserAndShow(email){
  const access = await fetchAccess(email);
  currentUser = {
    email,
    tier: access && access.status === "active" ? (access.tier ?? 0) : 0,
    billing_interval: access?.billing_interval ?? "—",
    status: access?.status ?? "none",
  };
  window.__ledgerUserEmail = email;
  closeAuthModal();
  showDashboard();
}

async function signOut(){
  await sb.auth.signOut();
  currentUser = null;
  window.__ledgerUserEmail = null;
  document.getElementById('dashboard').classList.remove('show');
  document.body.style.overflow = '';
}

function showDashboard(){
  if(!currentUser) return;
  const tier = currentUser.tier; // 0 = signed in, no purchase yet
  document.getElementById('demoEmailDisplay').textContent = currentUser.email;

  const planLabel = tier >= 1 ? TIER_NAMES[tier] : "No active plan";
  document.getElementById('dashPlanName').textContent = planLabel.toUpperCase();
  document.getElementById('dashPlanVal').textContent = planLabel;
  document.getElementById('dashBillingVal').textContent = currentUser.billing_interval;
  renderSavings();

  const grid = document.getElementById('libraryGrid');
  grid.innerHTML = '';
  LIBRARY.forEach((item, idx)=>{
    const unlocked = tier >= item.minTier;
    const card = document.createElement('div');
    card.className = 'library-item' + (unlocked ? '' : ' locked');
    card.innerHTML = `
      <div class="lib-tag">${unlocked ? 'INCLUDED IN YOUR PLAN' : 'REQUIRES ' + TIER_NAMES[item.minTier].toUpperCase()}</div>
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

// Restore session on page load (refresh shouldn't sign them out).
(async function restoreSession(){
  try {
    const { data } = await sb.auth.getSession();
    if (data?.session?.user?.email) {
      window.__ledgerUserEmail = data.session.user.email;
      // Not auto-opening the dashboard on load; just expose the email so
      // checkout works for an already-signed-in visitor.
    }
  } catch (err) {
    console.error("Session restore failed:", err);
  }
})();

// DEMO: a simple self-reported savings tracker. In production, store this
// per-user in Supabase rather than localStorage so it persists across devices.
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
  contentEl.appendChild(buildWatermark(currentUser.email));

  document.getElementById('contentViewer').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeViewer(){
  document.getElementById('contentViewer').classList.remove('show');
  const dashboardOpen = document.getElementById('dashboard').classList.contains('show');
  document.body.style.overflow = dashboardOpen ? 'hidden' : '';
}

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

  // CRITICAL: keep each checkout button's price ID in sync with the toggle.
  // Buttons carry data-product-key (e.g. "yieldMap"); we rebuild the full
  // price path (e.g. "yieldMap.lifetime") so the RIGHT Paddle price opens.
  // Without this, every button stays stuck on ".monthly" no matter what
  // price the card is showing.
  // We sync only the main tier buttons inside .product-card and
  // .all-access-card. The "Go to checkout" annual banner button lives in
  // .annual-banner and is intentionally NOT synced — it must always stay
  // on allAccess.annual.
  document.querySelectorAll('.product-card [data-product-key], .all-access-card [data-product-key]').forEach(btn=>{
    var key = btn.getAttribute('data-product-key');
    if(key) btn.setAttribute('data-price-id', key + '.' + period);
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
  if(currentUser) return; // don't bug signed-in members
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

// ============================================================================
// SIGNUP FORM UI — quiz + single/stack plan picker
// These are referenced by onchange/onclick in index.html's signup form.
// They control which fields show; actual checkout happens via the START
// buttons (Paddle) — signup here just creates the account.
// ============================================================================

function updateSignupPlanUI(){
  var wants = (document.querySelector('input[name="wantsPlan"]:checked') || {}).value || 'no';
  var quizFields = document.getElementById('quizFields');
  var modeField = document.getElementById('purchaseModeField');
  var singleFields = document.getElementById('singlePlanFields');
  var stackFields = document.getElementById('stackPlanFields');

  // Show quiz only when "help me decide"
  if(quizFields) quizFields.style.display = (wants === 'quiz') ? 'block' : 'none';

  // Show purchase-mode (single/stack) only when "yes, set me up"
  if(modeField) modeField.style.display = (wants === 'yes') ? 'block' : 'none';

  if(wants === 'yes'){
    var mode = (document.querySelector('input[name="purchaseMode"]:checked') || {}).value || 'single';
    if(singleFields) singleFields.style.display = (mode === 'single') ? 'block' : 'none';
    if(stackFields)  stackFields.style.display  = (mode === 'stack')  ? 'block' : 'none';

    // Enable each stack tier's billing dropdown only when its checkbox is checked
    document.querySelectorAll('.stack-tier-row').forEach(function(row){
      var cb = row.querySelector('input[type="checkbox"]');
      var sel = row.querySelector('.stack-tier-billing');
      if(cb && sel) sel.disabled = !cb.checked;
    });
  } else {
    if(singleFields) singleFields.style.display = 'none';
    if(stackFields)  stackFields.style.display  = 'none';
  }
}

function updateQuizRecommendation(){
  var goal   = (document.getElementById('quizGoal')   || {}).value || 'web3-curious';
  var depth  = (document.getElementById('quizDepth')  || {}).value || 'light';
  var budget = (document.getElementById('quizBudget') || {}).value || 'low';

  // Simple steer: map answers to a recommended tier (1-4).
  var tier = 2; // default Full Ledger
  if(goal === 'park-cash' && depth === 'light' && budget === 'low') tier = 1;
  else if(goal === 'all-of-it' || depth === 'deep') tier = 4;
  else if(goal === 'build-income') tier = 3;
  else if(goal === 'web3-curious') tier = 2;
  if(budget === 'high' && tier < 3) tier = 3;

  var names = {1:'The Yield Map', 2:'The Full Ledger', 3:'The Annotated Portfolio', 4:'All-Access'};
  var notes = {
    1:'A low-cost start if you mainly want better places to park cash.',
    2:'A good middle ground if web3 questions are part of what brought you here.',
    3:'Deeper, hands-on guidance with worksheets and a monthly call.',
    4:'Everything across all tiers, with combined priority Q&A.'
  };
  var nameEl = document.getElementById('quizResultName');
  var noteEl = document.getElementById('quizResultNote');
  if(nameEl) nameEl.textContent = names[tier];
  if(noteEl) noteEl.textContent = notes[tier];

  // stash for applyQuizRecommendation
  window.__quizRecommendedTier = tier;
}

function applyQuizRecommendation(){
  var tier = window.__quizRecommendedTier || 2;
  // Switch the user into "yes, set me up" + single plan, preset to the tier.
  var yesRadio = document.querySelector('input[name="wantsPlan"][value="yes"]');
  if(yesRadio) yesRadio.checked = true;
  var singleRadio = document.querySelector('input[name="purchaseMode"][value="single"]');
  if(singleRadio) singleRadio.checked = true;
  var tierSelect = document.getElementById('signupTier');
  if(tierSelect) tierSelect.value = String(tier);
  updateSignupPlanUI();
}

// Run once on load so the form starts in the right state.
document.addEventListener('DOMContentLoaded', function(){
  if(document.querySelector('input[name="wantsPlan"]')) updateSignupPlanUI();
  if(document.getElementById('quizGoal')) updateQuizRecommendation();
  // Initialize billing toggle to monthly so every checkout button's
  // data-price-id is correctly set from the start (not just after a tap).
  if(document.querySelector('.billing-seg')) setBilling('monthly');
});
