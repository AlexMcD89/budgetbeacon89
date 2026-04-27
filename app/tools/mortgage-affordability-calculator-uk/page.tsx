"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CircleHelp,
  Home,
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
  };
}

function monthlyMortgagePayment(
  loanAmount: number,
  annualRate: number,
  years: number,
) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (loanAmount <= 0 || years <= 0) return 0;
  if (monthlyRate === 0) return loanAmount / numberOfPayments;

  return (
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  );
}

export default function MortgageAffordabilityCalculatorPage() {
  const [salary, setSalary] = useState(45000);
  const [partnerSalary, setPartnerSalary] = useState(0);
  const [deposit, setDeposit] = useState(30000);
  const [monthlyDebt, setMonthlyDebt] = useState(250);
  const [monthlyBills, setMonthlyBills] = useState(500);
  const [interestRate, setInterestRate] = useState(4.8);
  const [mortgageYears, setMortgageYears] = useState(30);
  const [pensionPct, setPensionPct] = useState(5);
  const [studentLoan, setStudentLoan] = useState(true);

  const result = useMemo(() => {
    const combinedSalary = salary + partnerSalary;
    const annualIncomeMultiplierLow = combinedSalary * 3.5;
    const annualIncomeMultiplierMid = combinedSalary * 4;
    const annualIncomeMultiplierHigh = combinedSalary * 4.5;

    const takeHome = calculateMonthlyTakeHome(
      combinedSalary,
      pensionPct,
      studentLoan,
    );

    const monthlyIncome = takeHome.monthlyTakeHome;

    const safeMonthlyMortgage = Math.max(
      0,
      monthlyIncome * 0.28 - monthlyDebt * 0.15,
    );

    const balancedMonthlyMortgage = Math.max(
      0,
      monthlyIncome * 0.33 - monthlyDebt * 0.1,
    );

    const stretchMonthlyMortgage = Math.max(
      0,
      monthlyIncome * 0.38 - monthlyDebt * 0.05,
    );

    const estimateLoanFromPayment = (targetPayment: number) => {
      let low = 0;
      let high = 1500000;

      for (let i = 0; i < 60; i++) {
        const mid = (low + high) / 2;
        const payment = monthlyMortgagePayment(
          mid,
          interestRate,
          mortgageYears,
        );

        if (payment > targetPayment) {
          high = mid;
        } else {
          low = mid;
        }
      }

      return low;
    };

    const paymentBasedSafeLoan = estimateLoanFromPayment(safeMonthlyMortgage);
    const paymentBasedBalancedLoan = estimateLoanFromPayment(
      balancedMonthlyMortgage,
    );
    const paymentBasedStretchLoan = estimateLoanFromPayment(
      stretchMonthlyMortgage,
    );

    const safeLoan = Math.min(paymentBasedSafeLoan, annualIncomeMultiplierLow);
    const balancedLoan = Math.min(
      paymentBasedBalancedLoan,
      annualIncomeMultiplierMid,
    );
    const stretchLoan = Math.min(
      paymentBasedStretchLoan,
      annualIncomeMultiplierHigh,
    );

    const safePropertyPrice = safeLoan + deposit;
    const balancedPropertyPrice = balancedLoan + deposit;
    const stretchPropertyPrice = stretchLoan + deposit;

    const safePayment = monthlyMortgagePayment(
      safeLoan,
      interestRate,
      mortgageYears,
    );

    const balancedPayment = monthlyMortgagePayment(
      balancedLoan,
      interestRate,
      mortgageYears,
    );

    const stretchPayment = monthlyMortgagePayment(
      stretchLoan,
      interestRate,
      mortgageYears,
    );

    const balancedHousingShare =
      monthlyIncome > 0 ? (balancedPayment / monthlyIncome) * 100 : 0;

    let status = "More comfortable range";
    let summary =
      "Based on the figures entered, this borrowing level may feel more comfortable for some households.";

    if (
      balancedHousingShare > 38 ||
      monthlyIncome - balancedPayment - monthlyDebt - monthlyBills < 300
    ) {
      status = "Tighter range";
      summary =
        "Based on the figures entered, this borrowing level may feel stretched once debt, bills, and day-to-day costs are considered.";
    }

    if (
      balancedHousingShare > 44 ||
      monthlyIncome - balancedPayment - monthlyDebt - monthlyBills < 150
    ) {
      status = "More stretched range";
      summary =
        "Based on the figures entered, this borrowing level may leave limited monthly flexibility and could feel harder to sustain.";
    }

    const depositTargetForNextBand = Math.max(
      0,
      stretchPropertyPrice - balancedPropertyPrice,
    );

    return {
      combinedSalary,
      monthlyIncome,
      safeLoan,
      balancedLoan,
      stretchLoan,
      safePropertyPrice,
      balancedPropertyPrice,
      stretchPropertyPrice,
      safePayment,
      balancedPayment,
      stretchPayment,
      status,
      summary,
      balancedHousingShare,
      depositTargetForNextBand,
    };
  }, [
    salary,
    partnerSalary,
    deposit,
    monthlyDebt,
    monthlyBills,
    interestRate,
    mortgageYears,
    pensionPct,
    studentLoan,
  ]);

  const score = Math.max(
    10,
    Math.min(
      96,
      Math.round(
        100 -
          result.balancedHousingShare * 1.2 -
          (monthlyDebt / Math.max(result.monthlyIncome, 1)) * 100 * 0.7 +
          Math.min(
            (result.monthlyIncome -
              result.balancedPayment -
              monthlyDebt -
              monthlyBills) /
              40,
            18,
          ),
      ),
    ),
  );

  const applyScenario = (type: "solo" | "couple" | "london") => {
    if (type === "solo") {
      setSalary(45000);
      setPartnerSalary(0);
      setDeposit(30000);
      setMonthlyDebt(250);
      setMonthlyBills(500);
      setInterestRate(4.8);
      setMortgageYears(30);
      setPensionPct(5);
      setStudentLoan(true);
    }

    if (type === "couple") {
      setSalary(42000);
      setPartnerSalary(32000);
      setDeposit(45000);
      setMonthlyDebt(300);
      setMonthlyBills(700);
      setInterestRate(4.8);
      setMortgageYears(30);
      setPensionPct(5);
      setStudentLoan(false);
    }

    if (type === "london") {
      setSalary(65000);
      setPartnerSalary(25000);
      setDeposit(70000);
      setMonthlyDebt(350);
      setMonthlyBills(850);
      setInterestRate(4.8);
      setMortgageYears(30);
      setPensionPct(5);
      setStudentLoan(true);
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
              Mortgage Affordability Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Use this UK mortgage affordability calculator to estimate how much
              you may be able to borrow, what property price that could support,
              and how different borrowing levels could feel based on your
              income, deposit, and monthly costs.
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
                  onClick={() => applyScenario("solo")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Solo buyer
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
                <InputField
                  label="Your annual salary"
                  value={salary}
                  onChange={setSalary}
                />

                <InputField
                  label="Partner annual salary"
                  value={partnerSalary}
                  onChange={setPartnerSalary}
                />

                <InputField
                  label="Deposit"
                  value={deposit}
                  onChange={setDeposit}
                />

                <InputField
                  label="Mortgage term (years)"
                  value={mortgageYears}
                  onChange={setMortgageYears}
                />

                <InputField
                  label="Interest rate %"
                  value={interestRate}
                  onChange={setInterestRate}
                  step="0.1"
                />

                <InputField
                  label="Pension contribution %"
                  value={pensionPct}
                  onChange={setPensionPct}
                />

                <InputField
                  label="Monthly debt payments"
                  value={monthlyDebt}
                  onChange={setMonthlyDebt}
                />

                <InputField
                  label="Other monthly bills"
                  value={monthlyBills}
                  onChange={setMonthlyBills}
                />
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

              <div className="mt-8 rounded-3xl bg-slate-100 p-5">
                <p className="text-sm font-medium text-slate-900">
                  What this calculator checks
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This estimate looks at income multiples, monthly mortgage
                  payments, deposit size, monthly debt, and essential bills. It
                  is designed to show a practical range rather than only a
                  maximum borrowing figure.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  href="/tools/stamp-duty-calculator-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Estimate stamp duty
                </Link>

                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Check the payment against your budget
                </Link>

                <Link
                  href="/tools/mortgage-overpayment-calculator"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Explore mortgage overpayments
                </Link>

                <Link
                  href="/tools/rent-affordability-calculator-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Compare with rent affordability
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Balanced borrowing estimate"
                value={formatGBP(result.balancedLoan)}
                description="An indicative borrowing range that may feel more practical for some households."
              />

              <ResultCard
                icon={<Home className="h-5 w-5" />}
                label="Balanced property price estimate"
                value={formatGBP(result.balancedPropertyPrice)}
                description="Includes the deposit entered above."
              />
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Mortgage affordability summary
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
                <SummaryBox
                  label="Safer range"
                  value={formatGBP(result.safePropertyPrice)}
                  note={`About ${formatGBP(result.safePayment)}/month`}
                />

                <SummaryBox
                  label="Balanced range"
                  value={formatGBP(result.balancedPropertyPrice)}
                  note={`About ${formatGBP(result.balancedPayment)}/month`}
                />

                <SummaryBox
                  label="Stretch range"
                  value={formatGBP(result.stretchPropertyPrice)}
                  note={`About ${formatGBP(result.stretchPayment)}/month`}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                What the estimate suggests
              </h2>

              <div className="mt-5 space-y-4">
                <InfoRow
                  label="Estimated monthly take-home"
                  value={formatGBP(result.monthlyIncome)}
                  text="Estimated after tax, National Insurance, pension, and optional student loan."
                />

                <InfoRow
                  label="Balanced housing share"
                  value={`${result.balancedHousingShare.toFixed(1)}%`}
                  text="This shows how much of monthly take-home pay may go toward the estimated mortgage payment."
                />

                <InfoRow
                  label="Extra deposit to reach the next range"
                  value={formatGBP(result.depositTargetForNextBand)}
                  text="A larger deposit may improve affordability by reducing borrowing and monthly payments."
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <PiggyBank className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                Why deposit size matters
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A bigger deposit can lower the amount borrowed, reduce monthly
                payments, and sometimes improve the range of mortgage options
                available.
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
            How mortgage affordability works
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              Mortgage affordability is usually based on a mix of income,
              deposit, monthly commitments, credit profile, interest rates and
              lender stress testing. A simple income multiple can be useful, but
              it does not show the whole picture.
            </p>

            <p className="leading-7">
              This calculator combines income-multiple estimates with monthly
              repayment pressure. That means the result looks at both how much a
              lender may consider and how the payment may feel alongside debt,
              bills and household costs.
            </p>

            <p className="leading-7">
              The figures are estimates only. Real mortgage offers depend on
              lender criteria, credit checks, product fees, deposit size,
              affordability checks and interest rates at the time you apply.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Income"
              text="Higher household income can increase borrowing potential, but lenders also check commitments."
            />
            <InfoCard
              title="Deposit"
              text="A larger deposit reduces borrowing and can improve monthly affordability."
            />
            <InfoCard
              title="Monthly costs"
              text="Debt, bills and existing commitments can reduce what feels affordable."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              How to use this mortgage affordability result
            </h2>
            <div className="mt-5 space-y-4 text-slate-600">
              <p className="leading-7">
                Mortgage affordability is not just about lender income
                multiples. A borrowing amount can look possible on paper while
                still feeling tight once debt, bills, and everyday living costs
                are included.
              </p>
              <p className="leading-7">
                The balanced range is often a useful reference point when
                comparing affordability.
              </p>
              <p className="leading-7">
                This calculator gives estimates only and does not provide
                personal financial advice or mortgage advice.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">
              Mortgage affordability calculator UK FAQs
            </h2>

            <div className="mt-5 space-y-4">
              <FAQ
                question="How much can I borrow for a mortgage in the UK?"
                answer="Many lenders use income multiples, often around 4 to 4.5 times income as a general guide, but affordability also depends on debt, bills, deposit size, and interest rates."
              />

              <FAQ
                question="Is the maximum borrowing amount always a good target?"
                answer="Not usually. Borrowing at the upper end may leave less room for savings, repairs, rising household costs and future rate changes."
              />

              <FAQ
                question="Does a larger deposit help?"
                answer="Yes. A larger deposit reduces the amount you need to borrow and may improve both monthly affordability and lender options."
              />

              <FAQ
                question="Is this calculator mortgage advice?"
                answer="No. It gives a general estimate only. A broker or lender can confirm what may be available based on your circumstances."
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
                Check the rest of your buying costs
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                A useful next step is estimating stamp duty, checking your
                monthly budget, or comparing buying affordability with rent
                affordability.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/stamp-duty-calculator-uk"
                className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Stamp duty
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
        heading="Related housing pages"
        links={[
          {
            title: "Stamp Duty Calculator UK",
            description:
              "Estimate upfront tax costs when buying property in England or Northern Ireland.",
            href: "/tools/stamp-duty-calculator-uk",
          },
          {
            title: "Rent Affordability Calculator UK",
            description:
              "Compare buying affordability with renting affordability.",
            href: "/tools/rent-affordability-calculator-uk",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "See whether a mortgage payment fits into your broader budget.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Check your estimated monthly income before comparing borrowing levels.",
            href: "/tools/take-home-pay-calculator-uk",
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
