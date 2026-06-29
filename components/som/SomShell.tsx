import Image from "next/image";
import Link from "next/link";

type SomShellProps = {
  children: React.ReactNode;
  variant?: "dark" | "light";
};

export function SomLogo({ dark = false }: { dark?: boolean }) {
  const imageClass = dark ? "brightness-0" : "brightness-0 invert";

  return (
    <Link href="/som" className="flex items-center gap-2" aria-label="School of Ministry home">
      <Image
        src="/Images/som/som-ayo-mark.png"
        alt=""
        width={55}
        height={57}
        className={`h-[42px] w-auto sm:h-[57px] ${imageClass}`}
        priority
      />
      <Image
        src="/Images/som/som-logo-mark.png"
        alt=""
        width={52}
        height={48}
        className={`h-[36px] w-auto sm:h-[48px] ${imageClass}`}
        priority
      />
      <span className={`hidden max-w-[70px] text-[9px] font-bold uppercase leading-[1.05] sm:block ${dark ? "text-black" : "text-white"}`}>
        Tribe Petra Ministry Institute
      </span>
    </Link>
  );
}

export function SomButton({
  href,
  children,
  variant = "primary",
  type,
  disabled,
}: {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark";
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const className =
    variant === "primary"
      ? "rounded-[10px] border border-white/10 bg-primary px-4 py-2.5 text-sm font-medium leading-5 tracking-[-0.084px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] disabled:cursor-not-allowed disabled:opacity-60"
      : variant === "dark"
        ? "rounded-[10px] bg-black px-4 py-2.5 text-sm font-medium leading-5 tracking-[-0.084px] text-white disabled:cursor-not-allowed disabled:opacity-60"
        : "rounded-[10px] bg-white px-4 py-2.5 text-sm font-medium leading-5 tracking-[-0.084px] text-[#525866] shadow-[0_1px_3px_rgba(14,18,27,0.12),0_0_0_1px_#e1e4ea] disabled:cursor-not-allowed disabled:opacity-60";

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type || "button"} disabled={disabled} className={className}>
      {children}
    </button>
  );
}

export function SomTopNav({ dark = false }: { dark?: boolean }) {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[100px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-12 lg:px-[101px]">
        <SomLogo dark={dark} />
        <nav className="flex items-center gap-2.5">
          <SomButton href="/som/login" variant="secondary">
            Login
          </SomButton>
          <SomButton href="/som/register">Get Started</SomButton>
        </nav>
      </div>
    </header>
  );
}

export function SomShell({ children, variant = "light" }: SomShellProps) {
  const dark = variant === "light";

  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-inter text-[#0e121b]">
      <SomTopNav dark={dark} />
      <div className="absolute right-0 top-0 hidden h-full w-[43%] overflow-hidden lg:block">
        <div className="absolute inset-y-[-8%] left-0 w-[118%] rounded-l-[46%] bg-black">
          <Image
            src="/Images/som/som-card-3.png"
            alt=""
            fill
            sizes="43vw"
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      </div>
      <div className="relative z-10 flex min-h-screen items-center px-6 py-32 sm:px-10 lg:w-[58%] lg:justify-center">
        {children}
      </div>
    </main>
  );
}

export function SomField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required,
  placeholder,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  max?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium leading-5 tracking-[-0.084px] text-[#0e121b]">{label}</span>
      <input
        name={name}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={onChange}
        max={max}
        className="mt-1 w-full rounded-[10px] border border-[#e1e4ea] bg-white px-3 py-2.5 text-sm outline-none shadow-[0_1px_2px_rgba(10,13,20,0.03)] focus:border-primary"
      />
    </label>
  );
}

export function SomTextArea({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium leading-5 tracking-[-0.084px] text-[#0e121b]">{label}</span>
      <textarea
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        rows={4}
        className="mt-1 w-full resize-y rounded-[10px] border border-[#e1e4ea] bg-white px-3 py-2.5 text-sm outline-none shadow-[0_1px_2px_rgba(10,13,20,0.03)] focus:border-primary"
      />
    </label>
  );
}

export function SomSelect({
  label,
  name,
  value,
  onChange,
  children,
  required,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium leading-5 tracking-[-0.084px] text-[#0e121b]">{label}</span>
      <select
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="mt-1 w-full rounded-[10px] border border-[#e1e4ea] bg-white px-3 py-2.5 text-sm outline-none shadow-[0_1px_2px_rgba(10,13,20,0.03)] focus:border-primary"
      >
        {children}
      </select>
    </label>
  );
}
