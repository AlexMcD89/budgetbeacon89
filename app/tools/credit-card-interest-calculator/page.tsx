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

function monthlyInterest(balance: number, apr: number) {
  return balance * (apr / 100 / 12);
}

export default function CreditCardInterestCalculatorPage() {
  const [balance, setBalance] = useState(3500);
  const [apr, setApr] = useState(24.9);
  const [monthlyPayment, setMonthlyPayment] = useState(150);
  const [monthlyIncome, setMonthlyIncome] = useState(2500);

  const result = useMemo(() => {
    const interestFirstMonth = monthlyInterest(balance, apr);
    const principalFirstMonth = Math.max(
      0,
      monthlyPayment - interestFirstMonth,
    );

    let remaining = balance;
    let totalInterest = 0;
    let months = 0;

    if (monthlyPayment <= interestFirstMonth && balance > 0) {
      return {
        interestFirstMonth,
        principalFirstMonth,
        totalInterest: Infinity,
        monthsToRepay: Infinity,
        totalPaid: Infinity,
        status: "Unworkable range",
        summary:
          "Based on the figures entered, this payment may not be enough to reduce the balance meaningfully, as interest could build faster than repayments.",
        paymentShare:
          monthlyIncome > 0 ? (monthlyPayment / monthlyIncome) * 100 : 0,
        fasterPayment: Math.ceil(interestFirstMonth + 50),
        dangerous: true,
      };
    }

    while (remaining > 0.01 && months < 1200) {
      const monthlyInt = monthlyInterest(remaining, apr);
      totalInterest += monthlyInt;
      remaining = remaining + monthlyInt - monthlyPayment;
      months += 1;
    }

    const totalPaid = balance + totalInterest;
    const paymentShare =
      monthlyIncome > 0 ? (monthlyPayment / monthlyIncome) * 100 : 0;

    let status = "More manageable range";
    let summary =
      "Based on the figures entered, this repayment plan may reduce the balance at a steady pace.";

    if (months > 48 || paymentShare > 18) {
      status = "Tighter range";
      summary =
        "This repayment plan may take longer or use a larger share of monthly income, which could feel more restrictive.";
    }

    if (months > 84 || paymentShare > 28) {
      status = "More stretched range";
      summary =
        "This setup may feel expensive or slower to clear, with a higher total interest cost.";
    }

    return {
      interestFirstMonth,
      principalFirstMonth,
      totalInterest,
      monthsToRepay: months,
      totalPaid,
      status,
      summary,
      paymentShare,
      fasterPayment: monthlyPayment + 50,
      dangerous: false,
    };
  }, [balance, apr, monthlyPayment, monthlyIncome]);

  const score =
    result.monthsToRepay === Infinity
      ? 5
      : Math.max(
          10,
          Math.min(
            96,
            Math.round(
              100 -
                Math.min(result.monthsToRepay / 1.8, 45) -
                result.paymentShare * 1.1 +
                Math.min((monthlyIncome - monthlyPayment) / 60, 15),
            ),
          ),
        );

  const fasterPlan = useMemo(() => {
    const newPayment = result.fasterPayment;
    let remaining = balance;
    let totalInterest = 0;
    let months = 0;

    if (newPayment <= monthlyInterest(balance, apr)) {
      return { months: Infinity, interest: Infinity };
    }

    while (remaining > 0.01 && months < 1200) {
      const monthlyInt = monthlyInterest(remaining, apr);
      totalInterest += monthlyInt;
      remaining = remaining + monthlyInt - newPayment;
      months += 1;
    }

    return { months, interest: totalInterest };
  }, [balance, apr, result.fasterPayment]);

  const applyScenario = (type: "average" | "tight" | "high") => {
    if (type === "average") {
      setBalance(3500);
      setApr(24.9);
      setMonthlyPayment(150);
      setMonthlyIncome(2500);
    }

    if (type === "tight") {
      setBalance(5000);
      setApr(29.9);
      setMonthlyPayment(120);
      setMonthlyIncome(2200);
    }

    if (type === "high") {
      setBalance(8000);
      setApr(19.9);
      setMonthlyPayment(300);
      setMonthlyIncome(3200);
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
              Credit Card Interest Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use this credit card interest calculator to estimate how much
              interest could build over time, how long repayment may take, and
              how different monthly payments could affect the outcome.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("average")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Example balance
              </button>
              <button
                onClick={() => applyScenario("tight")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Tight setup
              </button>
              <button
                onClick={() => applyScenario("high")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Larger balance
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Card balance
                </label>
                <input
                  type="number"
                  value={balance}
                  onChange={(e) => setBalance(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  APR %
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
                  Monthly payment
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
                  Monthly income
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
                What this tool is useful for
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This page helps you estimate how expensive a credit card balance
                could become over time and whether changing your monthly payment
                could make a noticeable difference.
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
                  First month interest estimate
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.interestFirstMonth)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This shows what interest alone could add in the first month.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CreditCard className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Estimated months to repay
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {result.monthsToRepay === Infinity
                    ? "Too low"
                    : result.monthsToRepay}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated payoff time based on the payment entered.
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
                    Debt score: {score}/100
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Total interest estimate
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {result.totalInterest === Infinity
                      ? "Too high to estimate"
                      : formatGBP(result.totalInterest)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Payment share of income
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {result.paymentShare.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                What happens if you pay more?
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Current payment</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(monthlyPayment)}/month
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Your current repayment setup based on the amount entered.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Try paying</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.fasterPayment)}/month
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    A modest increase may reduce both payoff time and total
                    interest.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    With the higher payment
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {fasterPlan.months === Infinity
                      ? "Not enough"
                      : `${fasterPlan.months} months`}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Estimated payoff time if the payment increased.
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
                  <p className="text-sm text-slate-500">Interest portion</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.interestFirstMonth)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Balance reduction</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.principalFirstMonth)}
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
                Credit card debt can feel manageable when the monthly payment is
                small, but high APRs often mean a larger part of each payment
                may go toward interest first.
              </p>
              <p className="leading-7">
                The key figures here are the first month interest estimate,
                total interest estimate, and the estimated time to repay.
                Together, they can give a clearer picture of how the balance may
                change over time.
              </p>
              <p className="leading-7">
                In many cases, even a modest increase in monthly payment may
                make a bigger difference than people expect.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Credit card interest calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Why is my credit card balance going down so slowly?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  With higher APRs, a large part of the payment may go to
                  interest first, especially early on.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    What happens if I only pay a small amount?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Repayment may take much longer, and the total interest paid
                  could rise significantly.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Is increasing my payment worth it?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Often yes. Even a relatively small increase may reduce both
                  the repayment term and the total interest paid.
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
                Look at the full debt picture
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                After checking card interest, a useful next step may be
                comparing the result with your monthly budget or wider debt
                repayments.
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
                href="/tools/loan-repayment-calculator"
                className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Loan calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      <RelatedLinks
        heading="Related debt pages"
        links={[
          {
            title: "Loan Repayment Calculator",
            description:
              "Compare fixed-loan debt costs with credit card debt costs.",
            href: "/tools/loan-repayment-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "See whether your current card repayment fits your budget.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Use your actual monthly income to judge repayment pressure.",
            href: "/tools/take-home-pay-calculator-uk",
          },
          {
            title: "Debt Snowball vs Avalanche (UK Guide)",
            description:
              "Understand the main strategies for attacking debt faster.",
            href: "/guides/debt-snowball-vs-avalanche-uk",
          },
        ]}
      />

      <ToolDisclaimer />
    </main>
  );
}
