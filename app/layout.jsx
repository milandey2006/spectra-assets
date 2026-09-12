import "../public/globals.css";

export const metadata = {
  title: "Spectra Assets | Your Investment Partner for Life",
  description:
    "Financial advice that looks at the bigger picture. Wealth creation, financial planning, insurance, loans and securities — one advisory relationship. Girgaon, Mumbai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
