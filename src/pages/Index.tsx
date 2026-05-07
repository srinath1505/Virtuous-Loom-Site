import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { Github, Linkedin, Mail } from "lucide-react";

// Components
import About from "./About";
import SplashCursor from "@/components/SplashCursor";
import SelectedWorks from "./SelectedWorks";
import VectorBridge from "./VectorBridge";
import Footer from "./Footer";
import Contact from "./Contact";
import Testimonial from "./Testimonial";
import TeamSection from "./TeamSection";
import Navigation from "@/components/Navigation";
import PreLoader from "./PreLoader";

gsap.registerPlugin(ScrollTrigger);

// --- Cursor Follower ---
const CursorFollower = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 20, stiffness: 100, mass: 0.8 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 12);
      mouseY.set(e.clientY - 12);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-gray-400/50 rounded-full pointer-events-none z-[9999] hidden lg:block backdrop-blur-[1px]"
      style={{ x, y }}
    />
  );
};

// --- Mobile Social Strip ---
const MobileSocialStrip = () => {
  const socials = [
    { label: "GitHub", icon: Github, href: "https://github.com/virtuousloom" },
    { label: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/virtuousloom" },
    { label: "Email", icon: Mail, href: "mailto:hello@virtuousloom.com" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-6"
    >
      {socials.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target={href.startsWith("mailto") ? "_self" : "_blank"} rel="noopener noreferrer"
          className="text-white hover:opacity-75 transition-opacity duration-300 block">
          <Icon size={18} strokeWidth={2.5} />
        </a>
      ))}
    </motion.div>
  );
};

