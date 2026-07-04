// ============ SUPABASE CLIENT ============
// Project: onestopdesignshop's Project (wtlftsaigiehropidurn)
// The key below is the anon/public key — safe to expose in browser code.
// It only works within the limits of your Row Level Security policies.
const SUPABASE_URL = "https://wtlftsaigiehropidurn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bGZ0c2FpZ2llaHJvcGlkdXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgxMDgsImV4cCI6MjA5NzQwNDEwOH0.tXL7p_ULHp-HePXceMNbOKJAsHHlAlfR6v4UDWaZ1Z0";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.__ledgerSupabaseClient = supabase;

// ============ CONTENT LIBRARY ============
// Evergreen educational frameworks — no live rates, always accurate.
// minTier gates each guide: 1=Yield Map, 2=Full Ledger, 3=Annotated Portfolio, 4=All-Access.
// A member sees an item unlocked when their effective tier >= the item's minTier.
const LIBRARY = [

  // ---------- TIER 1: THE YIELD MAP ----------
  {
    title: "The Cash-Placement Decision Framework",
    desc: "A repeatable way to decide where any dollar of cash should sit — before you chase a rate.",
    minTier: 1,
    body: `
      <h4>Start with the job the money has to do</h4>
      <p>Every dollar of cash has a <em>time horizon</em> and a <em>certainty requirement</em>. Before comparing any rates, sort the money into three buckets:</p>
      <p><strong>1. Spending buffer (0–1 month):</strong> Needs to be instantly accessible, zero risk to principal, and you should never optimize this for yield. Convenience beats basis points here.</p>
      <p><strong>2. Reserve (1–12 months):</strong> Money you'll likely need within a year — emergency fund, planned purchases. This is where high-yield savings and money-market accounts earn their place: liquid, insured, competitive.</p>
      <p><strong>3. Parked capital (12+ months):</strong> Cash you're confident you won't touch soon. This can tolerate a lockup in exchange for a better, guaranteed rate — CDs and Treasury bills belong here.</p>
      <h4>Only now do you compare products</h4>
      <p>Matching the product to the bucket prevents the two most common mistakes: locking up money you'll need (and paying an early-withdrawal penalty), or leaving long-horizon cash in a checking account earning nothing.</p>
      <h4>The one question that filters most bad options</h4>
      <p>"What has to be true for this rate to actually apply to me?" A headline APY that requires a balance cap, a direct-deposit trigger, or a promo window that expires is a conditional rate — not the rate you'll earn. If you can't satisfy the condition effortlessly, treat the headline number as fiction.</p>`
  },
  {
    title: "The Fee & Fine-Print Trap Guide",
    desc: "The recurring ways a 'great rate' quietly costs more than it pays — and how to catch each one.",
    minTier: 1,
    body: `
      <h4>The five traps, in the order you'll meet them</h4>
      <p><strong>Trap 1 — The balance cap.</strong> A market-leading APY that only applies up to a low balance ceiling, with everything above earning a fraction of it. Always find the cap before you're impressed by the rate.</p>
      <p><strong>Trap 2 — The activity requirement.</strong> "Boosted" rates that require a qualifying direct deposit, a minimum number of debit transactions, or a linked account. Miss the requirement one month and you silently drop to the base rate.</p>
      <p><strong>Trap 3 — The promo cliff.</strong> A rate that's real for an introductory window, then reverts. The reversion rate — not the promo rate — is your true long-term return. Ask what it becomes, not just what it is.</p>
      <p><strong>Trap 4 — The maintenance fee.</strong> On smaller balances, a monthly fee can exceed the interest earned entirely. Always compare the fee against the dollars of interest, not against other fees.</p>
      <p><strong>Trap 5 — The minimum-to-earn.</strong> Some accounts pay their advertised rate only above a minimum balance, dropping to near-zero beneath it. If your balance fluctuates near that line, your effective rate is unpredictable.</p>
      <h4>The habit that protects you</h4>
      <p>Before opening anything, write down the single sentence describing the exact conditions under which you personally will earn the advertised rate. If you can't write that sentence clearly, you don't understand the product yet.</p>`
  },
  {
    title: "How to Compare Accounts Without Getting Played",
    desc: "A side-by-side method that surfaces the real cost and real return, not the marketing.",
    minTier: 1,
    body: `
      <h4>Build a same-columns comparison</h4>
      <p>Marketing wins when every product is described differently. You win by forcing them into identical columns. For each candidate account, fill in: <em>base rate</em>, <em>conditional rate &amp; its condition</em>, <em>balance cap</em>, <em>monthly fee</em>, <em>minimum to earn</em>, <em>insurance (FDIC/NCUA)</em>, <em>access speed</em>.</p>
      <h4>Then compute your number, not theirs</h4>
      <p>Estimate the interest <em>you</em> would actually earn on <em>your</em> typical balance, after fees and given whether you'll meet the conditions. This "effective yield to you" is frequently very different from the headline — and it's the only number that should drive the decision.</p>
      <h4>Break ties with friction and safety, never with a few basis points</h4>
      <p>Once two accounts are within a rounding error on effective yield, the tiebreakers are: is my principal insured, how fast can I get my money, and how likely am I to accidentally break a condition. A slightly lower rate with no conditions usually beats a slightly higher rate you have to actively maintain.</p>`
  },

  // ---------- TIER 2: THE FULL LEDGER (adds web3) ----------
  {
    title: "The Web3 Due-Diligence Checklist",
    desc: "The exact custody, audit, and exit questions to answer before funding any on-chain product.",
    minTier: 2,
    body: `
      <h4>Custody — who actually controls the money</h4>
      <p>Ask, in order: Do I hold the private keys, or does the platform? If the platform holds them, what stops them from freezing or losing my funds? Is this "non-custodial" in name only? You cannot evaluate anything else until you know who controls the assets.</p>
      <h4>Where the yield actually comes from</h4>
      <p>Legitimate on-chain yield has an identifiable source: network staking rewards, trading fees, or lending interest. If you can't explain in one plain sentence where the return originates, assume the worst case — that new depositor money is funding withdrawals, which is unsustainable by definition.</p>
      <h4>Audit and code</h4>
      <p>Has the smart contract been audited, by a reputable firm, and how recently? An audit is not a guarantee — it's a floor. No audit at all is a hard stop. An old audit on since-changed code is nearly as bad.</p>
      <h4>Exit liquidity</h4>
      <p>Can you withdraw instantly, or is there a lockup, a queue, or a withdrawal fee that spikes under stress? The time to discover an exit is difficult is <em>before</em> you deposit, not during a panic.</p>
      <h4>The disqualifiers</h4>
      <p>Any one of these ends the evaluation: guaranteed fixed returns, anonymous team with no track record, pressure to deposit quickly, or a yield too high to be explained by a real source. "Too good to be true" is not a cliché in this space — it's a pattern.</p>`
  },
  {
    title: "Custody & Smart-Contract Risk Primer",
    desc: "Plain-English coverage of the ways on-chain money is lost that have nothing to do with price.",
    minTier: 2,
    body: `
      <h4>Price is not the main risk</h4>
      <p>Most first-timers focus on whether an asset goes up or down. But the losses that wipe people out are usually structural, not directional. Understand these first.</p>
      <p><strong>Key loss / mismanagement:</strong> Lose your seed phrase, and the funds are gone permanently — no support line, no reset. Self-custody trades platform risk for personal-responsibility risk.</p>
      <p><strong>Smart-contract exploits:</strong> A bug in the code governing a protocol can drain deposited funds regardless of the market. This is why audit recency and code stability matter.</p>
      <p><strong>Platform insolvency:</strong> Custodial platforms can become insolvent while your balance still "shows" on their dashboard. A number on a screen is not the same as assets you control.</p>
      <p><strong>Approval / permission risk:</strong> Interacting with a malicious contract can grant it standing permission to move your tokens later. Understanding and revoking token approvals is a core safety habit.</p>
      <h4>The mindset</h4>
      <p>Treat every interaction as irreversible and every counterparty as capable of failing. Size positions so that a total loss of any single position is survivable and non-life-changing.</p>`
  },
  {
    title: "Reading a Yield Opportunity: A Worked Method",
    desc: "A step-by-step lens for pulling apart any 'passive income' crypto offer before you commit a dollar.",
    minTier: 2,
    body: `
      <h4>Step 1 — Name the mechanism</h4>
      <p>Write one sentence: "This pays a return because ___." Staking rewards, lending demand, fee-sharing — these are real. "Because more people are joining" is not a mechanism; it's a warning.</p>
      <h4>Step 2 — Stress the rate</h4>
      <p>Compare the advertised yield to boring, well-understood benchmarks. If it dwarfs them by an order of magnitude, the extra return is compensation for risk you haven't identified yet. Find the risk before you find it the hard way.</p>
      <h4>Step 3 — Map the exit</h4>
      <p>Before depositing, describe exactly how you'd get 100% of your money back and how long it would take under normal <em>and</em> stressed conditions. If the exit is vague, the position is a trap regardless of the yield.</p>
      <h4>Step 4 — Size it as if it could go to zero</h4>
      <p>Decide the position size on the assumption that this specific product could return nothing. If that size still lets you sleep, proceed. If not, the yield was never the point — your risk tolerance was the constraint all along.</p>`
  },

  // ---------- TIER 3: THE ANNOTATED PORTFOLIO (adds income strategy) ----------
  {
    title: "The Income-Layering Framework",
    desc: "Building a laddered, auditable income approach across liquidity tiers — the structure, not a stock tip.",
    minTier: 3,
    body: `
      <h4>The principle: match liquidity to need, then ladder</h4>
      <p>Instead of one lump of cash earning one rate, you split capital across instruments with staggered access and maturities. This gives you a blend of liquidity and higher guaranteed rates without gambling on timing.</p>
      <h4>The three layers</h4>
      <p><strong>Immediate layer:</strong> Instantly accessible savings for anything unexpected. Sized to cover near-term needs so you never have to break a longer instrument early.</p>
      <p><strong>Short-ladder layer:</strong> A sequence of short-maturity instruments (e.g. CDs or T-bills across staggered maturities) so that something is always maturing soon. As each matures, you either spend it or roll it to the back of the ladder.</p>
      <p><strong>Anchor layer:</strong> Longer-maturity instruments for the portion you're confident you won't need, capturing the best guaranteed rates available to you.</p>
      <h4>Why laddering beats guessing</h4>
      <p>A ladder means you never have to predict where rates go. When rates rise, maturing rungs roll into higher rates. When they fall, your longer rungs are still locked in. You've replaced a forecast with a structure — which is the entire point of disciplined income planning.</p>
      <h4>Keep it auditable</h4>
      <p>Track each rung: instrument, amount, rate, maturity, and destination on maturity. A one-page ledger of your ladder turns "I have some CDs somewhere" into a system you actually control.</p>`
  },
  {
    title: "A Sober Look at Automated & Algorithmic Strategies",
    desc: "How to evaluate 'set it and forget it' automated income tools without the hype.",
    minTier: 3,
    body: `
      <h4>Automation amplifies whatever it's given</h4>
      <p>An automated strategy is only as sound as its underlying logic and its risk controls. Automation doesn't reduce risk — it removes hesitation, which cuts both ways. Evaluate the strategy as if you were running it by hand first.</p>
      <h4>The questions that matter</h4>
      <p>What exactly triggers a buy or sell? What happens in the conditions the strategy <em>wasn't</em> designed for? Is there a hard stop that limits catastrophic loss, and does it actually execute under stress (or just in the backtest)? Who holds the funds while the automation runs?</p>
      <h4>Backtests lie by omission</h4>
      <p>A strategy tuned to past data will always look good on that data. The real question is how it behaves on conditions it has never seen. Treat impressive historical returns as marketing, not evidence.</p>
      <h4>The discipline</h4>
      <p>Never automate more capital than you'd be willing to lose to a logic flaw you didn't catch. Start small, watch it behave through a real cycle, and scale only after you've seen it handle a bad stretch — not just a good one.</p>`
  },
  {
    title: "Position Sizing Over Prediction",
    desc: "The single habit that separates durable investors from lucky ones — applied across every asset class.",
    minTier: 3,
    body: `
      <h4>You cannot reliably predict. You can always control size.</h4>
      <p>The seductive question is "will this go up?" The durable question is "how much should I commit given I might be wrong?" The second question is answerable; the first mostly isn't. Shifting your energy from prediction to sizing is the highest-leverage change most people can make.</p>
      <h4>The survivability test</h4>
      <p>For any position, ask: if this went to zero, would it change my life? If yes, the position is too big — full stop, regardless of your conviction. Conviction and correct sizing are independent; you can be right about the thesis and still ruined by the size.</p>
      <h4>Concentration vs. diversification, honestly</h4>
      <p>Concentration builds wealth; diversification protects it. Which you weight toward depends on how much you can afford to be wrong. Most people over-concentrate in what's exciting and under-diversify against what they haven't imagined. A sober allocation assumes your favorite idea is the one that fails.</p>
      <h4>Write the rule before the emotion</h4>
      <p>Decide your maximum position size as a percentage of investable assets <em>before</em> you're excited about a specific opportunity. A rule written in calm survives the moment of temptation; a decision made in excitement rarely does.</p>`
  },

];

