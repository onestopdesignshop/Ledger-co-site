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
//  5. Capital Systems download links are now signed with the
//     download flag, so tapping SAVES the file instead of opening
//     Safari's read-only preview — plus an "open it in Numbers /
//     Excel / Google Sheets" tip above the file list, because the
//     browser preview cannot run spreadsheet formulas.
//  6. NEW: Capital Systems INTERACTIVE toolkits — full browser versions
//     of the tier 5–7 workbooks (Capital Allocation, Ladder Builder +
//     Rung Ledger, Income Operations, Position Sizing & Risk Register,
//     Capital Operating System, Due-Diligence Scorecard). They run live
//     in the dashboard and auto-save entries to the buyer's device.
//     The Excel downloads remain available as the portable copies.
//  7. Product change: the downloadable Excel workbooks are now an
//     INSTITUTIONAL EXCLUSIVE "Reference Workbooks" set — one tier-7
//     card listing every file (Foundation + Operator + Institutional),
//     matched by a tier-7-only storage policy in Supabase. Foundation
//     and Operator buyers get the interactive toolkits; Institutional
//     adds the master files with worked example numbers to confirm
//     their own process against.
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
    body:`<h4>What this guide does</h4>
    <p>By the end you'll have every dollar of your cash assigned to a job, sitting in the right type of account, earning what it should. No predictions, no products to buy from us, no theory. One evening of work.</p>
    <h4>The core rule</h4>
    <p>Money gets placed by <em>when you'll need it</em>, never by which account has the best rate. Rate comes second. Every cash mistake people make — penalties, dead money in checking, panic-breaking a CD — comes from doing this backwards.</p>
    <h4>Step 1 — Find your real monthly number</h4>
    <p>Open your last 3 months of bank and card statements. Add up everything that left: rent, food, gas, subscriptions, the random stuff. Divide by 3. That's your real monthly outflow. Don't guess — people guess low by 20–30% every time. Write the number down. Everything else in this guide is built on it.</p>
    <h4>Step 2 — Set your buffer</h4>
    <p>Buffer = about 1 month of outflow, plus a little slack. It stays in checking. Its job is that nothing ever bounces. Do not chase yield with this money — the interest difference on one month of expenses is a few dollars a year, and the cost of a transfer delay on rent day is a late fee and a headache.</p>
    <p>If your checking currently holds way more than one month — that's the leak. That extra money is earning nothing for no reason. Steps 3 and 4 fix it.</p>
    <h4>Step 3 — Build your reserve</h4>
    <p>Reserve = 3 to 6 months of your Step 1 number. This is emergency money plus anything you'll spend inside 12 months (tax bill, trip, deposit).</p>
    <p>Where it goes: a high-yield savings account or money-market account that is (a) federally insured — FDIC for banks, NCUA for credit unions, (b) paying a competitive <em>standing</em> rate, not a promo, and (c) able to get money to you within 1–2 business days.</p>
    <p>How to pick one fast: check two independent rate-comparison sites, take the top handful of insured accounts with no monthly fee and no conditions, pick the one whose transfer speed and app annoy you least. Done. Don't spend a week on this — the gap between the top few is pennies.</p>
    <h4>Step 4 — Park the rest</h4>
    <p>Whatever's left after buffer and reserve is parked capital — money you're <em>certain</em> you won't touch for 12+ months. Certain means certain. If there's a real scenario where you'd need it in month 6, it belongs in the reserve.</p>
    <p>Where it goes: CDs or Treasury bills, where you lock a guaranteed rate in exchange for the lockup. Pick the maturity by your honest timeline, not by which rate looks best. A 12-month instrument you hold to maturity beats an 18-month one you break, every time.</p>
    <h4>Step 5 — Run the one-question filter on anything you open</h4>
    <p>Before opening any account, answer in one written sentence: "What has to be true for this rate to actually apply to me?" If the sentence needs a balance cap, a direct-deposit trigger, or a promo expiry to be true — the headline rate is fiction for you. Walk.</p>
    <h4>Worked example — $22,000 sitting in checking</h4>
    <p><strong>Step 1:</strong> Statements say real outflow is $3,500/month.</p>
    <p><strong>Step 2:</strong> Buffer = $4,000 stays in checking.</p>
    <p><strong>Step 3:</strong> Reserve = 4 months = $14,000 → insured high-yield savings. On a competitive rate that's hundreds of dollars a year the checking account was donating to the bank.</p>
    <p><strong>Step 4:</strong> Remaining $4,000 has no job for 12+ months → 12-month CD or T-bill at a locked rate.</p>
    <p>Total time: one evening. Risk added: zero — every dollar stayed insured. The only change is that the money now has jobs.</p>
    <h4>Step 6 — Set the maintenance schedule</h4>
    <p>This framework is not a hobby. Re-run it only when: your income changes, a big expense appears on the horizon, or a year has passed. Put one calendar reminder 12 months out. That's it. Re-running it weekly because a bank ran a promo is how people churn themselves into worse setups.</p>
    <h4>Mistakes that cost real money</h4>
    <p><strong>Optimizing the buffer.</strong> Yield-chasing your bill money creates friction exactly where you can't afford it.</p>
    <p><strong>One big pile.</strong> Undivided cash gets managed to its most conservative dollar — so all of it earns the least.</p>
    <p><strong>"Probably won't need it" going into a CD.</strong> Parked capital requires "won't." When in doubt, it's reserve.</p>
    <p><strong>Breaking a lockup for a non-emergency.</strong> One early-withdrawal penalty can erase a year of rate advantage. The buffer and reserve exist so this never happens.</p>
    <h4>Do this now</h4>
    <p>☐ Pull 3 months of statements, compute real monthly outflow.<br>
    ☐ Leave ~1 month in checking as the buffer.<br>
    ☐ Move 3–6 months to an insured, no-fee, no-conditions high-yield account.<br>
    ☐ Lock anything beyond that in a maturity you're certain you can wait out.<br>
    ☐ Write the one-sentence rate condition for every account you opened.<br>
    ☐ Set one reminder 12 months out. Close the tab. You're done.</p>` },
  { title:"The Fee & Fine-Print Trap Guide", desc:"The recurring ways a 'great rate' quietly costs more than it pays — and how to catch each one.", minTier:1,
    body:`<h4>What this guide does</h4>
    <p>Banks publish one big number and hide five ways to take it back. This guide names all five traps, shows you exactly where each one hides in the disclosure, and gives you a 10-minute routine that catches every one before you open the account.</p>
    <h4>The five traps</h4>
    <p><strong>Trap 1 — The balance cap.</strong> The headline rate applies only "up to" some ceiling; everything above earns scraps. A spectacular rate on the first $500 of a $20,000 balance is a rounding error dressed as a headline. The only number that matters is your <em>blended</em> rate across the whole balance — and with a low cap, it's usually worse than a boring account with no cap.</p>
    <p><strong>Trap 2 — The activity requirement.</strong> "Boosted" rates that require a qualifying direct deposit, a minimum number of debit swipes, or a linked account. Miss it one month and you silently drop to the base rate — no email, no alert. Rule: only accept a requirement your life already does automatically. If you have to <em>remember</em> it, price the account at the base rate, because that's what you'll earn on your laziest month.</p>
    <p><strong>Trap 3 — The promo cliff.</strong> A real rate for an introductory window, then a reversion to a weak one. Banks run these because most people never move the money again. Unless you will genuinely re-shop on the expiry date — and you know whether you're that person — evaluate the account as if the promo doesn't exist. The reversion rate is your rate.</p>
    <p><strong>Trap 4 — The maintenance fee.</strong> Compare the fee to your interest in <em>dollars</em>, not to other fees. A $10/month fee is $120/year. On a $4,000 balance there is no realistic savings rate that outruns it — the account is a guaranteed loss wearing an APY badge.</p>
    <p><strong>Trap 5 — The minimum-to-earn.</strong> The advertised rate only applies above a floor; below it you earn near zero. If your balance crosses that line during the month, your effective rate is unpredictable and your statement won't make it obvious.</p>
    <h4>The 10-minute disclosure routine</h4>
    <p><strong>Step 1:</strong> Open the account's fee schedule and rate disclosure (every insured institution must publish them — usually linked in the page footer).</p>
    <p><strong>Step 2:</strong> Search the page for "up to" near any rate. Found it? That's the cap. Write it down.</p>
    <p><strong>Step 3:</strong> Search "qualif" (catches qualifying/qualification). That's the activity requirement. Write down exactly what and how often.</p>
    <p><strong>Step 4:</strong> Search "introductory" and look for any dates near the rate. That's the promo cliff. Write down the reversion rate — if you can't find it, call and ask, and if they won't say plainly, walk.</p>
    <p><strong>Step 5:</strong> Open the fee table. Write down the monthly fee and every condition that waives it. Write down any minimum balance to earn.</p>
    <p><strong>Step 6:</strong> Now write the one sentence: "I will earn X% when ___." More than two "if"s in the blank means the product is designed for you to fail it.</p>
    <h4>The math step — always in dollars</h4>
    <p><strong>Step 7:</strong> Take YOUR typical balance. Apply the top rate only up to the cap, the base rate above it. Subtract 12 months of fees. Knock the result down for any month you'd realistically miss a condition. That final dollar figure is the account's true annual value to you.</p>
    <p><strong>Step 8:</strong> Compute the same figure for one plain, no-strings, no-fee insured account. Compare. The boring account wins a huge share of real matchups — which is exactly why the flashy one needed the marketing.</p>
    <h4>Worked example — the trap stack</h4>
    <p>An account advertises a chart-topping rate. The disclosure shows: applies up to $5,000 only, requires $1,000+/month direct deposit, token base rate on everything else. You'd hold $15,000.</p>
    <p>Run Step 7: top rate touches only a third of your money; two-thirds earns the base rate; one payroll hiccup drops the whole month to base. Run Step 8 against a plain account paying a good standing rate on all $15,000. The plain account wins outright — before you even price in your own forgetfulness. Ten minutes, decision made, trap avoided.</p>
    <h4>Mistakes that cost real money</h4>
    <p><strong>Comparing headline to headline.</strong> Two APYs are only comparable after both pass the routine. Otherwise you're comparing ad budgets.</p>
    <p><strong>Trusting future-you to maintain conditions.</strong> Everyone overestimates their diligence. Price at your laziest month.</p>
    <p><strong>Ignoring exit friction.</strong> Closure fees and slow transfers make a bad account expensive to leave. Check before entering.</p>
    <p><strong>Not diarizing the promo expiry.</strong> If you do take a promo, the calendar entry goes in the same minute you open the account — or the bank wins by default.</p>
    <h4>Do this now</h4>
    <p>☐ Run Steps 1–6 on every account you currently hold. Write the one-sentence condition for each.<br>
    ☐ Run the Step 7 dollar math on your real balances.<br>
    ☐ Compare each against one no-strings alternative (Step 8).<br>
    ☐ Move anything that loses. Diary any promo expiry you keep.<br>
    ☐ Save the routine — it's the same 10 minutes for every account you'll ever consider.</p>` },
  { title:"How to Compare Accounts Without Getting Played", desc:"A side-by-side method that surfaces the real cost and real return, not the marketing.", minTier:1,
    body:`<h4>What this guide does</h4>
    <p>Marketing wins when every product is described differently. You win by forcing every candidate into the same seven columns and computing one number per account: what it pays <em>you</em>, on <em>your</em> balance, after fees, at your real level of diligence. This guide is that method, start to finish.</p>
    <h4>Step 1 — Fix the job before the shopping</h4>
    <p>Decide which bucket this money is (buffer / reserve / parked — see the Cash-Placement Framework). That sets the required access speed. Compare only within the bucket: savings vs. savings, 12-month lockup vs. 12-month lockup. A CD "beating" a savings account is a category error — they solve different problems.</p>
    <h4>Step 2 — Build the seven-column table</h4>
    <p>One row per candidate (your current account plus two or three challengers — more is noise). The columns, always the same:</p>
    <p><strong>1. Base rate</strong> — what you earn with no conditions met.<br>
    <strong>2. Conditional rate + its condition</strong> — the boosted rate and exactly what triggers it.<br>
    <strong>3. Balance cap</strong> — the ceiling the good rate applies to.<br>
    <strong>4. Monthly fee</strong> — and what waives it.<br>
    <strong>5. Minimum to earn</strong> — the floor below which you earn ~nothing.<br>
    <strong>6. Insurance</strong> — FDIC/NCUA yes or no. No is disqualifying for cash.<br>
    <strong>7. Access speed</strong> — instant / next-day / multi-day.</p>
    <p>Filling the table IS the filter. A product that resists plain description — you can't find the reversion rate, the fee page is a maze — is telling you how it makes money. Treat "hard to fill in" as a red flag by itself.</p>
    <h4>Step 3 — Disqualify before you compare</h4>
    <p>Cross out anything uninsured. Cross out anything slower than the bucket's required access speed. Cross out anything whose fee exceeds the interest your balance would earn (do the dollar math — a $10/month fee needs $120/year of interest just to break even). Whatever survives is a real candidate.</p>
    <h4>Step 4 — Compute YOUR number for each survivor</h4>
    <p>For each account: your typical balance × the rate you'd actually earn (top rate up to the cap, base above it, base for any month you'd miss a condition) − 12 months of fees = <strong>effective annual dollars to you</strong>. One number per account. This is the only number that decides anything. The headline never enters the math.</p>
    <h4>Step 5 — Break ties on friction and safety, never basis points</h4>
    <p>If two survivors land within a rounding error: pick the one with no conditions to maintain, then the faster access, then the better app/support. A slightly lower rate you can't fumble beats a slightly higher one you must babysit. And never switch banks for the last few basis points — the move from a near-zero rate to a competitive one is worth real money; the move between two competitive rates rarely pays for the friction.</p>
    <h4>Worked example — $12,000, three candidates</h4>
    <p><strong>Account A:</strong> highest headline on the page — but capped at $5,000, token rate above, monthly fee unless you link checking. Step 4 math on $12,000: blended rate across capped and uncapped dollars, minus fees, lands well below the headline.</p>
    <p><strong>Account B:</strong> middling headline, unconditional, no fee, full balance. Effective = headline exactly. Nothing to maintain.</p>
    <p><strong>Account C:</strong> strong promo for a few months, weak reversion. Twelve-month blend sits between A and B — and requires you to act on a future date or drift to the weak rate for years.</p>
    <p>A looked best and C looked exciting. On your balance with your behavior, B wins or ties while demanding nothing. That inversion — the boring one winning after honest math — is the most common outcome of this method, which is exactly why the marketing works on people who skip it.</p>
    <h4>Step 6 — Execute and schedule the re-check</h4>
    <p>Open the winner. Move the money. Write the one-sentence rate condition and file it. Set a single reminder 6–12 months out to re-run the table. Then stop looking — checking rates weekly is how people churn into worse setups one promo at a time.</p>
    <h4>Mistakes that cost real money</h4>
    <p><strong>Adding columns.</strong> Seven is enough. The marketing wants you drowning in feature comparisons; the seven columns are where the money actually is.</p>
    <p><strong>Comparing across buckets.</strong> Different liquidity = different product = no comparison.</p>
    <p><strong>Skipping the dollar math.</strong> Percentages hide caps and fees. Dollars don't.</p>
    <p><strong>Treating it as permanent — or as a hobby.</strong> Once or twice a year, or on a life change. Not never, not weekly.</p>
    <h4>Do this now</h4>
    <p>☐ Name the bucket and required access speed.<br>
    ☐ Build the seven-column table: current account + 2–3 challengers.<br>
    ☐ Disqualify on insurance, speed, and fee-vs-interest dollars.<br>
    ☐ Compute effective annual dollars for each survivor on your real balance.<br>
    ☐ Pick the winner; break ties on friction, not basis points.<br>
    ☐ Move the money, file the condition sentence, set the re-check reminder.</p>` },
  { title:"The Web3 Due-Diligence Checklist", desc:"The exact custody, audit, and exit questions to answer before funding any on-chain product.", minTier:2,
    body:`<h4>What this guide does</h4>
    <p>This is the exact sequence to run on any on-chain product before a single dollar goes in. It's ordered so the cheapest checks come first — most bad products die at Step 1 or 2 and you never waste time on the rest. Run it in order. Stop at the first hard fail.</p>
    <h4>Step 1 — The disappearing-company test (custody)</h4>
    <p>Answer in writing: <em>if this company/team vanished tonight, could I still move my funds?</em></p>
    <p>Yes = you actually control the assets. No = you are an unsecured creditor of that company, whatever the landing page says. "Non-custodial" branding means nothing — the test is behavioral. If the answer is no, the rest of the checklist is really credit analysis on a company you can't audit. Most people should stop here unless the platform is large, regulated, and the position is sized like a loan to it.</p>
    <h4>Step 2 — Name the yield source in one sentence</h4>
    <p>Write: "This pays a return because ___," naming <em>who pays</em> and <em>why they're willing to</em>.</p>
    <p>Passes: "borrowers pay interest to borrow against collateral," "the network pays staking rewards for validation," "traders pay fees the pool shares."<br>
    Fails: "advanced strategies," "the protocol generates yield," "more people are joining." A mechanism-shaped sentence with no mechanism inside means the marketing team wrote the yield.</p>
    <p>Then sanity-check the size: every real source has a ceiling — staking is bounded by network issuance, fee-sharing by real volume, lending by what solvent borrowers pay. A yield far above its claimed source's ceiling is being filled by something you weren't told: token emissions that dilute you, hidden leverage, or the next depositor. Hard stop on "guaranteed" anything.</p>
    <h4>Step 3 — Verify the audit yourself (10 minutes)</h4>
    <p><strong>3a.</strong> Find the audit report itself — not the project's tweet about it. No audit at all = hard stop.<br>
    <strong>3b.</strong> Check the date against the code. An old audit on since-changed contracts is nearly as bad as none.<br>
    <strong>3c.</strong> Read the findings summary. "Fixed" is good. Critical findings marked "acknowledged" means they shipped known holes.<br>
    <strong>3d.</strong> Confirm the audited contract address matches the address you'd actually deposit into. Mismatches are a classic shell game.</p>
    <h4>Step 4 — Check who holds the admin key</h4>
    <p>Find out: can anyone upgrade or pause the contract? Who — a single key, a multisig, a timelock? A protocol where one anonymous key can change the code can, by construction, take everything. A multisig with a timelock isn't perfect but it means changes are visible before they bite. Single anonymous admin key + your life savings = no.</p>
    <h4>Step 5 — Test the exit with real (tiny) money</h4>
    <p>Deposit a trivial amount. Withdraw 100% of it. Time the round trip. Read what conditions could slow it: lockups, queues, fees that spike under stress, exits that depend on a token only traded in one thin venue.</p>
    <p>Understand what you measured: a small withdrawal on a calm day is the <em>best case you will ever see</em>. If the best case is already slow, vague, or conditional, the stressed case is a trap. Ask the ugly version explicitly: what happens if a quarter of depositors leave the same week?</p>
    <h4>Step 6 — Team and treasury</h4>
    <p>Is the team identifiable? Not because doxxed founders can't fail — because anonymous ones face no consequence for choosing to. Is the project's own treasury held in hard assets (sturdy) or its own token (fragile — the runway evaporates exactly when it's needed)?</p>
    <h4>Step 7 — Scan for the instant disqualifiers</h4>
    <p>Any ONE of these ends the evaluation, no matter how good everything else looked: guaranteed fixed returns · anonymous team with no track record · pressure to deposit quickly ("migrate now," countdown timers) · a yield too high for its claimed source · referral rewards as the main growth engine. "Too good to be true" is not a cliché here — it's the recurring shape of every collapse.</p>
    <h4>Worked walkthrough — a "stable yield vault"</h4>
    <p>Double-digit advertised return on a dollar-pegged token. Step 1: contract-based, but an admin key can pause withdrawals — yellow. Step 2: "delta-neutral strategies" — that's a category, not a source — red. Step 3: one audit, eighteen months old, two criticals "acknowledged" — red. Step 4: single admin key, holder unknown — red. Step 5: "instant under normal conditions, queued otherwise" — yellow. Step 6: pseudonymous team — yellow.</p>
    <p>No single smoking gun. The <em>pattern</em> is the verdict: five-plus flags across every category. You don't need to know how it fails to know it's built to be able to. Pass.</p>
    <h4>Sizing — the step people skip</h4>
    <p>If something survives all seven steps, it's still web3: size it so a total loss changes nothing about your life. Diligence lowers the odds of failure; sizing is the only thing that caps the cost of it.</p>
    <h4>Do this now</h4>
    <p>☐ Write the disappearing-company answer before any deposit.<br>
    ☐ Write the one-sentence yield source; check it against the source's ceiling.<br>
    ☐ Read the actual audit; match the audited address to the live one.<br>
    ☐ Identify the admin key and what it can change.<br>
    ☐ Do the tiny deposit-and-full-withdrawal round trip; time it.<br>
    ☐ Scan the disqualifier list. Any hit = stop.<br>
    ☐ Size the survivor for zero.</p>` },
  { title:"Custody & Smart-Contract Risk Primer", desc:"Plain-English coverage of the ways on-chain money is lost that have nothing to do with price.", minTier:2,
    body:`<h4>What this guide does</h4>
    <p>Most first-timers watch price. But the losses that wipe people out are structural — keys, exploits, insolvency, permissions, phishing. This guide names all five channels, then gives you a setup routine that neutralizes most of them in one afternoon.</p>
    <h4>The five ways money actually disappears</h4>
    <p><strong>1. Key loss.</strong> Lose the seed phrase, funds are gone forever. No support line, no reset. Self-custody trades platform risk for personal-responsibility risk — that's the whole deal.</p>
    <p><strong>2. Smart-contract exploits.</strong> A bug in the protocol's code drains deposits regardless of the market. Time-in-production is real information: a contract holding serious value untouched for years has survived continuous, well-funded attack; last month's fork has survived nothing, however similar its code looks.</p>
    <p><strong>3. Platform insolvency.</strong> A custodial balance can "show" on a dashboard long after the assets behind it are gone. The historical pattern is always the same: withdrawals slow → pause "temporarily" → become a legal process where depositors learn they're unsecured creditors. A custodial balance is a loan to a company. Size it and watch it like one.</p>
    <p><strong>4. Standing approvals.</strong> Interacting with a malicious contract can grant it permanent permission to move your tokens <em>later</em> — months later, from a site you forgot. The theft doesn't happen when you sign; the door just stays open.</p>
    <p><strong>5. Signature phishing.</strong> A growing share of losses involve no exploit at all — a pixel-perfect fake site or an urgent DM walks the victim into signing exactly the transaction the attacker wanted. Urgency is the attack signature.</p>
    <h4>The setup routine — one afternoon, do it in order</h4>
    <p><strong>Step 1 — Fix the seed phrase.</strong> Written physically. Never photographed, never typed into a cloud note, never in a password manager screenshot. Two copies, two locations. Screenshots and cloud notes are the most-harvested objects in this entire ecosystem.</p>
    <p><strong>Step 2 — Prove the backup works.</strong> Restore a wallet from your written phrase with a trivial balance in it. The first time you rely on the backup must not be the emergency. Ten minutes, and now the backup is a fact instead of a hope.</p>
    <p><strong>Step 3 — Split into two wallets.</strong> A <em>vault</em> wallet holds the majority and interacts with nothing — no apps, no signatures, ever. A <em>spending</em> wallet touches applications and holds only what it's actively using. Now exploits, approvals, and phishing can only ever reach the small wallet. This one structure removes most of your surface area.</p>
    <p><strong>Step 4 — Clean your approvals.</strong> Use a reputable approval-review tool to list every standing token permission your addresses have granted. Revoke everything you don't recognize or no longer use. Repeat every few months. Each revocation closes a door you didn't know was open.</p>
    <p><strong>Step 5 — Bookmark everything.</strong> Every protocol you use gets a bookmark, created from a verified source once. From now on you enter ONLY through bookmarks — never through links sent to you, never through search ads. This single habit defeats the fake-front-end attack outright.</p>
    <p><strong>Step 6 — Read before signing, every time.</strong> Modern wallets describe what a transaction does. Read it. If you can't parse what you're granting, reject it. Ten seconds per signature; highest-value security habit that exists. Corollary: when an interface asks for an <em>unlimited</em> token allowance "for convenience," grant the specific amount instead.</p>
    <p><strong>Step 7 — Size custodial balances like loans.</strong> For every platform balance, ask: could I afford this frozen for a year and possibly gone? Resize until the answer is yes. Big brands don't exempt you — the largest failures were, at the time, the most trusted names in the space.</p>
    <h4>The mindset that ties it together</h4>
    <p>Treat every transaction as irreversible and every counterparty as capable of failing — because both are true here. Then size every position (one protocol, one platform, one wallet) so its total loss is survivable. Structural risk gives no warning; sizing is the only defense that works retroactively.</p>
    <h4>Mistakes that cost everything</h4>
    <p><strong>"Temporary" digital backups.</strong> There is no temporary. The photo syncs, the cloud gets breached, the funds leave.</p>
    <p><strong>One wallet for everything.</strong> Your life savings should never be the wallet that signs things.</p>
    <p><strong>Trusting urgency.</strong> "Migrate now," "verify your wallet," countdown timers — real protocols don't need you to panic.</p>
    <p><strong>Assuming the dashboard number is money.</strong> On a custodial platform it's an IOU until it's withdrawn.</p>
    <h4>Do this now</h4>
    <p>☐ Rewrite the seed phrase on paper; two copies, two locations; delete any digital trace.<br>
    ☐ Test-restore from the written backup once.<br>
    ☐ Create the vault/spending split; move the majority to the vault.<br>
    ☐ Review and revoke stale approvals; calendar it quarterly.<br>
    ☐ Bookmark every protocol; swear off sent links.<br>
    ☐ Resize every custodial balance to loan-you-can-lose size.</p>` },
  { title:"Reading a Yield Opportunity: A Worked Method", desc:"A step-by-step lens for pulling apart any 'passive income' crypto offer before you commit a dollar.", minTier:2,
    body:`<h4>What this guide does</h4>
    <p>Every yield pitch — vault, staking program, lending market, "passive income" anything — gets the same four steps, in order, stopping at the first fail. Most offers die at Step 1. The method takes 30 minutes on a real candidate and 30 seconds on a scam, which is the point.</p>
    <h4>Step 1 — Name the mechanism, with a payer</h4>
    <p>Write one sentence: "This pays a return because ___." The sentence must name <em>who pays</em> and <em>why they're willing to</em>.</p>
    <p>Real mechanisms: borrowers paying interest against collateral · networks paying staking rewards for validation · traders paying fees a pool shares. Fake mechanisms: "advanced strategies" · "the protocol generates yield" · "growth of the ecosystem" · anything where the honest answer is "the next depositor."</p>
    <p>If the docs can't produce the sentence, stop here. You just saved 30 minutes and possibly everything else.</p>
    <h4>Step 2 — Compute the honest rate</h4>
    <p><strong>2a. Benchmark it.</strong> Put the advertised yield next to boring, well-understood rates. An order of magnitude higher = the gap is compensation for a risk you haven't found yet. Find it before it finds you.</p>
    <p><strong>2b. Decompose it.</strong> Many advertised APYs are a blend: a small "real" part paid in the asset you deposited, plus a big "incentive" part paid in the protocol's own token. The incentive part is only money when you sell it — into a price the emissions themselves push down. Restate the yield with the incentive component discounted or removed.</p>
    <p><strong>2c. Decide on the honest number only.</strong> Often it's a quarter of the advertised one. If the honest number doesn't interest you, you're done — you were being paid in confetti.</p>
    <h4>Step 3 — Map the exit before the entry</h4>
    <p>Write down, before depositing, exactly how you'd get 100% out and how long it takes — under calm AND under stress.</p>
    <p><strong>3a. Test it.</strong> Tiny deposit, full withdrawal, time it. Calm-day behavior is your best case forever.<br>
    <strong>3b. Stress it on paper.</strong> What happens to the queue if a quarter of depositors leave in a week? Does your exit price depend on a peg or share price that would be collapsing in exactly that scenario? Does it depend on a token that only trades in one thin venue?<br>
    <strong>3c. Rule:</strong> vague exit = trap, regardless of yield. A yield product is an entry, a stream, and an exit — and the exit is the part tested least and needed most.</p>
    <h4>Step 4 — Size it for zero, then check it's worth it</h4>
    <p><strong>4a.</strong> Choose the position size assuming this specific product returns nothing. If that size costs you sleep, the size is wrong — no thesis fixes it.</p>
    <p><strong>4b.</strong> Multiply the honest rate (Step 2c) by that survivable size. That's the real annual dollars on the table. Now judge: is that figure worth the tail risk and the monitoring? A double-digit yield on a survivable position often pays less per year than a boring insured rate on your reserve. If so, the position is entertainment — size it like entertainment or skip it.</p>
    <p><strong>4c.</strong> Set the exit trigger now: the rate at which this stops paying for its risk, and any event (audit issue, team change, exit slowdown) that means leave immediately. Variable yields drift; deciding in advance is what stops drift from stranding you.</p>
    <h4>The method end to end — two candidates</h4>
    <p><strong>A lending-market deposit on a major asset:</strong> Step 1: borrowers pay to leverage against collateral — pass. Step 2: elevated but within sight of real borrowing demand; sliver of token incentives — pass, honest rate noted. Step 3: instant normally; can queue if utilization maxes — a real, bounded, understandable risk — conditional pass. Step 4: sized so total loss stings but changes nothing; honest dollars judged worth it; exit triggers written. Verdict: not "safe" — <em>understood</em>, which is the only standard available.</p>
    <p><strong>A "guaranteed" high-yield program:</strong> Step 1: no payer nameable. Dead in one step. Three steps saved.</p>
    <h4>Mistakes that cost real money</h4>
    <p><strong>Letting decimal places imply legitimacy.</strong> A yield quoted to two decimals isn't more real — it's just better typography.</p>
    <p><strong>Evaluating the protocol but not the wrapper.</strong> A sound protocol accessed through a third-party vault inherits the vault's risks too. You always hold the weakest layer.</p>
    <p><strong>Anchoring on entry-day rates.</strong> Variable means variable. No pre-set floor = you'll ride it down out of inertia.</p>
    <p><strong>Skipping Step 4b.</strong> People run diligence for hours on positions whose honest annual dollars wouldn't cover a dinner. Compute the dollars first next time.</p>
    <h4>Do this now</h4>
    <p>☐ Write the mechanism sentence with a named payer — or stop.<br>
    ☐ Strip incentives out of the APY; keep only the honest number.<br>
    ☐ Write the calm and stressed exit; test a tiny round trip.<br>
    ☐ Size for zero; compute honest annual dollars; judge if it's worth it.<br>
    ☐ Write the exit triggers before the entry.</p>` },
  { title:"The Income-Layering Framework", desc:"Building a laddered, auditable income approach across liquidity tiers — the structure, not a stock tip.", minTier:3,
    body:`<h4>What this guide does</h4>
    <p>Instead of one lump of cash earning one rate, you build a ladder: staggered guaranteed-rate instruments where something is always maturing soon. Result: nearly all your money earns longer-term rates while your effective liquidity stays short. No forecasting, no products to pick monthly, one small decision per interval. This guide builds it start to finish.</p>
    <h4>Why this beats guessing at rates</h4>
    <p>A ladder makes every rate scenario contain good news. Rates rise? Your next maturing rung rolls into the higher rate. Rates fall? Your longer rungs are locked in and look smarter monthly. You replaced a forecast with a structure — and converted rate anxiety into a boring calendar event. That's the entire trick, and it's enough.</p>
    <h4>Step 1 — Confirm the foundation first</h4>
    <p>The ladder only gets money that survives the Cash-Placement Framework: buffer funded, reserve funded, and only <em>parked capital</em> (won't-touch-for-12-months money) goes on the ladder. A ladder built with money you might need next month isn't a ladder — it's a penalty schedule.</p>
    <h4>Step 2 — Pick the rung interval from your life</h4>
    <p>The interval = the longest you're comfortable waiting for the next chunk to unlock. Quarterly suits most households. Monthly suits tight cash flow. Semiannual suits big, stable anchors. Don't overthink: quarterly is the default for a reason.</p>
    <h4>Step 3 — Build the first cycle</h4>
    <p>Split the total evenly across maturities that step by your interval. Quarterly with $24,000: $6,000 each into instruments maturing at 3, 6, 9, and 12 months. Instruments: CDs (insured) or Treasury bills — guaranteed rate, known maturity, no credit surprises. Nothing exotic goes on a ladder; predictability is the product.</p>
    <p><strong>Critical sub-step: turn off auto-renewal on every instrument, the day you open it.</strong> Auto-renewal defaults roll you into whatever uncompetitive rate the institution feels like. Every maturity must pass through your hands.</p>
    <h4>Step 4 — Write the default roll rule</h4>
    <p>One sentence, written in advance: "At each maturity: roll into a new longest-rung instrument, unless a planned expense falls inside the next interval." Now the recurring decision takes one minute instead of becoming a quarterly research project. The rule is the machine; you're just the operator.</p>
    <h4>Step 5 — Run the machine</h4>
    <p>Month 3: the first rung matures. Apply the rule — roll it into a new 12-month instrument at whatever today's rate is. Month 6: same. Month 9: same. From month 12 onward, here's what you own: <em>every</em> rung is a 12-month instrument earning 12-month rates, and a rung matures every quarter.</p>
    <p>Read that again, because it's the payoff: 100% of the laddered money earns the long rate, with effective quarterly liquidity. No bank sells that product. You manufactured it with a calendar.</p>
    <h4>Step 6 — Keep the one-page ledger</h4>
    <p>One row per rung: instrument · amount · rate · maturity date · action taken at maturity. Update it at every roll. This page is what turns "I have some CDs somewhere" into a system — and it's where you catch drift: a rung that quietly auto-renewed at a junk rate, or an anchor that's grown past what "won't need it" honestly covers.</p>
    <h4>Step 7 — De-building, when life changes</h4>
    <p>Income drops, big purchase appears? Just stop rolling. The ladder returns your capital in scheduled installments — one rung per interval — with zero early-withdrawal penalties. Graceful under stress is a feature you built in on day one by never putting reserve money on the ladder.</p>
    <h4>Worked example — full first year</h4>
    <p>$24,000 parked, quarterly rungs. Day 1: $6,000 × maturities of 3/6/9/12 months. Month 3: rung 1 matures → rule says roll → new 12-month instrument. Months 6, 9: same. Month 12: original 12-month rung matures → roll. Steady state achieved: four 12-month rungs, one maturing every quarter, one minute of decision per quarter, one page tracking it all. If rates rose during the year, your rolls captured it; if they fell, three of four rungs were locked before the drop. You never once had to be right about rates.</p>
    <h4>Mistakes that cost real money</h4>
    <p><strong>Auto-renewal left on.</strong> The single most common leak. Turn it off at purchase, every time.</p>
    <p><strong>Reserve money on the ladder.</strong> One emergency + one penalty erases a year of rate edge.</p>
    <p><strong>Exotic rungs.</strong> Credit risk and unclear exits don't belong here. The ladder's product is certainty.</p>
    <p><strong>Twelve rungs because it feels sophisticated.</strong> It's just twelve decisions instead of four. Match complexity to the capital.</p>
    <p><strong>Skipping the ledger.</strong> Untracked ladders drift. One page, updated at each maturity, is the whole cost.</p>
    <h4>Do this now</h4>
    <p>☐ Confirm buffer and reserve are fully funded; ladder only parked capital.<br>
    ☐ Pick the interval (default: quarterly).<br>
    ☐ Split evenly across the first cycle's maturities; insured/guaranteed instruments only.<br>
    ☐ Kill auto-renewal on every rung today.<br>
    ☐ Write the one-sentence roll rule.<br>
    ☐ Create the one-page ledger; update at every maturity.</p>` },
  { title:"A Sober Look at Automated & Algorithmic Strategies", desc:"How to evaluate 'set it and forget it' automated income tools without the hype.", minTier:3,
    body:`<h4>What this guide does</h4>
    <p>Automation doesn't reduce risk — it removes hesitation, which cuts both ways. A good rule executed without hesitation compounds; a flawed rule compounds faster. This guide is the full evaluation sequence for any bot, algorithm, or "set and forget" system — yours or someone else's — plus the deployment discipline that keeps a logic flaw from becoming a portfolio event.</p>
    <h4>Step 1 — The by-hand test</h4>
    <p>Write the strategy's rules in plain language: exactly what triggers a buy, exactly what triggers a sell. Then ask: would I take these exact trades manually? If no, automating them doesn't make them better — it makes them unattended. If the rules can't be written plainly ("proprietary AI signals"), you're not evaluating a strategy, you're trusting a stranger. Stop or size accordingly.</p>
    <h4>Step 2 — Name the kill conditions</h4>
    <p>Every strategy has a market it's worst in. Momentum systems get whipsawed in choppy, direction-less markets — buying strength that immediately fades. Mean-reversion systems get run over by strong trends. Find yours and say it out loud. Then find the worst historical stretch in the backtest and stare at it: that drawdown, at your intended size, in real dollars — can you sit through it without pulling the plug at the bottom? If not, the size is wrong before you've started.</p>
    <h4>Step 3 — Interrogate the backtest (it lies by omission)</h4>
    <p><strong>3a. Overfitting:</strong> enough parameters make any historical curve beautiful. The more beautiful the backtest, the more suspicious you should be. Ask how many versions were tried before this one — the ones that failed are the denominator you're not shown.<br>
    <strong>3b. Frictionless fills:</strong> backtests trade at prices real orders don't get — no spread, no slippage, no missed fills. Strategies that trade often are hurt most. Mentally tax every trade and see if the edge survives.<br>
    <strong>3c. Regime dependence:</strong> a strategy born in one kind of market contains that market as a hidden assumption. Ask what regime the test covers, and what happens in its opposite.<br>
    Verdict rule: treat impressive historical returns as marketing. The backtest can disqualify a strategy; it can never qualify one.</p>
    <h4>Step 4 — Audit the plumbing</h4>
    <p><strong>4a. Custody:</strong> who holds the funds while it runs? Best structure: money sits at a regulated broker; the automation only sends orders. Anything where the bot's operator can withdraw is a different (worse) product.<br>
    <strong>4b. Hard stop:</strong> does a maximum-loss stop exist, and does it execute in live conditions or only in the backtest? Know its holes — a stop that fires at market open can be gapped past overnight. Named and priced beats assumed.<br>
    <strong>4c. Failure mode:</strong> when the automation itself dies — expired token, API outage, scheduler crash — does it fail SAFE (flat or holding a known position, alert fired) or fail OPEN (mid-position, silent)? Fail-open is disqualifying.<br>
    <strong>4d. Alerting:</strong> you must be told about every action and every error. Silent success is fine; silent failure is how "I assumed it was running" becomes the most expensive sentence in trading.<br>
    <strong>4e. Manual override:</strong> can you flatten everything from your phone in under a minute? Rehearse it once, for real. An unrehearsed emergency plan is an emergency hope.</p>
    <h4>Step 5 — Deploy on the graduation ladder</h4>
    <p><strong>5a.</strong> Start at a size whose <em>total loss</em> you'd shrug off — you're paying tuition to see live behavior, and live behavior always differs from the backtest.<br>
    <strong>5b.</strong> Let it run through at least one full cycle including a bad stretch. The bad stretch is the audition; the good stretch is just weather.<br>
    <strong>5c.</strong> Pre-write the scaling rule NOW: "after X months live including a drawdown handled correctly, size may increase to Y." Written in calm, because size decisions made during a winning streak are made by the streak, not by you.<br>
    <strong>5d.</strong> Hard ceiling: never automate more than you'd be willing to lose to a logic flaw you didn't catch. That number exists whether you write it down or not — writing it down just means you chose it.</p>
    <h4>Step 6 — Keep the log</h4>
    <p>The automation writes its own diary: every signal, every trade, every error, timestamped. When (not if) something surprises you, the log is the difference between a diagnosis and a shrug. Review it briefly on a schedule — weekly is plenty — looking for drift: fill quality degrading, errors clustering, behavior diverging from the rules in Step 1.</p>
    <h4>Worked evaluation — a signal-based rotation system</h4>
    <p>A simple momentum system rotates between an aggressive position and a defensive one on a signal. Step 1: rules explicit and mechanical — pass. Step 2: kill condition is chop/whipsaw; worst backtest stretch identified and priced — pass with eyes open. Step 3: few parameters, modest-looking backtest, regime coverage includes both trends and chop — acceptable. Step 4: funds at a regulated broker, orders-only bot; stop exists but executes at open (gap risk named); scheduler failure = position stays put + alert fires = fail-safe; full alerting; flatten rehearsed — pass. Step 5: starts at shrug-off size, scaling rule pre-written. Verdict: runnable. Not because it's guaranteed to work — because every failure mode has been named and priced. That is the entire standard available in this domain.</p>
    <h4>Mistakes that cost real money</h4>
    <p><strong>Confusing activity with edge.</strong> Daily trading feels productive; frequency multiplies costs, not returns.</p>
    <p><strong>Silent failure tolerance.</strong> Error alerts matter more than trade alerts.</p>
    <p><strong>Scaling after a lucky month.</strong> The streak is doing your sizing. Pre-commit or it will.</p>
    <p><strong>Trusting "proprietary."</strong> Unexplainable rules + your money = someone else's strategy, your risk.</p>
    <h4>Do this now</h4>
    <p>☐ Write the rules in plain language; pass the by-hand test.<br>
    ☐ Name the kill condition and price the worst stretch at your size.<br>
    ☐ Run the three backtest interrogations.<br>
    ☐ Verify custody separation, fail-safe behavior, error alerts.<br>
    ☐ Rehearse the one-minute flatten.<br>
    ☐ Start at shrug-off size; pre-write the scaling rule; keep the log from day one.</p>` },
  { title:"Position Sizing Over Prediction", desc:"The single habit that separates durable investors from lucky ones — applied across every asset class.", minTier:3,
    body:`<h4>What this guide does</h4>
    <p>The seductive question is "will this go up?" The durable question is "how much do I commit given I might be wrong?" The second one is answerable, and this guide answers it: a written tier system with hard caps, the math that justifies it, and the rules for adding, trimming, and growing — all decided before the next exciting opportunity shows up.</p>
    <h4>The asymmetry that makes sizing everything</h4>
    <p>Being wrong about direction costs you the position. Being wrong about size costs you the portfolio. Nearly every blown-up account in history is a sizing failure wearing a prediction-failure costume — the thesis being wrong was survivable; the size made it fatal. You can't fix your hit rate much. You can fix your sizing completely, today, with a pen.</p>
    <h4>Step 1 — Learn the recovery math (memorize these)</h4>
    <p>Lose 10% → need 11% to get even. Lose 20% → need 25%. Lose 33% → need 50%. Lose 50% → need 100%. Lose 80% → need 400%.</p>
    <p>The curve is brutal and it bends fast. Sizing isn't about avoiding losses — losses are certain — it's about keeping every loss in the flat part of that curve, where recovery math stays friendly. Everything below follows from these five numbers.</p>
    <h4>Step 2 — Run the survivability test on everything you hold</h4>
    <p>For each current position ask: <em>if this went to zero tomorrow, does my life change?</em> Yes = too big, full stop, regardless of conviction. Conviction and correct sizing are independent — you can be dead right on the thesis and still ruined by the size. Flag every position that fails. Those are your action items, today, before any new ideas.</p>
    <h4>Step 3 — Write your three-tier structure</h4>
    <p>Numbers below are a workable template — adjust, but write yours down:</p>
    <p><strong>Core (60–90% of investable assets):</strong> broad, boring, diversified. No single-position cap needed because nothing in it IS a single position.<br>
    <strong>Conviction (up to ~25% total):</strong> individual positions you've researched. Cap: mid-single-digit percent EACH — say 5%.<br>
    <strong>Speculative (cap the whole sleeve at 5–10% total):</strong> anything that can genuinely go to zero — which includes most of web3. Cap: 1–2% each, AND the sleeve total. Two ceilings, both hard.</p>
    <p>On a $50,000 base: a 4% conviction position is $2,000 — a total loss stings for a week and changes nothing. A 30% position is $15,000 — a year of saving gone, and the base you'd recover from is damaged too. Same thesis, same outcome, completely different life result. That's the entire argument for tiers.</p>
    <h4>Step 4 — Size the theme, not the ticker</h4>
    <p>Five "different" positions that all live or die on the same underlying trend are ONE position wearing five names — same theme, same fate, same drawdown. Group your holdings by what actually drives them. Apply the caps to the <em>theme totals</em>. This is the clause that catches people who think they're diversified because they own many line items of the same bet.</p>
    <h4>Step 5 — Pre-write the add and trim rules</h4>
    <p><strong>Adding:</strong> under what conditions do you add to a winner, and up to what cap? Write it. "I'll know it when I see it" means the excitement will decide.<br>
    <strong>Trimming:</strong> a position that doubles has silently doubled its risk contribution. Rule template: "when any position exceeds its tier cap by half again, trim back to cap." The trim isn't lack of conviction — it's the rule doing its job.<br>
    <strong>Averaging down:</strong> allowed only within the cap. Adding to a loser until it's your biggest position converts a small mistake into a defining one. The cap is the circuit breaker.</p>
    <h4>Step 6 — Grow the rules with the account</h4>
    <p>There's an honest place for concentration: early, small accounts, where the dollars at risk are survivable and the lesson is the real return. The mistake is carrying that posture unchanged into an account whose loss now matters. Rule: whenever the account has grown materially — say by half — re-run Step 2 and re-check the tier percentages in dollars. The account grew; the sizing has to grow up with it.</p>
    <h4>Step 7 — Defend the rules from your best ideas</h4>
    <p>The moment will come: a "special situation" that obviously deserves an exception to your caps. That feeling is precisely what the caps exist to overrule — the rule written in calm surviving the moment of temptation is the whole mechanism. If an idea is truly exceptional, it will still be exceptional at cap size. Concentration builds wealth and diversification protects it; a sober allocation assumes your favorite idea is the one that fails, because someone's favorite always is.</p>
    <h4>Worked example — applying it in one sitting</h4>
    <p>$50,000 investable. Written tiers: core $37,500 (75%) · conviction sleeve $10,000 (20%, max $2,500 each) · speculative sleeve $2,500 (5%, max $1,000 each). Current holdings grouped by theme: three positions turn out to be one tech-trend bet totaling 22% — over the theme cap → trim to cap. One legacy position sits at 12% — fails survivability → staged reduction rule written. Add/trim rules on one page. Time spent: one evening. The portfolio's return didn't change today — its <em>survivability</em> did, permanently.</p>
    <h4>Mistakes that cost portfolios</h4>
    <p><strong>Sizing by dollar comfort.</strong> "$5,000 feels fine" means nothing without the base — it's 2% of one portfolio and 25% of another. Percentages only.</p>
    <p><strong>Counting correlated positions as diversification.</strong> Many tickers, one theme, one drawdown.</p>
    <p><strong>Averaging down past the cap.</strong> The most common road from small mistake to defining one.</p>
    <p><strong>Rewriting rules mid-excitement.</strong> If it needs an exception, the system is working.</p>
    <h4>Do this now</h4>
    <p>☐ Memorize the recovery-math table.<br>
    ☐ Run the survivability test on every current position; flag the fails.<br>
    ☐ Write your three tiers with per-position AND per-sleeve caps, in percentages.<br>
    ☐ Group holdings by theme; apply caps to theme totals; trim what's over.<br>
    ☐ Pre-write add, trim, and averaging-down rules on one page.<br>
    ☐ Diary a re-check for whenever the account grows by half.</p>` },
];

