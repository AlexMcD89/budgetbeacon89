import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Payoff Calculator UK | Repayment Time & Interest Calculator",
  description:
    "Use our free debt payoff calculator to estimate how long it could take to clear debt, how much interest you may pay and how extra payments could help.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/debt-payoff-calculator",
  },
  openGraph: {
    title: "Debt Payoff Calculator UK",
    description:
      "Estimate debt payoff time, interest cost and the impact of extra monthly payments.",
    url: "https://www.budgetbeacon.co.uk/tools/debt-payoff-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function DebtPayoffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
