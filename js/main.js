// ============ SUPABASE CLIENT ============
// Project: onestopdesignshop's Project (wtlftsaigiehropidurn)
// The key below is the anon/public key — safe to expose in browser code.
const SUPABASE_URL = "https://wtlftsaigiehropidurn.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind0bGZ0c2FpZ2llaHJvcGlkdXJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MjgxMDgsImV4cCI6MjA5NzQwNDEwOH0.tXL7p_ULHp-HePXceMNbOKJAsHHlAlfR6v4UDWaZ1Z0";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
window.__ledgerSupabaseClient = supabase;

// ============ CALCULATOR FUNCTIONS (global; called by inline handlers in calculator items) ============
function fmtMoney(n){ if(isNaN(n)) return '$0.00'; return '$' + n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function fmtPct(n){ if(isNaN(n)) return '0.00%'; return n.toFixed(2) + '%'; }

function calcSavings(){
  var bal=parseFloat(document.getElementById('sav-balance').value)||0;
  var apy=parseFloat(document.getElementById('sav-apy').value)||0;
  var yrs=parseFloat(document.getElementById('sav-years').value)||0;
  var fv=bal*Math.pow(1+apy/100,yrs); var interest=fv-bal;
  var out=document.getElementById('sav-result'); if(!out) return;
  out.innerHTML='<div class="calc-row"><span>Future balance</span><strong>'+fmtMoney(fv)+'</strong></div>'+
    '<div class="calc-row"><span>Interest earned</span><strong>'+fmtMoney(interest)+'</strong></div>'+
    '<div class="calc-note">Assumes the rate holds and interest compounds annually. Real rates change — re-check periodically.</div>';
}
function calcFee(){
  var bal=parseFloat(document.getElementById('fee-balance').value)||0;
  var apy=parseFloat(document.getElementById('fee-apy').value)||0;
  var mfee=parseFloat(document.getElementById('fee-monthly').value)||0;
  var gross=bal*(apy/100); var fees=mfee*12; var net=gross-fees; var eff=bal>0?(net/bal)*100:0;
  var out=document.getElementById('fee-result'); if(!out) return;
  var warn=net<0?'<div class="calc-warn">⚠ At this balance, the fee costs more than the interest earns. This account loses you money.</div>':'';
  out.innerHTML='<div class="calc-row"><span>Gross interest (1 yr)</span><strong>'+fmtMoney(gross)+'</strong></div>'+
    '<div class="calc-row"><span>Annual fees</span><strong>-'+fmtMoney(fees)+'</strong></div>'+
    '<div class="calc-row"><span>Net interest</span><strong>'+fmtMoney(net)+'</strong></div>'+
    '<div class="calc-row"><span>Effective yield to you</span><strong>'+fmtPct(eff)+'</strong></div>'+warn;
}
function calcCompare(){
  var bal=parseFloat(document.getElementById('cmp-balance').value)||0;
  var apyA=parseFloat(document.getElementById('cmp-apyA').value)||0;
  var feeA=parseFloat(document.getElementById('cmp-feeA').value)||0;
  var apyB=parseFloat(document.getElementById('cmp-apyB').value)||0;
  var feeB=parseFloat(document.getElementById('cmp-feeB').value)||0;
  var netA=bal*(apyA/100)-feeA*12; var netB=bal*(apyB/100)-feeB*12;
  var out=document.getElementById('cmp-result'); if(!out) return;
  var winner=netA>=netB?'Account A':'Account B'; var diff=Math.abs(netA-netB);
  out.innerHTML='<div class="calc-row"><span>Account A net (1 yr)</span><strong>'+fmtMoney(netA)+'</strong></div>'+
    '<div class="calc-row"><span>Account B net (1 yr)</span><strong>'+fmtMoney(netB)+'</strong></div>'+
    '<div class="calc-winner">'+winner+' wins by '+fmtMoney(diff)+'/yr</div>'+
    '<div class="calc-note">The higher headline rate doesn\'t always win once fees are counted. That\'s the whole point.</div>';
}
function calcLadder(){
  var total=parseFloat(document.getElementById('lad-total').value)||0;
  var rungs=parseInt(document.getElementById('lad-rungs').value)||1;
  if(rungs<1)rungs=1; if(rungs>12)rungs=12; var per=total/rungs; var rows='';
  for(var i=1;i<=rungs;i++){ var months=Math.round(i*(12/rungs)); rows+='<div class="calc-row"><span>Rung '+i+' — ~'+months+' mo maturity</span><strong>'+fmtMoney(per)+'</strong></div>'; }
  var out=document.getElementById('lad-result'); if(!out) return;
  out.innerHTML=rows+'<div class="calc-note">Split evenly across '+rungs+' rungs. As each matures, spend it or roll it to the back of the ladder so something is always maturing soon.</div>';
}
function calcPosition(){
  var port=parseFloat(document.getElementById('pos-portfolio').value)||0;
  var risk=parseFloat(document.getElementById('pos-risk').value)||0;
  var maxPos=port*(risk/100);
  var out=document.getElementById('pos-result'); if(!out) return;
  out.innerHTML='<div class="calc-row"><span>Maximum position size</span><strong>'+fmtMoney(maxPos)+'</strong></div>'+
    '<div class="calc-note">This is the most you\'d put in any single position at '+risk+'% risk tolerance. If a total loss of this amount would change your life, the number is too high.</div>';
}
function calcWeb3Score(){
  var score=0,max=5;
  ['w3-source','w3-custody','w3-audit','w3-exit','w3-team'].forEach(function(id){ var el=document.getElementById(id); if(el&&el.checked) score++; });
  var out=document.getElementById('w3-result'); if(!out) return;
  var verdict,cls;
  if(score<=2){verdict='HIGH RISK — multiple red flags. Most sober investors would walk away.';cls='calc-warn';}
  else if(score<=4){verdict='CAUTION — some boxes unchecked. Do not proceed until you can answer every one.';cls='calc-note';}
  else{verdict='PASSES THE BASELINE — all five checks met. This is a floor, not a guarantee; size accordingly.';cls='calc-winner';}
  out.innerHTML='<div class="calc-row"><span>Checks passed</span><strong>'+score+' / '+max+'</strong></div><div class="'+cls+'">'+verdict+'</div>';
}

// Shared calculator styling, inlined so css/styles.css needs no changes.
const CALC_STYLE = `<style>
.calc-box{border:1px solid rgba(212,175,55,0.35);border-radius:10px;padding:18px;margin-top:14px;background:rgba(212,175,55,0.04);}
.calc-box label{display:block;font-size:12px;letter-spacing:0.04em;color:#c9b98a;margin:10px 0 4px;font-family:'JetBrains Mono',monospace;text-transform:uppercase;}
.calc-box input[type=number]{width:100%;padding:11px 12px;border:1px solid rgba(255,255,255,0.18);border-radius:7px;background:rgba(0,0,0,0.25);color:#f5f1e6;font-size:16px;box-sizing:border-box;}
.calc-2col{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.calc-result{margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);}
.calc-row{display:flex;justify-content:space-between;align-items:baseline;padding:7px 0;border-bottom:1px dashed rgba(255,255,255,0.08);font-size:15px;}
.calc-row strong{color:#e7c86a;font-size:17px;}
.calc-winner{margin-top:12px;padding:11px 13px;border:1px solid #e7c86a;border-radius:7px;color:#e7c86a;font-weight:600;font-size:14px;}
.calc-warn{margin-top:12px;padding:11px 13px;border:1px solid #e08585;border-radius:7px;color:#e08585;font-size:14px;}
.calc-note{margin-top:12px;font-size:12.5px;color:#9aa2b1;line-height:1.5;}
.calc-check{display:flex;align-items:flex-start;gap:10px;margin:9px 0;}
.calc-check input{margin-top:3px;width:18px;height:18px;flex:0 0 auto;}
.calc-check span{font-size:14px;color:#d8dae0;}
</style>`;

// ============ CONTENT LIBRARY — IN-DEPTH PAID GUIDES ============
// Evergreen frameworks, worked examples, named mistakes. No live rates, always accurate.
// minTier: 1=Yield Map, 2=Full Ledger, 3=Annotated Portfolio, 4=All-Access.
const LIBRARY = [

  // ============ TIER 1 — THE YIELD MAP ============
  {
    title: "The Cash-Placement Decision Framework",
    desc: "Where every dollar should actually sit — decided by its job, not by chasing a rate.",
    minTier: 1,
    body: `
      <h4>Why this framework exists</h4>
      <p>Most people place cash backwards. They start by hunting for the highest number they can find, then try to talk themselves into the conditions attached to it. The result is predictable: money locked up when they need it, penalties paid to get it out, or a "high-yield" account that quietly earned less than a boring one because of a fee or a balance cap.</p>
      <p>The fix is to reverse the order. Decide what job each dollar has to do <em>first</em>. Only then compare products. A dollar's job is defined by two things: how soon you might need it (time horizon), and how sure you need to be that it's there and whole when you reach for it (certainty requirement). Get those two right and the correct product almost picks itself.</p>
      <h4>The three buckets — with the reasoning, not just the labels</h4>
      <p><strong>Bucket 1 — The Spending Buffer (0–1 month).</strong> Money that has to be there instantly and without drama: rent, groceries, the surprise repair. The most expensive mistake here is optimizing it for yield. If chasing an extra fraction of a percent means your buffer is ever slow to access or exposed to any risk, you've traded real safety for a rounding error. This bucket is about access and certainty, never return.</p>
      <p><strong>Bucket 2 — The Reserve (1–12 months).</strong> Your emergency fund and near-term planned spending. It must stay liquid and fully protected, but here it's finally appropriate to earn a competitive return — the natural home for high-yield savings and money-market accounts. The discipline: don't let the pursuit of a slightly higher rate push this money into anything with a lockup. The entire point of a reserve is that it's ready when life goes sideways.</p>
      <p><strong>Bucket 3 — Parked Capital (12+ months).</strong> Money you're genuinely confident you won't touch for a year or more. Because you're accepting a lockup voluntarily, you can be paid more for it — the home for CDs and Treasury bills. The mistake to avoid is putting Bucket 2 money here by being over-optimistic about your horizon; an early-withdrawal penalty erases the extra yield and then some.</p>
      <h4>A worked example</h4>
      <p>Say you have $30,000 in one savings account earning almost nothing, and you're tempted by a promo account advertising a high APY.</p>
      <p><strong>Step 1 — Sort it, don't chase it.</strong> You spend ~$4,000/month → keep ~$4,000 as Bucket 1. You want a 6-month cushion → ~$18,000 as Bucket 2. That leaves ~$8,000 you won't need for over a year → Bucket 3.</p>
      <p><strong>Step 2 — Match products.</strong> Bucket 1 stays in easy-access checking/savings. Bucket 2 goes to a competitive, liquid, insured high-yield account. Bucket 3 goes to a CD ladder or T-bills. Notice what happened: the promo that started the whole thing is now judged only against Bucket 2's needs — and only if it's genuinely liquid with conditions you can meet.</p>
      <h4>The one question that filters most bad options</h4>
      <p>Before accepting any advertised rate, answer this out loud: <em>"What has to be true for this rate to actually apply to me?"</em> Almost every eye-catching APY hides a condition — a balance cap, a required direct deposit, a promo window. If you can't satisfy the condition effortlessly and permanently, the headline is fiction for you. Write the condition in one sentence. If you can't, you don't understand the product yet.</p>
      <h4>The common mistakes, named</h4>
      <p><strong>1. Chasing yield in Bucket 1.</strong> Pennies of interest are never worth a moment's friction on money you need this week.<br>
      <strong>2. Locking up Bucket 2.</strong> The penalty on an early withdrawal usually eats more than the extra yield ever earned.<br>
      <strong>3. Believing the headline.</strong> The reversion rate — what a promo becomes afterward — is your real long-term return.<br>
      <strong>4. Never re-checking.</strong> Rates move. Placement is not "set and forget" for Buckets 2 and 3.</p>
      <h4>The takeaway</h4>
      <p>You don't need to predict rates or find a secret account. Place each dollar according to its job, then pick the boring-but-correct product for that job. Do that and you'll quietly outperform most people who spent far more energy chasing numbers — because they were answering the wrong question, and now you're answering the right one.</p>
      <p style="color:#9aa2b1;font-size:13px;">→ Pair this with your <strong>Savings &amp; APY Calculator</strong> and <strong>Account Comparison Tool</strong> to run your own numbers.</p>`
  },
  {
    title: "The Fee & Fine-Print Trap Guide",
    desc: "The exact ways a 'great rate' quietly costs more than it pays — and how to catch each one.",
    minTier: 1,
    body: `
      <h4>Why headline rates lie</h4>
      <p>A rate is a marketing number until you've found what's attached to it. Institutions compete on the number that goes in the ad, then recover margin through conditions, caps, and fees that most people never read. Your edge isn't finding a secret high rate — it's being the person who reads the fine print every time and does the small piece of arithmetic that reveals the real cost.</p>
      <h4>The five traps, in the order you'll meet them</h4>
      <p><strong>Trap 1 — The balance cap.</strong> A market-leading APY that only applies up to a low ceiling, with everything above earning a fraction of it. A stunning rate on the first few thousand dollars is nearly irrelevant if most of your balance sits above the cap earning almost nothing. Always find the cap before you're impressed.</p>
      <p><strong>Trap 2 — The activity requirement.</strong> "Boosted" rates that require a qualifying direct deposit, a minimum number of debit transactions, or a linked account. The rate is real — but only in the months you jump through every hoop. Miss one and you silently drop to the base rate, often without noticing for a while.</p>
      <p><strong>Trap 3 — The promo cliff.</strong> A rate that's genuine for an introductory window, then reverts. The reversion rate is your true long-term return, not the promo. The right question is never "what is the rate," it's "what does the rate <em>become</em>, and when."</p>
      <p><strong>Trap 4 — The maintenance fee.</strong> On smaller balances a monthly fee can exceed the interest entirely. A $5/month fee is $60/year — which can be more than a modest balance earns even at a strong rate. Always weigh the fee against the actual dollars of interest, never against other fees.</p>
      <p><strong>Trap 5 — The minimum-to-earn.</strong> Some accounts pay the advertised rate only above a minimum balance, dropping to near-zero beneath it. If your balance fluctuates near that line, your effective rate is unpredictable — and unpredictability is its own cost.</p>
      <h4>A worked example — when the lower rate wins</h4>
      <p>Account A advertises a strong rate but charges a monthly fee. Account B is a plainer rate with no fee. On a modest balance, run it: A's fee can wipe out enough interest that B — the "worse" rate — quietly earns you more per year. This is not an edge case. It's the single most common way people leave money on the table: they compared the headlines and never subtracted the fees.</p>
      <h4>The habit that protects you</h4>
      <p>Before opening anything, write one sentence describing the exact conditions under which <em>you personally</em> will earn the advertised rate. If you can't write it clearly, you don't understand the product. That one sentence is worth more than any comparison site, because it forces the fine print into the open.</p>
      <h4>The takeaway</h4>
      <p>The rate in the ad is the beginning of the analysis, not the end. Find the cap, the condition, the reversion, and the fee — then do the small arithmetic. The person who does this consistently beats the person chasing headlines, every time, with far less effort than it looks.</p>
      <p style="color:#9aa2b1;font-size:13px;">→ Pair this with your <strong>Fee-Drag Calculator</strong> to see your true after-fee yield instantly.</p>`
  },
  {
    title: "How to Compare Accounts Without Getting Played",
    desc: "A side-by-side method that surfaces the real return — not the marketing.",
    minTier: 1,
    body: `
      <h4>Why comparison is where people lose</h4>
      <p>Marketing wins when every product is described differently, because you can't compare what isn't in the same units. One account leads with a promo APY, another with "no fees," another with a signup bonus. Presented that way, there's no honest comparison — just competing highlights. You win by refusing to accept their framing and forcing every option into identical columns.</p>
      <h4>Step 1 — Build the same-columns table</h4>
      <p>For every candidate account, fill in the exact same fields: base rate; conditional rate and its condition; balance cap; monthly fee; minimum to earn; insurance (FDIC/NCUA); and access speed. The moment they're side by side in identical columns, the marketing evaporates and the real differences appear. Half the "great deals" disqualify themselves here — a blank in the insurance column or an ugly condition ends the conversation.</p>
      <h4>Step 2 — Compute <em>your</em> number, not theirs</h4>
      <p>Estimate the interest <em>you</em> would actually earn on <em>your</em> typical balance, after fees, and given whether you'll realistically meet the conditions every month. This "effective yield to you" is frequently very different from the headline — and it's the only number that should drive the decision. An advertised rate you'll only half-qualify for is worth less than a lower rate you'll earn in full, every month, without thinking about it.</p>
      <h4>Step 3 — Break ties with friction and safety, never basis points</h4>
      <p>Once two accounts are within a rounding error on effective yield, stop optimizing the rate. The tiebreakers are: is my principal insured, how fast can I reach my money, and how likely am I to accidentally break a condition. A slightly lower rate with zero conditions almost always beats a slightly higher rate you have to actively maintain — because the maintenance eventually slips, and the "higher" rate wasn't real in the months it did.</p>
      <h4>A worked example</h4>
      <p>You're choosing between a headline-grabbing account with a fee and hoops, and a quieter no-fee account. You build the table, compute your effective yield on your real balance, and find they're nearly identical after fees. Now the tiebreakers decide: the no-fee account has no condition to break and instant access. You choose it — not because it advertised better, but because it will actually deliver its number every month with no effort from you. That's the whole discipline.</p>
      <h4>The takeaway</h4>
      <p>Never compare highlights. Force everything into the same columns, compute the yield <em>you'll</em> really earn, and break ties on safety and friction rather than a fraction of a percent. This is unglamorous and it wins quietly — which is exactly why so few people do it.</p>
      <p style="color:#9aa2b1;font-size:13px;">→ Pair this with your <strong>Account Comparison Tool</strong> to put two accounts head-to-head on your real balance.</p>`
  },

  // ============ TIER 2 — THE FULL LEDGER (adds web3) ============
  {
    title: "The Web3 Due-Diligence Checklist",
    desc: "The custody, audit, and exit questions to answer before funding anything on-chain.",
    minTier: 2,
    body: `
      <h4>Why a checklist beats a gut feeling</h4>
      <p>On-chain products are engineered to feel legitimate — clean dashboards, confident language, real-looking numbers. Your instincts, tuned on traditional finance, will mislead you here, because the failure modes are different and often invisible until it's too late. A checklist replaces "this feels fine" with "I have verified each of these specific things." If you can't complete it, you don't fund it. That rule alone will save you from the majority of losses in this space.</p>
      <h4>Custody — who actually controls the money</h4>
      <p>Ask, in order: Do I hold the private keys, or does the platform? If the platform holds them, what specifically stops them from freezing, lending out, or losing my funds? Is this "non-custodial" in name only? You cannot evaluate anything else until you know who controls the assets — because if you don't control them and the counterparty fails, nothing else on this list matters.</p>
      <h4>Where the yield actually comes from</h4>
      <p>Legitimate on-chain yield has an identifiable source: network staking rewards, trading fees, or lending interest. Write the source in one plain sentence. If you can't — if the honest answer is "because more people keep depositing" — assume the worst case, which is that new depositor money is funding withdrawals. That structure is unsustainable by definition and unwinds suddenly, not gradually.</p>
      <h4>Audit and code</h4>
      <p>Has the smart contract been audited, by a reputable firm, and how recently? Treat an audit as a floor, not a guarantee — it means known classes of bug were checked for at a point in time. No audit at all is a hard stop. An old audit on code that has since changed is nearly as bad, because the thing that was checked is no longer the thing running.</p>
      <h4>Exit liquidity</h4>
      <p>Can you withdraw 100% instantly, or is there a lockup, a queue, or a withdrawal fee that spikes under stress? Confirm this <em>before</em> depositing, not during a panic. Many products are easy to enter and quietly hard to leave — the ease of entry is the marketing, and the difficulty of exit is where the loss happens.</p>
      <h4>The disqualifiers</h4>
      <p>Any one of these ends the evaluation immediately: guaranteed fixed returns; an anonymous team with no checkable track record; pressure to deposit quickly; or a yield too high to be explained by a real source. "Too good to be true" is not a cliché in this space — it's the most reliable single predictor of a total loss.</p>
      <h4>The takeaway</h4>
      <p>Run every opportunity through the same questions, in the same order, every time. Curiosity is fine; unverified conviction is expensive. The checklist is boring precisely because it works — it turns a space designed to bypass your judgment back into something your judgment can actually assess.</p>
      <p style="color:#9aa2b1;font-size:13px;">→ Pair this with your <strong>Web3 Yield Sustainability Scorer</strong> to score any offer in under a minute.</p>`
  },
  {
    title: "Custody & Smart-Contract Risk Primer",
    desc: "The ways on-chain money is lost that have nothing to do with price.",
    minTier: 2,
    body: `
      <h4>Price is not the main risk</h4>
      <p>Newcomers fixate on whether an asset goes up or down. But the losses that actually wipe people out in this space are usually structural, not directional — they happen regardless of the market. Understand these first, because they're the ones your traditional-finance instincts don't warn you about.</p>
      <h4>Key loss and mismanagement</h4>
      <p>Lose your seed phrase and the funds are gone permanently — no support line, no password reset, no recourse. Self-custody removes platform risk but replaces it with personal-responsibility risk that is absolute and unforgiving. This is a real tradeoff, not a solved problem: whoever holds the keys holds the risk, and if that's you, a single mistake is final.</p>
      <h4>Smart-contract exploits</h4>
      <p>A bug in the code governing a protocol can drain deposited funds regardless of price action. This is why audit recency and code stability matter so much — you are trusting software, and software has bugs. The question is never "is this safe" but "how much has this specific code been scrutinized, and has it changed since."</p>
      <h4>Platform insolvency</h4>
      <p>A custodial platform can become insolvent while your balance still displays normally on its dashboard. A number on a screen is a claim, not an asset you control. This is the failure that surprises people most, because everything looked fine right up until it didn't — the dashboard is the last thing to reflect reality, not the first.</p>
      <h4>Approval and permission risk</h4>
      <p>Interacting with a malicious or careless contract can grant it standing permission to move your tokens later — an approval you forgot you gave. Understanding and periodically revoking token approvals is a core safety habit, and its absence is a quiet, common way funds disappear long after the original interaction.</p>
      <h4>The mindset that protects you</h4>
      <p>Treat every interaction as irreversible and every counterparty as capable of failing — because both are true. Then size every position so that a total loss of any single one is survivable and non-life-changing. You cannot eliminate these risks; you can only make sure that when one of them lands, it's an inconvenience rather than a catastrophe.</p>
      <h4>The takeaway</h4>
      <p>Most of the danger in this space is not the price chart — it's custody, code, insolvency, and permissions. Respect those four, size accordingly, and you remove the failure modes that ruin people while keeping the upside that drew you in.</p>`
  },
  {
    title: "Reading a Yield Opportunity: A Worked Method",
    desc: "A four-step lens for pulling apart any 'passive income' offer before you commit a dollar.",
    minTier: 2,
    body: `
      <h4>Why you need a method, not an opinion</h4>
      <p>Every yield opportunity arrives wrapped in a story designed to produce a fast yes. A repeatable method is how you slow that down into a decision you can defend to yourself later. The four steps below work on anything — a crypto product, a "high-interest" offer, a too-good savings promo — because they attack the parts every scheme needs to obscure.</p>
      <h4>Step 1 — Name the mechanism</h4>
      <p>Write one sentence: "This pays a return because ___." Staking rewards, lending demand, fee-sharing — these are real, nameable sources. "Because more people are joining" is not a mechanism; it's a warning label. If you cannot complete the sentence honestly, stop here. You've already learned the most important thing.</p>
      <h4>Step 2 — Stress the rate</h4>
      <p>Compare the advertised yield to boring, well-understood benchmarks. If it dwarfs them by an order of magnitude, that gap is not free money — it's compensation for risk you haven't identified yet. The rate is a measurement of danger as much as reward. Find the risk that justifies the number before you find it the hard way.</p>
      <h4>Step 3 — Map the exit</h4>
      <p>Before depositing, describe exactly how you'd get 100% of your money back and how long it would take, under normal conditions <em>and</em> under stress. If the exit is vague, undefined, or "usually fast," the position is a trap regardless of the yield. Easy entry and hard exit is the signature structure of the products that hurt people most.</p>
      <h4>Step 4 — Size it as if it could go to zero</h4>
      <p>Decide the position size on the explicit assumption that this specific product could return nothing. If that size still lets you sleep, proceed. If it doesn't, the yield was never really the question — your risk tolerance was the constraint all along, and no rate changes that.</p>
      <h4>A worked example</h4>
      <p>An offer promises a return far above anything ordinary. Step 1: you can't name a real source beyond "growth." Step 2: the rate is many times normal. Step 3: withdrawals go through a "processing period" no one can pin down. You never reach Step 4 — the first three already disqualified it. That's the method working: it fails things fast, on principle, before your curiosity can talk you in.</p>
      <h4>The takeaway</h4>
      <p>Name the mechanism, stress the rate, map the exit, size for zero. Run every opportunity through those four in order. Most fail at step one — and the discipline of stopping there, every time, is what separates the people who last from the people who learn the same lesson repeatedly.</p>
      <p style="color:#9aa2b1;font-size:13px;">→ Pair this with your <strong>Web3 Yield Sustainability Scorer</strong> for a fast structured read.</p>`
  },

  // ============ TIER 3 — THE ANNOTATED PORTFOLIO (adds income strategy) ============
  {
    title: "The Income-Layering Framework",
    desc: "A laddered, auditable income approach across liquidity tiers — the structure, not a tip.",
    minTier: 3,
    body: `
      <h4>The principle: match liquidity to need, then ladder</h4>
      <p>Instead of one lump of cash earning one rate, you split capital across instruments with staggered access and maturities. This buys you a blend of liquidity and higher guaranteed rates without gambling on timing. The goal isn't to predict where rates go — it's to build a structure that behaves well whichever way they move.</p>
      <h4>The three layers</h4>
      <p><strong>Immediate layer.</strong> Instantly accessible savings for anything unexpected, sized to cover near-term needs so you never have to break a longer instrument early. This layer's job is to protect the other two from being disturbed.</p>
      <p><strong>Short-ladder layer.</strong> A sequence of short-maturity instruments (CDs or T-bills across staggered maturities) so that something is always maturing soon. As each matures, you either spend it or roll it to the back of the ladder. This is the engine of the whole approach.</p>
      <p><strong>Anchor layer.</strong> Longer-maturity instruments for the portion you're confident you won't need, capturing the best guaranteed rates available to you in exchange for a lockup you've deliberately chosen.</p>
      <h4>Why laddering beats guessing</h4>
      <p>A ladder means you never have to predict rates. When rates rise, maturing rungs roll into higher rates automatically. When rates fall, your longer rungs are still locked in at the older, better rate. Either way you're positioned — you've replaced a forecast (which you'd often get wrong) with a structure (which is right by design). That substitution, forecast for structure, is the entire point of disciplined income planning.</p>
      <h4>A worked example</h4>
      <p>You have an amount you won't need soon and you split it into four rungs maturing at staggered intervals. Three months in, one rung matures — if rates have risen, it rolls forward into the new higher rate; if they've fallen, the other three rungs are still earning the older, better rate. You made no prediction and needed no luck. The structure did the work.</p>
      <h4>Keep it auditable</h4>
      <p>Track each rung: instrument, amount, rate, maturity date, and what happens when it matures. A one-page ledger of your ladder turns "I have some CDs somewhere" into a system you actually control and can reason about. If you can't see the whole ladder on one page, it's too complicated to manage well.</p>
      <h4>The takeaway</h4>
      <p>Layer by liquidity, ladder the middle, anchor the long end, and keep it on one auditable page. You'll capture better rates than a single lump while never being caught needing money that's locked away — the quiet, durable version of an income strategy that most people never bother to build.</p>
      <p style="color:#9aa2b1;font-size:13px;">→ Pair this with your <strong>CD / T-Bill Ladder Builder</strong> to lay out your own ladder.</p>`
  },
  {
    title: "A Sober Look at Automated & Algorithmic Strategies",
    desc: "How to evaluate 'set it and forget it' income tools without the hype.",
    minTier: 3,
    body: `
      <h4>Automation amplifies whatever it's given</h4>
      <p>An automated strategy is only as sound as its underlying logic and its risk controls. Automation doesn't reduce risk — it removes hesitation, and hesitation cuts both ways. It executes your good decisions faster and your bad ones just as fast, without the pause where a human might reconsider. So evaluate the strategy as if you were going to run every trade by hand first. If you wouldn't, automating it only means losing faster.</p>
      <h4>The questions that matter</h4>
      <p>What exactly triggers a buy or a sell? What happens in the conditions the strategy <em>wasn't</em> designed for — the ones that weren't in the data it was built on? Is there a hard stop that limits catastrophic loss, and — critically — does it actually execute under stress, or only in the backtest? And who holds the funds while the automation runs? Each of these has sunk real money when left unasked.</p>
      <h4>Backtests lie by omission</h4>
      <p>A strategy tuned to past data will always look good on that data — that's what tuning does. The only question that matters is how it behaves on conditions it has never seen. Treat impressive historical returns as marketing, not evidence. The past it performed on was known when the rules were written; the future it will face was not.</p>
      <h4>A worked example</h4>
      <p>A tool shows a beautiful multi-year track record. You ask the four questions. The triggers are clear, but there's no hard stop for a scenario outside its design range, and the track record covers only a calm period. You've learned the essential thing: it hasn't been tested by a real storm, and its worst case is undefined. That's not a reason to run it small — it's a reason to not trust the pretty chart until you understand the ugly one.</p>
      <h4>The discipline</h4>
      <p>Never automate more capital than you'd be willing to lose to a logic flaw you didn't catch. Start small, watch it behave through a genuine cycle — including a bad stretch — and scale only after you've seen it handle adversity, not just tailwinds. The confidence to size up should come from observed behavior under stress, never from a backtest.</p>
      <h4>The takeaway</h4>
      <p>Automation is a force multiplier, not a risk reducer. Interrogate the logic, distrust the backtest, demand a hard stop, and scale only on proven behavior. Treated that way, these tools can be useful; treated as magic, they're just a faster way to find out what you didn't check.</p>`
  },
  {
    title: "Position Sizing Over Prediction",
    desc: "The single habit that separates durable investors from lucky ones.",
    minTier: 3,
    body: `
      <h4>You cannot reliably predict. You can always control size.</h4>
      <p>The seductive question is "will this go up?" The durable question is "how much should I commit given I might be wrong?" The first is mostly unanswerable; the second is fully within your control. Shifting your energy from prediction to sizing is the highest-leverage change most investors can make — and almost nobody makes it, because prediction feels like skill and sizing feels like admitting you don't know. Admitting you don't know is the skill.</p>
      <h4>The survivability test</h4>
      <p>For any position, ask: if this went to zero, would it change my life? If yes, the position is too big — full stop, regardless of your conviction. Conviction and correct sizing are independent variables. You can be completely right about the thesis and still be ruined by the size, and being right won't feel like much consolation if the size took you out before the thesis paid off.</p>
      <h4>Concentration vs. diversification, honestly</h4>
      <p>Concentration builds wealth; diversification protects it. Which you weight toward depends entirely on how much you can afford to be wrong. Most people get this backwards — they over-concentrate in what's exciting and under-diversify against what they haven't imagined. A sober allocation assumes your favorite idea is precisely the one that fails, and is built to survive that specific disappointment.</p>
      <h4>A worked example</h4>
      <p>You have a high-conviction idea and want to put a large share of your portfolio into it. Run the survivability test: if it went to zero, would your life change? If the honest answer is yes, you cap the position at a size where a total loss is a bad day, not a catastrophe — even though it means smaller gains if you're right. That's not timidity. That's the trade every durable investor makes: giving up some upside to guarantee they're still in the game for the next opportunity.</p>
      <h4>Write the rule before the emotion</h4>
      <p>Decide your maximum position size, as a percentage of investable assets, <em>before</em> you're excited about a specific opportunity. A rule written in calm survives the moment of temptation; a decision made in excitement rarely does. The purpose of the rule is to protect you from the version of yourself that shows up exactly when a position looks irresistible.</p>
      <h4>The takeaway</h4>
      <p>Stop trying to be right about direction and start being disciplined about size. Test every position against survivability, size against your favorite idea failing, and write your limits down while you're calm. Do this and you convert investing from a series of bets into a process that compounds — because you're always still standing for the next one.</p>
      <p style="color:#9aa2b1;font-size:13px;">→ Pair this with your <strong>Position-Sizing Calculator</strong> to set your own limits.</p>`
  },

];

const TIER_NAMES = {1:"The Yield Map", 2:"The Full Ledger", 3:"The Annotated Portfolio", 4:"All-Access"};

// ============ CALCULATOR LIBRARY ITEMS (members-only, tier-gated) ============
const CALCULATOR_ITEMS = [
  { title:"Savings & APY Growth Calculator", desc:"Enter a balance, rate, and time frame — see exactly what you'll earn, compounded.", minTier:1,
    body: CALC_STYLE + `<p>Type your numbers in — results update as you go. Standard annual compounding, the same math a bank uses.</p>
      <div class="calc-box"><label>Starting balance ($)</label><input type="number" id="sav-balance" value="10000" oninput="calcSavings()">
      <label>APY (%)</label><input type="number" id="sav-apy" value="4" step="0.01" oninput="calcSavings()">
      <label>Years</label><input type="number" id="sav-years" value="5" oninput="calcSavings()">
      <div class="calc-result" id="sav-result"></div></div>` },
  { title:"Fee-Drag & Effective-Yield Calculator", desc:"See how a monthly fee quietly eats a headline rate — and your true yield after fees.", minTier:1,
    body: CALC_STYLE + `<p>A great-looking APY can lose to a boring no-fee account. Enter the numbers and see your real, after-fee yield.</p>
      <div class="calc-box"><label>Balance ($)</label><input type="number" id="fee-balance" value="3000" oninput="calcFee()">
      <label>APY (%)</label><input type="number" id="fee-apy" value="4.5" step="0.01" oninput="calcFee()">
      <label>Monthly fee ($)</label><input type="number" id="fee-monthly" value="5" step="0.01" oninput="calcFee()">
      <div class="calc-result" id="fee-result"></div></div>` },
  { title:"Account Comparison Tool", desc:"Put two accounts head-to-head on your real balance. The winner may surprise you.", minTier:1,
    body: CALC_STYLE + `<p>Enter your balance, then two accounts. It computes net interest after fees and calls the winner.</p>
      <div class="calc-box"><label>Your balance ($)</label><input type="number" id="cmp-balance" value="5000" oninput="calcCompare()">
      <div class="calc-2col"><div><label>Account A — APY (%)</label><input type="number" id="cmp-apyA" value="5.0" step="0.01" oninput="calcCompare()"></div>
      <div><label>A — Monthly fee ($)</label><input type="number" id="cmp-feeA" value="5" step="0.01" oninput="calcCompare()"></div></div>
      <div class="calc-2col"><div><label>Account B — APY (%)</label><input type="number" id="cmp-apyB" value="4.4" step="0.01" oninput="calcCompare()"></div>
      <div><label>B — Monthly fee ($)</label><input type="number" id="cmp-feeB" value="0" step="0.01" oninput="calcCompare()"></div></div>
      <div class="calc-result" id="cmp-result"></div></div>` },
  { title:"Web3 Yield Sustainability Scorer", desc:"Answer five questions about any on-chain offer — get a plain-English risk read.", minTier:2,
    body: CALC_STYLE + `<p>Check each box only if you can honestly answer <em>yes</em>, then read the verdict. A discipline tool, not investment advice.</p>
      <div class="calc-box">
      <div class="calc-check"><input type="checkbox" id="w3-source" onchange="calcWeb3Score()"><span>I can name the real source of the yield in one sentence (staking, fees, lending — not "new depositors").</span></div>
      <div class="calc-check"><input type="checkbox" id="w3-custody" onchange="calcWeb3Score()"><span>I know exactly who controls the private keys, and I'm comfortable with it.</span></div>
      <div class="calc-check"><input type="checkbox" id="w3-audit" onchange="calcWeb3Score()"><span>The contract has a recent audit from a reputable firm, on the current code.</span></div>
      <div class="calc-check"><input type="checkbox" id="w3-exit" onchange="calcWeb3Score()"><span>I've confirmed how to withdraw 100% and how long it takes under stress.</span></div>
      <div class="calc-check"><input type="checkbox" id="w3-team" onchange="calcWeb3Score()"><span>The team has a real, checkable track record — not anonymous.</span></div>
      <div class="calc-result" id="w3-result"></div></div>` },
  { title:"CD / T-Bill Ladder Builder", desc:"Enter an amount and number of rungs — get your ladder laid out, evenly staggered.", minTier:3,
    body: CALC_STYLE + `<p>Laddering means something is always maturing soon, so you never have to predict rates. Enter your total and rungs.</p>
      <div class="calc-box"><label>Total to ladder ($)</label><input type="number" id="lad-total" value="12000" oninput="calcLadder()">
      <label>Number of rungs (1–12)</label><input type="number" id="lad-rungs" value="4" min="1" max="12" oninput="calcLadder()">
      <div class="calc-result" id="lad-result"></div></div>` },
  { title:"Position-Sizing Calculator", desc:"Enter your portfolio and risk tolerance — get the most you should put in any one position.", minTier:3,
    body: CALC_STYLE + `<p>The durable question isn't "will this go up" — it's "how much should I commit if I'm wrong." Enter your numbers.</p>
      <div class="calc-box"><label>Total investable portfolio ($)</label><input type="number" id="pos-portfolio" value="50000" oninput="calcPosition()">
      <label>Max risk per position (%)</label><input type="number" id="pos-risk" value="2" step="0.5" oninput="calcPosition()">
      <div class="calc-result" id="pos-result"></div></div>` },
];
CALCULATOR_ITEMS.forEach(function(it){ LIBRARY.push(it); });

// ============ SESSION STATE ============
let currentUser = null;
let currentSubscription = null;

function openAuthModal(view){ document.getElementById('authModal').classList.add('show'); switchAuthView(view||'signin'); if(view==='signup'||!view) updateSignupPlanUI(); }
function closeAuthModal(){ document.getElementById('authModal').classList.remove('show'); }
function switchAuthView(view){
  document.getElementById('signinView').style.display = view==='signin'?'block':'none';
  document.getElementById('signupView').style.display = view==='signup'?'block':'none';
  var rv=document.getElementById('resetRequestView'); if(rv) rv.style.display = view==='reset'?'block':'none';
  clearAuthError(); if(view==='signup') updateSignupPlanUI();
}
function showAuthError(m){ let el=document.getElementById('authError'); if(!el){ el=document.createElement('div'); el.id='authError'; el.style.cssText='color:#e08585;font-size:13px;margin-top:10px;text-align:center;'; document.querySelector('.modal-box').appendChild(el);} el.textContent=m; }
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
  let bt=1,bs=-1; [1,2,3].forEach(t=>{ if(s[t]>=bs){bs=s[t];bt=t;} });
  const stretch=(bt===3&&budget==='low')||(bt===2&&budget==='low'&&goal!=='park-cash');
  const notes={1:"A good starting point if the main goal is making sure cash isn't sitting somewhere underperforming.",2:"A good middle ground if web3 questions are part of what brought you here.",3:"Fits if you're thinking in terms of an ongoing strategy, not just a single account switch."};
  let note=notes[bt]; if(stretch) note+=" Worth noting: this sits a bit above the budget you flagged — the lighter tiers are fine starting points.";
  return {tier:bt,note};
}
function updateQuizRecommendation(){ const r=getQuizRecommendation(); const n=document.getElementById('quizResultName'),o=document.getElementById('quizResultNote'); if(n)n.textContent=TIER_NAMES[r.tier]; if(o)o.textContent=r.note; }
function applyQuizRecommendation(){ const r=getQuizRecommendation(); const y=document.querySelector('input[name="wantsPlan"][value="yes"]'); if(y)y.checked=true; const m=document.querySelector('input[name="purchaseMode"][value="single"]'); if(m)m.checked=true; const t=document.getElementById('signupTier'); if(t)t.value=String(r.tier); updateSignupPlanUI(); const sf=document.getElementById('singlePlanFields'); if(sf)sf.scrollIntoView({behavior:'smooth',block:'nearest'}); }

