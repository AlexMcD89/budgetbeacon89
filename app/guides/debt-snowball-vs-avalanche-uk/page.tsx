import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TrendingDown, Flame, ShieldCheck } from "lucide-react";
import RelatedLinks from "@/components/related-links";
import GuideDisclaimer from "@/components/guide-disclaimer";

export const metadata: Metadata = {
  title: "Debt Snowball vs Avalanche UK Guide | BudgetBeacon",
  description:
    "Compare the debt snowball and avalanche methods in the UK. Learn how each strategy works, when each may suit you, and how to reduce debt faster.",
  alternates: {
    canonical: "/guides/debt-snowball-vs-avalanche-uk",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the difference between debt snowball and avalanche?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The snowball method focuses on paying off the smallest balances first, while the avalanche method focuses on paying off the highest-interest debts first.",
      },
    },
    {
      "@type": "Question",
      name: "Which debt repayment method saves more money?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The avalanche method often saves more money overall because it prioritises debts with the highest interest rates first.",
      },
    },
    {
      "@type": "Question",
      name: "Which debt strategy is better for motivation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The snowball method may feel more motivating for some people because it can create quicker early wins by clearing smaller balances first.",
      },
    },
    {
      "@type": "Question",
      name: "Can you combine debt snowball and avalanche?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Some people clear one or two small debts first for momentum, then switch to the avalanche method for larger or higher-interest debts.",
      },
    },
  ],
};

