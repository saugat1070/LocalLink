import AuthGuard from "@/components/Authentication/AuthGuard";

// Everything under this group requires a session. /login and /auth/success sit
// in the (auth) group instead, so the guard can't redirect-loop onto them.
export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthGuard>{children}</AuthGuard>;
}
