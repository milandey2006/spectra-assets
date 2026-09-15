"use client";
import React from "react";

/* ============================================================================
   Spectra Assets, full site, ported from the Claude Design canvas and
   populated with the client's real website content.
   Colours: navy #0F1729 / #0A1929 · teal #009B8D (hover #007D72) · gold #C9A84C
   Font: Inter.  Single-file client component (also used by the no-Node preview).
   ========================================================================== */

const TEAL = "#009B8D";
const NAVY = "#0F1729";
const GOLD = "#C9A84C";
const LOGO = "/assets/logo.png";

/* parse a CSS string into a React style object (mirrors dc-runtime cssToObj) */
function cssObj(css) {
  const o = {};
  if (!css) return o;
  for (const decl of String(css).split(";")) {
    const i = decl.indexOf(":");
    if (i < 0) continue;
    const k = decl.slice(0, i).trim();
    if (!k) continue;
    const v = decl.slice(i + 1).trim();
    o[k.startsWith("--") ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = v;
  }
  return o;
}

/* styled element with optional hover style string. `as` picks the tag. */
function S({ as = "div", css = "", hover = "", style, children, onMouseEnter, onMouseLeave, ...rest }) {
  const [h, setH] = React.useState(false);
  const Tag = as;
  const base = cssObj(css);
  const ho = hover && h ? cssObj(hover) : null;
  return (
    <Tag
      {...rest}
      onMouseEnter={(e) => { setH(true); onMouseEnter && onMouseEnter(e); }}
      onMouseLeave={(e) => { setH(false); onMouseLeave && onMouseLeave(e); }}
      style={{ ...base, ...(ho || {}), ...(style || {}) }}
    >
      {children}
    </Tag>
  );
}

/* tiny stroke-icon helper */
function Ic({ d, size = 14, sw = 2, children, box = "0 0 24 24", fill = "none", stroke = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox={box} fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
      {d ? <path d={d}></path> : children}
    </svg>
  );
}

/* ===================== CONTENT DATA (client's copy) ===================== */

const PRINCIPLES = [
  { t: "We listen before we advise.", d: "Understanding always comes before recommending." },
  { t: "Every financial decision is connected.", d: "The best solutions are created when investments, protection and planning work together." },
  { t: "Simplicity builds confidence.", d: "Finance shouldn't be confusing. Our responsibility is to make complex decisions easier to understand." },
  { t: "Relationships matter more than transactions.", d: "Our success is measured by long-term client relationships, not the number of products we recommend." },
  { t: "Advice should evolve.", d: "As your life changes, your financial strategy should too." },
];

const TEAM = [
  {
    name: "Nishit Mehta", role: "Mutual Funds & Financial Solutions", accent: TEAL,
    exp: "15+ Years", expNote: "banking & financial services",
    stats: [
      { k: "Experience", v: "15+ Years", n: "banking & financial services" },
      { k: "Focus", v: "Mutual Funds", n: "product specialisation" },
      { k: "Also", v: "Training", n: "distributor training" },
      { k: "Currently", v: "MF & Solutions", n: "tailored investments" },
    ],
    quote: "Expertise across banking and financial services, with a focus on product specialisation, distributor training, client relationships and tailored investment solutions.",
  },
  {
    name: "Jigar Shah", role: "Equity & Securities", accent: GOLD,
    exp: "16+ Years", expNote: "equity markets",
    stats: [
      { k: "Experience", v: "16+ Years", n: "in equity markets" },
      { k: "Focus", v: "HNI", n: "investments" },
      { k: "Builds", v: "Portfolios", n: "portfolio construction" },
      { k: "Currently", v: "Securities", n: "risk management" },
    ],
    quote: "16+ years in equity markets, specialising in HNI investments, portfolio construction and risk management.",
  },
  {
    name: "Sanket Punamiya", role: "Loans & Insurance", accent: "#3A7BD5",
    exp: "15+ Years", expNote: "gold markets & financial services",
    stats: [
      { k: "Experience", v: "15+ Years", n: "financial services" },
      { k: "Focus", v: "Financing", n: "suitable solutions" },
      { k: "Also", v: "Protection", n: "insurance solutions" },
      { k: "Currently", v: "Loans & Ins.", n: "client-first" },
    ],
    quote: "15+ years across gold markets and financial services, with a focus on helping clients explore suitable financing and protection solutions.",
  },
];

const GENERIC_FAQ = [
  { q: "How do I get started with Spectra Assets?", a: "It begins with a conversation. We take the time to understand where you are today, what matters to you, and where you want to go, then help you take the right next step." },
  { q: "Are your recommendations unbiased?", a: "Our success is measured by long-term client relationships, not by the number of products we recommend. Every recommendation is aligned with your unique goals." },
  { q: "Will my plan be reviewed over time?", a: "Yes. As your life changes, your financial strategy should too. We stay connected, reviewing progress and adapting strategies through every important milestone." },
];

const CATS = {
  wealth: {
    key: "wealth", nav: "Wealth Creation", badge: "Grow Your Wealth",
    titleA: "Wealth", titleEm: "Creation",
    hero: "Grow your wealth with disciplined, goal-aligned strategies, not by chasing opportunities.",
    intro: [
      "Wealth isn't created by chasing opportunities. It's built by making disciplined financial decisions over time.",
      "Whether you're investing for your first milestone or managing a diversified portfolio, we'll help you create a strategy aligned with your goals, time horizon and appetite for risk.",
    ],
    groups: [{
      items: [
        { name: "Mutual Funds", head: "Start Small. Build Consistently. Plan with Purpose.", body: "You don't need to be a market expert to start investing. Mutual Funds give you access to professionally managed, diversified investments aligned with your goals and risk profile. Start with a SIP, increase it over time with a Step-Up SIP, invest a larger amount through a Lumpsum, or create regular cash flow through an SWP. Whether you're starting out or building towards a major milestone, Mutual Funds offer flexible ways to invest with a clear strategy." },
        { name: "Bonds", head: "Predictability Can Have a Place in Your Portfolio.", body: "If you're looking for investments that can provide defined interest payments and a known maturity period, Bonds can bring greater structure to your portfolio. You can invest in government or corporate bonds across different tenures and credit profiles, depending on your objectives and risk appetite, helping balance your overall investment strategy while giving your money a defined role." },
        { name: "Portfolio Management Services (PMS)", head: "A Portfolio Built Around You.", body: "As your wealth grows, your investment strategy may need to become more personalised. PMS gives you a professionally managed portfolio tailored to your goals, risk profile and investment approach. Unlike pooled investments, PMS portfolios are managed individually, giving you direct ownership of securities and greater customisation. With a minimum investment of ₹50 lakh, PMS is generally suited to experienced investors seeking active portfolio management." },
        { name: "Alternative Investment Funds (AIF)", head: "Access Opportunities Beyond Traditional Investments.", body: "Sometimes, building a portfolio means looking beyond listed stocks, bonds and mutual funds. AIFs provide access to specialised strategies and asset classes such as private equity, venture capital, private credit and real estate. With a minimum investment of ₹1 crore, AIFs are generally suited to experienced investors with a longer investment horizon and higher tolerance for risk and complexity." },
        { name: "Unit Linked Insurance Plans (ULIPs)", head: "Protect Today. Participate in Tomorrow's Growth.", body: "You want to protect your family, but you also want your money to participate in the markets. ULIPs bring both together: life insurance and market-linked investments in one plan. Choose funds based on your goals and risk profile, and switch between funds as your priorities change, suited to those with a long-term horizon who want flexibility alongside life protection." },
        { name: "Endowment Plans", head: "You Know the Goal. Now Build a Plan for It.", body: "Whether it's your child's education, a future milestone or creating a financial cushion, some goals are easier to pursue with a structured savings plan. Endowment Plans combine life insurance with savings, helping you work towards a financial corpus over a defined policy term while keeping protection in place." },
      ],
    }],
  },
  planning: {
    key: "planning", nav: "Financial Planning", badge: "Plan Your Future",
    titleA: "Financial", titleEm: "Planning",
    hero: "The future arrives one financial decision at a time. We help you give tomorrow the attention it deserves today.",
    intro: [
      "The future doesn't arrive unexpectedly. It arrives one financial decision at a time.",
      "Whether you're preparing for retirement, planning your child's education, or building long-term financial independence, we'll help you create a roadmap that gives tomorrow the attention it deserves today.",
    ],
    groups: [{
      items: [
        { name: "Retirement Planning", head: "Your Salary Will Stop. Your Lifestyle Doesn't Have To.", body: "Retirement planning is about building enough financial independence to enjoy life on your terms, even when your regular income stops. From estimating your future needs to building a retirement corpus and creating income for your later years, the right strategy can make the transition smoother. Starting early gives your investments more time to work." },
        { name: "Child Education Planning", head: "Their Dreams Are Growing. So Should Your Plan.", body: "College, higher education, studying abroad, the cost of giving your child the opportunities you want for them can add up quickly. Child Education Planning helps you estimate future education costs, determine how much you need to invest, and build a strategy around your timeline. Starting early can give your investments more time to grow." },
        { name: "Estate Planning", head: "What You Build Matters. So Does Where It Goes.", body: "Building wealth is one part of the journey. Making sure it reaches the people and causes that matter to you is another. Estate planning helps you organise and transfer your assets according to your wishes while reducing uncertainty for your family. It can involve wills, nominations, succession planning and other appropriate arrangements." },
        { name: "Public Provident Fund (PPF)", head: "Small, Consistent Steps Can Build a Long-Term Corpus.", body: "Some financial goals are years away. PPF offers a structured way to save for them through regular contributions over a long-term horizon. It is a government-backed savings scheme with defined rules around tenure, contributions, interest and tax benefits, subject to prevailing regulations." },
        { name: "Senior Citizen Savings Scheme (SCSS)", head: "Your Working Years May End. Your Financial Needs Don't.", body: "For senior citizens looking for a structured source of income, SCSS is a government-backed savings scheme designed specifically for eligible individuals. It offers a defined tenure and interest payouts at prescribed intervals, subject to prevailing rules and limits, and can form part of a broader retirement strategy." },
        { name: "Tax-Efficient Investment Strategies", head: "Don't Just Look at What You Earn. Look at What You Keep.", body: "Tax can quietly reduce the wealth you build over time. Tax-efficient investing focuses on structuring your investments and financial decisions in a way that considers applicable tax rules alongside your goals, risk profile and time horizon, without letting tax savings alone drive your investment decisions." },
        { name: "Pension", head: "Build an Income for the Years When Your Paycheque Is Gone.", body: "A pension strategy is about creating a dependable source of income for your later years. Instead of relying entirely on savings, the right pension solution can help convert accumulated wealth into regular income during retirement, depending on the product and its terms." },
      ],
    }],
  },
  insurance: {
    key: "insurance", nav: "Insurance", badge: "Protect What Matters",
    titleA: "Insurance", titleEm: "& Protection",
    hero: "The right protection ensures one unexpected event doesn't undo years of hard work.",
    intro: [
      "You've spent years building your wealth, your business, and your family's future.",
      "The right protection ensures that one unexpected event doesn't undo years of hard work. Whether it's your health, your income, your home, or your business, we'll help you build a risk management strategy that protects what matters most.",
    ],
    groups: [
      {
        title: "Retail Insurance",
        items: [
          { name: "Health Insurance", head: "One Hospital Bill Shouldn't Rewrite Your Financial Plans.", body: "Medical emergencies can arrive without warning and the costs can be significant. Health Insurance helps cover eligible medical expenses arising from hospitalisation, treatments and other covered healthcare needs, as per the policy terms, protecting your savings while giving you access to quality healthcare when you need it most." },
          { name: "Term Insurance", head: "Your Income Supports More Than Just Today.", body: "Your family may depend on your income for years to come. Term Insurance provides life cover for a defined period, offering financial protection to your loved ones if something happens to you during the policy term. It can help replace lost income and support commitments such as home loans, children's education and everyday family expenses." },
          { name: "Motor Insurance", head: "Accidents Happen. Your Finances Should Be Ready.", body: "Motor Insurance helps protect you against financial losses arising from accidents, theft, natural events and other covered risks, depending on the policy. Depending on your needs, you can choose coverage for your own vehicle, third-party liabilities, or both." },
          { name: "Home Insurance", head: "Protect the Place Where Life Happens.", body: "Your home is more than walls, furniture and belongings. Home Insurance can protect your property and/or contents against covered risks such as fire, natural calamities, theft and other specified events, depending on the policy, helping you recover financially when the unexpected damages what matters to you." },
          { name: "Personal Accident Insurance", head: "Life Can Change in a Moment. Be Prepared for What Follows.", body: "Personal Accident Insurance provides financial protection against specified consequences of accidental injury, such as accidental death or disability, according to the policy terms. It can complement your health and life insurance by addressing the financial impact of accidents." },
          { name: "Travel Insurance", head: "Travel Light. Leave the “What Ifs?” to Your Cover.", body: "Travel Insurance can provide cover for eligible events such as medical emergencies, trip delays, baggage loss and other travel-related risks, depending on the policy. Whether for work, a family holiday or exploring somewhere new, the right cover helps you handle unexpected situations." },
        ],
      },
      {
        title: "Business & Corporate Insurance",
        intro: "Running a business means managing more than revenue and growth. Your people, property, equipment, inventory, contracts and reputation all carry risks. We help businesses identify and manage these risks through insurance solutions designed around their operations, exposures and priorities.",
        sub: [
          { title: "Property, Projects & Assets", items: [
            { name: "Fire Insurance", body: "Protect your property, stock, equipment and business assets against covered fire and allied perils." },
            { name: "Marine Insurance", body: "Protect goods and cargo against covered risks while they are transported by road, rail, air or sea." },
            { name: "Plant & Machinery", body: "Protect valuable machinery and equipment against covered accidental damage and specified risks." },
            { name: "Contractors' All Risk (CAR)", body: "Protection for construction projects against specified risks affecting works, materials and related exposures." },
            { name: "Burglary Insurance", body: "Protect business property and contents against covered losses arising from burglary and theft." },
            { name: "Jewellers' Block", body: "Specialised protection for jewellers covering specified risks to jewellery, precious stones, stock and related assets." },
          ]},
          { title: "People & Employee Protection", items: [
            { name: "Group Health Insurance", body: "Provide employees and their families with health coverage, building a stronger employee benefits proposition." },
            { name: "Group Personal Accident", body: "Financial protection for employees against specified accidental death, disability and other covered consequences." },
            { name: "Group Term Life", body: "Life cover that can offer financial support to employees' families in the event of death, subject to policy terms." },
            { name: "Workmen's Compensation", body: "Coverage for statutory and contractual liabilities arising from workplace injuries, as applicable." },
          ]},
          { title: "Business Liability & Risk", items: [
            { name: "Cyber Insurance", body: "Help your business respond to cyber incidents, data breaches and other covered digital risks." },
            { name: "Liability Insurance", body: "Protect your business against specified third-party claims arising from covered liabilities." },
            { name: "Directors & Officers (D&O)", body: "Protect directors and officers against certain claims arising from decisions taken in their professional capacity." },
            { name: "Professional Indemnity", body: "Protect professionals against covered claims arising from alleged errors, omissions or negligence in their services." },
            { name: "Fleet Insurance", body: "Manage insurance for multiple commercial vehicles under a structured fleet arrangement, subject to policy terms." },
          ]},
        ],
        note: { name: "And More…", body: "Every business has a different risk profile. We help identify the exposures that matter to your business and explore appropriate insurance solutions around them." },
      },
    ],
  },
  loans: {
    key: "loans", nav: "Loans", badge: "Finance Your Goals",
    titleA: "Loans &", titleEm: "Financing",
    hero: "When you have a plan, funding shouldn't hold you back.",
    intro: [
      "When you have a plan, funding shouldn't hold you back.",
      "Whether you're buying your dream home, expanding your business, funding higher education, or investing in new opportunities, we'll help you find financing solutions that fit your ambitions.",
    ],
    groups: [{
      items: [
        { name: "Home Loans", head: "Your Home. Your Next Chapter.", body: "Finance your dream home with suitable solutions for purchasing, constructing or renovating a property. We help you explore options aligned with your eligibility, financial position and repayment capacity." },
        { name: "Loan Against Property", head: "Unlock the Value of What You Own.", body: "Your property can do more than just sit on your balance sheet. A Loan Against Property allows you to leverage an existing property for eligible personal or business requirements while retaining ownership, subject to lender terms." },
        { name: "Business Loans", head: "Growth Needs Capital. We Help You Find It.", body: "Whether you're expanding operations, managing working capital, purchasing equipment or pursuing a new opportunity, explore financing solutions structured around your business requirements and repayment capacity." },
        { name: "Personal Loans", head: "For the Plans You Have Today.", body: "From an important milestone to an unexpected financial requirement, Personal Loans can provide unsecured funding for eligible needs. We help you explore suitable options based on your income, credit profile and lender terms." },
        { name: "And More", head: "Funding for Every Requirement.", body: "Every financial requirement is different. Whether you need funding for education, machinery, solar, gold or another purpose, we help you explore suitable financing options based on your needs and eligibility." },
      ],
    }],
  },
  securities: {
    key: "securities", nav: "Securities", badge: "Capital Markets",
    titleA: "Securities &", titleEm: "Capital Markets",
    hero: "Markets reward informed decisions, not impulse.",
    intro: [
      "Markets reward informed decisions, not impulse.",
      "Whether you're an active investor or looking to diversify beyond traditional investments, we provide access to market insights and opportunities aligned with your investment objectives.",
    ],
    groups: [{
      items: [
        { name: "Equity Investing", head: "Own a Piece of the Businesses You Believe In.", body: "Equity investing gives you an opportunity to participate in the growth of businesses by owning their shares. Our approach focuses on understanding businesses, valuations, risks and your investment objectives before making decisions, rather than simply following market noise, building a thoughtful equity strategy that fits your goals, risk appetite and horizon." },
        { name: "Derivatives / Futures & Options", head: "Markets Move Fast. Your Decisions Should Be Thought Through.", body: "Futures and Options can be used for hedging, managing risk or taking market positions, but they also carry significant complexity and risk. We believe derivatives should be approached with a clear strategy, appropriate risk management and an understanding of how they fit within your overall financial plan." },
        { name: "Research & Market Insights", head: "Good Decisions Start with Good Research.", body: "Markets are full of opinions. We focus on finding insights that can help you make more informed decisions. Our research-led approach looks at business fundamentals, financial performance, valuations, market trends and relevant risks to identify opportunities worth exploring." },
        { name: "IPOs", head: "Be There When the Next Opportunity Enters the Market.", body: "An IPO gives investors an opportunity to participate in a company's public-market journey from its listing stage. We help you look beyond the headlines, considering the business, valuation, financials, risks and offer details before deciding whether an IPO fits your investment strategy." },
      ],
    }],
  },
};
const CAT_ORDER = ["wealth", "planning", "insurance", "loans", "securities"];

/* anchor slug + per-category product menu (used by navbar flyouts and page anchors) */
const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const anchorId = (catKey, name) => catKey + "-" + slug(name);
function catMenu(cat) {
  const out = [];
  for (const g of cat.groups) {
    if (g.items) for (const it of g.items) out.push({ label: it.name, anchor: anchorId(cat.key, it.name) });
    if (g.sub) out.push({ label: g.title, anchor: anchorId(cat.key, g.title) });
  }
  return out;
}

const FORMS = [
  { t: "KYC Application Form", d: "PDF · Required for new investors" },
  { t: "Mutual Fund SIP Mandate Form", d: "PDF · Set up auto-debit for SIPs" },
  { t: "Demat Account Opening Form", d: "PDF · For securities trading" },
  { t: "Loan Application Checklist", d: "PDF · Documents needed for home / personal loans" },
  { t: "Insurance Proposal Form", d: "PDF · Term & health insurance applications" },
  { t: "PMS / AIF Onboarding Form", d: "PDF · For HNI investors, min. ₹50L", gold: true },
];

const NETWORK = ["Motilal Oswal", "Prudent Advisories", "Leading AMCs", "Insurers", "Banks & NBFCs"];

const INTERESTS = ["Wealth Creation", "Insurance", "Loans & Financing", "Retirement Planning", "Child Education Planning", "Other"];

/* checkmark row used inside product cards / lists */
function Check() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
}

