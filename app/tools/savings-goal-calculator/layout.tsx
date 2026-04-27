import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Savings Goal Calculator UK | How Much to Save Each Month",
  description:
    "Use our free savings goal calculator to work out how long it could take to reach a goal, how much to save each month, and whether your plan is on track.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/savings-goal-calculator",
  },
  openGraph: {
    title: "Savings Goal Calculator UK",
    description:
      "Estimate how much to save monthly for a goal, how long it may take, and whether your plan is on track.",
    url: "https://www.budgetbeacon.co.uk/tools/savings-goal-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function SavingsGoalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
