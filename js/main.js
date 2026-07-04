// ============================================================
// Ledger & Co. — js/main.js (HARDENED BUILD)
// ------------------------------------------------------------
// What changed vs. the previous version (behavior is identical):
//  1. The Supabase client is now created LAZILY and defensively.
//     The old version did `window.supabase.createClient(...)` at the
//     top of the file — if the Supabase CDN script hadn't loaded yet
//     (or the script order was wrong), that single line threw and
//     killed the ENTIRE file: billing toggle, reveal animations,
//     sign-in — everything. That can no longer happen.
//  2. All page setup (nav, billing toggle, reveal observer, popup)
//     runs inside a DOM-ready guard, so this file works whether the
//     <script> tag is at the end of <body> or in <head>.
//  3. If the reveal animation system fails for ANY reason, every
//     .reveal section is force-shown instead of staying invisible.
//  4. Sign-in now also sets window.__ledgerUserEmail so
//     paddle-checkout.js can attach the buyer's email instantly.
// ============================================================

// ============ SUPABASE CONFIG ============
const SUPABASE_URL = "https://wtlftsaigiehropidurn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bGZ0c2FpZ2llaHJvcGlkdXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgxMDgsImV4cCI6MjA5NzQwNDEwOH0.tXL7p_ULHp-HePXceMNbOKJAsHHlAlfR6v4UDWaZ1Z0";

let __sbClient = null;
function getSupabase() {
  if (__sbClient) return __sbClient;
  try {
    if (window.supabase && typeof window.supabase.createClient === "function") {
      __sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      window.__ledgerSupabaseClient = __sbClient;
    }
  } catch (err) {
    console.error("Supabase client could not be created:", err);
  }
  return __sbClient;
}