async function handleSignIn(e){
  e.preventDefault(); clearAuthError();
  const email=document.getElementById('signinEmail').value, password=document.getElementById('signinPassword').value;
  const b=e.target.querySelector('.modal-submit'); b.disabled=true; b.textContent='SIGNING IN…';
  const {data,error}=await supabase.auth.signInWithPassword({email,password});
  b.disabled=false; b.textContent='SIGN IN';
  if(error){ showAuthError(error.message); return false; }
  currentUser={email:data.user.email,id:data.user.id};
  await loadSubscriptionAndShowDashboard(); checkStackQueue(currentUser.email); closeAuthModal(); return false;
}

async function handleSignUp(e){
  e.preventDefault(); clearAuthError();
  const email=document.getElementById('signupEmail').value, password=document.getElementById('signupPassword').value;
  const w=(document.querySelector('input[name="wantsPlan"]:checked')||{}).value||'no';
  let checkoutPlan=null, stackQueue=[];
  if(w==='yes'){
    const mode=(document.querySelector('input[name="purchaseMode"]:checked')||{}).value||'single';
    if(mode==='single'){ const t=document.getElementById('signupTier'),bs=document.getElementById('signupBillingInterval'); checkoutPlan={tier:t?parseInt(t.value,10):2,billingInterval:bs?bs.value:'monthly'}; }
    else{ const checked=Array.from(document.querySelectorAll('input[name="stackTier"]:checked')); if(checked.length===0){ const sw=document.getElementById('stackEmptyWarning'); if(sw)sw.style.display='block'; return false; }
      const plans=checked.map(cb=>{ const bs=document.querySelector('.stack-tier-billing[data-tier="'+cb.value+'"]'); return {tier:parseInt(cb.value,10),billingInterval:bs?bs.value:'monthly'}; }); checkoutPlan=plans[0]; stackQueue=plans.slice(1); }
  }
  const b=e.target.querySelector('.modal-submit'); b.disabled=true; b.textContent='CREATING ACCOUNT…';
  const {data,error}=await supabase.auth.signUp({email,password}); b.disabled=false;
  if(error){ showAuthError(error.message); b.textContent=checkoutPlan?'CREATE ACCOUNT & CONTINUE TO CHECKOUT':'CREATE ACCOUNT'; return false; }
  if(data.session){
    currentUser={email:data.user.email,id:data.user.id};
    if(!checkoutPlan){ closeAuthModal(); await loadSubscriptionAndShowDashboard(); return false; }
    if(stackQueue.length>0){ try{ localStorage.setItem('ledgerStackQueue_'+email,JSON.stringify(stackQueue)); }catch(err){} }
    closeAuthModal(); launchPaddleCheckout(checkoutPlan.tier,checkoutPlan.billingInterval,email); return false;
  } else { alert("Account created. Please sign in to continue."); switchAuthView('signin'); document.getElementById('signinEmail').value=email; return false; }
}

