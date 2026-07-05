/**
 * Ledger & Co. — Paddle Checkout Integration
 * Shared by index.html and capital-systems-suite.html
 *
 * ============================================================
 * SETUP — STATUS: COMPLETE
 * 1. PADDLE_TOKENS — filled in. 2. Environment: production.
 * 3. PRICE_IDS — all 28 live Price IDs.
 *
 * NEW IN THIS VERSION — the post-purchase experience:
 * When Paddle reports checkout.completed, the page now:
 *   1. Closes the overlay and shows "Purchase complete — unlocking
 *      your library…" full-screen.
 *   2. Polls the database until the webhook has written the buyer's
 *      access row (usually 2–5 seconds).
 *   3. Then either opens the member dashboard right there (index.html)
 *      or shows a "OPEN YOUR LIBRARY →" button (Capital Systems page).
 * No more silent overlay-close leaving the buyer wondering.
 * ============================================================
 */

// ---- 1. Client-side tokens (safe to expose publicly) ----
const PADDLE_TOKENS = {
  sandbox: "live_1169b590d533bfcc1e8de0587f0",
  production: "live_333d303a9a968277c51360d7111",
};

// ---- 2. Environment ----
const PADDLE_ENVIRONMENT = "production"; // live mode

// ---- 3. Price ID map ----
const PRICE_IDS = {
  yieldMap: {
    monthly:   "pri_01kw30xwd5e5vqb1ys1jwdcmv4",
    quarterly: "pri_01kw30wq20hwz77sf8cw9dqgv9",
    annual:    "pri_01kw30sxdvgprwh6fwevjsht81",
    lifetime:  "pri_01kw30pbncgebkjdeyjqws9azy",
  },
  fullLedger: {
    monthly:   "pri_01kw328ryam9fpbj0h7rmt8dbv",
    quarterly: "pri_01kw327tgfzh7x09z8q71e2sqh",
    annual:    "pri_01kw326be37xc43gaw0eyyfwrh",
    lifetime:  "pri_01kw322y5agp54ckp2h8dmsyn5",
  },
  annotatedPortfolio: {
    monthly:   "pri_01kw31jb94zax5b099xxtzn6xs",
    quarterly: "pri_01kw31hbkqmjnn3papbxvyq8p5",
    annual:    "pri_01kw31fa7vffn8cr1dp2zrdkcb",
    lifetime:  "pri_01kw31df78xnprnt4jb4k28swn",
  },
  allAccess: {
    monthly:   "pri_01kw32pc2gk7825qxzfb3c9ztz",
    quarterly: "pri_01kw32n8381d692yfwygppwsrw",
    annual:    "pri_01kw32hgyx1j9g2hvx0na6gde2",
    lifetime:  "pri_01kw32g13r3vmtnxmmcqx20f6p",
  },
  foundation: {
    payInFull: "pri_01kw35kg3nebnzrqkcx8kzgc0b",
    weekly:    "pri_01kw392b9fxb2ra8j1n2mwkjnb",
    biweekly:  "pri_01kw37y2y4dhmarcy2r0f6gjqx",
    monthly:   "pri_01kw37ky4pyg57qhsb67wxz6bw",
  },
  operator: {
    payInFull: "pri_01kw396zvqmtvfxr7pdmmvzf6g",
    weekly:    "pri_01kw39k79yngbjkx6qdnpcrkjs",
    biweekly:  "pri_01kw39g5a8q81npd75bh23173x",
    monthly:   "pri_01kw39b3qa3wqdtstr7qjp9xjz",
  },
  institutional: {
    payInFull: "pri_01kw39p6z17zmahqgdybvr2rs4",
    weekly:    "pri_01kw39wyc5zhvqvmjm3jaztbny",
    biweekly:  "pri_01kw39tsp5n46sghczaxmkn3mx",
    monthly:   "pri_01kw39sa68fpfv709ec0kv9mcf",
  },
};

// Which database tier each product family unlocks (must match the webhook)
const TIER_OF_FAMILY = {
  yieldMap: 1, fullLedger: 2, annotatedPortfolio: 3, allAccess: 4,
  foundation: 5, operator: 6, institutional: 7,
};

