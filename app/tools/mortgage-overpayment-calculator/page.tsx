"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Home,
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

function monthlyMortgagePayment(
  loanAmount: number,
  annualRate: number,
  years: number,
) {
  const monthlyRate = annualRate / 100 / 12;
  const payments = years * 12;

  if (loanAmount <= 0 || years <= 0) return 0;

  if (monthlyRate === 0) {
    return loanAmount / payments;
  }

  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
    (Math.pow(1 + monthlyRate, payments) - 1)
  );
}

function simulateMortgage(
  balance: number,
  annualRate: number,
  normalPayment: number,
  monthlyOverpayment: number,
  oneOffOverpayment: number,
) {
  const monthlyRate = annualRate / 100 / 12;
  let remaining = Math.max(0, balance - oneOffOverpayment);
  let months = 0;
  let totalInterest = 0;

  while (remaining > 0.01 && months < 1200) {
    const interest = remaining * monthlyRate;
    totalInterest += interest;

    const payment = Math.min(
      remaining + interest,
      normalPayment + monthlyOverpayment,
    );

    remaining = remaining + interest - payment;
    months += 1;
  }

  return {
    months,
    totalInterest,
    totalPaid: balance + totalInterest,
  };
}

function formatYearsMonths(months: number) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years <= 0) return `${remainingMonths} months`;
  if (remainingMonths === 0) return `${years} years`;

  return `${years} years ${remainingMonths} months`;
}

