import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Take-Home Pay Calculator UK | Salary After Tax Calculator",
  description:
    "Use our free UK take-home pay calculator to estimate monthly, weekly and annual pay after income tax, National Insurance, pension and student loan deductions.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/take-home-pay-calculator-uk",
  },
  openGraph: {
    title: "Take-Home Pay Calculator UK",
    description:
      "Estimate your UK salary after tax, National Insurance, pension contributions and student loan deductions.",
    url: "https://www.budgetbeacon.co.uk/tools/take-home-pay-calculator-uk",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function TakeHomePayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
