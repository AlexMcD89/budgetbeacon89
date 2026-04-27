import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overtime Pay Calculator UK | Gross & Take-Home Overtime",
  description:
    "Use our free overtime pay calculator to estimate overtime earnings, monthly overtime pay and extra take-home pay after tax, National Insurance, pension and student loan deductions.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/overtime-pay-calculator",
  },
  openGraph: {
    title: "Overtime Pay Calculator UK",
    description:
      "Estimate gross overtime pay and extra monthly take-home pay from overtime hours, hourly rate and overtime multiplier.",
    url: "https://www.budgetbeacon.co.uk/tools/overtime-pay-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function OvertimePayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