const TIER_NAMES = {1:"The Yield Map", 2:"The Full Ledger", 3:"The Annotated Portfolio", 4:"All-Access"};

// ============ SESSION STATE ============
let currentUser = null;
let currentSubscription = null;

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
  var resetView = document.getElementById('resetRequestView');
  if(resetView) resetView.style.display = view === 'reset' ? 'block' : 'none';
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
function updateSignupPlanUI(){
  const wantsPlanEl = document.querySelector('input[name="wantsPlan"]:checked');
  const wantsPlan = wantsPlanEl ? wantsPlanEl.value : 'no';

  const quizFields = document.getElementById('quizFields');
  const purchaseModeField = document.getElementById('purchaseModeField');
  const singleFields = document.getElementById('singlePlanFields');
  const stackFields = document.getElementById('stackPlanFields');
  const submitBtn = document.getElementById('signupSubmitBtn');
  const stackWarning = document.getElementById('stackEmptyWarning');

  if(wantsPlan === 'no'){
    if(quizFields) quizFields.style.display = 'none';
    if(purchaseModeField) purchaseModeField.style.display = 'none';
    if(singleFields) singleFields.style.display = 'none';
    if(stackFields) stackFields.style.display = 'none';
    if(stackWarning) stackWarning.style.display = 'none';
    if(submitBtn) submitBtn.textContent = 'CREATE ACCOUNT';
    return;
  }

  if(wantsPlan === 'quiz'){
    if(quizFields) quizFields.style.display = 'block';
    if(purchaseModeField) purchaseModeField.style.display = 'none';
    if(singleFields) singleFields.style.display = 'none';
    if(stackFields) stackFields.style.display = 'none';
    if(stackWarning) stackWarning.style.display = 'none';
    if(submitBtn) submitBtn.textContent = 'CREATE ACCOUNT';
    updateQuizRecommendation();
    return;
  }

  if(quizFields) quizFields.style.display = 'none';
  if(purchaseModeField) purchaseModeField.style.display = 'block';
  const modeEl = document.querySelector('input[name="purchaseMode"]:checked');
  const mode = modeEl ? modeEl.value : 'single';

  if(mode === 'single'){
    if(singleFields) singleFields.style.display = 'block';
    if(stackFields) stackFields.style.display = 'none';
    if(stackWarning) stackWarning.style.display = 'none';
    if(submitBtn) submitBtn.textContent = 'CREATE ACCOUNT & CONTINUE TO CHECKOUT';
  } else {
    if(singleFields) singleFields.style.display = 'none';
    if(stackFields) stackFields.style.display = 'block';
    let anyChecked = false;
    document.querySelectorAll('input[name="stackTier"]').forEach(cb=>{
      const billingSelect = document.querySelector('.stack-tier-billing[data-tier="'+cb.value+'"]');
      if(billingSelect) billingSelect.disabled = !cb.checked;
      if(cb.checked) anyChecked = true;
    });
    if(stackWarning) stackWarning.style.display = 'none';
    if(submitBtn) submitBtn.textContent = anyChecked ? 'CREATE ACCOUNT & CONTINUE TO CHECKOUT' : 'CREATE ACCOUNT';
  }
}

