"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CreditCard,
  Flame,
  PoundSterling,
  ShieldCheck,
} from "lucide-react";

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function formatMonths(months: number) {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years <= 0) return `${remainingMonths} months`;
  if (remainingMonths === 0) return `${years} years`;

  return `${years} years ${remainingMonths} months`;
}

type Debt = {
  name: string;
  balance: number;
  apr: number;
  minimumPayment: number;
};

function snowballPayoff(debts: Debt[], extraPayment: number) {
  const workingDebts = debts
    .map((debt) => ({ ...debt, remaining: debt.balance }))
    .sort((a, b) => a.balance - b.balance);

  let months = 0;
  let totalInterest = 0;
  let availableExtra = extraPayment;
  const payoffOrder: {
    name: string;
    month: number;
    originalBalance: number;
  }[] = [];

  while (workingDebts.some((debt) => debt.remaining > 0.01) && months < 1200) {
    months += 1;

    const activeDebts = workingDebts.filter((debt) => debt.remaining > 0.01);

    for (const debt of activeDebts) {
      const interest = debt.remaining * (debt.apr / 100 / 12);
      debt.remaining += interest;
      totalInterest += interest;
    }

    const targetDebt = activeDebts.sort((a, b) => a.remaining - b.remaining)[0];

    for (const debt of activeDebts) {
      let payment = debt.minimumPayment;

      if (debt.name === targetDebt.name) {
        payment += availableExtra;
      }

      const actualPayment = Math.min(payment, debt.remaining);
      debt.remaining -= actualPayment;

      if (debt.remaining <= 0.01) {
        payoffOrder.push({
          name: debt.name,
          month: months,
          originalBalance: debt.balance,
        });

        availableExtra += debt.minimumPayment;
      }
    }
  }

  return {
    months,
    totalInterest,
    payoffOrder,
  };
}

function minimumOnlyPayoff(debts: Debt[]) {
  const workingDebts = debts.map((debt) => ({
    ...debt,
    remaining: debt.balance,
  }));

  let months = 0;
  let totalInterest = 0;

  while (workingDebts.some((debt) => debt.remaining > 0.01) && months < 1200) {
    months += 1;

    for (const debt of workingDebts) {
      if (debt.remaining <= 0.01) continue;

      const interest = debt.remaining * (debt.apr / 100 / 12);
      debt.remaining += interest;
      totalInterest += interest;

      if (debt.minimumPayment <= interest) {
        return {
          months: Infinity,
          totalInterest: Infinity,
        };
      }

      const payment = Math.min(debt.minimumPayment, debt.remaining);
      debt.remaining -= payment;
    }
  }

  return {
    months,
    totalInterest,
  };
}

