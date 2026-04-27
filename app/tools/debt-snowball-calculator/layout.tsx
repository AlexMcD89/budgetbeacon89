import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Debt Snowball Calculator UK | Payoff Order Calculator",
  description:
    "Use our free debt snowball calculator to estimate your payoff order, debt-free date, interest saved and how extra payments could speed up repayment.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/debt-snowball-calculator",
  },
  openGraph: {
    title: "Debt Snowball Calculator UK",
    description:
      "Plan a debt snowball payoff order and estimate when each debt could be cleared.",
    url: "https://www.budgetbeacon.co.uk/tools/debt-snowball-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function DebtSnowballLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