// Remembered at click time so the completion handler knows what to wait for
let __lastPurchase = { tier: null, family: null };

// ============================================================
// Init
// ============================================================
(function initPaddle() {
  if (typeof Paddle === "undefined") {
    console.error(
      "Paddle.js did not load. Make sure the script tag " +
      "<script src='https://cdn.paddle.com/paddle/v2/paddle.js'></script> " +
      "is included BEFORE this file in your HTML."
    );
    return;
  }
  Paddle.Environment.set(PADDLE_ENVIRONMENT);
  Paddle.Initialize({
    token: PADDLE_TOKENS[PADDLE_ENVIRONMENT],
    eventCallback: function (data) {
      if (data && data.name === "checkout.completed") {
        console.log("Checkout completed:", data);
        try { handlePurchaseComplete(); } catch (e) { console.error(e); }
      }
    },
  });
  console.log("Paddle initialized in " + PADDLE_ENVIRONMENT + " mode.");
})();

// ============================================================
// Post-purchase experience
// ============================================================
function purchaseOverlayEl() {
  let o = document.getElementById("purchaseCompleteOverlay");
  if (o) return o;
  o = document.createElement("div");
  o.id = "purchaseCompleteOverlay";
  o.style.cssText =
    "position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;" +
    "background:rgba(6,12,22,.96);color:#f4efe4;font-family:Georgia,serif;text-align:center;padding:24px;";
  o.innerHTML =
    '<div style="max-width:440px;">' +
    '<div style="font-size:44px;line-height:1;">✓</div>' +
    '<h2 style="font-size:26px;margin:14px 0 8px;color:#f4efe4;">Purchase complete</h2>' +
    '<p id="pcStatus" style="color:#c9a24b;font-size:15px;letter-spacing:.03em;">Unlocking your library…</p>' +
    '<div id="pcAction" style="margin-top:22px;"></div>' +
    '<p style="margin-top:26px;font-size:12px;opacity:.55;">A receipt has been emailed to you by our payment partner.</p>' +
    "</div>";
  document.body.appendChild(o);
  return o;
}

function pcSetStatus(msg) {
  const s = document.getElementById("pcStatus");
  if (s) s.textContent = msg;
}
function pcShowButton(label, onclick) {
  const a = document.getElementById("pcAction");
  if (!a) return;
  a.innerHTML = "";
  const b = document.createElement("button");
  b.textContent = label;
  b.style.cssText =
    "background:transparent;color:#c9a24b;border:1px solid #c9a24b;padding:14px 30px;" +
    "font-family:'IBM Plex Mono',monospace;font-size:13px;letter-spacing:.1em;cursor:pointer;";
  b.addEventListener("click", onclick);
  a.appendChild(b);
}

async function getSessionEmail() {
  try {
    if (window.__ledgerSupabaseClient) {
      const { data } = await window.__ledgerSupabaseClient.auth.getSession();
      return data?.session?.user?.email?.toLowerCase() ?? null;
    }
  } catch (e) {}
  return (window.__ledgerUserEmail || null);
}

async function accessRowExists(email, tier) {
  try {
    const sb = window.__ledgerSupabaseClient;
    if (!sb || !email) return false;
    let q = sb.from("subscriptions").select("tier").eq("user_email", email).eq("status", "active");
    if (tier) q = q.eq("tier", tier);
    const { data, error } = await q.limit(1);
    if (error) return false;
    return !!(data && data.length);
  } catch (e) { return false; }
}

