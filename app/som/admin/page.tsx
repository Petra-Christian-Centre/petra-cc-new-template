import { redirect } from "next/navigation";

export default function SomAdminRedirectPage() {
  redirect("/office/registrations");
}
