import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Monthly Budget Planner UK | Free Budget Calculator",
  description:
    "Use our free monthly budget planner to organise income, bills, rent, debt, savings and spending. See what is left each month and where pressure may be building.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/monthly-budget-planner",
  },
  openGraph: {
    title: "Monthly Budget Planner UK",
    description:
      "Plan your monthly budget, compare spending categories and see what money may be left after essentials.",
    url: "https://www.budgetbeacon.co.uk/tools/monthly-budget-planner",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function MonthlyBudgetPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
