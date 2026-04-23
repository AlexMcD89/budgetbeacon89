"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  PiggyBank,
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

function monthsToReachGoal(
  currentSavings: number,
  goalAmount: number,
  monthlySaving: number,
  annualRate: number,
) {
  const monthlyRate = annualRate / 100 / 12;
  let balance = currentSavings;
  let months = 0;
  let interestEarned = 0;

  if (goalAmount <= currentSavings) {
    return {
      months: 0,
      interestEarned: 0,
      finalBalance: currentSavings,
      impossible: false,
    };
  }

  if (monthlySaving <= 0 && monthlyRate <= 0) {
    return {
      months: Infinity,
      interestEarned: 0,
      finalBalance: balance,
      impossible: true,
    };
  }

  while (balance < goalAmount && months < 1200) {
    const interest = balance * monthlyRate;
    interestEarned += interest;
    balance += interest + monthlySaving;
    months += 1;
  }

  return {
    months,
    interestEarned,
    finalBalance: balance,
    impossible: months >= 1200,
  };
}

function monthlyNeededForDeadline(
  currentSavings: number,
  goalAmount: number,
  months: number,
  annualRate: number,
) {
  if (months <= 0) return Math.max(0, goalAmount - currentSavings);

  const monthlyRate = annualRate / 100 / 12;

  if (monthlyRate === 0) {
    return Math.max(0, (goalAmount - currentSavings) / months);
  }

  const futureValueOfCurrent =
    currentSavings * Math.pow(1 + monthlyRate, months);

  const remainingNeeded = goalAmount - futureValueOfCurrent;

  if (remainingNeeded <= 0) return 0;

  return (
    remainingNeeded / ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
  );
}