/* ===================== creative building blocks ===================== */

/* set to a number like "919820012345" to enable direct WhatsApp chat; empty = opens Contact */
const WHATSAPP = "";

/* fallback quotes when the live API is unavailable (e.g. the offline standalone preview) */
const MARKET_FALLBACK = [
  { label: "NIFTY 50", price: 24812, chg: 0.62 },
  { label: "SENSEX", price: 81235, chg: 0.48 },
  { label: "BANK NIFTY", price: 52890, chg: -0.21 },
  { label: "NIFTY IT", price: 43121, chg: 1.12 },
  { label: "NIFTY MIDCAP", price: 57320, chg: 0.77 },
  { label: "USD / INR", price: 83.42, chg: -0.08 },
  { label: "GOLD ₹/10g", price: 74210, chg: 0.34 },
];
const BRAND_STATS = ["AUM ₹140 Cr", "SIP ₹25,000", "XIRR 22.4%", "PMS ₹50 L", "AIF ₹1 Cr", "PPF 7.1%", "600+ portfolios", "CAGR 14.2%"];

function fmtQuote(r) {
  const p = r.price >= 1000 ? Math.round(r.price).toLocaleString("en-IN") : r.price.toFixed(2);
  const up = r.chg >= 0;
  return `${r.label} ${p} ${up ? "▲" : "▼"}${Math.abs(r.chg).toFixed(2)}%`;
}

/* fetch real market data from our /api/market route; falls back to sample values */
function useMarketData() {
  const [rows, setRows] = React.useState(null);
  React.useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch("/api/market", { cache: "no-store" });
        if (!r.ok) throw new Error("bad");
        const j = await r.json();
        if (alive && j && Array.isArray(j.rows) && j.rows.length) setRows(j.rows);
      } catch { /* keep fallback */ }
    };
    load();
    const id = setInterval(load, 45000);
    return () => { alive = false; clearInterval(id); };
  }, []);
  return rows;
}

/* market-data backdrop behind the hero, every row a horizontal marquee (alternating directions) */
function HeroNumbersBg({ rows }) {
  const data = rows && rows.length ? rows : MARKET_FALLBACK;
  const market = data.map(fmtQuote);
  // one row's worth of items, offset per row so rows don't line up
  const base = [...market, ...BRAND_STATS];
  const ROWS = 11;
  const rowEls = [];
  for (let i = 0; i < ROWS; i++) {
    const rightward = i % 2 === 1;
    const dur = 55 + (i % 5) * 12;                 // vary speed per row
    const shift = (i * 3) % base.length;           // stagger content start
    const strip = [...base.slice(shift), ...base.slice(0, shift)];
    const loop = [...strip, ...strip];             // duplicate for a seamless loop
    const op = 0.15 + (i % 4) * 0.025;
    rowEls.push(
      <div key={i} style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex", width: "max-content", animation: `tickerScroll ${dur}s linear infinite`, animationDirection: rightward ? "reverse" : "normal" }}>
          {loop.map((s, j) => (
            <span key={j} style={{ padding: "0 28px", fontSize: 13, fontWeight: 600, color: NAVY, opacity: op, fontVariantNumeric: "tabular-nums", letterSpacing: "0.2px" }}>{s}</span>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 16, paddingBottom: 16 }}>
      {rowEls}
    </div>
  );
}

function Reveal({ children, as = "div", delay = 0, style, className = "", ...rest }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    // safety net: never leave content permanently hidden if the observer doesn't fire
    const fallback = setTimeout(() => setSeen(true), 1600);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, []);
  const Tag = as;
  return <Tag ref={ref} className={("reveal " + (seen ? "in " : "") + className).trim()} style={{ transitionDelay: delay ? delay + "ms" : undefined, ...(style || {}) }} {...rest}>{children}</Tag>;
}

/* animated count-up that fires when scrolled into view */
function CountUp({ to, prefix = "", suffix = "", dur = 1500 }) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false, raf;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        setVal(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) raf = requestAnimationFrame(tick); else setVal(to);
      };
      raf = requestAnimationFrame(tick);
    };
    if (typeof IntersectionObserver === "undefined") { setVal(to); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !started) { started = true; run(); io.disconnect(); } }), { threshold: 0.4 });
    io.observe(el);
    const fb = setTimeout(() => { if (!started) { started = true; run(); } }, 1600);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); clearTimeout(fb); };
  }, [to]);
  return <span ref={ref}>{prefix}{Math.round(val).toLocaleString("en-IN")}{suffix}</span>;
}

/* magnetic wrapper — child gently follows the cursor, springs back on leave */
function Magnetic({ children, strength = 0.3, style }) {
  const ref = React.useRef(null);
  const [t, setT] = React.useState({ x: 0, y: 0 });
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        setT({ x: (e.clientX - (r.left + r.width / 2)) * strength, y: (e.clientY - (r.top + r.height / 2)) * strength });
      }}
      onMouseLeave={() => setT({ x: 0, y: 0 })}
      style={{ display: "inline-block", transform: `translate(${t.x}px, ${t.y}px)`, transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1)", ...(style || {}) }}
    >
      {children}
    </div>
  );
}