// ============ SIGNUP QUIZ ============
function getQuizRecommendation(){
  const goal = (document.getElementById('quizGoal') || {}).value || 'web3-curious';
  const depth = (document.getElementById('quizDepth') || {}).value || 'light';
  const budget = (document.getElementById('quizBudget') || {}).value || 'low';

  const scores = { 1:0, 2:0, 3:0 };
  if(goal === 'park-cash') scores[1] += 3;
  if(goal === 'web3-curious') scores[2] += 3;
  if(goal === 'build-income') scores[3] += 3;
  if(goal === 'all-of-it'){ scores[1] += 1; scores[2] += 1; scores[3] += 1; }
  if(depth === 'light') scores[1] += 2;
  if(depth === 'moderate') scores[2] += 2;
  if(depth === 'deep') scores[3] += 2;
  if(budget === 'low') scores[1] += 1;
  if(budget === 'mid') scores[2] += 1;
  if(budget === 'high') scores[3] += 1;

  let bestTier = 1, bestScore = -1;
  [1,2,3].forEach(t=>{ if(scores[t] >= bestScore){ bestScore = scores[t]; bestTier = t; } });

  const stretchBudget = (bestTier === 3 && budget === 'low') || (bestTier === 2 && budget === 'low' && goal !== 'park-cash');
  const notes = {
    1: "A good starting point if the main goal is making sure cash isn't sitting somewhere underperforming.",
    2: "A good middle ground if web3 questions are part of what brought you here, without committing to the deepest tier yet.",
    3: "Fits if you're thinking in terms of an ongoing strategy, not just a single account switch.",
  };
  let note = notes[bestTier];
  if(stretchBudget) note += " Worth noting: this sits a bit above the budget you flagged — The Yield Map or Full Ledger are lighter starting points if that matters more than depth right now.";
  return { tier: bestTier, note };
}