const TIER_NAMES = {1:"The Yield Map", 2:"The Full Ledger", 3:"The Annotated Portfolio", 4:"All-Access", 5:"Capital Systems \u2014 Foundation", 6:"Capital Systems \u2014 Operator", 7:"Capital Systems \u2014 Institutional"};

// ============ CAPITAL SYSTEMS REFERENCE WORKBOOKS (Institutional exclusive) ============
// All three tiers get the INTERACTIVE toolkits below. The downloadable Excel
// master workbooks (real files, worked example numbers) are tier-7 only,
// enforced by the storage RLS policy AND this card gate.
const CAP_SYSTEMS = [
  { key:"all", title:"Capital Systems \u2014 Reference Workbooks", minTier:7, tag:"INSTITUTIONAL EXCLUSIVE",
    desc:"The complete master set: every Capital Systems tool as a real Excel workbook with worked example numbers \u2014 Foundation, Operator, and Institutional \u2014 to confirm your own process against. Exclusive to the Institutional tier.",
    body:`<h4>What this includes</h4>
    <p>Every Capital Systems workbook and playbook as downloadable files \u2014 the master copies. Each workbook carries worked example numbers, so you can open it beside the interactive toolkits on your dashboard and confirm that your own entries and process match the intended structure.</p>
    <h4>How to use them</h4>
    <p><strong>Step 1:</strong> Download the set below into one folder you control.<br><strong>Step 2:</strong> Work in the interactive toolkits on your dashboard \u2014 they run the same math live and auto-save.<br><strong>Step 3:</strong> When you want to confirm a result, open the matching workbook and compare your numbers against the worked examples.<br><strong>Step 4:</strong> The playbooks are the map \u2014 read each tier\u2019s playbook before running its system.</p>
    <h4>Support</h4>
    <p>Questions while implementing: email dee8shops@gmail.com from your account email and reference Capital Systems \u2014 priority handling.</p>
    <h4>License</h4>
    <p>Licensed to the account shown in the watermark, for personal use. Redistribution outside your account violates the Terms of Sale.</p>` },
];

