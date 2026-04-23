import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Calculator,
  CreditCard,
  Home,
  PiggyBank,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const featuredTools = [
  {
    title: "Rent Affordability Calculator UK",
    description:
      "See safer, balanced, and more stretched rent ranges based on your take-home pay and monthly costs.",
    href: "/tools/rent-affordability-calculator-uk",
    icon: Home,
    tag: "Popular tool",
  },
  {
    title: "Take-Home Pay Calculator UK",
    description:
      "Turn salary into estimated monthly income after tax, National Insurance, pension, and student loan.",
    href: "/tools/take-home-pay-calculator-uk",
    icon: Wallet,
    tag: "Everyday essential",
  },
  {
    title: "Credit Card Interest Calculator UK",
    description:
      "Estimate how much interest could build up, how long repayment may take, and how payment changes affect the outcome.",
    href: "/tools/credit-card-interest-calculator",
    icon: CreditCard,
    tag: "Debt planning",
  },
  {
    title: "Compound Interest Calculator UK",
    description:
      "Estimate how savings or investments could grow over time with regular contributions and compounding.",
    href: "/tools/compound-interest-calculator",
    icon: PiggyBank,
    tag: "Long-term planning",
  },
];

const categories = [
  {
    title: "Income",
    description:
      "Salary, take-home pay, hourly pay, overtime, and side income tools.",
    icon: Wallet,
    href: "/tools/income",
  },
  {
    title: "Housing",
    description:
      "Rent, mortgages, deposits, overpayments, and affordability tools.",
    icon: Home,
    href: "/tools/housing",
  },
  {
    title: "Debt",
    description:
      "Debt repayment, interest cost, loan planning, and payoff tools.",
    icon: CreditCard,
    href: "/tools/debt",
  },
  {
    title: "Savings",
    description: "Emergency funds, ISAs, compounding, and goal planning tools.",
    icon: PiggyBank,
    href: "/tools/savings",
  },
];

const guides = [
  {
    title: "How Much Rent Can I Afford in the UK?",
    description:
      "A practical guide to finding a rent level that feels realistic, not just technically possible.",
    href: "/guides/how-much-rent-can-i-afford-uk",
  },
  {
    title: "What Is a Healthy Savings Rate in the UK?",
    description:
      "A plain-English guide to understanding savings benchmarks and what may be realistic for you.",
    href: "/guides/healthy-savings-rate-uk",
  },
  {
    title: "Debt Snowball vs Avalanche (UK Guide)",
    description:
      "Compare two common debt repayment strategies and see which approach may suit your situation.",
    href: "/guides/debt-snowball-vs-avalanche-uk",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-medium tracking-[0.2em] text-slate-500 uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-slate-600">{description}</p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                UK money tools built for everyday decisions
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 md:text-6xl md:leading-[1.05]">
                Better money decisions start with clearer tools.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                BudgetBeacon gives you practical UK-focused calculators and
                guides for rent, pay, debt, savings, and everyday financial
                planning.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tools"
                  className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Explore tools
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/tools/rent-affordability-calculator-uk"
                  className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Try rent calculator
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Useful tools</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Practical calculators designed to help with real financial
                    decisions.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">Clear results</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Understand what looks safer, more balanced, or more
                    stretched in seconds.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">UK-focused</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Built around UK salaries, housing costs, tax assumptions,
                    and everyday money habits.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl md:p-8">
              <div className="rounded-3xl bg-slate-900 p-6 text-white">
                <p className="text-sm text-slate-300">Featured tool</p>
                <h2 className="mt-2 text-2xl font-semibold">
                  Rent Affordability Calculator UK
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Estimate a safer rent range based on take-home pay, debt, and
                  monthly costs.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                      Safer
                    </p>
                    <p className="mt-2 text-2xl font-semibold">£1,050</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                      Balanced
                    </p>
                    <p className="mt-2 text-2xl font-semibold">£1,220</p>
                  </div>
                </div>

                <Link
                  href="/tools/rent-affordability-calculator-uk"
                  className="mt-6 inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Open calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-100 p-5">
                  <p className="text-sm text-slate-500">
                    Popular starting point
                  </p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    Take-home pay
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    A useful first step for budgeting, rent planning, and
                    comparing everyday costs.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-5">
                  <p className="text-sm text-slate-500">Helpful next step</p>
                  <p className="mt-2 text-xl font-semibold text-slate-900">
                    Debt and savings
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Compare repayments, test scenarios, and see how your money
                    could build over time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <SectionHeading
          eyebrow="Featured tools"
          title="Useful calculators for everyday money decisions"
          description="Start with the most popular tools for rent, income, debt, and savings. Each one is designed to give practical results you can actually use."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredTools.map((tool) => {
            const Icon = tool.icon;

            return (
              <Link
                key={tool.title}
                href={tool.href}
                className="group rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-5 w-5 text-slate-900" />
                </div>

                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                    {tool.tag}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-900">
                    {tool.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-6 inline-flex items-center text-sm font-medium text-slate-900">
                  Open tool
                  <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <SectionHeading
            eyebrow="Browse by category"
            title="Explore the site by topic"
            description="Whether you are checking your pay, planning housing costs, reducing debt, or building savings, you can explore each area in one place."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  href={category.href}
                  className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:bg-slate-100"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white">
                    <Icon className="h-5 w-5 text-slate-900" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">
                    {category.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {category.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="Why people use BudgetBeacon"
              title="Clearer tools. More useful answers."
              description="BudgetBeacon is designed to help you move beyond raw numbers and understand how financial decisions may feel in real life."
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">Practical outputs</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  See more helpful ranges and scenarios instead of only one
                  number.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">Scenario testing</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Compare different incomes, rent levels, debt costs, and
                  savings plans.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">Connected tools</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Move naturally between calculators and guides that support the
                  same decision.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold">Cleaner design</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Fast, mobile-friendly pages designed to feel simple and easy
                  to use.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-900 p-8 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              A better way to plan
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-tight">
              Use tools and guides together.
            </h3>
            <p className="mt-4 text-base leading-7 text-slate-300">
              Some questions are best answered with a calculator. Others need
              more explanation. BudgetBeacon combines both so you can understand
              the numbers and the wider picture.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm font-medium">Check the numbers</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Use calculators to estimate affordability, repayments, and
                  savings growth.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm font-medium">Understand the trade-offs</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Read guides that explain what the results may mean in
                  practice.
                </p>
              </div>
              <div className="rounded-3xl bg-white/10 p-4">
                <p className="text-sm font-medium">Compare next steps</p>
                <p className="mt-1 text-sm leading-6 text-slate-300">
                  Move between related pages to build a clearer overall plan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Guides"
              title="Helpful reading to support the tools"
              description="Guides can help explain the ideas behind the calculators and give you more context for your next decision."
            />

            <Link
              href="/guides"
              className="inline-flex items-center text-sm font-medium text-slate-900"
            >
              View all guides
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {guides.map((guide) => (
              <Link
                key={guide.title}
                href={guide.href}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 transition hover:bg-slate-100"
              >
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                  Guide
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-900">
                  {guide.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {guide.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white md:px-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Start here
              </p>
              <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">
                Ready to explore BudgetBeacon?
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                Start with the rent calculator or browse the full tool library
                to find the page that fits your next decision.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/tools/rent-affordability-calculator-uk"
                className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
              >
                Open rent calculator
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Browse all tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