function updateQuizRecommendation(){
  const rec = getQuizRecommendation();
  const nameEl = document.getElementById('quizResultName');
  const noteEl = document.getElementById('quizResultNote');
  if(nameEl) nameEl.textContent = TIER_NAMES[rec.tier] || ('Tier ' + rec.tier);
  if(noteEl) noteEl.textContent = rec.note;
}

function applyQuizRecommendation(){
  const rec = getQuizRecommendation();
  const wantsPlanYes = document.querySelector('input[name="wantsPlan"][value="yes"]');
  if(wantsPlanYes) wantsPlanYes.checked = true;
  const modeSingle = document.querySelector('input[name="purchaseMode"][value="single"]');
  if(modeSingle) modeSingle.checked = true;
  const tierSelect = document.getElementById('signupTier');
  if(tierSelect) tierSelect.value = String(rec.tier);
  updateSignupPlanUI();
  const singleFields = document.getElementById('singlePlanFields');
  if(singleFields) singleFields.scrollIntoView({ behavior:'smooth', block:'nearest' });
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
  if(error){ showAuthError(error.message); return false; }
  currentUser = { email: data.user.email, id: data.user.id };
  await loadSubscriptionAndShowDashboard();
  checkStackQueue(currentUser.email);
  closeAuthModal();
  return false;
}

