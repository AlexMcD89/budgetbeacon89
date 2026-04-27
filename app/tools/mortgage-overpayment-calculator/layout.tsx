import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mortgage Overpayment Calculator UK | Interest & Time Saved",
  description:
    "Use our free mortgage overpayment calculator to estimate how much interest you could save and how much sooner you could clear your mortgage with overpayments.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/mortgage-overpayment-calculator",
  },
  openGraph: {
    title: "Mortgage Overpayment Calculator UK",
    description:
      "Estimate interest saved, time saved and overpayment allowance impact from monthly or lump-sum mortgage overpayments.",
    url: "https://www.budgetbeacon.co.uk/tools/mortgage-overpayment-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function MortgageOverpaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
