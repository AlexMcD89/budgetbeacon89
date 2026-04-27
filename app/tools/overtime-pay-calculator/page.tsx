"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  Clock,
  PoundSterling,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import RelatedLinks from "@/components/related-links";
import ToolDisclaimer from "@/components/tool-disclaimer";
import AdsenseAd from "@/components/adsense-ad";

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
  const higherBand = Math.max(0, annualSalary - 50270);
  const additionalBand = Math.max(0, annualSalary - 125140);

  const incomeTax =
    basicBand * 0.2 +
    Math.max(0, higherBand - additionalBand) * 0.4 +
    additionalBand * 0.45;

  const niMainBand = Math.min(Math.max(0, annualSalary - 12570), 37700);
  const niUpperBand = Math.max(0, annualSalary - 50270);
  const nationalInsurance = niMainBand * 0.08 + niUpperBand * 0.02;

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
              Overtime Pay Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate overtime pay based on your hourly rate, overtime
              multiplier, and hours worked. See the gross overtime amount and a
              simplified take-home pay estimate after tax, National Insurance,
              pension, and optional student loan repayments.
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
                <InputField
                  label="Hourly rate (£)"
                  value={hourlyRate}
                  onChange={setHourlyRate}
                  step="0.01"
                />
                <InputField
                  label="Overtime hours per period"
                  value={overtimeHours}
                  onChange={setOvertimeHours}
                />
                <InputField
                  label="Overtime multiplier"
                  value={overtimeMultiplier}
                  onChange={setOvertimeMultiplier}
                  step="0.1"
                />
                <InputField
                  label="Overtime periods per month"
                  value={periodsPerMonth}
                  onChange={setPeriodsPerMonth}
                />
                <InputField
                  label="Base annual salary (£)"
                  value={annualBaseSalary}
                  onChange={setAnnualBaseSalary}
                />
                <InputField
                  label="Pension contribution %"
                  value={pensionPct}
                  onChange={setPensionPct}
                />
              </div>

              <div className="mt-6 flex items-center justify-between rounded-3xl bg-slate-100 p-4">
                <div>
                  <p className="text-sm font-medium text-slate-900">
                    Include student loan repayments
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Toggle this on for a broader net pay estimate.
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

              <div className="mt-8 rounded-3xl bg-slate-100 p-5">
                <p className="text-sm font-medium text-slate-900">
                  What this calculator includes
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This tool estimates gross overtime pay and compares estimated
                  take-home pay with and without overtime. Actual payslips can
                  vary depending on tax code, payroll timing, pension setup,
                  student loan plan, bonuses, and employer rules.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  href="/tools/take-home-pay-calculator-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Go deeper with take-home pay
                </Link>

                <Link
                  href="/tools/hourly-to-salary-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Convert hourly pay to salary
                </Link>

                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Use overtime in your monthly budget
                </Link>

                <Link
                  href="/tools/savings-goal-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Put extra income toward a savings goal
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<Clock className="h-5 w-5" />}
                label="Overtime rate"
                value={formatGBP(result.overtimeRate)}
                description="Your estimated overtime hourly rate."
              />

              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Monthly overtime pay"
                value={formatGBP(result.overtimePayMonthly)}
                description="Estimated extra gross pay per month from overtime."
              />

              <ResultCard
                icon={<Wallet className="h-5 w-5" />}
                label="Extra monthly take-home"
                value={formatGBP(result.extraMonthlyTakeHome)}
                description="Estimated net monthly uplift after deductions."
              />

              <ResultCard
                icon={<ShieldCheck className="h-5 w-5" />}
                label="Total monthly take-home"
                value={formatGBP(result.monthlyTakeHome)}
                description="Estimated monthly take-home including overtime."
              />
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
                <SummaryBox
                  label="Annual overtime pay"
                  value={formatGBP(result.overtimePayAnnual)}
                />

                <SummaryBox
                  label="Total annual gross"
                  value={formatGBP(result.totalAnnualGross)}
                />

                <SummaryBox
                  label="Annual take-home"
                  value={formatGBP(result.annualTakeHome)}
                />

                <SummaryBox
                  label="Monthly gross"
                  value={formatGBP(result.totalMonthlyGross)}
                />
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
                <p className="leading-7">
                  If overtime is irregular, it may be safer to use it for
                  savings, debt reduction, or one-off goals rather than relying
                  on it for fixed monthly bills.
                </p>
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
            How overtime pay is calculated
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              Overtime pay is usually calculated by multiplying your normal
              hourly rate by an overtime multiplier. For example, a 1.5x rate
              means you earn one and a half times your normal hourly pay for the
              overtime hours worked.
            </p>

            <p className="leading-7">
              The gross overtime amount is not always the amount you keep. Tax,
              National Insurance, pension contributions, and student loan
              repayments may reduce the final take-home amount.
            </p>

            <p className="leading-7">
              This calculator gives a simplified estimate only. Your actual pay
              may differ depending on your employer, payroll date, tax code,
              pension method, and whether overtime is paid weekly or monthly.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Hourly rate"
              text="Your normal hourly rate is the starting point for the calculation."
            />
            <InfoCard
              title="Multiplier"
              text="Overtime may be paid at 1.25x, 1.5x, 2x or another agreed rate."
            />
            <InfoCard
              title="Net pay"
              text="The take-home uplift can be lower than the gross overtime amount."
            />
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
            <h2 className="text-2xl font-semibold tracking-tight">
              Overtime pay calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="How is overtime pay calculated?"
                answer="Overtime pay is usually based on your hourly rate multiplied by an overtime rate such as 1.5x or 2x."
              />

              <FAQ
                question="Why is my extra take-home lower than the gross overtime figure?"
                answer="Because tax, National Insurance, pension contributions, and student loan repayments may reduce the net amount you keep."
              />

              <FAQ
                question="Is overtime worth it?"
                answer="That depends on how much extra take-home it adds, how often you work it, and whether it creates a meaningful improvement to your finances."
              />

              <FAQ
                question="Is this calculator financial advice?"
                answer="No. This calculator gives a general estimate only and should not be treated as financial, tax, or payroll advice."
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
                Use the extra income wisely
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                Once you know the estimated take-home uplift, a useful next step
                is putting it into your budget, savings goal, or debt payoff
                plan.
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
        heading="Related income tools"
        links={[
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Estimate salary after tax, National Insurance and other deductions.",
            href: "/tools/take-home-pay-calculator-uk",
          },
          {
            title: "Hourly to Salary Calculator",
            description:
              "Convert hourly pay into weekly, monthly and annual salary.",
            href: "/tools/hourly-to-salary-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "Use your extra income estimate in a realistic monthly plan.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Savings Goal Calculator",
            description:
              "See how overtime income could help you reach a savings goal faster.",
            href: "/tools/savings-goal-calculator",
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
