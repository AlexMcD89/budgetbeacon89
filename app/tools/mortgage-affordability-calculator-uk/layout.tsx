import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Affordability Calculator UK | How Much Can I Borrow?",
  description:
    "Use our free UK mortgage affordability calculator to estimate how much you may be able to borrow, possible property price, monthly mortgage payments and affordability range.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/mortgage-affordability-calculator-uk",
  },
  openGraph: {
    title: "Mortgage Affordability Calculator UK",
    description:
      "Estimate mortgage borrowing, property price and monthly affordability based on income, deposit, debts and bills.",
    url: "https://www.budgetbeacon.co.uk/tools/mortgage-affordability-calculator-uk",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function MortgageAffordabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
