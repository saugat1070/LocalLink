"use client";
import { NavLink } from "@/enums/auth.enum";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useAuthenticate } from "@/hooks/Authentication/useAuthenticate";
import { Wifi } from "lucide-react";
export default function Navbar() {
  const pathname = usePathname();

  const { logout, token } = useAuthenticate();
  const isActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  };

  // const
  return (
    <header
      className={`${token ? "hidden" : ""} sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur`}
    >
      <nav className="mx-auto flex h-14 max-w-7xl items-center gap-8 px-4 sm:px-6">
        <Link
          href={NavLink.HOME}
          className="flex items-center gap-8 px-4 sm:px-6"
        >
          <Wifi className="h-6 w-6 text-primary" />
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

        <div className="ml-auto flex items-center gap-3">
          <Wifi />

          {/* Three branches, not two: the hook reports "loading" until the client
              reads localStorage, and guessing during that pass would flash the
              wrong control and break hydration. */}
          {status === "loading" ? (
            <span className="h-9 w-24 animate-pulse rounded-md bg-secondary" />
          ) : status === "authenticated" ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-md border border-border bg-secondary px-4 py-2 text-sm text-secondary-foreground transition-colors hover:bg-muted hover:cursor-pointer"
            >
              Sign out
            </button>
          ) : (
            <Link
              href={NavLink.LOGIN.href}
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              {NavLink.LOGIN.label}
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
