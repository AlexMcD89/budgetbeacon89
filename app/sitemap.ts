import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.budgetbeacon.co.uk";

  const routes = [
    "",
    "/tools",
    "/guides",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",

    // Core tools
    "/tools/take-home-pay-calculator-uk",
    "/tools/hourly-to-salary-calculator",
    "/tools/salary-to-hourly-calculator",
    "/tools/overtime-pay-calculator",
    "/tools/rent-affordability-calculator-uk",
    "/tools//mortgage-affordability-calculator-uk",
    "/tools/mortgage-overpayment-calculator",
    "/tools/stamp-duty-calculator-uk",
    "/tools/debt-payoff-calculator",
    "/tools/loan-repayment-calculator",
    "/tools/credit-card-interest-calculator",
    "/tools/debt-snowball-calculator",
    "/tools/savings-goal-calculator",
    "/tools/emergency-fund-calculator",
    "/tools/compound-interest-calculator",
    "/tools/isa-savings-calculator",

    // Guides
    "/guides/how-much-rent-can-i-afford-uk",
    "/guides/healthy-savings-rate-uk",
    "/guides/debt-snowball-vs-avalanche-uk",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
