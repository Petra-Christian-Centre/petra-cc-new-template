"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { OFFICE_TOKEN_KEY, OFFICE_USER_KEY } from "@/lib/somApi";
import { SomLogo } from "@/components/som/SomShell";

type OfficeShellProps = {
  children: React.ReactNode;
  title: string;
};

const navItems = [
  { label: "SOM Registrations", href: "/office/registrations" },
  { label: "Student Registration", href: "/som/register" },
  { label: "Public SOM Page", href: "/som" },
];

export function OfficeShell({ children, title }: OfficeShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  function logout() {
    localStorage.removeItem(OFFICE_TOKEN_KEY);
    localStorage.removeItem(OFFICE_USER_KEY);
    localStorage.removeItem("somAdminToken");
    localStorage.removeItem("somAdminUser");
    router.push("/office/login");
  }

  return (
    <main className="min-h-screen bg-[#f6f7f9] font-inter text-[#0e121b]">
      <aside className="fixed inset-y-0 left-0 hidden w-[240px] border-r border-[#e1e4ea] bg-white lg:block">
        <div className="px-5 py-5">
          <SomLogo dark />
        </div>
        <nav className="mt-4 space-y-1 px-3 text-sm">
          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-3 py-2 text-left ${
                  active ? "bg-[#f1f3f7] font-medium text-[#0e121b]" : "text-[#525866] hover:bg-[#fafafa]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute inset-x-3 bottom-3 border-t border-[#e1e4ea] pt-3">
          <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-sm text-[#525866]" onClick={logout}>
            Logout
          </button>
        </div>
      </aside>

      <section className="lg:pl-[240px]">
        <header className="flex h-16 items-center justify-between border-b border-[#e1e4ea] bg-white px-5 lg:px-7">
          <h1 className="text-xl font-semibold">{title}</h1>
          <button type="button" onClick={logout} className="rounded-lg bg-black px-3 py-2 text-sm text-white">
            Logout
          </button>
        </header>
        {children}
      </section>
    </main>
  );
}
