import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Fund Calculator UK | 3, 6 & 12 Month Savings Target",
  description:
    "Use our free emergency fund calculator to estimate how much emergency savings you may need based on your essential monthly expenses.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/emergency-fund-calculator",
  },
  openGraph: {
    title: "Emergency Fund Calculator UK",
    description:
      "Estimate a 3, 6, 9 or 12 month emergency fund based on essential monthly costs.",
    url: "https://www.budgetbeacon.co.uk/tools/emergency-fund-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function EmergencyFundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
