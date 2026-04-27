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
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function estimateTakeHome(
  annualSalary: number,
  pensionPct: number,
  studentLoan: boolean,
) {
  const personalAllowance = 12570;
  const basicRateLimit = 50270;
  const additionalRateLimit = 125140;

  const pension = annualSalary * (pensionPct / 100);
  const taxableIncome = Math.max(0, annualSalary - personalAllowance);

  const basicBand = Math.min(taxableIncome, basicRateLimit - personalAllowance);
  const higherBand = Math.min(
    Math.max(0, annualSalary - basicRateLimit),
    additionalRateLimit - basicRateLimit,
  );
  const additionalBand = Math.max(0, annualSalary - additionalRateLimit);

  const incomeTax = basicBand * 0.2 + higherBand * 0.4 + additionalBand * 0.45;

  const niMainBand = Math.min(Math.max(0, annualSalary - 12570), 50270 - 12570);
  const niUpperBand = Math.max(0, annualSalary - 50270);
  const nationalInsurance = niMainBand * 0.08 + niUpperBand * 0.02;

  const studentLoanRepayment = studentLoan
    ? Math.max(0, annualSalary - 25000) * 0.09
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

export default function HourlyToSalaryPage() {
  const [hourlyRate, setHourlyRate] = useState(15);
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [weeksPerYear, setWeeksPerYear] = useState(52);
  const [pensionPct, setPensionPct] = useState(5);
  const [studentLoan, setStudentLoan] = useState(true);

  const result = useMemo(() => {
    const weeklyGross = hourlyRate * hoursPerWeek;
    const annualGross = weeklyGross * weeksPerYear;
    const monthlyGross = annualGross / 12;

    const takeHome = estimateTakeHome(annualGross, pensionPct, studentLoan);

    return {
      weeklyGross,
      annualGross,
      monthlyGross,
      annualTakeHome: takeHome.annualTakeHome,
      monthlyTakeHome: takeHome.monthlyTakeHome,
      deductions: takeHome.deductions,
    };
  }, [hourlyRate, hoursPerWeek, weeksPerYear, pensionPct, studentLoan]);

  const applyScenario = (type: "minimum" | "average" | "high") => {
    if (type === "minimum") {
      setHourlyRate(12.21);
      setHoursPerWeek(40);
      setWeeksPerYear(52);
      setPensionPct(5);
      setStudentLoan(false);
    }

    if (type === "average") {
      setHourlyRate(15);
      setHoursPerWeek(40);
      setWeeksPerYear(52);
      setPensionPct(5);
      setStudentLoan(true);
    }

    if (type === "high") {
      setHourlyRate(25);
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
              Hourly to Salary Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Convert hourly pay into estimated weekly, monthly and annual
              salary, with an estimated take-home pay view after income tax,
              National Insurance, pension contributions and optional student
              loan repayments.
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
                  onClick={() => applyScenario("minimum")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Minimum wage
                </button>
                <button
                  onClick={() => applyScenario("average")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Average
                </button>
                <button
                  onClick={() => applyScenario("high")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Higher rate
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
                  label="Hours per week"
                  value={hoursPerWeek}
                  onChange={setHoursPerWeek}
                />
                <InputField
                  label="Weeks per year"
                  value={weeksPerYear}
                  onChange={setWeeksPerYear}
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
                    Toggle this on for a broader take-home estimate.
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
                  What this estimate includes
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This calculator estimates salary from hourly pay and includes
                  simplified UK income tax, National Insurance, pension and
                  optional student loan deductions. It is for general planning,
                  not payroll advice.
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
                  Calculate take-home pay from salary
                </Link>
                <Link
                  href="/tools/overtime-pay-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Estimate overtime pay
                </Link>
                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Build a monthly budget
                </Link>
                <Link
                  href="/tools/rent-affordability-calculator-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Check rent affordability
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Annual gross salary"
                value={formatGBP(result.annualGross)}
                description="Before tax and other deductions."
              />

              <ResultCard
                icon={<Clock className="h-5 w-5" />}
                label="Monthly gross salary"
                value={formatGBP(result.monthlyGross)}
                description="Estimated monthly gross income."
              />

              <ResultCard
                icon={<Wallet className="h-5 w-5" />}
                label="Annual take-home"
                value={formatGBP(result.annualTakeHome)}
                description="Estimated after key deductions."
              />

              <ResultCard
                icon={<ShieldCheck className="h-5 w-5" />}
                label="Monthly take-home"
                value={formatGBP(result.monthlyTakeHome)}
                description="Better for budgeting than gross pay."
              />
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Estimated deductions
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SummaryBox
                  label="Income tax"
                  value={formatGBP(result.deductions.incomeTax)}
                />
                <SummaryBox
                  label="National Insurance"
                  value={formatGBP(result.deductions.nationalInsurance)}
                />
                <SummaryBox
                  label="Pension"
                  value={formatGBP(result.deductions.pension)}
                />
                <SummaryBox
                  label="Student loan"
                  value={formatGBP(result.deductions.studentLoanRepayment)}
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
            How to convert hourly pay to annual salary
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              To estimate annual salary from hourly pay, multiply the hourly
              rate by the number of hours worked each week, then multiply that
              weekly amount by the number of paid weeks in the year.
            </p>
            <p className="leading-7">
              For example, someone earning £15 per hour for 40 hours a week over
              52 weeks would have a gross annual salary of £31,200 before tax,
              National Insurance and other deductions.
            </p>
            <p className="leading-7">
              The take-home estimate on this page is simplified. Actual pay can
              vary depending on tax code, pension setup, student loan plan,
              overtime, bonuses and payroll rules.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Hourly pay"
              text="The rate you earn for each hour worked."
            />
            <InfoCard
              title="Weekly hours"
              text="The number of paid hours you usually work each week."
            />
            <InfoCard
              title="Paid weeks"
              text="Use 52 for year-round work, or reduce it for unpaid weeks."
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
                Gross salary is useful for comparing jobs, but monthly take-home
                pay is often the more practical number for budgeting and
                planning.
              </p>
              <p className="leading-7">
                Use the take-home figure when checking rent affordability,
                monthly budgets, savings goals or debt repayments.
              </p>
              <p className="leading-7">
                This calculator provides a general estimate only and does not
                provide personal financial advice or payroll advice.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Hourly to salary calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="How do I calculate annual salary from hourly pay?"
                answer="Multiply your hourly rate by weekly hours, then multiply that by the number of paid weeks in the year."
              />
              <FAQ
                question="Should I use 52 weeks per year?"
                answer="Use 52 if you are paid year-round. If you have unpaid weeks, reduce the weeks per year to match your situation."
              />
              <FAQ
                question="Is the take-home estimate exact?"
                answer="No. It is a simplified estimate and may differ from payroll because of tax codes, student loan plans, pension setup and other deductions."
              />
              <FAQ
                question="Is this calculator financial advice?"
                answer="No. It gives a general estimate only and should not be treated as personal financial advice."
              />
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

      <RelatedLinks
        heading="Related income tools"
        links={[
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Estimate salary after income tax, National Insurance and deductions.",
            href: "/tools/take-home-pay-calculator-uk",
          },
          {
            title: "Overtime Pay Calculator",
            description:
              "Estimate extra pay from overtime hours and hourly rates.",
            href: "/tools/overtime-pay-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description: "Use your take-home income to build a monthly budget.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Rent Affordability Calculator UK",
            description:
              "Check what rent range may fit your monthly take-home pay.",
            href: "/tools/rent-affordability-calculator-uk",
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