function launchPaddleCheckout(tier,billingInterval,email){
  var key=({1:'yieldMap',2:'fullLedger',3:'annotatedPortfolio',4:'allAccess'})[tier];
  var priceId=key?(key+'.'+(billingInterval||'monthly')):null;
  if(window.openPaddleCheckout&&priceId){ window.openPaddleCheckout(priceId,email); return; }
  var g=document.getElementById('guides'); if(g)g.scrollIntoView({behavior:'smooth'});
}

function checkStackQueue(email){
  let q=[]; try{ q=JSON.parse(localStorage.getItem('ledgerStackQueue_'+email)||'[]'); }catch(err){ q=[]; }
  if(!q.length) return; const next=q[0];
  const proceed=confirm("You still have "+q.length+" more guide"+(q.length>1?"s":"")+" to finish adding to your stack. Continue to checkout for "+(TIER_NAMES[next.tier]||('Tier '+next.tier))+" now?");
  if(!proceed) return; const rem=q.slice(1);
  if(rem.length>0){ try{ localStorage.setItem('ledgerStackQueue_'+email,JSON.stringify(rem)); }catch(err){} } else { try{ localStorage.removeItem('ledgerStackQueue_'+email); }catch(err){} }
  launchPaddleCheckout(next.tier,next.billingInterval,email);
}