function renderCapSystems(eff, grid){
  const head=document.createElement('div'); head.style.cssText='grid-column:1/-1;margin-top:30px;';
  head.innerHTML='<div class="lib-tag">CAPITAL SYSTEMS SUITE</div>';
  grid.appendChild(head);
  CAP_SYSTEMS.forEach((cs,idx)=>{
    const unlocked=eff>=cs.minTier;
    const card=document.createElement('div');
    card.className='library-item'+(unlocked?'':' locked');
    card.innerHTML='<div class="lib-tag">'+(unlocked?'INCLUDED IN YOUR PLAN':cs.tag)+'</div><h4>'+cs.title+'</h4><p>'+cs.desc+'</p><div class="lib-action '+(unlocked?'':'locked-action')+'">'+(unlocked?'OPEN & DOWNLOAD \u2192':'\ud83d\udd12 LOCKED \u2014 SOLD SEPARATELY')+'</div>';
    if(unlocked){ card.querySelector('.lib-action').addEventListener('click',()=>openCapViewer(idx)); }
    grid.appendChild(card);
  });
}

async function openCapViewer(idx){
  const cs=CAP_SYSTEMS[idx]; if(!cs||!currentUser) return;
  const vt=document.getElementById('viewerTitle'); if(vt) vt.textContent=cs.title;
  const vl=document.getElementById('viewerLicenseEmail'); if(vl) vl.textContent=currentUser.email;
  const c=document.getElementById('viewerContent'); if(!c) return;
  c.innerHTML='';
  const body=document.createElement('div'); body.innerHTML=cs.body;
  const fh=document.createElement('h4'); fh.textContent='Your reference workbooks'; body.appendChild(fh);
  // How-to-open tip: these are real Excel workbooks. The browser's built-in
  // preview (Quick Look on iPhone/iPad) is a read-only snapshot and cannot
  // run formulas -- they must be opened in a spreadsheet app.
  const tip=document.createElement('p');
  tip.style.cssText='font-size:13px;line-height:1.65;padding:12px 14px;border:1px solid var(--gold, #c9a24b);border-radius:4px;margin:10px 0 14px;';
  tip.innerHTML='<strong>How to use the reference set:</strong> tapping a link below saves the file to your device. Open the saved .xlsx files in <strong>Numbers</strong> (free on iPhone/iPad), <strong>Excel</strong>, or <strong>Google Sheets</strong> \u2014 that\u2019s where the calculations run live. The browser\u2019s built-in preview is view-only and will not calculate. Each workbook carries worked example numbers \u2014 keep the matching one open beside the interactive toolkits to confirm your own process.';
  body.appendChild(tip);
  const box=document.createElement('div'); box.textContent='Loading your files\u2026'; body.appendChild(box);
  c.appendChild(body);
  c.appendChild(buildWatermark(currentUser.email));
  const cv=document.getElementById('contentViewer'); if(cv) cv.classList.add('show'); document.body.style.overflow='hidden';
  try{
    const sb=getSupabase(); if(!sb) throw new Error('no client');
    const SECTIONS=[{folder:'foundation',label:'FOUNDATION'},{folder:'operator',label:'OPERATOR'},{folder:'institutional',label:'INSTITUTIONAL'}];
    box.innerHTML='';
    let any=false;
    for(const sec of SECTIONS){
      // Folder lookup tolerates either capitalization (e.g. foundation / Foundation)
      const variants=[sec.folder, sec.folder.charAt(0).toUpperCase()+sec.folder.slice(1)];
      let files=[], folder=sec.folder;
      for(const v of variants){
        const {data,error}=await sb.storage.from('capital-systems').list(v,{limit:100,sortBy:{column:'name',order:'asc'}});
        if(error) continue;
        const found=(data||[]).filter(f=>f&&f.name&&!f.name.startsWith('.'));
        if(found.length){ files=found; folder=v; break; }
      }
      if(!files.length) continue;
      any=true;
      const h=document.createElement('div'); h.textContent=sec.label;
      h.style.cssText='margin:16px 0 4px;font-size:11px;letter-spacing:.12em;opacity:.75;';
      box.appendChild(h);
      for(const f of files){
        const rowEl=document.createElement('div'); rowEl.style.cssText='margin:9px 0;';
        // { download: f.name } adds ?download= to the signed URL, which makes
        // Supabase serve it with Content-Disposition: attachment -- the browser
        // SAVES the file instead of opening the read-only preview.
        const {data:s,error:e2}=await sb.storage.from('capital-systems').createSignedUrl(folder+'/'+f.name,3600,{download:f.name});
        if(e2||!s||!s.signedUrl){ rowEl.textContent=f.name+' \u2014 temporarily unavailable, email dee8shops@gmail.com'; }
        else{
          const a=document.createElement('a'); a.href=s.signedUrl; a.textContent='\u2b07 '+f.name;
          a.setAttribute('download',f.name); a.rel='noopener';
          a.style.cssText='color:var(--gold);text-decoration:underline;word-break:break-all;';
          rowEl.appendChild(a);
        }
        box.appendChild(rowEl);
      }
    }
    if(!any){ box.textContent='Your files are being provisioned for this account \u2014 check back shortly, or email dee8shops@gmail.com and we\u2019ll send them directly.'; return; }
    const note=document.createElement('p'); note.style.cssText='font-size:12px;opacity:.7;margin-top:14px;';
    note.textContent='Each link saves the file straight to your device (check your Downloads / Files app). Links are private to your account and expire after 60 minutes \u2014 reopen this card any time for fresh ones.';
    box.appendChild(note);
  }catch(err){ console.error('Cap Systems files error:',err); box.textContent='Could not load your files \u2014 refresh and try again, or email dee8shops@gmail.com.'; }
}

