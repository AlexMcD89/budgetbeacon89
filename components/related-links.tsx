import Link from "next/link";
import { ArrowRight } from "lucide-react";

type RelatedLinkItem = {
  title: string;
  description: string;
  href: string;
};

type RelatedLinksProps = {
  heading?: string;
  links: RelatedLinkItem[];
};

export default function RelatedLinks({
  heading = "Related tools and guides",
  links,
}: RelatedLinksProps) {
  return (
    <section className="mt-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-semibold tracking-tight">{heading}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-slate-100"
          >
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              {link.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {link.description}
            </p>
            <div className="mt-4 inline-flex items-center text-sm font-medium text-slate-900">
              Open page
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
