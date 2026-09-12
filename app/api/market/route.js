// Live market data — fetched server-side from Yahoo Finance (no API key, no CORS issues).
// The client calls /api/market; this handler fetches the quotes and returns clean JSON.
export const dynamic = "force-dynamic";

const SYMBOLS = [
  { y: "^NSEI", label: "NIFTY 50" },
  { y: "^BSESN", label: "SENSEX" },
  { y: "^NSEBANK", label: "BANK NIFTY" },
  { y: "^CNXIT", label: "NIFTY IT" },
  { y: "^NSEMDCP50", label: "NIFTY MIDCAP" },
  { y: "^INDIAVIX", label: "INDIA VIX" },
  { y: "INR=X", label: "USD / INR" },
  { y: "GC=F", label: "GOLD $/oz" },
  { y: "CL=F", label: "CRUDE $/bbl" },
];

let cache = { t: 0, data: null };

async function quote(sym) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=5d`;
  const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; SpectraAssets/1.0)" }, cache: "no-store" });
  if (!r.ok) throw new Error("HTTP " + r.status);
  const j = await r.json();
  const m = j?.chart?.result?.[0]?.meta;
  if (!m || typeof m.regularMarketPrice !== "number") throw new Error("no price");
  const price = m.regularMarketPrice;
  const prev = m.chartPreviousClose ?? m.previousClose ?? price;
  const chg = prev ? ((price - prev) / prev) * 100 : 0;
  return { price, chg };
}

export async function GET() {
  if (cache.data && Date.now() - cache.t < 30000) {
    return Response.json(cache.data);
  }
  await Promise.all(
    SYMBOLS.map(async (s) => {
      try { s._d = await quote(s.y); } catch { s._d = null; }
    })
  );
  const usdinr = SYMBOLS.find((s) => s.y === "INR=X")?._d?.price || null;
  const goldOz = SYMBOLS.find((s) => s.y === "GC=F");
  const rows = [];
  for (const s of SYMBOLS) {
    if (s.y === "GC=F" || s.y === "CL=F") continue; // handled/append below
    if (s._d) rows.push({ label: s.label, price: s._d.price, chg: s._d.chg });
  }
  // Gold converted to ₹ / 10g using live USD/INR
  if (goldOz?._d && usdinr) {
    rows.push({ label: "GOLD ₹/10g", price: (goldOz._d.price * usdinr / 31.1035) * 10, chg: goldOz._d.chg });
  }
  const crude = SYMBOLS.find((s) => s.y === "CL=F");
  if (crude?._d) rows.push({ label: "CRUDE $/bbl", price: crude._d.price, chg: crude._d.chg });

  const payload = { rows, at: Date.now(), live: rows.length > 0 };
  if (rows.length) cache = { t: Date.now(), data: payload };
  return Response.json(payload);
}