// ============ REAL SIGN UP ============
async function handleSignUp(e){
  e.preventDefault();
  clearAuthError();
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  const wantsPlanEl = document.querySelector('input[name="wantsPlan"]:checked');
  const wantsPlan = wantsPlanEl ? wantsPlanEl.value : 'no';

  let checkoutPlan = null;
  let stackQueue = [];

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
        return false;
      }
      const plans = checked.map(cb=>{
        const billingSelect = document.querySelector('.stack-tier-billing[data-tier="'+cb.value+'"]');
        return { tier: parseInt(cb.value, 10), billingInterval: billingSelect ? billingSelect.value : 'monthly' };
      });
      checkoutPlan = plans[0];
      stackQueue = plans.slice(1);
    }
  }

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

  if(data.session){
    currentUser = { email: data.user.email, id: data.user.id };
    if(!checkoutPlan){
      closeAuthModal();
      await loadSubscriptionAndShowDashboard();
      return false;
    }
    if(stackQueue.length > 0){
      try { localStorage.setItem('ledgerStackQueue_' + email, JSON.stringify(stackQueue)); }
      catch(err){ console.error('Could not save stack queue:', err); }
    }
    closeAuthModal();
    launchPaddleCheckout(checkoutPlan.tier, checkoutPlan.billingInterval, email);
    return false;
  } else {
    alert("Account created. Please sign in to continue.");
    switchAuthView('signin');
    document.getElementById('signinEmail').value = email;
    return false;
  }
}

