import type { Metadata } from "next";

// This URL arrives carrying an access token. Keep it out of search indexes and
// stop the token leaking through the Referer header of any outbound request.
export const metadata: Metadata = {
  title: "Signing you in",
  referrer: "no-referrer",
  robots: { index: false, follow: false },
};

export default function OAuthSuccessLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