export default function SavingsGoalCalculatorPage() {
  const [goalAmount, setGoalAmount] = useState(10000);
  const [currentSavings, setCurrentSavings] = useState(1500);
  const [monthlySaving, setMonthlySaving] = useState(300);
  const [annualRate, setAnnualRate] = useState(4);
  const [targetMonths, setTargetMonths] = useState(24);

  const result = useMemo(() => {
    const payoff = monthsToReachGoal(
      currentSavings,
      goalAmount,
      monthlySaving,
      annualRate,
    );

    const remaining = Math.max(0, goalAmount - currentSavings);
    const progress = goalAmount > 0 ? (currentSavings / goalAmount) * 100 : 0;

    const neededForDeadline = monthlyNeededForDeadline(
      currentSavings,
      goalAmount,
      targetMonths,
      annualRate,
    );

    const deadlinePlan = monthsToReachGoal(
      currentSavings,
      goalAmount,
      neededForDeadline,
      annualRate,
    );

    const extraNeeded = Math.max(0, neededForDeadline - monthlySaving);

    let status = "On track";
    let summary =
      "Your current monthly saving plan gives you a clear path towards your goal.";

    if (payoff.impossible) {
      status = "Needs a plan";
      summary =
        "At the current saving level, this goal is not reachable within a practical timeframe.";
    } else if (payoff.months > targetMonths) {
      status = "Behind target";
      summary =
        "Your current monthly saving amount is likely to miss your target deadline unless you increase contributions or extend the timeframe.";
    } else if (payoff.months <= targetMonths * 0.75) {
      status = "Ahead of target";
      summary =
        "Your current plan appears to reach the goal earlier than the target timeframe.";
    }

    return {
      payoff,
      remaining,
      progress: Math.min(100, progress),
      neededForDeadline,
      deadlinePlan,
      extraNeeded,
      status,
      summary,
    };
  }, [goalAmount, currentSavings, monthlySaving, annualRate, targetMonths]);

  const applyScenario = (type: "emergency" | "house" | "holiday") => {
    if (type === "emergency") {
      setGoalAmount(6000);
      setCurrentSavings(1000);
      setMonthlySaving(250);
      setAnnualRate(4);
      setTargetMonths(20);
    }

    if (type === "house") {
      setGoalAmount(25000);
      setCurrentSavings(5000);
      setMonthlySaving(600);
      setAnnualRate(4.5);
      setTargetMonths(36);
    }

    if (type === "holiday") {
      setGoalAmount(2500);
      setCurrentSavings(400);
      setMonthlySaving(180);
      setAnnualRate(3.5);
      setTargetMonths(12);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Savings tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Savings Goal Calculator
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Work out how long it could take to reach a savings goal, how much
              you may need to save each month, and whether your current plan is
              on track.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => applyScenario("emergency")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Emergency fund
              </button>
              <button
                onClick={() => applyScenario("house")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                House deposit
              </button>
              <button
                onClick={() => applyScenario("holiday")}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Holiday goal
              </button>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700">
                  Savings goal (£)
                </label>
                <input
                  type="number"
                  value={goalAmount}
                  onChange={(e) => setGoalAmount(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Current savings (£)
                </label>
                <input
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Monthly saving (£)
                </label>
                <input
                  type="number"
                  value={monthlySaving}
                  onChange={(e) => setMonthlySaving(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Interest / growth rate %
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-slate-700">
                  Target timeframe (months)
                </label>
                <input
                  type="number"
                  value={targetMonths}
                  onChange={(e) => setTargetMonths(Number(e.target.value))}
                  className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                />
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-slate-100 p-5">
              <p className="text-sm font-medium text-slate-900">
                What this tool helps with
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Use this calculator to compare your current monthly saving
                amount with the amount needed to hit your goal by a chosen
                deadline.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">
                  Time to reach goal
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {result.payoff.impossible
                    ? "Not on track"
                    : formatMonths(result.payoff.months)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Based on your current monthly saving amount.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                  <PoundSterling className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">Monthly needed</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {formatGBP(result.neededForDeadline)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Estimated monthly saving needed for your target timeframe.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Goal summary
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{result.status}</p>
                  <p className="text-sm text-slate-300">
                    Progress: {result.progress.toFixed(1)}%
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white"
                  style={{ width: `${result.progress}%` }}
                />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Remaining to save
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.remaining)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Extra needed/month
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.extraNeeded)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Current plan vs target plan
              </h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Current monthly saving
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(monthlySaving)}
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Needed for target deadline
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.neededForDeadline)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This is the estimated monthly amount needed to hit the goal
                    in {targetMonths} months.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <p className="text-sm text-slate-500">
                    Estimated interest / growth earned
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-900">
                    {formatGBP(result.payoff.interestEarned)}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This assumes the interest or growth rate you entered remains
                    the same, which may not happen in real life.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <PiggyBank className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                What this means
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                A savings goal becomes easier to manage when you know the
                monthly number. If the target amount feels too high, you can
                adjust the deadline, reduce the goal, or look for extra room in
                your budget.
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
                Use the monthly needed figure as your target. If it is too high,
                try changing the timeframe or using the budget planner to find
                extra room.
              </p>
              <p className="leading-7">
                The interest or growth estimate is only a planning guide.
                Savings rates and investment returns can change over time.
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
                  How much should I save each month?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  It depends on your goal amount, deadline, current savings, and
                  how much room you have in your monthly budget.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  Should I include interest or growth?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  You can include a cautious estimate, but avoid relying too
                  heavily on growth if the goal is short term or essential.
                </p>
              </div>

              <div className="rounded-3xl bg-slate-100 p-4">
                <p className="font-medium text-slate-900">
                  What if I am behind target?
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  You can increase monthly savings, extend the deadline, lower
                  the goal, or use a budget planner to find spare cash.
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
              href="/tools/monthly-budget-planner"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Budget planner
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>

            <Link
              href="/tools/compound-interest-calculator"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              Compound interest
            </Link>

            <Link
              href="/tools/isa-savings-calculator"
              className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
            >
              ISA savings
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
