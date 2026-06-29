"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SomButton, SomField, SomShell } from "@/components/som/SomShell";
import { loginSomAdmin, OFFICE_TOKEN_KEY, OFFICE_USER_KEY } from "@/lib/somApi";

export default function OfficeLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem(OFFICE_TOKEN_KEY) || localStorage.getItem("somAdminToken");
    if (storedToken) {
      router.replace("/office/registrations");
    }
  }, [router]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await loginSomAdmin(identifier, password);
      localStorage.setItem(OFFICE_TOKEN_KEY, result.jwt);
      localStorage.setItem(OFFICE_USER_KEY, JSON.stringify(result.user));
      localStorage.removeItem("somAdminToken");
      localStorage.removeItem("somAdminUser");
      router.push("/office/registrations");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to log in");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SomShell>
      <form
        onSubmit={submit}
        className="w-full max-w-[440px] rounded-[20px] border border-[#f0f0f0] bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="text-center">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-gradient-to-b from-[#7177841a] to-transparent">
            <div className="flex size-16 items-center justify-center rounded-full border border-[#e1e4ea] bg-white text-2xl shadow-sm">
              @
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-medium leading-8">Office Login</h1>
          <p className="mt-1 text-base leading-6 tracking-[-0.176px] text-[#525866]">
            Sign in to manage School of Ministry registrations.
          </p>
        </div>

        <div className="my-6 h-px bg-[#e1e4ea]" />

        {error && (
          <div className="mb-4 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="grid gap-4">
          <SomField
            label="Email Address"
            name="identifier"
            type="email"
            value={identifier}
            onChange={(event) => setIdentifier(event.target.value)}
            required
          />
          <SomField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-[#525866]">Office access only</span>
          <Link href="/som/register" className="text-[#525866] underline">
            Student registration
          </Link>
        </div>

        <div className="mt-6">
          <SomButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </SomButton>
        </div>
      </form>
    </SomShell>
  );
}
