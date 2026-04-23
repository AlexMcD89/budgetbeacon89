"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CreditCard,
  PoundSterling,
  ShieldCheck,
} from "lucide-react";

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatMonths(months: number) {
  if (!Number.isFinite(months)) return "Not clearing";

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years <= 0) return `${remainingMonths} months`;
  if (remainingMonths === 0) return `${years} years`;

  return `${years} years ${remainingMonths} months`;
}

function simulatePayoff(balance: number, apr: number, monthlyPayment: number) {
  const monthlyRate = apr / 100 / 12;
  let remaining = balance;
  let months = 0;
  let totalInterest = 0;

  if (balance <= 0) {
    return {
      months: 0,
      totalInterest: 0,
      totalPaid: 0,
      unworkable: false,
    };
  }

  const firstMonthInterest = balance * monthlyRate;

  if (monthlyPayment <= firstMonthInterest) {
    return {
      months: Infinity,
      totalInterest: Infinity,
      totalPaid: Infinity,
      unworkable: true,
    };
  }

  while (remaining > 0.01 && months < 1200) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;

    const payment = Math.min(remaining + interest, monthlyPayment);
    remaining = remaining + interest - payment;

    months += 1;
  }

  return {
    months,
    totalInterest,
    totalPaid: balance + totalInterest,
    unworkable: months >= 1200,
  };
}

export default function DebtPayoffCalculatorPage() {
  const [debtBalance, setDebtBalance] = useState(6500);
  const [apr, setApr] = useState(22.9);
  const [monthlyPayment, setMonthlyPayment] = useState(220);
  const [extraPayment, setExtraPayment] = useState(75);
  const [monthlyIncome, setMonthlyIncome] = useState(2600);

  const result = useMemo(() => {
    const currentPlan = simulatePayoff(debtBalance, apr, monthlyPayment);
    const fasterPlan = simulatePayoff(
      debtBalance,
      apr,
      monthlyPayment + extraPayment,
    );

    const interestSaved =
      currentPlan.totalInterest === Infinity ||
      fasterPlan.totalInterest === Infinity
        ? 0
        : currentPlan.totalInterest - fasterPlan.totalInterest;

    const monthsSaved =
      currentPlan.months === Infinity || fasterPlan.months === Infinity
        ? 0
        : currentPlan.months - fasterPlan.months;

    const paymentShare =
      monthlyIncome > 0
        ? ((monthlyPayment + extraPayment) / monthlyIncome) * 100
        : 0;

    const firstMonthInterest = debtBalance * (apr / 100 / 12);
    const currentPrincipal = Math.max(0, monthlyPayment - firstMonthInterest);
    const fasterPrincipal = Math.max(
      0,
      monthlyPayment + extraPayment - firstMonthInterest,
    );

    let status = "Clear payoff path";
    let summary =
      "Your repayment plan appears to clear the debt, and the extra payment improves the payoff time.";

    if (currentPlan.unworkable) {
      status = "Payment too low";
      summary =
        "Your current payment may not be enough to meaningfully reduce the debt because interest is taking up too much of the payment.";
    } else if (monthsSaved >= 12 || interestSaved >= 1000) {
      status = "Strong improvement";
      summary =
        "The extra payment could make a meaningful difference to both payoff time and total interest.";
    } else if (monthsSaved < 3 && interestSaved < 250) {
      status = "Modest improvement";
      summary =
        "The extra payment still helps, but the impact may be modest unless you increase it or reduce the interest rate.";
    }

    return {
      currentPlan,
      fasterPlan,
      interestSaved,
      monthsSaved,
      paymentShare,
      firstMonthInterest,
      currentPrincipal,
      fasterPrincipal,
      status,
      summary,
    };
  }, [debtBalance, apr, monthlyPayment, extraPayment, monthlyIncome]);

  const applyScenario = (type: "card" | "personal" | "tight") => {
    if (type === "card") {
      setDebtBalance(6500);
      setApr(22.9);
      setMonthlyPayment(220);
      setExtraPayment(75);
      setMonthlyIncome(2600);
    }

    if (type === "personal") {
      setDebtBalance(12000);
      setApr(9.9);
      setMonthlyPayment(300);
      setExtraPayment(100);
      setMonthlyIncome(3200);
    }

    if (type === "tight") {
      setDebtBalance(4500);
      setApr(29.9);
      setMonthlyPayment(110);
      setExtraPayment(25);
      setMonthlyIncome(2100);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Debt tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Debt Payoff Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate how long it could take to pay off debt, how much interest
              you may pay, and how much faster you could become debt-free by
              adding an extra monthly payment.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("card")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Credit card debt
              </button>
              <button
                onClick={() => applyScenario("personal")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Personal loan style
              </button>
              <button
                onClick={() => applyScenario("tight")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Tight payment
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Debt balance (£)
                </label>
                <input
                  type="number"
                  value={debtBalance}
                  onChange={(e) => setDebtBalance(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Interest rate / APR %
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={apr}
                  onChange={(e) => setApr(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Monthly payment (£)
                </label>
                <input
                  type="number"
                  value={monthlyPayment}
                  onChange={(e) => setMonthlyPayment(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Extra monthly payment (£)
                </label>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Monthly income (£)
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                What this tool helps with
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use this calculator to compare your current payoff plan with a
                faster plan that includes extra monthly payments.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Current payoff time
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatMonths(result.currentPlan.months)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Based on your normal monthly payment.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Faster payoff time
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatMonths(result.fasterPlan.months)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Based on your normal payment plus extra payment.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Payoff summary
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <CreditCard className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{result.status}</p>
                  <p className="text-sm text-slate-300">
                    Payment share: {result.paymentShare.toFixed(1)}% of income
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Interest saved
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.interestSaved)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Time saved
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatMonths(result.monthsSaved)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                First month breakdown
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">First month interest</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.firstMonthInterest)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Balance reduction with normal payment
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.currentPrincipal)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Balance reduction with extra payment
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.fasterPrincipal)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <PoundSterling className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                What this means
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Extra payments usually help because more of your money goes
                towards reducing the balance, which means less future interest
                can build up.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              How to use this result
            </h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p className="leading-7">
                The most useful figures are payoff time, total interest, and how
                much of your first payment actually reduces the balance.
              </p>
              <p className="leading-7">
                If your payment is barely above the monthly interest, progress
                can feel very slow. Increasing payments or lowering the interest
                rate can make a big difference.
              </p>
              <p className="leading-7">
                This calculator gives estimates only and does not provide
                financial advice.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Why does debt take so long to clear?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  High interest can absorb a large part of each payment,
                  especially early on when the balance is highest.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Is paying extra worth it?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Often yes. Extra payments reduce the balance faster, which can
                  lower future interest and shorten the payoff time.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Should I use snowball or avalanche?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Snowball focuses on smaller debts first for motivation, while
                  avalanche targets higher-interest debts first to reduce cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/guides/debt-snowball-vs-avalanche-uk"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Snowball vs avalanche
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/tools/credit-card-interest-calculator"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Credit card interest
            </Link>

            <Link
              href="/tools/monthly-budget-planner"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Budget planner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
