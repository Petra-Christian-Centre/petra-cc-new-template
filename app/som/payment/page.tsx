"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { SomButton, SomField, SomShell } from "@/components/som/SomShell";
import { getOutstandingSomPayments, type SomPayment } from "@/lib/somApi";

function formatMoney(amount: string | number, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}

function SomPaymentContent() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [code, setCode] = useState(searchParams.get("code") || "");
  const [payments, setPayments] = useState<SomPayment[]>([]);
  const [candidate, setCandidate] = useState("");
  const [resolvedEmail, setResolvedEmail] = useState(searchParams.get("email") || "");
  const [resolvedCode, setResolvedCode] = useState(searchParams.get("code") || "");
  const [sessionContact, setSessionContact] = useState("");
  const [message, setMessage] = useState(
    searchParams.get("registered")
      ? "Registration complete. Verify your payment details below. You can also log in to your student dashboard anytime with your email and student code."
      : ""
  );
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function lookupPayments(nextEmail = email, nextCode = code) {
    setError("");
    setMessage("");

    if (!nextEmail.trim() && !nextCode.trim()) {
      setError("Enter your email address, student code, or both.");
      return;
    }

    setIsLoading(true);

    try {
      const result = await getOutstandingSomPayments(nextEmail, nextCode);
      setPayments(result.data.outstandingPayments);
      setCandidate(`${result.data.candidateData.surname} ${result.data.candidateData.otherNames}`);
      setResolvedEmail(result.data.candidateData.email || nextEmail);
      setResolvedCode(result.data.candidateData.code || nextCode);
      setSessionContact(result.data.candidateData.contact || "");
      if (!result.data.outstandingPayments.length) {
        setMessage("No outstanding payment found for this registration.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to find registration");
      setPayments([]);
      setCandidate("");
      setResolvedEmail("");
      setResolvedCode("");
      setSessionContact("");
    } finally {
      setIsLoading(false);
    }
  }

  async function lookup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await lookupPayments();
  }

  useEffect(() => {
    const queryEmail = searchParams.get("email");
    const queryCode = searchParams.get("code");

    if (queryEmail || queryCode) {
      lookupPayments(queryEmail || "", queryCode || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SomShell>
      <section className="w-full max-w-[520px] rounded-[20px] border border-[#f0f0f0] bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-medium leading-8">SOM payment</h1>
        <p className="mt-1 text-base leading-6 text-[#525866]">
          Verify your payment details with your email address, student code, or both.
        </p>

        <form onSubmit={lookup} className="mt-6 grid gap-4">
          {message && <div className="rounded-[10px] border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800">{message}</div>}
          {error && <div className="rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
          <SomField label="Email Address" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <SomField label="Student Code" name="code" value={code} onChange={(event) => setCode(event.target.value)} />
          <p className="text-xs leading-5 text-[#525866]">Enter either field. Providing both helps us find your registration faster.</p>
          <SomButton type="submit" disabled={isLoading}>
            {isLoading ? "Checking..." : "Check Payments"}
          </SomButton>
        </form>

        {!!payments.length && (
          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-medium">Outstanding for {candidate}</h2>
            {payments.map((payment) => (
              <div key={payment.id || payment.reference} className="rounded-xl border border-[#e1e4ea] p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{payment.description}</p>
                    <p className="mt-1 text-sm text-[#525866]">Reference: {payment.reference}</p>
                  </div>
                  <p className="font-semibold">{formatMoney(payment.amount, payment.currency)}</p>
                </div>
              </div>
            ))}
            <div className="space-y-3 rounded-xl bg-[#f7f7f7] p-4 text-sm leading-6 text-[#525866]">
              <p className="font-medium text-[#0e121b]">Bank transfer instructions</p>
              <div>
                <p>
                  Account name: <strong className="text-[#0e121b]">PETRA LEADERSHIP COLLEGE</strong>
                </p>
                <p>
                  Bank: <strong className="text-[#0e121b]">GTBank</strong>
                </p>
                <p>
                  Account number: <strong className="text-[#0e121b]">0212410636</strong>
                </p>
              </div>
              <p>
                After payment, send your proof of payment with your{" "}
                <strong className="text-[#0e121b]">registered name</strong> and{" "}
                <strong className="text-[#0e121b]">student code</strong>
                {sessionContact ? (
                  <>
                    {" "}to <strong className="text-[#0e121b]">{sessionContact}</strong>.
                  </>
                ) : (
                  " to the SOM contact."
                )}
              </p>
            </div>
            <div className="rounded-xl border border-[#e1e4ea] bg-white p-4 text-sm leading-6 text-[#525866]">
              Keep your student code safe. You can log in with this email and code to view your dashboard,
              payment status, and admission updates.
              <div className="mt-3">
                <Link
                  href={`/som/login?${new URLSearchParams({ email: resolvedEmail || email, code: resolvedCode || code }).toString()}`}
                  className="font-medium text-[#0e121b] underline"
                >
                  Go to student login
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>
    </SomShell>
  );
}

export default function SomPaymentPage() {
  return (
    <Suspense fallback={null}>
      <SomPaymentContent />
    </Suspense>
  );
}
