// import type { Metadata } from "next";
import GoogleSignInButton from "@/components/Authentication/GoogleSignInButton";

// export const metadata: Metadata = {
//   title: "Sign in · LocalLink",
// };

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1 text-center">
        <h1 className="text-foreground">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue to LocalLink.
        </p>
      </div>

      <GoogleSignInButton />
    </div>
  );
}
