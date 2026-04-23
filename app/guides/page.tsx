import Link from "next/link";
import { ArrowRight, BookOpen, Home, PiggyBank, Wallet } from "lucide-react";

const featuredGuide = {
  title: "How Much Rent Can I Afford in the UK?",
  description:
    "A practical guide to finding a rent level that feels realistic, not just technically possible.",
  href: "/guides/how-much-rent-can-i-afford-uk",
  category: "Housing guide",
  readTime: "7 min read",
};

const guides = [
  {
    title: "How Much Rent Can I Afford in the UK?",
    description:
      "A practical UK-focused guide to safer rent ranges, real-life affordability, and monthly breathing room.",
    href: "/guides/how-much-rent-can-i-afford-uk",
    category: "Housing",
    readTime: "7 min read",
    icon: Home,
  },
  {
    title: "What Is a Healthy Savings Rate?",
    description:
      "A simple guide to balancing saving goals with realistic day-to-day living costs.",
    href: "/guides/healthy-savings-rate-uk",
    category: "Savings",
    readTime: "6 min read",
    icon: PiggyBank,
  },
  {
    title: "Debt Snowball vs Avalanche",
    description:
      "Compare the two main debt payoff strategies and work out which one suits you better.",
    href: "/guides/debt-snowball-vs-avalanche-uk",
    category: "Debt",
    readTime: "6 min read",
    icon: Wallet,
  },
];

export default function GuidesPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Guides hub
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Practical UK money guides
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Explore plain-English guides that support the BudgetBeacon tools.
              These pages are designed to answer common questions clearly and
              lead naturally into the calculators.
            </p>
          </div>

          <div className="mt-10 rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Featured guide
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {featuredGuide.title}
            </h2>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
              <span className="rounded-full bg-white/10 px-3 py-1.5">
                {featuredGuide.category}
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5">
                {featuredGuide.readTime}
              </span>
            </div>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-200">
              {featuredGuide.description}
            </p>

            <Link
              href={featuredGuide.href}
              className="mt-6 inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
            >
              Read guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {guides.map((guide) => {
            const Icon = guide.icon;

            return (
              <Link
                key={guide.title}
                href={guide.href}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-5 w-5 text-slate-900" />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {guide.category}
                  </span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    {guide.readTime}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">
                  {guide.title}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {guide.description}
                </p>

                <div className="mt-6 inline-flex items-center text-sm font-medium text-slate-900">
                  Read guide
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                <BookOpen className="h-5 w-5 text-slate-900" />
              </div>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight">
                Guides should lead into tools
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                The goal of each guide is not just traffic. It should help users
                understand the topic and then move them naturally into the most
                relevant calculator.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/rent-affordability-calculator-uk"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Try a calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/tools"
                className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Browse all tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