// ============ CONTENT LIBRARY (9 in-depth guides) ============
const LIBRARY = [
  { title:"The Cash-Placement Decision Framework", desc:"A repeatable way to decide where any dollar of cash should sit — before you chase a rate.", minTier:1,
    body:`<h4>Start with the job the money has to do</h4>
    <p>Every dollar of cash has a <em>time horizon</em> and a <em>certainty requirement</em>. Before comparing any rates, sort the money into three buckets:</p>
    <p><strong>1. Spending buffer (0–1 month):</strong> Needs to be instantly accessible, zero risk to principal, and you should never optimize this for yield. Convenience beats basis points here.</p>
    <p><strong>2. Reserve (1–12 months):</strong> Money you'll likely need within a year — emergency fund, planned purchases. This is where high-yield savings and money-market accounts earn their place: liquid, insured, competitive.</p>
    <p><strong>3. Parked capital (12+ months):</strong> Cash you're confident you won't touch soon. This can tolerate a lockup in exchange for a better, guaranteed rate — CDs and Treasury bills belong here.</p>
    <h4>Only now do you compare products</h4>
    <p>Matching the product to the bucket prevents the two most common mistakes: locking up money you'll need (and paying an early-withdrawal penalty), or leaving long-horizon cash in a checking account earning nothing.</p>
    <h4>The one question that filters most bad options</h4>
    <p>"What has to be true for this rate to actually apply to me?" A headline APY that requires a balance cap, a direct-deposit trigger, or a promo window that expires is a conditional rate — not the rate you'll earn. If you can't satisfy the condition effortlessly, treat the headline number as fiction.</p>` },
  { title:"The Fee & Fine-Print Trap Guide", desc:"The recurring ways a 'great rate' quietly costs more than it pays — and how to catch each one.", minTier:1,
    body:`<h4>The five traps, in the order you'll meet them</h4>
    <p><strong>Trap 1 — The balance cap.</strong> A market-leading APY that only applies up to a low balance ceiling, with everything above earning a fraction of it. Always find the cap before you're impressed by the rate.</p>
    <p><strong>Trap 2 — The activity requirement.</strong> "Boosted" rates that require a qualifying direct deposit, a minimum number of debit transactions, or a linked account. Miss the requirement one month and you silently drop to the base rate.</p>
    <p><strong>Trap 3 — The promo cliff.</strong> A rate that's real for an introductory window, then reverts. The reversion rate — not the promo rate — is your true long-term return. Ask what it becomes, not just what it is.</p>
    <p><strong>Trap 4 — The maintenance fee.</strong> On smaller balances, a monthly fee can exceed the interest earned entirely. Always compare the fee against the dollars of interest, not against other fees.</p>
    <p><strong>Trap 5 — The minimum-to-earn.</strong> Some accounts pay their advertised rate only above a minimum balance, dropping to near-zero beneath it. If your balance fluctuates near that line, your effective rate is unpredictable.</p>
    <h4>The habit that protects you</h4>
    <p>Before opening anything, write down the single sentence describing the exact conditions under which you personally will earn the advertised rate. If you can't write that sentence clearly, you don't understand the product yet.</p>` },
  { title:"How to Compare Accounts Without Getting Played", desc:"A side-by-side method that surfaces the real cost and real return, not the marketing.", minTier:1,
    body:`<h4>Build a same-columns comparison</h4>
    <p>Marketing wins when every product is described differently. You win by forcing them into identical columns. For each candidate account, fill in: <em>base rate</em>, <em>conditional rate &amp; its condition</em>, <em>balance cap</em>, <em>monthly fee</em>, <em>minimum to earn</em>, <em>insurance (FDIC/NCUA)</em>, <em>access speed</em>.</p>
    <h4>Then compute your number, not theirs</h4>
    <p>Estimate the interest <em>you</em> would actually earn on <em>your</em> typical balance, after fees and given whether you'll meet the conditions. This "effective yield to you" is frequently very different from the headline — and it's the only number that should drive the decision.</p>
    <h4>Break ties with friction and safety, never with a few basis points</h4>
    <p>Once two accounts are within a rounding error of each other on effective yield, the tiebreakers are: is my principal insured, how fast can I get my money, and how likely am I to accidentally break a condition. A slightly lower rate with no conditions usually beats a slightly higher rate you have to actively maintain.</p>` },
  { title:"The Web3 Due-Diligence Checklist", desc:"The exact custody, audit, and exit questions to answer before funding any on-chain product.", minTier:2,
    body:`<h4>Custody — who actually controls the money</h4>
    <p>Ask, in order: Do I hold the private keys, or does the platform? If the platform holds them, what stops them from freezing or losing my funds? Is this "non-custodial" in name only? You cannot evaluate anything else until you know who controls the assets.</p>
    <h4>Where the yield actually comes from</h4>
    <p>Legitimate on-chain yield has an identifiable source: network staking rewards, trading fees, or lending interest. If you can't explain in one plain sentence where the return originates, assume the worst case — that new depositor money is funding withdrawals, which is unsustainable by definition.</p>
    <h4>Audit and code</h4>
    <p>Has the smart contract been audited, by a reputable firm, and how recently? An audit is not a guarantee — it's a floor. No audit at all is a hard stop. An old audit on since-changed code is nearly as bad.</p>
    <h4>Exit liquidity</h4>
    <p>Can you withdraw instantly, or is there a lockup, a queue, or a withdrawal fee that spikes under stress? The time to discover an exit is difficult is <em>before</em> you deposit, not during a panic.</p>
    <h4>The disqualifiers</h4>
    <p>Any one of these ends the evaluation: guaranteed fixed returns, anonymous team with no track record, pressure to deposit quickly, or a yield too high to be explained by a real source. "Too good to be true" is not a cliché in this space — it's a pattern.</p>` },
  { title:"Custody & Smart-Contract Risk Primer", desc:"Plain-English coverage of the ways on-chain money is lost that have nothing to do with price.", minTier:2,
    body:`<h4>Price is not the main risk</h4>
    <p>Most first-timers focus on whether an asset goes up or down. But the losses that wipe people out are usually structural, not directional. Understand these first.</p>
    <p><strong>Key loss / mismanagement:</strong> Lose your seed phrase, and the funds are gone permanently — no support line, no reset. Self-custody trades platform risk for personal-responsibility risk.</p>
    <p><strong>Smart-contract exploits:</strong> A bug in the code governing a protocol can drain deposited funds regardless of the market. This is why audit recency and code stability matter.</p>
    <p><strong>Platform insolvency:</strong> Custodial platforms can become insolvent while your balance still "shows" on their dashboard. A number on a screen is not the same as assets you control.</p>
    <p><strong>Approval / permission risk:</strong> Interacting with a malicious contract can grant it standing permission to move your tokens later. Understanding and revoking token approvals is a core safety habit.</p>
    <h4>The mindset</h4>
    <p>Treat every interaction as irreversible and every counterparty as capable of failing. Size positions so that a total loss of any single position is survivable and non-life-changing.</p>` },
  { title:"Reading a Yield Opportunity: A Worked Method", desc:"A step-by-step lens for pulling apart any 'passive income' crypto offer before you commit a dollar.", minTier:2,
    body:`<h4>Step 1 — Name the mechanism</h4>
    <p>Write one sentence: "This pays a return because ___." Staking rewards, lending demand, fee-sharing — these are real. "Because more people are joining" is not a mechanism; it's a warning.</p>
    <h4>Step 2 — Stress the rate</h4>
    <p>Compare the advertised yield to boring, well-understood benchmarks. If it dwarfs them by an order of magnitude, the extra return is compensation for risk you haven't identified yet. Find the risk before you find it the hard way.</p>
    <h4>Step 3 — Map the exit</h4>
    <p>Before depositing, describe exactly how you'd get 100% of your money back and how long it would take under normal <em>and</em> stressed conditions. If the exit is vague, the position is a trap regardless of the yield.</p>
    <h4>Step 4 — Size it as if it could go to zero</h4>
    <p>Decide the position size on the assumption that this specific product could return nothing. If that size still lets you sleep, proceed. If not, the yield was never the point — your risk tolerance was the constraint all along.</p>` },
  { title:"The Income-Layering Framework", desc:"Building a laddered, auditable income approach across liquidity tiers — the structure, not a stock tip.", minTier:3,
    body:`<h4>The principle: match liquidity to need, then ladder</h4>
    <p>Instead of one lump of cash earning one rate, you split capital across instruments with staggered access and maturities. This gives you a blend of liquidity and higher guaranteed rates without gambling on timing.</p>
    <h4>The three layers</h4>
    <p><strong>Immediate layer:</strong> Instantly accessible savings for anything unexpected. Sized to cover near-term needs so you never have to break a longer instrument early.</p>
    <p><strong>Short-ladder layer:</strong> A sequence of short-maturity instruments (e.g. CDs or T-bills across staggered maturities) so that something is always maturing soon. As each matures, you either spend it or roll it to the back of the ladder.</p>
    <p><strong>Anchor layer:</strong> Longer-maturity instruments for the portion you're confident you won't need, capturing the best guaranteed rates available to you.</p>
    <h4>Why laddering beats guessing</h4>
    <p>A ladder means you never have to predict where rates go. When rates rise, maturing rungs roll into higher rates. When they fall, your longer rungs are still locked in. You've replaced a forecast with a structure — the entire point of disciplined income planning.</p>
    <h4>Keep it auditable</h4>
    <p>Track each rung: instrument, amount, rate, maturity, and destination on maturity. A one-page ledger of your ladder turns "I have some CDs somewhere" into a system you actually control.</p>` },
  { title:"A Sober Look at Automated & Algorithmic Strategies", desc:"How to evaluate 'set it and forget it' automated income tools without the hype.", minTier:3,
    body:`<h4>Automation amplifies whatever it's given</h4>
    <p>An automated strategy is only as sound as its underlying logic and its risk controls. Automation doesn't reduce risk — it removes hesitation, which cuts both ways. Evaluate the strategy as if you were running it by hand first.</p>
    <h4>The questions that matter</h4>
    <p>What exactly triggers a buy or sell? What happens in the conditions the strategy <em>wasn't</em> designed for? Is there a hard stop that limits catastrophic loss, and does it actually execute under stress (or just in the backtest)? Who holds the funds while the automation runs?</p>
    <h4>Backtests lie by omission</h4>
    <p>A strategy tuned to past data will always look good on that data. The real question is how it behaves on conditions it has never seen. Treat impressive historical returns as marketing, not evidence.</p>
    <h4>The discipline</h4>
    <p>Never automate more capital than you'd be willing to lose to a logic flaw you didn't catch. Start small, watch it behave through a real cycle, and scale only after you've seen it handle a bad stretch — not just a good one.</p>` },
  { title:"Position Sizing Over Prediction", desc:"The single habit that separates durable investors from lucky ones — applied across every asset class.", minTier:3,
    body:`<h4>You cannot reliably predict. You can always control size.</h4>
    <p>The seductive question is "will this go up?" The durable question is "how much should I commit given I might be wrong?" The second question is answerable; the first mostly isn't. Shifting your energy from prediction to sizing is the highest-leverage change most people can make.</p>
    <h4>The survivability test</h4>
    <p>For any position, ask: if this went to zero, would it change my life? If yes, the position is too big — full stop, regardless of your conviction. Conviction and correct sizing are independent; you can be right about the thesis and still ruined by the size.</p>
    <h4>Concentration vs. diversification, honestly</h4>
    <p>Concentration builds wealth; diversification protects it. Which you weight toward depends on how much you can afford to be wrong. Most people over-concentrate in what's exciting and under-diversify against what they haven't imagined. A sober allocation assumes your favorite idea is the one that fails.</p>
    <h4>Write the rule before the emotion</h4>
    <p>Decide your maximum position size as a percentage of investable assets <em>before</em> you're excited about a specific opportunity. A rule written in calm survives the moment of temptation; a decision made in excitement rarely does.</p>` },
];

