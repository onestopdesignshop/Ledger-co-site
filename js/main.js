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

// ============ CAPITAL SYSTEMS SUITE (tiers 5-7, files in private Supabase Storage) ============
const CAP_SYSTEMS = [
  { key:"foundation", title:"Capital Systems \u2014 Foundation", minTier:5, tag:"FOUNDATION TIER",
    desc:"The core capital-allocation system: the structured toolkit, implementation playbook, and every supporting template \u2014 downloadable, yours to run.",
    body:`<h4>What Foundation includes</h4>
    <p>The complete core system in ready-to-use form: the structured toolkit files, the implementation playbook, and the supporting templates. Everything downloads below \u2014 each file states exactly where it fits in the sequence.</p>
    <h4>How to work through it</h4>
    <p><strong>Step 1:</strong> Download every file below into one folder you control.<br><strong>Step 2:</strong> Open the playbook first \u2014 it is the map for everything else.<br><strong>Step 3:</strong> Set up the main toolkit with your own numbers before opening anything else.<br><strong>Step 4:</strong> Re-run the system quarterly. It is built to be operated, not read once.</p>
    <h4>Support</h4>
    <p>Questions while implementing: email dee8shops@gmail.com from your account email and reference Foundation.</p>
    <h4>License</h4>
    <p>Licensed to the account shown in the watermark, for personal use. Redistribution outside your account violates the Terms of Sale.</p>` },
  { key:"operator", title:"Capital Systems \u2014 Operator", minTier:6, tag:"OPERATOR TIER",
    desc:"Everything in Foundation, plus the Operator-level systems: the expanded toolkit set and the operating cadence built on top of the core.",
    body:`<h4>What Operator includes</h4>
    <p>The full Foundation system plus the Operator layer: the expanded toolkit files and the operating cadence that turns the core allocation system into an ongoing process. Your downloads below include both tiers\u2019 files.</p>
    <h4>How to work through it</h4>
    <p><strong>Step 1:</strong> If you have not run Foundation, start there \u2014 its files are unlocked for you in the Foundation card.<br><strong>Step 2:</strong> Download the Operator files below into the same working folder.<br><strong>Step 3:</strong> Follow the Operator playbook\u2019s sequence \u2014 it assumes the Foundation setup is live.<br><strong>Step 4:</strong> Adopt the operating cadence: the system\u2019s value compounds through repetition.</p>
    <h4>Support</h4>
    <p>Questions while implementing: email dee8shops@gmail.com from your account email and reference Operator.</p>
    <h4>License</h4>
    <p>Licensed to the account shown in the watermark, for personal use. Redistribution outside your account violates the Terms of Sale.</p>` },
  { key:"institutional", title:"Capital Systems \u2014 Institutional", minTier:7, tag:"INSTITUTIONAL TIER",
    desc:"The complete suite: Foundation and Operator plus the Institutional-grade systems \u2014 the full toolkit library at its deepest level.",
    body:`<h4>What Institutional includes</h4>
    <p>The entire Capital Systems Suite: Foundation, Operator, and the Institutional layer on top. Every tier\u2019s files are unlocked for your account \u2014 the Institutional downloads below, and the lower tiers in their own cards.</p>
    <h4>How to work through it</h4>
    <p><strong>Step 1:</strong> Run the tiers in order \u2014 Foundation, then Operator, then the Institutional files below. Each layer assumes the previous one is live.<br><strong>Step 2:</strong> Download everything into one working folder; keep the structure the playbooks reference.<br><strong>Step 3:</strong> The Institutional playbook defines the full operating rhythm \u2014 adopt it as written before customizing.</p>
    <h4>Support</h4>
    <p>Questions while implementing: email dee8shops@gmail.com from your account email and reference Institutional \u2014 priority handling.</p>
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
  const fh=document.createElement('h4'); fh.textContent='Your downloads'; body.appendChild(fh);
  const box=document.createElement('div'); box.textContent='Loading your files\u2026'; body.appendChild(box);
  c.appendChild(body);
  c.appendChild(buildWatermark(currentUser.email));
  const cv=document.getElementById('contentViewer'); if(cv) cv.classList.add('show'); document.body.style.overflow='hidden';
  try{
    const sb=getSupabase(); if(!sb) throw new Error('no client');
    const {data,error}=await sb.storage.from('capital-systems').list(cs.key,{limit:100,sortBy:{column:'name',order:'asc'}});
    if(error) throw error;
    const files=(data||[]).filter(f=>f&&f.name&&!f.name.startsWith('.'));
    if(!files.length){ box.textContent='Your files are being provisioned for this account \u2014 check back shortly, or email dee8shops@gmail.com and we\u2019ll send them directly.'; return; }
    box.innerHTML='';
    for(const f of files){
      const rowEl=document.createElement('div'); rowEl.style.cssText='margin:9px 0;';
      const {data:s,error:e2}=await sb.storage.from('capital-systems').createSignedUrl(cs.key+'/'+f.name,3600);
      if(e2||!s||!s.signedUrl){ rowEl.textContent=f.name+' \u2014 temporarily unavailable, email dee8shops@gmail.com'; }
      else{
        const a=document.createElement('a'); a.href=s.signedUrl; a.textContent='\u2b07 '+f.name;
        a.setAttribute('download',f.name); a.target='_blank'; a.rel='noopener';
        a.style.cssText='color:var(--gold);text-decoration:underline;word-break:break-all;';
        rowEl.appendChild(a);
      }
      box.appendChild(rowEl);
    }
    const note=document.createElement('p'); note.style.cssText='font-size:12px;opacity:.7;margin-top:14px;';
    note.textContent='Download links are private to your account and expire after 60 minutes \u2014 reopen this card any time for fresh ones.';
    box.appendChild(note);
  }catch(err){ console.error('Cap Systems files error:',err); box.textContent='Could not load your files \u2014 refresh and try again, or email dee8shops@gmail.com.'; }
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
  renderCapSystems(eff, grid);
  renderTools(eff, grid);
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
  renderCapSystems(0, grid);
  renderTools(0, grid);
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
