"use client";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Layouts/Navbar";
import { AuthRoute } from "@/enums/auth.enum";
import { useAuthenticate } from "@/hooks/Authentication/useAuthenticate";
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
    const router = useRouter();
    const { token } = useAuthenticate();
    if(token) {
        router.push(AuthRoute.HOME);
    }
  return (
    <main className="flex flex-1 items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm rounded-xl border border-border bg-card p-8">
        {children}
      </div>
    </main>
  );
}
