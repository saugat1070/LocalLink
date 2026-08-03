"use client";

import { useState } from "react";
import { AuthEndpoint } from "@/enums/auth.enum";

export default function GoogleSignInButton() {
  const [redirecting, setRedirecting] = useState(false);

  const signIn = () => {
    setRedirecting(true);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}${AuthEndpoint.GOOGLE}`;
  };

  return (
    <button
      type="button"
      onClick={signIn}
      disabled={redirecting}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm text-secondary-foreground transition-colors hover:bg-muted hover:cursor-pointer disabled:pointer-events-none disabled:opacity-60"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4">
        <path
          fill="#4285F4"
          d="M23.06 12.25c0-.85-.08-1.67-.22-2.45H12v4.64h6.2a5.3 5.3 0 0 1-2.3 3.48v2.9h3.72c2.17-2 3.44-4.95 3.44-8.57z"
        />
        <path
          fill="#34A853"
          d="M12 23.5c3.11 0 5.72-1.03 7.62-2.79l-3.72-2.89c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.03-6.45-4.75H1.7v2.98A11.5 11.5 0 0 0 12 23.5z"
        />
        <path
          fill="#FBBC05"
          d="M5.55 14.17a6.9 6.9 0 0 1 0-4.34V6.85H1.7a11.5 11.5 0 0 0 0 10.3l3.85-2.98z"
        />
        <path
          fill="#EA4335"
          d="M12 5.08c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.71 1.63 15.1.5 12 .5A11.5 11.5 0 0 0 1.7 6.85l3.85 2.98C6.46 7.11 9 5.08 12 5.08z"
        />
      </svg>
      {redirecting ? "Redirecting…" : "Continue with Google"}
    </button>
  );
}