const TIER_NAMES = {1:"The Yield Map", 2:"The Full Ledger", 3:"The Annotated Portfolio", 4:"All-Access"};

// ============ SESSION STATE ============
let currentUser = null;
let currentSubscription = null;

function setUserEmailBridge(email){ try{ window.__ledgerUserEmail = email || null; }catch(err){} }

// ============ AUTH MODAL ============
function openAuthModal(view){ const m=document.getElementById('authModal'); if(!m) return; m.classList.add('show'); switchAuthView(view||'signin'); if(view==='signup'||!view) updateSignupPlanUI(); }
function closeAuthModal(){ const m=document.getElementById('authModal'); if(m) m.classList.remove('show'); }
function switchAuthView(view){
  const sv=document.getElementById('signinView'), su=document.getElementById('signupView');
  if(sv) sv.style.display = view==='signin'?'block':'none';
  if(su) su.style.display = view==='signup'?'block':'none';
  var rv=document.getElementById('resetRequestView'); if(rv) rv.style.display = view==='reset'?'block':'none';
  clearAuthError(); if(view==='signup') updateSignupPlanUI();
}
function showAuthError(m){ let el=document.getElementById('authError'); if(!el){ el=document.createElement('div'); el.id='authError'; el.style.cssText='color:#e08585;font-size:13px;margin-top:10px;text-align:center;'; const box=document.querySelector('.modal-box'); if(box) box.appendChild(el); } el.textContent=m; }
function clearAuthError(){ const el=document.getElementById('authError'); if(el) el.textContent=''; }