async function handlePurchaseComplete() {
  // Close the Paddle overlay so our confirmation owns the screen
  try { Paddle.Checkout.close(); } catch (e) {}
  purchaseOverlayEl();
  pcSetStatus("Unlocking your library…");

  const email = await getSessionEmail();
  const tier = __lastPurchase.tier;
  const onIndex = typeof loadSubscriptionAndShowDashboard === "function";

  // Poll for the webhook-written access row: every 1.5s, up to 30s
  let unlocked = false;
  for (let i = 0; i < 20; i++) {
    if (await accessRowExists(email, tier)) { unlocked = true; break; }
    await new Promise((r) => setTimeout(r, 1500));
    if (i === 4) pcSetStatus("Confirming your payment with the bank…");
    if (i === 12) pcSetStatus("Almost there — finalizing your access…");
  }

  if (unlocked) {
    pcSetStatus("Your library is unlocked.");
    if (onIndex) {
      pcShowButton("OPEN YOUR LIBRARY →", async function () {
        const o = document.getElementById("purchaseCompleteOverlay");
        if (o) o.remove();
        try {
          // Refresh session state and open the dashboard in place
          if (typeof restoreSession === "function") { await restoreSession(); }
          else { await loadSubscriptionAndShowDashboard(); }
        } catch (e) { location.reload(); }
      });
      // Also auto-open after a short beat for buyers who don't tap
      setTimeout(async function () {
        const o = document.getElementById("purchaseCompleteOverlay");
        if (!o) return;
        o.remove();
        try {
          if (typeof restoreSession === "function") { await restoreSession(); }
          else { await loadSubscriptionAndShowDashboard(); }
        } catch (e) { location.reload(); }
      }, 3500);
    } else {
      // Capital Systems page (no dashboard here) — send them to it
      pcShowButton("OPEN YOUR LIBRARY →", function () {
        location.href = "index.html";
      });
    }
  } else {
    // Payment succeeded but the row hasn't shown up yet — never leave them stranded
    pcSetStatus("Payment received. Your access is being provisioned and appears within a few minutes.");
    pcShowButton(onIndex ? "REFRESH MY ACCOUNT" : "GO TO MY ACCOUNT", function () {
      if (onIndex) location.reload(); else location.href = "index.html";
    });
  }
}

// ============================================================
// Checkout open
// ============================================================
async function openPaddleCheckout(priceId) {
  if (!priceId || priceId.startsWith("pri_REPLACE_ME")) {
    alert(
      "This product isn't fully configured yet — its Paddle Price ID " +
      "hasn't been set. (Dev note: check PRICE_IDS in paddle-checkout.js)"
    );
    console.warn("Attempted checkout with unconfigured price ID:", priceId);
    return;
  }

  // Resolve the buyer's email, most-reliable source first:
  //   1. Live Supabase session (always current if signed in)
  //   2. window.__ledgerUserEmail (fast fallback set by main.js)
  let userEmail = null;
  try {
    if (typeof window !== "undefined" && window.supabase &&
        window.__ledgerSupabaseClient) {
      const { data } = await window.__ledgerSupabaseClient.auth.getSession();
      userEmail = data?.session?.user?.email ?? null;
    }
  } catch (e) {
    console.warn("Could not read live session for checkout email:", e);
  }
  if (!userEmail) {
    userEmail =
      (typeof window !== "undefined" && window.__ledgerUserEmail) || null;
  }

  if (!userEmail) {
    alert(
      "Please sign in or create your account first, then choose your plan — " +
      "that way your purchase is linked to your account automatically and " +
      "your library unlocks right away."
    );
    if (typeof openAuthModal === "function") openAuthModal("signin");
    return;
  }

  const checkoutOptions = {
    items: [{ priceId: priceId, quantity: 1 }],
    customer: { email: userEmail },
    customData: { email: userEmail },
  };

  Paddle.Checkout.open(checkoutOptions);
}

/**
 * Wires up any element with a [data-price-id] attribute.
 * Usage: <button data-price-id="foundation.payInFull">Get Foundation</button>
 */
function wireUpButtons() {
  const buttons = document.querySelectorAll("[data-price-id]");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", async function (e) {
      e.preventDefault();
      const path = btn.getAttribute("data-price-id");
      const priceId = resolvePricePath(path);
      // Remember what was bought so the completion handler can wait for it
      const family = String(path || "").split(".")[0];
      __lastPurchase = { family: family, tier: TIER_OF_FAMILY[family] ?? null };
      await openPaddleCheckout(priceId);
    });
  });
}

function resolvePricePath(path) {
  const parts = path.split(".");
  let current = PRICE_IDS;
  for (const part of parts) {
    if (current && typeof current === "object" && part in current) {
      current = current[part];
    } else {
      console.error("Could not resolve price path:", path);
      return null;
    }
  }
  return current;
}

document.addEventListener("DOMContentLoaded", wireUpButtons);
