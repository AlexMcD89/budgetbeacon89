"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  PiggyBank,
  PoundSterling,
  ShieldCheck,
  Wallet,
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

function calculateSavings(
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

export default function ISASavingsCalculatorPage() {
  const [initialAmount, setInitialAmount] = useState(5000);
  const [monthlyContribution, setMonthlyContribution] = useState(300);
  const [annualRate, setAnnualRate] = useState(4.5);
  const [years, setYears] = useState(10);
  const [annualISAContribution, setAnnualISAContribution] = useState(3600);

  const result = useMemo(() => {
    const annualContributionFromMonthly = monthlyContribution * 12;
    const totalAnnualContribution =
      annualContributionFromMonthly + annualISAContribution;

    const calculation = calculateSavings(
      initialAmount,
      monthlyContribution + annualISAContribution / 12,
      annualRate,
      years,
    );

    const currentISALimit = 20000;
    const remainingAllowance = Math.max(
      0,
      currentISALimit - totalAnnualContribution,
    );
    const overAllowance = Math.max(
      0,
      totalAnnualContribution - currentISALimit,
    );

    let status = "Within ISA allowance";
    let summary =
      "Based on the figures entered, your annual ISA contribution plan appears to sit within the standard annual ISA allowance.";

    if (overAllowance > 0) {
      status = "Above allowance";
      summary =
        "Your planned annual ISA contributions appear to exceed the standard annual ISA allowance, so contributions may need to be adjusted or split differently.";
    } else if (remainingAllowance < 3000) {
      status = "Close to allowance limit";
      summary =
        "Your current plan is still within the ISA allowance, but it is getting closer to the annual limit.";
    }

    const nextContributionScenario = calculateSavings(
      initialAmount,
      monthlyContribution + 50 + annualISAContribution / 12,
      annualRate,
      years,
    );

    const nextRateScenario = calculateSavings(
      initialAmount,
      monthlyContribution + annualISAContribution / 12,
      annualRate + 1,
      years,
    );

    return {
      ...calculation,
      totalAnnualContribution,
      remainingAllowance,
      overAllowance,
      status,
      summary,
      nextContributionScenario,
      nextRateScenario,
      currentISALimit,
    };
  }, [
    initialAmount,
    monthlyContribution,
    annualRate,
    years,
    annualISAContribution,
  ]);

  const score = Math.max(
    10,
    Math.min(
      96,
      Math.round(
        45 +
          Math.min(years * 2.5, 25) +
          Math.min(
            (monthlyContribution + annualISAContribution / 12) / 20,
            20,
          ) -
          (result.overAllowance > 0 ? 25 : 0),
      ),
    ),
  );

  const applyScenario = (type: "starter" | "steady" | "maximiser") => {
    if (type === "starter") {
      setInitialAmount(2000);
      setMonthlyContribution(150);
      setAnnualRate(4.2);
      setYears(10);
      setAnnualISAContribution(1200);
    }

    if (type === "steady") {
      setInitialAmount(5000);
      setMonthlyContribution(300);
      setAnnualRate(4.5);
      setYears(15);
      setAnnualISAContribution(3600);
    }

    if (type === "maximiser") {
      setInitialAmount(15000);
      setMonthlyContribution(900);
      setAnnualRate(5);
      setYears(20);
      setAnnualISAContribution(8000);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              UK savings tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              ISA Savings Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use this ISA savings calculator to estimate how your savings could
              grow over time, compare your planned contributions with the annual
              ISA allowance, and see how small changes may affect the long-term
              result.
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
                Starter ISA
              </button>
              <button
                onClick={() => applyScenario("steady")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Steady saver
              </button>
              <button
                onClick={() => applyScenario("maximiser")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Bigger ISA plan
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
                  Extra annual ISA contribution
                </label>
                <input
                  type="number"
                  value={annualISAContribution}
                  onChange={(e) =>
                    setAnnualISAContribution(Number(e.target.value))
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

              <div className="sm:col-span-2">
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
                About this tool
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This calculator is designed for general ISA savings planning. It
                uses the standard annual ISA allowance of £20,000 as a reference
                point and gives a simplified long-term growth estimate.
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
                  Projected ISA value
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.finalBalance)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated end value based on the figures entered.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PiggyBank className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Growth from interest
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.totalInterest)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  The estimated value added by growth rather than deposits.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                ISA summary
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{result.status}</p>
                  <p className="text-sm text-slate-300">
                    Savings score: {score}/100
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Annual contribution plan
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.totalAnnualContribution)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Remaining ISA allowance
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.remainingAllowance)}
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
                    {formatGBP(result.nextContributionScenario.finalBalance)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    A small monthly increase may create a noticeably larger
                    result over time.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    If growth increased by 1%
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.nextRateScenario.finalBalance)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Over longer periods, relatively modest rate differences may
                    become more noticeable.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <Wallet className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                Standard ISA allowance reference
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                This page uses the standard annual ISA allowance of{" "}
                <span className="font-semibold text-slate-900">£20,000</span> as
                a planning reference.
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
                This page is useful for planning longer-term savings inside an
                ISA and seeing how a mix of regular monthly contributions and
                annual deposits may build over time.
              </p>
              <p className="leading-7">
                The most useful figures to watch are the projected end value,
                the amount created by growth, and whether the annual
                contribution plan stays within the ISA allowance.
              </p>
              <p className="leading-7">
                Even if a plan looks modest at first, time and consistency may
                still lead to a much larger result than many people expect.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              ISA savings calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    What is the ISA allowance?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This calculator uses the standard annual ISA allowance of
                  £20,000 as a planning reference.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Do I need a large amount to get started?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  No. Smaller, consistent contributions may still build over
                  time, especially across longer periods.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Why does time matter so much?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Because compound growth tends to become more visible the
                  longer money is left to build.
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
                A useful next step may be comparing this with a broader compound
                growth plan or checking what your monthly budget may
                realistically support.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/compound-interest-calculator"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Compound interest
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/tools/monthly-budget-planner"
                className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Budget planner
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="Related ISA and savings pages"
        links={[
          {
            title: "Compound Interest Calculator",
            description:
              "Compare ISA growth with a broader compound growth view.",
            href: "/tools/compound-interest-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "Check how much room your budget has for ISA contributions.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Healthy Savings Rate UK",
            description:
              "See how your ISA plan fits into a healthy overall savings rate.",
            href: "/guides/healthy-savings-rate-uk",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Use your monthly income to judge realistic ISA contributions.",
            href: "/tools/take-home-pay-calculator-uk",
          },
        ]}
      />

      <ToolDisclaimer />
    </main>
  );
}
