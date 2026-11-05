"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/lib/auth";

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [user, router, pathname]);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-lg font-semibold">Log in to continue</p>
        <p className="mt-2 text-sm text-muted">Taking you to the login page…</p>
      </div>
    );
  }

  return <>{children}</>;
}