/* 3D tilt card — follows cursor with a subtle perspective tilt + teal spotlight */
function TiltCard({ children, max = 8, radius = 18, style }) {
  const ref = React.useRef(null);
  const [s, setS] = React.useState({ rx: 0, ry: 0, px: 50, py: 50, on: false });
  const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    setS({ rx: (0.5 - y) * max * 2, ry: (x - 0.5) * max * 2, px: x * 100, py: y * 100, on: true });
  };
  const onLeave = () => setS((p) => ({ ...p, rx: 0, ry: 0, on: false }));
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ position: "relative", transform: `perspective(800px) rotateX(${s.rx}deg) rotateY(${s.ry}deg)`, transition: s.on ? "transform 0.08s linear" : "transform 0.45s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d", ...(style || {}) }}>
      {children}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: radius, pointerEvents: "none", opacity: s.on ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(circle 240px at ${s.px}% ${s.py}%, rgba(0,155,141,0.13), transparent 62%)` }}></div>
    </div>
  );
}

/* premium primary CTA — magnetic, lifts, glows, gradient sweep on hover */
function CtaPrimary({ children, onClick, base = NAVY, sweep = "linear-gradient(90deg,#009B8D,#00C9B6)", glow = "rgba(0,155,141,0.45)", color = "#fff", fontSize = 15, pad = "14px 28px", strength = 0.35 }) {
  const [h, setH] = React.useState(false);
  return (
    <Magnetic strength={strength}>
      <button
        onClick={onClick}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: "relative", overflow: "hidden", border: "none", cursor: "pointer",
          fontFamily: "inherit", fontWeight: 600, fontSize, padding: pad, borderRadius: 10,
          color, background: base, letterSpacing: "-0.1px", whiteSpace: "nowrap",
          transform: h ? "translateY(-2px)" : "none",
          boxShadow: h ? `0 16px 40px ${glow}` : "0 6px 18px rgba(15,23,41,0.12)",
          transition: "transform 0.22s ease, box-shadow 0.22s ease",
        }}
      >
        <span aria-hidden="true" style={{ position: "absolute", inset: 0, background: sweep, transform: h ? "translateX(0)" : "translateX(-101%)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}></span>
        <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
      </button>
    </Magnetic>
  );
}

/* custom cursor — a teal dot (instant) + a ring that trails and expands on interactive targets */
/* word-by-word mask reveal — words rise out of a clip when scrolled into view */
function WordReveal({ text, emFrom = -1, as = "span", style, stagger = 55, baseDelay = 0 }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }), { threshold: 0.2, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    const fb = setTimeout(() => setSeen(true), 1600);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, []);
  const words = String(text).split(" ");
  const Tag = as;
  return (
    <Tag ref={ref} className={"wr" + (seen ? " in" : "")} style={style}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="wr-word"><span className="wr-inner" style={{ transitionDelay: (baseDelay + i * stagger) + "ms", color: emFrom >= 0 && i >= emFrom ? TEAL : undefined }}>{w}</span></span>
          {i < words.length - 1 ? " " : ""}
        </React.Fragment>
      ))}
    </Tag>
  );
}

/* hero aurora — slow-drifting colour blobs behind the content for living depth */
function Aurora() {
  return (
    <div className="sp-aurora" aria-hidden="true">
      <i style={{ width: "46%", height: "72%", left: "-6%", top: "-12%", background: "radial-gradient(circle, rgba(0,155,141,0.30), transparent 65%)", animation: "auroraDrift1 19s ease-in-out infinite" }}></i>
      <i style={{ width: "42%", height: "66%", right: "-4%", top: "4%", background: "radial-gradient(circle, rgba(201,168,76,0.22), transparent 65%)", animation: "auroraDrift2 23s ease-in-out infinite" }}></i>
      <i style={{ width: "40%", height: "62%", left: "28%", bottom: "-18%", background: "radial-gradient(circle, rgba(58,123,213,0.16), transparent 65%)", animation: "auroraDrift3 27s ease-in-out infinite" }}></i>
    </div>
  );
}

function CustomCursor() {
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const dot = document.createElement("div"); dot.className = "sp-cursor-dot";
    const ring = document.createElement("div"); ring.className = "sp-cursor-ring";
    document.body.appendChild(dot); document.body.appendChild(ring);
    document.body.classList.add("sp-cursor-on");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2, rx = mx, ry = my, raf;
    const sel = "a,button,input,textarea,select,label,[role=button],.sp-wa";
    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      const t = e.target && e.target.closest ? e.target.closest(sel) : null;
      ring.classList.toggle("active", !!t);
      dot.classList.toggle("hide", !!t);
    };
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18; ring.style.transform = `translate(${rx}px, ${ry}px)`; raf = requestAnimationFrame(loop); };
    const leave = () => { dot.style.opacity = "0"; ring.style.opacity = "0"; };
    const enter = () => { dot.style.opacity = ""; ring.style.opacity = ""; };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cancelAnimationFrame(raf);
      dot.remove(); ring.remove();
      document.body.classList.remove("sp-cursor-on");
    };
  }, []);
  return null;
}

function WhatsAppButton({ go }) {
  const onClick = () => {
    if (WHATSAPP) window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent("Hi Spectra Assets, I'd like to talk about my finances."), "_blank", "noopener");
    else go("contact");
  };
  return (
    <button className="sp-wa" aria-label="Chat on WhatsApp" onClick={onClick}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" style={{ display: "block" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path></svg>
    </button>
  );
}

/* per-category icon (stroke) */
const CAT_ICON = {
  wealth: <><rect x="2" y="14" width="4" height="8" rx="1"></rect><rect x="9" y="8" width="4" height="14" rx="1"></rect><rect x="16" y="3" width="4" height="19" rx="1"></rect></>,
  planning: <><path d="M12 2a10 10 0 1 0 10 10"></path><path d="M12 6v6l4 2"></path><path d="M22 2l-6 6"></path></>,
  insurance: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>,
  loans: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></>,
  securities: <><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="17 7 22 7 22 12"></polyline></>,
};

/* decorative gradient visual panel for a product row */
function CatVisual({ catKey, num }) {
  return (
    <div className="sp-visual" style={{ position: "relative", borderRadius: 20, overflow: "hidden", minHeight: 220, background: "linear-gradient(145deg,#0F1729 0%,#132038 60%,#0c2b2a 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 320 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
        {[44, 88, 132, 176].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"></line>)}
        {[64, 128, 192, 256].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="rgba(255,255,255,0.05)" strokeWidth="1"></line>)}
        <path d="M0,170 C40,160 70,150 110,120 C150,90 180,100 220,70 C260,40 290,44 320,30" stroke="#009B8D" strokeWidth="2.5" fill="none" strokeDasharray="600" style={{ animation: "drawLine 2.2s .3s ease-out both" }}></path>
      </svg>
      <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,155,141,0.28) 0%, transparent 70%)" }}></div>
      <div style={{ position: "relative", textAlign: "center", padding: 24 }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(0,155,141,0.15)", border: "1px solid rgba(0,155,141,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#009B8D" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{CAT_ICON[catKey]}</svg>
        </div>
        <div className="ff-serif" style={{ fontSize: 64, fontWeight: 800, color: "rgba(255,255,255,0.10)", lineHeight: 1, letterSpacing: "-2px" }}>{String(num).padStart(2, "0")}</div>
      </div>
    </div>
  );
}

/* minimal line-art illustrations for the feature section */
function ArtFrame({ children }) {
  return <div style={{ width: "100%", maxWidth: 340, aspectRatio: "3 / 2", display: "flex", alignItems: "center", justifyContent: "center" }}><svg viewBox="0 0 300 200" style={{ width: "100%", height: "auto" }}>{children}</svg></div>;
}
const PlainLangArt = () => (
  <ArtFrame>
    <path d="M40 80 q12 -14 24 0 t24 0 t24 0" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round"></path>
    <path d="M40 100 q12 -14 24 0 t24 0 t24 0" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"></path>
    <path d="M40 120 q12 -14 24 0 t24 0 t24 0" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" opacity="0.45"></path>
    <path d="M138 100 h34" stroke="#009B8D" strokeWidth="2.5" strokeLinecap="round"></path>
    <path d="M166 92 l10 8 -10 8" fill="none" stroke="#009B8D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
    <line x1="196" y1="84" x2="262" y2="84" stroke="#0F1729" strokeWidth="2.5" strokeLinecap="round"></line>
    <line x1="196" y1="100" x2="248" y2="100" stroke="#0F1729" strokeWidth="2.5" strokeLinecap="round" opacity="0.55"></line>
    <line x1="196" y1="116" x2="258" y2="116" stroke="#0F1729" strokeWidth="2.5" strokeLinecap="round" opacity="0.35"></line>
  </ArtFrame>
);
const HubArt = () => (
  <ArtFrame>
    {[[80, 50], [220, 50], [70, 150], [230, 150], [150, 30]].map(([x, y], i) => (
      <g key={i}><line x1="150" y1="100" x2={x} y2={y} stroke="#E4D9BC" strokeWidth="2"></line><circle cx={x} cy={y} r="12" fill="#fff" stroke="#009B8D" strokeWidth="2"></circle></g>
    ))}
    <circle cx="150" cy="100" r="26" fill="#009B8D"></circle>
    <circle cx="150" cy="100" r="26" fill="none" stroke="#009B8D" strokeWidth="6" opacity="0.2"></circle>
    <path d="M150 92 v16 M142 100 h16" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"></path>
  </ArtFrame>
);
const PathArt = () => (
  <ArtFrame>
    <path d="M30 150 C90 150 90 60 150 60 C210 60 210 140 270 140" fill="none" stroke="#E4D9BC" strokeWidth="2.5" strokeDasharray="5 6"></path>
    {[[30, 150], [150, 60], [270, 140]].map(([x, y], i) => (<circle key={i} cx={x} cy={y} r="7" fill="#009B8D"></circle>))}
    <circle cx="270" cy="140" r="18" fill="none" stroke="#009B8D" strokeWidth="2.5"></circle>
    <path d="M262 140 l6 6 10 -12" fill="none" stroke="#009B8D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"></path>
  </ArtFrame>
);
const EvolveArt = () => (
  <ArtFrame>
    <path d="M150 55 a45 45 0 1 1 -42 29" fill="none" stroke="#009B8D" strokeWidth="2.5" strokeLinecap="round"></path>
    <path d="M150 40 l4 15 -16 2 z" fill="#009B8D"></path>
    <path d="M150 145 a45 45 0 0 1 -18 -12" fill="none" stroke="#C9A84C" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"></path>
    <circle cx="150" cy="100" r="6" fill="#0F1729"></circle>
    <circle cx="150" cy="100" r="20" fill="none" stroke="#0F1729" strokeWidth="1.5" opacity="0.15"></circle>
  </ArtFrame>
);

function FeatureRows() {
  const feats = [
    { t: "We speak plain language, not jargon", d: "Every recommendation is explained in words you'd actually use, never product codes or fine print. You'll always understand exactly what you own and why.", art: <PlainLangArt /> },
    { t: "One relationship for every decision", d: "Investments, insurance, loans and planning under a single trusted point of contact. No switching between firms, no repeating your story.", art: <HubArt /> },
    { t: "We stay with you, not just at the start", d: "From your first investment to a claim to a plan review, we're by your side through every milestone: reviewing, adapting and supporting.", art: <PathArt /> },
    { t: "Advice that evolves with your life", d: "As your goals change, your strategy changes with them. We revisit your plan regularly so it always fits where you are now.", art: <EvolveArt /> },
  ];
  return (
    <section style={{ background: "#F7F5F0", padding: "88px 32px", borderTop: "1px solid #EFEBE0" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal><h2 style={{ textAlign: "center", fontSize: "clamp(30px,4vw,48px)", fontWeight: 600, color: NAVY, letterSpacing: "-0.5px", marginBottom: 64 }}>What working with Spectra feels like</h2></Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 64 }}>
          {feats.map((f, i) => {
            const artFirst = i % 2 === 0;
            const Text = (
              <div key="t">
                <h3 className="ff-serif" style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 600, color: NAVY, marginBottom: 14, letterSpacing: "-0.3px", lineHeight: 1.2 }}>{f.t}</h3>
                <p style={{ fontSize: 16, color: "#5B6472", lineHeight: 1.8, maxWidth: 440 }}>{f.d}</p>
              </div>
            );
            const Art = <div key="a" className="sp-visual" style={{ display: "flex", justifyContent: "center" }}>{f.art}</div>;
            return (
              <Reveal key={i}>
                <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
                  {artFirst ? [Art, Text] : [Text, Art]}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================ COMPONENT ============================ */
export default function SpectraSite() {
  const [page, setPage] = React.useState("home");
  const [wipeKey, setWipeKey] = React.useState(0);
  const [tab, setTab] = React.useState("wealth");
  const [drop, setDrop] = React.useState(null);
  const [openMember, setOpenMember] = React.useState(null);
  const [faq, setFaq] = React.useState({});
  const [sip, setSip] = React.useState({ amount: 25000, rate: 12, years: 15 });
  const [lump, setLump] = React.useState({ amount: 1000000, rate: 12, years: 10 });
  const [swp, setSwp] = React.useState({ corpus: 5000000, withdraw: 30000, rate: 10, years: 15 });
  const [loan, setLoan] = React.useState({ amount: 5000000, rate: 8.5, years: 20 });
  const [investMode, setInvestMode] = React.useState("sip"); // SIP & Lumpsum combined calculator
  const [form, setForm] = React.useState({ name: "", phone: "", email: "", interests: [], message: "" });
  const [formDone, setFormDone] = React.useState(false);
  const [loaderState, setLoaderState] = React.useState("show"); // show -> hidden -> gone
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [solHover, setSolHover] = React.useState(null);
  const [mobSol, setMobSol] = React.useState(null); // expanded category in mobile menu
  const fillRef = React.useRef(null);
  const pendingAnchor = React.useRef(null);

  const go = (p, t, anchor) => {
    pendingAnchor.current = anchor || null;
    if (p !== page) setWipeKey((k) => k + 1);
    setPage(p);
    if (t) setTab(t);
    setDrop(null);
    setSolHover(null);
    setMobileOpen(false);
    setMobSol(null);
    if (typeof window !== "undefined" && !anchor) window.scrollTo(0, 0);
  };

  /* after a page renders, scroll to a pending product anchor (retries until it exists) */
  React.useEffect(() => {
    if (!pendingAnchor.current || typeof window === "undefined") return;
    const id = pendingAnchor.current;
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); pendingAnchor.current = null; }
      else if (tries++ < 25) { setTimeout(tryScroll, 40); }
      else { pendingAnchor.current = null; window.scrollTo(0, 0); }
    };
    setTimeout(tryScroll, 60);
  }, [page]);

  /* close nav dropdowns when clicking outside the navbar */
  React.useEffect(() => {
    if (!drop) return;
    const onDown = (e) => { if (!e.target.closest || !e.target.closest("[data-navbar]")) { setDrop(null); setSolHover(null); } };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [drop]);
  const toggleFaq = (k) => setFaq((s) => ({ ...s, [k]: !s[k] }));

  /* page loader (strip reveal) */
  React.useEffect(() => {
    const t = setTimeout(() => setLoaderState("gone"), 2750);
    return () => clearTimeout(t);
  }, []);

  /* scroll progress line */
  React.useEffect(() => {
    const onScroll = () => {
      const el = fillRef.current;
      if (!el) return;
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
      el.style.height = pct + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  /* parallax glows */
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      document.querySelectorAll(".parallax-slow").forEach((el) => { el.style.transform = `translateY(${y * 0.12}px)`; });
      document.querySelectorAll(".parallax-fast").forEach((el) => { el.style.transform = `translateY(${y * 0.22}px)`; });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [page]);

  /* home: stacking cards scroll effect */
  React.useEffect(() => {
    if (page !== "home") return;
    let raf;
    const run = () => {
      const section = document.getElementById("stack-section");
      if (!section) return;
      const cards = [0, 1, 2, 3, 4].map((i) => document.getElementById("stack-card-" + i));
      const n = cards.length;
      const ease = (t) => 1 - Math.pow(1 - t, 3);
      const perCard = 1 / n;
      const onScroll = () => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
        cards.forEach((card, i) => {
          if (!card) return;
          const start = i * perCard;
          const entryP = ease(Math.max(0, Math.min(1, (progress - start) / (perCard * 0.65))));
          let stackDepth = 0;
          for (let j = i + 1; j < n; j++) {
            const jP = ease(Math.max(0, Math.min(1, (progress - j * perCard) / (perCard * 0.65))));
            stackDepth += jP;
          }
          const enterDist = window.innerHeight * 0.72;
          const stackY = -stackDepth * 16;
          const y = entryP < 1 ? enterDist * (1 - entryP) + stackY : stackY;
          const scale = Math.max(0.86, 1 - stackDepth * 0.04);
          card.style.transform = `translateY(${y}px) scale(${scale})`;
          card.style.opacity = Math.min(1, entryP * 2.5);
          card.style.zIndex = String(i + 1);
        });
      };
      window.__spStack = onScroll;
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    };
    raf = setTimeout(run, 90);
    return () => {
      clearTimeout(raf);
      if (window.__spStack) { window.removeEventListener("scroll", window.__spStack); window.__spStack = null; }
    };
  }, [page]);

  /* home: process timeline scroll effect */
  React.useEffect(() => {
    if (page !== "home") return;
    let raf;
    const run = () => {
      const section = document.getElementById("process-section");
      if (!section) return;
      const seg1 = document.getElementById("proc-seg-1");
      const seg2 = document.getElementById("proc-seg-2");
      const seg3 = document.getElementById("proc-seg-3");
      const dots = [1, 2, 3, 4].map((i) => document.getElementById("proc-dot-" + i));
      const nums = [1, 2, 3, 4].map((i) => document.getElementById("proc-num-" + i));
      const cards = [1, 2, 3, 4].map((i) => document.getElementById("proc-card-" + i));
      if (!seg1) return;
      const len1 = 528, len2 = 190, len3 = 528;
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const setDot = (i, on) => { if (!dots[i]) return; dots[i].setAttribute("fill", on ? TEAL : "#fff"); dots[i].setAttribute("stroke", on ? TEAL : "#E5E7EB"); };
      const setCard = (i, on) => {
        if (!cards[i] || !nums[i]) return;
        cards[i].style.borderColor = on ? "rgba(0,155,141,0.3)" : "#F0F2F5";
        cards[i].style.boxShadow = on ? "0 8px 32px rgba(0,155,141,0.08)" : "none";
        nums[i].style.background = on ? TEAL : "#F9FAFB";
        nums[i].style.borderColor = on ? TEAL : "#E5E7EB";
        nums[i].style.color = on ? "#fff" : "#9CA3AF";
      };
      const onScroll = () => {
        const rect = section.getBoundingClientRect();
        const scrollable = section.offsetHeight - window.innerHeight;
        if (scrollable <= 0) return;
        const p = Math.max(0, Math.min(1, -rect.top / scrollable));
        const p1 = ease(Math.max(0, Math.min(1, p / (1 / 3))));
        const p2 = ease(Math.max(0, Math.min(1, (p - 1 / 3) / (1 / 3))));
        const p3 = ease(Math.max(0, Math.min(1, (p - 2 / 3) / (1 / 3))));
        seg1.style.strokeDashoffset = String(len1 * (1 - p1));
        seg2.style.strokeDashoffset = String(len2 * (1 - p2));
        seg3.style.strokeDashoffset = String(len3 * (1 - p3));
        // reversible: reflect current scroll state so scrolling back up reverts colours too
        const on = [p1 > 0.01, p1 > 0.95, p2 > 0.95, p3 > 0.95];
        for (let i = 0; i < 4; i++) { setDot(i, on[i]); setCard(i, on[i]); }
      };
      window.__spProc = onScroll;
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    };
    raf = setTimeout(run, 90);
    return () => {
      clearTimeout(raf);
      if (window.__spProc) { window.removeEventListener("scroll", window.__spProc); window.__spProc = null; }
    };
  }, [page]);

  /* ---------- calculators ---------- */
  const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const inr = (n) => Number(n).toLocaleString("en-IN");
  const sipFV = (amt, rate, years) => { const i = rate / 100 / 12, n = years * 12; return amt * ((Math.pow(1 + i, n) - 1) / i) * (1 + i); };
  const lumpFV = (amt, rate, years) => amt * Math.pow(1 + rate / 100, years);
  const swpBal = (corpus, withdraw, rate, years) => { const i = rate / 100 / 12, n = years * 12; let bal = corpus; for (let m = 0; m < n; m++) { bal = bal * (1 + i) - withdraw; if (bal < 0) return 0; } return bal; };
  const loanEmi = (amount, rate, years) => { const i = rate / 100 / 12, n = years * 12; return amount * i * Math.pow(1 + i, n) / (Math.pow(1 + i, n) - 1); };

  const submitForm = (e) => {
    e.preventDefault();
    // No backend yet: compose an email to Spectra with the enquiry details.
    const lines = [
      "Name: " + (form.name || ""),
      "Mobile: " + (form.phone || ""),
      "Email: " + (form.email || ""),
      "Interested in: " + (form.interests.length ? form.interests.join(", ") : "None selected"),
      "",
      (form.message || ""),
    ];
    const url =
      "mailto:spectraassets@gmail.com" +
      "?subject=" + encodeURIComponent("Website enquiry from " + (form.name || "a visitor")) +
      "&body=" + encodeURIComponent(lines.join("\n"));
    try { if (typeof window !== "undefined") window.location.href = url; } catch (e2) {}
    setFormDone(true);
    setTimeout(() => { setFormDone(false); setForm({ name: "", phone: "", email: "", interests: [], message: "" }); }, 7000);
  };
  const toggleInterest = (v) => setForm((s) => ({ ...s, interests: s.interests.includes(v) ? s.interests.filter((x) => x !== v) : [...s.interests, v] }));

  const isSol = page === "solutions" || page.startsWith("sol-");
  const navC = (active) => (active ? TEAL : "#374151");
  const navW = (active) => (active ? 600 : 400);

  /* ---------- shared building blocks ---------- */
  const CtaBanner = ({ head, em, sub, label = "Talk to an Advisor" }) => (
    <section style={{ padding: "0 32px 88px", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ background: TEAL, borderRadius: 20, padding: "56px 60px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
        <div>
          <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.7px", marginBottom: 10, lineHeight: 1.1 }}>{head}{em ? <em style={{ fontStyle: "normal", opacity: 0.85 }}> {em}</em> : null}</h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.78)", maxWidth: 380, lineHeight: 1.65 }}>{sub}</p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <CtaPrimary onClick={() => go("contact")} base="#fff" color={TEAL} sweep="linear-gradient(90deg,#0F1729,#132a3a)" glow="rgba(0,0,0,0.28)" fontSize={15} pad="15px 30px">{label} →</CtaPrimary>
        </div>
      </div>
    </section>
  );

  /* ============================ RENDER ============================ */
  return (
    <div style={{ background: "#fff" }}>
      <CustomCursor />
      {/* PAGE TRANSITION WIPE (two-tone teal + navy sweep on navigation) */}
      {wipeKey > 0 && (
        <div key={wipeKey} aria-hidden="true">
          <div className="sp-wipe" style={{ background: NAVY }}></div>
          <div className="sp-wipe" style={{ background: TEAL, animationDelay: "0.08s" }}></div>
        </div>
      )}
      {/* PAGE LOADER */}
      {loaderState !== "gone" && (
        <div id="page-loader">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="pl-strip" style={{ left: `${i * (100 / 6)}%`, width: "calc(16.6667% + 1px)", animationDelay: `${1.2 + i * 0.09}s` }}></div>
          ))}
          <div className="pl-logo">
            <img src={LOGO} alt="Spectra Assets" style={{ height: 58, width: "auto", animation: "plLogoIn 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both" }} />
            <div style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", textAlign: "center", lineHeight: 1.1, animation: "plLogoIn 0.7s 0.25s cubic-bezier(0.16,1,0.3,1) both" }}>Spectra <em style={{ fontStyle: "normal", color: TEAL }}>Assets</em></div>
          </div>
        </div>
      )}

      {/* SCROLL PROGRESS LINE */}
      <div id="scroll-line-track"><div id="scroll-line-fill" ref={fillRef} style={{ height: "0%" }}></div></div>

      {/* NAV */}
      <nav data-navbar style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: 64, background: "#fff", borderBottom: "1px solid #F0F2F5", display: "flex", alignItems: "center", padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => go("home")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
            <img src={LOGO} alt="Spectra Assets" style={{ height: 38, width: "auto" }} />
          </button>
          <div className="sp-nav-links" style={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }}>
            <S as="button" onClick={() => go("home")} css={`background:none;border:none;cursor:pointer;font-size:14px;font-weight:${navW(page === "home")};color:${navC(page === "home")};padding:8px 14px;border-radius:8px;transition:color 0.15s;`} hover="color:#009B8D;">Home</S>
            <S as="button" onClick={() => go("about")} css={`background:none;border:none;cursor:pointer;font-size:14px;font-weight:${navW(page === "about")};color:${navC(page === "about")};padding:8px 14px;border-radius:8px;transition:color 0.15s;`} hover="color:#009B8D;">About</S>

            {/* Solutions dropdown */}
            <div style={{ position: "relative" }}>
              <S as="button" onClick={() => setDrop(drop === "sol" ? null : "sol")} css={`background:none;border:none;cursor:pointer;font-size:14px;font-weight:${navW(isSol)};color:${navC(isSol)};padding:8px 14px;border-radius:8px;transition:color 0.15s;display:flex;align-items:center;gap:5px;`} hover="color:#009B8D;">
                Solutions
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s", transform: drop === "sol" ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="2,4 6,8 10,4"></polyline></svg>
              </S>
              {drop === "sol" && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#fff", border: "1px solid #F0F2F5", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(15,23,41,0.12)", minWidth: 240, zIndex: 300 }}>
                  {CAT_ORDER.map((k) => (
                    <div key={k} onMouseEnter={() => setSolHover(k)} style={{ position: "relative" }}>
                      <S as="button" onClick={() => go("sol-" + k, k)} css={`width:100%;background:${solHover === k ? "#F9FAFB" : "none"};border:none;cursor:pointer;font-size:13px;font-weight:500;color:${solHover === k ? "#009B8D" : "#374151"};padding:10px 14px;border-radius:8px;text-align:left;transition:all 0.12s;display:flex;align-items:center;justify-content:space-between;gap:10px;`} hover="background:#F9FAFB;color:#009B8D;">
                        {CATS[k].nav}
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4,2 8,6 4,10"></polyline></svg>
                      </S>
                      {solHover === k && (
                        <div style={{ position: "absolute", left: "100%", top: -8, marginLeft: 4, background: "#fff", border: "1px solid #F0F2F5", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(15,23,41,0.14)", minWidth: 250, maxHeight: 420, overflowY: "auto", zIndex: 400 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "0.8px", textTransform: "uppercase", padding: "6px 14px 8px" }}>{CATS[k].nav}</div>
                          {catMenu(CATS[k]).map((m, mi) => (
                            <S key={mi} as="button" onClick={() => go("sol-" + k, k, m.anchor)} css="width:100%;background:none;border:none;cursor:pointer;font-size:13px;font-weight:500;color:#374151;padding:9px 14px;border-radius:8px;text-align:left;transition:all 0.12s;" hover="background:#F9FAFB;color:#009B8D;">{m.label}</S>
                          ))}
                          <div style={{ height: 1, background: "#F0F2F5", margin: "4px 8px" }}></div>
                          <S as="button" onClick={() => go("sol-" + k, k)} css="width:100%;background:none;border:none;cursor:pointer;font-size:12px;font-weight:600;color:#009B8D;padding:8px 14px;border-radius:8px;text-align:left;transition:background 0.12s;" hover="background:#F0FAF9;">Open {CATS[k].nav} page →</S>
                        </div>
                      )}
                    </div>
                  ))}
                  <div style={{ height: 1, background: "#F0F2F5", margin: "4px 8px" }}></div>
                  <S as="button" onClick={() => go("solutions")} css="width:100%;background:none;border:none;cursor:pointer;font-size:12px;font-weight:600;color:#009B8D;padding:8px 14px;border-radius:8px;text-align:left;transition:background 0.12s;" hover="background:#F0FAF9;">View all solutions →</S>
                </div>
              )}
            </div>

            {/* Tools dropdown */}
            <div style={{ position: "relative" }}>
              <S as="button" onClick={() => setDrop(drop === "tools" ? null : "tools")} css={`background:none;border:none;cursor:pointer;font-size:14px;font-weight:${navW(page.startsWith("tool-"))};color:${navC(page.startsWith("tool-"))};padding:8px 14px;border-radius:8px;transition:color 0.15s;display:flex;align-items:center;gap:5px;`} hover="color:#009B8D;">
                Tools
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s", transform: drop === "tools" ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="2,4 6,8 10,4"></polyline></svg>
              </S>
              {drop === "tools" && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#fff", border: "1px solid #F0F2F5", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(15,23,41,0.12)", minWidth: 200, zIndex: 300 }}>
                  {[
                    ["SIP Calculator", () => { setInvestMode("sip"); go("tool-invest"); }],
                    ["Lumpsum Calculator", () => { setInvestMode("lumpsum"); go("tool-invest"); }],
                    ["SWP Calculator", () => go("tool-swp")],
                    ["Loan / EMI Calculator", () => go("tool-loan")],
                  ].map(([l, fn]) => (
                    <S key={l} as="button" onClick={fn} css="width:100%;background:none;border:none;cursor:pointer;font-size:13px;font-weight:500;color:#374151;padding:10px 14px;border-radius:8px;text-align:left;transition:all 0.12s;" hover="background:#F9FAFB;color:#009B8D;">{l}</S>
                  ))}
                </div>
              )}
            </div>

            {/* Forms dropdown */}
            <div style={{ position: "relative" }}>
              <S as="button" onClick={() => setDrop(drop === "forms" ? null : "forms")} css={`background:none;border:none;cursor:pointer;font-size:14px;font-weight:${navW(page === "forms")};color:${navC(page === "forms")};padding:8px 14px;border-radius:8px;transition:color 0.15s;display:flex;align-items:center;gap:5px;`} hover="color:#009B8D;">
                Forms
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s", transform: drop === "forms" ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="2,4 6,8 10,4"></polyline></svg>
              </S>
              {drop === "forms" && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#fff", border: "1px solid #F0F2F5", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(15,23,41,0.12)", minWidth: 200, zIndex: 300 }}>
                  <S as="button" onClick={() => go("forms")} css="width:100%;background:none;border:none;cursor:pointer;font-size:13px;font-weight:600;color:#009B8D;padding:10px 14px;border-radius:8px;text-align:left;transition:background 0.12s;" hover="background:#F0FAF9;">View all forms →</S>
                </div>
              )}
            </div>

            {/* Media dropdown */}
            <div style={{ position: "relative" }}>
              <S as="button" onClick={() => setDrop(drop === "media" ? null : "media")} css="background:none;border:none;cursor:pointer;font-size:14px;font-weight:400;color:#374151;padding:8px 14px;border-radius:8px;transition:color 0.15s;display:flex;align-items:center;gap:5px;" hover="color:#009B8D;">
                Media
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s", transform: drop === "media" ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="2,4 6,8 10,4"></polyline></svg>
              </S>
              {drop === "media" && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: "#fff", border: "1px solid #F0F2F5", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(15,23,41,0.12)", minWidth: 190, zIndex: 300 }}>
                  {[["Instagram", "https://instagram.com", <><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>],
                    ["Facebook", "https://facebook.com", <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>],
                    ["LinkedIn", "https://linkedin.com", <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></>],
                  ].map(([label, href, icon]) => (
                    <S key={label} as="a" href={href} target="_blank" rel="noopener" css="width:100%;box-sizing:border-box;font-size:13px;font-weight:500;color:#374151;padding:10px 14px;border-radius:8px;text-align:left;display:flex;align-items:center;gap:10px;transition:all 0.12s;text-decoration:none;" hover="background:#F9FAFB;color:#009B8D;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>{label}
                    </S>
                  ))}
                </div>
              )}
            </div>

            <S as="button" onClick={() => go("contact")} css={`background:none;border:none;cursor:pointer;font-size:14px;font-weight:${navW(page === "contact")};color:${navC(page === "contact")};padding:8px 14px;border-radius:8px;transition:color 0.15s;`} hover="color:#009B8D;">Contact</S>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="sp-burger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu" style={{ display: "none", alignItems: "center", justifyContent: "center", width: 40, height: 40, background: "none", border: "1px solid #F0F2F5", borderRadius: 8, cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={NAVY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></> : <><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></>}
              </svg>
            </button>
            <S as="button" onClick={() => go("contact")} css="background:#009B8D;color:#fff;border:none;cursor:pointer;font-weight:600;font-size:13px;padding:9px 20px;border-radius:8px;letter-spacing:0.1px;transition:opacity 0.15s;" hover="opacity:0.85;">Get in touch</S>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{ position: "fixed", top: 64, left: 0, right: 0, bottom: 0, zIndex: 99, background: "#fff", overflowY: "auto", padding: "12px 24px 48px", borderTop: "1px solid #F0F2F5" }}>
          {[["Home", "home"], ["About", "about"]].map(([l, p]) => (
            <button key={p} onClick={() => go(p)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid #F5F6F8", padding: "16px 0", fontSize: 16, fontWeight: 600, color: NAVY, cursor: "pointer" }}>{l}</button>
          ))}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "1.2px", textTransform: "uppercase", padding: "20px 0 8px" }}>Solutions</div>
          {CAT_ORDER.map((k) => (
            <div key={k}>
              <button onClick={() => setMobSol(mobSol === k ? null : k)} style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: 15, fontWeight: 500, color: "#374151", cursor: "pointer" }}>
                {CATS[k].nav}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.25s", transform: mobSol === k ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {mobSol === k && (
                <div style={{ padding: "0 0 10px 12px", borderLeft: "2px solid #F0F2F5", marginLeft: 2 }}>
                  <button onClick={() => go("sol-" + k, k)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 0 8px 12px", fontSize: 13, fontWeight: 600, color: TEAL, cursor: "pointer" }}>Open {CATS[k].nav} page →</button>
                  {catMenu(CATS[k]).map((m, mi) => (
                    <button key={mi} onClick={() => go("sol-" + k, k, m.anchor)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 0 8px 12px", fontSize: 14, color: "#6B7280", cursor: "pointer" }}>{m.label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={() => go("solutions")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: 14, fontWeight: 600, color: TEAL, cursor: "pointer" }}>View all solutions →</button>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "1.2px", textTransform: "uppercase", padding: "20px 0 8px", borderTop: "1px solid #F5F6F8", marginTop: 8 }}>Tools</div>
          {[
            ["SIP Calculator", () => { setInvestMode("sip"); go("tool-invest"); }],
            ["Lumpsum Calculator", () => { setInvestMode("lumpsum"); go("tool-invest"); }],
            ["SWP Calculator", () => go("tool-swp")],
            ["Loan / EMI Calculator", () => go("tool-loan")],
          ].map(([l, fn]) => (
            <button key={l} onClick={fn} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: 15, color: "#374151", cursor: "pointer" }}>{l}</button>
          ))}
          {[["Forms", "forms"], ["Contact", "contact"]].map(([l, p]) => (
            <button key={p} onClick={() => go(p)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderTop: "1px solid #F5F6F8", marginTop: 8, padding: "16px 0", fontSize: 16, fontWeight: 600, color: NAVY, cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      )}

      {page === "home" && <Home go={go} openMember={openMember} setOpenMember={setOpenMember} CtaBanner={CtaBanner} />}
      {page === "about" && <About go={go} CtaBanner={CtaBanner} />}
      {page === "solutions" && <Solutions go={go} tab={tab} setTab={setTab} CtaBanner={CtaBanner} />}
      {page.startsWith("sol-") && <Category cat={CATS[page.slice(4)]} go={go} faq={faq} toggleFaq={toggleFaq} CtaBanner={CtaBanner} />}
      {page === "tool-invest" && <ToolInvest mode={investMode} setMode={setInvestMode} sip={sip} setSip={setSip} lump={lump} setLump={setLump} fmt={fmt} inr={inr} sipFV={sipFV} lumpFV={lumpFV} go={go} />}
      {page === "tool-swp" && <ToolSwp swp={swp} setSwp={setSwp} fmt={fmt} inr={inr} swpBal={swpBal} go={go} />}
      {page === "tool-loan" && <ToolLoan loan={loan} setLoan={setLoan} fmt={fmt} inr={inr} loanEmi={loanEmi} go={go} />}
      {page === "forms" && <Forms go={go} />}
      {page === "contact" && <Contact form={form} setForm={setForm} formDone={formDone} submitForm={submitForm} toggleInterest={toggleInterest} />}

      <Footer go={go} />
      <WhatsAppButton go={go} />
    </div>
  );
}

/* ============================ HOME ============================ */
function Home({ go, openMember, setOpenMember, CtaBanner }) {
  const wrap = { maxWidth: 1100, margin: "0 auto" };
  const marketRows = useMarketData();
  return (
    <div className="page-wrap" style={{ paddingTop: 64 }}>
      {/* HERO with faint live-market backdrop */}
      <section style={{ position: "relative", overflow: "hidden", background: "#fff" }}>
        <Aurora />
        <HeroNumbersBg rows={marketRows} />
        <div aria-hidden="true" className="sp-hero-veil" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(90deg, rgba(255,255,255,0.96) 0%, rgba(255,255,255,0.92) 44%, rgba(255,255,255,0.55) 62%, rgba(255,255,255,0) 78%)" }}></div>
        <div className="sp-grid-2" style={{ position: "relative", zIndex: 1, padding: "64px 32px 44px", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
          <WordReveal as="h1" text="Financial advice that looks at the bigger picture." emFrom={6} baseDelay={200} style={{ fontSize: "clamp(40px,5vw,68px)", fontWeight: 800, color: NAVY, lineHeight: 1.08, marginBottom: 26 }} />
          <p style={{ fontSize: 17, color: "#6B7280", lineHeight: 1.75, maxWidth: 440, marginBottom: 24, fontWeight: 400 }}>Money rarely comes with just one goal. We help individuals, families and businesses make informed decisions across wealth creation, insurance, lending and financial planning, with the bigger picture always in focus.</p>
          <p style={{ fontSize: 15, color: "#9CA3AF", lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}>Because a financial product may solve one need. A well-thought-out strategy can connect them all.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
            <CtaPrimary onClick={() => go("contact")}>Talk to an Advisor</CtaPrimary>
            <S as="button" onClick={() => go("solutions")} css="background:none;border:none;cursor:pointer;font-size:14px;font-weight:500;color:#6B7280;padding:0;letter-spacing:-0.1px;transition:color 0.15s;" hover="color:#0F1729;">Explore our solutions →</S>
          </div>
        </div>
          <HeroChart />
        </div>
      </section>

      {/* OUR NUMBERS (centered) */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "68px 32px", textAlign: "center", borderTop: "1px solid #F0F2F5" }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 12, letterSpacing: "0.3px" }}>Our numbers</p>
        <h2 style={{ fontSize: "clamp(26px,3.2vw,40px)", fontWeight: 600, color: NAVY, letterSpacing: "-0.5px", marginBottom: 44 }}>Built on relationships. Growing with purpose.</h2>
        <div className="sp-numrow" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
          {[{ p: "₹", v: 140, s: "Cr+", l: "Assets under management" }, { p: "", v: 350, s: "+", l: "Client families & businesses" }, { p: "", v: 600, s: "+", l: "Portfolios managed" }].map((it, i) => (
            <div key={i} style={{ padding: "8px 48px", borderRight: i < 2 ? "1px solid #F0F2F5" : "none" }}>
              <div className="ff-serif" style={{ fontSize: 48, fontWeight: 700, color: NAVY, lineHeight: 1 }}><CountUp to={it.v} prefix={it.p} suffix={it.s} /></div>
              <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 8 }}>{it.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ background: "#F9FAFB", borderTop: "1px solid #F0F2F5", borderBottom: "1px solid #F0F2F5", padding: "80px 32px" }}>
        <div className="sp-grid-2" style={{ ...wrap, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 96, alignItems: "start" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 20 }}>Our story</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,42px)", fontWeight: 800, color: NAVY, letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 28 }}>We didn't start with products. We started with <em style={{ fontStyle: "normal", color: TEAL }}>people.</em></h2>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 20 }}>Every individual has a different story. A young professional wants to build wealth. Parents dream of giving their children the best education. Entrepreneurs work tirelessly to grow their businesses.</p>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8 }}>Yet most financial advice is delivered in pieces, investments here, insurance there, loans somewhere else. Spectra Assets was built to bring every financial decision together under one trusted relationship.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[["One trusted relationship.", "Every financial decision, brought together under a single point of contact, not scattered across firms."],
              ["Every decision connected.", "The best solutions are created when investments, protection and planning work together."],
              ["Clarity, confidence, purpose.", "We help clients navigate life with clarity, because when every decision works together, progress becomes meaningful."]].map(([t, d], i, arr) => (
              <div key={i} style={{ background: "#fff", padding: "28px 32px", border: "1px solid #F0F2F5", borderTop: i === 0 ? "1px solid #F0F2F5" : "none", borderRadius: i === 0 ? "16px 16px 0 0" : i === arr.length - 1 ? "0 0 16px 16px" : "0" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 6 }}>{t}</div>
                <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.65 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE SPECTRA ECOSYSTEM */}
      <section style={{ background: NAVY, padding: "88px 32px", position: "relative", overflow: "hidden" }}>
        <div className="parallax-slow" style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,155,141,0.10) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ ...wrap, position: "relative", zIndex: 1, textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 14 }}>The Spectra ecosystem</p>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", lineHeight: 1.1, marginBottom: 16 }}>One advisory system. One relationship.<br /><em style={{ fontStyle: "normal", color: TEAL }}>A complete financial perspective.</em></h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto 56px", lineHeight: 1.7 }}>Wealth, protection, lending and planning, connected around you, not sold in silos.</p>
          <Ecosystem go={go} />
        </div>
      </section>

      {/* PROCESS TIMELINE (scroll-animated) */}
      <section id="process-section" style={{ position: "relative", height: "380vh", background: "#F9FAFB", borderTop: "1px solid #F0F2F5", borderBottom: "1px solid #F0F2F5" }}>
        <div style={{ position: "sticky", top: 64, height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 40px", overflow: "hidden" }}>
          <div style={{ maxWidth: 880, margin: "0 auto", width: "100%" }}>
            <div style={{ marginBottom: 48 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 12 }}>Our approach</p>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: NAVY, letterSpacing: "-1px", lineHeight: 1.08 }}>It begins with understanding you, <br />then building around it.</h2>
            </div>
            <div style={{ position: "relative" }}>
              <svg viewBox="0 0 880 380" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1, overflow: "visible" }}>
                <path d="M 176,95 L 704,95 L 704,285 L 176,285" stroke="#E5E7EB" strokeWidth="2" strokeDasharray="6 6" fill="none"></path>
                <path id="proc-seg-1" d="M 176,95 L 704,95" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="528" strokeDashoffset="528"></path>
                <path id="proc-seg-2" d="M 704,95 L 704,285" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="190" strokeDashoffset="190"></path>
                <path id="proc-seg-3" d="M 704,285 L 176,285" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="528" strokeDashoffset="528"></path>
                {[["proc-dot-1", 176, 95], ["proc-dot-2", 704, 95], ["proc-dot-3", 704, 285], ["proc-dot-4", 176, 285]].map(([id, cx, cy]) => (
                  <circle key={id} id={id} cx={cx} cy={cy} r="7" fill="#fff" stroke="#E5E7EB" strokeWidth="2"></circle>
                ))}
              </svg>
              {(() => {
                const steps = [
                  ["01", "Understand you", "Where are you today? What matters to you? Where do you want to go? Everything begins with listening."],
                  ["02", "Clarify what matters", "We map your goals and priorities so recommendations follow your life, not a product shelf."],
                  ["03", "Build the strategy", "A connected plan across investments, protection, lending and planning, explained plainly."],
                  ["04", "Stay with you", "Reviewing progress, adapting strategies and supporting you through every important milestone."],
                ];
                // grid fills TL, TR, BL, BR — place so the line flows 1→2→3→4:
                // TL=1, TR=2, BL=4, BR=3 (i.e. 3 sits below 2, 4 beside it)
                const gridOrder = [0, 1, 3, 2];
                return (
                  <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, position: "relative", zIndex: 2 }}>
                    {gridOrder.map((si) => {
                      const [num, t, d] = steps[si];
                      const n = si + 1;
                      return (
                        <TiltCard key={n} max={7} radius={18}>
                          <div id={"proc-card-" + n} style={{ background: "#fff", borderRadius: 18, padding: "32px 36px", border: "1px solid #F0F2F5", transition: "border-color 0.4s, box-shadow 0.4s" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                              <div id={"proc-num-" + n} style={{ width: 36, height: 36, borderRadius: 10, background: "#F9FAFB", border: "2px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: "#9CA3AF", flexShrink: 0, transition: "all 0.4s" }}>{num}</div>
                              <div style={{ fontSize: 17, fontWeight: 700, color: NAVY }}>{t}</div>
                            </div>
                            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75 }}>{d}</p>
                          </div>
                        </TiltCard>
                      );
                    })}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* spacer between sections */}
      <div style={{ height: 96, background: "#fff" }}></div>

      {/* WHAT WE BELIEVE (stacking cards) */}
      <section id="stack-section" style={{ position: "relative", height: "500vh", background: NAVY }}>
        <div style={{ position: "sticky", top: 64, height: "calc(100vh - 64px)", display: "flex", flexDirection: "column", alignItems: "center", overflow: "hidden", padding: "48px 40px 32px" }}>
          <div style={{ textAlign: "center", marginBottom: 36, flexShrink: 0, width: "100%" }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, letterSpacing: "0.2px", marginBottom: 12 }}>What we believe</p>
            <h2 style={{ fontSize: "clamp(30px,4vw,52px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", lineHeight: 1.06 }}>Five principles that guide <em style={{ fontStyle: "normal", color: TEAL }}>every conversation.</em></h2>
          </div>
          <div style={{ position: "relative", width: "100%", maxWidth: 960, flex: 1, minHeight: 0 }}>
            {PRINCIPLES.map((p, i) => {
              const last = i === PRINCIPLES.length - 1;
              return (
                <div key={i} id={"stack-card-" + i} style={{ position: "absolute", inset: 0, background: last ? "#0A1929" : "#fff", border: last ? "1px solid rgba(0,155,141,0.25)" : "none", borderRadius: 20, padding: "44px 52px", display: "flex", flexDirection: "column", justifyContent: "center", willChange: "transform, opacity", transform: "translateY(120px)", opacity: 0, boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: TEAL, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 18 }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, color: last ? "#fff" : NAVY, letterSpacing: "-0.6px", lineHeight: 1.15, marginBottom: 16, maxWidth: 640 }}>{p.t}</h3>
                  <p style={{ fontSize: 16, color: last ? "#8A9BB0" : "#6B7280", lineHeight: 1.75, maxWidth: 620 }}>{p.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* spacer between sections */}
      <div style={{ height: 96, background: "#fff" }}></div>

      {/* WHY CLIENTS CHOOSE SPECTRA */}
      <section style={{ padding: "88px 32px", ...wrap }}>
        <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 16 }}>Why clients choose Spectra</p>
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 800, color: NAVY, letterSpacing: "-0.8px", lineHeight: 1.1, marginBottom: 20 }}>Good advice doesn't end after the first meeting.</h2>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 16 }}>Our commitment extends beyond recommendations. We believe in staying connected, reviewing progress, adapting strategies and supporting clients through every important financial milestone.</p>
            <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8 }}>Because lasting financial confidence is built through continuous guidance, not one-time conversations.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[["First investment", "We help you take the first step with clarity and confidence."],
              ["At claim time", "We assist and stay by your side when an insurance claim matters most."],
              ["As goals evolve", "We review and adapt your financial plan as your life changes."],
              ["Every milestone", "Continuous guidance through each important financial decision."]].map(([t, d], i) => (
              <div key={i} style={{ background: "#F9FAFB", borderRadius: 14, padding: 22 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: TEAL, marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WORKING WITH SPECTRA FEELS LIKE */}
      <FeatureRows />

      {/* OUR NETWORK */}
      <section style={{ background: "#F9FAFB", borderTop: "1px solid #F0F2F5", borderBottom: "1px solid #F0F2F5", padding: "72px 32px" }}>
        <div style={{ ...wrap, textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 14 }}>Our network of financial institutions</p>
          <h2 style={{ fontSize: "clamp(22px,2.6vw,32px)", fontWeight: 800, color: NAVY, letterSpacing: "-0.6px", maxWidth: 640, margin: "0 auto 16px", lineHeight: 1.2 }}>The right advice is strengthened by the right financial ecosystem.</h2>
          <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.7 }}>We work with established institutions across investments, insurance and capital markets, giving clients access to a broad range of products while ensuring every recommendation stays aligned with your goals.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {NETWORK.map((n, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #F0F2F5", borderRadius: 12, padding: "16px 28px", fontSize: 15, fontWeight: 700, color: "#374151", boxShadow: "0 2px 12px rgba(15,23,41,0.04)" }}>{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section style={{ padding: "80px 32px", ...wrap }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 48, gap: 24, flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 10 }}>Leadership</p>
            <h2 style={{ fontSize: "clamp(26px,3vw,38px)", fontWeight: 800, color: NAVY, letterSpacing: "-0.8px" }}>Expertise across every financial need.</h2>
          </div>
        </div>
        {TEAM.map((m, i) => {
          const open = openMember === i;
          return (
            <div key={i} style={{ position: "relative", borderTop: "1px solid #F0F2F5", borderBottom: i === TEAM.length - 1 ? "1px solid #F0F2F5" : "none", background: open ? "linear-gradient(90deg, rgba(0,155,141,0.035), transparent 60%)" : "transparent", transition: "background 0.4s" }}>
              <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 12, bottom: 12, width: 3, borderRadius: 3, background: m.accent, transform: open ? "scaleY(1)" : "scaleY(0)", transformOrigin: "center", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}></div>
              <button onClick={() => setOpenMember(open ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 20, padding: "26px 18px", textAlign: "left" }}>
                <div style={{ width: 48, height: 48, flexShrink: 0, borderRadius: "50%", background: m.accent, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 18, transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.45s", transform: open ? "scale(1.1)" : "scale(1)", boxShadow: open ? `0 10px 26px ${m.accent}55` : "none" }}>{m.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: open ? m.accent : NAVY, transition: "color 0.3s" }}>{m.name}</div>
                  <div style={{ fontSize: 13, color: m.accent, fontWeight: 500, marginTop: 2 }}>{m.role}</div>
                </div>
                <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: "50%", border: `1.5px solid ${open ? m.accent : "#E5E7EB"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 300, color: open ? m.accent : "#9CA3AF", transition: "transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, color 0.3s", transform: open ? "rotate(135deg)" : "rotate(0deg)" }}>+</div>
              </button>
              <div style={{ overflow: "hidden", maxHeight: open ? 900 : 0, transition: "max-height 0.55s cubic-bezier(0.16,1,0.3,1)" }}>
                <div className="sp-grid-2 sp-team-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, padding: "10px 18px 40px 86px" }}>
                  <div className="sp-team-stats" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    {m.stats.map((st, j) => (
                      <div key={j} style={{ background: "#F9FAFB", borderRadius: 14, padding: 20, animation: open ? `accItem 0.55s ${0.09 * j + 0.12}s both` : "none" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>{st.k}</div>
                        <div className="ff-serif" style={{ fontSize: 24, fontWeight: 700, color: NAVY, lineHeight: 1.1 }}>{st.v}</div>
                        <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>{st.n}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", animation: open ? "accItem 0.6s 0.42s both" : "none" }}>
                    <div className="ff-serif" style={{ fontSize: 44, color: m.accent, fontWeight: 600, marginBottom: 2, lineHeight: 1 }}>&ldquo;</div>
                    <p style={{ fontSize: 16, color: "#374151", lineHeight: 1.75, fontStyle: "italic", marginBottom: 20 }}>{m.quote}</p>
                    <div style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{m.role}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* TESTIMONIALS placeholder */}
      <section style={{ padding: "0 32px 88px", ...wrap }}>
        <div style={{ background: "#F9FAFB", border: "1px solid #F0F2F5", borderRadius: 20, padding: "56px 48px", textAlign: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 12 }}>Client stories</p>
          <h2 style={{ fontSize: "clamp(24px,3vw,34px)", fontWeight: 800, color: NAVY, letterSpacing: "-0.7px", marginBottom: 12 }}>Trusted by families & businesses across Mumbai.</h2>
          <p style={{ fontSize: 15, color: "#6B7280", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>We're collecting stories from the clients we work with. Testimonials will appear here soon.</p>
        </div>
      </section>

      <CtaBanner head="Ready to take the next step?" sub="Talk to an advisor for an honest, no-obligation conversation about your money." label="Talk to an Advisor" />
    </div>
  );
}

/* hero animated chart (from design) */
function HeroChart() {
  return (
    <div className="parallax-slow" style={{ position: "relative", height: 420, animation: "fadeUp2 0.8s 0.2s both" }}>
      <div style={{ background: "#fff", border: "1px solid #F0F2F5", borderRadius: 20, padding: "24px 24px 16px", boxShadow: "0 4px 40px rgba(15,23,41,0.07)", position: "absolute", top: 20, left: 0, right: 0, bottom: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 6 }}>Portfolio Value</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: NAVY, letterSpacing: "-1px", lineHeight: 1 }}>₹24,80,000</div>
          </div>
          <div style={{ background: "#ECFDF5", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><polyline points="1,9 5,4 8,7 11,2" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></polyline></svg>
            <span style={{ fontSize: 13, fontWeight: 700, color: TEAL }}>+18.4%</span>
          </div>
        </div>
        <div style={{ fontSize: 12, color: "#9CA3AF", marginBottom: 16 }}>1 year returns</div>
        <div style={{ position: "relative", height: 160, margin: "0 -4px" }}>
          <svg viewBox="0 0 460 160" fill="none" style={{ width: "100%", height: "100%", display: "block", overflow: "visible" }}>
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={TEAL} stopOpacity="0.28"></stop><stop offset="100%" stopColor={TEAL} stopOpacity="0"></stop></linearGradient>
              <linearGradient id="chartStroke" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#007D72"></stop><stop offset="55%" stopColor={TEAL}></stop><stop offset="100%" stopColor="#00C9B6"></stop></linearGradient>
              <filter id="chartGlow" x="-20%" y="-60%" width="140%" height="240%"><feGaussianBlur stdDeviation="3.2" result="b"></feGaussianBlur><feMerge><feMergeNode in="b"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge></filter>
            </defs>
            {[130, 95, 60, 25].map((y) => <line key={y} x1="0" y1={y} x2="460" y2={y} stroke="#F3F4F6" strokeWidth="1"></line>)}
            <path d="M0,130 C30,128 50,124 80,118 C110,112 130,108 155,100 C180,92 200,96 225,84 C250,72 270,76 295,62 C320,48 340,44 365,32 C390,20 420,18 460,14 L460,160 L0,160 Z" fill="url(#chartGrad)" opacity="0.55"></path>
            <path d="M0,130 C30,128 50,124 80,118 C110,112 130,108 155,100 C180,92 200,96 225,84 C250,72 270,76 295,62 C320,48 340,44 365,32 C390,20 420,18 460,14" stroke="url(#chartStroke)" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" filter="url(#chartGlow)" strokeDasharray="600" style={{ animation: "drawLine 2s 0.5s cubic-bezier(0.4,0,0.2,1) both" }}></path>
            <g className="hero-dot-travel" style={{ offsetPath: "path('M0,130 C30,128 50,124 80,118 C110,112 130,108 155,100 C180,92 200,96 225,84 C250,72 270,76 295,62 C320,48 340,44 365,32 C390,20 420,18 460,14')" }}>
              <circle r="8" fill={TEAL} opacity="0.2"><animate attributeName="r" values="7;16;7" dur="2.4s" begin="2.5s" repeatCount="indefinite"></animate><animate attributeName="opacity" values="0.3;0;0.3" dur="2.4s" begin="2.5s" repeatCount="indefinite"></animate></circle>
              <circle r="5" fill={TEAL} stroke="#fff" strokeWidth="2.5"></circle>
            </g>
          </svg>
          <div style={{ position: "absolute", top: -6, right: 2, transform: "translateY(-100%)", background: NAVY, color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 9px", borderRadius: 8, boxShadow: "0 10px 26px rgba(15,23,41,0.32)", whiteSpace: "nowrap", animation: "fadeUp2 0.5s 2.5s both", pointerEvents: "none" }}>
            ₹24,80,000
            <span style={{ position: "absolute", bottom: -3, right: 13, width: 8, height: 8, background: NAVY, transform: "rotate(45deg)" }}></span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "0 4px", marginTop: -2 }}>
            {["Jul '24", "Oct '24", "Jan '25", "Apr '25", "Jul '25"].map((l) => <span key={l} style={{ fontSize: 10, color: "#C4CAD4" }}>{l}</span>)}
          </div>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 24, left: -24, background: "#fff", border: "1px solid #F0F2F5", borderRadius: 14, padding: "14px 18px", boxShadow: "0 8px 32px rgba(15,23,41,0.1)", zIndex: 2, animation: "floatA 4s 1s ease-in-out infinite", minWidth: 150 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 6 }}>Monthly SIP</div>
        <div style={{ fontSize: 20, fontWeight: 800, color: NAVY, letterSpacing: "-0.5px" }}>₹25,000</div>
        <div style={{ fontSize: 11, color: TEAL, fontWeight: 500, marginTop: 3 }}>Active · 3 funds</div>
      </div>
      <div style={{ position: "absolute", top: 0, right: -16, background: NAVY, borderRadius: 14, padding: "14px 18px", boxShadow: "0 8px 32px rgba(15,23,41,0.2)", zIndex: 2, animation: "floatB 5s 0.5s ease-in-out infinite", minWidth: 130 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.45)", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: 6 }}>XIRR</div>
        <div style={{ fontSize: 22, fontWeight: 800, color: TEAL, letterSpacing: "-0.5px" }}>26.4%</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>2 year avg.</div>
      </div>
    </div>
  );
}

/* ecosystem, 3-stage pyramid diagram (Protect → Build → Grow) */
function Ecosystem({ go }) {
  // One continuous pyramid (viewBox 600x440): all tiers share the same apex→base
  // edges, so the outer silhouette is a single clean triangle. Thin gaps between
  // bands read as tiers; a single vertical gradient keeps it cohesive.
  const [hover, setHover] = React.useState(-1);
  const tiers = [
    { label: "Grow", sub: "Securities · PMS / AIF", key: "securities",
      pts: "300,0 394.1,138 205.9,138",
      band: { top: "0%", height: "31.4%", justify: "flex-end", padBottom: 14 } },
    { label: "Build", sub: "Wealth Creation · Financial Planning", key: "wealth",
      pts: "193.6,156 406.4,156 492.3,282 107.7,282",
      band: { top: "35.5%", height: "28.6%", justify: "center", padBottom: 0 } },
    { label: "Protect", sub: "Insurance · Loans", key: "insurance",
      pts: "95.45,300 504.55,300 600,440 0,440",
      band: { top: "68.2%", height: "31.8%", justify: "center", padBottom: 0 } },
  ];
  return (
    <div style={{ maxWidth: 560, margin: "8px auto 0" }}>
      <div style={{ position: "relative", width: "100%", aspectRatio: "600 / 440" }}>
        <svg viewBox="0 0 600 440" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
          <defs>
            <linearGradient id="sp-pyr" x1="0" y1="0" x2="0" y2="440" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#18cfbc" />
              <stop offset="52%" stopColor="#009b8d" />
              <stop offset="100%" stopColor="#0a6f64" />
            </linearGradient>
          </defs>
          {tiers.map((t, i) => (
            <polygon key={i} points={t.pts} fill="url(#sp-pyr)" stroke="url(#sp-pyr)" strokeWidth="9" strokeLinejoin="round"
              style={{ filter: hover === i ? "brightness(1.1)" : "none", transition: "filter .18s" }} />
          ))}
        </svg>
        {tiers.map((t, i) => (
          <button key={i} onClick={() => go("sol-" + t.key, t.key)} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
            style={{ position: "absolute", left: 0, right: 0, top: t.band.top, height: t.band.height, background: "transparent", border: "none", cursor: "pointer", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: t.band.justify, paddingBottom: t.band.padBottom }}>
            <div className="ff-serif" style={{ fontSize: i === 0 ? 18 : 22, fontWeight: 700, letterSpacing: "0.3px" }}>{t.label}</div>
            <div style={{ fontSize: 12, opacity: 0.92, marginTop: 3, fontWeight: 500, padding: "0 12px", textAlign: "center" }}>{t.sub}</div>
          </button>
        ))}
      </div>
      <p style={{ textAlign: "center", marginTop: 26, fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
        Protection first, then building wealth, then growth, <br />every layer managed under one relationship.
      </p>
    </div>
  );
}

/* ============================ ABOUT ============================ */
function About({ go, CtaBanner }) {
  const wrap = { maxWidth: 1100, margin: "0 auto" };
  return (
    <div className="page-wrap" style={{ paddingTop: 64 }}>
      {/* HERO */}
      <section style={{ background: NAVY, padding: "84px 40px 88px", position: "relative", overflow: "hidden" }}>
        <div className="parallax-slow" style={{ position: "absolute", top: -80, right: -80, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,155,141,0.14) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div className="parallax-fast" style={{ position: "absolute", bottom: -120, left: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ ...wrap, position: "relative", zIndex: 1 }}>
          <Reveal><p style={{ fontSize: 13, fontWeight: 600, color: TEAL, marginBottom: 16, letterSpacing: "0.4px" }}>About Spectra Assets</p></Reveal>
          <Reveal delay={80}><h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: "#fff", lineHeight: 1.06, marginBottom: 24, maxWidth: 760 }}>Your investment partner <em style={{ fontStyle: "normal", color: TEAL }}>for life.</em></h1></Reveal>
          <Reveal delay={160}><p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", maxWidth: 580, lineHeight: 1.75, marginBottom: 48 }}>Money rarely comes with just one goal. Spectra Assets brings every financial decision together under one trusted relationship, so the bigger picture always stays in focus.</p></Reveal>
          <div className="sp-numrow" style={{ display: "flex", gap: 44, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40 }}>
            {[{ p: "₹", v: 140, s: "Cr+", l: "Assets under management" }, { p: "", v: 350, s: "+", l: "Families & businesses" }, { p: "", v: 600, s: "+", l: "Portfolios managed" }].map((it, i) => (
              <div key={i}>
                <div style={{ fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: "-1.5px" }}><CountUp to={it.v} prefix={it.p} suffix={it.s} /></div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 6, letterSpacing: "0.3px", textTransform: "uppercase" }}>{it.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section style={{ padding: "84px 40px", ...wrap }}>
        <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <Reveal>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: TEAL, marginBottom: 16 }}>Our story</p>
              <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 700, color: NAVY, lineHeight: 1.15, marginBottom: 22 }}>We didn't start with products. We started with people.</h2>
              <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.85, marginBottom: 16 }}>Most financial advice is delivered in pieces, investments here, insurance there, loans somewhere else. We saw an opportunity to do things differently.</p>
              <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.85 }}>Spectra Assets helps clients navigate life with clarity, confidence and purpose. Because when every decision works together, financial progress becomes more meaningful.</p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ background: "linear-gradient(150deg,#0F1729,#132a3a)", borderRadius: 22, padding: "44px 40px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,155,141,0.22) 0%, transparent 70%)" }}></div>
              <div style={{ fontSize: 56, color: TEAL, fontWeight: 800, lineHeight: 0.6, marginBottom: 18 }}>&ldquo;</div>
              <p style={{ fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 600, color: "#fff", lineHeight: 1.5, letterSpacing: "-0.3px", position: "relative" }}>A financial product may solve one need. A well thought out strategy connects them all.</p>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 22, position: "relative" }}>The Spectra philosophy, since 2022 · Mumbai</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE BELIEVE — animated values grid */}
      <section style={{ background: "#F7F5F0", borderTop: "1px solid #EFEBE0", borderBottom: "1px solid #EFEBE0", padding: "84px 40px" }}>
        <div style={wrap}>
          <Reveal><div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: TEAL, marginBottom: 12 }}>What we believe</p>
            <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: NAVY, lineHeight: 1.1 }}>Five principles behind every conversation.</h2>
          </div></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {PRINCIPLES.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <S css="background:#fff;border:1px solid #F0F2F5;border-radius:18px;padding:30px 28px;height:100%;transition:transform 0.22s, box-shadow 0.22s, border-color 0.22s;box-shadow:0 2px 14px rgba(15,23,41,0.04);" hover="transform:translateY(-6px);box-shadow:0 20px 44px rgba(15,23,41,0.10);border-color:rgba(0,155,141,0.3);">
                  <div style={{ fontSize: 30, fontWeight: 800, color: "#E6EAF0", letterSpacing: "-1px", marginBottom: 14 }}>{String(i + 1).padStart(2, "0")}</div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: NAVY, marginBottom: 10, lineHeight: 1.3 }}>{p.t}</div>
                  <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.7 }}>{p.d}</div>
                </S>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM pyramid */}
      <section style={{ background: NAVY, padding: "88px 32px", position: "relative", overflow: "hidden" }}>
        <div className="parallax-slow" style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,155,141,0.10) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ ...wrap, position: "relative", zIndex: 1, textAlign: "center" }}>
          <Reveal><p style={{ fontSize: 13, fontWeight: 600, color: TEAL, marginBottom: 14 }}>The Spectra ecosystem</p></Reveal>
          <Reveal delay={80}><h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700, color: "#fff", lineHeight: 1.12, marginBottom: 16 }}>One advisory system. One relationship.</h2></Reveal>
          <Reveal delay={140}><p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto 52px", lineHeight: 1.7 }}>Protection, wealth and growth, layered around you and managed together.</p></Reveal>
          <Reveal delay={200}><Ecosystem go={go} /></Reveal>
        </div>
      </section>

      <CtaBanner head="Let's build your plan together." sub="Talk to an advisor about where you are today and where you want to go." label="Talk to an Advisor" />
    </div>
  );
}

