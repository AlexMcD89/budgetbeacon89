"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  PiggyBank,
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

export default function EmergencyFundCalculatorPage() {
  const [rentMortgage, setRentMortgage] = useState(950);
  const [bills, setBills] = useState(350);
  const [groceries, setGroceries] = useState(280);
  const [transport, setTransport] = useState(180);
  const [debtPayments, setDebtPayments] = useState(200);
  const [otherEssentials, setOtherEssentials] = useState(150);
  const [currentSavings, setCurrentSavings] = useState(1200);
  const [monthlySaving, setMonthlySaving] = useState(250);
  const [targetMonths, setTargetMonths] = useState(6);

  const result = useMemo(() => {
    const monthlyEssentials =
      rentMortgage +
      bills +
      groceries +
      transport +
      debtPayments +
      otherEssentials;

    const target3 = monthlyEssentials * 3;
    const target6 = monthlyEssentials * 6;
    const target9 = monthlyEssentials * 9;
    const target12 = monthlyEssentials * 12;

    const selectedTarget = monthlyEssentials * targetMonths;
    const gap = Math.max(0, selectedTarget - currentSavings);
    const progress =
      selectedTarget > 0 ? (currentSavings / selectedTarget) * 100 : 0;
    const monthsToTarget =
      monthlySaving > 0 ? Math.ceil(gap / monthlySaving) : Infinity;

    const monthlyNeeded12Months = gap > 0 ? gap / 12 : 0;
    const monthlyNeeded6Months = gap > 0 ? gap / 6 : 0;

    let status = "Building";
    let summary =
      "You have started building your emergency fund. The next step is consistency.";

    if (currentSavings >= selectedTarget) {
      status = "Fully funded";
      summary =
        "Your current savings cover your selected emergency fund target.";
    } else if (progress >= 50) {
      status = "Good progress";
      summary =
        "You are more than halfway towards your selected emergency fund target.";
    } else if (progress < 20) {
      status = "Early stage";
      summary =
        "Your emergency fund is still in the early stage, so building a basic buffer should be a priority.";
    }

    return {
      monthlyEssentials,
      target3,
      target6,
      target9,
      target12,
      selectedTarget,
      gap,
      progress: Math.min(100, progress),
      monthsToTarget,
      monthlyNeeded12Months,
      monthlyNeeded6Months,
      status,
      summary,
    };
  }, [
    rentMortgage,
    bills,
    groceries,
    transport,
    debtPayments,
    otherEssentials,
    currentSavings,
    monthlySaving,
    targetMonths,
  ]);

  const applyScenario = (type: "starter" | "renter" | "family") => {
    if (type === "starter") {
      setRentMortgage(700);
      setBills(250);
      setGroceries(180);
      setTransport(120);
      setDebtPayments(100);
      setOtherEssentials(100);
      setCurrentSavings(500);
      setMonthlySaving(150);
      setTargetMonths(3);
    }

    if (type === "renter") {
      setRentMortgage(950);
      setBills(350);
      setGroceries(280);
      setTransport(180);
      setDebtPayments(200);
      setOtherEssentials(150);
      setCurrentSavings(1200);
      setMonthlySaving(250);
      setTargetMonths(6);
    }

    if (type === "family") {
      setRentMortgage(1400);
      setBills(550);
      setGroceries(550);
      setTransport(300);
      setDebtPayments(300);
      setOtherEssentials(250);
      setCurrentSavings(2500);
      setMonthlySaving(400);
      setTargetMonths(6);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Savings tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Emergency Fund Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate how much emergency savings you may need based on your
              essential monthly costs, then see how long it could take to build
              a 3, 6, 9, or 12 month safety buffer.
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
                Starter buffer
              </button>
              <button
                onClick={() => applyScenario("renter")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Renter example
              </button>
              <button
                onClick={() => applyScenario("family")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Family example
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Rent / mortgage (£)
                </label>
                <input
                  type="number"
                  value={rentMortgage}
                  onChange={(e) => setRentMortgage(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Bills (£)
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
                  Groceries (£)
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
                  Transport (£)
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
                  Debt payments (£)
                </label>
                <input
                  type="number"
                  value={debtPayments}
                  onChange={(e) => setDebtPayments(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Other essentials (£)
                </label>
                <input
                  type="number"
                  value={otherEssentials}
                  onChange={(e) => setOtherEssentials(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Current emergency savings (£)
                </label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Monthly saving (£)
                </label>
                <input
                  type="number"
                  value={monthlySaving}
                  onChange={(e) => setMonthlySaving(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium text-slate-700">
                Emergency fund target
              </label>

              <div className="mt-2 grid gap-2 sm:grid-cols-4">
                {[3, 6, 9, 12].map((months) => (
                  <button
                    key={months}
                    onClick={() => setTargetMonths(months)}
                    className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      targetMonths === months
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    {months} months
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                What counts as essential?
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This calculator focuses on essential costs you would still need
                to cover during an emergency, such as housing, bills, food,
                transport, and debt repayments.
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
                  Target emergency fund
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.selectedTarget)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Based on {targetMonths} months of essential costs.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Time to target</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {result.monthsToTarget === Infinity
                    ? "Not on track"
                    : `${result.monthsToTarget} months`}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Based on your current monthly saving.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Emergency fund summary
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{result.status}</p>
                  <p className="text-sm text-slate-300">
                    Progress: {result.progress.toFixed(1)}%
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${result.progress}%` }}
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Monthly essentials
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.monthlyEssentials)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Gap to target
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.gap)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Emergency fund target levels
              </h2>

              <div className="mt-5 space-y-4">
                <TargetRow label="3 months" value={result.target3} />
                <TargetRow label="6 months" value={result.target6} />
                <TargetRow label="9 months" value={result.target9} />
                <TargetRow label="12 months" value={result.target12} />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                What monthly saving would close the gap?
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    To close the gap in 12 months
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.monthlyNeeded12Months)}/month
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    To close the gap in 6 months
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.monthlyNeeded6Months)}/month
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <PiggyBank className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                What this means
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                An emergency fund is there to reduce pressure when income drops
                or unexpected costs appear. Even a small starter buffer can make
                a big difference before building towards a larger target.
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
                A 3 month fund can be a useful starter target, while 6 months or
                more may feel safer if your income is less predictable or your
                essential costs are high.
              </p>
              <p className="leading-7">
                The right target depends on your household, job security, debts,
                dependants, and how quickly you could replace income if needed.
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
                  How much should I have in an emergency fund?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Many people use 3 to 6 months of essential expenses as a
                  starting benchmark, but the right amount depends on your
                  circumstances.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Should I save before paying off debt?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A small starter emergency fund can help avoid relying on more
                  credit, but high-interest debt may also need attention.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Where should I keep an emergency fund?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Emergency money is usually best kept somewhere accessible and
                  low risk, rather than locked away or exposed to large market
                  swings.
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
              href="/tools/savings-goal-calculator"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Savings goal calculator
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/tools/monthly-budget-planner"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Budget planner
            </Link>

            <Link
              href="/guides/healthy-savings-rate-uk"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Healthy savings guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function TargetRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-3xl bg-slate-100 p-4">
      <p className="text-sm text-slate-500">{label} of essentials</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">
        {formatGBP(value)}
      </p>
    </div>
  );
}
