"use client";

import { useSyncExternalStore } from "react";
import { authStorage } from "@/lib/auth.storage";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

// The token only changes on a full navigation (sign in, sign out), so there is
// nothing to subscribe to — the unsubscribe is a no-op.
const subscribe = () => () => {};

export function useAuthenticate() {
  // `undefined` during SSR and hydration, `string | null` once on the client.
  const token = useSyncExternalStore(
    subscribe,
    () => authStorage.getAccessToken(),
    () => undefined
  );

  const status: AuthStatus =
    token === undefined
      ? "loading"
      : token
        ? "authenticated"
        : "unauthenticated";

  return { token, status };
}
