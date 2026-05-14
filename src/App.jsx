import { useEffect, useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  Gem,
  MapPin,
  Menu,
  Moon,
  Phone,
  Quote,
  Sparkles,
  Star,
  Users,
  Wifi,
  X,
} from "lucide-react";
import "./App.css";

const navItems = ["About", "Menu", "Meetings", "Ambiance", "Location"];

const visualAssets = {
  hero: {
    src: "/assets/qamar-hero-1920.webp",
    srcSet:
      "/assets/qamar-hero-1280.webp 1280w, /assets/qamar-hero-1920.webp 1920w",
  },
  meeting: {
    src: "/assets/qamar-meeting-1280.webp",
    srcSet:
      "/assets/qamar-meeting-800.webp 800w, /assets/qamar-meeting-1280.webp 1280w",
  },
  ambiance: "/assets/qamar-ambiance-960.webp",
  detail: "/assets/qamar-detail-960.webp",
  saffronLatte: {
    src: "/assets/menu-saffron-date-latte-960.webp",
    srcSet:
      "/assets/menu-saffron-date-latte-640.webp 640w, /assets/menu-saffron-date-latte-960.webp 960w",
  },
  majlisMocha: {
    src: "/assets/menu-noir-majlis-mocha-960.webp",
    srcSet:
      "/assets/menu-noir-majlis-mocha-640.webp 640w, /assets/menu-noir-majlis-mocha-960.webp 960w",
  },
  roseCroissant: {
    src: "/assets/menu-pistachio-rose-croissant-960.webp",
    srcSet:
      "/assets/menu-pistachio-rose-croissant-640.webp 640w, /assets/menu-pistachio-rose-croissant-960.webp 960w",
  },
  oudTiramisu: {
    src: "/assets/menu-oud-tiramisu-960.webp",
    srcSet:
      "/assets/menu-oud-tiramisu-640.webp 640w, /assets/menu-oud-tiramisu-960.webp 960w",
  },
};

const signatureItems = [
  {
    name: "Saffron Date Latte",
    detail: "Single-origin espresso, saffron milk, Medjool date caramel",
    price: "AED 68",
    image: visualAssets.saffronLatte.src,
    srcSet: visualAssets.saffronLatte.srcSet,
    position: "50% 50%",
  },
  {
    name: "Noir Majlis Mocha",
    detail: "Valrhona dark chocolate, cardamom, smoked sea salt",
    price: "AED 74",
    image: visualAssets.majlisMocha.src,
    srcSet: visualAssets.majlisMocha.srcSet,
    position: "50% 50%",
  },
  {
    name: "Pistachio Rose Croissant",
    detail: "French butter pastry with rose cream and Iranian pistachio",
    price: "AED 52",
    image: visualAssets.roseCroissant.src,
    srcSet: visualAssets.roseCroissant.srcSet,
    position: "50% 50%",
  },
  {
    name: "Executive Oud Tiramisu",
    detail: "Mascarpone, espresso-soaked sponge, subtle oud aroma",
    price: "AED 86",
    image: visualAssets.oudTiramisu.src,
    srcSet: visualAssets.oudTiramisu.srcSet,
    position: "50% 50%",
  },
];

const meetingFeatures = [
  "Private majlis rooms for 4-14 guests",
  "Quiet service rituals for investor conversations",
  "Premium Wi-Fi, wireless charging, and presentation screens",
  "Curated coffee flights and light executive dining",
];

const testimonials = [
  {
    quote:
      "The room had the privacy of a boardroom and the warmth of a five-star lounge. Exactly the tone we needed.",
    name: "Rania Al Maktoum",
    role: "Founder, Maison Capital",
  },
  {
    quote:
      "Our partners from London still mention the saffron latte. The website matches the real-world experience perfectly.",
    name: "Omar Siddiqi",
    role: "Managing Director, Gulf Ventures",
  },
  {
    quote:
      "Elegant, discreet, and polished. Qamar Noir is now where we host every high-value client briefing.",
    name: "Leila Haddad",
    role: "Partner, Meridian Legal",
  },
];

