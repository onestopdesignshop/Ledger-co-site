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
const TIER_NAMES = {1:"The Yield Map", 2:"The Full Ledger", 3:"The Annotated Portfolio", 4:"All-Access"};

// DEMO STATE — in a real build this comes from your Lemon Squeezy + Supabase session, not localStorage
let demoState = JSON.parse(localStorage.getItem('ledgerDemoState') || 'null');

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
}

function handleSignIn(e){
  e.preventDefault();
  const email = document.getElementById('signinEmail').value;
  // DEMO: accepts any email/password and loads a sample "Full Ledger" plan.
  // REAL VERSION: call your auth provider, then look up this user's active
  // Lemon Squeezy subscription tier from your database before rendering the dashboard.
  //
  // SINGLE-SESSION ENFORCEMENT (the real mechanism, not simulated here):
  // Each sign-in should generate a new session token and write it to a
  // `current_session_token` column on that user's row in Supabase, overwriting
  // any previous token. Every authenticated request from the dashboard checks
  // that its token still matches the one stored server-side. If someone signs
  // in elsewhere, the old token no longer matches, and that other device is
  // signed out next time it tries to load anything — effectively one active
  // device per account. Supabase Auth's session management + a short
  // Postgres trigger handles this; full snippet is in backend-wiring-guide.md.
  if(!demoState){
    demoState = { email: email, tier: 2, billing: "Monthly" };
    localStorage.setItem('ledgerDemoState', JSON.stringify(demoState));
  } else {
    demoState.email = email;
  }
  closeAuthModal();
  showDashboard();
  return false;
}

function handleSignUp(e){
  e.preventDefault();
  const email = document.getElementById('signupEmail').value;
  const mode = document.querySelector('input[name="purchaseMode"]:checked').value; // 'single' or 'stack'
  // DEMO: in production this should create the user in your auth provider,
  // store their chosen purchase mode (single vs. stack) on their account row,
  // then redirect to the specific Lemon Squeezy checkout(s) for the plan(s) they
  // picked — for "stack," that means a separate checkout per tier, each its own
  // Lemon Squeezy subscription, with a 15% stacking discount coupon applied to
  // every tier after the first. Dashboard access unlocks per-tier as each
  // webhook confirms payment — see backend-wiring-guide.md.
  alert(mode === 'stack'
    ? "In the live version, you'd now check out each tier separately, with 15% off every tier after your first. Your dashboard will show all of them together."
    : "In the live version, this continues to Lemon Squeezy checkout for the single plan you selected. You can upgrade, downgrade, or switch to All-Access anytime from your dashboard.");
  demoState = { email: email, tier: 2, billing: "Monthly", mode: mode, stackedTiers: mode === 'stack' ? [1,2] : null };
  localStorage.setItem('ledgerDemoState', JSON.stringify(demoState));
  closeAuthModal();
  showDashboard();
  return false;
}

function signOut(){
  // Fully clear demo session state (in addition to hiding the dashboard) so a
  // fresh sign-in doesn't inherit the previous session's plan/email. A real
  // implementation should also invalidate the server-side session token here.
  demoState = null;
  localStorage.removeItem('ledgerDemoState');
  document.getElementById('dashboard').classList.remove('show');
  document.body.style.overflow = '';
}

function showDashboard(){
  if(!demoState) return;
  document.getElementById('demoEmailDisplay').textContent = demoState.email;

  // In "stack" mode, a member's effective unlock level is the highest tier
  // among their separately-purchased tiers, even though each is billed
  // independently. In "single" mode, it's just their one active tier.
  const effectiveTier = demoState.mode === 'stack' && demoState.stackedTiers
    ? Math.max(...demoState.stackedTiers)
    : demoState.tier;

  const planLabel = demoState.mode === 'stack' && demoState.stackedTiers
    ? demoState.stackedTiers.map(t => TIER_NAMES[t]).join(' + ')
    : TIER_NAMES[demoState.tier];

  document.getElementById('dashPlanName').textContent = planLabel.toUpperCase();
  document.getElementById('dashPlanVal').textContent = planLabel;
  document.getElementById('dashBillingVal').textContent = demoState.billing;
  renderSavings();

  const grid = document.getElementById('libraryGrid');
  grid.innerHTML = '';
  LIBRARY.forEach((item, idx)=>{
    const unlocked = effectiveTier >= item.minTier;
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

// DEMO: a simple self-reported savings tracker. In production, store this
// per-user in your Supabase `subscriptions`-adjacent table (e.g. a `wins` table
// keyed by user_email) rather than localStorage, so it persists across devices.
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
  if(!item || !demoState) return;
  document.getElementById('viewerTitle').textContent = item.title;
  document.getElementById('viewerLicenseEmail').textContent = demoState.email;

  const contentEl = document.getElementById('viewerContent');
  contentEl.innerHTML = '';
  const body = document.createElement('div');
  body.innerHTML = item.body || '<p>Content coming soon.</p>';
  contentEl.appendChild(body);
  contentEl.appendChild(buildWatermark(demoState.email)); // per-user visible watermark

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
// Toggles the same .navlinks list used by desktop nav; CSS shows it as a
// dropdown panel under 860px width. Previously the toggle button existed in
// markup/CSS with no JS behind it, so tapping it did nothing.
function initMobileNav(){
  const toggle = document.getElementById('navMobileToggle');
  const links = document.getElementById('navLinks');
  if(!toggle || !links) return;

  toggle.addEventListener('click', ()=>{
    const isOpen = links.classList.toggle('mobile-open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    toggle.textContent = isOpen ? '×' : '☰';
  });

  // Close the menu after tapping a nav link, and when clicking outside it.
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
  if(demoState) return; // don't bug existing members
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
