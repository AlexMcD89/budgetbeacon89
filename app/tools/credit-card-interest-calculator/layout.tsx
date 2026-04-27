import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credit Card Interest Calculator UK | Repayment Cost Calculator",
  description:
    "Use our free credit card interest calculator to estimate monthly interest, repayment time and total interest based on balance, APR and monthly payment.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/credit-card-interest-calculator",
  },
  openGraph: {
    title: "Credit Card Interest Calculator UK",
    description:
      "Estimate credit card interest, payoff time and total repayment cost.",
    url: "https://www.budgetbeacon.co.uk/tools/credit-card-interest-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function CreditCardInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
