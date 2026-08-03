"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthRoute } from "@/enums/auth.enum";
import { useAuthenticate } from "@/hooks/Authentication/useAuthenticate";

export default function AuthGuard({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  const { status } = useAuthenticate();

  useEffect(() => {
    // Redirecting during render is a side effect React will warn on — and the
    // status is "loading" on the first pass anyway, so it has to wait.
    if (status === "unauthenticated") {
      router.replace(AuthRoute.LOGIN);
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="flex flex-1 items-center justify-center"
      >
        <span className="size-8 animate-spin rounded-full border-2 border-border border-t-primary" />
        <span className="sr-only">Checking your session…</span>
      </div>
    );
  }

  return children;
}