async function signOut(){ await supabase.auth.signOut(); currentUser=null; currentSubscription=null; document.getElementById('dashboard').classList.remove('show'); document.body.style.overflow=''; }

async function loadSubscriptionAndShowDashboard(){
  if(!currentUser) return;
  const {data,error}=await supabase.from('subscriptions').select('*').eq('user_email',currentUser.email).eq('status','active').order('created_at',{ascending:false});
  if(error){ console.error('Error loading subscription:',error); currentSubscription=null; }
  else if(data&&data.length>0){ currentSubscription=data; } else { currentSubscription=null; }
  showDashboard();
}

function showDashboard(){
  if(!currentUser) return;
  document.getElementById('demoEmailDisplay').textContent=currentUser.email;
  if(!currentSubscription||currentSubscription.length===0){
    const sn=document.getElementById('dashStatusNote');
    if(sn){ sn.innerHTML='You\'re looking at a <strong style="color:var(--parchment);">preview</strong> — locked cards below show what each tier unlocks. <a href="#guides" onclick="closeDashboardToPricing(event)" style="color:var(--gold);">See the plans →</a>'; sn.style.display='block'; }
    document.getElementById('dashPlanName').textContent='FREE PREVIEW';
    document.getElementById('dashPlanVal').textContent='Free preview';
    document.getElementById('dashBillingVal').textContent='—';
    const pb=document.querySelector('.dash-plan-badge'); if(pb) pb.innerHTML='<span class="tick" style="background:var(--gold);width:14px;height:1px;display:inline-block;"></span> FREE PREVIEW';
    renderPreviewSavings(); renderPreviewLibrary();
    document.getElementById('dashboard').classList.add('show'); document.body.style.overflow='hidden'; return;
  }
  hidePreviewSavingsIfPresent();
  const sn=document.getElementById('dashStatusNote'); if(sn) sn.style.display='none';
  const tiers=currentSubscription.map(r=>r.tier); const eff=Math.max(...tiers);
  const label=currentSubscription.map(r=>TIER_NAMES[r.tier]||('Tier '+r.tier)).join(' + ');
  const bl=currentSubscription[0].billing_interval?currentSubscription[0].billing_interval.charAt(0).toUpperCase()+currentSubscription[0].billing_interval.slice(1):'—';
  document.getElementById('dashPlanName').textContent=label.toUpperCase();
  document.getElementById('dashPlanVal').textContent=label;
  document.getElementById('dashBillingVal').textContent=bl;
  const pb=document.querySelector('.dash-plan-badge'); if(pb) pb.innerHTML='<span class="tick" style="background:var(--gold);width:14px;height:1px;display:inline-block;"></span> '+label.toUpperCase()+' — ACTIVE';
  const rv=document.querySelectorAll('.dash-meta .val')[2]; if(rv){ rv.textContent=currentSubscription[0].renews_at?new Date(currentSubscription[0].renews_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}):'Lifetime — no renewal'; }
  renderSavings();
  const grid=document.getElementById('libraryGrid'); grid.innerHTML='';
  LIBRARY.forEach((item,idx)=>{
    const unlocked=eff>=item.minTier;
    const card=document.createElement('div');
    card.className='library-item'+(unlocked?'':' locked');
    card.innerHTML='<div class="lib-tag">'+(unlocked?'INCLUDED IN YOUR PLAN':'REQUIRES '+(TIER_NAMES[item.minTier]||'').toUpperCase())+'</div><h4>'+item.title+'</h4><p>'+item.desc+'</p><div class="lib-action '+(unlocked?'':'locked-action')+'" data-idx="'+idx+'">'+(unlocked?'VIEW →':'🔒 LOCKED — UPGRADE TO UNLOCK')+'</div>';
    if(unlocked){ card.querySelector('.lib-action').addEventListener('click',()=>openViewer(idx)); }
    grid.appendChild(card);
  });
  document.getElementById('dashboard').classList.add('show'); document.body.style.overflow='hidden';
}

