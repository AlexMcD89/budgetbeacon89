import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator UK | How Much Rent Can I Afford?",
  description:
    "Use our free UK rent affordability calculator to estimate how much rent you can afford based on salary, take-home pay, bills, debts and monthly breathing room.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/rent-affordability-calculator-uk",
  },
  openGraph: {
    title: "Rent Affordability Calculator UK",
    description:
      "Estimate a realistic rent range using salary, take-home pay, debts and monthly bills.",
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