function useLenisScroll() {
  useEffect(() => {
    let lenis;
    let gsapInstance;
    let raf;
    let cancelled = false;

    const setup = async () => {
      const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

      if (coarsePointer) {
        const { default: Lenis } = await import("lenis");

        if (cancelled) return;

        lenis = new Lenis({
          autoRaf: true,
          anchors: true,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
          smoothWheel: true,
          syncTouch: true,
          syncTouchLerp: 0.08,
          touchMultiplier: 1.2,
        });

        return;
      }

      const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] =
        await Promise.all([
          import("lenis"),
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      gsapInstance = gsap;
      lenis = new Lenis({
        anchors: true,
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.88,
      });

      raf = (time) => lenis.raf(time * 1000);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    };

    window.setTimeout(setup, 350);
    return () => {
      cancelled = true;
      if (lenis) lenis.destroy();
      if (gsapInstance && raf) gsapInstance.ticker.remove(raf);
    };
  }, []);
}

function useGsapStorytelling() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || coarsePointer) return;

    let context;
    let cancelled = false;

    const setup = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      context = gsap.context(() => {
      gsap.utils.toArray(".reveal-line").forEach((element) => {
        gsap.fromTo(
          element,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.25,
            ease: "power4.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
            },
          },
        );
      });

      gsap.utils.toArray(".image-reveal").forEach((element) => {
        const image = element.querySelector("img");
        gsap.fromTo(
          element,
          { clipPath: "inset(18% 0 18% 0)" },
          {
            clipPath: "inset(0% 0 0% 0)",
            duration: 1.25,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.16 },
            {
              scale: 1,
              duration: 1.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 82%",
              },
            },
          );
        }
      });

      gsap.utils.toArray(".parallax-soft").forEach((element) => {
        gsap.to(element, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      gsap.to(".hero-media", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(".ambient-gold", {
        yPercent: 38,
        opacity: 0.48,
        ease: "none",
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
    };

    window.setTimeout(setup, 500);

    return () => {
      cancelled = true;
      if (context) context.revert();
    };
  }, []);
}

function useScrollState() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}

function useLightReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const elements = Array.from(document.querySelectorAll(".reveal-soft"));

    if (reduceMotion) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function AtmosphericLayers() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-[60] noise-overlay" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[61] h-40 bg-gradient-to-b from-black/45 to-transparent" />
    </>
  );
}

function IntroSplash() {
  return (
    <div className="intro-splash fixed inset-0 z-[100] grid place-items-center bg-[#080706]">
      <div className="absolute inset-0 arabic-pattern opacity-20" />
      <div className="intro-mark relative text-center">
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full border border-amber-200/40 bg-amber-200/10">
          <Moon className="h-7 w-7 text-amber-200" />
        </div>
        <p className="intro-title font-serif text-5xl text-white md:text-7xl">
          Qamar Noir
        </p>
        <p className="intro-subtitle mt-4 text-xs uppercase tracking-[0.42em] text-stone-400">
          Private Dubai Majlis
        </p>
      </div>
    </div>
  );
}

