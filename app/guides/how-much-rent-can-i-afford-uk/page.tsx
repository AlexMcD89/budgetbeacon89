import Link from "next/link";
import { ArrowRight, BookOpen, CircleHelp, Home, Wallet } from "lucide-react";
import RelatedLinks from "@/components/related-links";
import GuideDisclaimer from "@/components/guide-disclaimer";

export default function HowMuchRentCanIAffordGuidePage() {
  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
            Housing guide
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            How Much Rent Can I Afford in the UK?
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
              <BookOpen className="h-4 w-4" />7 min read
            </span>
            <span className="rounded-full bg-slate-100 px-3 py-1.5">
              UK-focused rent planning
            </span>
          </div>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            A practical guide to working out what rent level is realistic, not
            just technically possible. The goal is to find a number that still
            leaves enough room for bills, debt, food, transport, and everyday
            life.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-10 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <article className="space-y-6">
            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Best place to start
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                For many people, around 30% to 35% of take-home pay is a useful
                benchmark.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-200">
                But that benchmark is only a starting point. Your debt payments,
                utility costs, childcare, transport, and location all affect
                what feels genuinely comfortable each month.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/tools/rent-affordability-calculator-uk"
                  className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Try the calculator
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>

                <Link
                  href="/tools/take-home-pay-calculator-uk"
                  className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Check take-home pay
                </Link>
              </div>
            </div>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                The quick answer
              </h2>
              <div className="mt-5 space-y-4 text-slate-600">
                <p className="leading-7">
                  If you want a practical rule of thumb, aim to keep rent around
                  30% to 35% of your monthly take-home pay. This usually leaves
                  more breathing room for essentials and unexpected costs.
                </p>
                <p className="leading-7">
                  Once rent pushes toward 40% of take-home pay, things often
                  start to feel tighter. That does not always mean the rent is
                  impossible, but it usually means your monthly flexibility gets
                  much smaller.
                </p>
                <p className="leading-7">
                  In expensive areas, especially London, some people do end up
                  spending more than this. The important question is not whether
                  it is possible on paper, but whether it is sustainable without
                  constant financial pressure.
                </p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                What actually affects rent affordability?
              </h2>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-100 p-5">
                  <p className="font-semibold text-slate-900">Take-home pay</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Gross salary looks bigger, but take-home pay is the number
                    that really matters for rent decisions.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-5">
                  <p className="font-semibold text-slate-900">
                    Debt repayments
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Credit cards, loans, and car finance can eat into the money
                    that would otherwise support rent.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-5">
                  <p className="font-semibold text-slate-900">
                    Bills and utilities
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Council tax, energy, broadband, water, and insurance all add
                    up fast.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-5">
                  <p className="font-semibold text-slate-900">Location</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    In higher-cost areas, a technically affordable rent can
                    still feel uncomfortable once all other living costs are
                    included.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                A simple way to think about your rent range
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Safe
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    Around 30%
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Usually gives you the healthiest balance between rent and
                    the rest of your monthly life.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Balanced
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    Around 35%
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Often manageable for many households, but there is less room
                    for waste or surprises.
                  </p>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                    Stretch
                  </p>
                  <p className="mt-3 text-lg font-semibold text-slate-900">
                    40%+
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    This can work for some people, but it often starts to feel
                    stressful once real life gets in the way.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Worked example
              </h2>
              <div className="mt-5 space-y-4 text-slate-600">
                <p className="leading-7">
                  Imagine your monthly take-home pay is around £2,600. A rough
                  guide might look like this:
                </p>
                <ul className="space-y-3 pl-5 text-slate-600">
                  <li className="list-disc leading-7">
                    Safe rent: about{" "}
                    <span className="font-semibold text-slate-900">£780</span>
                  </li>
                  <li className="list-disc leading-7">
                    Balanced rent: about{" "}
                    <span className="font-semibold text-slate-900">£910</span>
                  </li>
                  <li className="list-disc leading-7">
                    Stretch rent: about{" "}
                    <span className="font-semibold text-slate-900">
                      £1,040+
                    </span>
                  </li>
                </ul>
                <p className="leading-7">
                  But if you also have £250 of monthly debt payments and £450 of
                  bills, the balanced number may need to come down. That is why
                  a real calculator is more useful than a flat percentage rule.
                </p>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">
                Signs your rent may be too high
              </h2>

              <div className="mt-5 space-y-4 text-slate-600">
                <p className="leading-7">
                  Here are some warning signs that your target rent may be above
                  a healthy level:
                </p>
                <ul className="space-y-3 pl-5">
                  <li className="list-disc leading-7">
                    You would have very little money left after essentials.
                  </li>
                  <li className="list-disc leading-7">
                    You would need to rely on credit for irregular costs.
                  </li>
                  <li className="list-disc leading-7">
                    You could not comfortably save anything most months.
                  </li>
                  <li className="list-disc leading-7">
                    Small bill increases would immediately create pressure.
                  </li>
                </ul>
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>

              <div className="mt-5 space-y-4">
                <div className="rounded-3xl bg-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <CircleHelp className="h-4 w-4 text-slate-700" />
                    <p className="font-medium text-slate-900">
                      Should I use gross pay or take-home pay?
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Take-home pay is the more useful number because it reflects
                    what actually reaches your bank account.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <CircleHelp className="h-4 w-4 text-slate-700" />
                    <p className="font-medium text-slate-900">
                      Is 40% of income on rent too much?
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    For many people, 40% of take-home pay starts to feel
                    stretched, especially once bills and debt are included.
                  </p>
                </div>

                <div className="rounded-3xl bg-slate-100 p-4">
                  <div className="flex items-center gap-2">
                    <CircleHelp className="h-4 w-4 text-slate-700" />
                    <p className="font-medium text-slate-900">
                      Is London different?
                    </p>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Yes. In high-cost areas, people may spend more on rent, but
                    that usually means less monthly flexibility elsewhere.
                  </p>
                </div>
              </div>
            </section>
          </article>

          <aside className="space-y-6">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                On this page
              </p>
              <div className="mt-4 space-y-3 text-sm text-slate-700">
                <p>The quick answer</p>
                <p>What affects affordability</p>
                <p>Rent range guide</p>
                <p>Worked example</p>
                <p>Warning signs</p>
                <p>FAQs</p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <Home className="h-5 w-5 text-slate-900" />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                Try the rent calculator
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Get a more tailored answer using your own salary, bills, and
                debt.
              </p>
              <Link
                href="/tools/rent-affordability-calculator-uk"
                className="mt-5 inline-flex items-center rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Open calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <Wallet className="h-5 w-5 text-slate-900" />
              </div>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">
                Check your take-home pay
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Use your estimated take-home pay instead of gross salary for a
                more realistic rent decision.
              </p>
              <Link
                href="/tools/take-home-pay-calculator-uk"
                className="mt-5 inline-flex items-center rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
              >
                Take-home tool
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-10 text-white md:px-10">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
              Next step
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Ready to work out your own number?
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
              Use the calculator to move from general guidance to a more
              tailored answer based on your own income and costs.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/tools/rent-affordability-calculator-uk"
                className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
              >
                Open rent calculator
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Back to tools
              </Link>
            </div>
          </div>
        </div>
      </section>
      <RelatedLinks
        heading="Related housing tools"
        links={[
          {
            title: "Rent Affordability Calculator UK",
            description:
              "Get a more personalised answer using your own figures.",
            href: "/tools/rent-affordability-calculator-uk",
          },
          {
            title: "Monthly Budget Planner",
            description:
              "Check whether your target rent works in the full monthly picture.",
            href: "/tools/monthly-budget-planner",
          },
          {
            title: "Take-Home Pay Calculator UK",
            description:
              "Use take-home pay, not gross salary, when judging rent.",
            href: "/tools/take-home-pay-calculator-uk",
          },
          {
            title: "Mortgage Affordability Calculator UK",
            description:
              "Compare renting affordability with buying affordability.",
            href: "/tools/mortgage-affordability-calculator-uk",
          },
        ]}
      />
      <GuideDisclaimer />
    </main>
  );
}
