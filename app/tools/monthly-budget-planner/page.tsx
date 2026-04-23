"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  PiggyBank,
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

export default function MonthlyBudgetPlannerPage() {
  const [income, setIncome] = useState(2600);
  const [rent, setRent] = useState(950);
  const [bills, setBills] = useState(350);
  const [groceries, setGroceries] = useState(250);
  const [transport, setTransport] = useState(160);
  const [debt, setDebt] = useState(200);
  const [savings, setSavings] = useState(250);
  const [fun, setFun] = useState(180);
  const [other, setOther] = useState(120);

  const result = useMemo(() => {
    const essentials = rent + bills + groceries + transport + debt;
    const lifestyle = fun + other;
    const totalOutgoings =
      rent + bills + groceries + transport + debt + savings + fun + other;
    const moneyLeft = income - totalOutgoings;

    const essentialsShare = income > 0 ? (essentials / income) * 100 : 0;
    const housingShare = income > 0 ? (rent / income) * 100 : 0;
    const savingsShare = income > 0 ? (savings / income) * 100 : 0;

    let status = "More balanced range";
    let summary =
      "Based on the figures entered, this monthly budget appears reasonably balanced with some room for flexibility.";

    if (moneyLeft < 0) {
      status = "Over budget";
      summary =
        "Your planned spending is currently higher than your monthly income, so some adjustments may be needed.";
    } else if (moneyLeft < 150) {
      status = "Tighter range";
      summary =
        "This budget may work, but it appears to leave limited room for unexpected costs or irregular spending.";
    } else if (housingShare > 40 || essentialsShare > 75) {
      status = "More stretched range";
      summary =
        "Core costs are taking up a large share of income, which may reduce monthly flexibility.";
    }

    const recommendedSavings = Math.max(0, income * 0.1);
    const possibleExtraSavings = Math.max(0, moneyLeft);

    return {
      essentials,
      lifestyle,
      totalOutgoings,
      moneyLeft,
      essentialsShare,
      housingShare,
      savingsShare,
      status,
      summary,
      recommendedSavings,
      possibleExtraSavings,
    };
  }, [income, rent, bills, groceries, transport, debt, savings, fun, other]);

  const score = Math.max(
    8,
    Math.min(
      96,
      Math.round(
        100 -
          result.essentialsShare * 0.9 -
          result.housingShare * 0.5 +
          Math.min(result.moneyLeft / 20, 18) +
          Math.min(result.savingsShare * 0.8, 10),
      ),
    ),
  );

  const applyScenario = (type: "solo" | "couple" | "tight") => {
    if (type === "solo") {
      setIncome(2600);
      setRent(950);
      setBills(350);
      setGroceries(250);
      setTransport(160);
      setDebt(200);
      setSavings(250);
      setFun(180);
      setOther(120);
    }

    if (type === "couple") {
      setIncome(4200);
      setRent(1450);
      setBills(500);
      setGroceries(420);
      setTransport(220);
      setDebt(250);
      setSavings(500);
      setFun(280);
      setOther(180);
    }

    if (type === "tight") {
      setIncome(2100);
      setRent(980);
      setBills(420);
      setGroceries(260);
      setTransport(170);
      setDebt(220);
      setSavings(50);
      setFun(120);
      setOther(110);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Budget tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Monthly Budget Planner UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use this monthly budget planner to map your income, essential
              spending, savings, and flexible spending in one place. It is
              designed to help you see what feels realistic, where pressure may
              be building, and how much room you may have left each month.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("solo")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Solo example
              </button>
              <button
                onClick={() => applyScenario("couple")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Couple example
              </button>
              <button
                onClick={() => applyScenario("tight")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Tight budget
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Monthly income
                </label>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Rent / mortgage
                </label>
                <input
                  type="number"
                  value={rent}
                  onChange={(e) => setRent(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Bills
                </label>
                <input
                  type="number"
                  value={bills}
                  onChange={(e) => setBills(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Groceries
                </label>
                <input
                  type="number"
                  value={groceries}
                  onChange={(e) => setGroceries(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Transport
                </label>
                <input
                  type="number"
                  value={transport}
                  onChange={(e) => setTransport(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Debt repayments
                </label>
                <input
                  type="number"
                  value={debt}
                  onChange={(e) => setDebt(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Savings
                </label>
                <input
                  type="number"
                  value={savings}
                  onChange={(e) => setSavings(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Fun / entertainment
                </label>
                <input
                  type="number"
                  value={fun}
                  onChange={(e) => setFun(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Other spending
                </label>
                <input
                  type="number"
                  value={other}
                  onChange={(e) => setOther(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                What this planner is for
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use this page to see whether your monthly plan appears balanced,
                how much room may be left after spending, and which costs are
                taking up the biggest share of income.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Wallet className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Total outgoings</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.totalOutgoings)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Everything currently included in your monthly plan.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PiggyBank className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Money left</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.moneyLeft)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  What may remain after all planned monthly spending.
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
                    Budget score: {score}/100
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Essentials
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {result.essentialsShare.toFixed(1)}%
                  </p>
                  <p className="mt-2 text-xs text-slate-300">Of income</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Housing
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {result.housingShare.toFixed(1)}%
                  </p>
                  <p className="mt-2 text-xs text-slate-300">Of income</p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Savings
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {result.savingsShare.toFixed(1)}%
                  </p>
                  <p className="mt-2 text-xs text-slate-300">Of income</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                What this estimate suggests
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Essential spending</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.essentials)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Rent, bills, groceries, transport, and debt repayments.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Lifestyle spending</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.lifestyle)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Flexible spending such as fun, eating out, and other extras.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Possible extra savings
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.possibleExtraSavings)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This shows the approximate room available if you wanted to
                    increase savings from the current plan.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Quick budget tips
              </h2>

              <div className="mt-5 space-y-3 text-sm text-slate-600">
                <p className="leading-6">
                  If money left is close to zero, it may help to focus on
                  essentials first before increasing savings or flexible
                  spending.
                </p>
                <p className="leading-6">
                  If housing is taking too much of income, that can often put
                  pressure on the rest of the plan.
                </p>
                <p className="leading-6">
                  If the savings rate is below 10%, that is not always a
                  problem, but it may be worth revisiting once debt or housing
                  costs improve.
                </p>
              </div>
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
                A good budget is not only about covering the basics. It may also
                need to leave room for irregular costs, emergencies, and some
                flexibility.
              </p>
              <p className="leading-7">
                One of the most useful figures on this page is often the money
                left over, because it shows whether the plan may feel
                sustainable or too tight.
              </p>
              <p className="leading-7">
                This page can work particularly well after checking take-home
                pay, rent affordability, mortgage affordability, or loan
                repayments.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Monthly budget planner FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    How much should I save each month?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  There is no single perfect number, but a commonly used
                  benchmark is around 10% of income where possible.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    What if I am over budget?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  It may help to review larger fixed costs first, especially
                  housing, debt, and bills, before looking at smaller flexible
                  categories.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Should I budget from gross or take-home pay?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Take-home pay is often the more useful number because it
                  reflects what actually reaches your bank account.
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
                Use this alongside your other tools
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                This planner can work particularly well when paired with
                take-home pay, rent, mortgage, and debt calculations.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/take-home-pay-calculator-uk"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Take-home pay
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/tools/rent-affordability-calculator-uk"
                className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Rent affordability
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="Build out your budget using these pages"
        links={[
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Get your real monthly income before finalising your budget.",
            href: "/tools/take-home-pay-calculator-uk",
          },
          {
            title: "Rent Affordability Calculator UK",
            description:
              "Check whether your rent fits comfortably into your monthly plan.",
            href: "/tools/rent-affordability-calculator-uk",
          },
          {
            title: "Loan Repayment Calculator",
            description:
              "Estimate how fixed loan repayments affect your cash flow.",
            href: "/tools/loan-repayment-calculator",
          },
          {
            title: "Healthy Savings Rate UK",
            description:
              "Compare your budget against common savings benchmarks.",
            href: "/guides/healthy-savings-rate-uk",
          },
        ]}
      />

      <ToolDisclaimer />
    </main>
  );
}