// ============ CAPITAL SYSTEMS — INTERACTIVE TOOLKITS (tiers 5-7) ============
// Browser versions of the Capital Systems workbooks. Same math as the Excel
// files, running live in the dashboard. Entries auto-save to this device,
// keyed to the signed-in account (localStorage).
function capKey(k){ return 'ledgerCap_'+((currentUser&&currentUser.email)||'anon')+'_'+k; }
function capLoad(k,fb){ try{ const v=localStorage.getItem(capKey(k)); return v!==null?JSON.parse(v):fb; }catch(err){ return fb; } }
function capSave(k,v){ try{ localStorage.setItem(capKey(k),JSON.stringify(v)); }catch(err){} }
function capEsc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(ch){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[ch]; }); }
function capHead(c,txt){ const h=document.createElement('h4'); h.textContent=txt; h.style.cssText='margin-top:22px;'; c.appendChild(h); return h; }
function capSaveNote(c){ const p=document.createElement('p'); p.style.cssText='font-size:11px;opacity:.6;margin-top:6px;'; p.textContent='Auto-saves to this device for your account. The Excel version (in the tier card above) is the portable copy.'; c.appendChild(p); }

// Editable, persistent row table (register / ledger pattern)
function capRows(storeKey, columns, defaults, onchange){
  let rows=capLoad(storeKey, defaults);
  const wrap=document.createElement('div');
  const list=document.createElement('div');
  wrap.appendChild(list);
  const add=document.createElement('button'); add.type='button'; add.textContent='+ ADD ROW';
  add.style.cssText='margin:8px 0 4px;padding:8px 14px;background:none;border:1px solid var(--gold, #c9a24b);border-radius:4px;color:var(--gold, #c9a24b);font-size:12px;letter-spacing:.08em;cursor:pointer;';
  add.addEventListener('click',function(){ const o={}; columns.forEach(function(cl){ o[cl.key]=cl.def!==undefined?cl.def:''; }); rows.push(o); persist(); render(); });
  wrap.appendChild(add);
  function persist(){ capSave(storeKey, rows); if(onchange) onchange(rows); }
  function render(){
    list.innerHTML='';
    const hd=document.createElement('div'); hd.style.cssText='display:flex;gap:6px;margin:8px 0 2px;';
    columns.forEach(function(cl){ const s=document.createElement('span'); s.textContent=cl.label; s.style.cssText='flex:'+(cl.flex||1)+';min-width:0;font-size:10px;letter-spacing:.06em;opacity:.7;'; hd.appendChild(s); });
    const sp=document.createElement('span'); sp.style.cssText='width:26px;flex:none;'; hd.appendChild(sp);
    list.appendChild(hd);
    rows.forEach(function(row,ri){
      const r=document.createElement('div'); r.style.cssText='display:flex;gap:6px;margin:4px 0;align-items:center;';
      columns.forEach(function(cl){
        let el;
        if(cl.type==='select'){
          el=document.createElement('select');
          (cl.options||[]).forEach(function(o){ const op=document.createElement('option'); op.value=o; op.textContent=o; el.appendChild(op); });
          el.value=row[cl.key]||cl.options[0];
        } else {
          el=document.createElement('input'); el.type='text'; if(cl.type==='num') el.inputMode='decimal';
          el.value=row[cl.key]!==undefined?row[cl.key]:''; if(cl.ph) el.placeholder=cl.ph;
        }
        el.style.cssText='flex:'+(cl.flex||1)+';min-width:0;padding:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);border-radius:4px;color:inherit;font-size:13px;';
        el.addEventListener(cl.type==='select'?'change':'input',function(){ row[cl.key]=el.value; persist(); });
        r.appendChild(el);
      });
      const del=document.createElement('button'); del.type='button'; del.textContent='\u2715';
      del.style.cssText='width:26px;flex:none;height:30px;background:none;border:none;color:inherit;opacity:.5;cursor:pointer;font-size:14px;';
      del.addEventListener('click',function(){ rows.splice(ri,1); persist(); render(); });
      r.appendChild(del);
      list.appendChild(r);
    });
  }
  render();
  wrap.__getRows=function(){ return rows; };
  return wrap;
}

// Persistent checklist (audit / disqualifier pattern). Returns wrap with __get().
function capChecklist(storeKey, items, onchange){
  let state=capLoad(storeKey, items.map(function(){ return false; }));
  if(!Array.isArray(state)||state.length!==items.length) state=items.map(function(){ return false; });
  const wrap=document.createElement('div');
  items.forEach(function(txt,i){
    const row=document.createElement('label'); row.style.cssText='display:flex;gap:10px;align-items:flex-start;margin:8px 0;font-size:13px;line-height:1.5;cursor:pointer;';
    const cb=document.createElement('input'); cb.type='checkbox'; cb.checked=!!state[i]; cb.style.cssText='margin-top:2px;flex:none;';
    cb.addEventListener('change',function(){ state[i]=cb.checked; capSave(storeKey,state); if(onchange) onchange(state); });
    const sp=document.createElement('span'); sp.textContent=txt;
    row.appendChild(cb); row.appendChild(sp); wrap.appendChild(row);
  });
  wrap.__get=function(){ return state; };
  return wrap;
}

