// ============ CONTENT LIBRARY ============
// Evergreen educational frameworks — no live rates, always accurate.
// minTier gates each guide: 1=Yield Map, 2=Full Ledger, 3=Annotated Portfolio, 4=All-Access.
// (All-Access = tier 4 sees everything, since effectiveTier >= minTier for all.)
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
      <p><strong>Trap 1 — The balance cap.</strong> A market-leading APY that only applies up to a low balance ceiling (e.g. the boosted rate applies to the first few thousand dollars only, with everything above earning a fraction of it). Always find the cap before you're impressed by the rate.</p>
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
      <p>Marketing wins when every product is described differently. You win by forcing them into identical columns. For each candidate account, fill in: <em>base rate</em>, <em>conditional rate & its condition</em>, <em>balance cap</em>, <em>monthly fee</em>, <em>minimum to earn</em>, <em>insurance (FDIC/NCUA)</em>, <em>access speed</em>.</p>
      <h4>Then compute your number, not theirs</h4>
      <p>Estimate the interest <em>you</em> would actually earn on <em>your</em> typical balance, after fees and given whether you'll meet the conditions. This "effective yield to you" is frequently very different from the headline — and it's the only number that should drive the decision.</p>
      <h4>Break ties with friction and safety, never with a few basis points</h4>
      <p>Once two accounts are within a rounding error of each other on effective yield, the tiebreakers are: is my principal insured, how fast can I get my money, and how likely am I to accidentally break a condition. A slightly lower rate with no conditions usually beats a slightly higher rate you have to actively maintain.</p>`
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