function MagneticButton({ href, children, variant = "gold" }) {
  return (
    <a
      href={href}
      className={variant === "gold" ? "gold-button" : "dark-button"}
    >
      {children}
    </a>
  );
}

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <div className="reveal-soft mx-auto mb-12 max-w-3xl text-center md:mb-16">
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.42em] text-amber-300/80">
        {eyebrow}
      </p>
      <div className="overflow-hidden">
        <h2 className="reveal-line font-serif text-4xl leading-tight text-stone-50 md:text-6xl">
          {title}
        </h2>
      </div>
      <p className="mt-5 text-base leading-8 text-stone-300 md:text-lg">
        {copy}
      </p>
    </div>
  );
}

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`premium-card border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/30 backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function App() {
  useLenisScroll();
  useGsapStorytelling();
  useLightReveal();

  return (
    <main className="min-h-screen overflow-hidden bg-[#080706] text-stone-100">
      <IntroSplash />
      <AtmosphericLayers />
      <Navigation />
      <Hero />
      <About />
      <SignatureMenu />
      <PrivateMeetings />
      <Ambiance />
      <Testimonials />
      <Location />
      <Reservation />
      <Footer />
    </main>
  );
}

function Navigation() {
  const scrolled = useScrollState();
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#080706]/82 py-1 shadow-2xl shadow-black/25 backdrop-blur-2xl"
          : "border-b border-white/5 bg-[#080706]/35 py-3 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="group flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-amber-300/40 bg-amber-200/10 transition group-hover:scale-105 group-hover:bg-amber-200/20">
            <Moon className="h-5 w-5 text-amber-200" />
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-xl tracking-wide text-white">
              Qamar Noir
            </span>
            <span className="brand-subtitle block text-[10px] uppercase tracking-[0.32em] text-stone-400">
              Dubai Majlis Cafe
            </span>
          </span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="luxury-link"
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#reserve"
          className="hidden items-center gap-2 rounded-full border border-amber-300/40 px-5 py-2.5 text-sm font-semibold text-amber-100 transition hover:border-amber-200 hover:bg-amber-200/10 md:flex"
        >
          Reserve <ChevronRight className="h-4 w-4" />
        </a>
        <button
          className="rounded-full border border-white/10 p-2.5 text-stone-200 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-white/10 bg-black/80 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="grid gap-1 px-5 py-5">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-4 font-serif text-3xl text-white"
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-svh">
      <div
        className="hero-media absolute inset-0"
        aria-hidden="true"
      >
        <img
          src={visualAssets.hero.src}
          srcSet={visualAssets.hero.srcSet}
          sizes="100vw"
          alt=""
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,7,6,0.97)_0%,rgba(8,7,6,0.76)_42%,rgba(8,7,6,0.36)_100%)]" />
      </div>
      <div className="absolute inset-0 hero-vignette" />
      <div className="ambient-gold absolute right-[6%] top-[20%] h-72 w-72 rounded-full bg-amber-300/20 blur-[92px]" />
      <div className="smoke-layer absolute inset-0" />
      <div className="arabic-pattern pattern-drift absolute inset-0 opacity-35" />
      <FloatingParticles />

      <div className="relative mx-auto flex min-h-svh max-w-7xl items-center px-5 pb-16 pt-28 sm:pt-32 lg:px-8">
        <div className="max-w-4xl">
          <div className="hero-kicker mb-8 inline-flex max-w-full items-center gap-3 rounded-full border border-amber-300/25 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.32em] text-amber-100 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            DIFC inspired private cafe lounge
          </div>
          <div className="overflow-hidden">
            <h1 className="font-serif text-[clamp(4rem,17vw,8rem)] leading-[0.92] text-white lg:text-9xl">
              Qamar Noir
            </h1>
          </div>
          <p className="mt-7 max-w-2xl text-xl leading-9 text-stone-200 md:text-2xl">
            A cinematic Arabic-inspired cafe majlis crafted for Dubai founders,
            investors, and discreet business conversations.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <MagneticButton href="#reserve">
              Reserve a Private Table <ArrowRight className="h-5 w-5" />
            </MagneticButton>
            <MagneticButton href="#menu" variant="dark">
              Explore Menu <Coffee className="h-5 w-5" />
            </MagneticButton>
          </div>
          <div className="mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {["DIFC access", "Private majlis", "Open till 1 AM"].map((item) => (
              <GlassCard key={item} className="px-5 py-4">
                <p className="hero-stat text-sm uppercase tracking-[0.28em] text-stone-400">
                  {item}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, index) => (
        <span
          key={index}
          className="floating-particle absolute h-1 w-1 rounded-full bg-amber-200/55 shadow-[0_0_18px_rgba(252,211,77,0.7)]"
          style={{
            left: `${8 + ((index * 17) % 88)}%`,
            top: `${12 + ((index * 23) % 76)}%`,
            animationDuration: `${5 + (index % 6)}s`,
            animationDelay: `${index * 0.35}s`,
          }}
        />
      ))}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="section-pad relative">
      <div className="section-glow left-0 top-20" />
      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="reveal-soft">
          <p className="eyebrow">The Concept</p>
          <div className="overflow-hidden">
            <h2 className="reveal-line font-serif text-4xl leading-tight text-white md:text-6xl">
              Where the rhythm of a majlis meets the precision of modern
              business.
            </h2>
          </div>
        </div>
        <div className="reveal-soft space-y-6 text-lg leading-9 text-stone-300">
          <p>
            Qamar Noir is a fictional luxury cafe designed for the pace of
            Dubai: private enough for negotiations, warm enough for long
            conversations, and polished enough for a premium hospitality brand.
          </p>
          <p>
            The visual language blends charcoal interiors, brushed gold,
            geometric Arabic motifs, low cinematic light, and calm executive
            service.
          </p>
        </div>
      </div>
    </section>
  );
}

function SignatureMenu() {
  return (
    <section id="menu" className="section-pad relative bg-[#0d0b09]">
      <div className="atmos-divider top-0" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Signature Service"
          title="A menu composed for slow luxury"
          copy="Specialty coffee, refined pastries, and executive desserts with regional notes of saffron, dates, rose, pistachio, and cardamom."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {signatureItems.map((item, index) => (
            <article
              key={item.name}
              className="reveal-soft menu-editorial group"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <div className="image-reveal menu-image">
                <img
                  src={item.image}
                  srcSet={item.srcSet}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: item.position }}
                />
                <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
              <div className="relative z-10 p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between gap-5">
                  <p className="text-xs uppercase tracking-[0.35em] text-amber-200/80">
                    0{index + 1}
                  </p>
                  <span className="rounded-full border border-amber-200/25 bg-amber-200/10 px-4 py-1.5 text-sm font-semibold text-amber-100">
                    {item.price}
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-white md:text-4xl">
                  {item.name}
                </h3>
                <p className="mt-4 max-w-md leading-7 text-stone-300">
                  {item.detail}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function PrivateMeetings() {
  return (
    <section id="meetings" className="section-pad relative">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div className="reveal-soft">
          <p className="eyebrow">For Business</p>
          <div className="overflow-hidden">
            <h2 className="reveal-line font-serif text-4xl leading-tight text-white md:text-6xl">
              Private tables for deals that deserve atmosphere.
            </h2>
          </div>
          <p className="mt-6 text-lg leading-9 text-stone-300">
            Built for founders, consultants, family offices, and visiting
            executives who need a polished setting between cafe, lounge, and
            private meeting suite.
          </p>
          <div className="mt-8 grid gap-4">
            {meetingFeatures.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-3 text-stone-200"
              >
                <span className="mt-1 rounded-full bg-amber-300/15 p-1 text-amber-200">
                  <Check className="h-4 w-4" />
                </span>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
        <GlassCard className="image-reveal relative min-h-[640px] overflow-hidden sm:min-h-[520px]">
          <img
            src={visualAssets.meeting.src}
            srcSet={visualAssets.meeting.srcSet}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt="Luxury cafe interior with warm lighting"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
          <div className="absolute bottom-0 grid w-full grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
            {[
              [Users, "14", "Private guests"],
              [Wifi, "1GB", "Business Wi-Fi"],
              [Clock, "1 AM", "Late service"],
            ].map(([Icon, value, label]) => (
              <div key={label} className="bg-black/45 p-4 backdrop-blur sm:p-5">
                <Icon className="mb-4 h-5 w-5 text-amber-200" />
                <p className="font-serif text-3xl text-white">{value}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-stone-400">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function Ambiance() {
  const images = [
    visualAssets.ambiance,
    visualAssets.detail,
    visualAssets.meeting.src,
  ];

  return (
    <section id="ambiance" className="section-pad relative bg-[#0d0b09]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Ambiance"
          title="Low light, brushed gold, quiet ceremony"
          copy="A portfolio-ready visual system for premium hospitality: dramatic imagery, layered glass panels, restrained motion, and confident editorial spacing."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {images.map((src, index) => (
            <div
              key={src}
              style={{ transitionDelay: `${index * 80}ms` }}
              className={`image-reveal parallax-soft relative overflow-hidden ${
                index === 1 ? "md:mt-14" : ""
              }`}
            >
              <img
                src={src}
                alt="Premium cafe ambiance"
                loading="lazy"
                decoding="async"
                className="h-[300px] w-full object-cover transition duration-700 hover:scale-105 sm:h-[420px]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeader
          eyebrow="Client Notes"
          title="Designed for people whose meetings matter"
          copy="Concise social proof for a high-end business audience, with a hospitality tone instead of loud marketing."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <div
              key={item.name}
              className="reveal-soft"
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              <GlassCard className="h-full p-7 transition duration-500 hover:-translate-y-2 hover:border-amber-200/30">
                <Quote className="h-7 w-7 text-amber-200" />
                <p className="mt-6 leading-8 text-stone-300">"{item.quote}"</p>
                <div className="mt-8 flex gap-1 text-amber-200">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 font-serif text-xl text-white">
                  {item.name}
                </p>
                <p className="text-sm text-stone-500">{item.role}</p>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Location() {
  return (
    <section id="location" className="section-pad relative bg-[#0d0b09]">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div className="reveal-soft">
          <p className="eyebrow">Dubai Address</p>
          <div className="overflow-hidden">
            <h2 className="reveal-line font-serif text-4xl leading-tight text-white md:text-6xl">
              Minutes from DIFC, Downtown Dubai, and Business Bay.
            </h2>
          </div>
          <div className="mt-8 space-y-4 text-stone-300">
            <p className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-amber-200" />
              Gate Avenue inspired, DIFC, Dubai
            </p>
            <p className="flex items-center gap-3">
              <CalendarDays className="h-5 w-5 text-amber-200" />
              Daily private reservations from 8 AM to 1 AM
            </p>
            <p className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-amber-200" />
              Valet arrival, quiet rooms, executive service
            </p>
          </div>
        </div>
        <GlassCard className="relative min-h-[360px] overflow-hidden p-6 sm:min-h-[420px] sm:p-8">
          <div className="absolute inset-0 dubai-map" />
          <div className="relative z-10 max-w-sm">
            <p className="text-xs uppercase tracking-[0.35em] text-amber-200">
              Qamar Noir
            </p>
            <h3 className="mt-4 font-serif text-4xl text-white">
              DIFC District
            </h3>
            <p className="mt-4 leading-8 text-stone-300">
              A refined map-style panel placeholder that keeps the page premium
              without relying on a backend map API.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function Reservation() {
  return (
    <section id="reserve" className="section-pad relative">
      <div className="arabic-pattern absolute inset-0 opacity-20" />
      <div className="section-glow right-0 top-10" />
      <div className="reveal-soft relative mx-auto max-w-5xl px-5 text-center lg:px-8">
        <Gem className="mx-auto mb-6 h-10 w-10 text-amber-200" />
        <h2 className="font-serif text-5xl leading-tight text-white md:text-7xl">
          Reserve the room before the conversation begins.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-stone-300">
          Dummy reservation flow for a portfolio website: polished CTAs, clear
          business positioning, and no backend dependency.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <MagneticButton href="tel:+971000000000">
            <Phone className="h-5 w-5" /> Call Concierge
          </MagneticButton>
          <MagneticButton
            href="mailto:reserve@qamarnoir.example"
            variant="dark"
          >
            Email Reservation <ArrowRight className="h-5 w-5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black px-5 py-10">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-sm text-stone-500 md:flex-row md:items-center">
        <p className="font-serif text-2xl text-white">Qamar Noir</p>
        <p>
          Qamar Noir luxury hospitality showcase by{" "}
          <a
            className="text-amber-200"
            href="https://kaifwebstudio.in"
            target="_blank"
            rel="noreferrer"
          >
            Kaif Web Studio
          </a>
        </p>
      </div>
    </footer>
  );
}

export default App;