const CAP_TOOLS = [
  { title:"Capital Allocation System \u2014 Interactive", minTier:5, tag:"FOUNDATION",
    desc:"The Foundation workbook, live: your true monthly outflow, the Buffer / Reserve / Parked bucket plan, and the account comparison that computes effective annual dollars per account \u2014 with WINNER and LOSES MONEY verdicts.",
    build:function(c){
      const ns='cs_f1_';
      function P(k,label,def){ const f=tField(label,String(capLoad(ns+k,def)),function(){ capSave(ns+k,f.__input.value); calc(); }); c.appendChild(f); return f; }
      capHead(c,'1 \u00b7 Monthly outflow \u2014 three real months of statements');
      const m1=P('m1','Month 1 total spending ($)','3400');
      const m2=P('m2','Month 2 total spending ($)','3600');
      const m3=P('m3','Month 3 total spending ($)','3500');
      const out1=tResultBox(); c.appendChild(out1);
      capHead(c,'2 \u00b7 Bucket plan');
      const tc=P('total','Total cash across all accounts ($)','22000');
      const bm=P('bm','Buffer size (months of outflow)','1');
      const rm=P('rm','Reserve size (months of outflow, 3\u20136)','4');
      const out2=tResultBox(); c.appendChild(out2);
      capHead(c,'3 \u00b7 Account comparison \u2014 current account + challengers');
      const cb=P('cmpbal','Balance to compare on ($)','14000');
      const rowsEl=capRows(ns+'accts',[
        {key:'name',label:'ACCOUNT',flex:1.5,ph:'Name'},
        {key:'apy',label:'HEADLINE %',type:'num'},
        {key:'cap',label:'CAP $ (0=NONE)',type:'num'},
        {key:'base',label:'BASE %',type:'num'},
        {key:'fee',label:'FEE $/MO',type:'num'},
        {key:'miss',label:'MISS MO/YR',type:'num'}
      ],[
        {name:'Current account',apy:'0.5',cap:'0',base:'0.5',fee:'0',miss:'0'},
        {name:'Challenger A',apy:'4.5',cap:'0',base:'0.25',fee:'0',miss:'0'}
      ],calc);
      c.appendChild(rowsEl);
      const out3=tResultBox(); c.appendChild(out3);
      capSaveNote(c); tNote(c);
      function calc(){
        const outflow=(tNum(m1.__input.value)+tNum(m2.__input.value)+tNum(m3.__input.value))/3;
        out1.innerHTML='<strong>True monthly outflow: '+tMoney(outflow)+'</strong><br>Computed from real statements \u2014 people guessing land 20\u201330% low.';
        const T=tNum(tc.__input.value), buf=outflow*tNum(bm.__input.value);
        let res=outflow*tNum(rm.__input.value), parked=T-buf-res, warn='';
        if(parked<0){ res=Math.max(0,T-buf); parked=0; warn='<br><strong>Total cash does not fully cover buffer + reserve</strong> \u2014 the reserve is only partially funded, and nothing is Parked yet.'; }
        out2.innerHTML='<strong>Buffer (stays in checking): '+tMoney(buf)+'</strong><br><strong>Reserve (insured high-yield savings): '+tMoney(res)+'</strong><br><strong>Parked (CDs / T-bills, 12+ months): '+tMoney(parked)+'</strong>'+warn;
        const B=tNum(cb.__input.value), rows=rowsEl.__getRows();
        if(B<=0||!rows.length){ out3.textContent='Enter a balance and at least one account.'; return; }
        let best=-Infinity, results=rows.map(function(r){
          const r1=tNum(r.apy)/100, capIn=tNum(r.cap), r0=tNum(r.base)/100, F=tNum(r.fee);
          let m=Math.min(12,Math.max(0,Math.round(tNum(r.miss))));
          const cap=capIn>0?Math.min(capIn,B):B;
          const good=(cap*r1+Math.max(0,B-cap)*r0)/12, missM=(B*r0)/12;
          const annual=(12-m)*good+m*missM-12*F;
          if(annual>best) best=annual;
          return {name:r.name||'(unnamed)',annual:annual};
        });
        let html='';
        results.forEach(function(x){
          let tagTxt=''; if(x.annual<0) tagTxt=' \u2014 <strong>LOSES MONEY</strong>';
          else if(x.annual===best&&results.length>1) tagTxt=' \u2014 <strong>WINNER</strong>';
          html+=capEsc(x.name)+': <strong>'+tMoney(x.annual)+'</strong>/yr'+tagTxt+'<br>';
        });
        html+='<br>Effective annual dollars on YOUR balance \u2014 the only number that decides anything. Break ties on friction and access, never basis points.';
        out3.innerHTML=html;
      }
      calc();
    } },
  { title:"Ladder Builder & Rung Ledger \u2014 Interactive", minTier:5, tag:"FOUNDATION",
    desc:"Three inputs generate your rung schedule with real maturity dates \u2014 then the Rung Ledger tracks every live instrument: blended rate computed live, next maturity, and a flag on any rung with auto-renewal still ON.",
    build:function(c){
      const ns='cs_f2_';
      function P(k,label,def){ const f=tField(label,String(capLoad(ns+k,def)),function(){ capSave(ns+k,f.__input.value); calc(); }); c.appendChild(f); return f; }
      capHead(c,'1 \u00b7 Ladder schedule');
      const fT=P('total','Total Parked capital to ladder ($)','24000');
      const fN=P('rungs','Number of rungs (2\u201312)','4');
      const fI=P('int','Interval between rungs (months)','3');
      const out1=tResultBox(); c.appendChild(out1);
      capHead(c,'2 \u00b7 Rung ledger \u2014 every live instrument, one page');
      const rowsEl=capRows(ns+'ledger',[
        {key:'inst',label:'INSTRUMENT',flex:1.5,ph:'e.g. 12-mo CD'},
        {key:'amt',label:'AMOUNT $',type:'num'},
        {key:'rate',label:'RATE %',type:'num'},
        {key:'mat',label:'MATURES',ph:'MM/DD/YYYY'},
        {key:'renew',label:'AUTO-RENEW',type:'select',options:['OFF','ON'],def:'OFF'}
      ],[],calc);
      c.appendChild(rowsEl);
      const out2=tResultBox(); c.appendChild(out2);
      capSaveNote(c); tNote(c);
      function calc(){
        const T=tNum(fT.__input.value); let N=Math.round(tNum(fN.__input.value)); let I=Math.round(tNum(fI.__input.value));
        N=Math.min(12,Math.max(2,N||4)); I=Math.max(1,I||3);
        if(T<=0){ out1.textContent='Enter an amount to build the schedule.'; }
        else{
          const per=T/N, today=new Date(); let rowsHtml='';
          for(let k=1;k<=N;k++){ const d=new Date(today); d.setMonth(d.getMonth()+k*I);
            rowsHtml+='<tr><td style="padding:4px 10px 4px 0;">Rung '+k+'</td><td style="padding:4px 10px 4px 0;">'+tMoney(per)+'</td><td style="padding:4px 0;">'+d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})+'</td></tr>'; }
          out1.innerHTML='<table style="border-collapse:collapse;font-size:13px;"><tr><td style="padding:4px 10px 4px 0;opacity:.7;">RUNG</td><td style="padding:4px 10px 4px 0;opacity:.7;">AMOUNT</td><td style="padding:4px 0;opacity:.7;">MATURES</td></tr>'+rowsHtml+'</table><br>Roll rule: at each maturity, roll into a new '+(N*I)+'-month instrument unless a planned expense falls inside the next '+I+' months. Turn auto-renewal OFF the day you open each one.';
        }
        const rows=rowsEl.__getRows();
        if(!rows.length){ out2.textContent='Add each instrument as you open it \u2014 the ledger is the audit.'; return; }
        let sum=0,wsum=0,renewOn=0,next=null;
        rows.forEach(function(r){ const a=tNum(r.amt); sum+=a; wsum+=a*tNum(r.rate);
          if((r.renew||'OFF')==='ON') renewOn++;
          const d=new Date(r.mat); if(!isNaN(d)&&d>=new Date(new Date().toDateString())&&(next===null||d<next)) next=d; });
        let html='<strong>Total on the ladder: '+tMoney(sum)+'</strong><br>Blended rate: <strong>'+(sum>0?tPct(wsum/sum):'\u2014')+'</strong>';
        if(next) html+='<br>Next maturity: <strong>'+next.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})+'</strong> \u2014 apply the roll rule that day.';
        if(renewOn>0) html+='<br><strong>\u26a0 '+renewOn+' rung'+(renewOn>1?'s have':' has')+' auto-renewal ON \u2014 turn it off.</strong> Auto-renewal is the single most common leak.';
        out2.innerHTML=html;
      }
      calc();
    } },
  { title:"Income Operations Dashboard \u2014 Interactive", minTier:6, tag:"OPERATOR",
    desc:"Every income stream on one page \u2014 expected monthly income computed live from principal and rate, blended yield across everything you own, the expected-vs-arrived gap check, and your computed review dates.",
    build:function(c){
      const ns='cs_o1_';
      function P(k,label,def){ const f=tField(label,String(capLoad(ns+k,def)),function(){ capSave(ns+k,f.__input.value); calc(); }); c.appendChild(f); return f; }
      capHead(c,'1 \u00b7 Income sources \u2014 everything that pays');
      const rowsEl=capRows(ns+'streams',[
        {key:'name',label:'STREAM',flex:1.6,ph:'e.g. HYSA, Rung 1, dividends'},
        {key:'prin',label:'PRINCIPAL $',type:'num'},
        {key:'apy',label:'RATE %',type:'num'}
      ],[],calc);
      c.appendChild(rowsEl);
      const out1=tResultBox(); c.appendChild(out1);
      capHead(c,'2 \u00b7 Income log \u2014 expected vs. arrived');
      const fArr=P('arrived','What actually arrived this month ($)','0');
      const out2=tResultBox(); c.appendChild(out2);
      capHead(c,'3 \u00b7 Review cadence \u2014 next due');
      const out3=tResultBox(); c.appendChild(out3);
      capSaveNote(c); tNote(c);
      function calc(){
        const rows=rowsEl.__getRows();
        let prin=0,inc=0,html='';
        rows.forEach(function(r){ const p=tNum(r.prin), m=p*tNum(r.apy)/100/12; prin+=p; inc+=m;
          html+=capEsc(r.name||'(unnamed)')+': <strong>'+tMoney(m)+'</strong>/mo<br>'; });
        if(!rows.length){ out1.textContent='List every stream \u2014 every account, every rung, everything that pays.'; }
        else out1.innerHTML=html+'<br><strong>Total principal: '+tMoney(prin)+'</strong><br><strong>Expected monthly income: '+tMoney(inc)+'</strong><br>Blended yield: <strong>'+(prin>0?tPct(inc*12/prin*100):'\u2014')+'</strong>';
        const arr=tNum(fArr.__input.value), gap=arr-inc;
        if(arr<=0){ out2.textContent='Log the month\u2019s income once a month. Five minutes. Non-negotiable.'; }
        else out2.innerHTML='Expected: '+tMoney(inc)+' \u00b7 Arrived: '+tMoney(arr)+'<br><strong>Gap: '+(gap>=0?'+':'')+tMoney(gap)+'</strong><br>'+(Math.abs(gap)>Math.max(5,inc*0.05)?'<strong>Investigate if this gap repeats two months running</strong> \u2014 a persistent gap is a rate that quietly changed, a condition you missed, or a stream that needs re-vetting.':'Within normal noise. Log it and move on.');
        const now=new Date();
        const nm=new Date(now.getFullYear(),now.getMonth()+1,1);
        const nq=new Date(now.getFullYear(),Math.floor(now.getMonth()/3)*3+3,1);
        const na=new Date(now.getFullYear()+1,0,1);
        function fmt(d){ return d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}); }
        out3.innerHTML='Monthly income log (5 min): <strong>'+fmt(nm)+'</strong><br>Quarterly review (20 min): <strong>'+fmt(nq)+'</strong><br>Annual full re-run (one evening): <strong>'+fmt(na)+'</strong>';
      }
      calc();
    } },
  { title:"Position Sizing & Risk Register \u2014 Interactive", minTier:6, tag:"OPERATOR",
    desc:"Your tier caps as hard dollar ceilings, the recovery curve beside them, a live position register with automatic OVER CAP flags, and the THEME CHECK that catches one bet wearing five names.",
    build:function(c){
      const ns='cs_o2_';
      function P(k,label,def){ const f=tField(label,String(capLoad(ns+k,def)),function(){ capSave(ns+k,f.__input.value); calc(); }); c.appendChild(f); return f; }
      capHead(c,'1 \u00b7 Tier caps');
      const fV=P('base','Total investable assets ($)','50000');
      const fCv=P('conv','Conviction cap per position (%)','5');
      const fSp=P('spec','Speculative cap per position (%)','2');
      const fSl=P('sleeve','Speculative sleeve cap \u2014 whole sleeve (%)','8');
      const out1=tResultBox(); c.appendChild(out1);
      capHead(c,'2 \u00b7 Position register \u2014 everything outside core');
      const rowsEl=capRows(ns+'reg',[
        {key:'name',label:'POSITION',flex:1.4,ph:'Name'},
        {key:'tier',label:'TIER',type:'select',options:['Conviction','Speculative'],def:'Conviction'},
        {key:'theme',label:'THEME',flex:1.2,ph:'What drives it'},
        {key:'val',label:'VALUE $',type:'num'}
      ],[],calc);
      c.appendChild(rowsEl);
      const out2=tResultBox(); c.appendChild(out2);
      capSaveNote(c); tNote(c);
      function calc(){
        const V=tNum(fV.__input.value), cv=tNum(fCv.__input.value)/100, sp=tNum(fSp.__input.value)/100, sl=tNum(fSl.__input.value)/100;
        const convCap=V*cv, specCap=V*sp, sleeveCap=V*sl;
        out1.innerHTML='<strong>Conviction: max '+tMoney(convCap)+' per position</strong><br><strong>Speculative: max '+tMoney(specCap)+' per position \u00b7 '+tMoney(sleeveCap)+' whole sleeve</strong><br>Recovery curve: \u221210% needs +11% \u00b7 \u221220% needs +25% \u00b7 \u221250% needs +100% \u00b7 \u221280% needs +400%. Sizing keeps every loss on the flat part.';
        const rows=rowsEl.__getRows();
        if(!rows.length){ out2.textContent='Register every position outside your core holdings.'; return; }
        let html='',specTotal=0,themes={};
        rows.forEach(function(r){
          const v=tNum(r.val), capD=(r.tier==='Speculative')?specCap:convCap;
          if(r.tier==='Speculative') specTotal+=v;
          const th=(r.theme||'').trim(); if(th){ themes[th]=(themes[th]||0)+v; }
          html+=capEsc(r.name||'(unnamed)')+' ('+capEsc(r.tier||'Conviction')+'): '+tMoney(v)+(v>capD?' \u2014 <strong>OVER CAP \u2014 TRIM '+tMoney(v-capD)+'</strong>':' \u2014 within cap')+'<br>';
        });
        html+='<br>Speculative sleeve total: <strong>'+tMoney(specTotal)+'</strong>'+(specTotal>sleeveCap?' \u2014 <strong>OVER SLEEVE CAP by '+tMoney(specTotal-sleeveCap)+'</strong>':' (cap '+tMoney(sleeveCap)+')');
        let themeHtml='';
        Object.keys(themes).forEach(function(t){ if(themes[t]>convCap) themeHtml+='<br><strong>\u26a0 THEME "'+capEsc(t)+'" totals '+tMoney(themes[t])+'</strong> \u2014 over your per-position cap. One bet, many names: treat it as a single position and trim.'; });
        if(themeHtml) html+='<br>'+themeHtml;
        html+='<br><br>The trim is the rule working, not conviction failing. Clear every flag this week, while it\u2019s fresh.';
        out2.innerHTML=html;
      }
      calc();
    } },
  { title:"Capital Operating System \u2014 Interactive", minTier:7, tag:"INSTITUTIONAL",
    desc:"Your written allocation policy, live: targets and bands per asset class, drift computed from current values, REBALANCE flags with exact dollars to move \u2014 plus the eight-line quarterly audit.",
    build:function(c){
      const ns='cs_i1_';
      capHead(c,'1 \u00b7 Allocation policy \u2014 targets, bands, current values');
      const rowsEl=capRows(ns+'policy',[
        {key:'cls',label:'ASSET CLASS',flex:1.4,ph:'e.g. Core equity'},
        {key:'target',label:'TARGET %',type:'num'},
        {key:'band',label:'BAND \u00b1%',type:'num'},
        {key:'val',label:'CURRENT $',type:'num'}
      ],[
        {cls:'Cash & ladder',target:'20',band:'4',val:''},
        {cls:'Core equity',target:'65',band:'6',val:''},
        {cls:'Conviction',target:'10',band:'5',val:''},
        {cls:'Speculative',target:'5',band:'2',val:''}
      ],calc);
      c.appendChild(rowsEl);
      const out1=tResultBox(); c.appendChild(out1);
      capHead(c,'2 \u00b7 Quarterly audit \u2014 the whole stack, one sitting');
      const audit=capChecklist(ns+'audit',[
        'Account map refreshed from live balances \u2014 every institution, account, and wallet',
        'Policy drift checked; anything flagged REBALANCE executed all the way back to target',
        'Ladder maturities handled per the roll rule; auto-renew confirmed OFF on every rung',
        'Income gaps from the log investigated',
        'Position register clear of OVER CAP flags; themes re-checked',
        'Account conditions still being met (or account re-priced at base rate)',
        'Stale token approvals revoked',
        'One thing that surprised you \u2014 written down in one sentence'
      ],calc);
      c.appendChild(audit);
      const fSurprise=tField('The one sentence that surprised you',String(capLoad(ns+'surprise','')),function(){ capSave(ns+'surprise',fSurprise.__input.value); });
      c.appendChild(fSurprise);
      const out2=tResultBox(); c.appendChild(out2);
      capSaveNote(c); tNote(c);
      function calc(){
        const rows=rowsEl.__getRows();
        let tSum=0,total=0;
        rows.forEach(function(r){ tSum+=tNum(r.target); total+=tNum(r.val); });
        let html='Targets sum to <strong>'+tPct(tSum)+'</strong>'+(Math.round(tSum)!==100?' \u2014 <strong>policy must sum to 100%</strong>':' \u2713')+'<br>Total portfolio: <strong>'+tMoney(total)+'</strong><br><br>';
        if(total>0){
          rows.forEach(function(r){
            const v=tNum(r.val), tgt=tNum(r.target), band=tNum(r.band);
            const cur=v/total*100, drift=cur-tgt, move=(tgt/100*total)-v;
            html+=capEsc(r.cls||'(class)')+': '+tPct(cur)+' (target '+tPct(tgt)+', band \u00b1'+tPct(band)+') \u2014 ';
            if(Math.abs(drift)>band) html+='<strong>REBALANCE: '+(move>0?'add ':'trim ')+tMoney(Math.abs(move))+'</strong> back to target<br>';
            else html+='within band, do nothing<br>';
          });
          html+='<br>Between band breaches you do nothing \u2014 that is a feature. Breach = trim or top up all the way back to target: buying low and selling high with zero forecasting.';
        } else html+='Enter current values to compute drift.';
        out1.innerHTML=html;
        const done=audit.__get().filter(Boolean).length;
        out2.innerHTML='Audit progress: <strong>'+done+' / 8</strong>'+(done===8?' \u2014 <strong>audit complete.</strong> Date it, and reset the boxes at the start of next quarter.':' \u2014 eight lines, four times a year. An audit that is not scheduled is an audit that does not happen.');
      }
      calc();
    } },
  { title:"Due-Diligence Scorecard \u2014 Interactive", minTier:7, tag:"INSTITUTIONAL",
    desc:"The repeatable machine for anything new that asks for your money: five automatic disqualifiers, six weighted categories scored 0\u20132, a computed verdict, and the mandatory sizing gate on any PROCEED.",
    build:function(c){
      const ns='cs_i2_';
      const fName=tField('Opportunity being evaluated',String(capLoad(ns+'name','')),function(){ capSave(ns+'name',fName.__input.value); calc(); });
      c.appendChild(fName);
      capHead(c,'1 \u00b7 Disqualifiers \u2014 any one ends it');
      const dq=capChecklist(ns+'dq',[
        'Guaranteed or fixed returns promised',
        'Anonymous team with no track record',
        'Urgency pressure \u2014 "migrate now," countdown timers',
        'Yield far beyond what its claimed source could generate',
        'Referral rewards as the main growth engine'
      ],calc);
      c.appendChild(dq);
      capHead(c,'2 \u00b7 The six categories \u2014 score 0 (fail) / 1 (partial) / 2 (pass)');
      const CATS=[
        {k:'custody',w:25,label:'Custody \u2014 would the money survive the operator vanishing tonight?'},
        {k:'yield',w:20,label:'Yield source \u2014 a plain sentence names who pays and why'},
        {k:'audit',w:15,label:'Audit \u2014 recent, reputable, on the live contract, criticals fixed'},
        {k:'exit',w:15,label:'Exit \u2014 tested small round trip; stress behavior bounded'},
        {k:'admin',w:15,label:'Admin key \u2014 no single anonymous key controls the code'},
        {k:'team',w:10,label:'Team & treasury \u2014 identifiable team; treasury in hard assets'}
      ];
      let scores=capLoad(ns+'scores',{});
      CATS.forEach(function(cat){
        const row=document.createElement('div'); row.style.cssText='display:flex;gap:10px;align-items:center;margin:8px 0;';
        const sel=document.createElement('select');
        ['0','1','2'].forEach(function(o){ const op=document.createElement('option'); op.value=o; op.textContent=o; sel.appendChild(op); });
        sel.value=scores[cat.k]!==undefined?String(scores[cat.k]):'0';
        sel.style.cssText='flex:none;width:54px;padding:8px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);border-radius:4px;color:inherit;font-size:13px;';
        sel.addEventListener('change',function(){ scores[cat.k]=parseInt(sel.value,10); capSave(ns+'scores',scores); calc(); });
        const sp=document.createElement('span'); sp.textContent=cat.label+' (weight '+cat.w+')'; sp.style.cssText='font-size:13px;line-height:1.5;';
        row.appendChild(sel); row.appendChild(sp); c.appendChild(row);
      });
      const out=tResultBox(); c.appendChild(out);
      capSaveNote(c);
      const arch=document.createElement('p'); arch.style.cssText='font-size:11px;opacity:.6;margin-top:6px;';
      arch.textContent='One live evaluation at a time here. For the archive of past evaluations \u2014 your casebook \u2014 duplicate tabs in the Excel scorecard.';
      c.appendChild(arch); tNote(c);
      function calc(){
        const anyDQ=dq.__get().some(Boolean);
        let score=0; CATS.forEach(function(cat){ score+=((scores[cat.k]||0)/2)*cat.w; });
        const nm=fName.__input.value?('<strong>'+capEsc(fName.__input.value)+'</strong><br>'):'';
        if(anyDQ){ out.innerHTML=nm+'<strong>VERDICT: REJECT.</strong> A disqualifier is present \u2014 the pattern is the verdict, no matter how the rest scored.'; return; }
        let verdict;
        if(score>=70) verdict='<strong>VERDICT: PROCEED \u2014 with the mandatory sizing gate.</strong> PROCEED never means safe; it means understood. The position enters at your speculative per-position cap or below. Diligence lowers the odds of failure; sizing is the only thing that caps the cost of it.';
        else if(score>=50) verdict='<strong>VERDICT: CAUTION.</strong> Too many partial scores. Resolve the weak categories to a clear pass or walk away \u2014 "probably fine" is not a category.';
        else verdict='<strong>VERDICT: REJECT on score.</strong> The weak categories are exactly where the bodies are buried.';
        out.innerHTML=nm+'Weighted score: <strong>'+Math.round(score)+' / 100</strong><br><br>'+verdict;
      }
      calc();
    } },
];

function renderCapTools(eff, grid){
  const head=document.createElement('div'); head.style.cssText='grid-column:1/-1;margin-top:30px;';
  head.innerHTML='<div class="lib-tag">CAPITAL SYSTEMS \u2014 INTERACTIVE TOOLKITS</div>';
  grid.appendChild(head);
  CAP_TOOLS.forEach(function(t,idx){
    const unlocked=eff>=t.minTier;
    const card=document.createElement('div');
    card.className='library-item'+(unlocked?'':' locked');
    card.innerHTML='<div class="lib-tag">'+(unlocked?'INCLUDED IN YOUR PLAN':'REQUIRES '+(TIER_NAMES[t.minTier]||'').toUpperCase())+'</div><h4>'+t.title+'</h4><p>'+t.desc+'</p><div class="lib-action '+(unlocked?'':'locked-action')+'">'+(unlocked?'OPEN TOOL \u2192':'\ud83d\udd12 LOCKED \u2014 SOLD SEPARATELY')+'</div>';
    if(unlocked){ card.querySelector('.lib-action').addEventListener('click',function(){ openCapTool(idx); }); }
    grid.appendChild(card);
  });
}