// Launch Paddle checkout by finding the matching START button's price id.
function launchPaddleCheckout(tier, billingInterval, email){
  var key = ({1:'yieldMap',2:'fullLedger',3:'annotatedPortfolio',4:'allAccess'})[tier];
  var priceId = key ? (key + '.' + (billingInterval || 'monthly')) : null;
  if(window.openPaddleCheckout && priceId){
    window.openPaddleCheckout(priceId, email);
    return;
  }
  var guides = document.getElementById('guides');
  if(guides){ guides.scrollIntoView({ behavior:'smooth' }); }
}

// ============ CONTINUE STACKING ============
function checkStackQueue(email){
  let queue = [];
  try { queue = JSON.parse(localStorage.getItem('ledgerStackQueue_' + email) || '[]'); }
  catch(err){ queue = []; }
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
    try { localStorage.removeItem('ledgerStackQueue_' + email); } catch(err){}
  }
  launchPaddleCheckout(next.tier, next.billingInterval, email);
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
    currentSubscription = data;
  } else {
    currentSubscription = null;
  }
  showDashboard();
}

function showDashboard(){
  if(!currentUser) return;
  document.getElementById('demoEmailDisplay').textContent = currentUser.email;

  if(!currentSubscription || currentSubscription.length === 0){
    const statusNote = document.getElementById('dashStatusNote');
    if(statusNote){
      statusNote.innerHTML = 'You\'re looking at a <strong style="color:var(--parchment);">preview</strong> — the numbers below are examples, not real data. <a href="#guides" onclick="closeDashboardToPricing(event)" style="color:var(--gold);">See what each guide includes →</a>';
      statusNote.style.display = 'block';
    }
    document.getElementById('dashPlanName').textContent = 'FREE PREVIEW';
    document.getElementById('dashPlanVal').textContent = 'Free preview';
    document.getElementById('dashBillingVal').textContent = '—';
    const planBadge = document.querySelector('.dash-plan-badge');
    if(planBadge) planBadge.innerHTML = '<span class="tick" style="background:var(--gold); width:14px; height:1px; display:inline-block;"></span> FREE PREVIEW';
    renderPreviewSavings();
    renderPreviewLibrary();
    document.getElementById('dashboard').classList.add('show');
    document.body.style.overflow = 'hidden';
    return;
  }

  hidePreviewSavingsIfPresent();
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
  const planBadge = document.querySelector('.dash-plan-badge');
  if(planBadge) planBadge.innerHTML = '<span class="tick" style="background:var(--gold); width:14px; height:1px; display:inline-block;"></span> ' + planLabel.toUpperCase() + ' — ACTIVE';

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

// ============ SELF-REPORTED SAVINGS TRACKER ============
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

// ============ FREE PREVIEW: DEMO DATA ============
function randomBetween(min, max){ return Math.random() * (max - min) + min; }
function renderPreviewSavings(){
  const amount = Math.round(randomBetween(80, 640));
  const members = Math.round(randomBetween(1100, 4200));
  document.getElementById('totalSavings').textContent = '$' + amount.toLocaleString();
  document.getElementById('savingsSub').textContent =
    "Example only — members like you have logged wins from $20 to over $1,000 this year. " +
    "(" + members.toLocaleString() + " wins logged sitewide so far.)";
  const stRight = document.querySelector('.savings-tracker .st-right');
  if(stRight && !document.getElementById('previewSavingsTag')){
    const tag = document.createElement('div');
    tag.id = 'previewSavingsTag';
    tag.className = 'preview-badge';
    tag.textContent = 'EXAMPLE — NOT YOUR DATA';
    stRight.insertBefore(tag, stRight.firstChild);
  }
}
function hidePreviewSavingsIfPresent(){
  const tag = document.getElementById('previewSavingsTag');
  if(tag) tag.remove();
}

// Free-preview library cards — real titles matching the actual guides, all locked.
const PREVIEW_LIBRARY_CARDS = [
  { tier:1, title:"The Cash-Placement Decision Framework", category:"Yield Map · framework" },
  { tier:1, title:"The Fee & Fine-Print Trap Guide", category:"Yield Map · checklist" },
  { tier:1, title:"How to Compare Accounts Without Getting Played", category:"Yield Map · method" },
  { tier:2, title:"The Web3 Due-Diligence Checklist", category:"Full Ledger · checklist" },
  { tier:2, title:"Custody & Smart-Contract Risk Primer", category:"Full Ledger · primer" },
  { tier:2, title:"Reading a Yield Opportunity: A Worked Method", category:"Full Ledger · method" },
  { tier:3, title:"The Income-Layering Framework", category:"Annotated Portfolio · framework" },
  { tier:3, title:"A Sober Look at Automated & Algorithmic Strategies", category:"Annotated Portfolio · analysis" },
  { tier:3, title:"Position Sizing Over Prediction", category:"Annotated Portfolio · discipline" },
];
function renderPreviewLibrary(){
  const grid = document.getElementById('libraryGrid');
  grid.innerHTML = '';
  const intro = document.createElement('p');
  intro.className = 'desc-small';
  intro.style.cssText = 'color:var(--slate); margin-bottom:18px; grid-column:1/-1;';
  intro.textContent = "This is what your library will look like once you're on a plan — same layout, real guide titles, locked content. Pick a tier above whenever you're ready.";
  grid.appendChild(intro);
  PREVIEW_LIBRARY_CARDS.forEach(item=>{
    const card = document.createElement('div');
    card.className = 'library-item locked preview-blur';
    card.innerHTML = `
      <div class="lib-tag">REQUIRES ${(TIER_NAMES[item.tier] || '').toUpperCase()}</div>
      <h4>${item.title}</h4>
      <p>${item.category}</p>
      <div class="lib-action locked-action">🔒 LOCKED — PREVIEW ONLY</div>`;
    grid.appendChild(card);
  });
  const note = document.createElement('div');
  note.className = 'preview-overlay-note';
  note.style.gridColumn = '1/-1';
  note.textContent = "Titles and categories above are real. The full guide content is only visible to members.";
  grid.appendChild(note);
}

function closeDashboardToPricing(e){
  if(e) e.preventDefault();
  document.getElementById('dashboard').classList.remove('show');
  document.body.style.overflow = '';
  document.getElementById('guides').scrollIntoView({ behavior:'smooth' });
}

// ============ CONTENT VIEWER: PER-USER WATERMARK ============
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
  if(document.getElementById('contentViewer').classList.contains('show')){ e.preventDefault(); }
});
document.addEventListener('keydown', (e)=>{
  const viewerOpen = document.getElementById('contentViewer').classList.contains('show');
  if(viewerOpen && ((e.ctrlKey||e.metaKey) && ['c','p','s'].includes(e.key.toLowerCase()))){ e.preventDefault(); }
});