/* ============================ SOLUTIONS OVERVIEW (tabbed) ============================ */
function Solutions({ go, tab, setTab, CtaBanner }) {
  const wrap = { maxWidth: 1100, margin: "0 auto" };
  const cat = CATS[tab];
  return (
    <div className="page-wrap" style={{ paddingTop: 64 }}>
      <section style={{ background: NAVY, padding: "72px 32px 80px", position: "relative", overflow: "hidden" }}>
        <div className="parallax-fast" style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,155,141,0.15) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div className="parallax-slow" style={{ position: "absolute", bottom: -60, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ ...wrap, position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 16 }}>Our solutions</p>
          <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, color: "#fff", letterSpacing: "-2px", marginBottom: 20, lineHeight: 1.03 }}>Everything you need,<br /><em style={{ fontStyle: "normal", color: TEAL }}>in one place.</em></h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", maxWidth: 460, lineHeight: 1.7 }}>Five connected solution lines. One advisory relationship, no switching between firms.</p>
        </div>
      </section>

      <div style={{ background: "#fff", borderBottom: "1px solid #F0F2F5", position: "sticky", top: 64, zIndex: 50 }}>
        <div style={{ ...wrap, padding: "0 32px", display: "flex", gap: 0, overflowX: "auto" }}>
          {CAT_ORDER.map((k) => {
            const active = tab === k;
            return (
              <button key={k} onClick={() => setTab(k)} style={{ background: "none", border: "none", borderBottom: `2px solid ${active ? TEAL : "transparent"}`, cursor: "pointer", fontSize: 14, fontWeight: active ? 600 : 400, color: active ? TEAL : "#6B7280", padding: "18px 22px", marginBottom: -1, whiteSpace: "nowrap", transition: "all 0.15s" }}>{CATS[k].nav}</button>
            );
          })}
        </div>
      </div>

      <section key={tab} style={{ padding: "64px 32px 8px", ...wrap, animation: "tabIn 0.35s ease-out both" }}>
        <div style={{ maxWidth: 640, marginBottom: 40 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#ECFDF5", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL, display: "inline-block", animation: "blink 1.5s ease-in-out infinite" }}></span>
            <span style={{ fontSize: 12, fontWeight: 600, color: TEAL }}>{cat.badge}</span>
          </div>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 800, color: NAVY, letterSpacing: "-1px", lineHeight: 1.08, marginBottom: 18 }}>{cat.titleA} <em style={{ fontStyle: "normal", color: TEAL }}>{cat.titleEm}</em></h2>
          {cat.intro.map((p, i) => <p key={i} style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.8, marginBottom: 12 }}>{p}</p>)}
          <S as="button" onClick={() => go("sol-" + cat.key, cat.key)} css="margin-top:12px;background:#009B8D;color:#fff;border:none;cursor:pointer;font-weight:700;font-size:14px;padding:13px 26px;border-radius:10px;transition:all 0.18s;" hover="background:#007D72;transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,155,141,0.3);">Explore {cat.nav} →</S>
        </div>
        <ProductGrid groups={cat.groups} />
      </section>

      <CtaBanner head="Not sure where to begin?" sub="Talk to an advisor and we'll help you find the right starting point." label="Talk to an Advisor" />
    </div>
  );
}

