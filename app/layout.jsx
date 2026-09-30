import "../public/globals.css";

export const metadata = {
  title: "Spectra Assets | Your Investment Partner for Life",
  description:
    "Financial advice that looks at the bigger picture. Wealth creation, financial planning, insurance, loans and securities — one advisory relationship. Girgaon, Mumbai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Scale the desktop layout toward a 1920px-wide reference, so the page keeps the same
            composition on every desktop screen. The same 1100px-wide column and the same section
            heights appear whether the viewport is 1920px or only ~1280px (for example a 1920px
            monitor with Windows display scaling at 150%). It runs before first paint (no jump),
            keeps the scale between 0.75 and 1, and leaves tablets and phones on their own
            responsive layouts. To change the smallest scale, edit the 0.75 below. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){function f(){var w=window.innerWidth;var z=w<861?1:Math.min(1,Math.max(0.75,w/1920));document.documentElement.style.zoom=z===1?'':String(z);}f();window.addEventListener('resize',f);})();",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