// ============================================================
//  VIRTUOUS LOOM HERO — exact reference animation from pk portfolio
// ============================================================
const VLHero = ({ revealed }: { revealed: boolean }) => {
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroImgHolderRef = useRef<HTMLElement>(null);
  const header1Ref = useRef<HTMLDivElement>(null);
  const header2Ref = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const heroImgEl = useRef<HTMLImageElement>(null);
  const currentImageIndex = useRef(1);
  const totalImages = 4; // p1.png – p4.png in /public
  const scrollTriggerInstance = useRef<ScrollTrigger | null>(null);

  // Image cycling
  useEffect(() => {
    if (!revealed) return;
    const interval = setInterval(() => {
      currentImageIndex.current =
        currentImageIndex.current >= totalImages ? 1 : currentImageIndex.current + 1;
      if (heroImgEl.current) {
        heroImgEl.current.src = `/p${currentImageIndex.current}.png`;
      }
    }, 250);
    return () => clearInterval(interval);
  }, [revealed]);

  // Hero text reveal animation (fires after preloader completes)
  useEffect(() => {
    if (!revealed) return;

    const tl = gsap.timeline({ delay: 0.1 });
    tl.from([header1Ref.current?.querySelector("h1"), header2Ref.current?.querySelector("h1")], {
      yPercent: 110,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
    });
    tl.from(
      footerRef.current?.children ? Array.from(footerRef.current.children) : [],
      { opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
  }, [revealed]);

  // ScrollTrigger for hero-img-holder (exact replica of reference hero.js)
  useEffect(() => {
    if (!revealed) return;

    const initAnimations = () => {
      if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill();

      scrollTriggerInstance.current = ScrollTrigger.create({
        trigger: heroImgHolderRef.current,
        start: "top bottom",
        end: "top top",
        onUpdate: (self) => {
          const progress = self.progress;
          if (heroImgRef.current) {
            gsap.set(heroImgRef.current, {
              y: `${-110 + 110 * progress}%`,
              scale: 0.25 + 0.75 * progress,
              rotation: -15 + 15 * progress,
            });
          }
        },
      });
    };

    initAnimations();
    window.addEventListener("resize", initAnimations);
    return () => {
      window.removeEventListener("resize", initAnimations);
      if (scrollTriggerInstance.current) scrollTriggerInstance.current.kill();
    };
  }, [revealed]);

  return (
    <>
      {/* ── PART 1: The big text hero ── */}
      <section
        className="vl-hero"
        style={{
          position: "relative",
          width: "100vw",
          height: "100svh",
          padding: "2em",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowX: "hidden",
          background: "#000",
          color: "#fff",
        }}
      >
        {/* Nav is rendered outside, but we need the mobile social strip here */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 md:hidden">
          {revealed && <MobileSocialStrip />}
        </div>

        <div className="vl-hero-header-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div ref={header1Ref} className="vl-hero-header vl-hero-header-1" style={{ overflow: "hidden", transform: "translateX(-2%)", position: "relative", zIndex: 1 }}>
            <h1
              style={{
                fontSize: "clamp(4rem, 18vw, 18vw)",
                lineHeight: 0.9,
                textTransform: "uppercase",
                fontFamily: '"rader", "Playfair Display", serif',
                fontStyle: "italic",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
              }}
            >
              Virtuous
            </h1>
          </div>
          <div ref={header2Ref} className="vl-hero-header vl-hero-header-2" style={{ overflow: "hidden", transform: "translateX(10%)", position: "relative", zIndex: 2 }}>
            <h1
              style={{
                fontSize: "clamp(4rem, 18vw, 18vw)",
                lineHeight: 0.9,
                textTransform: "uppercase",
                fontFamily: '"rader", "Playfair Display", serif',
                fontStyle: "italic",
                fontWeight: 700,
                color: "#fff",
                margin: 0,
              }}
            >
              Loom
            </h1>
          </div>
        </div>

        {/* Footer row */}
        <div
          ref={footerRef}
          className="vl-hero-footer"
          style={{
            position: "absolute",
            width: "100%",
            bottom: 0,
            padding: "2em",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            className="vl-hero-footer-symbols"
            style={{ height: "1rem", opacity: 0.5 }}
          >
            <span style={{ fontFamily: '"supply-mono", monospace', fontSize: "0.875rem", textTransform: "uppercase", color: "#fff" }}>
              VL ✦ STUDIO
            </span>
          </div>
          <div className="vl-hero-footer-scroll-down" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <a
              href="#work"
              style={{
                fontFamily: '"supply-mono", monospace',
                fontSize: "0.875rem",
                textTransform: "uppercase",
                color: "#fff",
                textDecoration: "none",
                opacity: 0.7,
              }}
            >
              Scroll // Explore
            </a>
          </div>
          <div className="vl-hero-footer-tags">
            <span style={{ fontFamily: '"supply-mono", monospace', fontSize: "0.875rem", textTransform: "uppercase", color: "#fff", opacity: 0.5 }}>
              Showcase Mode: ON
            </span>
          </div>
        </div>
      </section>

      {/* ── PART 2: Hero image holder with scroll-driven reveal ── */}
      <section
        ref={heroImgHolderRef}
        style={{
          position: "relative",
          width: "100vw",
          height: "100svh",
          padding: "2em",
          background: "#000",
        }}
      >
        <div
          ref={heroImgRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            transform: "translateY(-110%) scale(0.25) rotate(-15deg)",
            border: "0.3em solid #fff",
            borderRadius: "2em",
            overflow: "hidden",
          }}
        >
          <img
            ref={heroImgEl}
            src="/p1.png"
            alt="Virtuous Loom Work"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </section>
    </>
  );
};

// ============================================================
//  Main Index page
// ============================================================
const Index = () => {
  const [loading, setLoading] = useState(true);
  const footerContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "end end"],
  });
  const footerY = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

  // Keep GSAP ScrollTrigger in sync with Lenis's smooth-scroll RAF loop.
  // Without this, GSAP pins fire at wrong visual positions when Lenis is active.
  useLenis(() => {
    ScrollTrigger.update();
  });

  // After all components mount and GSAP pin spacers are in the DOM,
  // trigger a resize so VectorBridge re-measures its section position
  // with the correct page height (including the SelectedWorks spacer).
  useEffect(() => {
    const t = setTimeout(() => window.dispatchEvent(new Event('resize')), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* Pre-loader — rendered as fixed overlay, removed after onComplete */}
      {loading && <PreLoader onComplete={() => setLoading(false)} />}

      <div className="min-h-screen relative bg-black selection:bg-white selection:text-black">
        <CursorFollower />
        <Navigation />

        {/* Fixed background About section */}
        <div className="fixed inset-0 z-0 bg-white text-black">
          <About />
        </div>

        {/* VL Hero — two-part (text + img-holder) */}
        <div className="relative z-20">
          <div className="hidden lg:block"><SplashCursor /></div>
          <VLHero revealed={!loading} />
        </div>

        {/* Content stack */}
        <div className="relative z-20 w-full bg-transparent">
          <div id="about" className="h-screen w-full pointer-events-none" />

          <div id="work" className="bg-black text-white relative z-20">
            <SelectedWorks />
          </div>

          <div className="bg-white text-black relative z-20">
            <VectorBridge />
          </div>

          <div className="bg-black text-white relative z-20">
            <Testimonial />
          </div>

          <div className="relative z-20 bg-black">
            <TeamSection />
          </div>

          <div id="contact" className="relative z-20 bg-white text-black">
            <Contact />
          </div>
        </div>

        {/* Parallax Footer Reveal Stack */}
        <div ref={footerContainerRef} className="relative z-0 h-screen w-full overflow-hidden bg-black text-white">
          <motion.div style={{ y: footerY }} className="h-full w-full">
            <Footer />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Index;