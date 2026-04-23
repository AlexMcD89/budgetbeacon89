"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  PoundSterling,
  ShieldCheck,
  Wallet,
} from "lucide-react";

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function estimateTakeHome(
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

  const totalDeductions =
    incomeTax + nationalInsurance + pension + studentLoanRepayment;

  const annualTakeHome = annualSalary - totalDeductions;

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

export default function SalaryToHourlyPage() {
  const [annualSalary, setAnnualSalary] = useState(32000);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [pensionPct, setPensionPct] = useState(5);
  const [studentLoan, setStudentLoan] = useState(true);

  const result = useMemo(() => {
    const hourlyGross =
      hoursPerWeek > 0 && weeksPerYear > 0
        ? annualSalary / (hoursPerWeek * weeksPerYear)
        : 0;

    const weeklyGross = hoursPerWeek > 0 ? hourlyGross * hoursPerWeek : 0;
    const monthlyGross = annualSalary / 12;

    const takeHome = estimateTakeHome(annualSalary, pensionPct, studentLoan);

    const hourlyTakeHome =
      hoursPerWeek > 0 && weeksPerYear > 0
        ? takeHome.annualTakeHome / (hoursPerWeek * weeksPerYear)
        : 0;

    return {
      hourlyGross,
      weeklyGross,
      monthlyGross,
      annualGross: annualSalary,
      annualTakeHome: takeHome.annualTakeHome,
      monthlyTakeHome: takeHome.monthlyTakeHome,
      hourlyTakeHome,
      deductions: takeHome.deductions,
    };
  }, [annualSalary, hoursPerWeek, weeksPerYear, pensionPct, studentLoan]);

  const applyScenario = (type: "starter" | "average" | "higher") => {
    if (type === "starter") {
      setAnnualSalary(24000);
      setHoursPerWeek(40);
      setWeeksPerYear(52);
      setPensionPct(5);
      setStudentLoan(false);
    }

    if (type === "average") {
      setAnnualSalary(32000);
      setHoursPerWeek(40);
      setWeeksPerYear(52);
      setPensionPct(5);
      setStudentLoan(true);
    }

    if (type === "higher") {
      setAnnualSalary(50000);
      setHoursPerWeek(40);
      setWeeksPerYear(52);
      setPensionPct(5);
      setStudentLoan(true);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Income tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Salary to Hourly Calculator (UK)
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Convert an annual salary into an estimated hourly rate, weekly
              pay, and monthly pay, with an estimated take-home view after tax,
              National Insurance, pension, and optional student loan deductions.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("starter")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Starter salary
              </button>
              <button
                onClick={() => applyScenario("average")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Average
              </button>
              <button
                onClick={() => applyScenario("higher")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Higher salary
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Annual salary (£)
                </label>
                <input
                  type="number"
                  value={annualSalary}
                  onChange={(e) => setAnnualSalary(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Hours per week
                </label>
                <input
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Weeks per year
                </label>
                <input
                  type="number"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
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
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-3xl bg-slate-100 p-4">
              <div>
                <p className="text-sm font-medium text-slate-900">
                  Include student loan repayments
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Toggle this on for a more realistic estimated net hourly rate.
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
                  <Clock className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Hourly gross rate</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.hourlyGross)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated hourly pay before deductions.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Wallet className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Hourly take-home</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.hourlyTakeHome)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated hourly pay after key deductions.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PoundSterling className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Weekly gross pay</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.weeklyGross)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated weekly pay based on your hours.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Monthly take-home</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.monthlyTakeHome)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated monthly income after deductions.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Estimated deductions
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Income tax
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.deductions.incomeTax)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    National Insurance
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.deductions.nationalInsurance)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Pension
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.deductions.pension)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Student loan
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.deductions.studentLoanRepayment)}
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
                This page is useful when comparing salaries against hourly-paid
                roles, understanding what a full-time salary looks like on an
                hourly basis, and estimating what that may mean after
                deductions.
              </p>
              <p className="leading-7">
                Gross hourly rate is useful for comparison, but estimated net
                hourly rate often gives a more realistic picture of what work is
                actually worth to you day to day.
              </p>
              <p className="leading-7">
                Use the take-home numbers for budgeting, rent checks, debt
                planning, and savings decisions.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Related next steps
            </h2>
            <div className="mt-5 space-y-3">
              <Link
                href="/tools/hourly-to-salary-calculator"
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
              >
                <p className="font-medium text-slate-900">
                  Hourly to Salary Calculator
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Convert the other way round and compare both views.
                </p>
              </Link>

              <Link
                href="/tools/take-home-pay-calculator-uk"
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
              >
                <p className="font-medium text-slate-900">
                  Take-Home Pay Calculator UK
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Go deeper into salary-based take-home estimates.
                </p>
              </Link>

              <Link
                href="/tools/monthly-budget-planner"
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
              >
                <p className="font-medium text-slate-900">
                  Monthly Budget Planner
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Use your monthly take-home estimate to plan spending.
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/hourly-to-salary-calculator"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Convert hourly to salary
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/tools/take-home-pay-calculator-uk"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Calculate take-home pay
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
