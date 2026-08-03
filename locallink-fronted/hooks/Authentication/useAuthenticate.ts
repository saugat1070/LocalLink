"use client";

import { useState, useSyncExternalStore } from "react";
import { authStorage } from "@/lib/auth.storage";
import { authenticateService } from "@/services/authenticate.service";
import { AuthRoute } from "@/enums/auth.enum";
import { useRouter } from "next/navigation";

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";

// The token only changes on a full navigation (sign in, sign out), so there is
// nothing to subscribe to — the unsubscribe is a no-op.
const subscribe = () => () => {};

export function useAuthenticate() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  // `undefined` during SSR and hydration, `string | null` once on the client.
  const token = useSyncExternalStore(
    subscribe,
    () => authStorage.getAccessToken(),
    () => undefined,
  );

  const status: AuthStatus =
    token === undefined
      ? "loading"
      : token
        ? "authenticated"
        : "unauthenticated";

  const logout = async () => {
        setLoading(true);
        try {
            await authenticateService.logout();
            router.push(AuthRoute.HOME);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

  return { token, status, logout, loading };
}