function renderSavings(){ const t=parseFloat(localStorage.getItem('ledgerTotalSavings')||'0'); document.getElementById('totalSavings').textContent='$'+t.toLocaleString(); document.getElementById('savingsSub').textContent=t>0?"Nice. That's already more than this tier costs for the year.":"Log your first one — it takes 10 seconds."; }
function logWin(){ const a=prompt("Roughly how much did this save or protect you?"); const n=parseFloat(a); if(isNaN(n)||n<=0) return; const t=parseFloat(localStorage.getItem('ledgerTotalSavings')||'0')+n; localStorage.setItem('ledgerTotalSavings',t.toString()); renderSavings(); }

function randomBetween(min,max){ return Math.random()*(max-min)+min; }
function renderPreviewSavings(){
  const amt=Math.round(randomBetween(80,640)), mem=Math.round(randomBetween(1100,4200));
  document.getElementById('totalSavings').textContent='$'+amt.toLocaleString();
  document.getElementById('savingsSub').textContent="Example only — members have logged wins from $20 to over $1,000 this year. ("+mem.toLocaleString()+" logged sitewide.)";
  const sr=document.querySelector('.savings-tracker .st-right');
  if(sr&&!document.getElementById('previewSavingsTag')){ const tag=document.createElement('div'); tag.id='previewSavingsTag'; tag.className='preview-badge'; tag.textContent='EXAMPLE — NOT YOUR DATA'; sr.insertBefore(tag,sr.firstChild); }
}
function hidePreviewSavingsIfPresent(){ const t=document.getElementById('previewSavingsTag'); if(t)t.remove(); }

