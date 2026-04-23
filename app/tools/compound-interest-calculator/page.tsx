"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  PiggyBank,
  PoundSterling,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import RelatedLinks from "@/components/related-links";
import ToolDisclaimer from "@/components/tool-disclaimer";

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function calculateCompoundInterest(
  initialAmount: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
) {
  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = years * 12;

  let balance = initialAmount;
  let totalContributions = initialAmount;
  let totalInterest = 0;

  for (let i = 0; i < totalMonths; i++) {
    const interestThisMonth = balance * monthlyRate;
    totalInterest += interestThisMonth;
    balance += interestThisMonth;
    balance += monthlyContribution;
    totalContributions += monthlyContribution;
  }

  return {
    finalBalance: balance,
    totalContributions,
    totalInterest,
  };
}

export default function CompoundInterestCalculatorPage() {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(200);
  const [annualRate, setAnnualRate] = useState(5);
  const [years, setYears] = useState(10);

  const result = useMemo(() => {
    const calculation = calculateCompoundInterest(
      initialAmount,
      monthlyContribution,
      annualRate,
      years,
    );

    const interestShare =
      calculation.finalBalance > 0
        ? (calculation.totalInterest / calculation.finalBalance) * 100
        : 0;

    let status = "Steady growth";
    let summary =
      "Based on the figures entered, this setup shows steady long-term growth driven by regular contributions and compounding.";

    if (
      years >= 15 ||
      calculation.totalInterest > calculation.totalContributions * 0.5
    ) {
      status = "Stronger long-term growth";
      summary =
        "This setup allows more time for compounding to build, which may lead to stronger long-term growth.";
    }

    if (years < 5 && monthlyContribution < 100) {
      status = "Slower early growth";
      summary =
        "This setup may still grow, but the impact of compounding is likely to be more limited unless time or contributions increase.";
    }

    const higherContribution = calculateCompoundInterest(
      initialAmount,
      monthlyContribution + 50,
      annualRate,
      years,
    );

    const higherRate = calculateCompoundInterest(
      initialAmount,
      monthlyContribution,
      annualRate + 1,
      years,
    );

    return {
      ...calculation,
      interestShare,
      status,
      summary,
      higherContributionBalance: higherContribution.finalBalance,
      higherRateBalance: higherRate.finalBalance,
    };
  }, [initialAmount, monthlyContribution, annualRate, years]);

  const score = Math.max(
    10,
    Math.min(
      96,
      Math.round(
        35 +
          Math.min(years * 3, 30) +
          Math.min(monthlyContribution / 15, 18) +
          Math.min(result.interestShare * 0.6, 13),
      ),
    ),
  );

  const applyScenario = (type: "starter" | "medium" | "aggressive") => {
    if (type === "starter") {
      setInitialAmount(2000);
      setMonthlyContribution(100);
      setAnnualRate(4.5);
      setYears(10);
    }

    if (type === "medium") {
      setInitialAmount(5000);
      setMonthlyContribution(200);
      setAnnualRate(5);
      setYears(15);
    }

    if (type === "aggressive") {
      setInitialAmount(10000);
      setMonthlyContribution(400);
      setAnnualRate(6);
      setYears(20);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Savings tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Compound Interest Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use this compound interest calculator to estimate how savings or
              investments could grow over time with regular monthly
              contributions and compounding. It helps illustrate how time,
              consistency, and rate of return may affect long-term growth.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("starter")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Starter plan
              </button>
              <button
                onClick={() => applyScenario("medium")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Medium plan
              </button>
              <button
                onClick={() => applyScenario("aggressive")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Longer-term plan
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Initial amount
                </label>
                <input
                  type="number"
                  value={initialAmount}
                  onChange={(e) => setInitialAmount(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Monthly contribution
                </label>
                <input
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) =>
                    setMonthlyContribution(Number(e.target.value))
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Annual growth rate %
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Years
                </label>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                What this calculator helps with
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use this page to compare long-term savings paths, understand how
                compounding works, and see how much difference a higher monthly
                contribution or a longer timeframe may make.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PoundSterling className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Estimated final value
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.finalBalance)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The projected end balance based on the figures entered.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Growth from interest
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.totalInterest)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The amount generated by growth rather than direct
                  contributions.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Summary
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{result.status}</p>
                  <p className="text-sm text-slate-300">
                    Growth score: {score}/100
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Total contributions
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.totalContributions)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Interest share
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {result.interestShare.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                What changes may make the biggest difference?
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Current setup</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.finalBalance)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    If you added £50/month
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.higherContributionBalance)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Small monthly changes may add up more than many people
                    expect.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    If return increased by 1%
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.higherRateBalance)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Over longer periods, even modest rate differences may make a
                    noticeable difference.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <PiggyBank className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                Why compound interest matters
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Compound growth means returns may start generating returns of
                their own. The longer the timeframe, the more visible that
                effect often becomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              How to use this estimate
            </h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p className="leading-7">
                This page can be used to explore long-term savings scenarios and
                understand how regular contributions may build over time.
              </p>
              <p className="leading-7">
                The main drivers are usually time, consistency, and the rate of
                return. Even relatively small monthly contributions may look
                more significant over longer periods.
              </p>
              <p className="leading-7">
                Rather than focusing on a single outcome, it can be useful to
                compare how changing one part of the setup affects the overall
                result.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Compound interest calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    What is compound interest?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  It is growth earned not only on your original amount, but also
                  on the returns that build up over time.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    What matters more: time or rate?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Both play a role, but longer timeframes are often
                  underestimated and may significantly affect the final outcome.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Do small monthly contributions matter?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Over longer periods, even small regular contributions may
                  build into a much larger total due to compounding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Next step
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Keep building your savings plan
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                A natural next step may be comparing this with an ISA-focused
                savings tool or checking how much your budget may support each
                month.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/monthly-budget-planner"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Budget planner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/tools"
                className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Back to all tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="Related savings pages"
        links={[
          {
            title: "ISA Savings Calculator",
            description:
              "Compare a general compounding plan with an ISA-focused plan.",
            href: "/tools/isa-savings-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "See how much your budget can realistically support each month.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Healthy Savings Rate UK",
            description:
              "Understand whether your current saving level is healthy.",
            href: "/guides/healthy-savings-rate-uk",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Work from your real income before deciding monthly contributions.",
            href: "/tools/take-home-pay-calculator-uk",
          },
        ]}
      />

      <ToolDisclaimer />
    </main>
  );
}