function openCapTool(idx){
  const t=CAP_TOOLS[idx]; if(!t||!currentUser) return;
  const vt=document.getElementById('viewerTitle'); if(vt) vt.textContent=t.title;
  const vl=document.getElementById('viewerLicenseEmail'); if(vl) vl.textContent=currentUser.email;
  const c=document.getElementById('viewerContent'); if(!c) return;
  c.innerHTML='';
  const box=document.createElement('div');
  // Reference-copy note: the master Excel workbooks (worked example numbers)
  // are an Institutional exclusive — link them for tier 7, upsell otherwise.
  const __tiers=(currentSubscription||[]).map(function(r){ return r.tier; });
  const __eff=__tiers.length?Math.max.apply(null,__tiers):0;
  const wbName=(t.minTier===7?'Institutional':(t.minTier===6?'Operator':'Foundation'));
  const ref=document.createElement('p');
  ref.style.cssText='font-size:13px;line-height:1.65;padding:12px 14px;border:1px solid var(--gold, #c9a24b);border-radius:4px;margin:0 0 6px;';
  if(__eff>=7){
    ref.innerHTML='<strong>Reference copy:</strong> the '+wbName+' master workbook \u2014 a real Excel file with worked example numbers \u2014 is in your Reference Workbooks card. Keep it open beside this tool to confirm your own process. ';
    const refLink=document.createElement('a'); refLink.href='#'; refLink.textContent='Open the reference workbooks \u2192';
    refLink.style.cssText='color:var(--gold);text-decoration:underline;';
    refLink.addEventListener('click',function(e){ e.preventDefault(); openCapViewer(0); });
    ref.appendChild(refLink);
  } else {
    ref.innerHTML='<strong>Institutional exclusive:</strong> the Institutional tier adds the master Excel workbooks \u2014 every Capital Systems tool as a real file with worked example numbers \u2014 so you can confirm your own process against the reference set.';
  }
  box.appendChild(ref);
  try{ t.build(box); }catch(err){ console.error('Cap tool error:',err); box.textContent='This tool hit an error \u2014 refresh and try again.'; }
  c.appendChild(box);
  c.appendChild(buildWatermark(currentUser.email));
  const cv=document.getElementById('contentViewer'); if(cv) cv.classList.add('show'); document.body.style.overflow='hidden';
}

// ============ INTERACTIVE TOOLS (calculators, tier-gated) ============
function tNum(v){ const n=parseFloat(String(v).replace(/[,$%\s]/g,'')); return isNaN(n)?0:n; }
function tMoney(n){ const neg=n<0; const a=Math.abs(n); const s='$'+a.toLocaleString(undefined,{minimumFractionDigits:0,maximumFractionDigits:(a<100?2:0)}); return neg?'-'+s:s; }
function tPct(n){ return (Math.round(n*100)/100).toLocaleString(undefined,{maximumFractionDigits:2})+'%'; }
function tField(labelText, initial, oninput){
  const wrap=document.createElement('div'); wrap.style.cssText='margin:10px 0;';
  const lab=document.createElement('label'); lab.textContent=labelText; lab.style.cssText='display:block;font-size:12px;letter-spacing:.05em;opacity:.85;margin-bottom:4px;';
  const inp=document.createElement('input'); inp.type='text'; inp.inputMode='decimal'; inp.value=initial;
  inp.style.cssText='width:100%;max-width:260px;padding:10px 12px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.25);border-radius:4px;color:inherit;font-size:15px;';
  inp.addEventListener('input',oninput);
  wrap.appendChild(lab); wrap.appendChild(inp); wrap.__input=inp;
  return wrap;
}
function tResultBox(){ const r=document.createElement('div'); r.style.cssText='margin-top:16px;padding:14px 16px;border:1px solid var(--gold, #c9a24b);border-radius:4px;line-height:1.7;font-size:14px;'; return r; }
function tNote(container){ const p=document.createElement('p'); p.style.cssText='font-size:11px;opacity:.6;margin-top:14px;'; p.textContent='Educational tool for your own math — not financial advice. Verify rates and terms with the institution before acting.'; container.appendChild(p); }

const TOOLS = [
  { title:"Effective Yield Calculator", minTier:1,
    desc:"Paste in any account's terms and see the rate you'd ACTUALLY earn — after the cap, the fee, and the months you'd miss conditions. It will flat-out tell you when an account loses you money.",
    build:function(c){
      const fB=tField('Your balance ($)','12000',calc);
      const fR1=tField('Advertised APY (%)','4.5',calc);
      const fCap=tField('Balance cap the good rate applies to ($, 0 = no cap)','0',calc);
      const fR0=tField('Base APY above the cap / when conditions missed (%)','0.25',calc);
      const fFee=tField('Monthly fee ($)','0',calc);
      const fM=tField('Months per year you would realistically miss the conditions (0-12)','0',calc);
      const out=tResultBox();
      [fB,fR1,fCap,fR0,fFee,fM].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const B=tNum(fB.__input.value), r1=tNum(fR1.__input.value)/100, capIn=tNum(fCap.__input.value), r0=tNum(fR0.__input.value)/100, F=tNum(fFee.__input.value); let m=Math.min(12,Math.max(0,Math.round(tNum(fM.__input.value))));
        if(B<=0){ out.textContent='Enter a balance to see your numbers.'; return; }
        const cap=capIn>0?Math.min(capIn,B):B;
        const goodMonthly=(cap*r1+Math.max(0,B-cap)*r0)/12;
        const missMonthly=(B*r0)/12;
        const annual=(12-m)*goodMonthly+m*missMonthly-12*F;
        const eff=annual/B*100;
        out.innerHTML='<strong>Effective annual interest to you: '+tMoney(annual)+'</strong><br>Effective rate on your full balance: <strong>'+tPct(eff)+'</strong><br>Headline rate: '+tPct(r1*100)+' — the gap is the cap, the fee, and the missed months.'+(annual<0?'<br><strong>This account LOSES you money at these settings.</strong>':'');
      }
      calc();
    } },
  { title:"Savings Growth Calculator", minTier:1,
    desc:"Where your starting balance plus a monthly habit lands in 1, 5, or 10 years — and exactly how much of it is interest doing the work.",
    build:function(c){
      const fP=tField('Starting balance ($)','5000',calc);
      const fA=tField('Monthly addition ($)','200',calc);
      const fR=tField('APY (%)','4.0',calc);
      const fY=tField('Years','5',calc);
      const out=tResultBox();
      [fP,fA,fR,fY].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const P=tNum(fP.__input.value), A=tNum(fA.__input.value), r=tNum(fR.__input.value)/100, y=Math.max(0,tNum(fY.__input.value));
        const i=r/12, n=Math.round(y*12);
        const fv= i>0 ? P*Math.pow(1+i,n)+A*((Math.pow(1+i,n)-1)/i) : P+A*n;
        const contributed=P+A*n;
        out.innerHTML='<strong>Balance after '+y+' year'+(y===1?'':'s')+': '+tMoney(fv)+'</strong><br>You put in: '+tMoney(contributed)+'<br>Interest earned: <strong>'+tMoney(fv-contributed)+'</strong>';
      }
      calc();
    } },
  { title:"Switch-or-Stay Analyzer", minTier:1,
    desc:"Your current account vs. a candidate, head to head: dollars gained per year and over 5 years — and it will honestly tell you when a switch is NOT worth the friction.",
    build:function(c){
      const fB=tField('Your balance ($)','15000',calc);
      const fA=tField('Current account APY (%)','0.5',calc);
      const fC=tField('Candidate account APY (%)','4.0',calc);
      const fF=tField('Candidate monthly fee ($)','0',calc);
      const out=tResultBox();
      [fB,fA,fC,fF].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const B=tNum(fB.__input.value), a=tNum(fA.__input.value)/100, cr=tNum(fC.__input.value)/100, F=tNum(fF.__input.value);
        if(B<=0){ out.textContent='Enter your balance.'; return; }
        const gain1=B*(cr-a)-12*F;
        const fv=(r)=>B*Math.pow(1+r/12,60);
        const gain5=(fv(cr)-60*F)-fv(a);
        const worth=gain1>=25;
        out.innerHTML='<strong>Year one: '+(gain1>=0?'+':'')+tMoney(gain1)+'</strong> by switching<br>Over 5 years (compounded): <strong>'+(gain5>=0?'+':'')+tMoney(gain5)+'</strong><br>'+(worth?'<strong>Verdict: worth the switch.</strong> That is real money for one afternoon of paperwork.':'<strong>Verdict: not worth the friction.</strong> Under roughly $25/yr of gain, staying put is the disciplined move — do not churn accounts for basis points.');
      }
      calc();
    } },
  { title:"Fee Break-Even Calculator", minTier:1,
    desc:"Enter any account's monthly fee and see the balance you'd need just to break even — and what the fee really costs YOU per year. A $10 fee needs $120/year of interest before you earn a cent.",
    build:function(c){
      const fB=tField('Your balance ($)','4000',calc);
      const fR=tField('Account APY (%)','1.0',calc);
      const fF=tField('Monthly fee ($)','10',calc);
      const out=tResultBox();
      [fB,fR,fF].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const B=tNum(fB.__input.value), r=tNum(fR.__input.value)/100, F=tNum(fF.__input.value);
        if(B<=0){ out.textContent='Enter a balance.'; return; }
        const interest=B*r, fees=12*F, net=interest-fees;
        const be= r>0 ? (12*F)/r : 0;
        out.innerHTML='Interest at your balance: <strong>'+tMoney(interest)+'</strong>/yr<br>Fees: <strong>'+tMoney(fees)+'</strong>/yr<br><strong>Net to you: '+(net>=0?'+':'')+tMoney(net)+'/yr</strong><br><br>Break-even balance for this fee at this rate: <strong>'+(r>0?tMoney(be):'\u2014 no rate can outrun the fee')+'</strong>'+(net<0?'<br><strong>This account is a guaranteed loss wearing an APY badge. Move.</strong>':'<br>Above break-even \u2014 but a no-fee account keeps the whole '+tMoney(interest)+'.');
      }
      calc();
    } },
  { title:"Promo Cliff Analyzer", minTier:1,
    desc:"A teaser rate for a few months, then the cliff. See your true 12-month blended rate and dollars — versus a boring no-promo account — before the marketing decides for you.",
    build:function(c){
      const fB=tField('Your balance ($)','15000',calc);
      const fP=tField('Promo APY (%)','5.5',calc);
      const fM=tField('Promo length (months)','4',calc);
      const fRv=tField('Reversion APY after the promo (%)','0.6',calc);
      const fPl=tField('Plain no-promo account APY (%)','4.0',calc);
      const out=tResultBox();
      [fB,fP,fM,fRv,fPl].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const B=tNum(fB.__input.value), rp=tNum(fP.__input.value)/100, rv=tNum(fRv.__input.value)/100, rc=tNum(fPl.__input.value)/100;
        let m=Math.min(12,Math.max(0,Math.round(tNum(fM.__input.value))));
        if(B<=0){ out.textContent='Enter a balance.'; return; }
        const promoDollars=B*(m*rp+(12-m)*rv)/12, plainDollars=B*rc;
        const blended=promoDollars/B*100;
        out.innerHTML='Promo account, true 12-month blend: <strong>'+tPct(blended)+'</strong> = <strong>'+tMoney(promoDollars)+'</strong>/yr<br>Plain account: <strong>'+tPct(rc*100)+'</strong> = <strong>'+tMoney(plainDollars)+'</strong>/yr<br><br>'+(plainDollars>=promoDollars?'<strong>The boring account wins.</strong> That inversion is the most common outcome of honest math \u2014 which is exactly why the marketing works on people who skip it.':'<strong>The promo wins by '+tMoney(promoDollars-plainDollars)+'</strong> \u2014 but ONLY if you actually move the money on expiry day. Diary the date the same minute you open the account, or the reversion rate becomes your rate for years.');
      }
      calc();
    } },
  { title:"Outflow Reality Check", minTier:1,
    desc:"Everyone guesses their monthly spending low by 20–30%. Enter your guess, then three real months of statements — and see the gap that has been quietly mis-sizing every other financial decision.",
    build:function(c){
      const fG=tField('Your guess: monthly spending ($)','2800',calc);
      const f1=tField('Month 1 actual total ($)','3400',calc);
      const f2=tField('Month 2 actual total ($)','3600',calc);
      const f3=tField('Month 3 actual total ($)','3500',calc);
      const out=tResultBox();
      [fG,f1,f2,f3].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const g=tNum(fG.__input.value), real=(tNum(f1.__input.value)+tNum(f2.__input.value)+tNum(f3.__input.value))/3;
        if(real<=0){ out.textContent='Enter three months from real statements.'; return; }
        const gap=real-g, pct=g>0?gap/g*100:0;
        out.innerHTML='<strong>Real monthly outflow: '+tMoney(real)+'</strong><br>Your guess: '+tMoney(g)+'<br><strong>Gap: '+(gap>=0?'+':'')+tMoney(gap)+(g>0?' ('+(pct>=0?'+':'')+tPct(pct)+')':'')+'</strong><br><br>'+(gap>Math.max(0,g*0.05)?'Right in the classic under-guess zone. Every buffer, reserve, and emergency-fund number built on the guess was undersized by the same amount \u2014 re-run them on the real figure.':'Tight guess \u2014 rare. Your bucket sizing can be trusted as-is.');
      }
      calc();
    } },
  { title:"Honest APY Decomposer", minTier:2,
    desc:"Strips the token-incentive confetti out of any advertised crypto yield and shows the number you'd actually bank — often a quarter of the billboard figure. Run it BEFORE you deposit.",
    build:function(c){
      const fA=tField('Advertised APY (%)','24',calc);
      const fS=tField('Share of that yield paid in the protocol\u2019s own token (%)','75',calc);
      const fH=tField('Haircut you apply to token value \u2014 dilution/sell pressure (%)','60',calc);
      const fP=tField('Position size ($)','2000',calc);
      const out=tResultBox();
      [fA,fS,fH,fP].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const A=tNum(fA.__input.value)/100, s=Math.min(1,tNum(fS.__input.value)/100), h=Math.min(1,tNum(fH.__input.value)/100), P=tNum(fP.__input.value);
        const honest=A*(1-s)+A*s*(1-h);
        out.innerHTML='<strong>Honest APY: '+tPct(honest*100)+'</strong> (advertised '+tPct(A*100)+')<br>Honest annual dollars on '+tMoney(P)+': <strong>'+tMoney(P*honest)+'</strong><br>Now ask: is that dollar figure worth the tail risk? If it\u2019s dinner money, size it like entertainment \u2014 or skip it.';
      }
      calc();
    } },
  { title:"Risk-Sized Exposure Calculator", minTier:2,
    desc:"Turns your assets into hard dollar ceilings for speculative bets — sized so a total loss stings for a week and changes nothing. The recovery math is printed right in the result.",
    build:function(c){
      const fV=tField('Total investable assets ($)','50000',calc);
      const fS=tField('Speculative sleeve cap (% of assets)','5',calc);
      const fP=tField('Per-position cap (% of assets)','1.5',calc);
      const out=tResultBox();
      [fV,fS,fP].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const V=tNum(fV.__input.value), s=tNum(fS.__input.value)/100, p=tNum(fP.__input.value)/100;
        const L=p; const rec= L<1 ? (L/(1-L))*100 : 0;
        out.innerHTML='<strong>Max speculative sleeve: '+tMoney(V*s)+'</strong> total, across everything that can go to zero<br><strong>Max per position: '+tMoney(V*p)+'</strong><br>If one position zeroes: you lose '+tPct(p*100)+' of assets and need '+tPct(rec)+' back to break even \u2014 the flat part of the recovery curve.<br>Positions on the same theme count as ONE position against these caps.';
      }
      calc();
    } },
  { title:"Break-Even Risk Calculator", minTier:2,
    desc:"The question nobody runs: at this yield, how likely does TOTAL LOSS have to be before the bet is a loser? Computes the break-even and the expected dollars at your own risk estimate.",
    build:function(c){
      const fY=tField('Honest APY after incentives (%)','9',calc);
      const fP=tField('Position size ($)','2000',calc);
      const fR=tField('Your estimate: chance of total loss within a year (%)','5',calc);
      const out=tResultBox();
      [fY,fP,fR].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const y=tNum(fY.__input.value)/100, P=tNum(fP.__input.value); let p=Math.min(99.9,Math.max(0,tNum(fR.__input.value)))/100;
        if(P<=0){ out.textContent='Enter a position size.'; return; }
        const breakeven=y/(1+y);
        const ev=P*y*(1-p)-P*p;
        out.innerHTML='<strong>Break-even risk: '+tPct(breakeven*100)+'</strong> — if the chance of losing everything in a year is above this, the yield is a losing bet before it starts.<br><br>At YOUR estimate ('+tPct(p*100)+'), expected outcome on '+tMoney(P)+': <strong>'+(ev>=0?'+':'')+tMoney(ev)+'</strong> per year.'+(ev<0?'<br><strong>Negative expectancy — the honest answer is walk.</strong>':'<br>Positive — but only as reliable as your risk estimate. Size it so zero changes nothing.');
      }
      calc();
    } },
  { title:"Yield Reality Check", minTier:2,
    desc:"Any advertised crypto yield next to a boring insured benchmark: the multiple, and what that gap is really telling you. Every real yield source has a ceiling — this shows when a number has blown past its own.",
    build:function(c){
      const fA=tField('Advertised yield (%)','18',calc);
      const fB=tField('Boring insured benchmark (%)','4.0',calc);
      const out=tResultBox();
      [fA,fB].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const a=tNum(fA.__input.value), b=tNum(fB.__input.value);
        if(b<=0){ out.textContent='Enter a benchmark above zero.'; return; }
        const x=a/b;
        let read;
        if(x<1.5) read='Modest premium over insured. The remaining question is only custody and exit \u2014 run the due-diligence checklist.';
        else if(x<3) read='<strong>Elevated.</strong> The gap is compensation for a risk you have not found yet. Find it before it finds you \u2014 name the payer in one plain sentence.';
        else if(x<10) read='<strong>The gap IS the risk.</strong> Real sources have ceilings \u2014 staking is bounded by issuance, fees by volume, lending by what solvent borrowers pay. Something you were not told is filling this: emissions that dilute you, leverage, or the next depositor.';
        else read='<strong>Near-certain that no real source generates this.</strong> Hard stop \u2014 and remember the disqualifier: guaranteed anything ends the evaluation on its own.';
        out.innerHTML='This yield is <strong>'+(Math.round(x*10)/10)+'\u00d7</strong> the boring insured rate.<br><br>'+read;
      }
      calc();
    } },
  { title:"Custody Exposure Sizer", minTier:2,
    desc:"A custodial balance is a loan to a company. Enter what's sitting on platforms versus your total assets and get the honest read: could you afford it frozen for a year and possibly gone?",
    build:function(c){
      const fC=tField('Total balances held ON platforms/exchanges ($)','6000',calc);
      const fV=tField('Total investable assets ($)','50000',calc);
      const fM=tField('Max you would accept losing to a platform failure (% of assets)','2',calc);
      const out=tResultBox();
      [fC,fV,fM].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const cst=tNum(fC.__input.value), V=tNum(fV.__input.value), mp=tNum(fM.__input.value)/100;
        if(V<=0){ out.textContent='Enter your total assets.'; return; }
        const pct=cst/V*100, cap=V*mp, over=cst-cap;
        out.innerHTML='Custodial exposure: <strong>'+tPct(pct)+'</strong> of assets ('+tMoney(cst)+')<br>Your stated ceiling: '+tMoney(cap)+'<br><br>'+(over>0?'<strong>Over by '+tMoney(over)+'.</strong> Withdraw down to the ceiling \u2014 the dashboard number is an IOU until it is in your custody. Big brands do not exempt you; the largest failures were, at the time, the most trusted names in the space.':'<strong>Within your ceiling.</strong> Keep sizing it like a loan \u2014 because that is what it is.');
      }
      calc();
    } },
  { title:"Round-Trip Cost Calculator", minTier:2,
    desc:"Entry fees, exit fees, and network costs against the honest yield: how many months you must stay in before the position even pays for its own plumbing.",
    build:function(c){
      const fP=tField('Position size ($)','2000',calc);
      const fE=tField('Entry cost (%)','0.5',calc);
      const fX=tField('Exit cost (%)','0.5',calc);
      const fG=tField('Fixed network/transaction costs, round trip ($)','15',calc);
      const fY=tField('Honest APY after incentives (%)','9',calc);
      const out=tResultBox();
      [fP,fE,fX,fG,fY].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const P=tNum(fP.__input.value), e=tNum(fE.__input.value)/100, x=tNum(fX.__input.value)/100, g=tNum(fG.__input.value), y=tNum(fY.__input.value)/100;
        if(P<=0){ out.textContent='Enter a position size.'; return; }
        const cost=P*(e+x)+g, monthly=P*y/12;
        if(monthly<=0){ out.innerHTML='Round-trip cost: <strong>'+tMoney(cost)+'</strong> \u2014 and at zero honest yield it is never recovered.'; return; }
        const months=cost/monthly;
        out.innerHTML='Round-trip cost: <strong>'+tMoney(cost)+'</strong> ('+tPct(cost/P*100)+' of the position)<br>Honest yield: '+tMoney(monthly)+'/month<br><br><strong>Break-even on the plumbing alone: '+(Math.round(months*10)/10)+' months.</strong><br>'+(months>12?'<strong>Over a year just to pay for entry and exit</strong> \u2014 at this size, the position works for the fee-takers before it works for you. Bigger size or better venue, or skip.':months>3?'Meaningful drag \u2014 any exit inside '+Math.ceil(months)+' months is a guaranteed loss on costs alone. Factor that into your exit triggers.':'Costs are a minor drag at this size. Proceed to the real diligence.');
      }
      calc();
    } },
  { title:"Ladder Builder", minTier:3,
    desc:"Three inputs become your actual ladder: rung amounts, real maturity dates, the roll rule, and the steady state where ALL your money earns long rates with access every interval.",
    build:function(c){
      const fT=tField('Total to ladder ($)','24000',calc);
      const fN=tField('Number of rungs (2-12)','4',calc);
      const fI=tField('Interval between rungs (months)','3',calc);
      const out=tResultBox();
      [fT,fN,fI].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const T=tNum(fT.__input.value); let N=Math.round(tNum(fN.__input.value)); let I=Math.round(tNum(fI.__input.value));
        N=Math.min(12,Math.max(2,N||4)); I=Math.max(1,I||3);
        if(T<=0){ out.textContent='Enter an amount to build the ladder.'; return; }
        const per=T/N; const today=new Date(); let rows='';
        for(let k=1;k<=N;k++){
          const d=new Date(today); d.setMonth(d.getMonth()+k*I);
          rows+='<tr><td style="padding:4px 10px 4px 0;">Rung '+k+'</td><td style="padding:4px 10px 4px 0;">'+tMoney(per)+'</td><td style="padding:4px 0;">'+d.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})+'</td></tr>';
        }
        out.innerHTML='<table style="border-collapse:collapse;font-size:13px;"><tr><td style="padding:4px 10px 4px 0;opacity:.7;">RUNG</td><td style="padding:4px 10px 4px 0;opacity:.7;">AMOUNT</td><td style="padding:4px 0;opacity:.7;">MATURES</td></tr>'+rows+'</table><br>Rule at each maturity: roll into a new '+(N*I)+'-month instrument unless a planned expense falls inside the next '+I+' months.<br><strong>Steady state after one cycle:</strong> every dollar earns '+(N*I)+'-month rates with access to '+tMoney(per)+' every '+I+' months. Turn OFF auto-renewal on every rung.';
      }
      calc();
    } },
  { title:"Position Size & Recovery Calculator", minTier:3,
    desc:"Your three-tier position caps in real dollars, plus the loss-to-recovery curve (−50% needs +100% back) that makes the case for every one of them.",
    build:function(c){
      const fV=tField('Total investable assets ($)','50000',calc);
      const fCv=tField('Conviction cap per position (%)','5',calc);
      const fSp=tField('Speculative cap per position (%)','2',calc);
      const fL=tField('Test a loss: position falls by (%)','50',calc);
      const out=tResultBox();
      [fV,fCv,fSp,fL].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const V=tNum(fV.__input.value), cv=tNum(fCv.__input.value)/100, sp=tNum(fSp.__input.value)/100; let L=Math.min(99.9,Math.max(0,tNum(fL.__input.value)))/100;
        const rec=L<1?(L/(1-L))*100:0;
        out.innerHTML='<strong>Conviction positions: max '+tMoney(V*cv)+' each</strong><br><strong>Speculative positions: max '+tMoney(V*sp)+' each</strong><br><br>Recovery math on a '+tPct(L*100)+' loss: you need <strong>'+tPct(rec)+'</strong> just to get back to even.<br>Memorize the curve: \u221210% needs +11% \u00b7 \u221220% needs +25% \u00b7 \u221250% needs +100% \u00b7 \u221280% needs +400%.<br>Sizing keeps every loss on the flat part of that curve.';
      }
      calc();
    } },
  { title:"Income Target Calculator", minTier:3,
    desc:"Name the monthly income you want and it computes the capital that honestly produces it at a sane yield — plus what your current capital generates today, and the gap between them.",
    build:function(c){
      const fT=tField('Target monthly income ($)','500',calc);
      const fC=tField('Your current income-producing capital ($)','40000',calc);
      const fY=tField('Blended yield you can honestly sustain (%)','4.5',calc);
      const out=tResultBox();
      [fT,fC,fY].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const T=tNum(fT.__input.value), C=tNum(fC.__input.value), y=tNum(fY.__input.value)/100;
        if(y<=0){ out.textContent='Enter a yield above zero.'; return; }
        const need=T*12/y;
        const now=C*y/12;
        const gap=need-C;
        out.innerHTML='<strong>Capital required for '+tMoney(T)+'/month at '+tPct(y*100)+': '+tMoney(need)+'</strong><br>Your '+tMoney(C)+' produces today: <strong>'+tMoney(now)+'/month</strong><br>Gap to close: <strong>'+(gap>0?tMoney(gap):'none — you are there')+'</strong><br><br>The honest read: the gap closes through contributions and time — not by reaching for a yield number that makes this math look prettier. If a double-digit rate is tempting you, run it through the Break-Even Risk Calculator first.';
      }
      calc();
    } },
  { title:"Break-or-Hold CD Calculator", minTier:3,
    desc:"Rates moved and you're locked in. Computes whether paying the early-withdrawal penalty to jump to a new rate actually pays — the answer is HOLD more often than the excitement says.",
    build:function(c){
      const fB=tField('CD balance ($)','10000',calc);
      const fC=tField('Your locked rate (%)','3.5',calc);
      const fN=tField('New rate available (%)','5.0',calc);
      const fM=tField('Months remaining on the CD','9',calc);
      const fP=tField('Early-withdrawal penalty (months of interest)','6',calc);
      const out=tResultBox();
      [fB,fC,fN,fM,fP].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const B=tNum(fB.__input.value), rc=tNum(fC.__input.value)/100, rn=tNum(fN.__input.value)/100;
        const m=Math.max(0,tNum(fM.__input.value)), pm=Math.max(0,tNum(fP.__input.value));
        if(B<=0){ out.textContent='Enter a balance.'; return; }
        const penalty=B*rc/12*pm, extra=B*(rn-rc)*(m/12), net=extra-penalty;
        out.innerHTML='Extra interest at the new rate over the remaining '+m+' months: <strong>'+tMoney(extra)+'</strong><br>Penalty to break: <strong>'+tMoney(penalty)+'</strong><br><br><strong>Net from breaking: '+(net>=0?'+':'')+tMoney(net)+'</strong><br>'+(net>25?'<strong>Breaking pays.</strong> Move it \u2014 and turn auto-renewal off on the new instrument the day you open it.':'<strong>HOLD.</strong> '+(net>=0?'The gain does not cover the friction.':'The penalty eats more than the new rate returns.')+' One penalty can erase a year of rate edge \u2014 this is exactly why Reserve money never goes on a ladder.');
      }
      calc();
    } },
  { title:"APR \u2192 APY Converter", minTier:3,
    desc:"Banks alternate between the two numbers depending on which looks better. Convert any APR at any compounding frequency into the APY you'd actually earn — and compare two quotes on equal footing, in dollars.",
    build:function(c){
      const fA=tField('Quoted APR (%)','4.85',calc);
      const fN=tField('Compounding periods per year (12 = monthly, 365 = daily)','365',calc);
      const fQ=tField('Competing quote, already as APY (%)','4.95',calc);
      const fB=tField('Your balance ($)','15000',calc);
      const out=tResultBox();
      [fA,fN,fQ,fB].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const r=tNum(fA.__input.value)/100; let n=Math.max(1,Math.round(tNum(fN.__input.value)));
        const q=tNum(fQ.__input.value)/100, B=tNum(fB.__input.value);
        const apy=Math.pow(1+r/n,n)-1;
        const d1=B*apy, d2=B*q;
        out.innerHTML='That APR compounds to a true APY of <strong>'+tPct(apy*100)+'</strong><br><br>On '+tMoney(B)+':<br>Quote 1: <strong>'+tMoney(d1)+'</strong>/yr \u00b7 Quote 2: <strong>'+tMoney(d2)+'</strong>/yr<br><strong>'+(Math.abs(d1-d2)<25?'Within a rounding error \u2014 break the tie on friction and access, never basis points.':(d1>d2?'Quote 1':'Quote 2')+' wins by '+tMoney(Math.abs(d1-d2))+'/yr.')+'</strong>';
      }
      calc();
    } },
  { title:"Trade Expectancy Calculator", minTier:3,
    desc:"Win rate, average win, average loss — the three numbers that decide whether a strategy makes money before a single prediction. Computes expectancy and profit factor, and flat-out tells you when the math is negative.",
    build:function(c){
      const fW=tField('Win rate (%)','55',calc);
      const fAw=tField('Average win ($)','120',calc);
      const fAl=tField('Average loss ($)','150',calc);
      const fT=tField('Trades per month','12',calc);
      const out=tResultBox();
      [fW,fAw,fAl,fT].forEach(f=>c.appendChild(f)); c.appendChild(out); tNote(c);
      function calc(){
        const w=Math.min(100,Math.max(0,tNum(fW.__input.value)))/100;
        const aw=tNum(fAw.__input.value), al=tNum(fAl.__input.value), tr=Math.max(0,tNum(fT.__input.value));
        const exp=w*aw-(1-w)*al;
        const pf=((1-w)*al)>0?(w*aw)/((1-w)*al):Infinity;
        out.innerHTML='<strong>Expectancy: '+(exp>=0?'+':'')+tMoney(exp)+' per trade</strong><br>Profit factor: <strong>'+(pf===Infinity?'\u221e':(Math.round(pf*100)/100))+'</strong><br>At '+tr+' trades/month: <strong>'+(exp>=0?'+':'')+tMoney(exp*tr)+'</strong>/month before costs<br><br>'+(exp<0?'<strong>Negative expectancy \u2014 this loses money regardless of how it feels.</strong> A high win rate with small wins and larger losses is the classic trap: many good days, negative year.':pf<1.5?'Positive but thin \u2014 real spreads, slippage, and missed fills eat edges this size. Mentally tax every trade and see if it survives, and remember: the backtest can disqualify a strategy, never qualify one.':'Healthy on paper. Now the standard applies: paper trade it forward in real time, start at shrug-off size, and pre-write the scaling rule before a winning streak writes it for you.');
      }
      calc();
    } },
];

