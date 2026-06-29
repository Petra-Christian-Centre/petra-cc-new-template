import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "School of Ministry",
  description:
    "An immersive two-week training program designed to equip ministers and gospel workers with biblical foundation and practical ministry experience.",
  openGraph: {
    title: "Tribe Petra School of Ministry | Tribe Petra Ministry World",
    description:
      "An immersive two-week training program designed to equip ministers and gospel workers with biblical foundation and practical ministry experience.",
  },
  keywords: [
    "Tribe Petra School of Ministry",
    "SOM",
    "Ministry training",
    "Biblical foundation",
    "Practical ministry",
  ],
};

const experienceCards = [
  {
    title: "Biblical Foundation",
    description:
      "Deep dive into scripture, theology, and practical application of biblical principles in ministry contexts.",
    icon: "/Images/som/icon-bible.svg",
  },
  {
    title: "Practical Training",
    description:
      "Hands-on experience in ministry activities, leadership development, and community engagement.",
    icon: "/Images/som/icon-training.svg",
  },
  {
    title: "Spiritual Growth",
    description:
      "Personal spiritual development through prayer, worship, and mentorship from experienced ministers.",
    icon: "/Images/som/icon-heart.svg",
  },
];

const ministryImages = [
  {
    src: "/Images/som/som-card-2.png",
    alt: "School of Ministry participant in a classroom",
    className:
      "left-[-8%] top-7 z-10 w-[34%] rotate-[4deg] sm:left-[-3%] lg:left-[-5%]",
  },
  {
    src: "/Images/som/som-card-3.png",
    alt: "School of Ministry teaching session",
    className: "left-[19%] top-10 z-20 w-[34%] -rotate-[4deg]",
  },
  {
    src: "/Images/som/som-card-1.png",
    alt: "School of Ministry ministry practical session",
    className: "left-[52%] top-0 z-30 w-[30%] rotate-[7deg]",
  },
  {
    src: "/Images/som/som-card-4.png",
    alt: "School of Ministry students taking notes",
    className: "right-[-2%] top-20 z-40 w-[26%]",
  },
];

function SomNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex h-[100px] w-full max-w-[1440px] items-center justify-between px-6 sm:px-12 lg:px-[101px]">
        <Link href="/som" className="flex items-center gap-2" aria-label="School of Ministry home">
          <Image
            src="/Images/som/som-ayo-mark.png"
            alt=""
            width={55}
            height={57}
            className="h-[42px] w-auto brightness-0 invert sm:h-[57px]"
            priority
          />
          <Image
            src="/Images/som/som-logo-mark.png"
            alt=""
            width={52}
            height={48}
            className="h-[36px] w-auto brightness-0 invert sm:h-[48px]"
            priority
          />
          <span className="hidden max-w-[70px] text-[9px] font-bold uppercase leading-[1.05] text-white sm:block">
            Tribe Petra Ministry Institute
          </span>
        </Link>

        <nav className="flex items-center gap-2.5">
          <Link
            href="/som/register"
            className="rounded-[10px] border border-white/10 bg-primary px-4 py-2.5 text-sm font-medium leading-5 tracking-[-0.084px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}

function BrowserCard({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <div className={`absolute overflow-hidden rounded-[15px] bg-white shadow-sm ${className}`}>
      <div className="flex h-9 items-center gap-1.5 bg-white px-4">
        <span className="size-3 rounded-full bg-[#ff5f57]" />
        <span className="size-3 rounded-full bg-[#ffbd2e]" />
        <span className="size-3 rounded-full bg-[#28c840]" />
        <span className="ml-4 text-[9px] leading-none text-black">SOM 2025</span>
      </div>
      <div className="relative aspect-[1440/1662] w-full overflow-hidden">
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 34vw, 55vw" className="object-cover" />
      </div>
    </div>
  );
}

export default function SchoolOfMinistryPage() {
  return (
    <main className="min-h-screen bg-[#4c5a85] font-inter text-white">
      <section className="relative min-h-[940px] overflow-hidden bg-[#12204d] md:min-h-[1109px]">
        <div className="absolute inset-x-0 bottom-0 top-[719px] hidden bg-[#4c5a85] md:block" />
        <SomNav />

        <div className="mx-auto flex max-w-[1120px] flex-col items-center px-6 pb-12 pt-[150px] text-center sm:pt-[178px]">
          <h1 className="max-w-[780px] text-[52px] font-extrabold leading-[0.94] tracking-[-0.02em] sm:text-[68px] lg:text-[80px]">
            Tribe Petra School of Ministry
          </h1>
          <p className="mt-6 max-w-[1015px] text-lg leading-8 sm:text-2xl sm:leading-[34px]">
            An immersive two-week training program designed to equip ministers and gospel workers with
            essential skills, biblical foundation, and practical ministry experience.
          </p>
          <div className="mt-8 flex items-center gap-2.5">
            <Link
              href="/som/register"
              className="rounded-[10px] border border-white/10 bg-primary px-4 py-2.5 text-sm font-medium leading-5 tracking-[-0.084px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]"
            >
              Register Now
            </Link>
            <a
              href="#som-experience"
              className="rounded-[10px] bg-white px-4 py-2.5 text-sm font-medium leading-5 tracking-[-0.084px] text-[#525866] shadow-[0_1px_3px_rgba(14,18,27,0.12),0_0_0_1px_#e1e4ea]"
            >
              Learn More
            </a>
          </div>
        </div>

        <div className="absolute bottom-[-18px] left-1/2 h-[390px] w-[min(1540px,130vw)] -translate-x-1/2 sm:h-[465px] md:bottom-auto md:top-[596px]">
          {ministryImages.map((image) => (
            <BrowserCard key={image.src} {...image} />
          ))}
        </div>
      </section>

      <section id="som-experience" className="px-6 pb-24 pt-24 sm:pt-28 lg:pb-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-4xl font-normal leading-10">What You&apos;ll Experience</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-6">
              A comprehensive training designed to build strong foundations for effective ministry
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {experienceCards.map((card) => (
              <article key={card.title} className="rounded-xl border border-[#e5e5e5] bg-white p-8 text-black">
                <div className="flex size-12 items-center justify-center rounded-lg bg-black">
                  <Image src={card.icon} alt="" width={20} height={20} />
                </div>
                <h3 className="mt-6 text-xl leading-7">{card.title}</h3>
                <p className="mt-3 text-base leading-[26px] text-[#525252]">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