function updateSignupPlanUI(){
  const w=(document.querySelector('input[name="wantsPlan"]:checked')||{}).value||'no';
  const qf=document.getElementById('quizFields'),pmf=document.getElementById('purchaseModeField'),sf=document.getElementById('singlePlanFields'),stf=document.getElementById('stackPlanFields'),sb=document.getElementById('signupSubmitBtn'),sw=document.getElementById('stackEmptyWarning');
  if(w==='no'){ if(qf)qf.style.display='none'; if(pmf)pmf.style.display='none'; if(sf)sf.style.display='none'; if(stf)stf.style.display='none'; if(sw)sw.style.display='none'; if(sb)sb.textContent='CREATE ACCOUNT'; return; }
  if(w==='quiz'){ if(qf)qf.style.display='block'; if(pmf)pmf.style.display='none'; if(sf)sf.style.display='none'; if(stf)stf.style.display='none'; if(sw)sw.style.display='none'; if(sb)sb.textContent='CREATE ACCOUNT'; updateQuizRecommendation(); return; }
  if(qf)qf.style.display='none'; if(pmf)pmf.style.display='block';
  const mode=(document.querySelector('input[name="purchaseMode"]:checked')||{}).value||'single';
  if(mode==='single'){ if(sf)sf.style.display='block'; if(stf)stf.style.display='none'; if(sw)sw.style.display='none'; if(sb)sb.textContent='CREATE ACCOUNT & CONTINUE TO CHECKOUT'; }
  else{ if(sf)sf.style.display='none'; if(stf)stf.style.display='block'; let any=false; document.querySelectorAll('input[name="stackTier"]').forEach(cb=>{ const bs=document.querySelector('.stack-tier-billing[data-tier="'+cb.value+'"]'); if(bs)bs.disabled=!cb.checked; if(cb.checked)any=true; }); if(sw)sw.style.display='none'; if(sb)sb.textContent=any?'CREATE ACCOUNT & CONTINUE TO CHECKOUT':'CREATE ACCOUNT'; }
}

function getQuizRecommendation(){
  const goal=(document.getElementById('quizGoal')||{}).value||'web3-curious';
  const depth=(document.getElementById('quizDepth')||{}).value||'light';
  const budget=(document.getElementById('quizBudget')||{}).value||'low';
  const s={1:0,2:0,3:0};
  if(goal==='park-cash')s[1]+=3; if(goal==='web3-curious')s[2]+=3; if(goal==='build-income')s[3]+=3; if(goal==='all-of-it'){s[1]++;s[2]++;s[3]++;}
  if(depth==='light')s[1]+=2; if(depth==='moderate')s[2]+=2; if(depth==='deep')s[3]+=2;
  if(budget==='low')s[1]++; if(budget==='mid')s[2]++; if(budget==='high')s[3]++;
  let bt=1,bsc=-1; [1,2,3].forEach(t=>{ if(s[t]>=bsc){bsc=s[t];bt=t;} });
  const stretch=(bt===3&&budget==='low')||(bt===2&&budget==='low'&&goal!=='park-cash');
  const notes={1:"A good starting point if the main goal is making sure cash isn't sitting somewhere underperforming.",2:"A good middle ground if web3 questions are part of what brought you here.",3:"Fits if you're thinking in terms of an ongoing strategy, not just a single account switch."};
  let note=notes[bt]; if(stretch) note+=" Worth noting: this sits a bit above the budget you flagged — the lighter tiers are fine starting points.";
  return {tier:bt,note};
}
function updateQuizRecommendation(){ const r=getQuizRecommendation(); const n=document.getElementById('quizResultName'),o=document.getElementById('quizResultNote'); if(n)n.textContent=TIER_NAMES[r.tier]; if(o)o.textContent=r.note; }
function applyQuizRecommendation(){ const r=getQuizRecommendation(); const y=document.querySelector('input[name="wantsPlan"][value="yes"]'); if(y)y.checked=true; const m=document.querySelector('input[name="purchaseMode"][value="single"]'); if(m)m.checked=true; const t=document.getElementById('signupTier'); if(t)t.value=String(r.tier); updateSignupPlanUI(); const sf=document.getElementById('singlePlanFields'); if(sf)sf.scrollIntoView({behavior:'smooth',block:'nearest'}); }

