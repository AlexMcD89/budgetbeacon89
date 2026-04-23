import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, PiggyBank, TrendingUp, ShieldCheck } from "lucide-react";
import RelatedLinks from "@/components/related-links";
import GuideDisclaimer from "@/components/guide-disclaimer";

export const metadata: Metadata = {
  title: "Healthy Savings Rate UK Guide (2026) | How Much Should You Save?",
  description:
    "Find out what a healthy savings rate looks like in the UK. Learn realistic benchmarks, how to improve your savings rate, and how it affects long-term wealth.",
  alternates: {
    canonical: "/guides/healthy-savings-rate-uk",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a good savings rate in the UK?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Many people aim for around 10% of their income as a starting point, while 15% to 20% is often considered a strong savings rate.",
      },
    },
    {
      "@type": "Question",
      name: "Is saving 5% of income enough?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Saving 5% can be a good starting point, especially if money is tight, but it may not be enough for long-term goals without increasing over time.",
      },
    },
    {
      "@type": "Question",
      name: "What savings rate should I aim for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A realistic target is usually between 10% and 20% depending on your income, expenses, and financial goals.",
      },
    },
    {
      "@type": "Question",
      name: "Does savings rate matter more than income?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Savings rate can be more important than income because it determines how much you keep and grow over time.",
      },
    },
  ],
};

export default function HealthySavingsRatePage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16 md:px-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Savings guide UK
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            What Is a Healthy Savings Rate in the UK?
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            A “good” savings rate depends on your income, lifestyle, and stage
            of life — but there are simple benchmarks that can help you judge
            where you are now and what you might aim for.
          </p>

          {/* QUICK FACT CARDS */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
                Baseline
              </p>
              <p className="mt-2 font-medium">~10%</p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
                Strong
              </p>
              <p className="mt-2 font-medium">15%–20%</p>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-4">
              <p className="text-xs text-slate-500 uppercase tracking-[0.2em]">
                Aggressive
              </p>
              <p className="mt-2 font-medium">20%+</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:px-6">
        {/* AD */}
        <div className="mb-10 text-center text-slate-400 text-sm">
          [Ad space]
        </div>

        {/* PART 1 */}
        <div className="rounded-[2rem] border bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Part 1
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            What is a savings rate?
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            Your savings rate is the percentage of your income that you keep
            instead of spending. It is one of the most important numbers in
            personal finance because it directly affects how quickly your money
            can grow.
          </p>

          <div className="mt-6 bg-slate-50 border rounded-2xl p-5">
            <p className="text-sm text-slate-500">Example</p>
            <p className="mt-2 font-medium">
              £2,500 income + £250 saved → 10% savings rate
            </p>
          </div>

          <p className="mt-6 text-slate-600 leading-7">
            Unlike income alone, your savings rate shows how efficiently you are
            managing your money. Two people earning the same amount can end up
            in very different positions depending on how much they save.
          </p>
        </div>

        {/* PART 2 */}
        <div className="mt-10 rounded-[2rem] border bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Part 2
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            What is considered a healthy savings rate?
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            There is no single perfect number, but most guidance falls into a
            few common ranges:
          </p>

          <div className="mt-6 space-y-4">
            <div className="p-5 rounded-2xl border">
              <p className="font-medium">5% or less</p>
              <p className="text-sm text-slate-600 mt-1">
                A starting point, but may not support long-term goals.
              </p>
            </div>

            <div className="p-5 rounded-2xl border">
              <p className="font-medium">Around 10%</p>
              <p className="text-sm text-slate-600 mt-1">
                A widely used baseline that balances saving and spending.
              </p>
            </div>

            <div className="p-5 rounded-2xl border">
              <p className="font-medium">15%–20%</p>
              <p className="text-sm text-slate-600 mt-1">
                Strong savings level for long-term goals.
              </p>
            </div>

            <div className="p-5 rounded-2xl border">
              <p className="font-medium">20%+</p>
              <p className="text-sm text-slate-600 mt-1">
                High savings rate often used for rapid wealth building.
              </p>
            </div>
          </div>

          <h3 className="mt-10 text-2xl font-semibold">
            What affects your savings rate?
          </h3>

          <ul className="mt-4 space-y-3 text-slate-600">
            <li>• Housing costs (rent or mortgage)</li>
            <li>• Debt repayments</li>
            <li>• Income level</li>
            <li>• Cost of living in your area</li>
            <li>• Life stage and responsibilities</li>
          </ul>
        </div>

        {/* AD */}
        <div className="my-10 text-center text-slate-400 text-sm">
          [Ad space]
        </div>

        {/* PART 3 */}
        <div className="rounded-[2rem] border bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Part 3
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            Why your savings rate matters (and how to improve it)
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            Your savings rate has a major impact on your long-term financial
            position. Even small increases can lead to significantly larger
            savings over time, especially when combined with compounding.
          </p>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            <div className="bg-white border rounded-2xl p-5">
              <PiggyBank className="h-6 w-6 mb-3" />
              <p className="font-medium">Emergency buffer</p>
            </div>

            <div className="bg-white border rounded-2xl p-5">
              <TrendingUp className="h-6 w-6 mb-3" />
              <p className="font-medium">Long-term growth</p>
            </div>

            <div className="bg-white border rounded-2xl p-5">
              <ShieldCheck className="h-6 w-6 mb-3" />
              <p className="font-medium">Financial stability</p>
            </div>
          </div>

          <h3 className="mt-10 text-2xl font-semibold">
            How to improve your savings rate
          </h3>

          <ul className="mt-4 space-y-3 text-slate-600">
            <li>• Increase savings gradually</li>
            <li>• Reduce fixed costs where possible</li>
            <li>• Pay down high-interest debt</li>
            <li>• Automate your savings</li>
          </ul>

          {/* CTA */}
          <div className="mt-10 p-6 rounded-3xl bg-slate-900 text-white">
            <h3 className="text-2xl font-semibold">
              Want to check your savings rate?
            </h3>

            <div className="mt-5 flex gap-3 flex-wrap">
              <Link
                href="/tools/monthly-budget-planner"
                className="bg-white text-slate-900 px-5 py-3 rounded-2xl text-sm font-medium flex items-center"
              >
                Budget planner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/tools/compound-interest-calculator"
                className="border border-white/30 px-5 py-3 rounded-2xl text-sm"
              >
                Compound calculator
              </Link>
            </div>
          </div>
        </div>

        {/* FAQ UI */}
        <div className="mt-10 rounded-[2rem] border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">FAQs</h2>

          <div className="mt-6 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50">
              <p className="font-medium">
                What is a good savings rate in the UK?
              </p>
              <p className="text-sm text-slate-600 mt-2">
                Around 10% is common, while 15%–20% is considered strong.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50">
              <p className="font-medium">Is 5% enough?</p>
              <p className="text-sm text-slate-600 mt-2">
                It can be a starting point, but increasing over time is ideal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="Related savings tools"
        links={[
          {
            title: "Monthly Budget Planner",
            description: "Work out your real monthly savings rate.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Compound Interest Calculator",
            description: "See how your savings grow over time.",
            href: "/tools/compound-interest-calculator",
          },
          {
            title: "ISA Savings Calculator",
            description: "Plan tax-efficient UK savings.",
            href: "/tools/isa-savings-calculator",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description: "Use real income for accurate planning.",
            href: "/tools/take-home-pay-calculator-uk",
          },
        ]}
      />

      <GuideDisclaimer />
    </main>
  );
}
