import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loan Repayment Calculator UK | Monthly Payment & Interest",
  description:
    "Use our free loan repayment calculator to estimate monthly repayments, total interest and total loan cost based on loan amount, interest rate and term.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/loan-repayment-calculator",
  },
  openGraph: {
    title: "Loan Repayment Calculator UK",
    description:
      "Estimate monthly loan repayments, total interest and total borrowing cost.",
    url: "https://www.budgetbeacon.co.uk/tools/loan-repayment-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function LoanRepaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