// ============ SIGN IN / SIGN UP ============
async function handleSignIn(e){
  e.preventDefault(); clearAuthError();
  const sb=getSupabase();
  if(!sb){ showAuthError('Connection error — please refresh the page and try again.'); return false; }
  const email=document.getElementById('signinEmail').value, password=document.getElementById('signinPassword').value;
  const b=e.target.querySelector('.modal-submit'); if(b){ b.disabled=true; b.textContent='SIGNING IN…'; }
  const {data,error}=await sb.auth.signInWithPassword({email,password});
  if(b){ b.disabled=false; b.textContent='SIGN IN'; }
  if(error){ showAuthError(error.message); return false; }
  currentUser={email:data.user.email,id:data.user.id};
  setUserEmailBridge(currentUser.email);
  await loadSubscriptionAndShowDashboard(); checkStackQueue(currentUser.email); closeAuthModal(); return false;
}

async function handleSignUp(e){
  e.preventDefault(); clearAuthError();
  const sb=getSupabase();
  if(!sb){ showAuthError('Connection error — please refresh the page and try again.'); return false; }
  const email=document.getElementById('signupEmail').value, password=document.getElementById('signupPassword').value;
  const w=(document.querySelector('input[name="wantsPlan"]:checked')||{}).value||'no';
  let checkoutPlan=null, stackQueue=[];
  if(w==='yes'){
    const mode=(document.querySelector('input[name="purchaseMode"]:checked')||{}).value||'single';
    if(mode==='single'){ const t=document.getElementById('signupTier'),bs=document.getElementById('signupBillingInterval'); checkoutPlan={tier:t?parseInt(t.value,10):2,billingInterval:bs?bs.value:'monthly'}; }
    else{ const checked=Array.from(document.querySelectorAll('input[name="stackTier"]:checked')); if(checked.length===0){ const sw=document.getElementById('stackEmptyWarning'); if(sw)sw.style.display='block'; return false; }
      const plans=checked.map(cb=>{ const bs=document.querySelector('.stack-tier-billing[data-tier="'+cb.value+'"]'); return {tier:parseInt(cb.value,10),billingInterval:bs?bs.value:'monthly'}; }); checkoutPlan=plans[0]; stackQueue=plans.slice(1); }
  }
  const b=e.target.querySelector('.modal-submit'); if(b){ b.disabled=true; b.textContent='CREATING ACCOUNT…'; }
  const {data,error}=await sb.auth.signUp({email,password}); if(b) b.disabled=false;
  if(error){ showAuthError(error.message); if(b) b.textContent=checkoutPlan?'CREATE ACCOUNT & CONTINUE TO CHECKOUT':'CREATE ACCOUNT'; return false; }
  if(data.session){
    currentUser={email:data.user.email,id:data.user.id};
    setUserEmailBridge(currentUser.email);
    if(!checkoutPlan){ closeAuthModal(); await loadSubscriptionAndShowDashboard(); return false; }
    if(stackQueue.length>0){ try{ localStorage.setItem('ledgerStackQueue_'+email,JSON.stringify(stackQueue)); }catch(err){} }
    closeAuthModal();
    var g=document.getElementById('guides'); if(g) g.scrollIntoView({behavior:'smooth'});
    alert("Account created! Use the START button on your chosen plan to complete checkout.");
    return false;
  } else { alert("Account created. Please sign in to continue."); switchAuthView('signin'); const se=document.getElementById('signinEmail'); if(se) se.value=email; return false; }
}

function checkStackQueue(email){
  let q=[]; try{ q=JSON.parse(localStorage.getItem('ledgerStackQueue_'+email)||'[]'); }catch(err){ q=[]; }
  if(!q.length) return; const next=q[0];
  const proceed=confirm("You still have "+q.length+" more guide"+(q.length>1?"s":"")+" to add. Continue to checkout for "+(TIER_NAMES[next.tier]||('Tier '+next.tier))+" via its START button.");
  if(!proceed) return; const rem=q.slice(1);
  if(rem.length>0){ try{ localStorage.setItem('ledgerStackQueue_'+email,JSON.stringify(rem)); }catch(err){} } else { try{ localStorage.removeItem('ledgerStackQueue_'+email); }catch(err){} }
}

async function signOut(){ const sb=getSupabase(); if(sb){ try{ await sb.auth.signOut(); }catch(err){ console.error(err); } } currentUser=null; currentSubscription=null; setUserEmailBridge(null); const d=document.getElementById('dashboard'); if(d) d.classList.remove('show'); document.body.style.overflow=''; }

// ============ DASHBOARD ============
async function loadSubscriptionAndShowDashboard(){
  if(!currentUser) return;
  const sb=getSupabase();
  if(!sb){ currentSubscription=null; showDashboard(); return; }
  const {data,error}=await sb.from('subscriptions').select('*').eq('user_email',currentUser.email).eq('status','active').order('created_at',{ascending:false});
  if(error){ console.error('Error loading subscription:',error); currentSubscription=null; }
  else if(data&&data.length>0){ currentSubscription=data; } else { currentSubscription=null; }
  showDashboard();
}

