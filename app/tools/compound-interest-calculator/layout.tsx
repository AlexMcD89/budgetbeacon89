import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compound Interest Calculator UK | Savings Growth Calculator",
  description:
    "Use our free compound interest calculator to estimate how your savings or investments could grow over time with monthly contributions and compound growth.",
  alternates: {
    canonical:
      "https://www.budgetbeacon.co.uk/tools/compound-interest-calculator",
  },
  openGraph: {
    title: "Compound Interest Calculator UK",
    description:
      "Estimate long-term savings growth with compound interest, monthly contributions and different growth rates.",
    url: "https://www.budgetbeacon.co.uk/tools/compound-interest-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function CompoundInterestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
