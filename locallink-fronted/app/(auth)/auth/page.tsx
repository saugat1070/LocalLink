import { Suspense } from "react";
import OAuthSuccessHandler, { Pending } from "@/components/Authentication/OAuthSuccessHandler";

export default function OAuthSuccessPage() {
  // useSearchParams client-side renders everything up to the nearest Suspense
  // boundary, so the handler needs one or the build fails at prerender.
  return (
    <Suspense fallback={<Pending />}>
      <OAuthSuccessHandler />
    </Suspense>
  );
}