export default function MortgageOverpaymentCalculatorPage() {
  const [mortgageBalance, setMortgageBalance] = useState(220000);
  const [interestRate, setInterestRate] = useState(4.8);
  const [remainingYears, setRemainingYears] = useState(25);
  const [monthlyOverpayment, setMonthlyOverpayment] = useState(150);
  const [oneOffOverpayment, setOneOffOverpayment] = useState(0);

  const result = useMemo(() => {
    const normalPayment = monthlyMortgagePayment(
      mortgageBalance,
      interestRate,
      remainingYears,
    );

    const withoutOverpayment = simulateMortgage(
      mortgageBalance,
      interestRate,
      normalPayment,
      0,
      0,
    );

    const withOverpayment = simulateMortgage(
      mortgageBalance,
      interestRate,
      normalPayment,
      monthlyOverpayment,
      oneOffOverpayment,
    );

    const interestSaved =
      withoutOverpayment.totalInterest - withOverpayment.totalInterest;

    const monthsSaved = withoutOverpayment.months - withOverpayment.months;

    const annualOverpayment = monthlyOverpayment * 12 + oneOffOverpayment;
    const typicalAllowance = mortgageBalance * 0.1;
    const allowanceRemaining = Math.max(
      0,
      typicalAllowance - annualOverpayment,
    );
    const overAllowance = Math.max(0, annualOverpayment - typicalAllowance);

    let status = "Useful saving";
    let summary =
      "Your overpayment plan could reduce both the total interest and the mortgage term.";

    if (monthsSaved >= 36 || interestSaved >= 15000) {
      status = "Strong impact";
      summary =
        "This overpayment plan could make a strong difference to both the total interest paid and the time left on the mortgage.";
    } else if (monthsSaved < 6 && interestSaved < 2500) {
      status = "Modest impact";
      summary =
        "This overpayment still helps, but the impact may be modest unless the amount or consistency increases.";
    }

    return {
      normalPayment,
      withoutOverpayment,
      withOverpayment,
      interestSaved,
      monthsSaved,
      annualOverpayment,
      typicalAllowance,
      allowanceRemaining,
      overAllowance,
      status,
      summary,
    };
  }, [
    mortgageBalance,
    interestRate,
    remainingYears,
    monthlyOverpayment,
    oneOffOverpayment,
  ]);

  const applyScenario = (type: "small" | "steady" | "large") => {
    if (type === "small") {
      setMortgageBalance(180000);
      setInterestRate(4.5);
      setRemainingYears(22);
      setMonthlyOverpayment(75);
      setOneOffOverpayment(0);
    }

    if (type === "steady") {
      setMortgageBalance(220000);
      setInterestRate(4.8);
      setRemainingYears(25);
      setMonthlyOverpayment(150);
      setOneOffOverpayment(0);
    }

    if (type === "large") {
      setMortgageBalance(300000);
      setInterestRate(5.2);
      setRemainingYears(28);
      setMonthlyOverpayment(300);
      setOneOffOverpayment(5000);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Housing tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Mortgage Overpayment Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate how much interest you could save and how much sooner you
              could clear your mortgage by making regular or one-off
              overpayments.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("small")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Small overpayment
              </button>
              <button
                onClick={() => applyScenario("steady")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Steady plan
              </button>
              <button
                onClick={() => applyScenario("large")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Larger plan
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Current mortgage balance (£)
                </label>
                <input
                  type="number"
                  value={mortgageBalance}
                  onChange={(e) => setMortgageBalance(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Interest rate %
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Remaining term (years)
                </label>
                <input
                  type="number"
                  value={remainingYears}
                  onChange={(e) => setRemainingYears(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Monthly overpayment (£)
                </label>
                <input
                  type="number"
                  value={monthlyOverpayment}
                  onChange={(e) =>
                    setMonthlyOverpayment(Number(e.target.value))
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  One-off overpayment (£)
                </label>
                <input
                  type="number"
                  value={oneOffOverpayment}
                  onChange={(e) => setOneOffOverpayment(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                Important note
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Many mortgage deals have annual overpayment limits, often around
                10% of the balance, but this varies by lender and product.
                Always check your own mortgage terms before making overpayments.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PoundSterling className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Interest saved</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.interestSaved)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated reduction in total interest.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Time saved</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatYearsMonths(result.monthsSaved)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated time cut from your mortgage term.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Overpayment summary
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{result.status}</p>
                  <p className="text-sm text-slate-300">
                    Regular payment: {formatGBP(result.normalPayment)}/month
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Without overpayments
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatYearsMonths(result.withoutOverpayment.months)}
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Interest:{" "}
                    {formatGBP(result.withoutOverpayment.totalInterest)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    With overpayments
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatYearsMonths(result.withOverpayment.months)}
                  </p>
                  <p className="mt-2 text-xs text-slate-300">
                    Interest: {formatGBP(result.withOverpayment.totalInterest)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Overpayment allowance check
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Planned annual overpayment
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.annualOverpayment)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Example 10% allowance
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.typicalAllowance)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Allowance position</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {result.overAllowance > 0
                      ? `${formatGBP(result.overAllowance)} over`
                      : `${formatGBP(result.allowanceRemaining)} remaining`}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This is only a rough reference. Your lender may use
                    different rules or charge early repayment fees.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <Home className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                What this means
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Mortgage overpayments can be powerful because they reduce the
                balance that future interest is charged on. The earlier and more
                consistently you overpay, the more noticeable the effect can
                become.
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
                Use the interest saved and time saved figures to judge whether
                overpaying feels worthwhile compared with other goals like
                emergency savings, debt repayment, or investing.
              </p>
              <p className="leading-7">
                Overpayments can be especially effective when rates are higher,
                but always check whether your mortgage has overpayment limits or
                early repayment charges.
              </p>
              <p className="leading-7">
                This calculator gives an estimate only and does not replace
                personalised mortgage advice.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Is it worth overpaying my mortgage?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  It can be, especially if it reduces interest and shortens the
                  term, but it depends on your mortgage rate, savings needs, and
                  any overpayment charges.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  What is a common overpayment limit?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Many deals allow around 10% of the balance per year without a
                  charge, but the exact rule depends on your lender and product.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Should I overpay monthly or make a lump sum?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Both can help. Earlier overpayments usually reduce interest
                  sooner, but you should keep enough cash for emergencies.
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
              href="/tools/mortgage-affordability-calculator-uk"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Mortgage affordability
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
      </section>
    </main>
  );
}