// MINIMAL public teaser cards — title + one intriguing line + lock. No substance revealed.
const PREVIEW_LIBRARY_CARDS = [
  { tier:1, title:"The Cash-Placement Decision Framework", teaser:"Where every dollar should sit — decided the right way, before you chase a rate." },
  { tier:1, title:"The Fee & Fine-Print Trap Guide", teaser:"The quiet ways a 'great rate' costs more than it pays." },
  { tier:1, title:"How to Compare Accounts Without Getting Played", teaser:"The method that surfaces the real return behind the marketing." },
  { tier:1, title:"Savings & APY Growth Calculator", teaser:"Run your own numbers — interactive, members only." },
  { tier:1, title:"Fee-Drag & Effective-Yield Calculator", teaser:"See your true after-fee yield instantly." },
  { tier:1, title:"Account Comparison Tool", teaser:"Two accounts, head-to-head, on your real balance." },
  { tier:2, title:"The Web3 Due-Diligence Checklist", teaser:"The questions to answer before funding anything on-chain." },
  { tier:2, title:"Custody & Smart-Contract Risk Primer", teaser:"How on-chain money is really lost — and it isn't price." },
  { tier:2, title:"Reading a Yield Opportunity", teaser:"A four-step lens that fails bad offers fast." },
  { tier:2, title:"Web3 Yield Sustainability Scorer", teaser:"Score any offer in under a minute — members only." },
  { tier:3, title:"The Income-Layering Framework", teaser:"A laddered income structure that beats guessing." },
  { tier:3, title:"Automated & Algorithmic Strategies", teaser:"How to evaluate 'set it and forget it' without the hype." },
  { tier:3, title:"Position Sizing Over Prediction", teaser:"The habit that separates durable investors from lucky ones." },
  { tier:3, title:"CD / T-Bill Ladder Builder", teaser:"Lay out your own ladder — interactive, members only." },
  { tier:3, title:"Position-Sizing Calculator", teaser:"Set your own limits before the emotion hits." },
];
function renderPreviewLibrary(){
  const grid=document.getElementById('libraryGrid'); grid.innerHTML='';
  const intro=document.createElement('p'); intro.className='desc-small'; intro.style.cssText='color:var(--slate);margin-bottom:18px;grid-column:1/-1;';
  intro.textContent="This is what's inside, tier by tier — guides and interactive calculators, unlocked when you join. Titles only shown here; the full content and tools are members-only.";
  grid.appendChild(intro);
  PREVIEW_LIBRARY_CARDS.forEach(item=>{
    const card=document.createElement('div'); card.className='library-item locked preview-blur';
    card.innerHTML='<div class="lib-tag">REQUIRES '+(TIER_NAMES[item.tier]||'').toUpperCase()+'</div><h4>'+item.title+'</h4><p>'+item.teaser+'</p><div class="lib-action locked-action">🔒 LOCKED</div>';
    grid.appendChild(card);
  });
  const note=document.createElement('div'); note.className='preview-overlay-note'; note.style.gridColumn='1/-1';
  note.textContent="Titles are real. The full in-depth guides and every interactive calculator are only visible to members.";
  grid.appendChild(note);
}

