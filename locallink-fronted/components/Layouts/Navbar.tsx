import { NavLink } from "@/enums/auth.enum";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Navbar() {
    const pathname = usePathname();
    const isActive = (href: string) => {
        return href=== "/" ? pathname === "/" : pathname.startsWith(href)
    }

    // const 
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Link href={NavLink.HOME} className="flex items-center gap-8 px-4 sm:px-6">
         <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            L
          </span>
          <span className="text-base font-semibold">
            Local<span className="text-primary">Link</span>
          </span>
        </Link>
        <ul className="flex items-center gap-4 md:gap-7">
          {Object.values(NavLink).map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`text-sm transition-colors ${
                  isActive(href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

      </nav>
    </header>
  );
}
