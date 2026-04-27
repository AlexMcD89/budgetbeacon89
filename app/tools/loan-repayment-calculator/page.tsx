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

function monthlyPayment(loanAmount: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  if (loanAmount <= 0 || years <= 0) return 0;
  if (monthlyRate === 0) return loanAmount / totalPayments;

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

    const shorterTermInterest =
      shorterTermPayment * Math.max(1, loanYears - 1) * 12 - loanAmount;

    const interestSavedByShorterTerm = totalInterest - shorterTermInterest;

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
              total cost, and total interest over time. Compare different loan
              terms and see how repayments may affect your monthly budget.
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
                <InputField
                  label="Loan amount"
                  value={loanAmount}
                  onChange={setLoanAmount}
                />

                <InputField
                  label="Interest rate %"
                  value={interestRate}
                  onChange={setInterestRate}
                  step="0.1"
                />

                <InputField
                  label="Repayment term (years)"
                  value={loanYears}
                  onChange={setLoanYears}
                />

                <InputField
                  label="Monthly income"
                  value={monthlyIncome}
                  onChange={setMonthlyIncome}
                />

                <div className="sm:col-span-2">
                  <InputField
                    label="Other monthly debt payments"
                    value={otherDebt}
                    onChange={setOtherDebt}
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

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  href="/tools/credit-card-interest-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Compare with credit card interest
                </Link>

                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Check the repayment against your budget
                </Link>

                <Link
                  href="/tools/debt-payoff-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Build a wider debt payoff plan
                </Link>

                <Link
                  href="/tools/take-home-pay-calculator-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Estimate your monthly take-home pay
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Monthly repayment"
                value={formatGBP(result.monthlyRepayment)}
                description="Estimated monthly payment based on the figures entered."
              />

              <ResultCard
                icon={<CreditCard className="h-5 w-5" />}
                label="Total interest"
                value={formatGBP(result.totalInterest)}
                description="Estimated interest cost across the full term."
              />
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Loan repayment summary
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
                <SummaryBox
                  label="Total paid"
                  value={formatGBP(result.totalPaid)}
                />

                <SummaryBox
                  label="Debt share of income"
                  value={`${result.debtShare.toFixed(1)}%`}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                What changing the term may do
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Shorter term"
                  value={`${formatGBP(result.shorterTermPayment)}/month`}
                  text="Higher monthly repayments, but often less interest overall."
                />

                <InfoRow
                  label="Longer term"
                  value={`${formatGBP(result.longerTermPayment)}/month`}
                  text="Lower monthly repayments, but often more total interest."
                />

                <InfoRow
                  label="Interest saved by going shorter"
                  value={formatGBP(
                    Math.max(0, result.interestSavedByShorterTerm),
                  )}
                  text="Useful for comparing monthly comfort against longer-term cost."
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
            How loan repayments are calculated
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              Loan repayments usually depend on the amount borrowed, the
              interest rate, and the repayment term. A shorter term often means
              higher monthly payments but less total interest. A longer term may
              reduce the monthly payment but can increase the total amount paid.
            </p>

            <p className="leading-7">
              This calculator estimates fixed monthly repayments using a
              standard repayment formula. It can be useful for comparing
              personal loans, car loans, and other fixed-term borrowing.
            </p>

            <p className="leading-7">
              The figures are estimates only. Real loan costs may vary depending
              on lender fees, repayment rules, early repayment charges, credit
              profile, and whether the rate is fixed or variable.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Loan amount"
              text="The amount borrowed affects both monthly repayment and total cost."
            />
            <InfoCard
              title="Interest rate"
              text="A higher rate usually means higher monthly repayments and more total interest."
            />
            <InfoCard
              title="Loan term"
              text="Longer terms may lower monthly payments but often increase total interest."
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
                A lower monthly repayment can look attractive, but extending the
                loan term often means paying more interest overall.
              </p>
              <p className="leading-7">
                The most useful comparison is often the one that balances
                monthly affordability with the total cost of borrowing, rather
                than focusing only on the lowest payment.
              </p>
              <p className="leading-7">
                This calculator gives estimates only and does not provide
                personal financial advice.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Loan repayment calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="Is a longer loan term better?"
                answer="It may reduce the monthly payment, but it often increases the total interest paid."
              />
              <FAQ
                question="What matters more: payment or total interest?"
                answer="Both matter. A useful comparison usually balances current affordability with the longer-term cost of borrowing."
              />
              <FAQ
                question="Should I compare this with my other debts?"
                answer="Yes. A loan that looks manageable on its own may feel quite different once other monthly debt payments are included."
              />
              <FAQ
                question="Is this calculator financial advice?"
                answer="No. This calculator gives a general estimate only and should not be treated as personal financial advice."
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
                href="/tools/monthly-budget-planner"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Budget planner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/tools/take-home-pay-calculator-uk"
                className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Take-home pay
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
            title: "Debt Payoff Calculator",
            description:
              "Estimate how extra payments may change your debt-free date.",
            href: "/tools/debt-payoff-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "See how your loan payment affects the rest of your monthly finances.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Debt Snowball vs Avalanche UK Guide",
            description: "Learn which debt strategy may suit you best.",
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

function InfoRow({
  label,
  value,
  text,
}: {
  label: string;
  value: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-100 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">{value}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
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