function closeDashboardToPricing(e){ if(e)e.preventDefault(); document.getElementById('dashboard').classList.remove('show'); document.body.style.overflow=''; document.getElementById('guides').scrollIntoView({behavior:'smooth'}); }

function buildWatermark(email){ const stamp=email+' · '+new Date().toLocaleDateString(); const l=document.createElement('div'); l.className='watermark-layer'; for(let i=0;i<24;i++){ const s=document.createElement('span'); s.textContent=stamp; l.appendChild(s); } return l; }
function openViewer(idx){
  const item=LIBRARY[idx]; if(!item||!currentUser) return;
  document.getElementById('viewerTitle').textContent=item.title;
  document.getElementById('viewerLicenseEmail').textContent=currentUser.email;
  const c=document.getElementById('viewerContent'); c.innerHTML='';
  const body=document.createElement('div'); body.innerHTML=item.body||'<p>Content coming soon.</p>'; c.appendChild(body);
  c.appendChild(buildWatermark(currentUser.email));
  // script tags in innerHTML don't run, so init any calculator present:
  if(c.querySelector('#sav-result')) calcSavings();
  if(c.querySelector('#fee-result')) calcFee();
  if(c.querySelector('#cmp-result')) calcCompare();
  if(c.querySelector('#w3-result')) calcWeb3Score();
  if(c.querySelector('#lad-result')) calcLadder();
  if(c.querySelector('#pos-result')) calcPosition();
  document.getElementById('contentViewer').classList.add('show'); document.body.style.overflow='hidden';
}
function closeViewer(){ document.getElementById('contentViewer').classList.remove('show'); const d=document.getElementById('dashboard').classList.contains('show'); document.body.style.overflow=d?'hidden':''; }
document.addEventListener('copy',(e)=>{ if(document.getElementById('contentViewer').classList.contains('show')) e.preventDefault(); });
document.addEventListener('keydown',(e)=>{ const v=document.getElementById('contentViewer').classList.contains('show'); if(v&&((e.ctrlKey||e.metaKey)&&['c','p','s'].includes(e.key.toLowerCase()))) e.preventDefault(); });

