import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary to Hourly Calculator UK | Convert Annual Salary to Hourly Pay",
  description:
    "Use our free salary to hourly calculator to convert annual salary into hourly pay, weekly pay, monthly pay and estimated take-home hourly rate.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/salary-to-hourly-calculator",
  },
  openGraph: {
    title: "Salary to Hourly Calculator UK",
    description:
      "Convert annual salary into hourly gross pay, weekly pay and estimated take-home hourly pay.",
    url: "https://www.budgetbeacon.co.uk/tools/salary-to-hourly-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function SalaryToHourlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
