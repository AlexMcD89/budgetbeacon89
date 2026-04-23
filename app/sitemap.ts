import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.budgetbeacon.co.uk";

  const routes = [
    "",
    "/tools",
    "/guides",
    "/about",
    "/contact",
    "/privacy",
    "/terms",

    // Core tools
    "/tools/rent-affordability-calculator-uk",
    "/tools/take-home-pay-calculator",
    "/tools/mortgage-calculator",
    "/tools/mortgage-overpayment-calculator",
    "/tools/stamp-duty-calculator-uk",
    "/tools/loan-repayment-calculator",
    "/tools/credit-card-interest-calculator",
    "/tools/debt-payoff-calculator",
    "/tools/debt-snowball-calculator",
    "/tools/compound-interest-calculator",
    "/tools/isa-savings-calculator",
    "/tools/savings-goal-calculator",
    "/tools/emergency-fund-calculator",
    "/tools/hourly-to-salary-calculator",

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
