"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getSomStudentDashboard,
  SOM_STUDENT_SESSION_KEY,
  type SomStudentDashboard,
} from "@/lib/somApi";
import { SomButton, SomLogo } from "@/components/som/SomShell";

function formatMoney(amount: string | number | undefined, currency = "NGN") {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(Number(amount || 0));
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}

function paymentStatus(data: SomStudentDashboard | null) {
  const payments = data?.paymentData.payments || [];
  if (!payments.length) return "No payment items";
  if (payments.every((payment) => (payment.payment_status || payment.status) === "success")) return "Paid";
  if (payments.some((payment) => Number(payment.amountPaid || payment.amount_paid || 0) > 0)) return "Partial";
  return "Pending";
}

function admissionStatus(data: SomStudentDashboard | null) {
  return data?.messages?.some((message) => message.status === "success") ? "Admitted" : "Pending";
}

function statusTone(status: string) {
  if (status.toLowerCase() === "paid" || status.toLowerCase() === "admitted" || status.toLowerCase() === "success") {
    return "bg-green-50 text-green-700";
  }
  if (status.toLowerCase() === "partial") return "bg-amber-50 text-amber-700";
  return "bg-[#f4f4f5] text-[#525866]";
}

function DashboardCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: string;
}) {
  return (
    <div className="rounded-xl border border-[#e1e4ea] bg-white p-4">
      <p className="text-xs font-medium uppercase tracking-[0.22px] text-[#99a0ae]">{label}</p>
      <p className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-sm font-medium ${tone || "bg-[#f4f4f5] text-[#0e121b]"}`}>
        {value}
      </p>
    </div>
  );
}

export default function SomStudentDashboardPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState<{ email: string; code: string } | null>(null);
  const [dashboard, setDashboard] = useState<SomStudentDashboard | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const outstandingTotal = useMemo(
    () => (dashboard?.paymentData.payments || []).reduce((total, payment) => total + Number(payment.amount || 0), 0),
    [dashboard]
  );
  const currency = dashboard?.paymentData.payments[0]?.currency || "NGN";
  const registration = dashboard?.registration;
  const fullName = registration ? `${registration.surname} ${registration.otherNames}` : "Student";
  const payStatus = paymentStatus(dashboard);
  const admitStatus = admissionStatus(dashboard);
  const isActiveCohort = dashboard?.sessionStatus?.isActive !== false;

  useEffect(() => {
    const storedSession = localStorage.getItem(SOM_STUDENT_SESSION_KEY);
    if (!storedSession) {
      router.replace("/som/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedSession) as { email?: string; code?: string };
      if (!parsed.email || !parsed.code) {
        router.replace("/som/login");
        return;
      }
      setCredentials({ email: parsed.email, code: parsed.code });
    } catch {
      localStorage.removeItem(SOM_STUDENT_SESSION_KEY);
      router.replace("/som/login");
    }
  }, [router]);

  useEffect(() => {
    if (!credentials) return;

    let isMounted = true;
    const currentCredentials = credentials;

    async function loadDashboard() {
      setError("");
      setIsLoading(true);
      try {
        const result = await getSomStudentDashboard(currentCredentials.email, currentCredentials.code);
        if (isMounted) setDashboard(result.data);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load your dashboard");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [credentials]);

  function logout() {
    localStorage.removeItem(SOM_STUDENT_SESSION_KEY);
    router.push("/som/login");
  }

  return (
    <main className="min-h-screen bg-[#fbfbfb] font-inter text-[#0e121b]">
      <header className="border-b border-[#e1e4ea] bg-white">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6">
          <SomLogo dark />
          <nav className="flex items-center gap-2.5">
            {isActiveCohort && (
              <SomButton href="/som/payment" variant="secondary">
                Payments
              </SomButton>
            )}
            <button
              type="button"
              onClick={logout}
              className="rounded-[10px] bg-black px-4 py-2.5 text-sm font-medium leading-5 text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6">
          <p className="text-sm text-[#525866]">Student dashboard</p>
          <h1 className="mt-1 text-3xl font-medium leading-10">Welcome, {registration?.otherNames || "Student"}</h1>
        </div>

        {error && (
          <div className="mb-6 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="rounded-xl border border-[#e1e4ea] bg-white p-8 text-sm text-[#525866]">Loading dashboard...</div>
        ) : dashboard && registration ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              {!isActiveCohort && (
                <section className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
                  <p className="text-sm font-semibold">This cohort is closed</p>
                  <p className="mt-2 text-sm leading-6">
                    Your {registration.session || "SOM"} cohort is no longer active. You can still view your
                    registration record, payment history, and admission status here.
                  </p>
                </section>
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard label="Cohort" value={registration.session || "-"} />
                <DashboardCard
                  label="Cohort Status"
                  value={isActiveCohort ? "Active" : "Closed"}
                  tone={isActiveCohort ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"}
                />
                <DashboardCard label="Student Code" value={registration.code} />
                <DashboardCard label="Payment" value={payStatus} tone={statusTone(payStatus)} />
                <DashboardCard label="Admission" value={admitStatus} tone={statusTone(admitStatus)} />
              </div>

              <section className="rounded-xl border border-[#e1e4ea] bg-white">
                <div className="flex flex-col gap-3 border-b border-[#e1e4ea] p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-medium">Payments</h2>
                    <p className="mt-1 text-sm text-[#525866]">
                      Outstanding balance: {formatMoney(outstandingTotal, currency)}
                    </p>
                  </div>
                  {isActiveCohort ? (
                    <Link
                      href={`/som/payment?${new URLSearchParams({ email: registration.email, code: registration.code }).toString()}`}
                      className="rounded-[10px] bg-primary px-4 py-2.5 text-center text-sm font-medium text-white"
                    >
                      Check payments
                    </Link>
                  ) : (
                    <span className="rounded-[10px] bg-[#f4f4f5] px-4 py-2.5 text-center text-sm font-medium text-[#525866]">
                      Payment closed
                    </span>
                  )}
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-[720px] w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-[#e1e4ea] bg-[#fafafa] text-left text-xs font-medium uppercase text-[#525866]">
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3">Due</th>
                        <th className="px-4 py-3">Outstanding</th>
                        <th className="px-4 py-3">Paid</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dashboard.paymentData.payments.map((payment) => {
                        const status = payment.payment_status || payment.status || "pending";
                        return (
                          <tr key={payment.documentId || payment.id} className="border-b border-[#f0f0f0] last:border-b-0">
                            <td className="px-4 py-3 font-medium">{payment.description}</td>
                            <td className="px-4 py-3 text-[#525866]">{formatDate(payment.dueAt)}</td>
                            <td className="px-4 py-3">{formatMoney(payment.amount, payment.currency)}</td>
                            <td className="px-4 py-3">{formatMoney(payment.amountPaid || payment.amount_paid, payment.currency)}</td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-2 py-1 text-xs ${statusTone(status)}`}>{status.toUpperCase()}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {!dashboard.paymentData.payments.length && (
                    <div className="px-4 py-10 text-center text-sm text-[#525866]">No payment items yet.</div>
                  )}
                </div>
              </section>

              <section className="rounded-xl border border-[#e1e4ea] bg-white p-5">
                <h2 className="text-xl font-medium">Recent Transactions</h2>
                <div className="mt-4 space-y-3">
                  {dashboard.paymentData.transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between gap-4 rounded-[10px] bg-[#fafafa] p-3 text-sm">
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="mt-1 text-[#525866]">{formatDate(transaction.createdAt)}</p>
                      </div>
                      <p className="font-semibold">{formatMoney(transaction.amount, currency)}</p>
                    </div>
                  ))}
                  {!dashboard.paymentData.transactions.length && <p className="text-sm text-[#525866]">No transactions yet.</p>}
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-xl border border-[#e1e4ea] bg-white p-5">
                {registration.photoUrl ? (
                  <Image
                    src={registration.photoUrl}
                    alt={fullName}
                    width={480}
                    height={480}
                    className="aspect-square w-full rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-[#f4f4f5] text-sm text-[#525866]">
                    No photo
                  </div>
                )}
                <h2 className="mt-4 text-xl font-medium">{fullName}</h2>
                <p className="mt-1 text-sm text-[#525866]">{registration.email}</p>
              </section>

              <section className="rounded-xl border border-[#e1e4ea] bg-white p-5">
                <h2 className="text-lg font-medium">Profile</h2>
                <dl className="mt-4 space-y-3 text-sm">
                  {[
                    ["Phone", registration.phoneNumber],
                    ["Occupation", registration.occupation],
                    ["Nationality", registration.nationality],
                    ["Ministry", registration.ministry],
                    ["Position", registration.positionInMinistry],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4 border-b border-[#f0f0f0] pb-3 last:border-b-0 last:pb-0">
                      <dt className="text-[#525866]">{label}</dt>
                      <dd className="text-right font-medium">{value || "-"}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </aside>
          </div>
        ) : (
          <div className="rounded-xl border border-[#e1e4ea] bg-white p-8 text-sm text-[#525866]">
            Student record not found.
          </div>
        )}
      </section>
    </main>
  );
}