/* ---- product cards ---- */
function ProductCard({ name, head, body }) {
  return (
    <S css="background:#fff;border:1px solid #F0F2F5;border-radius:16px;padding:28px 30px;transition:all 0.2s;box-shadow:0 2px 16px rgba(15,23,41,0.04);height:100%;" hover="border-color:rgba(0,155,141,0.35);box-shadow:0 16px 40px rgba(15,23,41,0.08);transform:translateY(-3px);">
      <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, letterSpacing: "0.5px", textTransform: "uppercase", marginBottom: 12 }}>{name}</div>
      {head && <div style={{ fontSize: 18, fontWeight: 800, color: NAVY, letterSpacing: "-0.4px", lineHeight: 1.25, marginBottom: 12 }}>{head}</div>}
      <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.75 }}>{body}</p>
    </S>
  );
}
function CompactCard({ name, body, gold }) {
  const c = gold ? GOLD : TEAL;
  return (
    <S css="background:#fff;border:1px solid #F0F2F5;border-radius:14px;padding:20px 22px;transition:all 0.18s;height:100%;" hover={`border-color:${gold ? "rgba(201,168,76,0.4)" : "rgba(0,155,141,0.35)"};box-shadow:0 10px 28px rgba(15,23,41,0.07);`}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }}></span>
        <div style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>{name}</div>
      </div>
      <p style={{ fontSize: 13, color: "#6B7280", lineHeight: 1.65 }}>{body}</p>
    </S>
  );
}
function ProductGrid({ groups }) {
  return (
    <>
      {groups.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 40 }}>
          {g.title && <h3 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 800, color: NAVY, letterSpacing: "-0.6px", marginBottom: g.intro ? 12 : 24 }}>{g.title}</h3>}
          {g.intro && <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.75, maxWidth: 760, marginBottom: 28 }}>{g.intro}</p>}
          {g.items && (
            <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {g.items.map((it, i) => <ProductCard key={i} {...it} />)}
            </div>
          )}
          {g.sub && g.sub.map((sub, si) => (
            <div key={si} style={{ marginTop: si === 0 ? 8 : 36 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>{sub.title}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
                {sub.items.map((it, i) => <CompactCard key={i} {...it} />)}
              </div>
            </div>
          ))}
          {g.note && <div style={{ marginTop: 24 }}><CompactCard {...g.note} gold /></div>}
        </div>
      ))}
    </>
  );
}

