"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthRoute, OAuthParam } from "@/enums/auth.enum";
import { authStorage } from "@/lib/auth.storage";

export default function OAuthSuccessHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Snapshot the params on the first render. The effect below wipes them from
  // the URL, so reading them again later would report a missing token.
  const [params] = useState(() => ({
    token: searchParams.get(OAuthParam.TOKEN),
    createdAt: searchParams.get(OAuthParam.CREATED_AT),
    failure: searchParams.get(OAuthParam.ERROR),
  }));

  const error = params.failure
    ? "Google sign-in was cancelled or denied. Please try again."
    : !params.token
      ? "No sign-in token was returned. Please try signing in again."
      : null;

  // React 19 runs effects twice in dev StrictMode; the token is consumed once.
  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    // Strip the token out of the URL before anything else can read it —
    // history, the Referer header of any outbound link, or a shared tab.
    window.history.replaceState(null, "", window.location.pathname);

    if (!params.token || params.failure) return;

    const issuedAt = Number(params.createdAt);
    authStorage.setSession({
      accessToken: params.token,
      issuedAt: Number.isFinite(issuedAt) && issuedAt > 0 ? issuedAt : Date.now(),
    });

    router.replace(AuthRoute.HOME);
  }, [router, params]);

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-destructive/10 text-destructive">
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="size-5"
          >
            <path d="M12 8v5" />
            <path d="M12 16.5h.01" />
            <circle cx="12" cy="12" r="9" />
          </svg>
        </div>

        <div className="space-y-1">
          <h1 className="text-foreground">Sign-in failed</h1>
          <p className="text-sm text-muted-foreground">{error}</p>
        </div>

        <Link
          href={AuthRoute.LOGIN}
          className="mt-1 rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground transition-opacity hover:opacity-90"
        >
          Back to sign in
        </Link>
      </div>
    );
  }

  return <Pending />;
}

export function Pending() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center gap-4 text-center"
    >
      <span className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
      <p className="text-sm text-muted-foreground">Signing you in…</p>
    </div>
  );
}
