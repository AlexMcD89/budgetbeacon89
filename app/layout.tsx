import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { Calculator, Menu, PoundSterling } from "lucide-react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "BudgetBeacon | UK Money Tools & Calculators",
  description:
    "UK-focused money tools, calculators, and guides for rent, pay, debt, savings, and better financial decisions.",
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <PoundSterling className="h-5 w-5" />
          </div>

          <div>
            <p className="text-lg font-semibold tracking-tight text-slate-900">
              BudgetBeacon
            </p>
            <p className="text-xs text-slate-500">
              UK money tools that help you decide
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/tools"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            Tools
          </Link>
          <Link
            href="/guides"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            Guides
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-700 transition hover:text-slate-900"
          >
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tools/rent-affordability-calculator-uk"
            className="hidden rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800 md:inline-flex"
          >
            Try a tool
          </Link>

          <button className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 md:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                <PoundSterling className="h-5 w-5" />
              </div>

              <div>
                <p className="text-lg font-semibold tracking-tight text-slate-900">
                  BudgetBeacon
                </p>
                <p className="text-xs text-slate-500">
                  Better money decisions start here
                </p>
              </div>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600">
              UK-focused money tools, calculators, and guides designed to help
              people make clearer everyday financial decisions.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Explore
            </h3>
            <div className="mt-4 space-y-3">
              <Link
                href="/tools"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                All tools
              </Link>
              <Link
                href="/tools/income"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                Income tools
              </Link>
              <Link
                href="/tools/housing"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                Housing tools
              </Link>
              <Link
                href="/tools/debt"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                Debt tools
              </Link>
              <Link
                href="/tools/savings"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                Savings tools
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Company
            </h3>
            <div className="mt-4 space-y-3">
              <Link
                href="/about"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                Contact
              </Link>
              <Link
                href="/guides"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                Guides
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
              Legal
            </h3>
            <div className="mt-4 space-y-3">
              <Link
                href="/privacy-policy"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-slate-700 transition hover:text-slate-900"
              >
                Terms
              </Link>
            </div>

            <div className="mt-6 rounded-3xl bg-slate-100 p-4">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-slate-700" />
                <p className="text-sm font-medium text-slate-900">
                  Built for practical decisions
                </p>
              </div>
              <p className="mt-2 text-xs leading-5 text-slate-600">
                Clear tools. Better guidance. UK-focused money decisions made
                simpler.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-900">
            Important information
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            BudgetBeacon provides general information, calculators, and
            educational guidance only. Nothing on this site is personal
            financial advice, a recommendation, or a regulated financial
            service.
          </p>
        </div>
        <div className="mt-10 border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} BudgetBeacon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-GB">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WDC8XDXNYS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WDC8XDXNYS');
          `}
        </Script>

        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
