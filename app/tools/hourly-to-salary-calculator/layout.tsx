import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hourly to Salary Calculator UK | Hourly Pay to Annual Salary",
  description:
    "Use our free hourly to salary calculator to convert hourly pay into weekly, monthly and annual salary, with a simplified UK take-home pay estimate.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/hourly-to-salary-calculator",
  },
  openGraph: {
    title: "Hourly to Salary Calculator UK",
    description:
      "Convert hourly pay into annual salary and estimate monthly take-home pay.",
    url: "https://www.budgetbeacon.co.uk/tools/hourly-to-salary-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function HourlyToSalaryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
