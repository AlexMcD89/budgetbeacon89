"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CircleHelp,
  PiggyBank,
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
        "Your emergency fund is still in the early stage, so building a basic buffer may be useful.";
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
              Emergency Fund Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate how much emergency savings you may need based on your
              essential monthly costs, then see how long it could take to build
              a 3, 6, 9, or 12 month safety buffer.
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
                <InputField
                  label="Rent / mortgage (£)"
                  value={rentMortgage}
                  onChange={setRentMortgage}
                />
                <InputField
                  label="Bills (£)"
                  value={bills}
                  onChange={setBills}
                />
                <InputField
                  label="Groceries (£)"
                  value={groceries}
                  onChange={setGroceries}
                />
                <InputField
                  label="Transport (£)"
                  value={transport}
                  onChange={setTransport}
                />
                <InputField
                  label="Debt payments (£)"
                  value={debtPayments}
                  onChange={setDebtPayments}
                />
                <InputField
                  label="Other essentials (£)"
                  value={otherEssentials}
                  onChange={setOtherEssentials}
                />
                <InputField
                  label="Current emergency savings (£)"
                  value={currentSavings}
                  onChange={setCurrentSavings}
                />
                <InputField
                  label="Monthly saving (£)"
                  value={monthlySaving}
                  onChange={setMonthlySaving}
                />
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
                  This calculator focuses on essential costs you would still
                  need to cover during an emergency, such as housing, bills,
                  food, transport, and debt repayments.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  href="/tools/savings-goal-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Build a savings goal
                </Link>
                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Find room in your monthly budget
                </Link>
                <Link
                  href="/tools/debt-payoff-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Compare with debt payoff
                </Link>
                <Link
                  href="/guides/healthy-savings-rate-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Read the healthy savings guide
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Target emergency fund"
                value={formatGBP(result.selectedTarget)}
                description={`Based on ${targetMonths} months of essential costs.`}
              />

              <ResultCard
                icon={<CalendarClock className="h-5 w-5" />}
                label="Time to target"
                value={
                  result.monthsToTarget === Infinity
                    ? "Not on track"
                    : `${result.monthsToTarget} months`
                }
                description="Based on your current monthly saving."
              />
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
                <SummaryBox
                  label="Monthly essentials"
                  value={formatGBP(result.monthlyEssentials)}
                />
                <SummaryBox
                  label="Gap to target"
                  value={formatGBP(result.gap)}
                />
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
                <InfoRow
                  label="To close the gap in 12 months"
                  value={`${formatGBP(result.monthlyNeeded12Months)}/month`}
                />
                <InfoRow
                  label="To close the gap in 6 months"
                  value={`${formatGBP(result.monthlyNeeded6Months)}/month`}
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
            How much should an emergency fund be?
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              An emergency fund is money set aside for unexpected costs or
              periods where income falls. Common examples include urgent car
              repairs, replacing essential appliances, covering rent or bills
              after job loss, or avoiding extra borrowing during a difficult
              month.
            </p>

            <p className="leading-7">
              Many people use 3 to 6 months of essential expenses as a starting
              benchmark, but the right amount depends on your household, income
              stability, debts, dependants and how quickly you could replace
              income if needed.
            </p>

            <p className="leading-7">
              This calculator gives a general estimate only. It does not provide
              personal financial advice, but it can help you compare different
              emergency fund targets and monthly saving plans.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="3 months"
              text="Can be a useful starter buffer, especially if you are still building savings."
            />
            <InfoCard
              title="6 months"
              text="Often used as a more comfortable emergency fund target."
            />
            <InfoCard
              title="12 months"
              text="May appeal to people with irregular income, dependants or higher fixed costs."
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
                personal financial advice.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Emergency fund calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="How much should I have in an emergency fund?"
                answer="Many people use 3 to 6 months of essential expenses as a starting benchmark, but the right amount depends on your circumstances."
              />
              <FAQ
                question="Should I save before paying off debt?"
                answer="A small starter emergency fund can help avoid relying on more credit, but high-interest debt may also need attention."
              />
              <FAQ
                question="Where should I keep an emergency fund?"
                answer="Emergency money is usually best kept somewhere accessible and low risk, rather than locked away or exposed to large market swings."
              />
              <FAQ
                question="Is this calculator financial advice?"
                answer="No. This calculator provides a general estimate only and should not be treated as personal financial advice."
              />
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

      <RelatedLinks
        heading="Related savings tools and guides"
        links={[
          {
            title: "Savings Goal Calculator",
            description:
              "Work out how long it could take to reach a specific savings target.",
            href: "/tools/savings-goal-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "See how much spare money could go towards your emergency fund.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Healthy Savings Rate UK",
            description:
              "Understand how your saving level compares with your income.",
            href: "/guides/healthy-savings-rate-uk",
          },
          {
            title: "Debt Payoff Calculator",
            description:
              "Compare emergency saving with debt repayment planning.",
            href: "/tools/debt-payoff-calculator",
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
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      <input
        type="number"
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
