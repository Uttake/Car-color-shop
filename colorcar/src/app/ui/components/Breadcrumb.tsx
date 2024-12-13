import { clsx } from "clsx";
import Link from "next/link";
import ArrowIcon from "../../_assets/arrow.svg";
interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="block bg-white py-5 xl:px-4">
      <ol className={clsx("flex flex-wrap text-xl md:text-2xl wrapper")}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? "text-gray-900" : "text-gray-500"
            )}
          >
            <Link
              className="text-xl md:text-lg sm:text-sm"
              href={breadcrumb.href}
            >
              {breadcrumb.label}
            </Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block font-bold text-orange-brdr md:text-lg sm:text-sm">
                <ArrowIcon />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