/* ---- stacked product sections (one below the other, each with a scroll anchor) ---- */
function StackedGroups({ cat, go }) {
  let n = 0;
  return (
    <>
      {cat.groups.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 8 }}>
          {g.title && (
            <div id={anchorId(cat.key, g.title)} style={{ scrollMarginTop: 90, margin: gi === 0 ? "0 0 24px" : "44px 0 24px" }}>
              <h3 style={{ fontSize: "clamp(22px,2.6vw,30px)", fontWeight: 800, color: NAVY, letterSpacing: "-0.6px", marginBottom: g.intro ? 12 : 0 }}>{g.title}</h3>
              {g.intro && <p style={{ fontSize: 15, color: "#6B7280", lineHeight: 1.75, maxWidth: 760 }}>{g.intro}</p>}
            </div>
          )}
          {g.items && g.items.map((it, i) => {
            n++;
            const num = n;
            const flip = num % 2 === 0;
            const Text = (
              <div key="t">
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: TEAL, letterSpacing: "1px" }}>{String(num).padStart(2, "0")}</span>
                  <span style={{ width: 24, height: 1, background: "#D9DEE6" }}></span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: TEAL, letterSpacing: "0.6px", textTransform: "uppercase" }}>{it.name}</span>
                </div>
                {it.head && <h3 className="ff-serif" style={{ fontSize: "clamp(21px,2.4vw,32px)", fontWeight: 600, color: NAVY, letterSpacing: "-0.4px", lineHeight: 1.18, marginBottom: 14 }}>{it.head}</h3>}
                <p style={{ fontSize: 15, color: "#5B6472", lineHeight: 1.85, marginBottom: 20, maxWidth: 480 }}>{it.body}</p>
                <button onClick={() => go("contact")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: TEAL, padding: 0 }}>Talk to an advisor →</button>
              </div>
            );
            const Visual = <CatVisual key="v" catKey={cat.key} num={num} />;
            return (
              <div key={i} id={anchorId(cat.key, it.name)} style={{ scrollMarginTop: 90, marginBottom: 30 }}>
                <Reveal>
                  <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
                    {flip ? [Visual, Text] : [Text, Visual]}
                  </div>
                </Reveal>
              </div>
            );
          })}
          {g.sub && g.sub.map((sub, si) => (
            <div key={si} style={{ marginTop: si === 0 ? 8 : 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 16 }}>{sub.title}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: 14 }}>
                {sub.items.map((x, j) => <CompactCard key={j} {...x} />)}
              </div>
            </div>
          ))}
          {g.note && <div style={{ marginTop: 20 }}><CompactCard {...g.note} gold /></div>}
        </div>
      ))}
    </>
  );
}

