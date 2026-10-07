"use client";
import React from "react";

/* ============================================================================
   Spectra Assets, full site, ported from the Claude Design canvas and
   populated with the client's real website content.
   Colours: navy #0F1729 / #0A1929 · teal #00D4B2 (hover #2BE3C6) · gold #C9A84C
   Font: Inter.  Single-file client component (also used by the no-Node preview).
   ========================================================================== */

const TEAL = "#00D4B2";
const NAVY = "#0B1220"; // dark section background (was the navy brand colour)
const BG = "#070B11";   // page background
const NAV_H = 76;   // navbar height; page tops and sticky offsets use it
const SURF = "#0D1522"; // card / dropdown / input surface
const INK = "#E7ECF4";  // primary text on dark
const GOLD = "#C9A84C";
const LOGO = "/assets/logo.png";
const MARK = "/assets/mark.png";

/* logo lockup: monogram mark + wordmark ("SPECTRA / ASSETS"). Sizes scale with `size`. */
function Brand({ size = 34, color = INK, subColor, gap = 10 }) {
  const sub = subColor || (color === INK ? TEAL : "rgba(255,255,255,0.6)");
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap }}>
      <img src={MARK} alt="" style={{ height: size, width: "auto", display: "block" }} />
      <span style={{ display: "inline-flex", flexDirection: "column", lineHeight: 1, letterSpacing: "0.14em" }}>
        <span style={{ fontSize: Math.round(size * 0.42), fontWeight: 800, color }}>SPECTRA</span>
        <span style={{ fontSize: Math.round(size * 0.30), fontWeight: 600, color: sub, marginTop: Math.round(size * 0.06) }}>ASSETS</span>
      </span>
    </span>
  );
}

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

/* When the hover style uses a CSS shorthand (e.g. `border`), React can't tell
   that the base longhand values (borderColor, borderTopColor, etc.) should be
   cleared first; the two conflict and the browser ends up showing whichever
   won last, which is often "the base longhand still wins on that side". Strip
   the affected base longhand keys whenever the hover uses a matching shorthand. */
const SHORTHAND_KEYS = {
  border: ["borderColor", "borderStyle", "borderWidth", "borderTop", "borderRight", "borderBottom", "borderLeft", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "borderTopStyle", "borderRightStyle", "borderBottomStyle", "borderLeftStyle", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth"],
  background: ["backgroundColor", "backgroundImage", "backgroundPosition", "backgroundSize", "backgroundRepeat", "backgroundOrigin", "backgroundClip", "backgroundAttachment"],
  padding: ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft"],
  margin: ["marginTop", "marginRight", "marginBottom", "marginLeft"],
  font: ["fontStyle", "fontVariant", "fontWeight", "fontSize", "lineHeight", "fontFamily"],
};
/* Expand `border: 1px solid #xxx` into width/style/color longhands. When a hover
   sets only `borderColor`, React clears it on mouse-leave (sets it to ""), and with
   the shorthand the browser falls back to currentColor (navy text), leaving a black
   border on every card that was ever hovered. With explicit longhands in the base,
   leaving hover restores the real base colour. */
function expandBorder(o) {
  if (!o || typeof o.border !== "string") return o;
  const v = o.border.trim();
  const out = { ...o };
  delete out.border;
  if (v === "none" || v === "0") { out.borderStyle = "none"; return out; }
  const m = v.match(/^(\S+)\s+(\S+)\s+(.+)$/);
  if (!m) return o;
  out.borderWidth = m[1]; out.borderStyle = m[2]; out.borderColor = m[3];
  return out;
}

function mergeHover(base, hover) {
  base = expandBorder(base);
  hover = expandBorder(hover);
  if (!hover) return base;
  const out = { ...base };
  for (const k of Object.keys(hover)) {
    if (SHORTHAND_KEYS[k]) for (const lh of SHORTHAND_KEYS[k]) delete out[lh];
  }
  return { ...out, ...hover };
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
      style={{ ...mergeHover(base, ho), ...(style || {}) }}
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

/* file-name slug per principle — images live in public/images/principles/{key}.jpg */
const PRINCIPLE_KEYS = ["listen", "connected", "simplicity", "relationships", "evolve"];

/* N26-style floating pill shown over each principle image (index-matched) */
const PRINCIPLE_WIDGETS = [
  { label: "We listen first", sub: "No sales pitch" },
  { label: "All under one roof", sub: "5 services, 1 plan" },
  { label: "Plain language", sub: "No jargon, ever" },
  { label: "300+ families", sub: "Long-term partners" },
  { label: "Reviewed yearly", sub: "Adapts with you" },
];

/* icon per principle (index-matched to PRINCIPLES) */
const PRINCIPLE_ICONS = [
  <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path><circle cx="8.5" cy="10" r="1"></circle><circle cx="12" cy="10" r="1"></circle><circle cx="15.5" cy="10" r="1"></circle></>,
  <><circle cx="12" cy="12" r="3"></circle><circle cx="5" cy="6" r="2"></circle><circle cx="19" cy="6" r="2"></circle><circle cx="5" cy="18" r="2"></circle><circle cx="19" cy="18" r="2"></circle><path d="M10 10.5 6.5 7.5M14 10.5 17.5 7.5M10 13.5 6.5 16.5M14 13.5 17.5 16.5"></path></>,
  <><circle cx="12" cy="12" r="9"></circle><path d="M8.3 12.4l2.6 2.6 4.8-5.3"></path></>,
  <><circle cx="9" cy="8" r="3"></circle><circle cx="17" cy="9" r="2.4"></circle><path d="M3 20v-1a5 5 0 0 1 9-3"></path><path d="M13.5 20v-1a4 4 0 0 1 7-2.7"></path></>,
  <><path d="M4 12a8 8 0 0 1 13.5-5.8L20 8"></path><path d="M20 4v4h-4"></path><path d="M20 12a8 8 0 0 1-13.5 5.8L4 16"></path><path d="M4 20v-4h4"></path></>,
];

const TESTIMONIALS = [
  { name: "Maulik Mehta", role: "Individual Investor", rating: 5, quote: "I've been with Spectra from the start for my mutual funds, bonds and insurance. They've handled everything from health to travel insurance, and even helped me with a claim that wasn't under their policy. That kind of support is hard to find, and they've also helped with my loan requirement." },
  { name: "Infinity Investors", role: "Corporate Client", rating: 5, quote: "As a firm, we needed someone who'd actually understand our cash-flow timing before recommending anything, not generic advice copy-pasted for every client. That's exactly what we got." },
  { name: "Zurvan Tumbol", role: "Corporate Client", rating: 4, quote: "I compared premiums myself before signing up for car insurance, and the recommendation I got here still came out better. Bonds and mutual funds are handled the same way, someone actually comparing options instead of pushing whatever earns the highest commission." },
  { name: "Bharat Rajput", role: "Individual Investor", rating: 5, quote: "I don't have to juggle four different people for my funds, bonds, securities and health cover anymore. Everything sits under one roof and someone actually keeps track of it, which has saved me a fair number of headaches, especially around renewal time." },
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
  {
    group: "Onboarding & KYC",
    items: [
      { t: "CKYC Application Form", d: "PDF · Central KYC for new investors", f: "/forms/ckyc-application-form.pdf" },
      { t: "KYC Declaration", d: "PDF · KYC declaration form", f: "/forms/kyc-declaration.pdf" },
      { t: "FATCA / CRS Declaration", d: "PDF · For individual investors", f: "/forms/fatca-individuals.pdf" },
      { t: "Mutual Fund Common Application (CAMS)", d: "PDF · Common application for mutual funds", f: "/forms/cams-common-application-form.pdf" },
      { t: "Change of Broker", d: "PDF · Change your broker or distributor", f: "/forms/change-of-broker.pdf" },
    ],
  },
  {
    group: "Insurance Claims",
    items: [
      { t: "HDFC Ergo Health Claim (Form A)", d: "PDF · Health insurance claim form", f: "/forms/hdfc-ergo-claim-form-a.pdf" },
      { t: "Care Health Claim (Form A)", d: "PDF · Health insurance claim form", f: "/forms/care-claim-form-a.pdf" },
    ],
  },
];

/* partner logos, cropped from the two logo collages in the client content doc */
const PARTNER_INSURERS = [
  { n: "Landmark Group", f: "landmark-group.png", w: 247, h: 140 },
  { n: "ICICI Lombard", f: "icici-lombard.png", w: 436, h: 140 },
  { n: "HDFC ERGO", f: "hdfc-ergo.png", w: 188, h: 140 },
  { n: "IndusInd General Insurance", f: "indusind-general-insurance.png", w: 385, h: 140 },
  { n: "Digit", f: "digit.png", w: 263, h: 140 },
  { n: "Generali Central", f: "generali-central.png", w: 235, h: 140 },
  { n: "United India", f: "united-india.png", w: 182, h: 140 },
  { n: "National Insurance", f: "national-insurance.png", w: 304, h: 140 },
  { n: "TATA AIG", f: "tata-aig.png", w: 161, h: 140 },
  { n: "Bajaj Allianz", f: "bajaj-allianz.png", w: 436, h: 140 },
  { n: "Aditya Birla Capital Health", f: "aditya-birla-capital-health.png", w: 148, h: 140 },
  { n: "Zurich Kotak", f: "zurich-kotak.png", w: 436, h: 140 },
  { n: "Oriental Insurance", f: "oriental-insurance.png", w: 409, h: 140 },
  { n: "SBI General", f: "sbi-general.png", w: 373, h: 140 },
  { n: "Royal Sundaram", f: "royal-sundaram.png", w: 414, h: 140 },
  { n: "New India Assurance", f: "new-india-assurance.png", w: 148, h: 140 },
  { n: "Care Health Insurance", f: "care-health-insurance.png", w: 271, h: 140 },
  { n: "Niva Bupa", f: "niva-bupa.png", w: 241, h: 140 },
  { n: "Manipal Cigna", f: "manipal-cigna.png", w: 415, h: 140 },
  { n: "Star Health", f: "star-health.png", w: 286, h: 140 },
  { n: "Liberty General Insurance", f: "liberty-general-insurance.png", w: 214, h: 140 },
  { n: "IFFCO-Tokio", f: "iffco-tokio.png", w: 294, h: 140 },
  { n: "Bajaj Life", f: "bajaj-life.png", w: 237, h: 140 },
  { n: "LIC", f: "lic.png", w: 340, h: 140 },
  { n: "Axis Max Life", f: "axis-max-life.png", w: 386, h: 140 },
  { n: "Aditya Birla Capital Life", f: "aditya-birla-capital-life.png", w: 329, h: 140 },
  { n: "Kotak Life", f: "kotak-life.png", w: 363, h: 140 },
  { n: "Chola MS", f: "chola-ms.png", w: 405, h: 140 },
  { n: "ICICI Prudential Life", f: "icici-prudential-life.png", w: 436, h: 140 },
  { n: "HDFC Life", f: "hdfc-life.png", w: 326, h: 140 },
  { n: "TATA AIA", f: "tata-aia.png", w: 383, h: 140 },
  { n: "SBI Life", f: "sbi-life.png", w: 391, h: 140 },
  { n: "Magma HDI", f: "magma-hdi.png", w: 436, h: 140 },
];

const PARTNER_AMCS = [
  { n: "Aditya Birla Capital Mutual Fund", f: "aditya-birla-capital-mutual-fund.png", w: 137, h: 140 },
  { n: "Axis Mutual Fund", f: "axis-mutual-fund.png", w: 440, h: 140 },
  { n: "Baroda Pioneer Mutual Fund", f: "baroda-pioneer-mutual-fund.png", w: 232, h: 140 },
  { n: "BNP Paribas Mutual Fund", f: "bnp-paribas-mutual-fund.png", w: 236, h: 140 },
  { n: "BOI AXA Investment Managers", f: "boi-axa-investment-managers.png", w: 223, h: 140 },
  { n: "Canara Robeco Mutual Fund", f: "canara-robeco-mutual-fund.png", w: 439, h: 140 },
  { n: "DHFL Pramerica Mutual Fund", f: "dhfl-pramerica-mutual-fund.png", w: 424, h: 140 },
  { n: "DSP BlackRock Mutual Fund", f: "dsp-blackrock-mutual-fund.png", w: 440, h: 140 },
  { n: "Nippon India Mutual Fund", f: "nippon-india-mutual-fund.png", w: 294, h: 140 },
  { n: "Essel Mutual Fund", f: "essel-mutual-fund.png", w: 391, h: 140 },
  { n: "Franklin Templeton Investments", f: "franklin-templeton-investments.png", w: 268, h: 140 },
  { n: "HDFC Mutual Fund", f: "hdfc-mutual-fund.png", w: 307, h: 140 },
  { n: "HSBC Global Asset Management", f: "hsbc-global-asset-management.png", w: 357, h: 140 },
  { n: "ICICI Prudential Mutual Fund", f: "icici-prudential-mutual-fund.png", w: 271, h: 140 },
  { n: "IDBI Mutual", f: "idbi-mutual.png", w: 440, h: 140 },
  { n: "IDFC Mutual Fund", f: "idfc-mutual-fund.png", w: 308, h: 140 },
  { n: "Bandhan Bank", f: "bandhan-bank.png", w: 440, h: 140 },
  { n: "UTI International", f: "uti-international.png", w: 286, h: 140 },
  { n: "SAMCO Mutual Fund", f: "samco-mutual-fund.png", w: 209, h: 140 },
  { n: "The Investment Trust of India", f: "the-investment-trust-of-india.png", w: 440, h: 140 },
  { n: "Invesco Mutual Fund", f: "invesco-mutual-fund.png", w: 161, h: 140 },
  { n: "JM Financial", f: "jm-financial.png", w: 263, h: 140 },
  { n: "Kotak Asset Management", f: "kotak-asset-management.png", w: 408, h: 140 },
  { n: "L&T Mutual Fund", f: "l-t-mutual-fund.png", w: 399, h: 140 },
  { n: "LIC Mutual Fund", f: "lic-mutual-fund.png", w: 268, h: 140 },
  { n: "Mahindra Mutual Fund", f: "mahindra-mutual-fund.png", w: 305, h: 140 },
  { n: "Mirae Asset", f: "mirae-asset.png", w: 268, h: 140 },
  { n: "Motilal Oswal", f: "motilal-oswal.png", w: 404, h: 140 },
  { n: "PPFAS Mutual Fund", f: "ppfas-mutual-fund.png", w: 321, h: 140 },
  { n: "Principal Mutual Funds", f: "principal-mutual-funds.png", w: 217, h: 140 },
  { n: "quant Mutual Fund", f: "quant-mutual-fund.png", w: 255, h: 140 },
  { n: "Quantum Mutual Fund", f: "quantum-mutual-fund.png", w: 161, h: 140 },
  { n: "Reliance Mutual Fund", f: "reliance-mutual-fund.png", w: 268, h: 140 },
  { n: "Sahara Mutual Fund", f: "sahara-mutual-fund.png", w: 280, h: 140 },
  { n: "SBI Mutual Fund", f: "sbi-mutual-fund.png", w: 268, h: 140 },
  { n: "Shriram Mutual Fund", f: "shriram-mutual-fund.png", w: 332, h: 140 },
  { n: "Sundaram Mutual", f: "sundaram-mutual.png", w: 225, h: 140 },
  { n: "TATA Mutual Fund", f: "tata-mutual-fund.png", w: 230, h: 140 },
  { n: "Taurus Mutual Fund", f: "taurus-mutual-fund.png", w: 209, h: 140 },
  { n: "Union Asset Management", f: "union-asset-management.png", w: 232, h: 140 },
];

const INTERESTS = ["Wealth Creation", "Insurance", "Loans & Financing", "Retirement Planning", "Child Education Planning", "Other"];

/* which way the page is being scrolled: 1 = down, -1 = up (sticks at the last
   direction once scrolling stops). The page scrolls the body, not the document,
   so read whichever offset actually moves. */
function useScrollDirection() {
  const [dir, setDir] = React.useState(1);
  React.useEffect(() => {
    const pos = () => Math.max(window.scrollY || 0, document.body.scrollTop || 0, document.documentElement.scrollTop || 0);
    let last = pos();
    const onScroll = () => {
      const p = pos();
      const d = p - last;
      if (Math.abs(d) < 2) return;          // ignore scroll noise
      last = p;
      const next = d > 0 ? 1 : -1;
      setDir((cur) => (cur === next ? cur : next));   // only re-render on a real flip
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => window.removeEventListener("scroll", onScroll, { capture: true });
  }, []);
  return dir;
}

/* One continuously scrolling row of partner logos.
   The list is duplicated and the offset wraps at exactly half the track width,
   so the loop is seamless. Driving the transform per frame (instead of a CSS
   animation) keeps it smooth and lets the direction flip mid-run without a jump.
   `base` is the row's resting direction; it multiplies by the page scroll
   direction, so scrolling up reverses the row and scrolling down restores it. */
function LogoRow({ items, speed = 84, base = -1, scrollDir = 1, names = false }) {
  const trackRef = React.useRef(null);
  const offset = React.useRef(0);
  const dirRef = React.useRef(base * scrollDir);
  const hoverRef = React.useRef(false);
  dirRef.current = base * scrollDir;

  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf, prev = null;
    const step = (t) => {
      if (prev === null) prev = t;
      const dt = Math.min(64, t - prev) / 1000;   // clamp so a background tab doesn't jump
      prev = t;
      // subpixel-precise: scrollWidth is rounded to an integer, and being even a
      // fraction of a pixel off makes the seam visibly hitch on every loop
      const half = el.getBoundingClientRect().width / 2;
      if (half > 0 && !hoverRef.current) {
        let o = offset.current + dirRef.current * speed * dt;
        o %= half;
        if (o < 0) o += half;
        offset.current = o;
        el.style.transform = "translate3d(" + -o.toFixed(2) + "px,0,0)";
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const loop = [...items, ...items];
  return (
    <div
      className="sp-logo-row"
      onMouseEnter={() => { hoverRef.current = true; }}
      onMouseLeave={() => { hoverRef.current = false; }}
    >
      <div className="sp-logo-track" ref={trackRef}>
        {loop.map((it, i) => (
          names
            ? <div key={i} className="sp-name-card">{it.n}</div>
            : <div key={i} className="sp-logo-card" title={it.n}>
                <img src={"/partners/" + it.f} alt={it.n} width={it.w} height={it.h} draggable="false" />
              </div>
        ))}
      </div>
    </div>
  );
}

/* partner wall: insurers scroll one way, AMCs the other */
function LogoMarquee() {
  const dir = useScrollDirection();
  const half = (arr) => [arr.slice(0, Math.ceil(arr.length / 2)), arr.slice(Math.ceil(arr.length / 2))];
  const [ins1, ins2] = half(PARTNER_INSURERS);
  const [amc1, amc2] = half(PARTNER_AMCS);
  return (
    <div className="sp-logo-wall">
      <LogoRow items={ins1} speed={80} base={-1} scrollDir={dir} />
      <LogoRow items={ins2} speed={90} base={1} scrollDir={dir} />
      <LogoRow items={amc1} speed={86} base={-1} scrollDir={dir} />
      <LogoRow items={amc2} speed={96} base={1} scrollDir={dir} />
    </div>
  );
}

/* the same partners as names only (no logos), three rows scrolling in opposite directions */
function NameMarquee() {
  const dir = useScrollDirection();
  const all = [...PARTNER_INSURERS, ...PARTNER_AMCS];
  const third = Math.ceil(all.length / 3);
  const rows = [all.slice(0, third), all.slice(third, third * 2), all.slice(third * 2)];
  return (
    <div className="sp-logo-wall sp-name-wall">
      <LogoRow names items={rows[0]} speed={64} base={-1} scrollDir={dir} />
      <LogoRow names items={rows[1]} speed={72} base={1} scrollDir={dir} />
      <LogoRow names items={rows[2]} speed={68} base={-1} scrollDir={dir} />
    </div>
  );
}

/* star rating row (filled = rating, out of 5) */
function Stars({ n = 5 }) {
  return (
    <div style={{ display: "flex", gap: 3 }} aria-label={n + " out of 5"}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i <= n ? GOLD : "rgba(255,255,255,0.10)"}>
          <path d="M12 2l2.9 6.26 6.85.72-5.1 4.6 1.42 6.72L12 17.77 5.93 20.3l1.42-6.72-5.1-4.6 6.85-.72z"></path>
        </svg>
      ))}
    </div>
  );
}

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
            <span key={j} style={{ padding: "0 28px", fontSize: 13, fontWeight: 600, color: INK, opacity: op, fontVariantNumeric: "tabular-nums", letterSpacing: "0.2px" }}>{s}</span>
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
    // only start once the number is clearly on screen (a bit above the bottom edge), so the
    // count is seen happening. No timer fallback: it used to fire 1.6s after load, off screen.
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting && !started) { started = true; run(); io.disconnect(); } }), { threshold: 0.6, rootMargin: "0px 0px -12% 0px" });
    io.observe(el);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
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
function TiltCard({ children, max = 8, radius = 18, style, className }) {
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
    <div ref={ref} className={className} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ position: "relative", transform: `perspective(800px) rotateX(${s.rx}deg) rotateY(${s.ry}deg)`, transition: s.on ? "transform 0.08s linear" : "transform 0.45s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d", ...(style || {}) }}>
      {children}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, borderRadius: radius, pointerEvents: "none", opacity: s.on ? 1 : 0, transition: "opacity 0.3s ease", background: `radial-gradient(circle 240px at ${s.px}% ${s.py}%, rgba(0,212,178,0.13), transparent 62%)` }}></div>
    </div>
  );
}