function showDashboard(){
  if(!currentUser) return;
  const ed=document.getElementById('demoEmailDisplay'); if(ed) ed.textContent=currentUser.email;
  if(!currentSubscription||currentSubscription.length===0){
    const sn=document.getElementById('dashStatusNote');
    if(sn){ sn.innerHTML='You\'re looking at a <strong style="color:var(--parchment);">preview</strong> — locked cards below show what each tier unlocks. <a href="#guides" onclick="closeDashboardToPricing(event)" style="color:var(--gold);">See the plans →</a>'; sn.style.display='block'; }
    const pn=document.getElementById('dashPlanName'); if(pn) pn.textContent='FREE PREVIEW';
    const pv=document.getElementById('dashPlanVal'); if(pv) pv.textContent='Free preview';
    const bv=document.getElementById('dashBillingVal'); if(bv) bv.textContent='—';
    renderPreviewSavings(); renderPreviewLibrary();
    const d=document.getElementById('dashboard'); if(d) d.classList.add('show'); document.body.style.overflow='hidden'; return;
  }
  hidePreviewSavingsIfPresent();
  const sn=document.getElementById('dashStatusNote'); if(sn) sn.style.display='none';
  const tiers=currentSubscription.map(r=>r.tier); const eff=Math.max(...tiers);
  const label=currentSubscription.map(r=>TIER_NAMES[r.tier]||('Tier '+r.tier)).join(' + ');
  const bl=currentSubscription[0].billing_interval?currentSubscription[0].billing_interval.charAt(0).toUpperCase()+currentSubscription[0].billing_interval.slice(1):'—';
  const pn=document.getElementById('dashPlanName'); if(pn) pn.textContent=label.toUpperCase();
  const pv=document.getElementById('dashPlanVal'); if(pv) pv.textContent=label;
  const bv=document.getElementById('dashBillingVal'); if(bv) bv.textContent=bl;
  const rv=document.querySelectorAll('.dash-meta .val')[2]; if(rv){ rv.textContent=currentSubscription[0].renews_at?new Date(currentSubscription[0].renews_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'Lifetime — no renewal'; }
  renderSavings();
  const grid=document.getElementById('libraryGrid'); if(!grid) return;
  grid.innerHTML='';
  LIBRARY.forEach((item,idx)=>{
    const unlocked=eff>=item.minTier;
    const card=document.createElement('div');
    card.className='library-item'+(unlocked?'':' locked');
    card.innerHTML='<div class="lib-tag">'+(unlocked?'INCLUDED IN YOUR PLAN':'REQUIRES '+(TIER_NAMES[item.minTier]||'').toUpperCase())+'</div><h4>'+item.title+'</h4><p>'+item.desc+'</p><div class="lib-action '+(unlocked?'':'locked-action')+'" data-idx="'+idx+'">'+(unlocked?'VIEW →':'🔒 LOCKED — UPGRADE TO UNLOCK')+'</div>';
    if(unlocked){ card.querySelector('.lib-action').addEventListener('click',()=>openViewer(idx)); }
    grid.appendChild(card);
  });
  const d=document.getElementById('dashboard'); if(d) d.classList.add('show'); document.body.style.overflow='hidden';
}

function renderSavings(){ const t=parseFloat(localStorage.getItem('ledgerTotalSavings')||'0'); const ts=document.getElementById('totalSavings'); if(ts) ts.textContent='$'+t.toLocaleString(); const ss=document.getElementById('savingsSub'); if(ss) ss.textContent=t>0?"Nice. That's already more than this tier costs for the year.":"Log your first one — it takes 10 seconds."; }
function logWin(){ const a=prompt("Roughly how much did this save or protect you?"); const n=parseFloat(a); if(isNaN(n)||n<=0) return; const t=parseFloat(localStorage.getItem('ledgerTotalSavings')||'0')+n; localStorage.setItem('ledgerTotalSavings',t.toString()); renderSavings(); }

function randomBetween(min,max){ return Math.random()*(max-min)+min; }
function renderPreviewSavings(){
  const amt=Math.round(randomBetween(80,640)), mem=Math.round(randomBetween(1100,4200));
  const ts=document.getElementById('totalSavings'); if(ts) ts.textContent='$'+amt.toLocaleString();
  const ss=document.getElementById('savingsSub'); if(ss) ss.textContent="Example only — members have logged wins from $20 to over $1,000 this year. ("+mem.toLocaleString()+" logged sitewide.)";
  const sr=document.querySelector('.savings-tracker .st-right');
  if(sr&&!document.getElementById('previewSavingsTag')){ const tag=document.createElement('div'); tag.id='previewSavingsTag'; tag.className='preview-badge'; tag.textContent='EXAMPLE — NOT YOUR DATA'; sr.insertBefore(tag,sr.firstChild); }
}
function hidePreviewSavingsIfPresent(){ const t=document.getElementById('previewSavingsTag'); if(t)t.remove(); }

const PREVIEW_LIBRARY_CARDS = [
  { tier:1, title:"The Cash-Placement Decision Framework", teaser:"Where every dollar should sit — decided the right way, before you chase a rate." },
  { tier:1, title:"The Fee & Fine-Print Trap Guide", teaser:"The quiet ways a 'great rate' costs more than it pays." },
  { tier:1, title:"How to Compare Accounts Without Getting Played", teaser:"The method that surfaces the real return behind the marketing." },
  { tier:2, title:"The Web3 Due-Diligence Checklist", teaser:"The questions to answer before funding anything on-chain." },
  { tier:2, title:"Custody & Smart-Contract Risk Primer", teaser:"How on-chain money is really lost — and it isn't price." },
  { tier:2, title:"Reading a Yield Opportunity", teaser:"A four-step lens that fails bad offers fast." },
  { tier:3, title:"The Income-Layering Framework", teaser:"A laddered income structure that beats guessing." },
  { tier:3, title:"Automated & Algorithmic Strategies", teaser:"How to evaluate 'set it and forget it' without the hype." },
  { tier:3, title:"Position Sizing Over Prediction", teaser:"The habit that separates durable investors from lucky ones." },
];
function renderPreviewLibrary(){
  const grid=document.getElementById('libraryGrid'); if(!grid) return;
  grid.innerHTML='';
  const intro=document.createElement('p'); intro.className='desc-small'; intro.style.cssText='color:var(--slate);margin-bottom:18px;grid-column:1/-1;';
  intro.textContent="This is what's inside, tier by tier — unlocked when you join. Titles only shown here; the full guides are members-only.";
  grid.appendChild(intro);
  PREVIEW_LIBRARY_CARDS.forEach(item=>{
    const card=document.createElement('div'); card.className='library-item locked preview-blur';
    card.innerHTML='<div class="lib-tag">REQUIRES '+(TIER_NAMES[item.tier]||'').toUpperCase()+'</div><h4>'+item.title+'</h4><p>'+item.teaser+'</p><div class="lib-action locked-action">🔒 LOCKED</div>';
    grid.appendChild(card);
  });
  const note=document.createElement('div'); note.className='preview-overlay-note'; note.style.gridColumn='1/-1';
  note.textContent="Titles are real. The full in-depth guides are only visible to members.";
  grid.appendChild(note);
}

function closeDashboardToPricing(e){ if(e)e.preventDefault(); const d=document.getElementById('dashboard'); if(d) d.classList.remove('show'); document.body.style.overflow=''; const g=document.getElementById('guides'); if(g) g.scrollIntoView({behavior:'smooth'}); }

// ============ CONTENT VIEWER ============
function buildWatermark(email){ const stamp=email+' · '+new Date().toLocaleDateString(); const l=document.createElement('div'); l.className='watermark-layer'; for(let i=0;i<24;i++){ const s=document.createElement('span'); s.textContent=stamp; l.appendChild(s); } return l; }
function openViewer(idx){
  const item=LIBRARY[idx]; if(!item||!currentUser) return;
  const vt=document.getElementById('viewerTitle'); if(vt) vt.textContent=item.title;
  const vl=document.getElementById('viewerLicenseEmail'); if(vl) vl.textContent=currentUser.email;
  const c=document.getElementById('viewerContent'); if(!c) return;
  c.innerHTML='';
  const body=document.createElement('div'); body.innerHTML=item.body||'<p>Content coming soon.</p>'; c.appendChild(body);
  c.appendChild(buildWatermark(currentUser.email));
  const cv=document.getElementById('contentViewer'); if(cv) cv.classList.add('show'); document.body.style.overflow='hidden';
}
function closeViewer(){ const cv=document.getElementById('contentViewer'); if(cv) cv.classList.remove('show'); const dash=document.getElementById('dashboard'); const d=dash?dash.classList.contains('show'):false; document.body.style.overflow=d?'hidden':''; }

// ============ BILLING TOGGLE ============
function setBilling(period){
  document.querySelectorAll('.billing-seg').forEach(b=>{ b.classList.toggle('active',b.dataset.billing===period); });
  ['monthly','quarterly','annual','lifetime'].forEach(p=>{
    document.querySelectorAll('.price-'+p).forEach(el=> el.style.display=(p===period)?'inline':'none');
    document.querySelectorAll('.price-period-'+p).forEach(el=> el.style.display=(p===period)?'inline':'none');
  });
  document.querySelectorAll('.annual-note').forEach(el=> el.style.display=(period==='annual')?'block':'none');
  document.querySelectorAll('.quarterly-note').forEach(el=> el.style.display=(period==='quarterly')?'block':'none');
  document.querySelectorAll('.lifetime-note').forEach(el=> el.style.display=(period==='lifetime')?'block':'none');
  const sb=document.getElementById('signupBillingInterval'); if(sb)sb.value=period;
}

// ============ FAQ ============
function toggleFaq(el){ const item=el.parentElement, a=item.querySelector('.faq-a'), was=item.classList.contains('open'); document.querySelectorAll('.faq-item').forEach(i=>{ i.classList.remove('open'); const fa=i.querySelector('.faq-a'); if(fa) fa.style.maxHeight=null; }); if(!was){ item.classList.add('open'); if(a) a.style.maxHeight=a.scrollHeight+'px'; } }

// ============ EMAIL POPUP ============
function showEmailPopup(){ try{ if(sessionStorage.getItem('ledgerEmailPopupSeen'))return; }catch(err){} if(currentUser)return; const o=document.getElementById('emailPopup'); if(!o)return; o.classList.add('show'); requestAnimationFrame(()=>o.classList.add('in')); try{ sessionStorage.setItem('ledgerEmailPopupSeen','1'); }catch(err){} }
function closeEmailPopup(){ const o=document.getElementById('emailPopup'); if(!o)return; o.classList.remove('in'); setTimeout(()=>o.classList.remove('show'),300); }
function handleEmailCapture(e){ e.preventDefault(); const pe=document.getElementById('popupEmail'); const email=pe?pe.value:''; console.log('Captured lead email:',email); const f=document.getElementById('emailPopupForm'); if(f) f.style.display='none'; const s=document.getElementById('emailPopupSuccess'); if(s) s.style.display='block'; setTimeout(closeEmailPopup,2200); return false; }

// ============ PASSWORD RESET ============
async function handleResetRequest(e){
  e.preventDefault(); const re=document.getElementById('resetEmail'); const email=re?re.value:''; const b=document.getElementById('resetRequestBtn'); if(b){ b.disabled=true; b.textContent='SENDING…'; }
  const sb=getSupabase();
  try{ if(sb) await sb.auth.resetPasswordForEmail(email,{redirectTo:'https://onestopdesignshop.github.io/Ledger-co-site/reset-password.html'}); }catch(err){ console.error('Reset request error:',err); }
  const f=document.getElementById('resetRequestForm'), d=document.getElementById('resetRequestDone'); if(f)f.style.display='none'; if(d)d.style.display='block'; return false;
}

// ============================================================
// PAGE SETUP — everything below runs when the DOM is ready,
// each piece isolated so one failure can't take down the rest.
// ============================================================
function safeRun(label, fn){ try{ fn(); }catch(err){ console.error('[main.js] '+label+' failed:', err); } }

function initMobileNav(){
  const t=document.getElementById('navMobileToggle'), l=document.getElementById('navLinks'); if(!t||!l) return;
  t.addEventListener('click',()=>{ const o=l.classList.toggle('mobile-open'); t.setAttribute('aria-expanded',o?'true':'false'); t.textContent=o?'×':'☰'; });
  l.addEventListener('click',(e)=>{ if(e.target.tagName==='A'){ l.classList.remove('mobile-open'); t.setAttribute('aria-expanded','false'); t.textContent='☰'; } });
  document.addEventListener('click',(e)=>{ if(!l.classList.contains('mobile-open')) return; if(l.contains(e.target)||t.contains(e.target)) return; l.classList.remove('mobile-open'); t.setAttribute('aria-expanded','false'); t.textContent='☰'; });
}

function initReveal(){
  const revealEls=document.querySelectorAll('.reveal');
  if(!revealEls.length) return;
  try{
    const obs=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); } }); },{threshold:0.12});
    revealEls.forEach(el=>obs.observe(el));
  }catch(err){
    // Failsafe: if the animation system breaks, NEVER leave content hidden.
    revealEls.forEach(el=>el.classList.add('in'));
  }
}

