import Link from "next/link";
import { ArrowRight, CreditCard, Home, PiggyBank, Wallet } from "lucide-react";

const categories = [
  {
    title: "Income Tools",
    description:
      "Salary, take-home pay, hourly pay, overtime, and income planning calculators.",
    href: "/tools/income",
    icon: Wallet,
    tools: [
      {
        title: "Take-Home Pay Calculator UK",
        href: "/tools/take-home-pay-calculator-uk",
      },
      {
        title: "Hourly to Salary Calculator",
        href: "/tools/hourly-to-salary-calculator",
      },
      {
        title: "Salary to Hourly Calculator",
        href: "/tools/salary-to-hourly-calculator",
      },
      {
        title: "Overtime Pay Calculator",
        href: "/tools/overtime-pay-calculator",
      },
    ],
  },
  {
    title: "Housing Tools",
    description:
      "Rent, mortgages, deposits, stamp duty, and affordability calculators for UK households.",
    href: "/tools/housing",
    icon: Home,
    tools: [
      {
        title: "Rent Affordability Calculator UK",
        href: "/tools/rent-affordability-calculator-uk",
      },
      {
        title: "Mortgage Affordability Calculator UK",
        href: "/tools/mortgage-affordability-calculator-uk",
      },
      {
        title: "Mortgage Overpayment Calculator",
        href: "/tools/mortgage-overpayment-calculator",
      },
      {
        title: "Stamp Duty Calculator UK",
        href: "/tools/stamp-duty-calculator-uk",
      },
    ],
  },
  {
    title: "Debt Tools",
    description:
      "Repayment planning, interest tracking, and debt strategy tools for clearer decisions.",
    href: "/tools/debt",
    icon: CreditCard,
    tools: [
      {
        title: "Debt Payoff Calculator",
        href: "/tools/debt-payoff-calculator",
      },
      {
        title: "Loan Repayment Calculator",
        href: "/tools/loan-repayment-calculator",
      },
      {
        title: "Credit Card Interest Calculator",
        href: "/tools/credit-card-interest-calculator",
      },
      {
        title: "Debt Snowball Calculator",
        href: "/tools/debt-snowball-calculator",
      },
    ],
  },
  {
    title: "Savings Tools",
    description:
      "Savings goals, emergency funds, compounding, and long-term planning calculators.",
    href: "/tools/savings",
    icon: PiggyBank,
    tools: [
      {
        title: "Savings Goal Calculator",
        href: "/tools/savings-goal-calculator",
      },
      {
        title: "Emergency Fund Calculator",
        href: "/tools/emergency-fund-calculator",
      },
      {
        title: "Compound Interest Calculator",
        href: "/tools/compound-interest-calculator",
      },
      {
        title: "ISA Savings Calculator",
        href: "/tools/isa-savings-calculator",
      },
    ],
  },
];

const featured = [
  {
    title: "Rent Affordability Calculator UK",
    description:
      "The flagship BudgetBeacon tool for working out a safer, more realistic rent range.",
    href: "/tools/rent-affordability-calculator-uk",
  },
  {
    title: "Take-Home Pay Calculator UK",
    description:
      "A high-demand search tool and one of the strongest long-term traffic drivers.",
    href: "/tools/take-home-pay-calculator-uk",
  },
  {
    title: "Savings Goal Calculator",
    description:
      "A simple but sticky tool that encourages repeat use and comparison testing.",
    href: "/tools/savings-goal-calculator",
  },
];

export default function ToolsPage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Tools hub
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Explore every BudgetBeacon tool
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Browse calculators by category, start with the flagship tools, and
              move through the site based on the financial decision you are
              trying to make.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {featured.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:bg-slate-100"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  Featured
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
                <div className="mt-5 inline-flex items-center text-sm font-medium text-slate-900">
                  Open tool
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-6">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <section
                key={category.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
              >
                <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <Icon className="h-5 w-5 text-slate-900" />
                    </div>

                    <h2 className="mt-5 text-2xl font-semibold tracking-tight">
                      {category.title}
                    </h2>

                    <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
                      {category.description}
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {category.tools.map((tool) => (
                      <Link
                        key={tool.title}
                        href={tool.href}
                        className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-0.5 hover:bg-slate-100"
                      >
                        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                          {tool.title}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          Open this tool to explore calculations, results, and
                          next-step guidance.
                        </p>
                        <div className="mt-4 inline-flex items-center text-sm font-medium text-slate-900">
                          Open tool
                          <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white md:px-10">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                  Best place to start
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                  Start with the highest-value tools first
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                  If you are not sure where to begin, the rent affordability and
                  take-home pay calculators are the strongest entry points into
                  the site.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/tools/rent-affordability-calculator-uk"
                  className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Rent calculator
                </Link>
                <Link
                  href="/tools/take-home-pay-calculator-uk"
                  className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Take-home pay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
