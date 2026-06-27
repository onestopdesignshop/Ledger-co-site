/**
 * Ledger & Co. — Paddle Checkout Integration
 * Shared by index.html and capital-systems-suite.html
 *
 * ============================================================
 * SETUP — STATUS: COMPLETE
 * ============================================================
 * 1. PADDLE_TOKENS  — DONE. Both sandbox and production tokens filled in.
 * 2. PADDLE_ENVIRONMENT — "production" (live mode).
 * 3. PRICE_IDS — DONE. All 28 real Price IDs filled in.
 *
 * UPDATED: openPaddleCheckout now passes the signed-in user's email to
 * Paddle (as customer.email + customData.email) so the webhook can match
 * the purchase to the right account. The email comes from
 * window.__ledgerUserEmail, which main.js sets after sign-in.
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
  // ---------- Ledger & Co. main site membership tiers ----------
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

  // ---------- Capital Systems Suite ----------
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

// ============================================================
// Below this line: integration logic.
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
      if (data.name === "checkout.completed") {
        console.log("Checkout completed:", data);
        // Optional: redirect to a thank-you page here.
      }
    },
  });

  console.log("Paddle initialized in " + PADDLE_ENVIRONMENT + " mode.");
})();

/**
 * Opens a Paddle checkout overlay for the given Price ID.
 * Passes the signed-in user's email through so the webhook can match the
 * purchase to the correct account.
 */
function openPaddleCheckout(priceId) {
  if (!priceId || priceId.startsWith("pri_REPLACE_ME")) {
    alert(
      "This product isn't fully configured yet — its Paddle Price ID " +
      "hasn't been set. (Dev note: check PRICE_IDS in paddle-checkout.js)"
    );
    console.warn("Attempted checkout with unconfigured price ID:", priceId);
    return;
  }

  // Pull the signed-in user's email (set by main.js after sign-in).
  const userEmail =
    (typeof window !== "undefined" && window.__ledgerUserEmail) || null;

  const checkoutOptions = {
    items: [{ priceId: priceId, quantity: 1 }],
  };

  if (userEmail) {
    checkoutOptions.customer = { email: userEmail };
    checkoutOptions.customData = { email: userEmail };
  }

  Paddle.Checkout.open(checkoutOptions);
}

/**
 * Automatically wires up any element with a [data-price-id] attribute.
 * Usage in HTML:
 *   <button data-price-id="foundation.payInFull">Get Foundation</button>
 */
function wireUpButtons() {
  const buttons = document.querySelectorAll("[data-price-id]");
  buttons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const path = btn.getAttribute("data-price-id");
      const priceId = resolvePricePath(path);
      openPaddleCheckout(priceId);
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