/* premium primary CTA — magnetic, lifts, glows, gradient sweep on hover */
function CtaPrimary({ children, onClick, base = "linear-gradient(135deg,#00D4B2 0%,#10B981 100%)", sweep = "linear-gradient(90deg,#10B981,#34D399)", glow = "rgba(0,212,178,0.35)", color = "#04140f", fontSize = 15, pad = "14px 28px", strength = 0.35, radius = 10, tracking = "-0.1px", upper = false, fontFamily = "inherit", fontWeight = 600 }) {
  const [h, setH] = React.useState(false);
  return (
    <Magnetic strength={strength}>
      <button
        onClick={onClick}
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          position: "relative", overflow: "hidden", border: "none", cursor: "pointer",
          fontFamily, fontWeight, fontSize, padding: pad, borderRadius: radius, textTransform: upper ? "uppercase" : "none",
          color, background: base, letterSpacing: tracking, whiteSpace: "nowrap",
          transform: h ? "translateY(-2px)" : "none",
          boxShadow: h ? `0 16px 40px ${glow}` : `0 10px 30px ${glow}`,
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
function WordReveal({ text, emFrom = -1, as = "span", style, stagger = 55, baseDelay = 0, emStyle, className }) {
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
    <Tag ref={ref} className={"wr" + (seen ? " in" : "") + (className ? " " + className : "")} style={style}>
      {words.map((w, i) => (
        <React.Fragment key={i}>
          <span className="wr-word"><span className="wr-inner" style={{ transitionDelay: (baseDelay + i * stagger) + "ms", color: emFrom >= 0 && i >= emFrom ? TEAL : undefined, ...(emFrom >= 0 && i >= emFrom ? emStyle : null) }}>{w}</span></span>
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
      <i style={{ width: "46%", height: "72%", left: "-6%", top: "-12%", background: "radial-gradient(circle, rgba(0,212,178,0.16), transparent 65%)", animation: "auroraDrift1 19s ease-in-out infinite" }}></i>
      <i style={{ width: "42%", height: "66%", right: "-4%", top: "4%", background: "radial-gradient(circle, rgba(0,212,178,0.10), transparent 65%)", animation: "auroraDrift2 23s ease-in-out infinite" }}></i>
      <i style={{ width: "40%", height: "62%", left: "28%", bottom: "-18%", background: "radial-gradient(circle, rgba(58,123,213,0.08), transparent 65%)", animation: "auroraDrift3 27s ease-in-out infinite" }}></i>
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

/* per-solution icon (stroke) — keyed by sub-solution name so each card's visual is distinct */
const SOL_ICON = {
  // Wealth Creation
  "Mutual Funds": <><circle cx="12" cy="12" r="9"></circle><path d="M12 12V3"></path><path d="M12 12l7.8 4.5"></path></>,
  "Bonds": <><rect x="4" y="5" width="16" height="14" rx="2"></rect><path d="M8 10h8"></path><path d="M8 14h5"></path></>,
  "Portfolio Management Services (PMS)": <><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M3 12h18"></path></>,
  "Alternative Investment Funds (AIF)": <><path d="M12 2 4 9l8 13 8-13z"></path><path d="M4 9h16"></path></>,
  "Unit Linked Insurance Plans (ULIPs)": <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"></path><path d="M9 13l2-2 2 2 2-3"></path></>,
  "Endowment Plans": <><circle cx="12" cy="12" r="9"></circle><circle cx="12" cy="12" r="5"></circle><circle cx="12" cy="12" r="1"></circle></>,
  // Financial Planning
  "Retirement Planning": <><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"></path></>,
  "Child Education Planning": <><path d="M22 10 12 5 2 10l10 5 10-5z"></path><path d="M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"></path></>,
  "Estate Planning": <><path d="M8 3h8a2 2 0 0 1 2 2v15l-3-2-3 2-3-2-3 2V5a2 2 0 0 1 2-2z"></path><path d="M10 8h4"></path></>,
  "Public Provident Fund (PPF)": <><rect x="4" y="10" width="16" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 0 1 8 0v3"></path><circle cx="12" cy="15" r="1.5"></circle></>,
  "Senior Citizen Savings Scheme (SCSS)": <><circle cx="10" cy="7" r="3"></circle><path d="M4 21v-1a6 6 0 0 1 9-5"></path><circle cx="17" cy="16" r="4"></circle></>,
  "Tax-Efficient Investment Strategies": <><circle cx="7" cy="7" r="2.5"></circle><circle cx="17" cy="17" r="2.5"></circle><path d="M18 6 6 18"></path></>,
  "Pension": <><ellipse cx="12" cy="6" rx="7" ry="3"></ellipse><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"></path><path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"></path></>,
  // Insurance (retail)
  "Health Insurance": <><path d="M20 8.5a4.5 4.5 0 0 0-8-2.8A4.5 4.5 0 0 0 4 8.5c0 4.5 8 10 8 10s8-5.5 8-10z"></path><path d="M8.5 11h2l1-2 1.5 4 1-2h1.5"></path></>,
  "Term Insurance": <><path d="M12 3v2"></path><path d="M3 12a9 9 0 0 1 18 0z"></path><path d="M12 12v5a2 2 0 0 0 4 0"></path></>,
  "Motor Insurance": <><path d="M5 13l1.5-4.5A2 2 0 0 1 8.4 7h7.2a2 2 0 0 1 1.9 1.5L19 13"></path><path d="M4 13h16v4H4z"></path><circle cx="7.5" cy="17.5" r="1.5"></circle><circle cx="16.5" cy="17.5" r="1.5"></circle></>,
  "Home Insurance": <><path d="M3 10l9-7 9 7"></path><path d="M5 9v11h14V9"></path><path d="M9 20v-6h6v6"></path></>,
  "Personal Accident Insurance": <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"></path><circle cx="12" cy="10" r="1.8"></circle><path d="M8.5 16a3.5 3.5 0 0 1 7 0"></path></>,
  "Travel Insurance": <><path d="M22 2 11 13"></path><path d="M22 2l-7 20-4-9-9-4z"></path></>,
  // Loans
  "Home Loans": <><path d="M3 10l9-7 9 7"></path><path d="M5 9v11h14V9"></path><path d="M12 13v5M10 15h3.5a1.25 1.25 0 0 0 0-2.5"></path></>,
  "Loan Against Property": <><path d="M4 9l8-6 8 6"></path><rect x="5" y="9" width="14" height="11" rx="1"></rect><rect x="10" y="14" width="4" height="6"></rect></>,
  "Business Loans": <><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M9 14l2 2 4-4"></path></>,
  "Personal Loans": <><rect x="3" y="6" width="18" height="12" rx="2"></rect><circle cx="12" cy="12" r="2.5"></circle><path d="M3 10h2M19 10h2"></path></>,
  "And More": <><circle cx="5" cy="12" r="1.6"></circle><circle cx="12" cy="12" r="1.6"></circle><circle cx="19" cy="12" r="1.6"></circle></>,
  // Securities
  "Equity Investing": <><path d="M3 17l6-6 4 4 8-8"></path><path d="M17 7h4v4"></path></>,
  "Derivatives / Futures & Options": <><path d="M4 8h13l-3-3"></path><path d="M20 16H7l3 3"></path></>,
  "Research & Market Insights": <><circle cx="10" cy="10" r="6"></circle><path d="M15 15l5 5"></path><path d="M7.5 11l2-2 1.5 1.5 2.5-3"></path></>,
  "IPOs": <><path d="M12 2c3 2 5 5 5 9a5 5 0 0 1-10 0c0-4 2-7 5-9z"></path><path d="M9 20c0 1 1.5 2 3 2s3-1 3-2"></path><circle cx="12" cy="10" r="1.5"></circle></>,
};

/* fires once when the element scrolls into view */
function useInView(threshold = 0.25) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") { setSeen(true); return; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/* photo slot (N26 /spaces style: 24px radius, no shadow). Images live in
   public/images/solutions/ (see design-source/image-prompts.md). If the file is
   missing it falls back to `fallback`, so the page never shows a broken image. */
const solImg = (name) => name || "";

function SolutionVisual({ catKey, title }) {
  const key = (catKey || "").toLowerCase();
  const t = (title || "").toLowerCase();

  // 1. INSURANCE: Pile of papers on desk with big green APPROVED printed on paper
  if (key.includes("insurance") || t.includes("insurance")) {
    return (
      <div className="sp-photo" style={{ aspectRatio: "7 / 5", position: "relative", overflow: "hidden", borderRadius: 16, background: "linear-gradient(135deg, #091322 0%, #0F1D32 100%)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 60% 30%, rgba(0,212,178,0.12) 0%, transparent 60%)" }}></div>
        <div style={{ position: "relative", width: "84%", height: "82%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* Paper 3 (Bottom) */}
          <div style={{ position: "absolute", width: "70%", height: "82%", background: "#CBD5E1", borderRadius: 6, transform: "rotate(9deg) translate(-10px, 10px)", boxShadow: "0 4px 12px rgba(0,0,0,0.4)", opacity: 0.7 }}></div>
          {/* Paper 2 (Middle) */}
          <div style={{ position: "absolute", width: "72%", height: "84%", background: "#E2E8F0", borderRadius: 6, transform: "rotate(-5deg) translate(8px, 4px)", boxShadow: "0 6px 16px rgba(0,0,0,0.35)", opacity: 0.85 }}></div>
          {/* Paper 1 (Top Front Document) */}
          <div style={{ position: "absolute", width: "74%", height: "86%", background: "#FFFFFF", borderRadius: 6, padding: "20px 22px", boxShadow: "0 12px 32px rgba(0,0,0,0.5)", transform: "rotate(1deg)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #0F172A", paddingBottom: 8, marginBottom: 12 }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontWeight: 800, fontSize: 13, color: "#0F172A", letterSpacing: "1px" }}>SPECTRA POLICY AGREEMENT</div>
                <div style={{ fontSize: 10, color: "#64748B", fontWeight: 600 }}>DOC #892-41</div>
              </div>
              <div style={{ height: 4, background: "#E2E8F0", borderRadius: 2, marginBottom: 8, width: "90%" }}></div>
              <div style={{ height: 4, background: "#E2E8F0", borderRadius: 2, marginBottom: 8, width: "100%" }}></div>
              <div style={{ height: 4, background: "#E2E8F0", borderRadius: 2, marginBottom: 8, width: "80%" }}></div>
              <div style={{ height: 4, background: "#E2E8F0", borderRadius: 2, marginBottom: 8, width: "95%" }}></div>
              <div style={{ height: 4, background: "#E2E8F0", borderRadius: 2, marginBottom: 8, width: "60%" }}></div>
            </div>
            {/* BIG GREEN BOLD PRINTED "APPROVED" STAMP directly on the paper */}
            <div style={{ position: "absolute", top: "44%", left: "50%", transform: "translate(-50%, -50%) rotate(-14deg)", border: "5px double #059669", color: "#059669", borderRadius: 8, padding: "6px 20px", fontWeight: 900, fontSize: "clamp(24px,3.8vw,36px)", letterSpacing: "5px", textTransform: "uppercase", background: "rgba(236, 253, 245, 0.85)", boxShadow: "0 4px 15px rgba(5,150,105,0.25)" }}>
              APPROVED
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div style={{ fontSize: 10, color: "#94A3B8" }}>Verified Risk Management Cover</div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", border: "2px solid #059669", opacity: 0.6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, color: "#059669", fontWeight: 800 }}>SEAL</div>
            </div>
          </div>
          {/* Executive Pen laying on desk next to paper */}
          <div style={{ position: "absolute", bottom: -6, right: 10, width: 140, height: 8, background: "linear-gradient(90deg, #1E293B 0%, #475569 70%, #00D4B2 100%)", borderRadius: 4, transform: "rotate(-25deg)", boxShadow: "0 6px 12px rgba(0,0,0,0.4)" }}></div>
        </div>
      </div>
    );
  }

  // 2. LOANS: Wooden blocks with different loan types on table & loan papers
  if (key.includes("loan") || t.includes("loan")) {
    return (
      <div className="sp-photo" style={{ aspectRatio: "7 / 5", position: "relative", overflow: "hidden", borderRadius: 16, background: "linear-gradient(135deg, #091322 0%, #0F1D32 100%)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 40% 70%, rgba(0,212,178,0.12) 0%, transparent 60%)" }}></div>
        <div style={{ width: "90%", height: "85%", display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative" }}>
          {/* Loan Agreement Paper on Table */}
          <div style={{ background: "#FFFFFF", borderRadius: 8, padding: "16px 20px", boxShadow: "0 10px 25px rgba(0,0,0,0.4)", width: "70%", margin: "0 auto", position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #E2E8F0", paddingBottom: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#0F172A" }}>LOAN SANCTION & FACILITY</span>
              <span style={{ fontSize: 10, color: "#059669", fontWeight: 800 }}>SANCTIONED</span>
            </div>
            <div style={{ height: 3, background: "#CBD5E1", borderRadius: 2, marginBottom: 6, width: "100%" }}></div>
            <div style={{ height: 3, background: "#CBD5E1", borderRadius: 2, width: "75%" }}></div>
          </div>
          {/* Wooden blocks on the table */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 10, marginTop: 12 }}>
            {[
              { label: "HOME", sub: "LOAN", icon: "🏠" },
              { label: "CAR", sub: "LOAN", icon: "🚗" },
              { label: "EDU", sub: "LOAN", icon: "🎓" },
              { label: "PERSONAL", sub: "LOAN", icon: "👤" },
            ].map((blk, i) => (
              <div key={i} style={{ background: "linear-gradient(145deg, #92400E, #78350F)", border: "1px solid #B45309", borderRadius: 8, padding: "12px 6px", textAlign: "center", boxShadow: "0 6px 14px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.2)", transform: "translateY(" + (i % 2 === 0 ? "0px" : "-4px") + ")" }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{blk.icon}</div>
                <div style={{ fontSize: 11, fontWeight: 800, color: "#FEF3C7", letterSpacing: "0.5px" }}>{blk.label}</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: "#FDE68A", opacity: 0.8 }}>{blk.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 3. SECURITIES: Stock market trading graph setup
  if (key.includes("securit") || t.includes("securit") || key.includes("equity") || t.includes("equity")) {
    return (
      <div className="sp-photo" style={{ aspectRatio: "7 / 5", position: "relative", overflow: "hidden", borderRadius: 16, background: "#060C16", display: "flex", flexDirection: "column", padding: 20, justifyContent: "space-between", border: "1px solid rgba(0,212,178,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: 10 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 800, color: "#00D4B2" }}>NIFTY 50 · 22,480</span>
            <span style={{ fontSize: 11, color: "#10B981", fontWeight: 700 }}>▲ +1.85%</span>
          </div>
          <span style={{ fontSize: 10, color: "#64748B", fontWeight: 600 }}>LIVE CAPITAL MARKETS</span>
        </div>
        <div style={{ position: "relative", flex: 1, margin: "14px 0", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 6, padding: "0 10px" }}>
          {[
            { h: 40, w: 8, bull: true }, { h: 55, w: 10, bull: true }, { h: 45, w: 8, bull: false },
            { h: 70, w: 10, bull: true }, { h: 60, w: 8, bull: false }, { h: 85, w: 12, bull: true },
            { h: 78, w: 10, bull: true }, { h: 95, w: 12, bull: true }, { h: 110, w: 14, bull: true }
          ].map((c, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, height: "100%", justifyContent: "flex-end" }}>
              <div style={{ width: 2, height: c.h + 16, background: c.bull ? "#10B981" : "#EF4444", opacity: 0.5 }}></div>
              <div style={{ width: "100%", height: c.h, background: c.bull ? "#10B981" : "#EF4444", borderRadius: 3, marginTop: -(c.h + 8), boxShadow: c.bull ? "0 0 10px rgba(16,185,129,0.3)" : "none" }}></div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#94A3B8", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 10 }}>
          <span>EQUITIES & DERIVATIVES</span>
          <span style={{ color: "#00D4B2", fontWeight: 700 }}>BULLISH TREND</span>
        </div>
      </div>
    );
  }

  // 4. WEALTH: Wealth creation asset growth visual
  if (key.includes("wealth") || t.includes("wealth") || key.includes("fund") || key.includes("bond")) {
    return (
      <div className="sp-photo" style={{ aspectRatio: "7 / 5", position: "relative", overflow: "hidden", borderRadius: 16, background: "linear-gradient(135deg, #091322 0%, #0F1D32 100%)", padding: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid rgba(0,212,178,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#00D4B2", letterSpacing: "1px", textTransform: "uppercase" }}>WEALTH PORTFOLIO</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", marginTop: 2 }}>₹140 Cr+ AUM</div>
          </div>
          <div style={{ background: "rgba(0,212,178,0.15)", border: "1px solid #00D4B2", color: "#00D4B2", borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>+24.8% YoY</div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 100, margin: "10px 0" }}>
          {[30, 48, 68, 92].map((vh, i) => (
            <div key={i} style={{ flex: 1, background: "linear-gradient(180deg, #00D4B2 0%, #092B28 100%)", borderRadius: "8px 8px 0 0", height: vh + "%", display: "flex", alignItems: "center", justifyContent: "center", borderTop: "2px solid #2BE3C6" }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: "#FFFFFF" }}>Q{i + 1}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "#8A99AD", textAlign: "center" }}>Disciplined Goal-Aligned Asset Allocation</div>
      </div>
    );
  }

  // 5. PLANNING: Financial Roadmap Blueprint
  return (
    <div className="sp-photo" style={{ aspectRatio: "7 / 5", position: "relative", overflow: "hidden", borderRadius: 16, background: "linear-gradient(135deg, #091322 0%, #0F1D32 100%)", padding: 22, display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#00D4B2", letterSpacing: "1px" }}>FINANCIAL ROADMAP STRATEGY</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#FFFFFF", marginTop: 2 }}>Retirement & Life Milestones</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, margin: "12px 0" }}>
        {[
          { step: "01", title: "Emergency & Life Protection", status: "Secured", col: "#10B981" },
          { step: "02", title: "Child Education & Wealth Build", status: "In Progress", col: "#00D4B2" },
          { step: "03", title: "Retirement & Estate Corpus", status: "On Track", col: "#3B82F6" },
        ].map((m, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.04)", padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: m.col, color: "#0F172A", fontWeight: 800, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center" }}>{m.step}</div>
            <div style={{ flex: 1, fontSize: 12, fontWeight: 600, color: "#E2E8F0" }}>{m.title}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: m.col }}>{m.status}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 11, color: "#8A99AD", textAlign: "right" }}>Comprehensive Financial Roadmap</div>
    </div>
  );
}

function Photo({ src, alt, ratio = "7 / 5" }) {
  const lowerAlt = (alt || "").toLowerCase();
  const lowerSrc = (src || "").toLowerCase();
  
  let imgFileName = lowerSrc;
  if (imgFileName.includes("anchorid")) {
    imgFileName = lowerAlt.replace(/[^a-z0-9]+/g, "-");
  }
  if (imgFileName.startsWith("/")) {
    imgFileName = imgFileName.split("/").pop();
  }
  if (!imgFileName.endsWith(".jpg") && !imgFileName.endsWith(".png")) {
    imgFileName = imgFileName + ".jpg";
  }
  
  const realImgPath = "/images/solutions/" + imgFileName;

  return (
    <div className="sp-photo" style={{ aspectRatio: ratio, position: "relative", overflow: "hidden", borderRadius: 16, background: "#0F172A", border: "1px solid rgba(255,255,255,0.1)" }}>
      <img src={realImgPath} alt={alt || "Solution image"} loading="lazy" onError={(e) => {
        e.target.src = lowerAlt.includes("insurance") || lowerSrc.includes("insurance") ? "/images/solutions/insurance.jpg" :
                       lowerAlt.includes("loan") || lowerSrc.includes("loan") ? "/images/solutions/loans.jpg" :
                       lowerAlt.includes("securit") || lowerSrc.includes("securit") ? "/images/solutions/securities.jpg" :
                       lowerAlt.includes("wealth") || lowerSrc.includes("wealth") ? "/images/solutions/wealth.jpg" : "/images/solutions/planning.jpg";
      }} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}

function PhotoPlaceholder({ icon }) {
  return <Photo src="insurance" alt="Insurance" />;
}

/* one solution row: photo + text column, sides alternate row by row */
function SolRow({ catKey, it, num, go }) {
  const imageLeft = num % 2 === 1;
  const icon = SOL_ICON[it.name] || CAT_ICON[catKey];
  const Visual = (
    <div key="v" className="sp-photo-cell">
      <Photo src={solImg(anchorId(catKey, it.name))} alt={it.name} ratio="7 / 5" fallback={<PhotoPlaceholder icon={icon} />} />
    </div>
  );
  const Text = (
    <div key="t" className="sp-sol-text">
      <div style={{ fontSize: 13, fontWeight: 600, color: TEAL, letterSpacing: "0.4px", marginBottom: 14 }}>{it.name}</div>
      {it.head && <h3 style={{ fontSize: "clamp(26px,3.6vw,48px)", fontWeight: 500, color: "#E7ECF4", letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 20 }}>{it.head}</h3>}
      <p style={{ fontSize: 17, color: "#E7ECF4", lineHeight: 1.75, letterSpacing: "0.01em", marginBottom: 24, opacity: 0.85 }}>{it.body}</p>
      <button className="sp-sol-link" onClick={() => go("contact")}>Talk to an Advisor</button>
    </div>
  );
  return (
    <div className="sp-sol-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 120, alignItems: "center" }}>
      {imageLeft ? [Visual, Text] : [Text, Visual]}
    </div>
  );
}

/* decorative gradient visual panel for a product row */
function CatVisual({ catKey, num, icon }) {
  return (
    <div className="sp-visual" style={{ position: "relative", borderRadius: 20, overflow: "hidden", minHeight: 220, background: "linear-gradient(145deg,#0F1729 0%,#132038 60%,#0c2b2a 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg viewBox="0 0 320 220" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 }}>
        {[44, 88, 132, 176].map((y) => <line key={y} x1="0" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1"></line>)}
        {[64, 128, 192, 256].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="220" stroke="rgba(255,255,255,0.05)" strokeWidth="1"></line>)}
        <path d="M0,170 C40,160 70,150 110,120 C150,90 180,100 220,70 C260,40 290,44 320,30" stroke="#00D4B2" strokeWidth="2.5" fill="none" strokeDasharray="600" style={{ animation: "drawLine 2.2s .3s ease-out both" }}></path>
      </svg>
      <div style={{ position: "absolute", top: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,178,0.28) 0%, transparent 70%)" }}></div>
      <div style={{ position: "relative", textAlign: "center", padding: 24 }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, background: "rgba(0,212,178,0.15)", border: "1px solid rgba(0,212,178,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D4B2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{icon || CAT_ICON[catKey]}</svg>
        </div>
        <div className="ff-serif" style={{ fontSize: 64, fontWeight: 800, color: "rgba(255,255,255,0.10)", lineHeight: 1, letterSpacing: "-2px" }}>{String(num).padStart(2, "0")}</div>
      </div>
    </div>
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
  const pendingAnchor = React.useRef(null);

  const go = (p, t, anchor) => {
    const samePage = p === page;
    pendingAnchor.current = anchor || null;
    if (!samePage) setWipeKey((k) => k + 1);
    setPage(p);
    if (t) setTab(t);
    setDrop(null);
    setSolHover(null);
    setMobileOpen(false);
    setMobSol(null);
    if (typeof window === "undefined") return;
    if (!anchor) { window.scrollTo(0, 0); return; }
    // Same page: the [page] effect won't re-run, so scroll to the anchor here.
    if (samePage) {
      pendingAnchor.current = null;
      let tries = 0;
      const tryScroll = () => {
        const el = document.getElementById(anchor);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        else if (tries++ < 25) setTimeout(tryScroll, 40);
      };
      setTimeout(tryScroll, 30);
    }
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
  const navC = (active) => (active ? TEAL : "#B9C4D3");
  const navW = (active) => (active ? 600 : 400);

  /* ============================ RENDER ============================ */
  return (
    <div style={{ background: BG }}>
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
            <img src={MARK} alt="Spectra Assets" style={{ height: 74, width: "auto", animation: "plLogoIn 0.7s 0.1s cubic-bezier(0.16,1,0.3,1) both" }} />
            <div style={{ fontSize: "clamp(30px,5vw,52px)", fontWeight: 800, color: "#fff", letterSpacing: "-1px", textAlign: "center", lineHeight: 1.1, animation: "plLogoIn 0.7s 0.25s cubic-bezier(0.16,1,0.3,1) both" }}>Spectra <em style={{ fontStyle: "normal", color: TEAL }}>Assets</em></div>
          </div>
        </div>
      )}

      {/* SCROLL PROGRESS LINE */}

      {/* NAV */}
      <nav data-navbar style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, height: NAV_H, background: "rgba(7,11,17,0.82)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", borderBottom: "1px solid rgba(0,212,178,0.12)", display: "flex", alignItems: "center", padding: "0 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={() => go("home")} aria-label="Spectra Assets home" style={{ background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center" }}>
            <Brand size={44} color={INK} />
          </button>
          <div className="sp-nav-links" style={{ display: "flex", alignItems: "center", gap: 2, position: "relative" }}>
            <S as="button" onClick={() => go("home")} css={`background:none;border:none;cursor:pointer;font-size:19px;font-weight:${navW(page === "home")};color:${navC(page === "home")};padding:8px 14px;border-radius:8px;transition:color 0.15s;`} hover="color:#00D4B2;">Home</S>

            {/* Solutions dropdown */}
            <div style={{ position: "relative" }}>
              <S as="button" onClick={() => setDrop(drop === "sol" ? null : "sol")} css={`background:none;border:none;cursor:pointer;font-size:19px;font-weight:${navW(isSol)};color:${navC(isSol)};padding:8px 14px;border-radius:8px;transition:color 0.15s;display:flex;align-items:center;gap:5px;`} hover="color:#00D4B2;">
                Solutions
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s", transform: drop === "sol" ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="2,4 6,8 10,4"></polyline></svg>
              </S>
              {drop === "sol" && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: SURF, border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(0,0,0,0.4)", minWidth: 240, zIndex: 300 }}>
                  {CAT_ORDER.map((k) => (
                    <div key={k} onMouseEnter={() => setSolHover(k)} style={{ position: "relative" }}>
                      <S as="button" onClick={() => go("sol-" + k, k)} css={`width:100%;background:${solHover === k ? "#0B121E" : "none"};border:none;cursor:pointer;font-size:19px;font-weight:500;color:${solHover === k ? "#00D4B2" : "#B9C4D3"};padding:10px 14px;border-radius:8px;text-align:left;transition:all 0.12s;display:flex;align-items:center;justify-content:space-between;gap:10px;`} hover="background:#0B121E;color:#00D4B2;">
                        {CATS[k].nav}
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4,2 8,6 4,10"></polyline></svg>
                      </S>
                      {solHover === k && (
                        <div style={{ position: "absolute", left: "100%", top: -8, marginLeft: 4, background: SURF, border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(0,0,0,0.4)", minWidth: 250, maxHeight: 420, overflowY: "auto", zIndex: 400 }}>
                          <div style={{ fontSize: 11, fontWeight: 700, color: "#75839A", letterSpacing: "0.8px", textTransform: "uppercase", padding: "6px 14px 8px" }}>{CATS[k].nav}</div>
                          {catMenu(CATS[k]).map((m, mi) => (
                            <S key={mi} as="button" onClick={() => go("sol-" + k, k, m.anchor)} css="width:100%;background:none;border:none;cursor:pointer;font-size:19px;font-weight:500;color:#B9C4D3;padding:9px 14px;border-radius:8px;text-align:left;transition:all 0.12s;" hover="background:#0B121E;color:#00D4B2;">{m.label}</S>
                          ))}
                          <div style={{ height: 1, background: "rgba(255,255,255,0.09)", margin: "4px 8px" }}></div>
                          <S as="button" onClick={() => go("sol-" + k, k)} css="width:100%;background:none;border:none;cursor:pointer;font-size:19px;font-weight:600;color:#00D4B2;padding:8px 14px;border-radius:8px;text-align:left;transition:background 0.12s;" hover="background:rgba(0,212,178,0.10);">Open {CATS[k].nav} page →</S>
                        </div>
                      )}
                    </div>
                  ))}
                  <div style={{ height: 1, background: "rgba(255,255,255,0.09)", margin: "4px 8px" }}></div>
                  <S as="button" onClick={() => go("solutions")} css="width:100%;background:none;border:none;cursor:pointer;font-size:19px;font-weight:600;color:#00D4B2;padding:8px 14px;border-radius:8px;text-align:left;transition:background 0.12s;" hover="background:rgba(0,212,178,0.10);">View all solutions →</S>
                </div>
              )}
            </div>

            {/* Tools dropdown */}
            <div style={{ position: "relative" }}>
              <S as="button" onClick={() => setDrop(drop === "tools" ? null : "tools")} css={`background:none;border:none;cursor:pointer;font-size:19px;font-weight:${navW(page.startsWith("tool-"))};color:${navC(page.startsWith("tool-"))};padding:8px 14px;border-radius:8px;transition:color 0.15s;display:flex;align-items:center;gap:5px;`} hover="color:#00D4B2;">
                Tools
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s", transform: drop === "tools" ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="2,4 6,8 10,4"></polyline></svg>
              </S>
              {drop === "tools" && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: SURF, border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(0,0,0,0.4)", minWidth: 200, zIndex: 300 }}>
                  {[
                    ["SIP Calculator", () => { setInvestMode("sip"); go("tool-invest"); }],
                    ["Lumpsum Calculator", () => { setInvestMode("lumpsum"); go("tool-invest"); }],
                    ["SWP Calculator", () => go("tool-swp")],
                    ["Loan / EMI Calculator", () => go("tool-loan")],
                  ].map(([l, fn]) => (
                    <S key={l} as="button" onClick={fn} css="width:100%;background:none;border:none;cursor:pointer;font-size:19px;font-weight:500;color:#B9C4D3;padding:10px 14px;border-radius:8px;text-align:left;transition:all 0.12s;" hover="background:#0B121E;color:#00D4B2;">{l}</S>
                  ))}
                </div>
              )}
            </div>

            {/* Forms — direct link to the forms page */}
            <S as="button" onClick={() => go("forms")} css={`background:none;border:none;cursor:pointer;font-size:19px;font-weight:${navW(page === "forms")};color:${navC(page === "forms")};padding:8px 14px;border-radius:8px;transition:color 0.15s;`} hover="color:#00D4B2;">Forms</S>

            {/* Media dropdown */}
            <div style={{ position: "relative" }}>
              <S as="button" onClick={() => setDrop(drop === "media" ? null : "media")} css="background:none;border:none;cursor:pointer;font-size:19px;font-weight:400;color:#B9C4D3;padding:8px 14px;border-radius:8px;transition:color 0.15s;display:flex;align-items:center;gap:5px;" hover="color:#00D4B2;">
                Media
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.2s", transform: drop === "media" ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="2,4 6,8 10,4"></polyline></svg>
              </S>
              {drop === "media" && (
                <div style={{ position: "absolute", top: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)", background: SURF, border: "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: 8, boxShadow: "0 16px 48px rgba(0,0,0,0.4)", minWidth: 190, zIndex: 300 }}>
                  {[["Instagram", "https://www.instagram.com/_spectraassets_", <><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>],
                    ["LinkedIn", "https://www.linkedin.com/company/spectra-assets-private-limited/", <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></>],
                  ].map(([label, href, icon]) => (
                    <S key={label} as="a" href={href} target="_blank" rel="noopener" css="width:100%;box-sizing:border-box;font-size:19px;font-weight:500;color:#B9C4D3;padding:10px 14px;border-radius:8px;text-align:left;display:flex;align-items:center;gap:10px;transition:all 0.12s;text-decoration:none;" hover="background:#0B121E;color:#00D4B2;">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>{label}
                    </S>
                  ))}
                </div>
              )}
            </div>

            <S as="button" onClick={() => go("contact")} css={`background:none;border:none;cursor:pointer;font-size:19px;font-weight:${navW(page === "contact")};color:${navC(page === "contact")};padding:8px 14px;border-radius:8px;transition:color 0.15s;`} hover="color:#00D4B2;">Contact</S>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="sp-burger" onClick={() => setMobileOpen((o) => !o)} aria-label="Menu" style={{ display: "none", alignItems: "center", justifyContent: "center", width: 40, height: 40, background: "none", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8, cursor: "pointer" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {mobileOpen ? <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></> : <><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></>}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{ position: "fixed", top: NAV_H, left: 0, right: 0, bottom: 0, zIndex: 99, background: BG, overflowY: "auto", padding: "12px 24px 48px", borderTop: "1px solid rgba(255,255,255,0.09)" }}>
          {[["Home", "home"]].map(([l, p]) => (
            <button key={p} onClick={() => go(p)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderBottom: "1px solid #0E1624", padding: "16px 0", fontSize: 16, fontWeight: 600, color: INK, cursor: "pointer" }}>{l}</button>
          ))}
          <div style={{ fontSize: 11, fontWeight: 700, color: "#75839A", letterSpacing: "1.2px", textTransform: "uppercase", padding: "20px 0 8px" }}>Solutions</div>
          {CAT_ORDER.map((k) => (
            <div key={k}>
              <button onClick={() => setMobSol(mobSol === k ? null : k)} style={{ display: "flex", width: "100%", alignItems: "center", justifyContent: "space-between", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: 15, fontWeight: 500, color: "#B9C4D3", cursor: "pointer" }}>
                {CATS[k].nav}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#75839A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "transform 0.25s", transform: mobSol === k ? "rotate(180deg)" : "rotate(0deg)" }}><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>
              {mobSol === k && (
                <div style={{ padding: "0 0 10px 12px", borderLeft: "2px solid rgba(255,255,255,0.09)", marginLeft: 2 }}>
                  <button onClick={() => go("sol-" + k, k)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 0 8px 12px", fontSize: 13, fontWeight: 600, color: TEAL, cursor: "pointer" }}>Open {CATS[k].nav} page →</button>
                  {catMenu(CATS[k]).map((m, mi) => (
                    <button key={mi} onClick={() => go("sol-" + k, k, m.anchor)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "8px 0 8px 12px", fontSize: 14, color: "#8A99AD", cursor: "pointer" }}>{m.label}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
          <button onClick={() => go("solutions")} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: 14, fontWeight: 600, color: TEAL, cursor: "pointer" }}>View all solutions →</button>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#75839A", letterSpacing: "1.2px", textTransform: "uppercase", padding: "20px 0 8px", borderTop: "1px solid #0E1624", marginTop: 8 }}>Tools</div>
          {[
            ["SIP Calculator", () => { setInvestMode("sip"); go("tool-invest"); }],
            ["Lumpsum Calculator", () => { setInvestMode("lumpsum"); go("tool-invest"); }],
            ["SWP Calculator", () => go("tool-swp")],
            ["Loan / EMI Calculator", () => go("tool-loan")],
          ].map(([l, fn]) => (
            <button key={l} onClick={fn} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "12px 0", fontSize: 15, color: "#B9C4D3", cursor: "pointer" }}>{l}</button>
          ))}
          {[["Forms", "forms"], ["Contact", "contact"]].map(([l, p]) => (
            <button key={p} onClick={() => go(p)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", borderTop: "1px solid #0E1624", marginTop: 8, padding: "16px 0", fontSize: 16, fontWeight: 600, color: INK, cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      )}

      {page === "home" && <Home go={go} openMember={openMember} setOpenMember={setOpenMember} />}
      {page === "solutions" && <Solutions go={go} tab={tab} setTab={setTab} />}
      {page.startsWith("sol-") && <Category cat={CATS[page.slice(4)]} go={go} faq={faq} toggleFaq={toggleFaq} />}
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

/* testimonials: an endless, slowly scrolling row of cards (pauses on hover) */
function TestimonialsSlider() {
  const cards = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <div className="sp-testi-wrap">
      <div className="sp-testi-track">
        {cards.map((t, k) => (
          <div key={k} className="sp-testi-card" aria-hidden={k >= TESTIMONIALS.length ? "true" : undefined}>
            <Stars n={t.rating} />
            <p style={{ fontSize: "clamp(15px,1.25vw,18px)", color: "#D6DDE9", lineHeight: 1.85, fontWeight: 300, margin: "20px 0 26px", flex: 1 }}>&ldquo;{t.quote}&rdquo;</p>
            <div style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,212,178,0.12)", border: "1px solid rgba(0,212,178,0.3)", color: TEAL, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "clamp(15px,1.2vw,18px)", flexShrink: 0 }}>{t.name.charAt(0)}</div>
              <div>
                <div style={{ fontSize: "clamp(14px,1.15vw,17px)", fontWeight: 600, color: INK }}>{t.name}</div>
                <div style={{ fontSize: "clamp(13px,1vw,15px)", color: "#75839A", marginTop: 2 }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ HOME ============================ */
function Home({ go, openMember, setOpenMember }) {
  const wrap = { maxWidth: 1100, margin: "0 auto" };
  return (
    <div className="page-wrap" style={{ paddingTop: NAV_H }}>
      {/* HERO: dark, editorial, with the soft aurora glow behind the text */}
      <section style={{ position: "relative", overflow: "hidden", background: BG }}>
        <Aurora />
        <div aria-hidden="true" style={{ position: "absolute", top: "-6%", left: "50%", transform: "translateX(-50%)", width: 760, height: 420, maxWidth: "100%", background: "radial-gradient(ellipse at center, rgba(0,212,178,0.16) 0%, transparent 68%)", filter: "blur(40px)", pointerEvents: "none" }}></div>
        <div aria-hidden="true" className="sp-hero-veil" style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 66% 74% at 50% 46%, rgba(7,11,17,0.94) 0%, rgba(7,11,17,0.86) 52%, rgba(7,11,17,0.55) 80%, rgba(7,11,17,0.25) 100%)" }}></div>
        <div style={{ position: "relative", zIndex: 1, padding: "52px 20px 100px", maxWidth: 1760, margin: "0 auto", textAlign: "center" }}>
          <WordReveal as="h1" className="sp-hero-h1" text="Financial advice that looks at the bigger picture." emFrom={6} baseDelay={200}
            emStyle={{ fontStyle: "italic", fontWeight: 400, background: "linear-gradient(120deg,#00D4B2 0%,#34D399 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}
            style={{ fontSize: "clamp(34px,calc(9.2vw - 6px),100px)", color: "#fff", lineHeight: 1.14, marginBottom: 30, textShadow: "0 0 30px rgba(0,212,178,0.14)" }} />
          <p className="sp-hero-body" style={{ fontSize: "clamp(17.5px,2.1vw,23px)", color: "#8A99AD", lineHeight: 1.65, maxWidth: 1700, textWrap: "balance", margin: "0 auto 20px", fontWeight: 300 }}>Money rarely comes with just one goal. We help individuals, families and businesses make informed decisions across wealth creation, insurance, lending and financial planning, with the bigger picture always in focus.</p>
          <p className="sp-hero-body" style={{ fontSize: "clamp(16px,1.75vw,19px)", color: "#75839A", lineHeight: 1.65, maxWidth: 1500, margin: "0 auto 44px", fontWeight: 300 }}>Because a financial product may solve one need. A well-thought-out strategy can connect them all.</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <CtaPrimary onClick={() => go("contact")} radius={999} upper tracking="0.12em" fontSize="clamp(14px,1.4vw,15px)" fontWeight={600} fontFamily="'Plus Jakarta Sans', sans-serif" pad="clamp(17px,1.8vw,21px) clamp(30px,3.6vw,44px)">
              Talk to an Advisor
            </CtaPrimary>
            <S as="button" onClick={() => go("solutions")} css="font-family:'Plus Jakarta Sans',sans-serif;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.16);cursor:pointer;font-size:clamp(14px,1.4vw,15px);font-weight:600;color:#E7ECF4;padding:clamp(17px,1.8vw,21px) clamp(30px,3.6vw,44px);border-radius:999px;letter-spacing:0.12em;text-transform:uppercase;transition:all 0.2s;" hover="border:1px solid rgba(0,212,178,0.55);background:rgba(0,212,178,0.07);color:#00D4B2;">Explore our solutions</S>
          </div>
        </div>
      </section>

      {/* OUR NUMBERS (centered) */}
      <section className="sp-newfont" style={{ maxWidth: 1760, margin: "0 auto", padding: "48px 20px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.09)" }}>
        <p className="sp-kicker" style={{ color: TEAL, marginBottom: 18, fontSize: "clamp(17px,1.7vw,21px)" }}>Our numbers</p>
        <h2 className="sp-one-line" style={{ fontSize: "clamp(24px,3.8vw,48px)", color: INK, marginBottom: 48 }}>Built on relationships. Growing with purpose.</h2>
        <div className="sp-numrow" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: 0 }}>
          {[{ p: "₹", v: 140, s: "Cr+", l: "Assets under management" }, { p: "", v: 350, s: "+", l: "Client families & businesses" }, { p: "", v: 600, s: "+", l: "Portfolios managed" }].map((it, i) => (
            <div key={i} style={{ padding: "8px clamp(28px,5.2vw,72px)", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.09)" : "none" }}>
              <div className="ff-serif" style={{ fontSize: "clamp(34px,5.5vw,68px)", color: INK, lineHeight: 1 }}><CountUp to={it.v} prefix={it.p} suffix={it.s} /></div>
              <div className="sp-stat-label" style={{ color: "#75839A", marginTop: 16, fontSize: "clamp(12px,1.15vw,14px)" }}>{it.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OUR APPROACH: one centred card, three questions, then the promise */}
      <section id="process-section" className="sp-newfont" style={{ position: "relative", background: BG, borderTop: "1px solid rgba(255,255,255,0.09)", borderBottom: "1px solid rgba(255,255,255,0.09)", padding: "48px 20px 56px" }}>
        <div aria-hidden="true" style={{ position: "absolute", top: "8%", left: "50%", transform: "translateX(-50%)", width: 720, height: 360, maxWidth: "100%", background: "radial-gradient(ellipse at center, rgba(0,212,178,0.07) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <Reveal style={{ position: "relative", maxWidth: 1560, margin: "0 auto", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 28, padding: "clamp(32px,4vw,56px) clamp(20px,4.4vw,64px)", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(20px,2.9vw,38px)", color: INK, lineHeight: 1.25, marginBottom: "clamp(22px,2.6vw,34px)", textWrap: "balance" }}>Our approach begins with understanding you:</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "clamp(12px,1.7vw,26px)", marginBottom: "clamp(24px,2.8vw,40px)" }}>
            {["Where are you today?", "What matters to you?", "Where do you want to go?"].map((c) => (
              <span key={c} style={{ background: "rgba(0,212,178,0.06)", border: "1px solid rgba(0,212,178,0.16)", borderRadius: 14, padding: "clamp(14px,1.5vw,20px) 16px", fontSize: "clamp(16px,1.8vw,23px)", fontWeight: 600, color: TEAL }}>{c}</span>
            ))}
          </div>
          <p style={{ fontSize: "clamp(16px,1.75vw,22px)", color: "#8A99AD", lineHeight: 1.6, maxWidth: 1320, margin: "0 auto", fontWeight: 300, textWrap: "balance" }}>From there, we help you make financial decisions that are practical today and meaningful for tomorrow. Because a financial product may solve one need. A well-thought-out strategy can connect them all.</p>
        </Reveal>
      </section>

      {/* OUR STORY + WHAT WE BELIEVE: left column pins while the five principles scroll on the right */}
      <section className="sp-newfont" style={{ background: BG, borderTop: "1px solid rgba(255,255,255,0.09)", padding: "56px 20px 64px", position: "relative" }}>
        <div className="sp-grid-2" style={{ ...wrap, maxWidth: 1720, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6.8vw,96px)", alignItems: "start" }}>
          <div className="sp-sticky-col" style={{ position: "sticky", top: NAV_H + 40 }}>
            <Reveal>
              <p className="sp-kicker" style={{ color: TEAL, marginBottom: 22, fontSize: "clamp(17px,1.7vw,21px)" }}>Our story</p>
              <h2 style={{ fontSize: "clamp(26px,3.9vw,50px)", color: INK, lineHeight: 1.18, marginBottom: 28 }}>We didn't start with products.<br /><span style={{ color: GOLD, fontStyle: "italic", fontWeight: 400 }}>We started with people.</span></h2>
              <p style={{ fontSize: "clamp(17px,1.67vw,21px)", color: INK, fontWeight: 500, lineHeight: 1.6, marginBottom: 20 }}>Every individual has a different story:</p>
              <ul style={{ listStyle: "none", margin: "0 0 32px", padding: "2px 0 2px 26px", borderLeft: "3px solid rgba(0,212,178,0.38)", display: "flex", flexDirection: "column", gap: 14 }}>
                {["A young professional wants to build wealth.", "Parents dream of giving their children the best education.", "Entrepreneurs work tirelessly to grow their businesses."].map((t) => (
                  <li key={t} style={{ fontSize: "clamp(16px,1.53vw,19.5px)", color: "#B9C4D3", lineHeight: 1.65, fontWeight: 300 }}><span aria-hidden="true" style={{ color: "#8A99AD", marginRight: 8 }}>&bull;</span>{t}</li>
                ))}
              </ul>
              <p style={{ fontSize: "clamp(15px,1.46vw,19px)", color: "#8A99AD", lineHeight: 1.75, fontWeight: 300 }}>Yet most financial advice is delivered in pieces, investments here, insurance there, loans somewhere else. Spectra Assets was built to bring every financial decision together under one trusted relationship.</p>
            </Reveal>
          </div>
          <div>
            <Reveal>
              <h3 className="sp-one-line" style={{ fontSize: "clamp(15px,1.95vw,25px)", color: INK, lineHeight: 1.3, marginBottom: 36, paddingTop: 6 }}>Five principles that guide every conversation.</h3>
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(18px,1.7vw,24px)" }}>
              {PRINCIPLES.map((p, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="sp-pcard">
                    <div style={{ fontFamily: "'Cinzel', 'Plus Jakarta Sans', serif", fontWeight: 600, fontSize: "clamp(12px,1.12vw,14px)", color: TEAL, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 12 }}>Principle {String(i + 1).padStart(2, "0")}</div>
                    <h3 style={{ fontSize: "clamp(17px,2.1vw,27px)", color: INK, lineHeight: 1.3, marginBottom: 12 }}>{p.t}</h3>
                    <p style={{ fontSize: "clamp(14.5px,1.39vw,18px)", color: "#8A99AD", lineHeight: 1.75, fontWeight: 300 }}>{p.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* THE SPECTRA ECOSYSTEM: big stacked heading on the left, the logo diagram on the right */}
      <section className="sp-newfont" style={{ background: NAVY, padding: "48px 20px", position: "relative", overflow: "hidden" }}>
        <div className="parallax-slow" style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,178,0.10) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div className="sp-eco-grid" style={{ maxWidth: 1400, margin: "0 auto", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1.15fr", gap: "clamp(32px,4.8vw,72px)", alignItems: "center" }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(40px,7.3vw,92px)", color: INK, lineHeight: 1.06, margin: 0 }}>The<br />Spectra<br /><span style={{ fontStyle: "italic", fontWeight: 400, background: "linear-gradient(120deg,#00D4B2 0%,#34D399 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", paddingRight: "0.08em" }}>Ecosystem</span></h2>
          </Reveal>
          <Ecosystem go={go} />
        </div>
        <Reveal as="p" style={{ position: "relative", zIndex: 1, textAlign: "center", margin: "clamp(32px,3.8vw,52px) auto 0", fontSize: "clamp(15px,1.67vw,21px)", color: "rgba(255,255,255,0.55)", lineHeight: 1.6, fontWeight: 300, textWrap: "balance" }}>Every layer of your finances, managed together under one relationship.</Reveal>
      </section>

      {/* spacer between sections */}
      {/* WHY CLIENTS CHOOSE SPECTRA: centred heading, four boxes below */}
      <section className="sp-newfont" style={{ padding: "48px 20px 56px", ...wrap, maxWidth: 1720 }}>
        <Reveal>
          <h2 style={{ textAlign: "center", fontSize: "clamp(26px,3.6vw,50px)", color: INK, lineHeight: 1.2, marginBottom: "clamp(36px,3.4vw,52px)" }}>Why clients choose Spectra</h2>
        </Reveal>
        <div className="sp-why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "clamp(16px,1.4vw,24px)", alignItems: "stretch" }}>
          {[
            { p: "Good advice doesn't end after the first meeting. Our commitment extends beyond recommendations." },
            { p: "We believe in staying connected, reviewing progress, adapting strategies and supporting clients through every important financial milestone." },
            { p: "Whether it's helping you make your first investment, assisting during an insurance claim or reviewing your financial plan as your goals evolve, our team remains by your side." },
            { p: "Because lasting financial confidence is built through continuous guidance, not one-time conversations." },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 110} style={{ height: "100%" }}>
              <div className="sp-pcard sp-why-box">
                <span aria-hidden="true" className="sp-why-bar"></span>
                {b.t && <h3 style={{ fontSize: "clamp(18px,1.7vw,24px)", color: INK, lineHeight: 1.3, marginBottom: 14 }}>{b.t}</h3>}
                <p style={{ fontSize: "clamp(15px,1.4vw,19px)", color: b.t ? "#8A99AD" : "#B9C4D3", lineHeight: 1.75, fontWeight: 300 }}>{b.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* OUR NETWORK: logos first, then the same partners as names only */}
      <section className="sp-newfont" style={{ background: "#0B121E", borderTop: "1px solid rgba(255,255,255,0.09)", borderBottom: "1px solid rgba(255,255,255,0.09)", padding: "48px 32px 56px" }}>
        <div style={{ ...wrap, textAlign: "center", maxWidth: 1160 }}>
          <p className="sp-kicker" style={{ color: TEAL, marginBottom: 14 }}>Our network of financial institutions</p>
          <h2 className="sp-one-line" style={{ fontSize: "clamp(16px,2.35vw,28px)", color: INK, lineHeight: 1.25, margin: "0 auto 44px" }}>The right advice is strengthened by the right financial ecosystem.</h2>
        </div>
        <LogoMarquee />
      </section>

      {/* LEADERSHIP */}
      <section className="sp-newfont" style={{ padding: "48px 20px 56px", ...wrap, maxWidth: 1720 }}>
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "clamp(44px,4.4vw,68px)" }}>
            <p className="sp-kicker" style={{ color: TEAL, marginBottom: 14 }}>Leadership</p>
            <h2 style={{ fontSize: "clamp(26px,3.6vw,50px)", color: INK, lineHeight: 1.2 }}>Expertise across every financial need.</h2>
          </div>
        </Reveal>
        <div className="sp-lead-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px,2vw,36px)", alignItems: "stretch" }}>
          {TEAM.map((m, i) => (
            <Reveal key={i} delay={i * 110} style={{ height: "100%" }}>
              <div className="sp-lead-card">
                <div>
                  <div className="ff-serif sp-lead-avatar">{m.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}</div>
                  <h3 style={{ fontSize: "clamp(20px,1.9vw,28px)", color: INK, lineHeight: 1.25, marginBottom: 10 }}>{m.name}</h3>
                  <div style={{ fontSize: "clamp(13px,1.1vw,16px)", fontWeight: 600, letterSpacing: "0.10em", textTransform: "uppercase", color: TEAL, marginBottom: 18, lineHeight: 1.5 }}>{m.role}</div>
                  <p style={{ fontSize: "clamp(15px,1.3vw,19px)", color: "#8A99AD", lineHeight: 1.8, fontWeight: 300 }}>{m.quote}</p>
                </div>
                <div style={{ marginTop: 28, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 10, fontSize: "clamp(13px,1.1vw,15px)", color: "#75839A" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"></circle><path d="M8.5 14.5 7 22l5-3 5 3-1.5-7.5"></path></svg>
                  <span><b style={{ color: "#B9C4D3", fontWeight: 600 }}>{m.exp}</b> &middot; {m.expNote}</span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="sp-newfont" style={{ padding: "0 0 56px" }}>
        <Reveal>
          <div style={{ maxWidth: 1720, margin: "0 auto", padding: "0 20px", textAlign: "center", marginBottom: "clamp(36px,4vw,60px)" }}>
            <p className="sp-kicker" style={{ color: TEAL, marginBottom: 14 }}>Client stories</p>
            <h2 className="sp-one-line" style={{ fontSize: "clamp(26px,3.4vw,50px)", color: INK, lineHeight: 1.2 }}>Trusted by families &amp; businesses across Mumbai.</h2>
          </div>
        </Reveal>
        <TestimonialsSlider />
      </section>

    </div>
  );
}

/* ecosystem: the client's hand-drawn diagram. The triangle in the sketch stands for the logo,
   so one big logo sits in the middle, one point is written on each side of it, and a flow
   arrow runs beside every side (clockwise). Reveal: logo first, then side by side. */
function Ecosystem({ go }) {
  const [ref, seen] = useInView(0.3);

  // geometry in a 900x590 space; the svg viewBox crops to x150..750, y40..540.
  // A/BL/BR are only the guide points of the logo's silhouette (nothing is drawn between them)
  // K shrinks the whole diagram (logo + guides) around the logo's centre; 1 = the earlier, larger size
  const K = 0.7, C0 = [450, 254];
  const sc = (pt) => [C0[0] + (pt[0] - C0[0]) * K, C0[1] + (pt[1] - C0[1]) * K];
  const A = sc([450, 88]), BL = sc([285, 420]), BR = sc([615, 420]);
  const cen = [(A[0] + BL[0] + BR[0]) / 3, (A[1] + BL[1] + BR[1]) / 3];
  const VX = 150, VY = 104, VW = 600, VH = 356;
  const px = (x) => (((x - VX) / VW) * 100).toFixed(2) + "%";
  const py = (y) => (((y - VY) / VH) * 100).toFixed(2) + "%";
  const sides = [
    { from: BL, to: A,  text: "A complete financial\nperspective", off: 50, gap: 34 },
    { from: A,  to: BR, text: "One relationship",                 off: 50 },
    { from: BL, to: BR, text: "One advisory system",              off: 30 },
  ].map((e, i) => {
    const dx = e.to[0] - e.from[0], dy = e.to[1] - e.from[1], len = Math.hypot(dx, dy);
    const d = [dx / len, dy / len];
    const mid = [(e.from[0] + e.to[0]) / 2, (e.from[1] + e.to[1]) / 2];
    let n = [d[1], -d[0]];
    if ((mid[0] - cen[0]) * n[0] + (mid[1] - cen[1]) * n[1] < 0) n = [-n[0], -n[1]];   // point outward
    const h = len * 0.27;
    const arrow = { x1: mid[0] - d[0] * h + n[0] * e.off, y1: mid[1] - d[1] * h + n[1] * e.off, x2: mid[0] + d[0] * h + n[0] * e.off, y2: mid[1] + d[1] * h + n[1] * e.off };
    const lab = [mid[0] + n[0] * (e.off + (e.gap || 24)), mid[1] + n[1] * (e.off + (e.gap || 24))];
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;   // text runs the same way as the arrow
    return { ...e, i, arrow, lab, angle, delay: 1 + i * 0.9 };
  });
  const fade = (delay, extra) => ({ opacity: seen ? 1 : 0, transition: `opacity .7s ease ${delay}s, transform .7s cubic-bezier(.16,1,.3,1) ${delay}s`, ...(extra || {}) });
  return (
    <div ref={ref} style={{ minWidth: 0 }}>
      <div className="sp-eco-stage" style={{ position: "relative", width: "100%", margin: "0 auto", aspectRatio: VW + " / " + VH }}>
        {/* soft glow behind the logo */}
        <div aria-hidden="true" style={{ position: "absolute", left: "50%", top: py(C0[1]), width: "80%", height: "96%", transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(0,212,178,0.16) 0%, transparent 62%)", pointerEvents: "none", opacity: seen ? 1 : 0, transition: "opacity 1.4s ease .2s" }}></div>

        {/* the big logo */}
        <img src={MARK} alt="Spectra Assets" className="sp-eco-logo"
          style={{ position: "absolute", left: "50%", top: py(C0[1]), height: ((340 * K / VH) * 100).toFixed(1) + "%", width: "auto", transform: seen ? "translate(-50%,-50%) scale(1)" : "translate(-50%,-50%) scale(0.9)", opacity: seen ? 1 : 0, filter: seen ? undefined : "blur(8px)", transition: "opacity .9s ease, transform 1.1s cubic-bezier(.16,1,.3,1), filter 1s ease" }} />

        {/* flow arrows beside each side, like the sketch */}
        <svg className="sp-eco-arrows" viewBox={`${VX} ${VY} ${VW} ${VH}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible", pointerEvents: "none" }} aria-hidden="true">
          <defs>
            <marker id="eco-arrow" viewBox="0 0 14 14" markerWidth="14" markerHeight="14" refX="11" refY="7" orient="auto" markerUnits="userSpaceOnUse">
              <path d="M2,2 L11,7 L2,12" fill="none" stroke="#00D4B2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </defs>
          {sides.map((sd) => (
            <g key={sd.i} style={{ ...fade(sd.delay), filter: "drop-shadow(0 0 5px rgba(0,212,178,0.55))" }}>
              <line className="sp-eco-flow" x1={sd.arrow.x1} y1={sd.arrow.y1} x2={sd.arrow.x2} y2={sd.arrow.y2} stroke="#00D4B2" strokeWidth="2.2" strokeLinecap="round" markerEnd="url(#eco-arrow)" />
            </g>
          ))}
        </svg>

        {/* the three points, written on the sides (desktop) */}
        {sides.map((sd) => (
          <h3 key={sd.i} className="sp-eco-side" style={{ position: "absolute", left: px(sd.lab[0]), top: py(sd.lab[1]), transform: `translate(-50%,-50%) rotate(${sd.angle.toFixed(1)}deg)`, whiteSpace: "pre-line", textAlign: "center", fontSize: "clamp(11px,1.74vw,22px)", color: INK, lineHeight: 1.2, margin: 0, ...fade(sd.delay + 0.2) }}>{sd.text}</h3>
        ))}
      </div>

      {/* mobile: the same three points as a list under the logo */}
      <div className="sp-eco-list" style={{ flexDirection: "column", gap: 12, margin: "-20px auto 0", maxWidth: 340, ...fade(3.2) }}>
        {sides.map((sd) => (
          <div key={sd.i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(0,212,178,0.18)", background: "rgba(0,212,178,0.05)", textAlign: "left" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: TEAL, boxShadow: "0 0 10px #00D4B2", flexShrink: 0 }}></span>
            <span className="ff-serif" style={{ fontSize: 15, color: INK }}>{sd.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ============================ SOLUTIONS OVERVIEW (tabbed) ============================ */
function Solutions({ go, tab, setTab }) {
  const wrap = { maxWidth: 1720, margin: "0 auto" };
  const cat = CATS[tab];
  return (
    <div className="page-wrap sp-newfont" style={{ paddingTop: NAV_H }}>
      <section style={{ background: NAVY, padding: "72px 20px 80px", position: "relative", overflow: "hidden" }}>
        <div className="parallax-fast" style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,178,0.15) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div className="parallax-slow" style={{ position: "absolute", bottom: -60, left: "20%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,178,0.12) 0%, transparent 70%)", pointerEvents: "none" }}></div>
        <div style={{ ...wrap, position: "relative", zIndex: 1 }}>
          <p className="sp-kicker" style={{ color: TEAL, marginBottom: 16 }}>Our solutions</p>
          <h1 style={{ fontSize: "clamp(32px,5.6vw,76px)", fontWeight: 800, color: "#fff", letterSpacing: "-2px", marginBottom: 20, lineHeight: 1.03 }}>Everything you need, <em style={{ fontStyle: "normal", color: TEAL }}>in one place.</em></h1>
          <p style={{ fontSize: "clamp(16px,1.5vw,22px)", color: "rgba(255,255,255,0.5)", maxWidth: 1400, lineHeight: 1.7, whiteSpace: "nowrap" }}>Five connected solution lines. One advisory relationship, no switching between firms.</p>
        </div>
      </section>

      <div style={{ background: BG, borderBottom: "1px solid rgba(255,255,255,0.09)", position: "sticky", top: NAV_H, zIndex: 50 }}>
        <div style={{ ...wrap, padding: "0 20px", display: "flex", gap: 0, overflowX: "auto" }}>
          {CAT_ORDER.map((k) => {
            const active = tab === k;
            return (
              <button key={k} onClick={() => setTab(k)} style={{ background: "none", border: "none", borderBottom: `2px solid ${active ? TEAL : "transparent"}`, cursor: "pointer", fontSize: "clamp(16px,1.5vw,19px)", fontWeight: active ? 600 : 400, color: active ? TEAL : "#8A99AD", padding: "clamp(14px,1.4vw,20px) clamp(16px,1.6vw,26px)", marginBottom: -1, whiteSpace: "nowrap", transition: "all 0.15s" }}>{CATS[k].nav}</button>
            );
          })}
        </div>
      </div>

      <section key={tab} style={{ padding: "clamp(48px,5vw,72px) 20px 8px", ...wrap, animation: "tabIn 0.35s ease-out both" }}>
        <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,5vw,80px)", alignItems: "center", marginBottom: "clamp(40px,4.4vw,64px)" }}>
        <div>
          <h2 style={{ fontSize: "clamp(27px,4.2vw,56px)", fontWeight: 800, color: INK, letterSpacing: "-1px", lineHeight: 1.08, marginBottom: 20 }}>{cat.titleA} <em style={{ fontStyle: "normal", color: TEAL }}>{cat.titleEm}</em></h2>
          {cat.intro.map((p, i) => <p key={i} style={{ fontSize: "clamp(17px,1.55vw,22px)", color: "#8A99AD", lineHeight: 1.8, marginBottom: 14 }}>{p}</p>)}
          <S as="button" onClick={() => go("contact")} css={`margin-top:16px;background:#00D4B2;color:#04140f;border:none;cursor:pointer;font-weight:700;font-size:clamp(14px,1.15vw,17px);padding:clamp(13px,1.2vw,17px) clamp(24px,2.4vw,34px);border-radius:10px;transition:all 0.18s;`} hover="background:#2BE3C6;transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,212,178,0.3);">Talk to an Advisor</S>
        </div>
        <div className="sp-photo-cell">
          <Photo src={solImg(cat.key)} alt={cat.nav} ratio="7 / 5" fallback={<PhotoPlaceholder icon={CAT_ICON[cat.key]} />} />
        </div>
        </div>
        <ProductGrid groups={cat.groups} />
      </section>

    </div>
  );
}

/* ---- product cards: click a card and its border stays highlighted ---- */
function ProductCard({ name, head, body, id, selected, onSelect }) {
  const toggle = () => onSelect && onSelect();
  return (
    <div id={id} role="button" tabIndex={0} aria-pressed={!!selected} onClick={toggle}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } }}
      className={"sp-selcard" + (selected ? " on" : "")} style={{ scrollMarginTop: 110, height: "100%" }}>
      <div style={{ fontFamily: "'Cinzel', serif", fontSize: "clamp(18px,2vw,30px)", fontWeight: 700, color: TEAL, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 14 }}>{name}</div>
      {head && <div style={{ fontFamily: "'Cambria', Georgia, serif", fontSize: "clamp(18px,1.7vw,26px)", fontWeight: 400, color: INK, letterSpacing: "0px", lineHeight: 1.35, marginBottom: 14 }}>{head}</div>}
      <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(15px,1.35vw,20px)", color: "#8A99AD", lineHeight: 1.8, fontWeight: 300 }}>{body}</p>
    </div>
  );
}
function CompactCard({ name, body, gold }) {
  const c = gold ? GOLD : TEAL;
  return (
    <S css="background:#0D1522;border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:20px 22px;transition:all 0.18s;height:100%;" hover={`border-color:${gold ? "rgba(201,168,76,0.4)" : "rgba(0,212,178,0.35)"};box-shadow:0 10px 28px rgba(0,0,0,0.21);`}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: c, flexShrink: 0 }}></span>
        <div style={{ fontSize: "clamp(14px,1.2vw,17px)", fontWeight: 700, color: INK }}>{name}</div>
      </div>
      <p style={{ fontSize: "clamp(13px,1.1vw,16px)", color: "#8A99AD", lineHeight: 1.7 }}>{body}</p>
    </S>
  );
}
/* icons for the Business & Corporate Insurance covers (keyed by item name) */
const BIZ_ICON = {
  "Fire Insurance": <path d="M12 22c4 0 7-2.7 7-6.8 0-4-3-6.3-4.2-9.2-.4 2-1.6 3.2-2.8 3.8C12 7 11.3 4.6 9.5 2 9.2 6 5 8.6 5 15.2 5 19.3 8 22 12 22z"></path>,
  "Marine Insurance": <><circle cx="12" cy="5" r="2"></circle><path d="M12 7v14"></path><path d="M5 13a7 7 0 0 0 14 0"></path><path d="M8 11H5v2M16 11h3v2"></path></>,
  "Plant & Machinery": <><circle cx="12" cy="12" r="3"></circle><path d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1 7 17M17 7l2.1-2.1"></path></>,
  "Contractors' All Risk (CAR)": <><path d="M2 20h20"></path><path d="M5 20V9h5v11"></path><path d="M5 9l7-5 9 5"></path><path d="M17 20v-6"></path><path d="M14 14h6"></path></>,
  "Burglary Insurance": <><rect x="4" y="11" width="16" height="10" rx="2"></rect><path d="M8 11V7a4 4 0 0 1 8 0v4"></path><circle cx="12" cy="16" r="1.4"></circle></>,
  "Jewellers' Block": <><path d="M6 3h12l4 6-10 12L2 9z"></path><path d="M2 9h20"></path><path d="M9 3l3 6 3-6"></path></>,
  "Group Health Insurance": <><path d="M20 8.5a4.5 4.5 0 0 0-8-2.8A4.5 4.5 0 0 0 4 8.5c0 4.5 8 10 8 10s8-5.5 8-10z"></path><path d="M12 8v5M9.5 10.5h5"></path></>,
  "Group Personal Accident": <><path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"></path><circle cx="12" cy="10" r="1.8"></circle><path d="M8.5 16a3.5 3.5 0 0 1 7 0"></path></>,
  "Group Term Life": <><path d="M12 3v2"></path><path d="M3 12a9 9 0 0 1 18 0z"></path><path d="M12 12v5a2 2 0 0 0 4 0"></path></>,
  "Workmen's Compensation": <><path d="M4 15a8 8 0 0 1 16 0"></path><path d="M2 15h20v3H2z"></path><path d="M12 7V4"></path></>,
  "Cyber Insurance": <><rect x="3" y="4" width="18" height="12" rx="2"></rect><path d="M8 20h8M12 16v4"></path><path d="M12 7.5l2.5 1v2c0 1.5-1 2.6-2.5 3.2-1.5-.6-2.5-1.7-2.5-3.2v-2z"></path></>,
  "Liability Insurance": <><path d="M12 3v18"></path><path d="M5 7h14"></path><path d="M5 7l-3 6a3 3 0 0 0 6 0z"></path><path d="M19 7l-3 6a3 3 0 0 0 6 0z"></path><path d="M8 21h8"></path></>,
  "Directors & Officers (D&O)": <><rect x="3" y="7" width="18" height="13" rx="2"></rect><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><path d="M12 11v4"></path></>,
  "Professional Indemnity": <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M9 15l2 2 4-4"></path></>,
  "Fleet Insurance": <><path d="M1 16V6h13v10"></path><path d="M14 9h4l3 4v3h-7"></path><circle cx="5.5" cy="17.5" r="1.8"></circle><circle cx="17.5" cy="17.5" r="1.8"></circle></>,
};

/* Business & Corporate Insurance: light beige panel, simple rectangular tabs,
   clean white cards. Kept intentionally plain (no gradients / dark drama). */
function BizCover({ g, go }) {
  const [tab, setTab] = React.useState(0);
  const [pick, setPick] = React.useState(null);
  const sub = g.sub[tab];
  return (
    <div className="sp-biz" style={{ margin: "44px 0 24px" }}>
    <div>
      <p className="sp-kicker" style={{ color: TEAL, marginBottom: 12 }}>For businesses</p>
      <h3 style={{ fontSize: "clamp(24px,3.4vw,44px)", fontWeight: 800, color: INK, letterSpacing: "-0.7px", lineHeight: 1.12, marginBottom: 14 }}>{g.title}</h3>
      {g.intro && <p style={{ fontSize: 18, color: "#8A99AD", lineHeight: 1.75, maxWidth: 720, marginBottom: 32 }}>{g.intro}</p>}

      {/* simple rectangular tabs */}
      <div role="tablist" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
        {g.sub.map((s, i) => {
          const on = i === tab;
          return (
            <button key={i} role="tab" aria-selected={on} onClick={() => { setTab(i); setPick(null); }}
              style={{ cursor: "pointer", borderRadius: 8, padding: "10px 18px", fontSize: 14, fontWeight: 600, transition: "background .18s, color .18s, border-color .18s",
                background: on ? TEAL : "#0D1522", color: on ? "#04140f" : "#8A99AD", border: on ? "1px solid " + TEAL : "1px solid rgba(255,255,255,0.12)" }}>
              {s.title}
            </button>
          );
        })}
      </div>

      {/* cards for the active tab */}
      <div key={tab} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 14 }}>
        {sub.items.map((it, i) => (
          <div key={it.name} role="button" tabIndex={0} aria-pressed={pick === i} onClick={() => setPick(pick === i ? null : i)}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setPick(pick === i ? null : i); } }}
            className={"sp-selcard" + (pick === i ? " on" : "")} style={{ background: "#0D1522" }}>
            <div style={{ width: 42, height: 42, borderRadius: 10, background: "rgba(0,212,178,0.12)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{BIZ_ICON[it.name] || CAT_ICON.insurance}</svg>
            </div>
            <div style={{ fontFamily: "Cinzel, serif", fontSize: 20, fontWeight: 700, color: INK, marginBottom: 8, lineHeight: 1.3 }}>{it.name}</div>
            <p style={{ fontSize: 18, color: "#8A99AD", lineHeight: 1.65 }}>{it.body}</p>
          </div>
        ))}
      </div>

      {/* and more */}
      {g.note && (
        <div style={{ marginTop: 28, borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 26, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 620 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: INK, marginBottom: 6 }}>{g.note.name}</div>
            <p style={{ fontSize: 14, color: "#8A99AD", lineHeight: 1.7 }}>{g.note.body}</p>
          </div>
          {go && (
            <S as="button" onClick={() => go("contact")} css="background:#00D4B2;color:#04140f;border:none;cursor:pointer;font-weight:700;font-size:14px;padding:12px 24px;border-radius:8px;transition:all 0.18s;white-space:nowrap;" hover="background:#2BE3C6;transform:translateY(-1px);">Talk to an advisor</S>
          )}
        </div>
      )}
    </div>
    </div>
  );
}

/* the "Talk to an Advisor" button used on solution pages */
function CatCta({ go }) {
  return (
    <CtaPrimary onClick={() => go("contact")} radius={999} upper tracking="0.12em" fontSize={12.5} fontFamily="'Plus Jakarta Sans', sans-serif" pad="16px 32px">Talk to an Advisor</CtaPrimary>
  );
}

function ProductGrid({ groups, go, catKey }) {
  const [sel, setSel] = React.useState(null);
  return (
    <>
      {groups.map((g, gi) => (
        g.sub ? (
          <div key={gi} id={catKey ? anchorId(catKey, g.title) : undefined} style={{ marginBottom: 40, scrollMarginTop: 90 }}><BizCover g={g} go={go} /></div>
        ) : (
        <div key={gi} style={{ marginBottom: 40 }}>
          {g.title && <h3 id={catKey ? anchorId(catKey, g.title) : undefined} style={{ scrollMarginTop: 90, fontSize: "clamp(21px,2.8vw,34px)", fontWeight: 800, color: INK, letterSpacing: "-0.6px", marginBottom: g.intro ? 12 : 24 }}>{g.title}</h3>}
          {g.intro && <p style={{ fontSize: 15, color: "#8A99AD", lineHeight: 1.75, maxWidth: 760, marginBottom: 28 }}>{g.intro}</p>}
          {g.items && (() => {
            // on solution pages: odd number of cards leaves an empty slot, so the CTA fills it;
            // an even number leaves no slot, so the CTA goes under the grid instead
            const showCta = !!(catKey && go) && gi === groups.length - 1;
            const odd = g.items.length % 2 === 1;
            return (
              <>
                <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
                  {g.items.map((it, i) => (
                    <ProductCard key={i} {...it} id={catKey ? anchorId(catKey, it.name) : undefined} selected={sel === gi + "-" + i} onSelect={() => setSel(sel === gi + "-" + i ? null : gi + "-" + i)} />
                  ))}
                  {showCta && odd && <div className="sp-cta-slot"><CatCta go={go} /></div>}
                </div>
                {showCta && !odd && <div style={{ display: "flex", justifyContent: "center", marginTop: 44 }}><CatCta go={go} /></div>}
              </>
            );
          })()}
          {g.note && <div style={{ marginTop: 24 }}><CompactCard {...g.note} gold /></div>}
        </div>
        )
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
          {g.title && !g.sub && (
            <div id={anchorId(cat.key, g.title)} style={{ scrollMarginTop: 90, margin: gi === 0 ? "0 0 24px" : "44px 0 24px" }}>
              <h3 style={{ fontSize: "clamp(22px,3vw,38px)", fontWeight: 800, color: INK, letterSpacing: "-0.6px", marginBottom: g.intro ? 12 : 0 }}>{g.title}</h3>
              {g.intro && <p style={{ fontSize: 15, color: "#8A99AD", lineHeight: 1.75, maxWidth: 760 }}>{g.intro}</p>}
            </div>
          )}
          {g.items && g.items.map((it, i) => {
            n++;
            const num = n;
            return (
              <div key={i} id={anchorId(cat.key, it.name)} className="sp-sol-wrap" style={{ scrollMarginTop: 110 }}>
                <Reveal><SolRow catKey={cat.key} it={it} num={num} go={go} /></Reveal>
              </div>
            );
          })}
          {g.sub && <div id={anchorId(cat.key, g.title)} style={{ marginTop: 40, scrollMarginTop: 90 }}><BizCover g={g} go={go} /></div>}
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
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.09)" }}>
            <button onClick={() => toggleFaq(key)} style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", textAlign: "left", gap: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: INK, lineHeight: 1.4 }}>{it.q}</span>
              <span style={{ fontSize: 20, fontWeight: 300, color: "#75839A", flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
            </button>
            <div style={{ overflow: "hidden", maxHeight: open ? 320 : 0, transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)" }}>
              <div style={{ fontSize: 14, color: "#8A99AD", lineHeight: 1.8, paddingBottom: 22 }}>{it.a}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================ CATEGORY PAGE ============================ */
/* one photo at the top with the solution's content on the left, then clickable cards */
function Category({ cat, go, faq, toggleFaq }) {
  const wrap = { maxWidth: 1720, margin: "0 auto" };
  return (
    <div className="page-wrap sp-newfont" style={{ paddingTop: NAV_H }}>
      <section style={{ background: "radial-gradient(ellipse 60% 40% at 30% 0%, rgba(0,212,178,0.09) 0%, transparent 70%), " + BG, padding: "60px 20px 56px" }}>
        <div style={wrap}>
          <div style={{ fontSize: "clamp(12px,1vw,14px)", color: "#75839A", marginBottom: 30, letterSpacing: "1px" }}>
            Home &rsaquo; <button onClick={() => go("solutions")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "clamp(12px,1vw,14px)", color: "#75839A", letterSpacing: "1px" }}>Solutions</button> &rsaquo; {cat.nav}
          </div>
          <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,5vw,80px)", alignItems: "center", marginBottom: "clamp(56px,6vw,96px)" }}>
            <div>
              <h1 style={{ fontSize: "clamp(28px,3.9vw,56px)", color: INK, lineHeight: 1.12, marginBottom: 22 }}>{cat.titleA} <span style={{ color: TEAL }}>{cat.titleEm}</span></h1>
              <p style={{ fontSize: "clamp(18px,1.75vw,26px)", color: INK, fontWeight: 500, lineHeight: 1.7, marginBottom: 18 }}>{cat.hero}</p>
              {cat.intro.map((t, i) => <p key={i} style={{ fontSize: "clamp(17px,1.55vw,22px)", color: "#8A99AD", lineHeight: 1.8, marginBottom: 14, fontWeight: 300 }}>{t}</p>)}
              <div style={{ marginTop: 28 }}>
                <CtaPrimary onClick={() => go("contact")} radius={999} upper tracking="0.12em" fontSize="clamp(13px,1.1vw,15px)" fontFamily="'Plus Jakarta Sans', sans-serif" pad="clamp(14px,1.3vw,18px) clamp(28px,2.6vw,38px)">Talk to an Advisor</CtaPrimary>
              </div>
            </div>
            <div className="sp-photo-cell">
              <Photo src={solImg(cat.key)} alt={cat.nav} ratio="7 / 5" fallback={<PhotoPlaceholder icon={CAT_ICON[cat.key]} />} />
            </div>
          </div>
          <ProductGrid groups={cat.groups} go={go} catKey={cat.key} />
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "88px 40px", background: BG }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,46px)", fontWeight: 800, color: INK, letterSpacing: "-0.8px", marginBottom: 10 }}>Still got questions?</h2>
          <p style={{ fontSize: 16, color: "#75839A" }}>We're here to help.</p>
        </div>
        <FaqList items={GENERIC_FAQ} kp={cat.key} faq={faq} toggleFaq={toggleFaq} />
      </section>

    </div>
  );
}

/* ============================ CALCULATORS ============================ */
const INVESTED_C = "rgba(109,90,230,0.18)", RETURNS_C = "#6D5AE6";

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
        <span style={{ fontSize: 15, color: "#B9C4D3", fontWeight: 500 }}>{label}</span>
        <span style={{ background: "rgba(0,212,178,0.12)", borderRadius: 8, padding: "6px 14px", display: "inline-flex", alignItems: "center", gap: 3 }}>
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
      <div style={{ display: "flex", gap: 18, fontSize: 12, color: "#8A99AD", flexWrap: "wrap", justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: aColor }}></span>{aLabel}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: 3, background: bColor }}></span>{bLabel}</span>
      </div>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ maxWidth: "100%" }}>
        <g transform={`rotate(-90 ${c} ${c})`}>
          <circle cx={c} cy={c} r={r} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={sw} />
          <circle cx={c} cy={c} r={r} fill="none" stroke={aColor} strokeWidth={sw} strokeDasharray={`${fAc * C} ${C}`} strokeLinecap="butt" />
          <circle cx={c} cy={c} r={r} fill="none" stroke={bColor} strokeWidth={sw} strokeDasharray={`${(1 - fAc) * C} ${C}`} strokeDashoffset={-fAc * C} strokeLinecap="butt" />
        </g>
        <text x={c} y={c - 2} textAnchor="middle" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 28, fontWeight: 800, fill: INK }}>{bPct}%</text>
        <text x={c} y={c + 17} textAnchor="middle" style={{ fontFamily: "'Poppins',sans-serif", fontSize: 10, fontWeight: 500, fill: "#75839A" }}>{bLabel}</text>
      </svg>
    </div>
  );
}

function ResultsList({ rows }) {
  return (
    <div style={{ maxWidth: 340 }}>
      {rows.map(([label, value, bold], i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 24, padding: "9px 0" }}>
          <span style={{ fontSize: 14, color: bold ? INK : "#75839A", fontWeight: bold ? 700 : 500 }}>{label}</span>
          <span style={{ fontSize: bold ? 20 : 16, color: INK, fontWeight: bold ? 800 : 600, fontVariantNumeric: "tabular-nums" }}>{value}</span>
        </div>
      ))}
    </div>
  );
}

function CalcToggle({ mode, setMode }) {
  const btn = (m, l) => (
    <button onClick={() => setMode(m)} style={{ border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, padding: "8px 22px", borderRadius: 100, background: mode === m ? "rgba(0,212,178,0.12)" : "transparent", color: mode === m ? TEAL : "#8A99AD", transition: "all 0.15s" }}>{l}</button>
  );
  return <div style={{ display: "inline-flex", background: "#0E1624", borderRadius: 100, padding: 4 }}>{btn("sip", "SIP")}{btn("lumpsum", "Lumpsum")}</div>;
}

function CalcCard({ toggle, title, subtitle, sliders, donut, results, ctaLabel, onCta }) {
  return (
    <div className="page-wrap" style={{ paddingTop: NAV_H }}>
      <section style={{ padding: "56px 32px 30px", textAlign: "center", background: BG }}>
        <p className="sp-kicker" style={{ color: TEAL, marginBottom: 14 }}>Tools</p>
        <h1 style={{ fontSize: "clamp(28px,4.6vw,56px)", fontWeight: 700, color: INK, letterSpacing: "-0.5px", marginBottom: 12 }}>{title}</h1>
        <p style={{ fontSize: 16, color: "#8A99AD", maxWidth: 480, margin: "0 auto" }}>{subtitle}</p>
      </section>
      <section style={{ padding: "0 24px 96px", background: SURF }}>
        <div style={{ maxWidth: 880, margin: "0 auto", background: SURF, borderRadius: 20, border: "1px solid rgba(255,255,255,0.09)", padding: "32px 36px", boxShadow: "0 10px 40px rgba(0,0,0,0.3)" }}>
          {toggle && <div style={{ marginBottom: 26 }}>{toggle}</div>}
          <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 44, alignItems: "center" }}>
            <div>{sliders}</div>
            <div>{donut}</div>
          </div>
          <div className="sp-calc-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.09)", marginTop: 26, paddingTop: 24, display: "grid", gridTemplateColumns: "1fr auto", gap: 24, alignItems: "center" }}>
            <div>{results}</div>
            <S as="button" onClick={onCta} css="background:#00D4B2;color:#04140f;border:none;cursor:pointer;font-weight:700;font-size:14px;letter-spacing:0.5px;text-transform:uppercase;padding:14px 30px;border-radius:10px;white-space:nowrap;transition:all 0.18s;" hover="background:#2BE3C6;transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,212,178,0.3);">{ctaLabel}</S>
          </div>
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: "#75839A", marginTop: 18 }}>Illustrative estimate only · Not financial advice</p>
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
  const [q, setQ] = React.useState("");
  const query = q.trim().toLowerCase();
  const groups = FORMS.map((grp) => ({
    ...grp,
    items: query ? grp.items.filter((f) => (f.t + " " + f.d).toLowerCase().includes(query)) : grp.items,
  })).filter((grp) => grp.items.length);
  const totalMatches = groups.reduce((n, g) => n + g.items.length, 0);
  return (
    <div className="page-wrap" style={{ paddingTop: NAV_H }}>
      <section style={{ background: NAVY, padding: "72px 40px 60px", textAlign: "center" }}>
        <p className="sp-kicker" style={{ color: TEAL, marginBottom: 14 }}>Resources</p>
        <h1 style={{ fontSize: "clamp(30px,5vw,64px)", fontWeight: 800, color: "#fff", letterSpacing: "-1.5px", marginBottom: 14 }}>Downloadable Forms</h1>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 480, margin: "0 auto 28px" }}>All the forms you need to get started, in one place.</p>
        {/* search */}
        <div style={{ maxWidth: 440, margin: "0 auto", position: "relative" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#75839A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search forms..."
            aria-label="Search forms"
            style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1.5px solid rgba(255,255,255,0.15)", borderRadius: 12, padding: "13px 44px 13px 44px", fontSize: 15, color: "#fff", outline: "none" }}
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear search" style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: 18, lineHeight: 1, padding: 4 }}>×</button>
          )}
        </div>
      </section>
      <section style={{ padding: "56px 40px 96px", background: "#0B121E" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {totalMatches === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "#75839A" }}>
              <p style={{ fontSize: 16, color: INK, fontWeight: 600, marginBottom: 6 }}>No forms found for "{q}"</p>
              <p style={{ fontSize: 14 }}>Try a different keyword, or <button onClick={() => go("contact")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, color: TEAL }}>ask an advisor →</button></p>
            </div>
          ) : groups.map((grp, gi) => (
            <div key={grp.group} style={{ marginBottom: gi < groups.length - 1 ? 40 : 0 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#75839A", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 14 }}>{grp.group}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {grp.items.map((f, i) => (
                  <S key={f.t} as="a" href={f.f} target="_blank" rel="noopener" download css="background:#0D1522;border:1px solid rgba(255,255,255,0.09);border-radius:14px;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;text-decoration:none;transition:all 0.18s;" hover="border:1px solid #00D4B2;box-shadow:0 12px 30px rgba(0,212,178,0.12);transform:translateY(-2px);">
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(0,212,178,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: INK }}>{f.t}</div>
                        <div style={{ fontSize: 13, color: "#75839A", marginTop: 2 }}>{f.d}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: TEAL, whiteSpace: "nowrap" }}>Download ↓</span>
                  </S>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: "#75839A", marginTop: 32 }}>Need help filling a form? <button onClick={() => go("contact")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: TEAL }}>Talk to an advisor</button></p>
      </section>
    </div>
  );
}

/* ============================ CONTACT ============================ */
function Contact({ form, setForm, formDone, submitForm, toggleInterest }) {
  const wrap = { maxWidth: 1720, margin: "0 auto" };
  const inputCss = { width: "100%", background: SURF, border: "1.5px solid rgba(255,255,255,0.10)", borderRadius: 9, padding: "11px 13px", fontSize: 14, color: INK };
  return (
    <div className="page-wrap sp-newfont" style={{ paddingTop: NAV_H }}>
      <section style={{ padding: "56px 20px 80px", ...wrap }}>
        <div className="sp-contact-grid">
        <div className="sp-contact-head">
          <p className="sp-kicker" style={{ color: TEAL, marginBottom: 16 }}>Contact us</p>
          <h1 style={{ fontSize: "clamp(30px,3.7vw,52px)", fontWeight: 800, color: INK, letterSpacing: "-1.2px", lineHeight: 1.1, marginBottom: 20 }}>Let's talk about what matters to <em style={{ fontStyle: "normal", color: TEAL }}>you.</em></h1>
          <p style={{ fontSize: 16, color: "#8A99AD", lineHeight: 1.75 }}>Whether you're looking to build wealth, protect what you've built, plan for the future, or arrange funding, we're here to understand your requirements and help you take the right next step.</p>
        </div>

          <div className="sp-contact-info" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#75839A", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Office</div>
                  <div style={{ fontSize: 15, color: INK, fontWeight: 500, lineHeight: 1.65 }}>102, Shreepati Jewels D Wing,<br />Khattar Ali Lane, Near CP Tank Circle,<br />Girgaon, Mumbai, 400004</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#75839A", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Email</div>
                  <a href="mailto:spectraassets@gmail.com" style={{ fontSize: 15, color: INK, fontWeight: 500 }}>spectraassets@gmail.com</a>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#75839A", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 12 }}>Follow</div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[["https://www.instagram.com/_spectraassets_", <><rect x="2" y="2" width="20" height="20" rx="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></>],
                      ["https://www.linkedin.com/company/spectra-assets-private-limited/", <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></>]].map(([href, icon], i) => (
                      <S key={i} as="a" href={href} target="_blank" rel="noopener" css="width:40px;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,0.10);display:flex;align-items:center;justify-content:center;color:#B9C4D3;transition:all 0.15s;" hover="border-color:#00D4B2;color:#00D4B2;">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{icon}</svg>
                      </S>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.09)", height: "100%", minHeight: 280 }}>
                <iframe title="Location" src="https://maps.google.com/maps?q=CP%20Tank%20Circle%20Girgaon%20Mumbai%20400004&z=15&output=embed" width="100%" height="100%" style={{ border: 0, display: "block", minHeight: 280 }} loading="lazy"></iframe>
              </div>
            </div>
          </div>

          <div className="sp-contact-form" style={{ background: "#0B121E", borderRadius: 18, padding: 36, border: "1px solid rgba(255,255,255,0.09)" }}>
            {formDone ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ width: 52, height: 52, background: TEAL, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 18px" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, color: INK, marginBottom: 8 }}>We'll be in touch.</div>
                <div style={{ fontSize: 14, color: "#8A99AD" }}>Thanks for reaching out, expect a call back shortly.</div>
              </div>
            ) : (
              <form onSubmit={submitForm} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#B9C4D3", marginBottom: 7 }}>Full Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" style={inputCss} />
                </div>
                <div className="sp-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#B9C4D3", marginBottom: 7 }}>Mobile Number *</label>
                    <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Enter your mobile number" style={inputCss} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#B9C4D3", marginBottom: 7 }}>Email Address *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Enter your email address" style={inputCss} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#B9C4D3", marginBottom: 10 }}>I'm interested in *</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {INTERESTS.map((it) => {
                      const on = form.interests.includes(it);
                      return (
                        <button type="button" key={it} onClick={() => toggleInterest(it)} style={{ cursor: "pointer", fontSize: 13, fontWeight: 500, padding: "8px 14px", borderRadius: 100, border: `1.5px solid ${on ? TEAL : "rgba(255,255,255,0.10)"}`, background: on ? "rgba(0,212,178,0.12)" : "#0D1522", color: on ? TEAL : "#B9C4D3", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ width: 14, height: 14, borderRadius: 4, border: `1.5px solid ${on ? TEAL : "#5B6880"}`, background: on ? TEAL : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                            {on && <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                          </span>
                          {it}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#B9C4D3", marginBottom: 7 }}>Tell us more</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Briefly describe what you'd like to discuss" rows={4} style={{ ...inputCss, resize: "vertical", minHeight: 96 }}></textarea>
                </div>
                <S as="button" type="submit" css="background:#00D4B2;color:#04140f;border:none;cursor:pointer;font-weight:700;font-size:15px;padding:15px;border-radius:10px;transition:opacity 0.15s;letter-spacing:-0.1px;" hover="opacity:0.88;">Request a Call Back</S>
                <p style={{ fontSize: 12, color: "#75839A", textAlign: "center", lineHeight: 1.5 }}>By submitting this form, you agree to be contacted regarding your enquiry. Your information will be handled in accordance with our Privacy Policy.</p>
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
    <footer style={{ background: NAVY, padding: "clamp(48px,5vw,72px) clamp(40px,5vw,100px) clamp(28px,2.8vw,40px)", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ maxWidth: 1720, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "clamp(40px,4.4vw,72px)", marginBottom: "clamp(40px,4.4vw,64px)", flexWrap: "wrap", alignItems: "start" }}>
          <div style={{ flex: "1.5 1 280px" }}>
            <div style={{ marginBottom: 18 }}>
              <Brand size={44} color="#fff" subColor="rgba(255,255,255,0.55)" />
            </div>
            <p style={{ fontSize: "clamp(14px,1.2vw,17px)", color: "rgba(255,255,255,0.68)", lineHeight: 1.8, maxWidth: 340 }}>Your investment partner for life. Wealth, protection, lending and planning, connected around you. Girgaon, Mumbai.</p>
          </div>
          <div style={{ flex: "1 1 160px" }}>
            <div style={{ fontSize: "clamp(11px,0.9vw,13px)", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 18 }}>Solutions</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CAT_ORDER.map((k) => (
                <S key={k} as="button" onClick={() => go("sol-" + k, k)} css={`background:none;border:none;cursor:pointer;font-size:clamp(14px,1.2vw,17px);color:rgba(255,255,255,0.78);text-align:left;padding:0;transition:color 0.15s;`} hover="color:#fff;">{CATS[k].nav}</S>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 140px" }}>
            <div style={{ fontSize: "clamp(11px,0.9vw,13px)", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 18 }}>Company</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["Home", "home"], ["Tools", "tool-invest"], ["Forms", "forms"], ["Contact", "contact"]].map(([l, p]) => (
                <S key={p} as="button" onClick={() => go(p)} css={`background:none;border:none;cursor:pointer;font-size:clamp(14px,1.2vw,17px);color:rgba(255,255,255,0.78);text-align:left;padding:0;transition:color 0.15s;`} hover="color:#fff;">{l}</S>
              ))}
            </div>
          </div>
          <div style={{ flex: "1.2 1 220px" }}>
            <div style={{ fontSize: "clamp(11px,0.9vw,13px)", fontWeight: 700, color: "rgba(255,255,255,0.55)", letterSpacing: "1.2px", textTransform: "uppercase", marginBottom: 18 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: "clamp(14px,1.2vw,17px)", color: "rgba(255,255,255,0.78)", lineHeight: 1.65 }}>102, Shreepati Jewels D Wing, Khattar Ali Lane, Girgaon, Mumbai 400004</span>
              <a href="mailto:spectraassets@gmail.com" style={{ fontSize: "clamp(14px,1.2vw,17px)", color: "rgba(255,255,255,0.78)" }}>spectraassets@gmail.com</a>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontSize: "clamp(12px,1vw,15px)", color: "rgba(255,255,255,0.55)" }}>© {new Date().getFullYear()} Spectra Assets · Mumbai</span>
          <div style={{ display: "flex", gap: 22 }}>
            {["Privacy", "Terms", "Disclaimer"].map((t) => <a key={t} href="#" onClick={(e) => e.preventDefault()} style={{ fontSize: "clamp(12px,1vw,15px)", color: "rgba(255,255,255,0.55)" }}>{t}</a>)}
          </div>
        </div>
      </div>
    </footer>
  );
}
