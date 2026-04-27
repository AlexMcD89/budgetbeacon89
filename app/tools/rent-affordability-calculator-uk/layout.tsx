import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator UK | How Much Rent Can I Afford?",
  description:
    "Use our free UK rent affordability calculator to estimate a safer rent range based on take-home pay, monthly debt, regular bills and target rent.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/rent-affordability-calculator-uk",
  },
  openGraph: {
    title: "Rent Affordability Calculator UK",
    description:
      "Estimate how much rent you may be able to afford using income, debts, bills and monthly take-home pay.",
    url: "https://www.budgetbeacon.co.uk/tools/rent-affordability-calculator-uk",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function RentAffordabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