function renderTools(eff, grid){
  const head=document.createElement('div'); head.style.cssText='grid-column:1/-1;margin-top:30px;';
  head.innerHTML='<div class="lib-tag">INTERACTIVE TOOLS</div>';
  grid.appendChild(head);
  TOOLS.forEach((t,idx)=>{
    const unlocked=eff>=t.minTier;
    const card=document.createElement('div');
    card.className='library-item'+(unlocked?'':' locked');
    card.innerHTML='<div class="lib-tag">'+(unlocked?'INCLUDED IN YOUR PLAN':'REQUIRES '+(TIER_NAMES[t.minTier]||'').toUpperCase())+'</div><h4>'+t.title+'</h4><p>'+t.desc+'</p><div class="lib-action '+(unlocked?'':'locked-action')+'">'+(unlocked?'OPEN TOOL \u2192':'\ud83d\udd12 LOCKED \u2014 UPGRADE TO UNLOCK')+'</div>';
    if(unlocked){ card.querySelector('.lib-action').addEventListener('click',()=>openTool(idx)); }
    grid.appendChild(card);
  });
}

function openTool(idx){
  const t=TOOLS[idx]; if(!t||!currentUser) return;
  const vt=document.getElementById('viewerTitle'); if(vt) vt.textContent=t.title;
  const vl=document.getElementById('viewerLicenseEmail'); if(vl) vl.textContent=currentUser.email;
  const c=document.getElementById('viewerContent'); if(!c) return;
  c.innerHTML='';
  const box=document.createElement('div');
  try{ t.build(box); }catch(err){ console.error('Tool error:',err); box.textContent='This tool hit an error \u2014 refresh and try again.'; }
  c.appendChild(box);
  const cv=document.getElementById('contentViewer'); if(cv) cv.classList.add('show'); document.body.style.overflow='hidden';
}