function initGlobalKeys(){
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){ closeAuthModal(); closeEmailPopup(); closeViewer(); } });
  document.addEventListener('copy',(e)=>{ const cv=document.getElementById('contentViewer'); if(cv&&cv.classList.contains('show')) e.preventDefault(); });
  document.addEventListener('keydown',(e)=>{ const cv=document.getElementById('contentViewer'); const v=cv?cv.classList.contains('show'):false; if(v&&((e.ctrlKey||e.metaKey)&&['c','p','s'].includes(e.key.toLowerCase()))) e.preventDefault(); });
}

async function restoreSession(){
  // Supabase's CDN script may finish loading slightly after this file —
  // retry briefly instead of failing.
  let sb=getSupabase(), tries=0;
  while(!sb && tries<20){ await new Promise(r=>setTimeout(r,250)); sb=getSupabase(); tries++; }
  if(!sb){ console.error('Supabase library never loaded — check the <script> tag order in the HTML.'); return; }
  try{
    const {data}=await sb.auth.getSession();
    if(data&&data.session&&data.session.user){
      currentUser={email:data.session.user.email,id:data.session.user.id};
      setUserEmailBridge(currentUser.email);
      await loadSubscriptionAndShowDashboard();
      checkStackQueue(currentUser.email);
    }
  }catch(err){ console.error('Session restore failed:', err); }
}

function initPage(){
  safeRun('mobile nav', initMobileNav);
  safeRun('billing toggle', ()=>setBilling('monthly'));
  safeRun('reveal animations', initReveal);
  safeRun('global keys', initGlobalKeys);
  safeRun('email popup timer', ()=>setTimeout(showEmailPopup,4000));
  restoreSession();
}

if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', initPage); }
else{ initPage(); }
