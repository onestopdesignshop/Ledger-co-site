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
    <p><strong>1. Spending buffer (0–1 month):</strong> Needs to be instantly accessible, zero risk to principal, and you should never optimize this for yield. Convenience beats basis points here. This is the money that pays rent, covers the card, and absorbs the week where two bills land at once. If getting to it involves a transfer delay, it's in the wrong place.</p>
    <p><strong>2. Reserve (1–12 months):</strong> Money you'll likely need within a year — emergency fund, planned purchases, a tax bill you can see coming. This is where high-yield savings and money-market accounts earn their place: liquid, insured, competitive. The reserve is allowed to take one or two business days to reach you, in exchange for actually earning something.</p>
    <p><strong>3. Parked capital (12+ months):</strong> Cash you're confident you won't touch soon. This can tolerate a lockup in exchange for a better, guaranteed rate — CDs and Treasury bills belong here. The key word is <em>confident</em>: if there's a realistic scenario where you'd need it in month six, it isn't parked capital, it's reserve wearing a costume.</p>
    <h4>Why the bucket comes before the rate</h4>
    <p>Rates are seductive because they're a single number, and single numbers feel comparable. But a 12-month CD paying more than your savings account is not "better" if the money inside it is your emergency fund — the early-withdrawal penalty on the day your car dies can erase a year of the rate advantage in one transaction. The bucket decision is what makes the rate comparison meaningful at all.</p>
    <h4>A worked example</h4>
    <p>Say you're holding $22,000 in cash in a checking account earning effectively nothing. Run the framework:</p>
    <p><strong>Buffer:</strong> Monthly outflow is about $3,500, so $4,000 stays in checking. Cost of this decision: a few dollars a year of forgone interest. Value: never bouncing a payment. Easy trade.</p>
    <p><strong>Reserve:</strong> You want four months of expenses reachable — $14,000 — so it goes to a high-yield savings account. On a competitive rate, that's hundreds of dollars a year the checking account was silently donating to the bank.</p>
    <p><strong>Parked:</strong> The remaining $4,000 has no assignment for at least a year. A 12-month CD or T-bill locks a guaranteed rate. If rates drop next month, you're glad you locked; if they rise, your reserve is still liquid enough to catch the next opportunity. Either way you made a structural decision, not a bet.</p>
    <p>Total time: one evening. Total risk added: none — every dollar stayed insured. The only thing that changed is that the money now has jobs.</p>
    <h4>Only now do you compare products</h4>
    <p>Matching the product to the bucket prevents the two most common mistakes: locking up money you'll need (and paying an early-withdrawal penalty), or leaving long-horizon cash in a checking account earning nothing. Within each bucket, comparison is simple because the candidates are genuinely alike — savings account vs. savings account, CD vs. T-bill of the same maturity.</p>
    <h4>The one question that filters most bad options</h4>
    <p>"What has to be true for this rate to actually apply to me?" A headline APY that requires a balance cap, a direct-deposit trigger, or a promo window that expires is a conditional rate — not the rate you'll earn. If you can't satisfy the condition effortlessly, treat the headline number as fiction.</p>
    <h4>Common mistakes</h4>
    <p><strong>Optimizing the buffer.</strong> Moving your bill-paying money to chase yield creates transfer friction exactly where you can least afford it. The buffer's job is reliability.</p>
    <p><strong>One giant undifferentiated pile.</strong> When all cash sits together, it gets managed to the most conservative dollar's requirements — meaning all of it earns the least.</p>
    <p><strong>Confusing "probably won't need it" with "won't need it."</strong> Parked capital demands the second. When in doubt, it's reserve.</p>
    <p><strong>Re-running the decision every week.</strong> The framework is meant to be revisited when life changes — new job, new baby, big purchase on the horizon — not every time a bank runs a promotion.</p>
    <h4>Action checklist</h4>
    <p>☐ Write down your true monthly outflow (look at three months of statements, not your memory).<br>
    ☐ Assign every cash dollar to buffer, reserve, or parked.<br>
    ☐ Confirm the buffer sits somewhere with instant access.<br>
    ☐ Move the reserve to an insured account with a competitive standing (not promo) rate.<br>
    ☐ For parked capital, pick a maturity you're certain you can wait out.<br>
    ☐ Put a calendar note to re-run this after any major life change.</p>` },
  { title:"The Fee & Fine-Print Trap Guide", desc:"The recurring ways a 'great rate' quietly costs more than it pays — and how to catch each one.", minTier:1,
    body:`<h4>The five traps, in the order you'll meet them</h4>
    <p><strong>Trap 1 — The balance cap.</strong> A market-leading APY that only applies up to a low balance ceiling, with everything above earning a fraction of it. Always find the cap before you're impressed by the rate. A spectacular rate on the first $500 of a $20,000 balance is a rounding error dressed as a headline: the blended rate across your whole balance is the only number that matters, and it's often worse than a boring account with no cap at all.</p>
    <p><strong>Trap 2 — The activity requirement.</strong> "Boosted" rates that require a qualifying direct deposit, a minimum number of debit transactions, or a linked account. Miss the requirement one month and you silently drop to the base rate. The danger isn't the requirement itself — it's that the penalty is invisible. No email, no alert; your money just quietly starts earning a tenth of what you thought. If you take an account like this, the requirement has to be something your life already does automatically, not something you'll remember to do.</p>
    <p><strong>Trap 3 — The promo cliff.</strong> A rate that's real for an introductory window, then reverts. The reversion rate — not the promo rate — is your true long-term return. Ask what it becomes, not just what it is. Banks run promos precisely because most people don't move their money again when the window closes. Unless you genuinely intend to re-shop at expiry — and will actually do it — evaluate the account as if the promo didn't exist.</p>
    <p><strong>Trap 4 — The maintenance fee.</strong> On smaller balances, a monthly fee can exceed the interest earned entirely. Always compare the fee against the dollars of interest, not against other fees. A $10 monthly fee is $120 a year; on a $4,000 balance, there is no realistic savings rate that outruns it. The account is a guaranteed loss wearing an APY badge.</p>
    <p><strong>Trap 5 — The minimum-to-earn.</strong> Some accounts pay their advertised rate only above a minimum balance, dropping to near-zero beneath it. If your balance fluctuates near that line, your effective rate is unpredictable — you can spend half the year earning the advertised rate and half earning nothing, and the statement won't make that obvious.</p>
    <h4>A worked example: the trap stack</h4>
    <p>Consider a real pattern you'll see in the wild: an account advertising a chart-topping rate that, in the fine print, (a) applies only up to $5,000, (b) requires a $1,000+ monthly direct deposit, and (c) reverts to a token base rate on every dollar that misses either condition.</p>
    <p>Run your own numbers against it. If you'd hold $15,000 there: the top rate touches only a third of your money, the rest earns the base rate, and one payroll hiccup drops the whole thing to base for the month. Compute the blended annual dollars and compare it to a plain no-strings account paying a good standing rate on the full balance. In a large share of real cases, the boring account wins outright — and it wins by more once you price in the months you'd fumble the conditions. The exercise takes ten minutes and it's the same ten minutes every time.</p>
    <h4>How to read fine print fast</h4>
    <p>You don't need to read the whole disclosure. Search it for four things: the word "up to" near the rate (cap), the word "qualifying" (activity requirement), any date or "introductory" language (promo cliff), and the fee schedule table (maintenance and minimums). Ninety percent of the traps live behind those four markers.</p>
    <h4>The habit that protects you</h4>
    <p>Before opening anything, write down the single sentence describing the exact conditions under which you personally will earn the advertised rate. If you can't write that sentence clearly, you don't understand the product yet. If the sentence has more than two "if"s in it, the product is designed for you to fail it.</p>
    <h4>Common mistakes</h4>
    <p><strong>Comparing headline to headline.</strong> Two advertised APYs are only comparable after you've confirmed both are unconditional — otherwise you're comparing marketing budgets.</p>
    <p><strong>Assuming you'll maintain the conditions.</strong> People predictably overestimate their own future diligence. Price the account at the rate you'd earn on your laziest month.</p>
    <p><strong>Ignoring exit friction.</strong> Some accounts make leaving slow or costly — closure fees, transfer delays. A trap you can't cheaply exit is worse than one you can.</p>
    <h4>Action checklist</h4>
    <p>☐ For any account you hold now: find the cap, the conditions, and the fee schedule. Write the one-sentence rate condition.<br>
    ☐ Compute your blended, after-fee annual dollars on your real balance.<br>
    ☐ Compare against one no-strings alternative.<br>
    ☐ If you keep a conditional account, set a recurring reminder to verify you're still meeting the conditions.<br>
    ☐ Diary any promo expiry date the day you open the account.</p>` },
  { title:"How to Compare Accounts Without Getting Played", desc:"A side-by-side method that surfaces the real cost and real return, not the marketing.", minTier:1,
    body:`<h4>Build a same-columns comparison</h4>
    <p>Marketing wins when every product is described differently. You win by forcing them into identical columns. For each candidate account, fill in: <em>base rate</em>, <em>conditional rate &amp; its condition</em>, <em>balance cap</em>, <em>monthly fee</em>, <em>minimum to earn</em>, <em>insurance (FDIC/NCUA)</em>, <em>access speed</em>.</p>
    <p>The act of filling the table is itself the filter. Products that survive being described in plain columns are usually sound; products that resist it — where you can't find the reversion rate, or the fee schedule is a maze — are telling you something about how they make money.</p>
    <h4>Then compute your number, not theirs</h4>
    <p>Estimate the interest <em>you</em> would actually earn on <em>your</em> typical balance, after fees and given whether you'll meet the conditions. This "effective yield to you" is frequently very different from the headline — and it's the only number that should drive the decision.</p>
    <h4>A worked example</h4>
    <p>Suppose you're placing $12,000 and comparing three candidates:</p>
    <p><strong>Account A</strong> advertises the highest rate on the page — but only up to $5,000, with a token rate above the cap and a monthly fee unless you hold a linked checking account. On your $12,000, the blend across capped and uncapped dollars, minus twelve months of fees, lands well below the headline.</p>
    <p><strong>Account B</strong> advertises a middling rate, unconditional, no fee, full balance. Your effective yield equals the headline exactly — nothing to maintain, nothing to fumble.</p>
    <p><strong>Account C</strong> advertises a strong promo rate for a few months, reverting to a weak base. Unless you will genuinely move the money again at expiry, your twelve-month blend sits between the two — and requires you to act on a specific future date to avoid drifting to the base rate for years.</p>
    <p>On paper, A looked best and C looked exciting. On <em>your</em> balance with <em>your</em> behavior, B quietly wins or ties while demanding nothing. This inversion — the boring one winning after honest math — is the single most common outcome of doing the table, which is exactly why the marketing works on people who don't.</p>
    <h4>Weigh access speed properly</h4>
    <p>"How fast can I get my money" is a column people skip until the day it's the only column that matters. Same-day access, next-business-day transfers, and multi-day holds are materially different products for a reserve fund. Decide the access speed your bucket requires first (see the Cash-Placement Framework), and disqualify anything slower before comparing rates at all.</p>
    <h4>Break ties with friction and safety, never with a few basis points</h4>
    <p>Once two accounts are within a rounding error of each other on effective yield, the tiebreakers are: is my principal insured, how fast can I get my money, and how likely am I to accidentally break a condition. A slightly lower rate with no conditions usually beats a slightly higher rate you have to actively maintain.</p>
    <h4>Common mistakes</h4>
    <p><strong>Letting the number of columns grow.</strong> Seven columns is enough. Add ten more and you'll drown the decision in noise the marketing put there deliberately.</p>
    <p><strong>Comparing across buckets.</strong> A CD "beating" a savings account is a category error — they're solving different problems. Compare only within the same liquidity tier.</p>
    <p><strong>Treating the decision as permanent.</strong> The table takes an evening. Re-run it once or twice a year, or when your balance changes materially — not never, and not weekly.</p>
    <p><strong>Chasing the last few basis points across town.</strong> The move from a near-zero rate to a competitive one is worth real money. The move between two competitive rates rarely pays for the switching friction.</p>
    <h4>Action checklist</h4>
    <p>☐ Build the seven-column table for your current account plus two candidates.<br>
    ☐ Compute effective yield on your actual typical balance for each.<br>
    ☐ Disqualify anything slower than your bucket's required access speed.<br>
    ☐ Confirm insurance status on every finalist.<br>
    ☐ Pick the winner; diary a re-check in six to twelve months.</p>` },
  { title:"The Web3 Due-Diligence Checklist", desc:"The exact custody, audit, and exit questions to answer before funding any on-chain product.", minTier:2,
    body:`<h4>Custody — who actually controls the money</h4>
    <p>Ask, in order: Do I hold the private keys, or does the platform? If the platform holds them, what stops them from freezing or losing my funds? Is this "non-custodial" in name only? You cannot evaluate anything else until you know who controls the assets.</p>
    <p>Be precise about the middle cases. Some products are genuinely non-custodial but require you to sign transactions whose effects you can't read; some are custodial but wrapped in self-custody branding. The test is behavioral, not rhetorical: <em>if the company disappeared tomorrow, could you still move your funds?</em> If the honest answer is no, you are a creditor of that company, whatever the landing page says.</p>
    <h4>Where the yield actually comes from</h4>
    <p>Legitimate on-chain yield has an identifiable source: network staking rewards, trading fees, or lending interest. If you can't explain in one plain sentence where the return originates, assume the worst case — that new depositor money is funding withdrawals, which is unsustainable by definition.</p>
    <p>Each legitimate source also has a natural ceiling. Staking yields are bounded by network issuance; fee-sharing is bounded by real trading volume; lending rates are bounded by what solvent borrowers will pay. When an advertised yield sails past what its claimed source could plausibly generate, the gap is being filled by something you haven't been told about — token emissions that dilute you, hidden leverage, or the next depositor.</p>
    <h4>Audit and code</h4>
    <p>Has the smart contract been audited, by a reputable firm, and how recently? An audit is not a guarantee — it's a floor. No audit at all is a hard stop. An old audit on since-changed code is nearly as bad. Read the audit summary itself, not the project's tweet about it: check whether the findings were fixed or merely "acknowledged," and whether the audited contract address matches the one you'd actually deposit into.</p>
    <h4>Exit liquidity</h4>
    <p>Can you withdraw instantly, or is there a lockup, a queue, or a withdrawal fee that spikes under stress? The time to discover an exit is difficult is <em>before</em> you deposit, not during a panic. Test it: deposit a trivial amount, then withdraw it fully, and time the round trip. The behavior of a small withdrawal on a calm day is the <em>best case</em> you'll ever see — stress only makes it worse.</p>
    <h4>Team, treasury, and admin keys</h4>
    <p>Three structural questions round out the checklist. Who can change the contract — is there an admin key, and who holds it? A protocol where one anonymous key can upgrade the code can, by construction, take everything. What does the treasury look like — is the protocol's own runway held in its own token (fragile) or in hard assets (sturdier)? And is the team identifiable — not because doxxed founders can't fail, but because anonymous ones face no consequence for choosing to.</p>
    <h4>A worked walkthrough</h4>
    <p>Take a hypothetical "stable yield vault" advertising a double-digit return on a dollar-pegged token. Run the list: custody — the vault is a smart contract, but an admin key can pause withdrawals; source — the docs say "delta-neutral strategies," which is a category, not a source; audit — one audit, eighteen months ago, two critical findings marked "acknowledged"; exit — instant "under normal conditions," queued otherwise; team — pseudonymous. That's five yellow-to-red flags out of five categories. No single one is a smoking gun; the pattern is the verdict. You don't need to know <em>how</em> it fails to know that it's built to be able to.</p>
    <h4>The disqualifiers</h4>
    <p>Any one of these ends the evaluation: guaranteed fixed returns, anonymous team with no track record, pressure to deposit quickly, or a yield too high to be explained by a real source. "Too good to be true" is not a cliché in this space — it's a pattern.</p>
    <h4>Action checklist</h4>
    <p>☐ Answer the disappearing-company test in writing before depositing.<br>
    ☐ Write the one-sentence yield source; sanity-check it against the source's natural ceiling.<br>
    ☐ Read the actual audit summary; verify the audited address matches the live contract.<br>
    ☐ Do a small deposit-and-full-withdrawal round trip and time it.<br>
    ☐ Identify the admin key holder and what it can change.<br>
    ☐ If any disqualifier appears, stop — no further diligence can rescue it.</p>` },
  { title:"Custody & Smart-Contract Risk Primer", desc:"Plain-English coverage of the ways on-chain money is lost that have nothing to do with price.", minTier:2,
    body:`<h4>Price is not the main risk</h4>
    <p>Most first-timers focus on whether an asset goes up or down. But the losses that wipe people out are usually structural, not directional. A position can be exactly right on price and still go to zero through the channels below. Understand these first.</p>
    <p><strong>Key loss / mismanagement:</strong> Lose your seed phrase, and the funds are gone permanently — no support line, no reset. Self-custody trades platform risk for personal-responsibility risk. The practical mitigations are unglamorous: the phrase written physically (never photographed, never in cloud notes), stored in more than one location, and tested — actually restore a wallet from your backup once with a trivial balance, so the first time you rely on the backup isn't the emergency.</p>
    <p><strong>Smart-contract exploits:</strong> A bug in the code governing a protocol can drain deposited funds regardless of the market. This is why audit recency and code stability matter — and why time-in-production is itself information. A contract holding significant value untouched for years has survived continuous, well-funded attack attempts; a fork deployed last month has survived nothing yet, however similar its code looks.</p>
    <p><strong>Platform insolvency:</strong> Custodial platforms can become insolvent while your balance still "shows" on their dashboard. A number on a screen is not the same as assets you control. The historical pattern is consistent: withdrawals slow first, then pause "temporarily," then convert into a legal process in which depositors discover they are unsecured creditors. The lesson is not "never use platforms"; it's that a custodial balance is a loan to a company, and should be sized and monitored like one.</p>
    <p><strong>Approval / permission risk:</strong> Interacting with a malicious contract can grant it standing permission to move your tokens later. Understanding and revoking token approvals is a core safety habit. The dangerous part is the word <em>standing</em>: the theft doesn't have to happen when you sign — it can happen months later, from a site you've forgotten. Periodically reviewing and revoking old approvals closes doors you didn't know you'd left open.</p>
    <p><strong>Signature phishing and the fake front-end:</strong> A growing share of losses involve no code exploit at all — just a convincing copy of a real site, or an urgent message, walking someone into signing exactly the transaction the attacker wanted. The defense is procedural: navigate to protocols from your own bookmarks, never from links sent to you; and treat any urgency ("migrate now," "verify your wallet") as the attack signature it usually is.</p>
    <h4>Two habits that neutralize most of this</h4>
    <p><strong>The two-wallet structure.</strong> A "vault" wallet that holds the majority and interacts with nothing, and a "spending" wallet that touches applications and holds only what it's actively using. Most of the risks above can then only ever reach the small wallet.</p>
    <p><strong>Reading before signing.</strong> Modern wallets describe what a transaction does. The habit of actually reading that description — and refusing anything you can't parse — is the single highest-value security behavior available, and it costs ten seconds.</p>
    <h4>The mindset</h4>
    <p>Treat every interaction as irreversible and every counterparty as capable of failing. Size positions so that a total loss of any single position — one protocol, one platform, one wallet — is survivable and non-life-changing. Structural risk doesn't announce itself in advance; sizing is the only defense that works retroactively.</p>
    <h4>Common mistakes</h4>
    <p><strong>Backing up the phrase digitally "just temporarily."</strong> Screenshots and cloud notes are the most-harvested objects in this ecosystem.</p>
    <p><strong>Assuming a big brand equals safety.</strong> The largest platform failures were, at the time, among the most trusted names in the space.</p>
    <p><strong>Approving unlimited amounts by default.</strong> Many interfaces request unlimited token allowances for convenience. Granting the specific amount instead costs a little gas and removes a standing threat.</p>
    <h4>Action checklist</h4>
    <p>☐ Verify your seed backup by restoring it once with a trivial balance.<br>
    ☐ Split holdings into a vault wallet and a spending wallet.<br>
    ☐ Review and revoke stale token approvals; repeat every few months.<br>
    ☐ Bookmark every protocol you use; never enter through sent links.<br>
    ☐ Re-size any custodial balance you couldn't afford to have frozen for a year.</p>` },
  { title:"Reading a Yield Opportunity: A Worked Method", desc:"A step-by-step lens for pulling apart any 'passive income' crypto offer before you commit a dollar.", minTier:2,
    body:`<h4>Step 1 — Name the mechanism</h4>
    <p>Write one sentence: "This pays a return because ___." Staking rewards, lending demand, fee-sharing — these are real. "Because more people are joining" is not a mechanism; it's a warning.</p>
    <p>Hold the sentence to a standard: it should name who pays, and why they're willing to. "Borrowers pay interest to borrow against their collateral" passes. "The protocol generates yield through advanced strategies" fails — that's a mechanism-shaped sentence with no mechanism inside. If the documentation can't produce the sentence, the marketing team wrote the yield, not the engineers.</p>
    <h4>Step 2 — Stress the rate</h4>
    <p>Compare the advertised yield to boring, well-understood benchmarks. If it dwarfs them by an order of magnitude, the extra return is compensation for risk you haven't identified yet. Find the risk before you find it the hard way.</p>
    <p>Then decompose the number. Many advertised APYs are a blend: a small "real" component paid in the asset you deposited, plus a large "incentive" component paid in the protocol's own token. The incentive part is real money only at the moment you sell it — its value depends on a token price that the emissions themselves push downward. Re-state the yield with the incentive component discounted or removed, and see whether you'd still be interested. Often the honest number is a quarter of the advertised one.</p>
    <h4>Step 3 — Map the exit</h4>
    <p>Before depositing, describe exactly how you'd get 100% of your money back and how long it would take under normal <em>and</em> stressed conditions. If the exit is vague, the position is a trap regardless of the yield.</p>
    <p>Stress-mapping means asking the ugly versions: What happens to the withdrawal queue if a quarter of depositors leave the same week? Is the exit dependent on a liquid market for a token that only trades on one venue? Does the peg or share price I exit at depend on the very confidence that would be collapsing in that scenario? A yield product is really a package of an entry, a stream, and an exit — and the exit is the part that's tested least and matters most.</p>
    <h4>Step 4 — Size it as if it could go to zero</h4>
    <p>Decide the position size on the assumption that this specific product could return nothing. If that size still lets you sleep, proceed. If not, the yield was never the point — your risk tolerance was the constraint all along.</p>
    <p>A useful discipline: compute the annual dollars the position would actually generate at your honest (Step 2) rate, and ask whether that dollar figure justifies the tail risk. A double-digit yield on a small, survivable position often earns less per year than a boring insured rate on your reserve — in which case the position is entertainment, and should be sized like entertainment.</p>
    <h4>The method applied, end to end</h4>
    <p>Picture a lending-market deposit advertising a strong rate on a major asset. Step 1: the sentence exists — borrowers pay to leverage against collateral. Pass. Step 2: the rate is elevated but within sight of what real borrowing demand pays; only a sliver is token incentives. Pass, with the honest rate noted. Step 3: withdrawals are instant while utilization is normal, but can queue if nearly all supplied funds are borrowed — a real, bounded, understandable risk. Conditional pass. Step 4: sized so a total loss stings but changes nothing. The result isn't "safe" — nothing here is — it's <em>understood</em>, which is the only standard available.</p>
    <p>Now the same method on a "guaranteed" high-yield program: Step 1 fails (no payer named), and the evaluation is already over. Three steps saved.</p>
    <h4>Common mistakes</h4>
    <p><strong>Letting APY precision imply legitimacy.</strong> A yield quoted to two decimal places is not more real than a round number; it's just better typography.</p>
    <p><strong>Evaluating the protocol but not the wrapper.</strong> A sound underlying protocol accessed through a third-party vault inherits the vault's risks too — you hold the weakest layer.</p>
    <p><strong>Anchoring on the entry-day rate.</strong> Variable yields vary. Decide in advance at what rate the position no longer pays for its risk, so drift doesn't quietly strand you.</p>
    <h4>Action checklist</h4>
    <p>☐ Write the one-sentence mechanism, naming who pays and why.<br>
    ☐ Restate the yield with token incentives discounted; keep only the honest number.<br>
    ☐ Write the exit path under calm and stress; test a small round trip.<br>
    ☐ Size for zero; compute the honest annual dollars and judge whether they're worth it.<br>
    ☐ Set the rate floor at which you'll exit, before you enter.</p>` },
  { title:"The Income-Layering Framework", desc:"Building a laddered, auditable income approach across liquidity tiers — the structure, not a stock tip.", minTier:3,
    body:`<h4>The principle: match liquidity to need, then ladder</h4>
    <p>Instead of one lump of cash earning one rate, you split capital across instruments with staggered access and maturities. This gives you a blend of liquidity and higher guaranteed rates without gambling on timing.</p>
    <h4>The three layers</h4>
    <p><strong>Immediate layer:</strong> Instantly accessible savings for anything unexpected. Sized to cover near-term needs so you never have to break a longer instrument early. This layer's return is a secondary concern; its job is to make the rest of the structure unbreakable.</p>
    <p><strong>Short-ladder layer:</strong> A sequence of short-maturity instruments (e.g. CDs or T-bills across staggered maturities) so that something is always maturing soon. As each matures, you either spend it or roll it to the back of the ladder.</p>
    <p><strong>Anchor layer:</strong> Longer-maturity instruments for the portion you're confident you won't need, capturing the best guaranteed rates available to you.</p>
    <h4>Building the ladder: a worked example</h4>
    <p>Suppose $24,000 is available beyond your immediate layer. A four-rung quarterly ladder places $6,000 each into instruments maturing in 3, 6, 9, and 12 months. In three months, the first rung matures; you roll it into a new 12-month instrument. From that point on, a rung matures every quarter, and every rung in the ladder is a 12-month instrument earning 12-month rates — while you retain quarterly access to a quarter of the capital.</p>
    <p>That's the quiet magic of the structure: after one full cycle, <em>all</em> of your laddered money earns the longer rate, but your effective liquidity is that of a much shorter instrument. You've manufactured a product no bank sells.</p>
    <p>Choose the rung interval from your life, not from theory: quarterly rungs suit most households; monthly rungs suit tighter cash flow; semiannual rungs suit larger anchors. The interval is simply the longest you're comfortable waiting for the next unlock.</p>
    <h4>Why laddering beats guessing</h4>
    <p>A ladder means you never have to predict where rates go. When rates rise, maturing rungs roll into higher rates. When they fall, your longer rungs are still locked in. You've replaced a forecast with a structure — the entire point of disciplined income planning.</p>
    <p>Notice what this does psychologically as well as financially: every rate scenario now contains good news. Rising rates? Your next roll improves. Falling rates? Your locked rungs look smarter every month. The ladder converts rate anxiety — the thing that keeps people frozen in cash — into a scheduled, boring decision that recurs on calendar dates you chose.</p>
    <h4>Handling the roll decision</h4>
    <p>At each maturity, the decision is deliberately small: spend, hold in the immediate layer, or roll to the back. Write the default in advance ("roll unless a planned expense is inside the next interval") so the recurring decision takes one minute, not a research project. If your situation changes — income drops, a big purchase appears — the ladder de-builds gracefully: you simply stop rolling, and the structure returns your capital in scheduled installments without a single early-withdrawal penalty.</p>
    <h4>Keep it auditable</h4>
    <p>Track each rung: instrument, amount, rate, maturity, and destination on maturity. A one-page ledger of your ladder turns "I have some CDs somewhere" into a system you actually control. The audit page is also your defense against drift: it's where you notice a rung quietly auto-renewed at a bad rate, or that your anchor layer has grown past what "confident I won't need it" honestly covers.</p>
    <h4>Common mistakes</h4>
    <p><strong>Letting instruments auto-renew.</strong> Auto-renewal defaults often roll you into uncompetitive rates. Every maturity should pass through your hands, even if the answer is almost always "roll."</p>
    <p><strong>Building the ladder before the immediate layer.</strong> A ladder funded with money you might need next month isn't a ladder; it's a penalty schedule.</p>
    <p><strong>Chasing exotic rungs.</strong> The framework's value is its predictability. Instruments with credit risk or unclear exit terms don't belong in it — they belong in a different, explicitly risk-bearing part of your plan.</p>
    <p><strong>Over-engineering.</strong> Twelve rungs isn't more sophisticated than four; it's just twelve decisions instead of four. Match complexity to the size of the capital.</p>
    <h4>Action checklist</h4>
    <p>☐ Confirm the immediate layer is fully funded first.<br>
    ☐ Choose a rung interval that matches your cash-flow rhythm.<br>
    ☐ Split the laddered amount evenly across the first cycle's maturities.<br>
    ☐ Write your default roll rule in one sentence.<br>
    ☐ Build the one-page rung ledger; update it at every maturity.<br>
    ☐ Turn off auto-renewal everywhere.</p>` },
  { title:"A Sober Look at Automated & Algorithmic Strategies", desc:"How to evaluate 'set it and forget it' automated income tools without the hype.", minTier:3,
    body:`<h4>Automation amplifies whatever it's given</h4>
    <p>An automated strategy is only as sound as its underlying logic and its risk controls. Automation doesn't reduce risk — it removes hesitation, which cuts both ways. A good rule executed without hesitation compounds; a flawed rule executed without hesitation compounds faster. Evaluate the strategy as if you were running it by hand first: if you wouldn't take these exact trades manually, wiring them to run unattended doesn't make them better — it makes them unattended.</p>
    <h4>The questions that matter</h4>
    <p>What exactly triggers a buy or sell? What happens in the conditions the strategy <em>wasn't</em> designed for? Is there a hard stop that limits catastrophic loss, and does it actually execute under stress (or just in the backtest)? Who holds the funds while the automation runs?</p>
    <p>Add three operational ones that separate hobby setups from durable ones. <em>What happens when the automation itself fails</em> — an expired credential, an API outage, a platform maintenance window — does the system fail safe (flat, or holding a known position) or fail open (mid-position, unmonitored)? <em>How will you know</em> — does it alert you on every action and every error, or only on success? And <em>what's the manual override</em> — can you flatten everything from your phone in under a minute, and have you rehearsed doing it?</p>
    <h4>Backtests lie by omission</h4>
    <p>A strategy tuned to past data will always look good on that data. The real question is how it behaves on conditions it has never seen. Treat impressive historical returns as marketing, not evidence.</p>
    <p>Know the three standard distortions. <em>Overfitting:</em> enough parameters can make any historical curve beautiful — and the more beautiful the backtest, the more suspicious you should be. <em>Frictionless fills:</em> backtests trade at prices real orders wouldn't get, with no spread, slippage, or missed executions; strategies that trade often are hurt most. <em>Regime dependence:</em> a strategy born in one kind of market often contains that market as a hidden assumption. Ask what regime the backtest covers, and what happens in its opposite.</p>
    <h4>A worked evaluation</h4>
    <p>Take a simple momentum system that rotates between a leveraged position and a defensive one on a signal. Run the questions: triggers are explicit and mechanical — good. Undesigned conditions: choppy, direction-less markets make it whipsaw, buying strength that immediately fades — known, and quantifiable in the backtest's worst stretches. Hard stop: exists, but executes at market open, so an overnight gap can jump past it — a real, bounded hole to acknowledge. Custody: funds sit at a regulated broker; the automation only sends orders — good separation. Failure mode: if the job scheduler dies, the position simply stays put and an alert fires — fail-safe, acceptable. Verdict: runnable, at a size that respects the gap risk and the whipsaw stretches. Not because it's guaranteed to work — because every failure mode has been named and priced.</p>
    <h4>The discipline</h4>
    <p>Never automate more capital than you'd be willing to lose to a logic flaw you didn't catch. Start small, watch it behave through a real cycle, and scale only after you've seen it handle a bad stretch — not just a good one. The bad stretch is the audition; the good stretch is just weather.</p>
    <p>Keep a log the automation writes for you: every trade, every signal, every error, timestamped. When (not if) something surprises you, the log is the difference between a diagnosis and a shrug.</p>
    <h4>Common mistakes</h4>
    <p><strong>Confusing activity with edge.</strong> A bot that trades daily feels productive; frequency multiplies costs, not returns.</p>
    <p><strong>Silent failure tolerance.</strong> The most expensive state is "I assumed it was running." Alerts on errors matter more than alerts on trades.</p>
    <p><strong>Scaling after a lucky month.</strong> Size decisions made during a winning streak are made by the streak, not by you. Pre-commit the scaling rule.</p>
    <p><strong>Skipping the rehearsal.</strong> If you've never practiced the emergency flatten, you don't have an emergency plan — you have an emergency hope.</p>
    <h4>Action checklist</h4>
    <p>☐ Write the strategy's rules in plain language; confirm you'd take the trades by hand.<br>
    ☐ Name the market condition it's worst in, and its worst historical stretch.<br>
    ☐ Verify the failure mode is fail-safe and every error alerts you.<br>
    ☐ Rehearse the manual flatten once.<br>
    ☐ Start at a size whose total loss you'd shrug off; pre-write the scaling rule.<br>
    ☐ Keep the full action/error log from day one.</p>` },
  { title:"Position Sizing Over Prediction", desc:"The single habit that separates durable investors from lucky ones — applied across every asset class.", minTier:3,
    body:`<h4>You cannot reliably predict. You can always control size.</h4>
    <p>The seductive question is "will this go up?" The durable question is "how much should I commit given I might be wrong?" The second question is answerable; the first mostly isn't. Shifting your energy from prediction to sizing is the highest-leverage change most people can make.</p>
    <p>Here's the asymmetry that makes this true: being wrong about direction costs you the position; being wrong about size costs you the portfolio. History's blown-up accounts are overwhelmingly sizing failures wearing prediction-failure costumes — the thesis being wrong was survivable, the size made it fatal.</p>
    <h4>The survivability test</h4>
    <p>For any position, ask: if this went to zero, would it change my life? If yes, the position is too big — full stop, regardless of your conviction. Conviction and correct sizing are independent; you can be right about the thesis and still ruined by the size.</p>
    <p>Make the test concrete with numbers. On a $50,000 investable base, a 4% position is $2,000 — a total loss stings for a week and changes nothing. A 30% position is $15,000 — a total loss is a year of saving, and worse, it damages the base from which you'd recover. Recovery math is brutal and worth memorizing: a 20% loss needs 25% to get back to even; a 50% loss needs 100%; an 80% loss needs 400%. Sizing isn't about avoiding losses — it's about keeping every loss in the region where the recovery math stays friendly.</p>
    <h4>A simple sizing structure that works</h4>
    <p>You don't need formulas; you need tiers, written down. For example: <em>core holdings</em> (broad, boring, diversified) with no single-position cap needed; <em>conviction positions</em> capped at a mid-single-digit percent each; <em>speculative positions</em> — anything that could genuinely go to zero, which includes most of web3 — capped at 1–2% each with a cap on the whole speculative sleeve. The exact numbers matter less than that they exist before the opportunity shows up, and that the highest-risk category has both a per-position and a total ceiling.</p>
    <p>Correlation is the sleeper clause: five "different" positions that all live or die on the same underlying trend are one position wearing five names. Size the <em>theme</em>, not just the tickers.</p>
    <h4>Concentration vs. diversification, honestly</h4>
    <p>Concentration builds wealth; diversification protects it. Which you weight toward depends on how much you can afford to be wrong. Most people over-concentrate in what's exciting and under-diversify against what they haven't imagined. A sober allocation assumes your favorite idea is the one that fails.</p>
    <p>There's an honest place for concentration: early, small accounts, where the dollars at risk are survivable and the knowledge gained is the real return. The mistake is carrying that posture unchanged into an account whose loss would now matter. The account grew; the sizing rules have to grow up with it.</p>
    <h4>Write the rule before the emotion</h4>
    <p>Decide your maximum position size as a percentage of investable assets <em>before</em> you're excited about a specific opportunity. A rule written in calm survives the moment of temptation; a decision made in excitement rarely does.</p>
    <p>Extend the pre-commitment to adding and trimming: under what conditions will you add to a winner (and up to what cap), and at what size will you trim a position that's grown past its tier? A position that doubles has silently doubled its risk contribution too — the trim isn't a lack of conviction, it's the rule doing its job.</p>
    <h4>Common mistakes</h4>
    <p><strong>Sizing by dollar comfort instead of percentage.</strong> "$5,000 feels fine" means nothing without the base — it's 2% of one portfolio and 25% of another.</p>
    <p><strong>Averaging down past the cap.</strong> Adding to a loser until it's your biggest position converts a small mistake into a defining one.</p>
    <p><strong>Counting correlated positions as diversification.</strong> Same theme, same fate, same drawdown — no matter how many line items it spans.</p>
    <p><strong>Rewriting the rules mid-excitement.</strong> If a "special situation" needs an exception to your caps, the caps are working. That's the feeling they exist to overrule.</p>
    <h4>Action checklist</h4>
    <p>☐ Write your tier structure: core / conviction / speculative, with per-position and per-sleeve caps.<br>
    ☐ Run the survivability test on every current position; flag anything whose zero would change your life.<br>
    ☐ Group current positions by theme and check the theme sizes, not just the tickers.<br>
    ☐ Pre-write your add and trim rules.<br>
    ☐ Re-check tier sizes whenever the account has grown materially.</p>` },
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
