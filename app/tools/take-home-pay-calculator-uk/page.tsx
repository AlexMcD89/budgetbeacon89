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
import AdsenseAd from "@/components/adsense-ad";

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function calculateTakeHome(
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
    monthlyGross: annualSalary / 12,
    annualTakeHome,
    monthlyTakeHome: annualTakeHome / 12,
    weeklyTakeHome: annualTakeHome / 52,
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
              Estimate your monthly, weekly and annual take-home pay after UK
              income tax, National Insurance, pension contributions and optional
              student loan repayments.
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
              <h2 className="text-2xl font-semibold tracking-tight">
                Enter your details
              </h2>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <InputField
                  label="Annual salary (£)"
                  value={salary}
                  onChange={setSalary}
                />

                <InputField
                  label="Pension contribution %"
                  value={pensionPct}
                  onChange={setPensionPct}
                />

                <div className="sm:col-span-2">
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
                  Insurance, pension contributions and optional student loan
                  repayments. Actual payslips can vary depending on tax code,
                  benefits, salary sacrifice, bonuses and payroll setup.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <QuickLink
                  href="/tools/monthly-budget-planner"
                  label="Build a monthly budget"
                />
                <QuickLink
                  href="/tools/rent-affordability-calculator-uk"
                  label="Check rent affordability"
                />
                <QuickLink
                  href="/tools/mortgage-affordability-calculator-uk"
                  label="Estimate mortgage affordability"
                />
                <QuickLink
                  href="/tools/salary-to-hourly-calculator"
                  label="Convert salary to hourly pay"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<Wallet className="h-5 w-5" />}
                label="Monthly take-home"
                value={formatGBP(result.monthlyTakeHome)}
                description="Your estimated monthly pay after key deductions."
              />

              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Annual take-home"
                value={formatGBP(result.annualTakeHome)}
                description="Useful for yearly planning and financial goals."
              />
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Take-home pay summary
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
                take-home is {formatGBP(result.monthlyTakeHome)}. Around{" "}
                {formatGBP(monthlyDifference)} per month is going toward income
                tax, National Insurance, pension and any student loan repayment.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <SummaryBox
                  label="Monthly gross"
                  value={formatGBP(result.monthlyGross)}
                />
                <SummaryBox
                  label="Monthly take-home"
                  value={formatGBP(result.monthlyTakeHome)}
                />
                <SummaryBox
                  label="Weekly take-home"
                  value={formatGBP(result.weeklyTakeHome)}
                />
                <SummaryBox
                  label="Annual take-home"
                  value={formatGBP(result.annualTakeHome)}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Deduction breakdown
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Income tax"
                  value={formatGBP(result.deductions.incomeTax)}
                  text="Estimated income tax based on the salary entered."
                />
                <InfoRow
                  label="National Insurance"
                  value={formatGBP(result.deductions.nationalInsurance)}
                  text="Estimated employee National Insurance contribution."
                />
                <InfoRow
                  label="Pension"
                  value={formatGBP(result.deductions.pension)}
                  text="Based on the pension percentage entered."
                />
                <InfoRow
                  label="Student loan"
                  value={formatGBP(result.deductions.studentLoan)}
                  text="Included only when the student loan option is switched on."
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
            How take-home pay works in the UK
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              Take-home pay is the amount you receive after deductions have been
              taken from your gross salary. For many people, the biggest
              deductions are income tax, National Insurance, workplace pension
              contributions and student loan repayments.
            </p>

            <p className="leading-7">
              Gross salary is useful when comparing jobs, but monthly take-home
              pay is usually more helpful for rent, mortgage affordability,
              budgeting, debt repayment and savings goals.
            </p>

            <p className="leading-7">
              This calculator is designed to give a practical estimate. It does
              not replace payroll, tax or financial advice.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Gross salary"
              text="The salary before deductions such as tax, National Insurance and pension."
            />
            <InfoCard
              title="Monthly take-home"
              text="The estimated amount that may reach your bank account each month."
            />
            <InfoCard
              title="Budget planning"
              text="The number most useful for rent, savings, debt and monthly spending."
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
                Use your monthly take-home number for realistic budgeting, rent
                checks, debt planning and savings goals. Gross salary is useful,
                but take-home pay is what usually matters for day-to-day
                decisions.
              </p>
              <p className="leading-7">
                If your deduction rate feels higher than expected, pension and
                student loan settings can make a meaningful difference.
              </p>
              <p className="leading-7">
                This page is especially useful as the first step before using
                rent affordability, budget planning or debt payoff tools.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Take-home pay calculator FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="Is this take-home pay estimate exact?"
                answer="No. It is a practical estimate rather than a full payroll calculation. Your real payslip can vary depending on tax code, benefits, bonuses and pension setup."
              />
              <FAQ
                question="Should I use gross or take-home pay for budgeting?"
                answer="Take-home pay is usually better for budgeting because it reflects the money that actually reaches your bank account."
              />
              <FAQ
                question="Does pension reduce take-home pay?"
                answer="Yes. Higher pension contributions usually reduce immediate take-home pay while increasing retirement savings."
              />
              <FAQ
                question="Is this financial advice?"
                answer="No. This calculator provides a general estimate only and should not be treated as financial, tax or payroll advice."
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
                Use your take-home pay in the rest of the site
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                A strong next move is checking what rent range fits your pay or
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
            title: "Salary to Hourly Calculator",
            description: "Convert annual salary into an hourly pay estimate.",
            href: "/tools/salary-to-hourly-calculator",
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
        className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-slate-900 outline-none transition focus:border-slate-900"
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
