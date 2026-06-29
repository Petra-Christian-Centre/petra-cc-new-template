"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { OfficeShell } from "@/components/office/OfficeShell";
import {
  getSomRegistrations,
  getSomSessions,
  OFFICE_TOKEN_KEY,
  type SomRegistration,
  type SomSession,
} from "@/lib/somApi";

function paymentLabel(registration: SomRegistration) {
  const status = registration.payment?.payment_status || registration.payment?.status || "pending";
  if (status === "success") return "Paid";
  const amountPaid = registration.payment?.amountPaid || registration.payment?.amount_paid || 0;
  return Number(amountPaid) > 0 ? "Partial" : "Pending";
}

function admissionLabel(registration: SomRegistration) {
  return registration.messages?.some((message) => message.status === "success") ? "Admitted" : "Pending";
}

export default function OfficeRegistrationsPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [registrations, setRegistrations] = useState<SomRegistration[]>([]);
  const [sessions, setSessions] = useState<SomSession[]>([]);
  const [session, setSession] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const totalPaid = useMemo(
    () => registrations.filter((registration) => paymentLabel(registration) === "Paid").length,
    [registrations]
  );
  const totalAdmitted = useMemo(
    () => registrations.filter((registration) => admissionLabel(registration) === "Admitted").length,
    [registrations]
  );

  function handleUnauthorized(err: unknown) {
    if (err instanceof Error && err.message.toLowerCase().includes("unauthorized")) {
      localStorage.removeItem(OFFICE_TOKEN_KEY);
      router.push("/office/login");
      return true;
    }
    return false;
  }

  async function loadRegistrations(authToken: string, selectedSession?: string) {
    setError("");
    setIsLoading(true);
    try {
      const result = await getSomRegistrations(authToken, selectedSession);
      setRegistrations(result.registrations);
    } catch (err) {
      if (!handleUnauthorized(err)) {
        setError(err instanceof Error ? err.message : "Unable to load registrations");
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

    setToken(storedToken);
    getSomSessions()
      .then((result) => {
        const availableSessions = result.sessions || [];
        setSessions(availableSessions);
        const currentSession = availableSessions.find((item: SomSession) => item.can_register)?.session || availableSessions[0]?.session || "";
        setSession(currentSession);
        loadRegistrations(storedToken, currentSession);
      })
      .catch(() => loadRegistrations(storedToken));
  }, [router]);

  function changeSession(event: React.ChangeEvent<HTMLSelectElement>) {
    const nextSession = event.target.value;
    setSession(nextSession);
    if (token) {
      loadRegistrations(token, nextSession);
    }
  }

  return (
    <OfficeShell title="SOM Registrations">
      <div className="p-5 lg:p-7">
        <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Registrations</h2>
            <p className="mt-1 text-sm text-[#525866]">
              {isLoading ? "Loading registrations..." : `${registrations.length} students, ${totalPaid} paid, ${totalAdmitted} admitted`}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm">
              <span className="mr-2 text-[#525866]">Session</span>
              <select
                value={session}
                onChange={changeSession}
                className="rounded-[10px] border border-[#e1e4ea] bg-white px-3 py-2.5 text-sm outline-none"
              >
                {sessions.map((item) => (
                  <option key={item.session} value={item.session}>
                    {item.session}
                  </option>
                ))}
                {!sessions.length && <option value="">Current</option>}
              </select>
            </label>
            <button
              type="button"
              onClick={() => token && loadRegistrations(token, session)}
              disabled={isLoading}
              className="rounded-[10px] bg-black px-4 py-2.5 text-sm font-medium leading-5 text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              Refresh
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-4 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-[#e1e4ea] bg-white">
          <table className="min-w-[900px] w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#e1e4ea] bg-[#fafafa] text-left text-xs font-medium uppercase text-[#525866]">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Payment</th>
                <th className="px-4 py-3">Admission</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration) => (
                <tr key={registration.documentId} className="border-b border-[#f0f0f0] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{registration.surname} {registration.otherNames}</td>
                  <td className="px-4 py-3 text-[#525866]">{registration.code}</td>
                  <td className="px-4 py-3 text-[#525866]">{registration.email}</td>
                  <td className="px-4 py-3 text-[#525866]">{registration.phoneNumber}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-green-50 px-2 py-1 text-xs text-green-700">{paymentLabel(registration)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-amber-50 px-2 py-1 text-xs text-amber-700">{admissionLabel(registration)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/office/registrations/detail?id=${registration.documentId}`} className="text-primary underline">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!registrations.length && !isLoading && (
            <div className="px-4 py-10 text-center text-sm text-[#525866]">No SOM registrations found.</div>
          )}
        </div>
      </div>
    </OfficeShell>
  );
}
