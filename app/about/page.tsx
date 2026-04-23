import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  ShieldCheck,
  Wallet,
} from "lucide-react";

export default function AboutPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            About BudgetBeacon
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Practical UK money tools built to help people make clearer decisions
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            BudgetBeacon is a UK-focused website built around money calculators,
            planning tools, and plain-English guides. The aim is simple: make
            everyday financial decisions easier to understand and less stressful
            to navigate.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <Calculator className="h-5 w-5 text-slate-900" />
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight">
              Useful tools
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              BudgetBeacon focuses on calculators and tools people can actually
              use, not just pages built to exist.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <Wallet className="h-5 w-5 text-slate-900" />
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight">
              UK-focused
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The site is built for UK users, with pages centered around common
              UK financial decisions like rent, take-home pay, debt, and
              savings.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <ShieldCheck className="h-5 w-5 text-slate-900" />
            </div>
            <h2 className="mt-5 text-xl font-semibold tracking-tight">
              Clear guidance
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              The goal is not just to provide numbers, but to help users
              understand what those numbers mean in real life.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">
                Why BudgetBeacon exists
              </h2>
              <div className="mt-6 space-y-5 text-slate-600">
                <p className="leading-7">
                  A lot of financial websites are hard to trust, hard to use, or
                  full of generic pages that do not actually help the person
                  visiting them.
                </p>
                <p className="leading-7">
                  BudgetBeacon is being built differently. The focus is on clean
                  design, practical tools, straightforward explanations, and a
                  better overall experience than the average calculator site.
                </p>
                <p className="leading-7">
                  That means pages should feel useful, fast, and easy to
                  understand whether someone is checking rent affordability,
                  estimating take-home pay, planning debt repayment, or working
                  toward a savings goal.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Core principle
              </p>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                Better decisions, not just more numbers
              </h3>
              <p className="mt-4 text-base leading-7 text-slate-200">
                Every page on BudgetBeacon should move beyond a simple output
                and help users understand the trade-offs behind a decision.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-medium">Clean design</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-medium">Plain-English guidance</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm font-medium">
                    Useful internal journeys
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              What you will find on the site
            </h2>

            <div className="mt-6 space-y-4 text-slate-600">
              <p className="leading-7">
                BudgetBeacon is being built around a growing collection of:
              </p>
              <ul className="space-y-3 pl-5">
                <li className="list-disc leading-7">
                  UK money calculators and planning tools
                </li>
                <li className="list-disc leading-7">
                  practical guides that support those tools
                </li>
                <li className="list-disc leading-7">
                  pages that help users compare scenarios and next steps
                </li>
                <li className="list-disc leading-7">
                  cleaner, more readable layouts than typical finance sites
                </li>
              </ul>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
              <BookOpen className="h-5 w-5 text-slate-900" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-tight">
              A growing resource
            </h2>
            <p className="mt-4 text-slate-600 leading-7">
              The site is still growing, and more tools and guides will be added
              over time. The aim is to build a trustworthy, useful UK money
              resource that people return to when they need clarity.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white md:px-10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Explore the site
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Start with the tools
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              The best way to use BudgetBeacon is to start with a practical tool
              and then move into the related guides and next-step pages.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools"
                className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
              >
                Browse all tools
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/guides"
                className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                View guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
