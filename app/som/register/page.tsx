"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  SomButton,
  SomField,
  SomSelect,
  SomShell,
  SomTextArea,
} from "@/components/som/SomShell";
import {
  getActiveSomSessions,
  registerSomStudent,
  uploadSomPassportPhoto,
  type SomRegistrationPayload,
  type SomSession,
} from "@/lib/somApi";

import Image from 'next/image';
const initialForm: SomRegistrationPayload = {
  session: "",
  email: "",
  surname: "",
  otherNames: "",
  phoneNumber: "",
  address: "",
  occupation: "",
  nationality: "Nigeria",
  dob: "",
  maritalStatus: "Single",
  weddingAnniversary: "",
  noOfChildren: 0,
  ministry: "",
  positionInMinistry: "",
  salvationStory: "",
  call: "",
  ministryExperience: "",
  isPetraMember: "No",
  joinedPetraAt: "",
  joinedPetra: "",
  commitmentToPetra: "",
  whoIsPastorAyo: "",
  howDidYouFindOut: "",
  photoUrl: "",
};

export default function SomRegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [sessions, setSessions] = useState<SomSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [passportPreview, setPassportPreview] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadSessions() {
      try {
        const response = await getActiveSomSessions();
        const activeSessions = response.sessions || [];

        if (!isMounted) return;

        setSessions(activeSessions);
        setForm((current) => ({
          ...current,
          session: current.session || activeSessions[0]?.session || "",
        }));
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load open cohorts");
        }
      } finally {
        if (isMounted) {
          setIsLoadingSessions(false);
        }
      }
    }

    loadSessions();

    return () => {
      isMounted = false;
    };
  }, []);

  function updateField(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    setForm((current) => ({
      ...current,
      [name]: name === "noOfChildren" ? Number(value) : value,
    }));
  }

  function updatePassport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setPassportFile(file);
    setForm((current) => ({ ...current, photoUrl: "" }));

    if (passportPreview) {
      URL.revokeObjectURL(passportPreview);
    }

    setPassportPreview(file ? URL.createObjectURL(file) : "");
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (step === 1) {
      if (!form.session) {
        setError("Please select the cohort you are applying for.");
        return;
      }
      if (!passportFile) {
        setError("Please upload a passport photo before continuing.");
        return;
      }
      setStep(2);
      return;
    }

    setIsSubmitting(true);
    try {
      if (!passportFile) {
        throw new Error("Please upload a passport photo.");
      }
      const photoUrl = form.photoUrl || (await uploadSomPassportPhoto(passportFile));
      setForm((current) => ({ ...current, photoUrl }));
      const result = await registerSomStudent({
        ...form,
        photoUrl,
        joinedPetraAt: form.isPetraMember === "Yes" ? form.joinedPetraAt : "",
        joinedPetra: form.isPetraMember === "Yes" ? form.joinedPetra : "",
      });
      const params = new URLSearchParams({
        email: result.data.email,
        code: result.data.code,
        registered: "1",
      });
      router.push(`/som/payment?${params.toString()}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to submit registration");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SomShell>
      <form
        onSubmit={submit}
        className="w-full max-w-[520px] rounded-[20px] border border-[#f0f0f0] bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="text-center">
          <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-gradient-to-b from-[#7177841a] to-transparent">
            <div className="flex size-16 items-center justify-center rounded-full border border-[#e1e4ea] bg-white text-3xl shadow-sm">
              {step}
            </div>
          </div>
          <h1 className="mt-4 text-2xl font-medium leading-8">
            {step === 1 ? "Create your account" : "Complete your profile"}
          </h1>
          <p className="mt-1 text-base leading-6 tracking-[-0.176px] text-[#525866]">
            {step === 1 ? "Begin your ministry training journey" : "Tell us about your ministry background"}
          </p>
        </div>

        <div className="my-6 h-px bg-[#e1e4ea]" />

        {error && (
          <div className="mb-4 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="grid gap-4">
            <SomSelect
              label="Cohort"
              name="session"
              value={form.session}
              onChange={updateField}
              required
            >
              {isLoadingSessions ? (
                <option value="">Loading cohorts...</option>
              ) : sessions.length ? (
                sessions.map((session) => (
                  <option key={session.documentId || session.session} value={session.session}>
                    {session.session}
                    {session.start_date ? ` - starts ${new Date(session.start_date).toLocaleDateString()}` : ""}
                  </option>
                ))
              ) : (
                <option value="">No open cohort</option>
              )}
            </SomSelect>
            <SomField label="Email Address" name="email" type="email" value={form.email} onChange={updateField} required />
            <SomField label="Phone Number" name="phoneNumber" value={form.phoneNumber} onChange={updateField} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <SomField label="Surname" name="surname" value={form.surname} onChange={updateField} required />
              <SomField label="Other Names" name="otherNames" value={form.otherNames} onChange={updateField} required />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <SomField label="Date of Birth" name="dob" type="date" value={form.dob} onChange={updateField} required />
              <SomSelect label="Marital Status" name="maritalStatus" value={form.maritalStatus} onChange={updateField} required>
                <option>Single</option>
                <option>Married</option>
                <option>Widowed</option>
                <option>Divorced</option>
              </SomSelect>
            </div>
            <SomField label="Address" name="address" value={form.address} onChange={updateField} required />
            <div className="grid gap-4 sm:grid-cols-2">
              <SomField label="Occupation" name="occupation" value={form.occupation} onChange={updateField} required />
              <SomField label="Nationality" name="nationality" value={form.nationality} onChange={updateField} required />
            </div>
            <label className="block">
              <span className="text-sm font-medium leading-5 tracking-[-0.084px] text-[#0e121b]">Passport Photo</span>
              <input
                name="passport"
                type="file"
                accept="image/*"
                required
                onChange={updatePassport}
                className="mt-1 w-full rounded-[10px] border border-[#e1e4ea] bg-white px-3 py-2.5 text-sm outline-none shadow-[0_1px_2px_rgba(10,13,20,0.03)] file:mr-4 file:rounded-md file:border-0 file:bg-black file:px-3 file:py-1.5 file:text-sm file:text-white focus:border-primary"
              />
            </label>
            {passportPreview && (
              <div className="flex items-center gap-3 rounded-[10px] border border-[#e1e4ea] bg-[#fafafa] p-3">
                <Image src="{passportPreview}" alt="Passport preview" className="size-20 rounded-md object-cover" />
                <div className="text-sm text-[#525866]">
                  <p className="font-medium text-[#0e121b]">{passportFile?.name}</p>
                  <p>Photo will be uploaded when you submit the form.</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <SomField label="Ministry" name="ministry" value={form.ministry} onChange={updateField} required />
              <SomField
                label="Position in Ministry"
                name="positionInMinistry"
                value={form.positionInMinistry}
                onChange={updateField}
                required
              />
            </div>
            <SomTextArea label="Salvation Story" name="salvationStory" value={form.salvationStory} onChange={updateField} required />
            <SomTextArea label="Describe your call" name="call" value={form.call} onChange={updateField} required />
            <SomTextArea
              label="Ministry Experience"
              name="ministryExperience"
              value={form.ministryExperience}
              onChange={updateField}
              required
            />
            <SomSelect label="Are you a Petra member?" name="isPetraMember" value={form.isPetraMember} onChange={updateField} required>
              <option>Yes</option>
              <option>No</option>
            </SomSelect>
            {form.isPetraMember === "Yes" && (
              <div className="grid gap-4 sm:grid-cols-2">
                <SomField label="Joined Petra At" name="joinedPetraAt" type="date" value={form.joinedPetraAt || ""} onChange={updateField} />
                <SomField label="Where did you join?" name="joinedPetra" value={form.joinedPetra || ""} onChange={updateField} />
              </div>
            )}
            <SomTextArea
              label="Commitment to Petra"
              name="commitmentToPetra"
              value={form.commitmentToPetra}
              onChange={updateField}
              required
            />
            <SomTextArea
              label="Who is Pastor Ayo to you?"
              name="whoIsPastorAyo"
              value={form.whoIsPastorAyo}
              onChange={updateField}
              required
            />
            <SomField
              label="How did you find out?"
              name="howDidYouFindOut"
              value={form.howDidYouFindOut}
              onChange={updateField}
              required
            />
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          {step === 2 ? (
            <SomButton type="button" variant="secondary" disabled={isSubmitting} href={undefined}>
              <span onClick={() => setStep(1)}>Back</span>
            </SomButton>
          ) : (
            <Link href="/office/login" className="text-sm text-[#525866] underline">
              Admin login
            </Link>
          )}
          <SomButton type="submit" disabled={isSubmitting || isLoadingSessions || !sessions.length}>
            {isSubmitting ? "Submitting..." : step === 1 ? "Continue" : "Register Now"}
          </SomButton>
        </div>
      </form>
    </SomShell>
  );
}