function setBilling(period){
  document.querySelectorAll('.billing-seg').forEach(b=>{ b.classList.toggle('active',b.dataset.billing===period); });
  ['monthly','quarterly','annual','lifetime'].forEach(p=>{ document.querySelectorAll('.price-'+p).forEach(el=>el.style.display=(p===period)?'inline':'none'); document.querySelectorAll('.price-period-'+p).forEach(el=>el.style.display=(p===period)?'inline':'none'); });
  document.querySelectorAll('.annual-note').forEach(el=>el.style.display=(period==='annual')?'block':'none');
  document.querySelectorAll('.quarterly-note').forEach(el=>el.style.display=(period==='quarterly')?'block':'none');
  document.querySelectorAll('.lifetime-note').forEach(el=>el.style.display=(period==='lifetime')?'block':'none');
  document.querySelectorAll('.product-card [data-product-key], .all-access-card [data-product-key]').forEach(btn=>{ var k=btn.getAttribute('data-product-key'); if(k)btn.setAttribute('data-price-id',k+'.'+period); });
  const sb=document.getElementById('signupBillingInterval'); if(sb)sb.value=period;
}
function initProductButtons(){
  document.querySelectorAll('.product-btn[data-product-key]').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      const k=btn.getAttribute('data-product-key'); const tm={yieldMap:1,fullLedger:2,annotatedPortfolio:3,allAccess:4}; const tier=tm[k];
      const y=document.querySelector('input[name="wantsPlan"][value="yes"]'); if(y)y.checked=true;
      const m=document.querySelector('input[name="purchaseMode"][value="single"]'); if(m)m.checked=true;
      const t=document.getElementById('signupTier'); if(t&&tier)t.value=String(tier);
      const ab=document.querySelector('.billing-seg.active'), bs=document.getElementById('signupBillingInterval'); if(bs&&ab)bs.value=ab.dataset.billing;
    });
  });
}
function toggleFaq(el){ const item=el.parentElement, a=item.querySelector('.faq-a'), was=item.classList.contains('open'); document.querySelectorAll('.faq-item').forEach(i=>{ i.classList.remove('open'); i.querySelector('.faq-a').style.maxHeight=null; }); if(!was){ item.classList.add('open'); a.style.maxHeight=a.scrollHeight+'px'; } }

function initMobileNav(){
  const t=document.getElementById('navMobileToggle'), l=document.getElementById('navLinks'); if(!t||!l) return;
  t.addEventListener('click',()=>{ const o=l.classList.toggle('mobile-open'); t.setAttribute('aria-expanded',o?'true':'false'); t.textContent=o?'×':'☰'; });
  l.addEventListener('click',(e)=>{ if(e.target.tagName==='A'){ l.classList.remove('mobile-open'); t.setAttribute('aria-expanded','false'); t.textContent='☰'; } });
  document.addEventListener('click',(e)=>{ if(!l.classList.contains('mobile-open')) return; if(l.contains(e.target)||t.contains(e.target)) return; l.classList.remove('mobile-open'); t.setAttribute('aria-expanded','false'); t.textContent='☰'; });
}
initMobileNav(); initProductButtons(); setBilling('monthly');

const revealEls=document.querySelectorAll('.reveal');
const obs=new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); obs.unobserve(e.target); } }); },{threshold:0.12});
revealEls.forEach(el=>obs.observe(el));

function showEmailPopup(){ if(sessionStorage.getItem('ledgerEmailPopupSeen'))return; if(currentUser)return; const o=document.getElementById('emailPopup'); if(!o)return; o.classList.add('show'); requestAnimationFrame(()=>o.classList.add('in')); sessionStorage.setItem('ledgerEmailPopupSeen','1'); }
function closeEmailPopup(){ const o=document.getElementById('emailPopup'); if(!o)return; o.classList.remove('in'); setTimeout(()=>o.classList.remove('show'),300); }
function handleEmailCapture(e){ e.preventDefault(); const email=document.getElementById('popupEmail').value; console.log('Captured lead email:',email); document.getElementById('emailPopupForm').style.display='none'; document.getElementById('emailPopupSuccess').style.display='block'; setTimeout(closeEmailPopup,2200); return false; }
setTimeout(showEmailPopup,4000);

async function handleResetRequest(e){
  e.preventDefault(); const email=document.getElementById('resetEmail').value; const b=document.getElementById('resetRequestBtn'); if(b){ b.disabled=true; b.textContent='SENDING…'; }
  try{ await supabase.auth.resetPasswordForEmail(email,{redirectTo:'https://onestopdesignshop.github.io/Ledger-co-site/reset-password.html'}); }catch(err){ console.error('Reset request error:',err); }
  const f=document.getElementById('resetRequestForm'), d=document.getElementById('resetRequestDone'); if(f)f.style.display='none'; if(d)d.style.display='block'; return false;
}

document.addEventListener('keydown',(e)=>{ if(e.key==='Escape'){ closeAuthModal(); closeEmailPopup(); closeViewer(); } });

(async function restoreSession(){ const {data}=await supabase.auth.getSession(); if(data&&data.session&&data.session.user){ currentUser={email:data.session.user.email,id:data.session.user.id}; await loadSubscriptionAndShowDashboard(); checkStackQueue(currentUser.email); } })();
