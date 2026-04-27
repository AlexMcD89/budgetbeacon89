"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
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
      status = "Payment may be too low";
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
              Debt Payoff Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate how long it could take to pay off debt, how much interest
              you may pay, and how much faster you could become debt-free by
              adding an extra monthly payment.
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
                <InputField
                  label="Debt balance (£)"
                  value={debtBalance}
                  onChange={setDebtBalance}
                />

                <InputField
                  label="Interest rate / APR %"
                  value={apr}
                  onChange={setApr}
                  step="0.1"
                />

                <InputField
                  label="Monthly payment (£)"
                  value={monthlyPayment}
                  onChange={setMonthlyPayment}
                />

                <InputField
                  label="Extra monthly payment (£)"
                  value={extraPayment}
                  onChange={setExtraPayment}
                />

                <div className="sm:col-span-2">
                  <InputField
                    label="Monthly income (£)"
                    value={monthlyIncome}
                    onChange={setMonthlyIncome}
                  />
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-slate-100 p-5">
                <p className="text-sm font-medium text-slate-900">
                  What this tool helps with
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Use this calculator to compare your current payoff plan with a
                  faster plan that includes extra monthly payments. It can help
                  show how much time and interest extra repayments may save.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  href="/tools/debt-snowball-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Try the debt snowball calculator
                </Link>

                <Link
                  href="/tools/credit-card-interest-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Check credit card interest
                </Link>

                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Find extra money in your budget
                </Link>

                <Link
                  href="/guides/debt-snowball-vs-avalanche-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Read snowball vs avalanche guide
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<CalendarClock className="h-5 w-5" />}
                label="Current payoff time"
                value={formatMonths(result.currentPlan.months)}
                description="Based on your normal monthly payment."
              />

              <ResultCard
                icon={<ShieldCheck className="h-5 w-5" />}
                label="Faster payoff time"
                value={formatMonths(result.fasterPlan.months)}
                description="Based on your normal payment plus extra payment."
              />
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
                <SummaryBox
                  label="Interest saved"
                  value={formatGBP(result.interestSaved)}
                />

                <SummaryBox
                  label="Time saved"
                  value={formatMonths(result.monthsSaved)}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                First month breakdown
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="First month interest"
                  value={formatGBP(result.firstMonthInterest)}
                />

                <InfoRow
                  label="Balance reduction with normal payment"
                  value={formatGBP(result.currentPrincipal)}
                />

                <InfoRow
                  label="Balance reduction with extra payment"
                  value={formatGBP(result.fasterPrincipal)}
                />
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

      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <AdsenseAd
          slot="1894419213"
          className="overflow-hidden rounded-3xl bg-white"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            How debt payoff calculations work
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              Debt payoff depends mainly on your balance, interest rate and
              monthly payment. When the interest rate is high, more of each
              payment may go towards interest before the balance starts falling.
            </p>

            <p className="leading-7">
              This calculator compares your current repayment plan with a faster
              plan that includes an extra monthly payment. The difference can
              show how much time and interest may be saved by increasing
              repayments.
            </p>

            <p className="leading-7">
              The figures are estimates only. Real repayment costs can vary
              depending on lender rules, fees, promotional rates and whether
              interest is calculated daily or monthly.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Balance matters"
              text="A larger starting balance usually takes longer to clear and can create more total interest."
            />
            <InfoCard
              title="APR matters"
              text="Higher interest rates can make debt more expensive and slow down progress."
            />
            <InfoCard
              title="Extra payments help"
              text="Adding even a modest extra payment can reduce both time and interest."
            />
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
                The most useful figures are payoff time, total interest and how
                much of your first payment actually reduces the balance.
              </p>

              <p className="leading-7">
                If your payment is barely above the monthly interest, progress
                can feel very slow. Increasing payments or lowering the interest
                rate can make a big difference.
              </p>

              <p className="leading-7">
                This calculator gives estimates only and does not provide
                personal financial advice.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Debt payoff calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="Why does debt take so long to clear?"
                answer="High interest can absorb a large part of each payment, especially early on when the balance is highest."
              />

              <FAQ
                question="Is paying extra worth it?"
                answer="Extra payments can reduce the balance faster, which may lower future interest and shorten the payoff time."
              />

              <FAQ
                question="Should I use snowball or avalanche?"
                answer="Snowball focuses on smaller debts first for motivation, while avalanche targets higher-interest debts first to reduce cost."
              />

              <FAQ
                question="Is this calculator financial advice?"
                answer="No. It provides a general estimate only and should not be treated as personal financial advice."
              />
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

      <RelatedLinks
        heading="Related debt tools and guides"
        links={[
          {
            title: "Debt Snowball Calculator",
            description:
              "Build a payoff order by targeting the smallest debt first.",
            href: "/tools/debt-snowball-calculator",
          },
          {
            title: "Credit Card Interest Calculator",
            description:
              "Estimate credit card interest and payoff time from APR and payment.",
            href: "/tools/credit-card-interest-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "Find out how much extra money you could put towards debt.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Debt Snowball vs Avalanche UK",
            description:
              "Compare two common debt payoff methods and how they differ.",
            href: "/guides/debt-snowball-vs-avalanche-uk",
          },
        ]}
      />

      <ToolDisclaimer />
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
  step,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: string;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
      />
    </div>
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

function SummaryBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-slate-100 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
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
