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
import AdsenseAd from "@/components/adsense-ad";

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatMonths(months: number) {
  if (months === Infinity) return "Too low";
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years <= 0) return `${remainingMonths} months`;
  if (remainingMonths === 0) return `${years} years`;

  return `${years} years ${remainingMonths} months`;
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
        status: "Payment may be too low",
        summary:
          "Based on the figures entered, this payment may not reduce the balance meaningfully because interest could take up most or all of the repayment.",
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
      status = "Tighter repayment range";
      summary =
        "This repayment plan may take longer or use a larger share of monthly income, which could feel more restrictive.";
    }

    if (months > 84 || paymentShare > 28) {
      status = "More stretched range";
      summary =
        "This setup may feel expensive or slow to clear, with a higher total interest cost.";
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
              interest could build on a card balance, how long repayment may
              take, and how different monthly payments could affect the outcome.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-6 md:px-6">
        <AdsenseAd
          slot="1045116839"
          className="overflow-hidden rounded-3xl bg-white"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div>
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
                  This page helps estimate how expensive a credit card balance
                  could become over time and whether changing your monthly
                  payment could make a noticeable difference.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  href="/tools/debt-payoff-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Build a debt payoff plan
                </Link>

                <Link
                  href="/tools/debt-snowball-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Try the debt snowball calculator
                </Link>

                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Check what payment fits your budget
                </Link>

                <Link
                  href="/guides/debt-snowball-vs-avalanche-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Read the snowball vs avalanche guide
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="First month interest estimate"
                value={formatGBP(result.interestFirstMonth)}
                description="This shows what interest alone could add in the first month."
              />

              <ResultCard
                icon={<CreditCard className="h-5 w-5" />}
                label="Estimated time to repay"
                value={formatMonths(result.monthsToRepay)}
                description="Estimated payoff time based on the payment entered."
              />
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Credit card summary
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
                <InfoRow
                  label="Current payment"
                  value={`${formatGBP(monthlyPayment)}/month`}
                  text="Your current repayment setup based on the amount entered."
                />

                <InfoRow
                  label="Try paying"
                  value={`${formatGBP(result.fasterPayment)}/month`}
                  text="A modest increase may reduce both payoff time and total interest."
                />

                <InfoRow
                  label="With the higher payment"
                  value={
                    fasterPlan.months === Infinity
                      ? "Not enough"
                      : formatMonths(fasterPlan.months)
                  }
                  text="Estimated payoff time if the payment increased."
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                First month breakdown
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Interest portion"
                  value={formatGBP(result.interestFirstMonth)}
                />

                <InfoRow
                  label="Balance reduction"
                  value={formatGBP(result.principalFirstMonth)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <AdsenseAd
          slot="1894419213"
          className="overflow-hidden rounded-3xl bg-white"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            How credit card interest works
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              Credit card interest is usually based on the balance carried over
              and the card APR. If the balance is not cleared in full, interest
              may be added and can make the debt more expensive over time.
            </p>

            <p className="leading-7">
              The monthly payment matters because part of each payment may go
              towards interest before reducing the balance. When the payment is
              only slightly higher than the interest added, progress can feel
              slow.
            </p>

            <p className="leading-7">
              This calculator is designed to show the relationship between
              balance, APR and monthly payment. It gives general estimates only
              and does not replace advice from a qualified debt adviser.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="APR matters"
              text="A higher APR can increase the amount of interest added each month."
            />
            <InfoCard
              title="Payments matter"
              text="Higher monthly payments may reduce both the repayment time and total interest."
            />
            <InfoCard
              title="Balances matter"
              text="Larger balances can take longer to clear, especially when the monthly payment is low."
            />
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
                Together, they give a clearer picture of how the balance may
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
              <FAQ
                question="Why is my credit card balance going down so slowly?"
                answer="With higher APRs, a large part of the payment may go to interest first, especially early on."
              />
              <FAQ
                question="What happens if I only pay a small amount?"
                answer="Repayment may take much longer, and the total interest paid could rise significantly."
              />
              <FAQ
                question="Is increasing my payment worth it?"
                answer="Often yes. Even a relatively small increase may reduce both the repayment term and the total interest paid."
              />
              <FAQ
                question="Is this calculator financial advice?"
                answer="No. This calculator gives a general estimate only and does not provide personal financial advice."
              />
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
                href="/tools/debt-payoff-calculator"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Debt payoff calculator
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
            title: "Debt Payoff Calculator",
            description:
              "Estimate how long it could take to clear a debt with extra payments.",
            href: "/tools/debt-payoff-calculator",
          },
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
            title: "Debt Snowball vs Avalanche UK Guide",
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

function ResultCard({
  icon,
  label,
  value,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
        {icon}
      </div>
      <p className="mt-4 text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}

function InfoRow({
  label,
  value,
  text,
}: {
  label: string;
  value: string;
  text?: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-100 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      {text ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
      ) : null}
    </div>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-3xl bg-slate-100 p-5">
      <p className="text-lg font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function FAQ({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="rounded-3xl bg-slate-100 p-4">
      <div className="flex items-center gap-2">
        <CircleHelp className="h-4 w-4 text-slate-700" />
        <p className="font-medium text-slate-900">{question}</p>
      </div>
      <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
    </div>
  );
}