// ============ TIER-ORGANIZED DASHBOARD LAYOUT ============
// Groups every product under its plan so buyers see exactly what each tier
// includes at a glance: guides + tools per membership tier, then the
// Capital Systems Suite tier by tier. Replaces the old by-content-type
// sections (guides / downloads / toolkits / tools).
const TIER_SECTIONS=[
  {tier:1, name:'THE YIELD MAP \u2014 TIER 1', sub:'The starting plan. Everything here is included in every plan above it.'},
  {tier:2, name:'THE FULL LEDGER \u2014 TIER 2', sub:'Everything in The Yield Map, plus:'},
  {tier:3, name:'THE ANNOTATED PORTFOLIO \u2014 TIER 3', sub:'Everything in Tiers 1\u20132, plus:'},
  {tier:5, name:'CAPITAL SYSTEMS \u2014 FOUNDATION', sub:'The Capital Systems Suite \u2014 a separate product line from the membership tiers. Foundation is the entry tier.'},
  {tier:6, name:'CAPITAL SYSTEMS \u2014 OPERATOR', sub:'Everything in Foundation, plus:'},
  {tier:7, name:'CAPITAL SYSTEMS \u2014 INSTITUTIONAL', sub:'Everything in Foundation and Operator, plus:'}
];
function tierSectionHeader(grid, name, sub){
  const head=document.createElement('div'); head.style.cssText='grid-column:1/-1;margin-top:34px;';
  const tag=document.createElement('div'); tag.className='lib-tag'; tag.textContent=name; head.appendChild(tag);
  if(sub){ const p=document.createElement('p'); p.textContent=sub; p.style.cssText='margin:6px 0 0;font-size:13px;opacity:.75;'; head.appendChild(p); }
  grid.appendChild(head);
}
function addGuideCard(grid, item, idx, unlocked){
  const card=document.createElement('div');
  card.className='library-item'+(unlocked?'':' locked');
  card.innerHTML='<div class="lib-tag">'+(unlocked?'INCLUDED IN YOUR PLAN':'REQUIRES '+(TIER_NAMES[item.minTier]||'').toUpperCase())+'</div><h4>'+item.title+'</h4><p>'+item.desc+'</p><div class="lib-action '+(unlocked?'':'locked-action')+'">'+(unlocked?'VIEW \u2192':'\ud83d\udd12 LOCKED \u2014 UPGRADE TO UNLOCK')+'</div>';
  if(unlocked){ card.querySelector('.lib-action').addEventListener('click',function(){ openViewer(idx); }); }
  grid.appendChild(card);
}
function addToolCard(grid, t, idx, unlocked, opener, lockedLabel){
  const card=document.createElement('div');
  card.className='library-item'+(unlocked?'':' locked');
  card.innerHTML='<div class="lib-tag">'+(unlocked?'INCLUDED IN YOUR PLAN':'REQUIRES '+(TIER_NAMES[t.minTier]||'').toUpperCase())+'</div><h4>'+t.title+'</h4><p>'+t.desc+'</p><div class="lib-action '+(unlocked?'':'locked-action')+'">'+(unlocked?'OPEN TOOL \u2192':(lockedLabel||'\ud83d\udd12 LOCKED \u2014 UPGRADE TO UNLOCK'))+'</div>';
  if(unlocked){ card.querySelector('.lib-action').addEventListener('click',function(){ opener(idx); }); }
  grid.appendChild(card);
}
function addRefWorkbooksCard(grid, eff){
  const cs=CAP_SYSTEMS[0]; if(!cs) return;
  const unlocked=eff>=cs.minTier;
  const card=document.createElement('div');
  card.className='library-item'+(unlocked?'':' locked');
  card.innerHTML='<div class="lib-tag">'+(unlocked?'INCLUDED IN YOUR PLAN':cs.tag)+'</div><h4>'+cs.title+'</h4><p>'+cs.desc+'</p><div class="lib-action '+(unlocked?'':'locked-action')+'">'+(unlocked?'OPEN & DOWNLOAD \u2192':'\ud83d\udd12 LOCKED \u2014 INSTITUTIONAL ONLY')+'</div>';
  if(unlocked){ card.querySelector('.lib-action').addEventListener('click',function(){ openCapViewer(0); }); }
  grid.appendChild(card);
}
function addCapSuiteEntrance(grid, eff){
  const wrap=document.createElement('div');
  wrap.style.cssText='grid-column:1/-1;margin-top:48px;padding:28px 26px;border:1px solid var(--gold, #c9a24b);border-radius:4px;background:rgba(201,162,75,.05);';
  const tag=document.createElement('div'); tag.className='lib-tag'; tag.textContent='CAPITAL SYSTEMS SUITE'; wrap.appendChild(tag);
  const h=document.createElement('h4'); h.textContent='Welcome to the Capital Systems Suite'; h.style.cssText='margin:10px 0 8px;font-size:24px;'; wrap.appendChild(h);
  const p=document.createElement('p');
  p.textContent='An operating system for your capital, in three tiers that build on each other: Foundation places it, Operator runs it, Institutional governs it. Every tier below is a set of live interactive toolkits \u2014 enter your real numbers and the system computes, flags, and audits alongside you.';
  p.style.cssText='margin:0 0 10px;font-size:14px;line-height:1.7;opacity:.9;'; wrap.appendChild(p);
  const st=document.createElement('p'); st.style.cssText='margin:0;font-size:13px;letter-spacing:.03em;';
  let ownedName=null;
  if(eff>=7) ownedName=TIER_NAMES[7]; else if(eff>=6) ownedName=TIER_NAMES[6]; else if(eff>=5) ownedName=TIER_NAMES[5];
  if(ownedName){
    st.innerHTML='<strong style="color:var(--gold, #c9a24b);">YOUR ACCESS: '+ownedName.toUpperCase()+'</strong> \u2014 everything it unlocks is open below.';
  } else {
    st.innerHTML='<strong style="color:var(--gold, #c9a24b);">SOLD SEPARATELY FROM THE MEMBERSHIP TIERS</strong> \u2014 explore what each tier unlocks below.';
  }
  wrap.appendChild(st);
  grid.appendChild(wrap);
}
function renderDashboardSections(eff, grid, preview){
  TIER_SECTIONS.forEach(function(sec){
    if(sec.tier===5) addCapSuiteEntrance(grid, eff);
    tierSectionHeader(grid, sec.name, sec.sub);
    if(sec.tier<=3){
      if(preview){
        PREVIEW_LIBRARY_CARDS.forEach(function(item){
          if(item.tier!==sec.tier) return;
          const card=document.createElement('div'); card.className='library-item locked preview-blur';
          card.innerHTML='<div class="lib-tag">REQUIRES '+(TIER_NAMES[item.tier]||'').toUpperCase()+'</div><h4>'+item.title+'</h4><p>'+item.teaser+'</p><div class="lib-action locked-action">\ud83d\udd12 LOCKED</div>';
          grid.appendChild(card);
        });
      } else {
        LIBRARY.forEach(function(item,idx){ if(item.minTier===sec.tier) addGuideCard(grid,item,idx,eff>=item.minTier); });
      }
      TOOLS.forEach(function(t,idx){ if(t.minTier===sec.tier) addToolCard(grid,t,idx,eff>=t.minTier,openTool); });
    } else {
      CAP_TOOLS.forEach(function(t,idx){ if(t.minTier===sec.tier) addToolCard(grid,t,idx,eff>=t.minTier,openCapTool,'\ud83d\udd12 LOCKED \u2014 SOLD SEPARATELY'); });
      if(sec.tier===7) addRefWorkbooksCard(grid, eff);
    }
  });
}

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
  await loadSubscriptionAndShowDashboard(); checkStackQueue(currentUser.email); try{ updateGreeting(); }catch(err){} closeAuthModal(); return false;
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

async function signOut(){ const sb=getSupabase(); if(sb){ try{ await sb.auth.signOut(); }catch(err){ console.error(err); } } currentUser=null; currentSubscription=null; setUserEmailBridge(null); const d=document.getElementById('dashboard'); if(d) d.classList.remove('show'); document.body.style.overflow=''; try{ updateGreeting(); }catch(err){} }

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
  renderDashboardSections(eff, grid, false);
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
  PREVIEW_LIBRARY_CARDS.length; // teasers are rendered per-tier inside renderDashboardSections
  renderDashboardSections(0, grid, true);
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
// HOME PAGE GREETING — a welcome panel injected at the top of the
// main page (styled like the Capital Systems entrance). Greets
// visitors generically; switches to a personalized "Welcome back"
// with their plan once a session exists. Only renders on the home
// page (guarded by the #guides section existing).
// ============================================================
function buildGreeting(){
  if(!document.getElementById('guides')) return;            // home page only
  if(document.getElementById('ledgerGreeting')) return;
  // ===== THE LEDGER & CO. BRAND-VALUES ENTRANCE SPLASH =====
  // Shows on EVERY visit; the ENTER button is the only way through.
  // Restored from the original June design: engraved outlined words with
  // gold initials spelling L.E.D.G.E.R., diamond-bulleted meanings, and the
  // gold ENTER button. Shows on every visit, before the home page.
  if(!document.getElementById('ledgerSplashCSS')){
    const css=document.createElement('style'); css.id='ledgerSplashCSS';
    css.textContent=[
      '.ledger-splash{position:fixed;inset:0;z-index:99999;background:linear-gradient(160deg,#05070f,#0b1120);overflow-y:auto;-webkit-overflow-scrolling:touch;padding:56px 24px;text-align:center;opacity:1;transition:opacity .5s ease;}',
      '.ledger-splash .ls-inner{max-width:840px;margin:0 auto;}',
      '.ledger-splash .ls-tag{letter-spacing:.3em;font-size:11px;color:var(--gold,#c9a24b);text-transform:uppercase;}',
      '.ledger-splash .ls-title{font-family:Georgia,\'Times New Roman\',serif;font-size:clamp(28px,5vw,46px);font-weight:400;margin:16px 0 10px;color:#e9e4d8;}',
      '.ledger-splash .ls-title em{color:#e6c465;font-style:italic;}',
      '.ledger-splash .ls-intro{color:#9aa5b8;font-size:15px;margin:0 0 34px;}',
      '.ledger-splash .ls-rows{display:grid;grid-template-columns:1fr 1fr;gap:22px 34px;text-align:left;margin:0 0 26px;}',
      '.ledger-splash .ls-w{font-family:Georgia,\'Times New Roman\',serif;font-size:clamp(24px,3.5vw,34px);line-height:1.1;color:#0b0f1a;-webkit-text-stroke:1px rgba(255,255,255,.9);paint-order:stroke fill;text-shadow:0 1px 2px rgba(0,0,0,.4);}',
      '.ledger-splash .ls-w .ls-ini{color:var(--gold,#c9a24b);font-size:1.3em;-webkit-text-stroke:1.4px rgba(255,255,255,.5);paint-order:stroke fill;}',
      '.ledger-splash .ls-d{font-size:11px;color:#9aa5b8;margin-top:3px;display:flex;gap:7px;}',
      '.ledger-splash .ls-d::before{content:"\\25C6";color:var(--gold,#c9a24b);font-size:7px;line-height:1.8;flex-shrink:0;}',
      '.ledger-splash .ls-andco{grid-column:1/-1;letter-spacing:.3em;font-size:11px;color:var(--gold,#c9a24b);text-transform:uppercase;margin-top:2px;}',
      '.ledger-splash .ls-tagline{font-style:italic;color:#9aa5b8;font-size:13px;max-width:640px;margin:0 auto 30px;line-height:1.7;}',
      '.ledger-splash .ls-enter{text-transform:uppercase;letter-spacing:.14em;font-size:13px;background:var(--gold,#c9a24b);color:#05070f;border:none;padding:15px 38px;border-radius:6px;cursor:pointer;font-weight:700;transition:transform .15s;}',
      '.ledger-splash .ls-enter:hover{transform:translateY(-2px);}',
      '.ledger-splash .ls-skip{display:block;margin:18px auto 0;font-size:12px;color:#9aa5b8;background:none;border:none;cursor:pointer;text-decoration:underline;letter-spacing:.06em;}',
      '@media(max-width:640px){.ledger-splash .ls-rows{grid-template-columns:1fr;text-align:center;}.ledger-splash .ls-d{justify-content:center;}}'
    ].join('\n');
    document.head?document.head.appendChild(css):document.body.appendChild(css);
  }
  const overlay=document.createElement('div'); overlay.id='ledgerGreeting'; overlay.className='ledger-splash';
  const WORDS=[
    ['L','eadership','Integrity \u0026 long-term perspective.'],
    ['E','ducation','Practical financial education.'],
    ['D','iscipline','Evidence over speculation.'],
    ['G','rowth','Sustainable, sound strategy.'],
    ['E','xcellence','Highest standard of quality.'],
    ['R','esearch','Facts-first analysis.'],
    ['\u0026','CO.',''],
    ['C','onfidence','Invest with understanding.'],
    ['O','pportunity','Recognized responsibly.']
  ];
  let rows='';
  WORDS.forEach(function(w){
    if(w[0]==='\u0026'){ rows+='<div class="ls-andco">\u0026 CO.</div>'; return; }
    rows+='<div class="ls-wr"><div class="ls-w"><span class="ls-ini">'+w[0]+'</span>'+w[1]+'</div><div class="ls-d">'+w[2]+'</div></div>';
  });
  overlay.innerHTML='<div class="ls-inner">'
    +'<div class="ls-tag">Our Foundation</div>'
    +'<div class="ls-title">The meaning behind <em>Ledger \u0026 Co.</em></div>'
    +'<p class="ls-intro">Eight principles that turn hard financial lessons into lasting confidence and wealth.</p>'
    +'<div class="ls-rows">'+rows+'</div>'
    +'<p class="ls-tagline">\u201cLeadership. Education. Discipline. Growth. Excellence. Research. Building Confidence and Creating Opportunity for every investor.\u201d</p>'
    +'<button type="button" class="ls-enter" id="ledgerSplashEnter">ENTER LEDGER \u0026 CO. \u2192</button>'
    +'</div>';
  document.body.appendChild(overlay);
  document.body.style.overflow='hidden';
  function dismissSplash(){
    overlay.style.opacity='0';
    setTimeout(function(){
      if(overlay.parentNode) overlay.parentNode.removeChild(overlay);
      const dash=document.getElementById('dashboard');
      const cv=document.getElementById('contentViewer');
      const keepLocked=(dash&&dash.classList&&dash.classList.contains('show'))||(cv&&cv.classList&&cv.classList.contains('show'));
      document.body.style.overflow=keepLocked?'hidden':'';
    },520);
  }
  window.__ledgerDismissSplash=dismissSplash;
  const eb=document.getElementById('ledgerSplashEnter'); if(eb) eb.addEventListener('click',dismissSplash);
}
function updateGreeting(){
  const h=document.getElementById('ledgerGreetingTitle');
  const p=document.getElementById('ledgerGreetingBody');
  const st=document.getElementById('ledgerGreetingStatus');
  if(!h||!p||!st) return;
  st.innerHTML='';
  if(currentUser){
    h.textContent='Welcome back';
    p.textContent='Your library is waiting: the member guides, every interactive tool, and \u2014 if you hold it \u2014 the Capital Systems Suite. Pick up where you left off.';
    let planLabel='FREE PREVIEW';
    if(currentSubscription&&currentSubscription.length){
      planLabel=currentSubscription.map(function(r){ return (TIER_NAMES[r.tier]||('Tier '+r.tier)); }).join(' + ').toUpperCase();
    }
    st.innerHTML='<strong style="color:var(--gold, #c9a24b);">YOUR PLAN: '+planLabel+'</strong> \u2014 ';
    const a=document.createElement('a'); a.href='#'; a.textContent='open your dashboard \u2192';
    a.style.cssText='color:var(--gold, #c9a24b);text-decoration:underline;';
    a.addEventListener('click',function(e){ e.preventDefault(); if(window.__ledgerDismissSplash) window.__ledgerDismissSplash(); loadSubscriptionAndShowDashboard(); });
    st.appendChild(a);
  } else {
    h.textContent='Welcome to Ledger & Co.';
    p.textContent='Independent financial education, built on honest math: member guides, live interactive tools, and the Capital Systems Suite \u2014 designed to show you your real numbers, not the marketing\u2019s.';
    st.innerHTML='<strong style="color:var(--gold, #c9a24b);">NEW HERE?</strong> ';
    const a1=document.createElement('a'); a1.href='#guides'; a1.textContent='See the plans';
    a1.style.cssText='color:var(--gold, #c9a24b);text-decoration:underline;';
    a1.addEventListener('click',function(){ if(window.__ledgerDismissSplash) window.__ledgerDismissSplash(); });
    st.appendChild(a1);
    st.appendChild(document.createTextNode(' \u00b7 '));
    const a2=document.createElement('a'); a2.href='#'; a2.textContent='Sign in';
    a2.style.cssText='color:var(--gold, #c9a24b);text-decoration:underline;';
    a2.addEventListener('click',function(e){ e.preventDefault(); if(window.__ledgerDismissSplash) window.__ledgerDismissSplash(); openAuthModal('signin'); });
    st.appendChild(a2);
  }
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
      try{ updateGreeting(); }catch(err){}
    }
  }catch(err){ console.error('Session restore failed:', err); }
}

function initPage(){
  safeRun('mobile nav', initMobileNav);
  safeRun('home greeting', buildGreeting);
  safeRun('billing toggle', ()=>setBilling('monthly'));
  safeRun('reveal animations', initReveal);
  safeRun('global keys', initGlobalKeys);
  safeRun('email popup timer', ()=>setTimeout(showEmailPopup,4000));
  restoreSession();
}

if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', initPage); }
else{ initPage(); }

// ============================================================
// BILLING TOGGLE — FIXED VERSION (overrides the one above)
// The original only swapped the displayed price text; the buy
// buttons stayed pointed at ".monthly", so Paddle charged the
// monthly price no matter what the customer selected. This
// version also rewrites every membership button's data-price-id
// to the selected period, so checkout charges exactly what the
// page displays. Capital Systems buttons are untouched.
// ============================================================
function setBilling(period){
  document.querySelectorAll('.billing-seg').forEach(b=>{ b.classList.toggle('active',b.dataset.billing===period); });
  ['monthly','quarterly','annual','lifetime'].forEach(p=>{
    document.querySelectorAll('.price-'+p).forEach(el=> el.style.display=(p===period)?'inline':'none');
    document.querySelectorAll('.price-period-'+p).forEach(el=> el.style.display=(p===period)?'inline':'none');
  });
  document.querySelectorAll('.annual-note').forEach(el=> el.style.display=(period==='annual')?'block':'none');
  document.querySelectorAll('.quarterly-note').forEach(el=> el.style.display=(period==='quarterly')?'block':'none');
  document.querySelectorAll('.lifetime-note').forEach(el=> el.style.display=(period==='lifetime')?'block':'none');
  const sb=document.getElementById('signupBillingInterval'); if(sb) sb.value=period;
  const FAMILIES=['yieldMap','fullLedger','annotatedPortfolio','allAccess'];
  document.querySelectorAll('[data-price-id]').forEach(function(btn){
    const fam=String(btn.getAttribute('data-price-id')||'').split('.')[0];
    if(FAMILIES.indexOf(fam)!==-1){ btn.setAttribute('data-price-id', fam+'.'+period); }
  });
}

