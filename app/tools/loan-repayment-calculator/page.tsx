"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  CreditCard,
  PoundSterling,
  ShieldCheck,
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

function monthlyPayment(loanAmount: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  if (loanAmount <= 0 || years <= 0) return 0;

  if (monthlyRate === 0) {
    return loanAmount / totalPayments;
  }

  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)
  );
}

export default function LoanRepaymentCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState(15000);
  const [interestRate, setInterestRate] = useState(6.9);
  const [loanYears, setLoanYears] = useState(5);
  const [monthlyIncome, setMonthlyIncome] = useState(2600);
  const [otherDebt, setOtherDebt] = useState(250);

  const result = useMemo(() => {
    const monthlyRepayment = monthlyPayment(
      loanAmount,
      interestRate,
      loanYears,
    );
    const totalPaid = monthlyRepayment * loanYears * 12;
    const totalInterest = totalPaid - loanAmount;
    const debtShare =
      monthlyIncome > 0
        ? ((monthlyRepayment + otherDebt) / monthlyIncome) * 100
        : 0;

    let status = "More manageable range";
    let summary =
      "Based on the figures entered, this repayment level may be reasonably manageable relative to monthly income.";

    if (debtShare > 35) {
      status = "More stretched range";
      summary =
        "This repayment level appears high relative to monthly income and may feel more restrictive.";
    } else if (debtShare > 25) {
      status = "Tighter range";
      summary =
        "This repayment level may be possible, but debt commitments could take up a more noticeable share of monthly income.";
    }

    const shorterTermPayment = monthlyPayment(
      loanAmount,
      interestRate,
      Math.max(1, loanYears - 1),
    );

    const longerTermPayment = monthlyPayment(
      loanAmount,
      interestRate,
      loanYears + 2,
    );

    const interestSavedByShorterTerm =
      totalInterest -
      (shorterTermPayment * Math.max(1, loanYears - 1) * 12 - loanAmount);

    return {
      monthlyRepayment,
      totalPaid,
      totalInterest,
      debtShare,
      status,
      summary,
      shorterTermPayment,
      longerTermPayment,
      interestSavedByShorterTerm,
    };
  }, [loanAmount, interestRate, loanYears, monthlyIncome, otherDebt]);

  const score = Math.max(
    10,
    Math.min(
      96,
      Math.round(
        100 -
          result.debtShare * 1.5 +
          Math.min(
            (monthlyIncome - result.monthlyRepayment - otherDebt) / 50,
            18,
          ),
      ),
    ),
  );

  const applyScenario = (type: "car" | "personal" | "large") => {
    if (type === "car") {
      setLoanAmount(12000);
      setInterestRate(6.4);
      setLoanYears(4);
      setMonthlyIncome(2600);
      setOtherDebt(200);
    }

    if (type === "personal") {
      setLoanAmount(8000);
      setInterestRate(9.9);
      setLoanYears(3);
      setMonthlyIncome(2200);
      setOtherDebt(150);
    }

    if (type === "large") {
      setLoanAmount(25000);
      setInterestRate(7.2);
      setLoanYears(6);
      setMonthlyIncome(3400);
      setOtherDebt(350);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Debt tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Loan Repayment Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use this loan repayment calculator to estimate monthly repayments,
              total cost, and total interest over time. It can help you compare
              different loan terms and see how repayment levels may affect your
              monthly budget.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("car")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Car loan
              </button>
              <button
                onClick={() => applyScenario("personal")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Personal loan
              </button>
              <button
                onClick={() => applyScenario("large")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Larger loan
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Loan amount
                </label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
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
                  Repayment term (years)
                </label>
                <input
                  type="number"
                  value={loanYears}
                  onChange={(e) => setLoanYears(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Monthly income
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Other monthly debt payments
                </label>
                <input
                  type="number"
                  value={otherDebt}
                  onChange={(e) => setOtherDebt(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                What this tool helps with
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use this page to compare loan terms, estimate total interest,
                and see how a repayment level may fit alongside your monthly
                income and other debt commitments.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PoundSterling className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Monthly repayment</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.monthlyRepayment)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated monthly payment based on the figures entered.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CreditCard className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Total interest</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.totalInterest)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated interest cost across the full term.
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
                    Repayment score: {score}/100
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Total paid
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.totalPaid)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Debt share of income
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {result.debtShare.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                What changing the term may do
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Shorter term</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.shorterTermPayment)}/month
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Higher monthly repayments, but often less interest overall.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Longer term</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.longerTermPayment)}/month
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Lower monthly repayments, but often more total interest.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Interest saved by going shorter
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(Math.max(0, result.interestSavedByShorterTerm))}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Useful for comparing monthly comfort against longer-term
                    cost.
                  </p>
                </div>
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
                A lower monthly repayment can look attractive, but extending the
                loan term often means paying more interest overall.
              </p>
              <p className="leading-7">
                The most useful comparison is often the one that balances
                monthly affordability with the total cost of borrowing, rather
                than focusing only on the lowest payment.
              </p>
              <p className="leading-7">
                This tool can be especially useful when comparing personal
                loans, car finance, or other fixed-repayment borrowing.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Loan repayment calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Is a longer loan term better?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  It may reduce the monthly payment, but it often increases the
                  total interest paid.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    What matters more: payment or total interest?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Both matter. A useful comparison usually balances current
                  affordability with the longer-term cost of borrowing.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Should I compare this with my other debts?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Yes. A loan that looks manageable on its own may feel quite
                  different once other monthly debt payments are included.
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
                Keep checking the full picture
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                A useful next step may be comparing this repayment against your
                monthly budget or using the other debt-focused tools on the
                site.
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
        heading="Related debt and budget tools"
        links={[
          {
            title: "Credit Card Interest Calculator",
            description: "Compare loan debt with revolving card debt costs.",
            href: "/tools/credit-card-interest-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "See how your loan payment affects the rest of your monthly finances.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Use your real monthly income when judging debt affordability.",
            href: "/tools/take-home-pay-calculator-uk",
          },
          {
            title: "Debt Snowball vs Avalanche (UK Guide)",
            description: "Learn which debt strategy may suit you best.",
            href: "/guides/debt-snowball-vs-avalanche-uk",
          },
        ]}
      />

      <ToolDisclaimer />
    </main>
  );
}