export default function DebtSnowballCalculatorPage() {
  const [debt1Balance, setDebt1Balance] = useState(850);
  const [debt1Apr, setDebt1Apr] = useState(24.9);
  const [debt1Payment, setDebt1Payment] = useState(40);

  const [debt2Balance, setDebt2Balance] = useState(2400);
  const [debt2Apr, setDebt2Apr] = useState(19.9);
  const [debt2Payment, setDebt2Payment] = useState(90);

  const [debt3Balance, setDebt3Balance] = useState(5200);
  const [debt3Apr, setDebt3Apr] = useState(9.9);
  const [debt3Payment, setDebt3Payment] = useState(150);

  const [extraPayment, setExtraPayment] = useState(150);

  const debts = useMemo<Debt[]>(
    () => [
      {
        name: "Debt 1",
        balance: debt1Balance,
        apr: debt1Apr,
        minimumPayment: debt1Payment,
      },
      {
        name: "Debt 2",
        balance: debt2Balance,
        apr: debt2Apr,
        minimumPayment: debt2Payment,
      },
      {
        name: "Debt 3",
        balance: debt3Balance,
        apr: debt3Apr,
        minimumPayment: debt3Payment,
      },
    ],
    [
      debt1Balance,
      debt1Apr,
      debt1Payment,
      debt2Balance,
      debt2Apr,
      debt2Payment,
      debt3Balance,
      debt3Apr,
      debt3Payment,
    ],
  );

  const result = useMemo(() => {
    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalMinimumPayments = debts.reduce(
      (sum, debt) => sum + debt.minimumPayment,
      0,
    );

    const minimumPlan = minimumOnlyPayoff(debts);
    const snowballPlan = snowballPayoff(debts, extraPayment);

    const interestSaved =
      minimumPlan.totalInterest === Infinity
        ? 0
        : minimumPlan.totalInterest - snowballPlan.totalInterest;

    const monthsSaved =
      minimumPlan.months === Infinity
        ? 0
        : minimumPlan.months - snowballPlan.months;

    let status = "Clear snowball path";
    let summary =
      "The snowball method gives you a clear payoff order and rolls each cleared payment into the next debt.";

    if (monthsSaved >= 12 || interestSaved >= 1000) {
      status = "Strong momentum";
      summary =
        "This snowball plan could create strong momentum and meaningfully shorten your payoff time.";
    }

    if (snowballPlan.months > 60) {
      status = "Long journey";
      summary =
        "This plan works, but the payoff journey may still be long. Increasing the extra payment could make a noticeable difference.";
    }

    return {
      totalDebt,
      totalMinimumPayments,
      minimumPlan,
      snowballPlan,
      interestSaved,
      monthsSaved,
      status,
      summary,
    };
  }, [debts, extraPayment]);

  const applyScenario = (type: "small" | "mixed" | "heavy") => {
    if (type === "small") {
      setDebt1Balance(500);
      setDebt1Apr(24.9);
      setDebt1Payment(30);
      setDebt2Balance(1500);
      setDebt2Apr(19.9);
      setDebt2Payment(60);
      setDebt3Balance(3000);
      setDebt3Apr(12.9);
      setDebt3Payment(100);
      setExtraPayment(100);
    }

    if (type === "mixed") {
      setDebt1Balance(850);
      setDebt1Apr(24.9);
      setDebt1Payment(40);
      setDebt2Balance(2400);
      setDebt2Apr(19.9);
      setDebt2Payment(90);
      setDebt3Balance(5200);
      setDebt3Apr(9.9);
      setDebt3Payment(150);
      setExtraPayment(150);
    }

    if (type === "heavy") {
      setDebt1Balance(1200);
      setDebt1Apr(29.9);
      setDebt1Payment(55);
      setDebt2Balance(4200);
      setDebt2Apr(24.9);
      setDebt2Payment(140);
      setDebt3Balance(9000);
      setDebt3Apr(11.9);
      setDebt3Payment(250);
      setExtraPayment(250);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Debt tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Debt Snowball Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Plan a debt snowball strategy by paying off the smallest balance
              first, then rolling each cleared payment into the next debt.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("small")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Smaller debts
              </button>
              <button
                onClick={() => applyScenario("mixed")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Mixed debts
              </button>
              <button
                onClick={() => applyScenario("heavy")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Heavier debt
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <DebtInput
                title="Debt 1"
                balance={debt1Balance}
                apr={debt1Apr}
                payment={debt1Payment}
                setBalance={setDebt1Balance}
                setApr={setDebt1Apr}
                setPayment={setDebt1Payment}
              />

              <DebtInput
                title="Debt 2"
                balance={debt2Balance}
                apr={debt2Apr}
                payment={debt2Payment}
                setBalance={setDebt2Balance}
                setApr={setDebt2Apr}
                setPayment={setDebt2Payment}
              />

              <DebtInput
                title="Debt 3"
                balance={debt3Balance}
                apr={debt3Apr}
                payment={debt3Payment}
                setBalance={setDebt3Balance}
                setApr={setDebt3Apr}
                setPayment={setDebt3Payment}
              />

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Extra monthly snowball payment (£)
                </label>
                <input
                  type="number"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                How the snowball method works
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                The calculator targets the smallest balance first. Once that
                debt is cleared, its minimum payment rolls into the next
                smallest remaining debt, creating a larger and larger snowball
                payment.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CreditCard className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Total debt</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.totalDebt)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Combined starting balance across all debts.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Debt-free in</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatMonths(result.snowballPlan.months)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated payoff time using the snowball strategy.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Snowball summary
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Flame className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{result.status}</p>
                  <p className="text-sm text-slate-300">
                    Starting monthly payments:{" "}
                    {formatGBP(result.totalMinimumPayments + extraPayment)}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Interest saved vs minimums
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.interestSaved)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Time saved vs minimums
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatMonths(result.monthsSaved)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Payoff order
              </h2>

              <div className="mt-5 space-y-4">
                {result.snowballPlan.payoffOrder.map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="rounded-3xl bg-slate-100 p-4"
                  >
                    <p className="text-sm text-slate-500">Step {index + 1}</p>
                    <p className="mt-1 text-xl font-semibold text-slate-900">
                      Pay off {item.name}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Starting balance: {formatGBP(item.originalBalance)}.
                      Estimated cleared after {formatMonths(item.month)}.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <PoundSterling className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                What this means
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                The debt snowball method is built around momentum. It may not
                always save the most interest compared with targeting the
                highest APR first, but it can make progress feel clearer and
                easier to stick with.
              </p>
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
                Use the payoff order as a practical plan. Focus on the smallest
                balance first while keeping minimum payments going on the
                others.
              </p>
              <p className="leading-7">
                Once the first debt is cleared, do not absorb that freed-up
                money into everyday spending. Roll it into the next debt to
                build momentum.
              </p>
              <p className="leading-7">
                This calculator gives estimates only and does not provide
                financial advice.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  What is the debt snowball method?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  It is a payoff method where you clear the smallest debt first,
                  then roll that payment into the next smallest debt.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Is snowball better than avalanche?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Snowball is often better for motivation. Avalanche usually
                  saves more interest because it targets the highest APR first.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Should I still make minimum payments?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Yes. The snowball method assumes minimum payments continue on
                  all debts while extra money targets one debt at a time.
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
              href="/guides/debt-snowball-vs-avalanche-uk"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Snowball vs avalanche guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/tools/debt-payoff-calculator"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Debt payoff calculator
            </Link>

            <Link
              href="/tools/monthly-budget-planner"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Budget planner
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function DebtInput({
  title,
  balance,
  apr,
  payment,
  setBalance,
  setApr,
  setPayment,
}: {
  title: string;
  balance: number;
  apr: number;
  payment: number;
  setBalance: (value: number) => void;
  setApr: (value: number) => void;
  setPayment: (value: number) => void;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Balance (£)
          </label>
          <input
            type="number"
            value={balance}
            onChange={(e) => setBalance(Number(e.target.value))}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">APR %</label>
          <input
            type="number"
            step="0.1"
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            Minimum payment (£)
          </label>
          <input
            type="number"
            value={payment}
            onChange={(e) => setPayment(Number(e.target.value))}
            className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
          />
        </div>
      </div>
    </div>
  );
}
