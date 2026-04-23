"use client";

import RelatedLinks from "@/components/related-links";
import ToolDisclaimer from "@/components/tool-disclaimer";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  Home,
  ShieldCheck,
  Wallet,
} from "lucide-react";

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function calculateMonthlyTakeHome(
  annualSalary: number,
  pensionPct: number,
  studentLoan: boolean,
) {
  const personalAllowance = 12570;
  const taxableIncome = Math.max(0, annualSalary - personalAllowance);

  const basicBand = Math.min(taxableIncome, 37700);
  const higherBand = Math.max(0, taxableIncome - 37700);

  const incomeTax = basicBand * 0.2 + higherBand * 0.4;
  const nationalInsurance = Math.max(0, annualSalary - 12570) * 0.08;
  const pension = annualSalary * (pensionPct / 100);
  const studentLoanRepayment = studentLoan
    ? Math.max(0, annualSalary - 27295) * 0.09
    : 0;

  const annualTakeHome =
    annualSalary -
    incomeTax -
    nationalInsurance -
    pension -
    studentLoanRepayment;

  return {
    annualTakeHome,
    monthlyTakeHome: annualTakeHome / 12,
    deductions: {
      incomeTax,
      nationalInsurance,
      pension,
      studentLoanRepayment,
    },
  };
}

