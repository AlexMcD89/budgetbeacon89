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
  };
}

export default function OvertimePayCalculatorPage() {
  const [hourlyRate, setHourlyRate] = useState(15);
  const [overtimeHours, setOvertimeHours] = useState(10);
  const [overtimeMultiplier, setOvertimeMultiplier] = useState(1.5);
  const [periodsPerMonth, setPeriodsPerMonth] = useState(4);
  const [annualBaseSalary, setAnnualBaseSalary] = useState(30000);
  const [pensionPct, setPensionPct] = useState(5);
  const [studentLoan, setStudentLoan] = useState(true);

  const result = useMemo(() => {
    const overtimeRate = hourlyRate * overtimeMultiplier;
    const overtimePayPerPeriod = overtimeRate * overtimeHours;
    const overtimePayMonthly = overtimePayPerPeriod * periodsPerMonth;
    const overtimePayAnnual = overtimePayMonthly * 12;

    const totalAnnualGross = annualBaseSalary + overtimePayAnnual;
    const totalMonthlyGross = totalAnnualGross / 12;

    const takeHome = estimateTakeHome(
      totalAnnualGross,
      pensionPct,
      studentLoan,
    );
    const baseTakeHome = estimateTakeHome(
      annualBaseSalary,
      pensionPct,
      studentLoan,
    );

    const extraMonthlyTakeHome =
      takeHome.monthlyTakeHome - baseTakeHome.monthlyTakeHome;

    let status = "Useful boost";
    let summary =
      "This amount of overtime gives a meaningful increase to monthly earnings without needing a full salary change.";

    if (extraMonthlyTakeHome > 600) {
      status = "Strong boost";
      summary =
        "This overtime pattern creates a strong uplift in monthly income and could make a noticeable difference to savings or debt reduction.";
    } else if (extraMonthlyTakeHome < 150) {
      status = "Modest uplift";
      summary =
        "This overtime still helps, but the extra take-home may feel smaller than the gross figure suggests once deductions are included.";
    }

    return {
      overtimeRate,
      overtimePayPerPeriod,
      overtimePayMonthly,
      overtimePayAnnual,
      totalAnnualGross,
      totalMonthlyGross,
      monthlyTakeHome: takeHome.monthlyTakeHome,
      annualTakeHome: takeHome.annualTakeHome,
      extraMonthlyTakeHome,
      status,
      summary,
    };
  }, [
    hourlyRate,
    overtimeHours,
    overtimeMultiplier,
    periodsPerMonth,
    annualBaseSalary,
    pensionPct,
    studentLoan,
  ]);

  const applyScenario = (type: "basic" | "weekend" | "heavy") => {
    if (type === "basic") {
      setHourlyRate(15);
      setOvertimeHours(10);
      setOvertimeMultiplier(1.5);
      setPeriodsPerMonth(4);
      setAnnualBaseSalary(30000);
      setPensionPct(5);
      setStudentLoan(true);
    }

    if (type === "weekend") {
      setHourlyRate(18);
      setOvertimeHours(8);
      setOvertimeMultiplier(2);
      setPeriodsPerMonth(4);
      setAnnualBaseSalary(34000);
      setPensionPct(5);
      setStudentLoan(true);
    }

    if (type === "heavy") {
      setHourlyRate(20);
      setOvertimeHours(15);
      setOvertimeMultiplier(1.5);
      setPeriodsPerMonth(4);
      setAnnualBaseSalary(38000);
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
              Overtime Pay Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate overtime pay based on your hourly rate, overtime
              multiplier, and hours worked, then see how it may affect your
              gross and estimated take-home pay.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("basic")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Standard overtime
              </button>
              <button
                onClick={() => applyScenario("weekend")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Weekend rate
              </button>
              <button
                onClick={() => applyScenario("heavy")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Heavier overtime
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Hourly rate (£)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Overtime hours per period
                </label>
                <input
                  type="number"
                  value={overtimeHours}
                  onChange={(e) => setOvertimeHours(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Overtime multiplier
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={overtimeMultiplier}
                  onChange={(e) =>
                    setOvertimeMultiplier(Number(e.target.value))
                  }
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Overtime periods per month
                </label>
                <input
                  type="number"
                  value={periodsPerMonth}
                  onChange={(e) => setPeriodsPerMonth(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Base annual salary (£)
                </label>
                <input
                  type="number"
                  value={annualBaseSalary}
                  onChange={(e) => setAnnualBaseSalary(Number(e.target.value))}
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
                  Toggle this on for a more realistic net estimate.
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
                <p className="mt-4 text-sm text-slate-500">Overtime rate</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.overtimeRate)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Your estimated overtime hourly rate.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PoundSterling className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Monthly overtime pay
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.overtimePayMonthly)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated extra gross pay per month from overtime.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <Wallet className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Extra monthly take-home
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.extraMonthlyTakeHome)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated net monthly uplift after deductions.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Total monthly take-home
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.monthlyTakeHome)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated monthly take-home including overtime.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Overtime summary
              </p>
              <div className="mt-4">
                <p className="text-2xl font-semibold">{result.status}</p>
                <p className="mt-4 text-base leading-7 text-slate-200">
                  {result.summary}
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Annual overtime pay
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.overtimePayAnnual)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Total annual gross
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.totalAnnualGross)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                How to think about overtime
              </h2>
              <div className="mt-5 space-y-4 text-slate-600">
                <p className="leading-7">
                  Gross overtime can look attractive, but the more useful figure
                  is often the extra monthly take-home after deductions.
                </p>
                <p className="leading-7">
                  This page helps you compare that uplift against your existing
                  salary and see whether the extra hours create a meaningful
                  change.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Related next steps
            </h2>
            <div className="mt-5 space-y-3">
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
                href="/tools/hourly-to-salary-calculator"
                className="block rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-slate-100"
              >
                <p className="font-medium text-slate-900">
                  Hourly to Salary Calculator
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Convert a base hourly rate into annual salary.
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
                  Use the extra income estimate to plan your budget.
                </p>
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  How is overtime pay calculated?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Overtime pay is usually based on your hourly rate multiplied
                  by an overtime rate such as 1.5x or 2x.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Why is my extra take-home lower than the gross overtime
                  figure?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Because tax, National Insurance, pension contributions, and
                  student loan repayments may reduce the net amount you keep.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Is overtime worth it?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  That depends on how much extra take-home it adds, how often
                  you work it, and whether it creates a meaningful improvement
                  to your finances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/take-home-pay-calculator-uk"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Calculate take-home pay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/tools/monthly-budget-planner"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Plan your budget
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
