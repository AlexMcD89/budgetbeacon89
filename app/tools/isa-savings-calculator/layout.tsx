import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ISA Savings Calculator UK | ISA Allowance & Growth Calculator",
  description:
    "Use our free ISA savings calculator to estimate ISA growth, compare planned contributions with the annual ISA allowance and model long-term savings.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/isa-savings-calculator",
  },
  openGraph: {
    title: "ISA Savings Calculator UK",
    description:
      "Estimate ISA savings growth and compare contributions with the annual ISA allowance.",
    url: "https://www.budgetbeacon.co.uk/tools/isa-savings-calculator",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function ISASavingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
