import { Suspense } from 'react';
import RegistrationDetailClient from "@/components/office/RegistrationDetailClient";

export default function OfficeRegistrationDetailPage() {
  return (
    <Suspense fallback={<div>Loading registration details...</div>}>
      <RegistrationDetailClient />
    </Suspense>
  );
}