// ============ BILLING TOGGLE ============
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

  document.querySelectorAll('.product-card [data-product-key], .all-access-card [data-product-key]').forEach(btn=>{
    var key = btn.getAttribute('data-product-key');
    if(key) btn.setAttribute('data-price-id', key + '.' + period);
  });

  const signupBillingSelect = document.getElementById('signupBillingInterval');
  if(signupBillingSelect) signupBillingSelect.value = period;
}

function initProductButtons(){
  document.querySelectorAll('.product-btn[data-product-key]').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const key = btn.getAttribute('data-product-key');
      const tierMap = { yieldMap:1, fullLedger:2, annotatedPortfolio:3, allAccess:4 };
      const tier = tierMap[key];
      const wantsPlanYes = document.querySelector('input[name="wantsPlan"][value="yes"]');
      if(wantsPlanYes) wantsPlanYes.checked = true;
      const modeSingle = document.querySelector('input[name="purchaseMode"][value="single"]');
      if(modeSingle) modeSingle.checked = true;
      const tierSelect = document.getElementById('signupTier');
      if(tierSelect && tier) tierSelect.value = String(tier);
      const activeBilling = document.querySelector('.billing-seg.active');
      const billingSelect = document.getElementById('signupBillingInterval');
      if(billingSelect && activeBilling) billingSelect.value = activeBilling.dataset.billing;
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

// ============ MOBILE NAV ============
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
setBilling('monthly');

// scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); } });
},{threshold:0.12});
revealEls.forEach(el=>obs.observe(el));

