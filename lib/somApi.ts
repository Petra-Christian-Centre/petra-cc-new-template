export type SomPageData = {
  session?: {
    session: string;
    can_register: boolean;
  };
  activeSessions?: SomSession[];
  fee?: {
    amount: number | string;
    currency: string;
    installments: number;
    fee_text_display?: string;
  };
  title: string;
  description: Array<{ text: string }>;
};

export type SomSession = {
  id?: number;
  documentId?: string;
  session: string;
  can_register?: boolean;
  start_date?: string;
  end_date?: string;
  venue?: string;
  location?: string;
  contact?: string;
  group_chat_link?: string;
};

export type SomRegistrationPayload = {
  session: string;
  email: string;
  surname: string;
  otherNames: string;
  phoneNumber: string;
  address: string;
  occupation: string;
  nationality: string;
  dob: string;
  maritalStatus: string;
  weddingAnniversary?: string;
  noOfChildren?: number;
  ministry: string;
  positionInMinistry: string;
  salvationStory: string;
  call: string;
  ministryExperience: string;
  isPetraMember: "Yes" | "No";
  joinedPetraAt?: string;
  joinedPetra?: string;
  commitmentToPetra: string;
  whoIsPastorAyo: string;
  howDidYouFindOut: string;
  photoUrl: string;
};

export type SomRegistrationResult = {
  message: string;
  data: {
    code: string;
    email: string;
    amount?: number | string;
    installments?: number;
    currency?: string;
  };
};

export type SomPayment = {
  id: number;
  documentId?: string;
  amount: number | string;
  amountPaid?: number | string;
  amount_paid?: number | string;
  currency: string;
  description: string;
  dueAt?: string | null;
  reference: string;
  payment_status?: string;
  status?: string;
};

export type SomRegistration = {
  id: number;
  documentId: string;
  code: string;
  surname: string;
  otherNames: string;
  email: string;
  phoneNumber: string;
  address?: string;
  occupation?: string;
  nationality?: string;
  dob?: string;
  photoUrl?: string;
  maritalStatus?: string;
  weddingAnniversary?: string | null;
  noOfChildren?: number;
  ministry?: string;
  positionInMinistry?: string;
  salvationStory?: string;
  call?: string;
  ministryExperience?: string;
  isPetraMember?: string;
  joinedPetraAt?: string | null;
  joinedPetra?: string;
  commitmentToPetra?: string;
  whoIsPastorAyoToYou?: string;
  howDidYouFindOut?: string;
  payment?: SomPayment;
  paymentData?: {
    payments: SomPayment[];
    transactions: Array<{
      id: number;
      amount: number | string;
      createdAt: string;
      description: string;
      status?: string;
    }>;
    rebates: Array<{
      id: number;
      amount: number | string;
      reason: string;
    }>;
  };
  messages?: Array<{
    id: number;
    status?: string;
    subject?: string;
    description?: string;
    channel?: string;
    createdAt?: string;
  }>;
};

const API_BASE = (process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337/api").replace(/\/$/, "");
const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/dazocl67q/upload";
const CLOUDINARY_UPLOAD_PRESET = "tmi-passport";
export const OFFICE_TOKEN_KEY = "officeAuthToken";
export const OFFICE_USER_KEY = "officeAuthUser";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = payload?.error || payload?.message || "Request failed";
    throw new Error(typeof message === "string" ? message : JSON.stringify(message));
  }

  return payload as T;
}

export function getSomPageData() {
  return request<{ data: SomPageData }>("/som-api/get-page-data");
}

export function getSomSessions() {
  return request<{ sessions: SomSession[] }>("/som-api/get-all-sessions");
}

export function getActiveSomSessions() {
  return request<{ sessions: SomSession[] }>("/som-api/get-active-sessions");
}

export function registerSomStudent(data: SomRegistrationPayload) {
  return request<SomRegistrationResult>("/som-api/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function getOutstandingSomPayments(email: string, code: string) {
  const params = new URLSearchParams({ email, code });
  return request<{
    data: {
      candidateData: {
        surname: string;
        otherNames: string;
        phoneNumber: string;
      };
      outstandingPayments: SomPayment[];
      transactions: Array<{
        id: number;
        amount: number | string;
        createdAt: string;
        description: string;
        channel?: string;
      }>;
    };
  }>(`/som-api/get-outstanding-payments?${params.toString()}`);
}

export function loginSomAdmin(identifier: string, password: string) {
  return request<{ jwt: string; user: { id: number; username: string; email: string } }>("/auth/local", {
    method: "POST",
    body: JSON.stringify({ identifier, password }),
  });
}

export function getSomRegistrations(token: string, session?: string) {
  const query = session ? `?${new URLSearchParams({ session }).toString()}` : "";
  return request<{ registrations: SomRegistration[] }>(`/office-api/som-registrations${query}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getSomRegistration(token: string, documentId: string) {
  return request<{ registration: SomRegistration }>(`/office-api/som-registrations/${documentId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function sendSomAcceptanceEmail(token: string, documentId: string) {
  return request<{ message: string }>(`/office-api/som-registrations/${documentId}/send-acceptance-email`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function uploadSomPassportPhoto(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });
  const payload = await response.json().catch(() => ({}));

  if (!response.ok || !payload.secure_url) {
    throw new Error(payload.error?.message || "Unable to upload passport photo");
  }

  return payload.secure_url as string;
}
