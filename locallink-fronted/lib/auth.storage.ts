import { AuthStorageKey } from "@/enums/auth.enum";
import type { AuthSession } from "@/@types/auth";

// Every read is guarded so this module stays importable from Server Components.
const isBrowser = () => typeof window !== "undefined";

export const authStorage = {
  getAccessToken(): string | null {
    if (!isBrowser()) return null;
    return window.localStorage.getItem(AuthStorageKey.ACCESS_TOKEN);
  },

  getSession(): AuthSession | null {
    const accessToken = authStorage.getAccessToken();
    if (!accessToken) return null;

    const issuedAt = Number(
      window.localStorage.getItem(AuthStorageKey.ISSUED_AT)
    );

    return { accessToken, issuedAt: Number.isFinite(issuedAt) ? issuedAt : 0 };
  },

  setSession({ accessToken, issuedAt }: AuthSession): void {
    if (!isBrowser()) return;
    window.localStorage.setItem(AuthStorageKey.ACCESS_TOKEN, accessToken);
    window.localStorage.setItem(AuthStorageKey.ISSUED_AT, String(issuedAt));
  },

  clear(): void {
    if (!isBrowser()) return;
    window.localStorage.removeItem(AuthStorageKey.ACCESS_TOKEN);
    window.localStorage.removeItem(AuthStorageKey.REFRESH_TOKEN);
    window.localStorage.removeItem(AuthStorageKey.ISSUED_AT);
  },
};