export default function RentAffordabilityCalculatorPage() {
  const [salary, setSalary] = useState(42000);
  const [partnerSalary, setPartnerSalary] = useState(0);
  const [monthlyDebt, setMonthlyDebt] = useState(250);
  const [monthlyBills, setMonthlyBills] = useState(450);
  const [pensionPct, setPensionPct] = useState(5);
  const [studentLoan, setStudentLoan] = useState(true);
  const [targetRent, setTargetRent] = useState(1200);

  const result = useMemo(() => {
    const combinedSalary = salary + partnerSalary;

    const takeHome = calculateMonthlyTakeHome(
      combinedSalary,
      pensionPct,
      studentLoan,
    );

    const monthlyIncome = takeHome.monthlyTakeHome;

    const safeRent = Math.max(0, monthlyIncome * 0.3 - monthlyDebt * 0.15);
    const balancedRent = Math.max(0, monthlyIncome * 0.35 - monthlyDebt * 0.1);
    const stretchRent = Math.max(0, monthlyIncome * 0.4 - monthlyDebt * 0.05);

    const totalCommitted = targetRent + monthlyDebt + monthlyBills;
    const moneyLeft = monthlyIncome - totalCommitted;
    const rentShare =
      monthlyIncome > 0 ? (targetRent / monthlyIncome) * 100 : 0;
    const debtShare =
      monthlyIncome > 0 ? (monthlyDebt / monthlyIncome) * 100 : 0;

    let status = "Healthier range";
    let summary =
      "Based on the figures entered, this rent level may be reasonably manageable for some households.";

    if (rentShare > 40 || moneyLeft < 250) {
      status = "Stretched range";
      summary =
        "Based on the figures entered, this rent level may feel stretched and could leave limited room for rising bills or unexpected costs.";
    } else if (rentShare > 33 || moneyLeft < 500) {
      status = "Tighter range";
      summary =
        "Based on the figures entered, this rent level may be possible, but monthly breathing room looks more limited.";
    }

    const extraRentGap = targetRent - balancedRent;
    const estimatedExtraSalaryNeeded =
      extraRentGap > 0 ? (extraRentGap * 12) / 0.68 : 0;
    const estimatedDebtReductionNeeded = extraRentGap > 0 ? extraRentGap : 0;

    return {
      combinedSalary,
      monthlyIncome,
      safeRent,
      balancedRent,
      stretchRent,
      moneyLeft,
      rentShare,
      debtShare,
      status,
      summary,
      estimatedExtraSalaryNeeded,
      estimatedDebtReductionNeeded,
      deductions: takeHome.deductions,
    };
  }, [
    salary,
    partnerSalary,
    monthlyDebt,
    monthlyBills,
    pensionPct,
    studentLoan,
    targetRent,
  ]);

  const score = Math.max(
    8,
    Math.min(
      96,
      Math.round(
        100 -
          result.rentShare * 1.3 -
          result.debtShare * 0.8 +
          Math.min(result.moneyLeft / 50, 18),
      ),
    ),
  );

  const applyScenario = (type: "solo" | "couple" | "london") => {
    if (type === "solo") {
      setSalary(42000);
      setPartnerSalary(0);
      setMonthlyDebt(250);
      setMonthlyBills(450);
      setPensionPct(5);
      setStudentLoan(true);
      setTargetRent(1200);
    }

    if (type === "couple") {
      setSalary(38000);
      setPartnerSalary(28000);
      setMonthlyDebt(300);
      setMonthlyBills(650);
      setPensionPct(5);
      setStudentLoan(false);
      setTargetRent(1650);
    }

    if (type === "london") {
      setSalary(52000);
      setPartnerSalary(0);
      setMonthlyDebt(220);
      setMonthlyBills(520);
      setPensionPct(5);
      setStudentLoan(true);
      setTargetRent(1750);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Housing tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Rent Affordability Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use this UK rent affordability calculator to estimate a safer rent
              range based on your take-home pay, monthly debt, regular bills,
              and target rent. It is designed to give general guidance and more
              useful context than a single flat percentage.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("solo")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Solo renter
              </button>
              <button
                onClick={() => applyScenario("couple")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Couple
              </button>
              <button
                onClick={() => applyScenario("london")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                London example
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Your annual salary
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none ring-0 transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Partner annual salary
                </label>
                <input
                  type="number"
                  value={partnerSalary}
                  onChange={(e) => setPartnerSalary(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none ring-0 transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Monthly debt payments
                </label>
                <input
                  type="number"
                  value={monthlyDebt}
                  onChange={(e) => setMonthlyDebt(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none ring-0 transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Other monthly bills
                </label>
                <input
                  type="number"
                  value={monthlyBills}
                  onChange={(e) => setMonthlyBills(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none ring-0 transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Pension contribution %
                </label>
                <input
                  type="number"
                  value={pensionPct}
                  onChange={(e) => setPensionPct(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none ring-0 transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Target monthly rent
                </label>
                <input
                  type="number"
                  value={targetRent}
                  onChange={(e) => setTargetRent(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none ring-0 transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-3xl bg-slate-100 p-4">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Include student loan repayments
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Turn this on if you want them included in the estimate.
                </p>
              </div>

              <button
                onClick={() => setStudentLoan(!studentLoan)}
                className={`rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
                  studentLoan
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                }`}
              >
                {studentLoan ? "On" : "Off"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Wallet className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Estimated monthly take-home
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.monthlyIncome)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Based on the salary, pension, and student loan settings
                  entered.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Home className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Balanced rent estimate
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.balancedRent)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  An indicative range that may leave more monthly breathing
                  room.
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
                    Affordability score: {score}/100
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Safer range
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.safeRent)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Balanced range
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.balancedRent)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Stretch range
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.stretchRent)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                What the estimate suggests
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Target rent share</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {result.rentShare.toFixed(1)}%
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This shows how much of monthly take-home pay would go toward
                    rent.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Estimated money left after essentials
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.moneyLeft)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This is what may be left after target rent, debt payments,
                    and regular bills.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    If the target rent feels stretched
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    To make {formatGBP(targetRent)} feel closer to the balanced
                    range, you may need around{" "}
                    <span className="font-semibold text-slate-900">
                      {formatGBP(result.estimatedExtraSalaryNeeded)}
                    </span>{" "}
                    more annual income, or monthly debt costs may need to fall
                    by around{" "}
                    <span className="font-semibold text-slate-900">
                      {formatGBP(result.estimatedDebtReductionNeeded)}
                    </span>
                    .
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
              How to use this rent affordability result
            </h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p className="leading-7">
                A balanced result may leave more room for everyday spending,
                irregular costs, and some flexibility each month.
              </p>
              <p className="leading-7">
                If your target rent sits above the balanced range, that does not
                automatically mean it is impossible. It usually means the
                trade-offs become more significant.
              </p>
              <p className="leading-7">
                A rent level can look affordable on paper while still feeling
                uncomfortable in real life, especially where debt, commuting, or
                utility bills are already high.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Rent affordability calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    How much of income should go on rent in the UK?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  A commonly used benchmark is around 30% to 35% of take-home
                  pay, but debts, bills, and location can make a big difference.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Can couples use this calculator?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Yes. Adding both salaries can give a more realistic estimate
                  of combined affordability.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Does this include bills?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Yes. The calculator separates rent from monthly bills so you
                  can see the broader impact more clearly.
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
                Keep exploring your monthly numbers
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                A useful next step after this page is often checking your
                take-home pay or mapping the full picture with a monthly budget
                planner.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/take-home-pay-calculator-uk"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Take-home pay tool
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
        heading="Related next steps"
        links={[
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Work out your estimated monthly income before comparing housing costs.",
            href: "/tools/take-home-pay-calculator-uk",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "See whether your target rent still leaves enough room in your monthly plan.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Mortgage Affordability Calculator UK",
            description:
              "Compare renting affordability with what buying could look like.",
            href: "/tools/mortgage-affordability-calculator-uk",
          },
          {
            title: "How Much Rent Can I Afford in the UK?",
            description:
              "Read the supporting guide behind this calculator and explore the wider context.",
            href: "/guides/how-much-rent-can-i-afford-uk",
          },
        ]}
      />

      <ToolDisclaimer />
    </main>
  );
}
