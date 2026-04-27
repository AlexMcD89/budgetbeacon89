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

  const incomeTax = basicBand * 0.2 + higherBand * 0.4;

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
    const yearlyHours = hoursPerWeek * weeksPerYear;

    const hourlyGross = yearlyHours > 0 ? annualSalary / yearlyHours : 0;
    const weeklyGross = hourlyGross * hoursPerWeek;
    const monthlyGross = annualSalary / 12;

    const takeHome = estimateTakeHome(annualSalary, pensionPct, studentLoan);

    const hourlyTakeHome =
      yearlyHours > 0 ? takeHome.annualTakeHome / yearlyHours : 0;

    return {
      hourlyGross,
      weeklyGross,
      monthlyGross,
      annualGross: annualSalary,
      annualTakeHome: takeHome.annualTakeHome,
      monthlyTakeHome: takeHome.monthlyTakeHome,
      hourlyTakeHome,
      yearlyHours,
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
              Salary to Hourly Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Convert an annual salary into an estimated hourly rate, weekly
              pay, monthly pay and take-home equivalent after tax, National
              Insurance, pension and optional student loan deductions.
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
                <InputField
                  label="Annual salary (£)"
                  value={annualSalary}
                  onChange={setAnnualSalary}
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
                    Toggle this on for a broader estimated net hourly rate.
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
                  This tool converts salary into hourly pay using your chosen
                  hours and weeks worked. It also gives a simplified take-home
                  estimate. Actual payslips can vary depending on tax code,
                  pension setup, student loan plan, benefits, bonuses and
                  payroll method.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <QuickLink
                  href="/tools/hourly-to-salary-calculator"
                  label="Convert hourly pay to salary"
                />
                <QuickLink
                  href="/tools/take-home-pay-calculator-uk"
                  label="Go deeper with take-home pay"
                />
                <QuickLink
                  href="/tools/overtime-pay-calculator"
                  label="Estimate overtime pay"
                />
                <QuickLink
                  href="/tools/monthly-budget-planner"
                  label="Use your pay in a monthly budget"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<Clock className="h-5 w-5" />}
                label="Hourly gross rate"
                value={formatGBP(result.hourlyGross)}
                description="Estimated hourly pay before deductions."
              />

              <ResultCard
                icon={<Wallet className="h-5 w-5" />}
                label="Hourly take-home"
                value={formatGBP(result.hourlyTakeHome)}
                description="Estimated hourly pay after key deductions."
              />

              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Weekly gross pay"
                value={formatGBP(result.weeklyGross)}
                description="Estimated weekly pay based on your hours."
              />

              <ResultCard
                icon={<ShieldCheck className="h-5 w-5" />}
                label="Monthly take-home"
                value={formatGBP(result.monthlyTakeHome)}
                description="Estimated monthly income after deductions."
              />
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Salary breakdown
              </p>

              <div className="mt-4">
                <p className="text-2xl font-semibold">
                  {formatGBP(annualSalary)} salary equals about{" "}
                  {formatGBP(result.hourlyGross)}/hour
                </p>
                <p className="mt-4 text-base leading-7 text-slate-200">
                  Based on {hoursPerWeek} hours per week and {weeksPerYear}{" "}
                  weeks per year, this works out to around{" "}
                  {formatGBP(result.weeklyGross)} gross per week.
                </p>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SummaryBox
                  label="Annual gross"
                  value={formatGBP(result.annualGross)}
                />
                <SummaryBox
                  label="Monthly gross"
                  value={formatGBP(result.monthlyGross)}
                />
                <SummaryBox
                  label="Annual take-home"
                  value={formatGBP(result.annualTakeHome)}
                />
                <SummaryBox
                  label="Yearly hours"
                  value={`${result.yearlyHours.toLocaleString("en-GB")} hrs`}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Estimated deductions
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Income tax"
                  value={formatGBP(result.deductions.incomeTax)}
                  text="Simplified estimate based on salary entered."
                />
                <InfoRow
                  label="National Insurance"
                  value={formatGBP(result.deductions.nationalInsurance)}
                  text="Estimated employee National Insurance deduction."
                />
                <InfoRow
                  label="Pension"
                  value={formatGBP(result.deductions.pension)}
                  text="Based on the pension percentage entered."
                />
                <InfoRow
                  label="Student loan"
                  value={formatGBP(result.deductions.studentLoanRepayment)}
                  text="Included only when the student loan toggle is switched on."
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
            How to convert salary to hourly pay
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              To convert salary to hourly pay, divide the annual salary by the
              total number of hours worked in a year. For example, someone
              working 40 hours a week for 52 weeks works 2,080 hours per year.
            </p>

            <p className="leading-7">
              Gross hourly pay is useful when comparing jobs, but estimated
              take-home hourly pay can be more realistic because it reflects
              deductions such as tax, National Insurance, pension contributions
              and student loan repayments.
            </p>

            <p className="leading-7">
              This calculator gives a general estimate only. It does not replace
              payroll, tax, or financial advice.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Annual salary"
              text="The salary figure is divided across your expected working hours."
            />
            <InfoCard
              title="Working hours"
              text="Changing hours per week or weeks per year changes the hourly equivalent."
            />
            <InfoCard
              title="Take-home view"
              text="The estimated net hourly rate can be more useful for budgeting."
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
              Salary to hourly calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="How do I convert salary to hourly pay?"
                answer="Divide annual salary by the number of hours worked in a year. For example, 40 hours per week for 52 weeks is 2,080 hours."
              />
              <FAQ
                question="Is gross hourly pay the same as take-home hourly pay?"
                answer="No. Gross hourly pay is before deductions. Take-home hourly pay is lower after estimated tax, National Insurance, pension and other deductions."
              />
              <FAQ
                question="Does this include student loans?"
                answer="Yes, if you turn the student loan option on. It is a simplified estimate and actual repayments can vary by plan."
              />
              <FAQ
                question="Is this calculator financial advice?"
                answer="No. This calculator gives a general estimate only and should not be treated as financial, tax or payroll advice."
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
                Compare this with your full take-home pay
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                A useful next step is checking your full take-home pay or
                converting hourly pay back into annual salary.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/hourly-to-salary-calculator"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Hourly to salary
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
            title: "Hourly to Salary Calculator",
            description:
              "Convert hourly pay into weekly, monthly and annual salary.",
            href: "/tools/hourly-to-salary-calculator",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Estimate salary after tax, National Insurance and other deductions.",
            href: "/tools/take-home-pay-calculator-uk",
          },
          {
            title: "Overtime Pay Calculator",
            description:
              "Estimate extra income from overtime hours and multipliers.",
            href: "/tools/overtime-pay-calculator",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "Use your monthly take-home estimate to plan spending.",
            href: "/tools/monthly-budget-planner",
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

function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
    >
      {label}
    </Link>
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
