"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Home,
  PoundSterling,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import AdsenseAd from "@/components/adsense-ad";

function formatGBP(value: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

type BuyerType = "main-home" | "first-time-buyer" | "additional-property";

function calculateStandardSDLT(price: number) {
  const bands = [
    { threshold: 125000, rate: 0 },
    { threshold: 250000, rate: 0.02 },
    { threshold: 925000, rate: 0.05 },
    { threshold: 1500000, rate: 0.1 },
    { threshold: Infinity, rate: 0.12 },
  ];

  let tax = 0;
  let previousThreshold = 0;

  for (const band of bands) {
    if (price > previousThreshold) {
      const taxableAmount = Math.min(price, band.threshold) - previousThreshold;
      tax += taxableAmount * band.rate;
      previousThreshold = band.threshold;
    }
  }

  return tax;
}

function calculateAdditionalPropertySDLT(price: number) {
  const bands = [
    { threshold: 125000, rate: 0.05 },
    { threshold: 250000, rate: 0.07 },
    { threshold: 925000, rate: 0.1 },
    { threshold: 1500000, rate: 0.15 },
    { threshold: Infinity, rate: 0.17 },
  ];

  let tax = 0;
  let previousThreshold = 0;

  for (const band of bands) {
    if (price > previousThreshold) {
      const taxableAmount = Math.min(price, band.threshold) - previousThreshold;
      tax += taxableAmount * band.rate;
      previousThreshold = band.threshold;
    }
  }

  return tax;
}

function calculateFirstTimeBuyerSDLT(price: number) {
  if (price > 500000) return calculateStandardSDLT(price);
  if (price <= 300000) return 0;
  return (price - 300000) * 0.05;
}

function calculateSDLT(price: number, buyerType: BuyerType) {
  if (buyerType === "first-time-buyer")
    return calculateFirstTimeBuyerSDLT(price);
  if (buyerType === "additional-property")
    return calculateAdditionalPropertySDLT(price);
  return calculateStandardSDLT(price);
}

export default function StampDutyCalculatorPage() {
  const [propertyPrice, setPropertyPrice] = useState(350000);
  const [buyerType, setBuyerType] = useState<BuyerType>("main-home");
  const [deposit, setDeposit] = useState(50000);

  const result = useMemo(() => {
    const stampDuty = calculateSDLT(propertyPrice, buyerType);
    const standardStampDuty = calculateStandardSDLT(propertyPrice);
    const firstTimeBuyerStampDuty = calculateFirstTimeBuyerSDLT(propertyPrice);
    const additionalPropertyStampDuty =
      calculateAdditionalPropertySDLT(propertyPrice);

    const mortgageNeeded = Math.max(0, propertyPrice - deposit);
    const upfrontCashNeeded = deposit + stampDuty;
    const effectiveRate =
      propertyPrice > 0 ? (stampDuty / propertyPrice) * 100 : 0;

    let status = "Standard purchase";
    let summary =
      "This estimate uses the England and Northern Ireland Stamp Duty Land Tax bands for a main residential purchase.";

    if (buyerType === "first-time-buyer") {
      status =
        propertyPrice <= 500000
          ? "First-time buyer relief"
          : "Relief not available";
      summary =
        propertyPrice <= 500000
          ? "This estimate applies first-time buyer relief. No SDLT is due up to £300,000, then 5% applies up to £500,000."
          : "First-time buyer relief is not available above £500,000, so standard residential rates apply.";
    }

    if (buyerType === "additional-property") {
      status = "Additional property rates";
      summary =
        "This estimate applies higher SDLT rates for additional residential properties.";
    }

    return {
      stampDuty,
      standardStampDuty,
      firstTimeBuyerStampDuty,
      additionalPropertyStampDuty,
      mortgageNeeded,
      upfrontCashNeeded,
      effectiveRate,
      comparisonSaving: standardStampDuty - firstTimeBuyerStampDuty,
      additionalPropertyExtra: additionalPropertyStampDuty - standardStampDuty,
      status,
      summary,
    };
  }, [propertyPrice, buyerType, deposit]);

  const applyScenario = (
    type: "first-home" | "moving-home" | "second-home",
  ) => {
    if (type === "first-home") {
      setPropertyPrice(350000);
      setBuyerType("first-time-buyer");
      setDeposit(40000);
    }

    if (type === "moving-home") {
      setPropertyPrice(425000);
      setBuyerType("main-home");
      setDeposit(70000);
    }

    if (type === "second-home") {
      setPropertyPrice(300000);
      setBuyerType("additional-property");
      setDeposit(90000);
    }
  };

  return (
    <main className="bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-16">
          <div className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              Housing tool
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
              Stamp Duty Calculator UK
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Estimate Stamp Duty Land Tax for residential property purchases in
              England and Northern Ireland, including first-time buyer relief,
              main home purchases, and additional property rates.
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
                  onClick={() => applyScenario("first-home")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  First home
                </button>
                <button
                  onClick={() => applyScenario("moving-home")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Moving home
                </button>
                <button
                  onClick={() => applyScenario("second-home")}
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-100"
                >
                  Additional property
                </button>
              </div>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Property price (£)
                  </label>
                  <input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700">
                    Deposit (£)
                  </label>
                  <input
                    type="number"
                    value={deposit}
                    onChange={(e) => setDeposit(Number(e.target.value))}
                    className="mt-2 h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 outline-none transition focus:border-slate-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-slate-700">
                    Buyer type
                  </label>
                  <div className="mt-2 grid gap-2 sm:grid-cols-3">
                    {[
                      ["main-home", "Main home"],
                      ["first-time-buyer", "First-time buyer"],
                      ["additional-property", "Additional property"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        onClick={() => setBuyerType(value as BuyerType)}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium transition ${
                          buyerType === value
                            ? "bg-slate-900 text-white"
                            : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-3xl bg-slate-100 p-5">
                <p className="text-sm font-medium text-slate-900">
                  Current scope
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This calculator is for residential purchases in England and
                  Northern Ireland. Scotland uses LBTT and Wales uses LTT, which
                  have different rules.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Popular next steps
              </h2>

              <div className="mt-4 space-y-3">
                <Link
                  href="/tools/mortgage-affordability-calculator-uk"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Check mortgage affordability
                </Link>

                <Link
                  href="/tools/monthly-budget-planner"
                  className="block rounded-2xl bg-slate-100 p-4 text-sm font-medium text-slate-900 transition hover:bg-slate-200"
                >
                  Plan your buying budget
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
                  Compare with renting affordability
                </Link>
              </div>
            </div>

            <div className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                SDLT at a glance
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Stamp duty is banded, so the full property price is not taxed at
                one single rate. The effective rate shown in the result is the
                total stamp duty as a percentage of the property price.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <ResultCard
                icon={<PoundSterling className="h-5 w-5" />}
                label="Estimated stamp duty"
                value={formatGBP(result.stampDuty)}
                description="Based on the buyer type selected."
              />
              <ResultCard
                icon={<Wallet className="h-5 w-5" />}
                label="Upfront cash estimate"
                value={formatGBP(result.upfrontCashNeeded)}
                description="Deposit plus estimated stamp duty."
              />
            </div>

            <div className="rounded-[2rem] bg-slate-900 p-6 text-white shadow-xl md:p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                Stamp duty summary
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-semibold">{result.status}</p>
                  <p className="text-sm text-slate-300">
                    Effective rate: {result.effectiveRate.toFixed(2)}%
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-7 text-slate-200">
                {result.summary}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Mortgage needed
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(result.mortgageNeeded)}
                  </p>
                </div>

                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
                    Property price
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatGBP(propertyPrice)}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold tracking-tight">
                Compare buyer types
              </h2>

              <div className="mt-5 space-y-4">
                <CompareRow
                  label="Standard main home"
                  value={result.standardStampDuty}
                />
                <CompareRow
                  label="First-time buyer"
                  value={result.firstTimeBuyerStampDuty}
                  note={`Potential saving vs standard: ${formatGBP(Math.max(0, result.comparisonSaving))}`}
                />
                <CompareRow
                  label="Additional property"
                  value={result.additionalPropertyStampDuty}
                  note={`Extra vs standard: ${formatGBP(result.additionalPropertyExtra)}`}
                />
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100">
                <Home className="h-5 w-5 text-slate-900" />
              </div>
              <h2 className="mt-5 text-xl font-semibold tracking-tight">
                What this means
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Stamp Duty Land Tax is calculated in bands, so you only pay each
                rate on the portion of the property price within that band.
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
            How does stamp duty work in England and Northern Ireland?
          </h2>

          <div className="mt-5 space-y-4 text-slate-600">
            <p className="leading-7">
              Stamp Duty Land Tax, often shortened to SDLT, is a tax paid when
              buying property or land in England and Northern Ireland. The
              amount depends on the property price, whether you are a first-time
              buyer, and whether the purchase is an additional property.
            </p>
            <p className="leading-7">
              SDLT is calculated in bands. This means you do not usually pay one
              flat rate on the whole property price. Instead, different parts of
              the price are taxed at different rates.
            </p>
            <p className="leading-7">
              First-time buyer relief can reduce the amount due on eligible
              purchases, while additional residential properties usually attract
              higher rates. Scotland and Wales have separate property tax
              systems, so this calculator is focused on England and Northern
              Ireland only.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <InfoCard
              title="Main home purchase"
              text="Uses the standard SDLT residential bands for England and Northern Ireland."
            />
            <InfoCard
              title="First-time buyer"
              text="May qualify for reduced SDLT if the property price is within the eligible relief limit."
            />
            <InfoCard
              title="Additional property"
              text="Usually attracts higher SDLT rates, often relevant for second homes or buy-to-let purchases."
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
                Use the stamp duty estimate when working out your total upfront
                buying costs. It is often one of the largest extra costs after
                your deposit.
              </p>
              <p className="leading-7">
                First-time buyer relief can reduce SDLT on eligible purchases up
                to £500,000. Above that price, standard rates apply.
              </p>
              <p className="leading-7">
                This calculator is an estimate only. Your solicitor or
                conveyancer should confirm the exact amount due.
              </p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-semibold tracking-tight">FAQs</h2>
            <div className="mt-5 space-y-4">
              <FAQ
                question="Where does this calculator apply?"
                answer="It applies to residential property purchases in England and Northern Ireland. Scotland and Wales use different property tax systems."
              />
              <FAQ
                question="What are the first-time buyer rules?"
                answer="Eligible first-time buyers pay no SDLT up to £300,000 and 5% on the portion from £300,001 to £500,000. If the price is over £500,000, standard rates apply."
              />
              <FAQ
                question="Do additional properties cost more?"
                answer="Yes. Additional residential properties normally have higher SDLT rates than a main home purchase."
              />
              <FAQ
                question="When do you pay stamp duty?"
                answer="SDLT is normally handled as part of the purchase process, and your solicitor or conveyancer will usually submit the return and confirm the amount due."
              />
              <FAQ
                question="What does effective rate mean?"
                answer="The effective rate shows the total stamp duty as a percentage of the property price. It is an average figure, not the same as the banded SDLT rates."
              />
              <FAQ
                question="Is this calculator financial advice?"
                answer="No. This calculator gives a general estimate only. You should confirm the exact SDLT amount with your solicitor, conveyancer, or HMRC guidance."
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tools/mortgage-affordability-calculator-uk"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Mortgage affordability
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
      </section>
    </main>
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

function CompareRow({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <div className="rounded-3xl bg-slate-100 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900">
        {formatGBP(value)}
      </p>
      {note ? (
        <p className="mt-2 text-sm leading-6 text-slate-600">{note}</p>
      ) : null}
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
      <p className="font-medium text-slate-900">{question}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
    </div>
  );
}