// ============ EMAIL CAPTURE POPUP ============
function showEmailPopup(){
  if(sessionStorage.getItem('ledgerEmailPopupSeen')) return;
  if(currentUser) return;
  const overlay = document.getElementById('emailPopup');
  if(!overlay) return;
  overlay.classList.add('show');
  requestAnimationFrame(()=> overlay.classList.add('in'));
  sessionStorage.setItem('ledgerEmailPopupSeen', '1');
}
function closeEmailPopup(){
  const overlay = document.getElementById('emailPopup');
  if(!overlay) return;
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

// ============ PASSWORD RESET REQUEST ============
async function handleResetRequest(e){
  e.preventDefault();
  const email = document.getElementById('resetEmail').value;
  const btn = document.getElementById('resetRequestBtn');
  if(btn){ btn.disabled = true; btn.textContent = 'SENDING…'; }
  try {
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://onestopdesignshop.github.io/Ledger-co-site/reset-password.html'
    });
  } catch(err){ console.error('Reset request error:', err); }
  const form = document.getElementById('resetRequestForm');
  const done = document.getElementById('resetRequestDone');
  if(form) form.style.display = 'none';
  if(done) done.style.display = 'block';
  return false;
}

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){ closeAuthModal(); closeEmailPopup(); closeViewer(); }
});

// ============ RESTORE SESSION ON PAGE LOAD ============
(async function restoreSession(){
  const { data } = await supabase.auth.getSession();
  if(data && data.session && data.session.user){
    currentUser = { email: data.session.user.email, id: data.session.user.id };
    await loadSubscriptionAndShowDashboard();
    checkStackQueue(currentUser.email);
  }
})();
