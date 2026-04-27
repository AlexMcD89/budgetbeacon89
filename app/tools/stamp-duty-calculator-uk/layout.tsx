import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stamp Duty Calculator UK | SDLT Calculator for England & NI",
  description:
    "Use our free stamp duty calculator to estimate SDLT on a property purchase in England or Northern Ireland, including first-time buyer relief and additional property rates.",
  alternates: {
    canonical: "https://www.budgetbeacon.co.uk/tools/stamp-duty-calculator-uk",
  },
  openGraph: {
    title: "Stamp Duty Calculator UK",
    description:
      "Estimate stamp duty on a UK property purchase, including first-time buyer and additional property rates.",
    url: "https://www.budgetbeacon.co.uk/tools/stamp-duty-calculator-uk",
    siteName: "BudgetBeacon",
    type: "website",
  },
};

export default function StampDutyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