export default function DebtGuidePage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-16 md:px-6">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Debt guide UK
          </p>

          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
            Debt Snowball vs Avalanche (UK Guide)
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-8">
            If you are trying to pay off debt faster, two of the most common
            strategies are the debt snowball and debt avalanche methods. Both
            approaches can work, but they behave differently depending on your
            balances, interest rates, and how motivated you feel by early
            progress.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Best for
              </p>
              <p className="mt-2 font-medium text-slate-900">
                Motivation vs cost
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Main decision
              </p>
              <p className="mt-2 font-medium text-slate-900">
                Smallest balance or highest APR
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Related tools
              </p>
              <p className="mt-2 font-medium text-slate-900">
                Credit card, loan, budget
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12 md:px-6">
        <div className="mb-10 text-center text-slate-400 text-sm">
          [Ad space]
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Quick answer
          </h2>
          <p className="mt-4 text-slate-600 leading-7">
            The debt snowball method may suit people who need quick wins to stay
            motivated, because it focuses on clearing the smallest balances
            first. The debt avalanche method may suit people who want to reduce
            interest costs, because it focuses on clearing the highest-interest
            debts first.
          </p>
          <p className="mt-4 text-slate-600 leading-7">
            In simple terms: snowball often feels better sooner, while avalanche
            often costs less overall.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Part 1
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            How the snowball and avalanche methods work
          </h2>

          <h3 className="mt-8 text-2xl font-semibold">
            What is the debt snowball method?
          </h3>
          <p className="mt-4 text-slate-600 leading-7">
            The debt snowball method focuses on paying off your smallest debts
            first, regardless of interest rate. You continue making the minimum
            payment on every debt, then put any extra money toward the smallest
            balance until it is cleared.
          </p>

          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="font-medium text-slate-900">How it works:</p>
            <ul className="mt-3 text-slate-600 space-y-2 text-sm">
              <li>• List debts from smallest balance to largest balance</li>
              <li>• Keep making minimum payments on all debts</li>
              <li>• Put extra money toward the smallest balance</li>
              <li>• Roll that payment into the next debt once it is cleared</li>
            </ul>
          </div>

          <h4 className="mt-6 font-medium text-slate-900">
            Why people choose snowball
          </h4>
          <ul className="mt-3 text-slate-600 space-y-2 text-sm">
            <li>• It may create quick wins earlier</li>
            <li>• It can feel easier to stick to psychologically</li>
            <li>• It may build momentum when motivation is low</li>
          </ul>

          <h3 className="mt-10 text-2xl font-semibold">
            What is the debt avalanche method?
          </h3>
          <p className="mt-4 text-slate-600 leading-7">
            The avalanche method focuses on paying off debts with the highest
            interest rates first. As with snowball, you still keep making the
            minimum payment on all debts, but any extra money goes to the debt
            with the highest APR.
          </p>

          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="font-medium text-slate-900">How it works:</p>
            <ul className="mt-3 text-slate-600 space-y-2 text-sm">
              <li>• List debts by interest rate, highest first</li>
              <li>• Keep making minimum payments on every debt</li>
              <li>• Put extra money toward the highest-interest debt</li>
              <li>• Move to the next highest once that debt is cleared</li>
            </ul>
          </div>

          <h4 className="mt-6 font-medium text-slate-900">
            Why people choose avalanche
          </h4>
          <ul className="mt-3 text-slate-600 space-y-2 text-sm">
            <li>• It often reduces total interest paid</li>
            <li>• It may clear debt at a lower overall cost</li>
            <li>• It is often more efficient financially</li>
          </ul>
        </div>

        <div className="my-10 text-center text-slate-400 text-sm">
          [Ad space]
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Part 2
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            Snowball vs avalanche: which is better?
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            There is no single best debt repayment method for every person. The
            right choice depends on what is more important in your situation:
            reducing the total cost of debt, or creating enough visible progress
            to stay consistent.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Flame className="h-5 w-5" />
                <p className="font-medium text-slate-900">Snowball</p>
              </div>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Focus: smallest balance first</li>
                <li>• Best for: momentum and motivation</li>
                <li>• Result: quicker early wins</li>
                <li>• Trade-off: often more interest overall</li>
              </ul>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingDown className="h-5 w-5" />
                <p className="font-medium text-slate-900">Avalanche</p>
              </div>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• Focus: highest interest first</li>
                <li>• Best for: reducing total borrowing cost</li>
                <li>• Result: lower overall interest</li>
                <li>• Trade-off: slower visible progress at first</li>
              </ul>
            </div>
          </div>

          <h3 className="mt-10 text-2xl font-semibold">
            When snowball may suit you better
          </h3>
          <p className="mt-4 text-slate-600 leading-7">
            Snowball may suit you better if staying motivated is the hardest
            part. Clearing a small debt quickly can create a sense of progress,
            which may make it easier to continue over several months.
          </p>
          <ul className="mt-4 text-slate-600 space-y-2 text-sm">
            <li>• You want to see balances disappear quickly</li>
            <li>• You have struggled to stick to debt plans before</li>
            <li>• You respond well to visible progress</li>
          </ul>

          <h3 className="mt-10 text-2xl font-semibold">
            When avalanche may suit you better
          </h3>
          <p className="mt-4 text-slate-600 leading-7">
            Avalanche may suit you better if reducing the cost of debt is your
            top priority. Because high-interest debts are attacked first, this
            method often cuts the total amount of interest paid.
          </p>
          <ul className="mt-4 text-slate-600 space-y-2 text-sm">
            <li>• You want to minimise total interest</li>
            <li>• You can stay disciplined without quick wins</li>
            <li>• You are focused on long-term efficiency</li>
          </ul>

          <div className="mt-8 rounded-2xl bg-slate-50 border border-slate-200 p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-slate-900" />
              <p className="font-medium text-slate-900">A practical view</p>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Some people use a hybrid approach: clearing one or two small debts
              first for motivation, then switching to the avalanche method for
              larger balances with higher interest rates.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
            Part 3
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">
            How to apply this in the UK
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            In the UK, people often have a mix of credit card balances,
            overdrafts, personal loans, car finance, and buy now pay later
            balances. That means choosing a method is not only about theory. It
            is about how those debts actually affect your monthly cash flow.
          </p>

          <h3 className="mt-8 text-2xl font-semibold">
            Start with your full debt picture
          </h3>
          <p className="mt-4 text-slate-600 leading-7">
            Before using either method, list every balance, interest rate,
            minimum payment, and monthly due date. That gives you a proper view
            of where interest is building and which debts are creating the most
            strain.
          </p>

          <h3 className="mt-8 text-2xl font-semibold">
            Watch monthly affordability as well as total cost
          </h3>
          <p className="mt-4 text-slate-600 leading-7">
            A debt strategy only works if you can actually stick to it. That is
            why it can help to compare your repayment plan against your wider
            monthly budget, rather than looking at balances in isolation.
          </p>

          <h3 className="mt-8 text-2xl font-semibold">
            Do not ignore high-interest balances
          </h3>
          <p className="mt-4 text-slate-600 leading-7">
            If one of your debts has a very high APR, the avalanche method may
            have a stronger financial case. Even if snowball feels better in the
            short term, very high-interest balances can become expensive
            quickly.
          </p>

          <div className="mt-8 p-6 rounded-3xl bg-slate-900 text-white">
            <h3 className="text-2xl font-semibold">
              Want to compare your debt costs?
            </h3>

            <p className="mt-3 text-slate-300">
              Use the tools below to estimate repayments, interest, and how debt
              fits into your monthly plan.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/tools/credit-card-interest-calculator"
                className="bg-white text-slate-900 px-5 py-3 rounded-2xl text-sm font-medium flex items-center"
              >
                Credit card calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/tools/loan-repayment-calculator"
                className="border border-white/30 px-5 py-3 rounded-2xl text-sm font-medium"
              >
                Loan calculator
              </Link>
            </div>
          </div>
        </div>

        <div className="my-10 text-center text-slate-400 text-sm">
          [Ad space]
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="font-medium text-slate-900">
                What is the difference between debt snowball and avalanche?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Snowball focuses on the smallest balances first, while avalanche
                focuses on the highest-interest debts first.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="font-medium text-slate-900">
                Which debt repayment method saves more money?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Avalanche often saves more money overall because it prioritises
                the debts with the highest interest rates first.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="font-medium text-slate-900">
                Which debt strategy is better for motivation?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Snowball may feel more motivating for some people because it can
                create quicker early wins by clearing smaller balances first.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
              <p className="font-medium text-slate-900">
                Can you combine debt snowball and avalanche?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Yes. Some people clear one or two small debts first for
                momentum, then switch to avalanche for larger or higher-interest
                balances.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="Related debt tools"
        links={[
          {
            title: "Credit Card Interest Calculator",
            description:
              "Estimate how expensive your card balance could become over time.",
            href: "/tools/credit-card-interest-calculator",
          },
          {
            title: "Loan Repayment Calculator",
            description:
              "Compare fixed loan repayments and total interest costs.",
            href: "/tools/loan-repayment-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "See how debt repayments affect the rest of your monthly plan.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Use your actual income when planning your debt strategy.",
            href: "/tools/take-home-pay-calculator-uk",
          },
        ]}
      />

      <GuideDisclaimer />
    </main>
  );
}
