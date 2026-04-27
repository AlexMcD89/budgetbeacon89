"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CircleHelp,
  Home,
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

function monthlyMortgagePayment(
  loanAmount: number,
  annualRate: number,
  years: number,
) {
  const monthlyRate = annualRate / 100 / 12;
  const payments = years * 12;

  if (loanAmount <= 0 || years <= 0) return 0;
  if (monthlyRate === 0) return loanAmount / payments;

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
  if (!Number.isFinite(months)) return "Not clearing";

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
              Mortgage Overpayment Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate how much interest you could save and how much sooner you
              could clear your mortgage by making regular monthly overpayments
              or a one-off lump sum.
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
                <InputField
                  label="Current mortgage balance (£)"
                  value={mortgageBalance}
                  onChange={setMortgageBalance}
                />

                <InputField
                  label="Interest rate %"
                  value={interestRate}
                  onChange={setInterestRate}
                  step="0.1"
                />

                <InputField
                  label="Remaining term (years)"
                  value={remainingYears}
                  onChange={setRemainingYears}
                />

                <InputField
                  label="Monthly overpayment (£)"
                  value={monthlyOverpayment}
                  onChange={setMonthlyOverpayment}
                />

                <div className="sm:col-span-2">
                  <InputField
                    label="One-off overpayment (£)"
                    value={oneOffOverpayment}
                    onChange={setOneOffOverpayment}
                  />
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-slate-100 p-5">
                <p className="text-sm font-medium text-slate-900">
                  Important note
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Many mortgage deals have annual overpayment limits, often
                  around 10% of the balance, but this varies by lender and
                  product. Always check your own mortgage terms before making
                  overpayments.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  href="/tools/mortgage-affordability-calculator-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Check mortgage affordability
                </Link>

                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Compare overpayments with your budget
                </Link>

                <Link
                  href="/tools/emergency-fund-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Check your emergency fund target
                </Link>

                <Link
                  href="/tools/savings-goal-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Compare with a savings goal
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Interest saved"
                value={formatGBP(result.interestSaved)}
                description="Estimated reduction in total interest."
              />

              <ResultCard
                icon={<CalendarClock className="h-5 w-5" />}
                label="Time saved"
                value={formatYearsMonths(result.monthsSaved)}
                description="Estimated time cut from your mortgage term."
              />
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
                <SummaryBox
                  label="Without overpayments"
                  value={formatYearsMonths(result.withoutOverpayment.months)}
                  note={`Interest: ${formatGBP(
                    result.withoutOverpayment.totalInterest,
                  )}`}
                />

                <SummaryBox
                  label="With overpayments"
                  value={formatYearsMonths(result.withOverpayment.months)}
                  note={`Interest: ${formatGBP(
                    result.withOverpayment.totalInterest,
                  )}`}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Overpayment allowance check
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Planned annual overpayment"
                  value={formatGBP(result.annualOverpayment)}
                  text="Monthly overpayments plus any one-off overpayment entered."
                />

                <InfoRow
                  label="Example 10% allowance"
                  value={formatGBP(result.typicalAllowance)}
                  text="A rough reference only. Your actual allowance may differ."
                />

                <InfoRow
                  label="Allowance position"
                  value={
                    result.overAllowance > 0
                      ? `${formatGBP(result.overAllowance)} over`
                      : `${formatGBP(result.allowanceRemaining)} remaining`
                  }
                  text="Your lender may use different rules or charge early repayment fees."
                />
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

      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <AdsenseAd
          slot="1894419213"
          className="overflow-hidden rounded-3xl bg-white"
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-3xl font-semibold tracking-tight">
            How mortgage overpayments work
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              A mortgage overpayment is an extra payment made on top of your
              normal monthly mortgage payment. Because it reduces the remaining
              balance, less interest may build in future months.
            </p>

            <p className="leading-7">
              Regular monthly overpayments can be easier to budget for, while a
              one-off lump sum can have an immediate effect on the balance. The
              earlier an overpayment is made, the longer it has to reduce future
              interest.
            </p>

            <p className="leading-7">
              This calculator gives a general estimate only. Your actual savings
              may vary depending on your lender, mortgage product, interest
              calculation, overpayment rules and any early repayment charges.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Monthly overpayments"
              text="Extra regular payments can gradually reduce your balance and interest."
            />
            <InfoCard
              title="Lump sums"
              text="A one-off overpayment can reduce the balance immediately."
            />
            <InfoCard
              title="Allowance limits"
              text="Many mortgage products limit how much you can overpay without charges."
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
            <h2 className="text-2xl font-semibold tracking-tight">
              Mortgage overpayment calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="Is it worth overpaying my mortgage?"
                answer="It can be, especially if it reduces interest and shortens the term, but it depends on your mortgage rate, savings needs, and any overpayment charges."
              />

              <FAQ
                question="What is a common overpayment limit?"
                answer="Many deals allow around 10% of the balance per year without a charge, but the exact rule depends on your lender and product."
              />

              <FAQ
                question="Should I overpay monthly or make a lump sum?"
                answer="Both can help. Earlier overpayments usually reduce interest sooner, but you should keep enough cash for emergencies."
              />

              <FAQ
                question="Is this calculator mortgage advice?"
                answer="No. This calculator gives a general estimate only and should not be treated as mortgage advice."
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
                Compare overpayments with your wider plan
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                A useful next step is checking your monthly budget, emergency
                savings target, or overall mortgage affordability.
              </p>
            </div>

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
        </div>
      </section>

      <RelatedLinks
        heading="Related mortgage and budget tools"
        links={[
          {
            title: "Mortgage Affordability Calculator UK",
            description:
              "Estimate possible borrowing, property price and monthly affordability.",
            href: "/tools/mortgage-affordability-calculator-uk",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "Check whether overpayments fit into your monthly cash flow.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Emergency Fund Calculator",
            description:
              "Compare mortgage overpayments with your emergency savings target.",
            href: "/tools/emergency-fund-calculator",
          },
          {
            title: "Stamp Duty Calculator UK",
            description:
              "Estimate property purchase tax for England and Northern Ireland.",
            href: "/tools/stamp-duty-calculator-uk",
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

function SummaryBox({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      {note ? <p className="mt-2 text-xs text-slate-300">{note}</p> : null}
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
