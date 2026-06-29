"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SomButton, SomField, SomShell } from "@/components/som/SomShell";
import { getSomStudentDashboard, SOM_STUDENT_SESSION_KEY } from "@/lib/somApi";

function SomStudentLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const storedSession = localStorage.getItem(SOM_STUDENT_SESSION_KEY);
    if (!storedSession) return;
    const sessionJson = storedSession;

    async function redirectExistingStudent() {
      try {
        const parsed = JSON.parse(sessionJson) as { email?: string; code?: string };
        if (!parsed.email || !parsed.code) {
          localStorage.removeItem(SOM_STUDENT_SESSION_KEY);
          return;
        }

        await getSomStudentDashboard(parsed.email, parsed.code);
        if (isMounted) {
          router.replace("/som/dashboard");
        }
      } catch {
        localStorage.removeItem(SOM_STUDENT_SESSION_KEY);
      }
    }

    redirectExistingStudent();

    return () => {
      isMounted = false;
    };
  }, [router]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await getSomStudentDashboard(email, code);
      localStorage.setItem(SOM_STUDENT_SESSION_KEY, JSON.stringify({ email, code }));
      router.push("/som/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to find your SOM registration");
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
            <div className="flex size-16 items-center justify-center rounded-full border border-[#e1e4ea] bg-white text-3xl shadow-sm">
              <span aria-hidden className="size-5 rounded-full bg-[#525866] shadow-[0_14px_0_4px_#525866]" />
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-medium leading-8">Login to your account</h1>
          <p className="mt-1 text-base leading-6 tracking-[-0.176px] text-[#525866]">
            Enter your registration details to continue.
          </p>
        </div>

        <div className="my-6 h-px bg-[#e1e4ea]" />

        <div className="grid gap-4">
          {error && (
            <div className="rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}
          <SomField
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <SomField
            label="Student Code"
            name="code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
          />
          <SomButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Checking..." : "Login"}
          </SomButton>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-[#525866]">
          <Link href="/som/register" className="underline">
            Register
          </Link>
          <Link href="/som/payment" className="underline">
            Check payment
          </Link>
        </div>
      </form>
    </SomShell>
  );
}

export default function SomStudentLoginPage() {
  return (
    <Suspense fallback={null}>
      <SomStudentLoginContent />
    </Suspense>
  );
}