/* ---- FAQ accordion ---- */
function FaqList({ items, kp, faq, toggleFaq }) {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {items.map((it, i) => {
        const key = kp + i;
        const open = !!faq[key];
        return (
          <div key={i} style={{ borderBottom: "1px solid #F0F2F5" }}>
            <button onClick={() => toggleFaq(key)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", textAlign: "left", gap: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: NAVY, lineHeight: 1.4 }}>{it.q}</span>
              <span style={{ fontSize: 20, fontWeight: 300, color: "#9CA3AF", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
            </button>
            <div style={{ overflow: "hidden", maxHeight: open ? 320 : 0, transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
              <div style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.8, paddingBottom: 22 }}>{it.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================ CATEGORY PAGE ============================ */
function Category({ cat, go, faq, toggleFaq, CtaBanner }) {
  const wrap = { maxWidth: 1100, margin: "0 auto" };
  const others = CAT_ORDER.filter((k) => k !== cat.key);
  return (
    <div className="page-wrap" style={{ paddingTop: 64 }}>
      <section style={{ background: NAVY, padding: "96px 40px 100px", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div className="parallax-slow" style={{ position: "absolute", top: -80, left: "50%", transform: "translateX(-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,155,141,0.1) 0%, transparent 65%)", pointerEvents: "none" }}></div>
        <div style={{ maxWidth: 720, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", marginBottom: 14, letterSpacing: "1px" }}>
            Home › <button onClick={() => go("solutions")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Solutions</button> › {cat.nav}
          </div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,155,141,0.15)", borderRadius: 100, padding: "5px 14px", marginBottom: 20 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: TEAL, display: "inline-block" }}></span>
            <span style={{ fontSize: 12, fontWeight: 600, color: TEAL }}>{cat.badge}</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px,5.5vw,64px)", fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 22 }}>{cat.titleA} <em style={{ fontStyle: "italic", color: TEAL }}>{cat.titleEm}</em></h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 36, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>{cat.hero}</p>
          <S as="button" onClick={() => go("contact")} css="background:#fff;color:#0F1729;border:none;cursor:pointer;font-weight:700;font-size:15px;padding:15px 34px;border-radius:10px;transition:all 0.18s;" hover="background:#F0FAF9;color:#009B8D;transform:translateY(-2px);">Talk to an Advisor →</S>
        </div>
      </section>

      <section style={{ background: "#F9FAFB", padding: "72px 40px" }}>
        <div style={wrap}>
          <div style={{ maxWidth: 760, marginBottom: 44 }}>
            {cat.intro.map((p, i) => <p key={i} style={{ fontSize: 17, color: i === 0 ? NAVY : "#6B7280", fontWeight: i === 0 ? 600 : 400, lineHeight: 1.75, marginBottom: 14 }}>{p}</p>)}
          </div>
          <StackedGroups cat={cat} go={go} />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "88px 40px", background: "#fff" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(26px,3.5vw,38px)", fontWeight: 800, color: NAVY, letterSpacing: "-0.8px", marginBottom: 10 }}>Still got questions?</h2>
          <p style={{ fontSize: 16, color: "#9CA3AF" }}>We're here to help.</p>
        </div>
        <FaqList items={GENERIC_FAQ} kp={cat.key} faq={faq} toggleFaq={toggleFaq} />
      </section>

      {/* other solutions */}
      <section style={{ padding: "0 40px 80px", ...wrap }}>
        <div style={{ background: NAVY, borderRadius: 20, padding: "48px 52px" }}>
          <h3 style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.5px", marginBottom: 6 }}>We do more than {cat.nav.toLowerCase()}.</h3>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", marginBottom: 24 }}>Explore the rest of the Spectra ecosystem.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 }}>
            {others.map((k) => (
              <S key={k} as="button" onClick={() => go("sol-" + k, k)} css="display:flex;align-items:center;justify-content:space-between;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:13px 18px;cursor:pointer;font-size:13px;font-weight:600;color:rgba(255,255,255,0.75);transition:all 0.18s;text-align:left;" hover="background:rgba(0,155,141,0.15);border-color:rgba(0,155,141,0.3);color:#fff;">{CATS[k].nav} <span style={{ opacity: 0.5 }}>→</span></S>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner head="Experience the impact" em="of expert guidance." sub="Talk to an advisor today. No obligation, no sales pitch." label="Talk to an Advisor" />
    </div>
  );
}

/* ============================ CALCULATORS ============================ */
const INVESTED_C = "#E6E8FA", RETURNS_C = "#6D5AE6";

function CalcSlider({ label, min, max, step, value, onChange, prefix, suffix }) {
  const uncapped = prefix === "₹";        // amount fields have no upper limit; rate/tenure stay bounded
  const cap = uncapped ? 1e12 : max;
  const sliderMax = uncapped ? Math.max(max, value) : max;   // slider range grows to fit a typed amount
  const onIn = (e) => { const v = Number(e.target.value); if (!Number.isNaN(v)) onChange(Math.min(cap, Math.max(0, v))); };
  const onBlurIn = (e) => { const v = Number(e.target.value); onChange(Number.isNaN(v) ? min : Math.min(cap, Math.max(min, v))); };
  const chW = Math.max(2, String(value).length) + 0.5;
  return (
    <div style={{ marginBottom: 30 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, gap: 12 }}>
        <span style={{ fontSize: 15, color: "#374151", fontWeight: 500 }}>{label}</span>
        <span style={{ background: "#ECFDF5", borderRadius: 8, padding: "6px 14px", display: "inline-flex", alignItems: "center", gap: 3 }}>
          {prefix && <span style={{ color: TEAL, fontWeight: 700, fontSize: 15 }}>{prefix}</span>}
          <input className="sp-numin" type="number" value={value} min={min} max={cap} step={step} onChange={onIn} onBlur={onBlurIn}
            style={{ width: chW + "ch", border: "none", background: "transparent", color: TEAL, fontWeight: 700, fontSize: 15, textAlign: "right", outline: "none", fontVariantNumeric: "tabular-nums", padding: 0 }} />
          {suffix && <span style={{ color: TEAL, fontWeight: 700, fontSize: 15 }}>{suffix}</span>}
        </span>
      </div>
      <input type="range" min={min} max={sliderMax} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} style={{ width: "100%", accentColor: TEAL }} />
    </div>
  );
}

/* spring-physics animated number — eases toward target with a little natural overshoot */
function useSpring(target, { stiffness = 130, damping = 18, mass = 1 } = {}) {
  const [v, setV] = React.useState(target);
  const st = React.useRef({ x: target, v: 0 });
  const raf = React.useRef();
  const last = React.useRef(null);
  React.useEffect(() => {
    const reduce = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { st.current.x = target; st.current.v = 0; setV(target); return; }
    const step = (t) => {
      if (last.current == null) last.current = t;
      let dt = (t - last.current) / 1000; last.current = t;
      if (dt > 0.032) dt = 0.032;
      const s = st.current;
      const a = (-stiffness * (s.x - target) - damping * s.v) / mass;
      s.v += a * dt; s.x += s.v * dt;
      if (Math.abs(s.v) < 0.0004 && Math.abs(s.x - target) < 0.0004) { s.x = target; s.v = 0; setV(target); last.current = null; return; }
      setV(s.x);
      raf.current = requestAnimationFrame(step);
    };
    last.current = null;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, stiffness, damping, mass]);
  return v;
}

function Donut({ a, b, aLabel, bLabel, aColor, bColor }) {
  const total = a + b || 1;
  const fA = useSpring(a / total, { stiffness: 120, damping: 17 });
  const fAc = Math.max(0, Math.min(1, fA));
  const r = 60, sw = 26, C = 2 * Math.PI * r, size = (r + sw / 2) * 2 + 4, c = size / 2;
  const bPct = Math.round((1 - fAc) * 100);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", gap: 18, fontSize: 12, color: "#6B7280", flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: aColor }}></span>{aLabel}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: bColor }}></span>{bLabel}</span>
      </div>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ maxWidth: "100%" }}>
        <g transform={`rotate(-90 ${c} ${c})`}>
          <circle cx={c} cy={c} r={r} fill="none" stroke="#F0F2F5" strokeWidth={sw} />
          <circle cx={c} cy={c} r={r} fill="none" stroke={aColor} strokeWidth={sw} strokeDasharray={`${fAc * C} ${C}`} strokeLinecap="butt" />
          <circle cx={c} cy={c} r={r} fill="none" stroke={bColor} strokeWidth={sw} strokeDasharray={`${(1 - fAc) * C} ${C}`} strokeDashoffset={-fAc * C} strokeLinecap="butt" />
        </g>
        <text x={c} y={c - 2} textAnchor="middle" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 28, fontWeight: 800, fill: NAVY }}>{bPct}%</text>
        <text x={c} y={c + 17} textAnchor="middle" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 500, fill: "#9CA3AF" }}>{bLabel}</text>
      </svg>
    </div>
  );
}

function ResultsList({ rows }) {
  return (
    <div style={{ maxWidth: 340 }}>
      {rows.map(([label, value, bold], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, padding: "9px 0" }}>
          <span style={{ fontSize: 14, color: bold ? NAVY : "#9CA3AF", fontWeight: bold ? 700 : 500 }}>{label}</span>
          <span style={{ fontSize: bold ? 20 : 16, color: NAVY, fontWeight: bold ? 800 : 600, fontVariantNumeric: "tabular-nums" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function CalcToggle({ mode, setMode }) {
  const btn = (m, l) => (
    <button onClick={() => setMode(m)} style={{ border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, padding: "8px 22px", borderRadius: 100, background: mode === m ? "#ECFDF5" : "transparent", color: mode === m ? TEAL : "#6B7280", transition: "all 0.15s" }}>{l}</button>
  );
  return <div style={{ display: "inline-flex", background: "#F3F4F6", borderRadius: 100, padding: 4 }}>{btn("sip", "SIP")}{btn("lumpsum", "Lumpsum")}</div>;
}

function CalcCard({ toggle, title, subtitle, sliders, donut, results, ctaLabel, onCta }) {
  return (
    <div className="page-wrap" style={{ paddingTop: 64 }}>
      <section style={{ padding: "56px 32px 30px", textAlign: "center", background: "#fff" }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 12 }}>Tools</p>
        <h1 style={{ fontSize: "clamp(30px,4vw,46px)", fontWeight: 700, color: NAVY, letterSpacing: "-0.5px", marginBottom: 12 }}>{title}</h1>
        <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 480, margin: "0 auto" }}>{subtitle}</p>
      </section>
      <section style={{ padding: "0 24px 96px", background: "#fff" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", background: "#fff", borderRadius: 20, border: "1px solid #EDEFF3", padding: "32px 36px", boxShadow: "0 10px 40px rgba(15,23,41,0.06)" }}>
          {toggle && <div style={{ marginBottom: 26 }}>{toggle}</div>}
          <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "center" }}>
            <div>{sliders}</div>
            <div>{donut}</div>
          </div>
          <div className="sp-calc-bottom" style={{ borderTop: "1px solid #F0F2F5", marginTop: 26, paddingTop: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
            <div>{results}</div>
            <S as="button" onClick={onCta} css="background:#009B8D;color:#fff;border:none;cursor:pointer;font-weight:700;font-size:14px;letter-spacing:0.5px;text-transform:uppercase;padding:14px 30px;border-radius:10px;white-space:nowrap;transition:all 0.18s;" hover="background:#007D72;transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,155,141,0.3);">{ctaLabel}</S>
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#9CA3AF", marginTop: 18 }}>Illustrative estimate only · Not financial advice</p>
      </section>
    </div>
  );
}

function ToolInvest({ mode, setMode, sip, setSip, lump, setLump, fmt, inr, sipFV, lumpFV, go }) {
  const isSip = mode === "sip";
  let invested, returns, total, sliders;
  if (isSip) {
    const fv = sipFV(sip.amount, sip.rate, sip.years);
    invested = sip.amount * sip.years * 12; returns = fv - invested; total = fv;
    sliders = (<>
      <CalcSlider label="Monthly investment" prefix="₹" min={500} max={1000000} step={500} value={sip.amount} onChange={(v) => setSip({ ...sip, amount: v })} />
      <CalcSlider label="Expected return rate (p.a)" suffix="%" min={4} max={30} step={0.5} value={sip.rate} onChange={(v) => setSip({ ...sip, rate: v })} />
      <CalcSlider label="Time period" suffix="Yr" min={1} max={40} step={1} value={sip.years} onChange={(v) => setSip({ ...sip, years: v })} />
    </>);
  } else {
    const fv = lumpFV(lump.amount, lump.rate, lump.years);
    invested = lump.amount; returns = fv - invested; total = fv;
    sliders = (<>
      <CalcSlider label="Total investment" prefix="₹" min={10000} max={10000000} step={10000} value={lump.amount} onChange={(v) => setLump({ ...lump, amount: v })} />
      <CalcSlider label="Expected return rate (p.a)" suffix="%" min={4} max={30} step={0.5} value={lump.rate} onChange={(v) => setLump({ ...lump, rate: v })} />
      <CalcSlider label="Time period" suffix="Yr" min={1} max={40} step={1} value={lump.years} onChange={(v) => setLump({ ...lump, years: v })} />
    </>);
  }
  return (
    <CalcCard
      toggle={<CalcToggle mode={mode} setMode={setMode} />}
      title="SIP & Lumpsum Calculator"
      subtitle="Estimate what your investments could grow to over time."
      sliders={sliders}
      donut={<Donut a={invested} b={Math.max(0, returns)} aLabel="Invested amount" bLabel="Est. returns" aColor={INVESTED_C} bColor={RETURNS_C} />}
      results={<ResultsList rows={[["Invested amount", fmt(invested)], ["Est. returns", fmt(returns)], ["Total value", fmt(total), true]]} />}
      ctaLabel="Invest now" onCta={() => go("contact")}
    />
  );
}

function ToolSwp({ swp, setSwp, fmt, inr, swpBal, go }) {
  const bal = swpBal(swp.corpus, swp.withdraw, swp.rate, swp.years);
  const withdrawn = swp.withdraw * swp.years * 12;
  return (
    <CalcCard
      title="SWP Calculator"
      subtitle="See how long your corpus lasts with regular monthly withdrawals."
      sliders={<>
        <CalcSlider label="Total investment" prefix="₹" min={100000} max={50000000} step={100000} value={swp.corpus} onChange={(v) => setSwp({ ...swp, corpus: v })} />
        <CalcSlider label="Monthly withdrawal" prefix="₹" min={1000} max={500000} step={1000} value={swp.withdraw} onChange={(v) => setSwp({ ...swp, withdraw: v })} />
        <CalcSlider label="Expected return rate (p.a)" suffix="%" min={2} max={18} step={0.5} value={swp.rate} onChange={(v) => setSwp({ ...swp, rate: v })} />
        <CalcSlider label="Time period" suffix="Yr" min={1} max={35} step={1} value={swp.years} onChange={(v) => setSwp({ ...swp, years: v })} />
      </>}
      donut={<Donut a={withdrawn} b={Math.max(0, bal)} aLabel="Total withdrawn" bLabel="Final balance" aColor={INVESTED_C} bColor={RETURNS_C} />}
      results={<ResultsList rows={[["Total withdrawn", fmt(withdrawn)], ["Final balance", fmt(bal), true]]} />}
      ctaLabel="Plan my SWP" onCta={() => go("contact")}
    />
  );
}

function ToolLoan({ loan, setLoan, fmt, inr, loanEmi, go }) {
  const emi = loanEmi(loan.amount, loan.rate, loan.years);
  const total = emi * loan.years * 12;
  const interest = total - loan.amount;
  return (
    <CalcCard
      title="Loan / EMI Calculator"
      subtitle="Estimate your monthly EMI and total interest payable."
      sliders={<>
        <CalcSlider label="Loan amount" prefix="₹" min={100000} max={50000000} step={100000} value={loan.amount} onChange={(v) => setLoan({ ...loan, amount: v })} />
        <CalcSlider label="Interest rate (p.a)" suffix="%" min={6} max={18} step={0.1} value={loan.rate} onChange={(v) => setLoan({ ...loan, rate: v })} />
        <CalcSlider label="Loan tenure" suffix="Yr" min={1} max={30} step={1} value={loan.years} onChange={(v) => setLoan({ ...loan, years: v })} />
      </>}
      donut={<Donut a={loan.amount} b={Math.max(0, interest)} aLabel="Principal" bLabel="Total interest" aColor={INVESTED_C} bColor={RETURNS_C} />}
      results={<ResultsList rows={[["Monthly EMI", fmt(emi), true], ["Principal amount", fmt(loan.amount)], ["Total interest", fmt(interest)], ["Total payment", fmt(total)]]} />}
      ctaLabel="Check eligibility" onCta={() => go("contact")}
    />
  );
}

/* ============================ FORMS ============================ */
function Forms({ go }) {
  return (
    <div className="page-wrap" style={{ paddingTop: 64 }}>
      <section style={{ background: NAVY, padding: "72px 40px 60px", textAlign: "center" }}>
        <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 14 }}>Resources</p>
        <h1 style={{ fontSize: "clamp(32px,4.5vw,52px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", marginBottom: 14 }}>Downloadable Forms</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto" }}>All the forms you need to get started, in one place.</p>
      </section>
      <section style={{ padding: "64px 40px 96px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
          {FORMS.map((f, i) => (
            <Reveal key={i} delay={i * 70}>
            <S as="a" href="#" onClick={(e) => e.preventDefault()} css="background:#fff;border:1px solid #F0F2F5;border-radius:14px;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;text-decoration:none;transition:all 0.18s;" hover="border-color:#009B8D;box-shadow:0 12px 30px rgba(0,155,141,0.12);transform:translateY(-2px);">
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: f.gold ? "#FEF9EC" : "#E5F7F5", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={f.gold ? GOLD : TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>{f.t}</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF", marginTop: 2 }}>{f.d}</div>
                </div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: f.gold ? GOLD : TEAL }}>Download ↓</span>
            </S>
            </Reveal>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "#9CA3AF", marginTop: 32 }}>Need help filling a form? <button onClick={() => go("contact")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: TEAL }}>Talk to an advisor →</button></p>
      </section>
    </div>
  );
}

/* ============================ CONTACT ============================ */
function Contact({ form, setForm, formDone, submitForm, toggleInterest }) {
  const wrap = { maxWidth: 1100, margin: "0 auto" };
  const inputCss = { width: "100%", background: "#fff", border: "1.5px solid #E5E7EB", borderRadius: 9, padding: "11px 13px", fontSize: 14, color: NAVY };
  return (
    <div className="page-wrap" style={{ paddingTop: 64 }}>
      <section style={{ padding: "72px 32px 80px", ...wrap }}>
        <div style={{ maxWidth: 560, marginBottom: 56 }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: TEAL, marginBottom: 16 }}>Contact us</p>
          <h1 style={{ fontSize: "clamp(32px,4.5vw,54px)", fontWeight: 800, color: NAVY, letterSpacing: "-1.5px", lineHeight: 1.06, marginBottom: 20 }}>Let's talk about what matters to <em style={{ fontStyle: "normal", color: TEAL }}>you.</em></h1>
          <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.75 }}>Whether you're looking to build wealth, protect what you've built, plan for the future, or arrange funding, we're here to understand your requirements and help you take the right next step.</p>
        </div>

        <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: 56, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Office</div>
              <div style={{ fontSize: 15, color: NAVY, fontWeight: 500, lineHeight: 1.65 }}>102, Shreepati Jewels D Wing,<br />Khattar Ali Lane, Near CP Tank Circle,<br />Girgaon, Mumbai, 400004</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Email</div>
              <a href="mailto:spectraassets@gmail.com" style={{ fontSize: 15, color: NAVY, fontWeight: 500 }}>spectraassets@gmail.com</a>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#9CA3AF", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Follow</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[["https://instagram.com", <><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>],
                  ["https://facebook.com", <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>],
                  ["https://linkedin.com", <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></>]].map(([href, icon], i) => (
                  <S key={i} as="a" href={href} target="_blank" rel="noopener" css="width:40px;height:40px;border-radius:10px;border:1px solid #E5E7EB;display:flex;align-items:center;justify-content:center;color:#374151;transition:all 0.15s;" hover="border-color:#009B8D;color:#009B8D;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                  </S>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #F0F2F5", height: 180 }}>
              <iframe title="Location" src="https://maps.google.com/maps?q=CP%20Tank%20Circle%20Girgaon%20Mumbai%20400004&z=15&output=embed" width="100%" height="180" style={{ border: 0, display: "block" }} loading="lazy"></iframe>
            </div>
          </div>

          <div style={{ background: "#F9FAFB", borderRadius: 18, padding: 40, border: "1px solid #F0F2F5" }}>
            {formDone ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 52, height: 52, background: TEAL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginBottom: 8 }}>We'll be in touch.</div>
                <div style={{ fontSize: 14, color: "#6B7280" }}>Thanks for reaching out, expect a call back shortly.</div>
              </div>
            ) : (
              <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 7 }}>Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" style={inputCss} />
                </div>
                <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 7 }}>Mobile Number *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Enter your mobile number" style={inputCss} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 7 }}>Email Address *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email address" style={inputCss} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 10 }}>I'm interested in *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {INTERESTS.map((it) => {
                      const on = form.interests.includes(it);
                      return (
                        <button type="button" key={it} onClick={() => toggleInterest(it)} style={{ cursor: "pointer", fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: 100, border: `1.5px solid ${on ? TEAL : "#E5E7EB"}`, background: on ? "#ECFDF5" : "#fff", color: on ? TEAL : "#374151", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 14, height: 14, borderRadius: 4, border: `1.5px solid ${on ? TEAL : "#C4CAD4"}`, background: on ? TEAL : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                            {on && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                          </span>
                          {it}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 7 }}>Tell us more</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Briefly describe what you'd like to discuss" rows={4} style={{ ...inputCss, resize: "vertical", minHeight: 96 }}></textarea>
                </div>
                <S as="button" type="submit" css="background:#009B8D;color:#fff;border:none;cursor:pointer;font-weight:700;font-size:15px;padding:15px;border-radius:10px;transition:opacity 0.15s;letter-spacing:-0.1px;" hover="opacity:0.88;">Request a Call Back</S>
                <p style={{ fontSize: 12, color: "#9CA3AF", textAlign: "center", lineHeight: 1.5 }}>By submitting this form, you agree to be contacted regarding your enquiry. Your information will be handled in accordance with our Privacy Policy.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================ FOOTER ============================ */
function Footer({ go }) {
  return (
    <footer style={{ background: NAVY, padding: "52px 32px 32px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 48, marginBottom: 48, flexWrap: "wrap", alignItems: "start" }}>
          <div style={{ flex: "1.5 1 240px" }}>
            <img src={LOGO} alt="Spectra Assets" style={{ height: 38, width: "auto", marginBottom: 16, display: "block", opacity: 0.95 }} />
            <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.75, maxWidth: 280 }}>Your investment partner for life. Wealth, protection, lending and planning, connected around you. Girgaon, Mumbai.</p>
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Solutions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CAT_ORDER.map((k) => (
                <S key={k} as="button" onClick={() => go("sol-" + k, k)} css="background:none;border:none;cursor:pointer;font-size:14px;color:#4B5563;text-align:left;padding:0;transition:color 0.15s;" hover="color:#fff;">{CATS[k].nav}</S>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 120px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Company</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Home", "home"], ["About", "about"], ["Tools", "tool-invest"], ["Forms", "forms"], ["Contact", "contact"]].map(([l, p]) => (
                <S key={p} as="button" onClick={() => go(p)} css="background:none;border:none;cursor:pointer;font-size:14px;color:#4B5563;text-align:left;padding:0;transition:color 0.15s;" hover="color:#fff;">{l}</S>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 200px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#374151", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.6 }}>102, Shreepati Jewels D Wing, Khattar Ali Lane, Girgaon, Mumbai 400004</span>
              <a href="mailto:spectraassets@gmail.com" style={{ fontSize: 14, color: "#4B5563" }}>spectraassets@gmail.com</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: 12, color: "#374151" }}>© {new Date().getFullYear()} Spectra Assets · Mumbai</span>
          <div style={{ display: "flex", gap: 18 }}>
            {["Privacy", "Terms", "Disclaimer"].map((t) => <a key={t} href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: 12, color: "#374151" }}>{t}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
