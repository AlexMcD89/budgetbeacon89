"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  PoundSterling,
  ShieldCheck,
  Wallet,
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

type TaxResult = {
  annualSalary: number;
  monthlyGross: number;
  annualTakeHome: number;
  monthlyTakeHome: number;
  weeklyTakeHome: number;
  deductions: {
    incomeTax: number;
    nationalInsurance: number;
    pension: number;
    studentLoan: number;
  };
  effectiveTaxRate: number;
};

function calculateTakeHome(
  annualSalary: number,
  pensionPct: number,
  studentLoan: boolean,
): TaxResult {
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

  const totalDeductions =
    incomeTax + nationalInsurance + pension + studentLoanRepayment;

  const annualTakeHome = annualSalary - totalDeductions;
  const monthlyTakeHome = annualTakeHome / 12;
  const weeklyTakeHome = annualTakeHome / 52;

  return {
    annualSalary,
    monthlyGross: annualSalary / 12,
    annualTakeHome,
    monthlyTakeHome,
    weeklyTakeHome,
    deductions: {
      incomeTax,
      nationalInsurance,
      pension,
      studentLoan: studentLoanRepayment,
    },
    effectiveTaxRate:
      annualSalary > 0 ? (totalDeductions / annualSalary) * 100 : 0,
  };
}

export default function TakeHomePayCalculatorPage() {
  const [salary, setSalary] = useState(42000);
  const [pensionPct, setPensionPct] = useState(5);
  const [studentLoan, setStudentLoan] = useState(true);

  const result = useMemo(
    () => calculateTakeHome(salary, pensionPct, studentLoan),
    [salary, pensionPct, studentLoan],
  );

  const moneyScore = Math.max(
    10,
    Math.min(
      95,
      Math.round(
        100 -
          result.effectiveTaxRate * 1.2 -
          pensionPct * 0.8 +
          Math.min(result.monthlyTakeHome / 200, 20),
      ),
    ),
  );

  const monthlyDifference = result.monthlyGross - result.monthlyTakeHome;

  const examples = [
    { label: "Monthly gross", value: formatGBP(result.monthlyGross) },
    { label: "Monthly take-home", value: formatGBP(result.monthlyTakeHome) },
    { label: "Weekly take-home", value: formatGBP(result.weeklyTakeHome) },
    { label: "Annual take-home", value: formatGBP(result.annualTakeHome) },
  ];

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Income tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Take-Home Pay Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Turn your annual salary into a clearer monthly and weekly
              take-home estimate after income tax, National Insurance, pension
              contributions, and optional student loan repayments.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Enter your details
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Annual salary
                </label>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-slate-900"
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
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Include student loan
                </label>
                <div className="mt-2 flex h-12 items-center rounded-2xl bg-slate-100 p-1">
                  <button
                    onClick={() => setStudentLoan(true)}
                    className={`flex-1 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                      studentLoan
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-white"
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setStudentLoan(false)}
                    className={`flex-1 rounded-2xl px-4 py-2 text-sm font-medium transition ${
                      !studentLoan
                        ? "bg-slate-900 text-white"
                        : "text-slate-700 hover:bg-white"
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                What this estimate includes
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                This simplified calculator includes UK income tax, National
                Insurance, pension contributions, and optional student loan
                repayments. It is designed to give a practical estimate for
                planning and comparison.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Wallet className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Monthly take-home</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.monthlyTakeHome)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your estimated take-home pay after key deductions.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PoundSterling className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Annual take-home</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.annualTakeHome)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Useful for yearly planning and financial goals.
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
                  <p className="text-2xl font-semibold">
                    Effective deduction rate:{" "}
                    {result.effectiveTaxRate.toFixed(1)}%
                  </p>
                  <p className="text-sm text-slate-300">
                    Budget score: {moneyScore}/100
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                On a salary of {formatGBP(salary)}, your estimated monthly
                take-home is {formatGBP(result.monthlyTakeHome)}. That means
                around {formatGBP(monthlyDifference)} is going toward tax,
                National Insurance, pension, and any student loan repayments
                each month.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {examples.map((item) => (
                  <div key={item.label} className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                      {item.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Deduction breakdown
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Income tax</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.deductions.incomeTax)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">National Insurance</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.deductions.nationalInsurance)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Pension</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.deductions.pension)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">Student loan</p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.deductions.studentLoan)}
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
              How to use this result
            </h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p className="leading-7">
                Use your monthly take-home number for realistic budgeting, rent
                checks, debt planning, and savings goals. Gross salary is
                useful, but take-home pay is what actually matters for
                day-to-day decisions.
              </p>
              <p className="leading-7">
                If your deduction rate feels higher than expected, pension and
                student loan settings can make a meaningful difference.
              </p>
              <p className="leading-7">
                This page is especially useful as the first step before using
                rent affordability, budget planning, or debt payoff tools.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>

            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">Is this exact?</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  It is a practical estimate rather than a full payroll
                  calculation, but it is useful for planning and comparing
                  scenarios.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Should I use gross or take-home pay for budgeting?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Take-home pay is the better number for budgeting because it
                  reflects what actually reaches your bank account.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <div className="flex items-center gap-2">
                  <CircleHelp className="h-4 w-4 text-slate-700" />
                  <p className="font-medium text-slate-900">
                    Does pension reduce take-home pay?
                  </p>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Yes. Higher pension contributions usually reduce your
                  immediate take-home pay while increasing long-term retirement
                  savings.
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
                Use your take-home pay in the rest of the site
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                A strong next move is checking what rent range fits your pay, or
                using your take-home number to build a monthly budget.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/rent-affordability-calculator-uk"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Rent affordability
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
        heading="Use your take-home pay elsewhere"
        links={[
          {
            title: "Rent Affordability Calculator UK",
            description:
              "Use your monthly take-home pay to judge a safer rent range.",
            href: "/tools/rent-affordability-calculator-uk",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "Build a realistic monthly plan around your take-home income.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Mortgage Affordability Calculator UK",
            description: "Compare income against possible mortgage borrowing.",
            href: "/tools/mortgage-affordability-calculator-uk",
          },
          {
            title: "Healthy Savings Rate UK",
            description: "See how your income connects to saving goals.",
            href: "/guides/healthy-savings-rate-uk",
          },
        ]}
      />
      <ToolDisclaimer />
    </main>
  );
}
