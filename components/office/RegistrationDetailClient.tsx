"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OfficeShell } from "@/components/office/OfficeShell";
import {
  getSomRegistration,
  OFFICE_TOKEN_KEY,
  sendSomAcceptanceEmail,
  type SomPayment,
  type SomRegistration,
} from "@/lib/somApi";

type TabName = "profile" | "spiritual" | "payments" | "messages";

function formatDate(value?: string | null) {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" });
}

function formatMoney(value?: number | string, currency = "GBP") {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount);
}

function statusTone(status?: string) {
  if (status === "success" || status === "successful") return "bg-green-50 text-green-700";
  if (status === "failed") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
}

function Field({ label, value }: { label: string; value?: React.ReactNode }) {
  return (
    <div className="rounded-[10px] border border-[#e1e4ea] bg-white p-4">
      <p className="text-xs font-medium uppercase text-[#525866]">{label}</p>
      <div className="mt-2 text-sm leading-6 text-[#0e121b]">{value || "-"}</div>
    </div>
  );
}

function PaymentTable({ payments }: { payments: SomPayment[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#e1e4ea] bg-white">
      <table className="min-w-[760px] w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[#e1e4ea] bg-[#fafafa] text-left text-xs font-medium uppercase text-[#525866]">
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Due Date</th>
            <th className="px-4 py-3">Amount Due</th>
            <th className="px-4 py-3">Amount Paid</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.documentId || payment.id} className="border-b border-[#f0f0f0] last:border-b-0">
              <td className="px-4 py-3">{payment.description}</td>
              <td className="px-4 py-3 text-[#525866]">{formatDate(payment.dueAt)}</td>
              <td className="px-4 py-3">{formatMoney(payment.amount, payment.currency)}</td>
              <td className="px-4 py-3">{formatMoney(payment.amountPaid || payment.amount_paid, payment.currency)}</td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-2 py-1 text-xs ${statusTone(payment.payment_status || payment.status)}`}>
                  {(payment.payment_status || payment.status || "pending").toUpperCase()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!payments.length && <div className="px-4 py-10 text-center text-sm text-[#525866]">No outstanding payments.</div>}
    </div>
  );
}

export default function OfficeRegistrationDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registrationId = searchParams.get("id") || "";
  const [token, setToken] = useState("");
  const [registration, setRegistration] = useState<SomRegistration | null>(null);
  const [tab, setTab] = useState<TabName>("profile");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  function handleUnauthorized(err: unknown) {
    if (err instanceof Error && err.message.toLowerCase().includes("unauthorized")) {
      localStorage.removeItem(OFFICE_TOKEN_KEY);
      router.push("/office/login");
      return true;
    }
    return false;
  }

  async function loadRegistration(authToken: string) {
    setError("");
    setIsLoading(true);
    try {
      const result = await getSomRegistration(authToken, registrationId);
      setRegistration(result.registration);
    } catch (err) {
      if (!handleUnauthorized(err)) {
        setError(err instanceof Error ? err.message : "Unable to load registration");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const storedToken = localStorage.getItem(OFFICE_TOKEN_KEY) || localStorage.getItem("somAdminToken");
    if (!storedToken) {
      router.push("/office/login");
      return;
    }
    if (!registrationId) {
      setError("Registration id is required.");
      setIsLoading(false);
      return;
    }
    setToken(storedToken);
    loadRegistration(storedToken);
  }, [registrationId, router]);

  async function sendAdmissionLetter() {
    if (!registration || !token) return;
    setError("");
    setNotice("");
    setIsSending(true);
    try {
      const result = await sendSomAcceptanceEmail(token, registration.documentId);
      setNotice(result.message || "Admission letter sent.");
      await loadRegistration(token);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to send admission letter");
    } finally {
      setIsSending(false);
    }
  }

  const messages = registration?.messages || [];
  const hasSuccessfulAdmission = messages.some((message) => message.status === "success");
  const paymentData = registration?.paymentData || { payments: [], transactions: [], rebates: [] };

  return (
    <OfficeShell title="Registration Detail">
      <div className="p-5 lg:p-7">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Link href="/office/registrations" className="text-sm text-[#525866] underline">
              Back to registrations
            </Link>
            <h2 className="mt-2 text-2xl font-semibold">
              {registration ? `${registration.surname} ${registration.otherNames}` : "Registration"}
            </h2>
            <p className="mt-1 text-sm text-[#525866]">{registration?.code || (isLoading ? "Loading..." : "")}</p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-[10px] bg-black px-4 py-2.5 text-sm font-medium text-white print:hidden"
          >
            Print
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
        {notice && (
          <div className="mb-4 rounded-[10px] border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {notice}
          </div>
        )}

        {registration ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <section>
              <div className="mb-4 flex flex-wrap gap-2 print:hidden">
                {[
                  ["profile", "Bio Data"],
                  ["spiritual", "Spiritual"],
                  ["payments", "Payments"],
                  ["messages", "Messages"],
                ].map(([name, label]) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setTab(name as TabName)}
                    className={`rounded-[10px] px-4 py-2 text-sm ${
                      tab === name ? "bg-black text-white" : "border border-[#e1e4ea] bg-white text-[#525866]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {tab === "profile" && (
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Name" value={`${registration.surname} ${registration.otherNames}`} />
                  <Field label="Code" value={registration.code} />
                  <Field label="Email" value={registration.email} />
                  <Field label="Phone" value={registration.phoneNumber} />
                  <Field label="Date of Birth" value={formatDate(registration.dob)} />
                  <Field label="Occupation" value={registration.occupation} />
                  <Field label="Marital Status" value={registration.maritalStatus} />
                  <Field label="Nationality" value={registration.nationality} />
                  <Field label="Address" value={registration.address} />
                  <Field label="Children" value={registration.noOfChildren ?? "-"} />
                </div>
              )}

              {tab === "spiritual" && (
                <div className="grid gap-4">
                  <Field label="Ministry" value={registration.ministry} />
                  <Field label="Position in Ministry" value={registration.positionInMinistry} />
                  <Field label="Salvation Story" value={registration.salvationStory} />
                  <Field label="Call of God" value={registration.call} />
                  <Field label="Ministry Experience" value={registration.ministryExperience} />
                  <Field label="Petra Member" value={registration.isPetraMember} />
                  <Field label="Joined Petra At" value={formatDate(registration.joinedPetraAt)} />
                  <Field label="Joined Petra" value={registration.joinedPetra} />
                  <Field label="Commitment to Petra" value={registration.commitmentToPetra} />
                  <Field label="Who is Pastor Ayo to you?" value={registration.whoIsPastorAyoToYou} />
                  <Field label="How did you find out?" value={registration.howDidYouFindOut} />
                </div>
              )}

              {tab === "payments" && (
                <div className="space-y-6">
                  <PaymentTable payments={paymentData.payments} />
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-xl border border-[#e1e4ea] bg-white p-4">
                      <h3 className="font-semibold">Rebates</h3>
                      <div className="mt-4 space-y-3 text-sm">
                        {paymentData.rebates.map((rebate) => (
                          <div key={rebate.id} className="flex justify-between gap-4">
                            <span className="text-[#525866]">{rebate.reason}</span>
                            <span className="font-medium">{formatMoney(rebate.amount)}</span>
                          </div>
                        ))}
                        {!paymentData.rebates.length && <p className="text-[#525866]">No rebates.</p>}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#e1e4ea] bg-white p-4">
                      <h3 className="font-semibold">Transactions</h3>
                      <div className="mt-4 space-y-3 text-sm">
                        {paymentData.transactions.map((transaction) => (
                          <div key={transaction.id} className="grid grid-cols-[1fr_auto] gap-4">
                            <span className="text-[#525866]">{transaction.description}</span>
                            <span className="font-medium">{formatMoney(transaction.amount)}</span>
                            <span className="text-xs text-[#525866]">{formatDate(transaction.createdAt)}</span>
                            <span className={`rounded-full px-2 py-1 text-xs ${statusTone(transaction.status)}`}>
                              {(transaction.status || "pending").toUpperCase()}
                            </span>
                          </div>
                        ))}
                        {!paymentData.transactions.length && <p className="text-[#525866]">No transactions.</p>}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tab === "messages" && (
                <div className="rounded-xl border border-[#e1e4ea] bg-white p-4">
                  <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold">Messages</h3>
                    {!hasSuccessfulAdmission && (
                      <button
                        type="button"
                        onClick={sendAdmissionLetter}
                        disabled={isSending}
                        className="rounded-[10px] bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                      >
                        {isSending ? "Sending..." : "Send Acceptance Letter"}
                      </button>
                    )}
                  </div>
                  <div className="space-y-3 text-sm">
                    {messages.map((message) => (
                      <div key={message.id} className="grid gap-2 border-b border-[#f0f0f0] pb-3 last:border-b-0">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <span className="font-medium">{message.description || message.subject || "SOM message"}</span>
                          <span className={`rounded-full px-2 py-1 text-xs ${statusTone(message.status)}`}>
                            {(message.status || "pending").toUpperCase()}
                          </span>
                        </div>
                        <p className="text-[#525866]">
                          {message.channel || "email"} · {formatDate(message.createdAt)}
                        </p>
                      </div>
                    ))}
                    {!messages.length && <p className="text-[#525866]">No messages have been sent to this candidate.</p>}
                  </div>
                </div>
              )}
            </section>

            <aside className="rounded-xl border border-[#e1e4ea] bg-white p-5">
              {registration.photoUrl ? (
                <img src={registration.photoUrl} alt={`${registration.surname} ${registration.otherNames}`} className="aspect-square w-full rounded-lg object-cover" />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-[#f1f3f7] text-sm text-[#525866]">
                  No passport photo
                </div>
              )}
              <dl className="mt-5 divide-y divide-[#e1e4ea] text-sm">
                {[
                  ["Email", registration.email],
                  ["Phone", registration.phoneNumber],
                  ["Payment Items", String(paymentData.payments.length)],
                  ["Messages", String(messages.length)],
                  ["Admission", hasSuccessfulAdmission ? "Admitted" : "Pending"],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between gap-4 py-3">
                    <dt className="text-[#525866]">{label}</dt>
                    <dd className="text-right font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
              {!hasSuccessfulAdmission && (
                <button
                  type="button"
                  onClick={sendAdmissionLetter}
                  disabled={isSending}
                  className="mt-5 w-full rounded-[10px] bg-black px-4 py-2.5 text-sm font-medium text-white disabled:opacity-60"
                >
                  {isSending ? "Sending..." : "Send Admission Letter"}
                </button>
              )}
            </aside>
          </div>
        ) : (
          <div className="rounded-xl border border-[#e1e4ea] bg-white px-4 py-10 text-center text-sm text-[#525866]">
            {isLoading ? "Loading registration..." : "Registration not found."}
          </div>
        )}
      </div>
    </OfficeShell>
  );
}
