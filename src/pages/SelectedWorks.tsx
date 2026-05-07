import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './ScrollStack.css';
import './FeaturedWork.css';

gsap.registerPlugin(ScrollTrigger);

// ── Project data ───────────────────────────────────────────────────────────────
const projects = [
  {
    id: "001",
    title: "Enterprise Resource Architecture",
    type: "Full-Stack Platform",
    link: "https://erpbeta.netlify.app",
    cta: "Live Project",
    image: "/p1.png",
  },
  {
    id: "002",
    title: "Geospatial Workforce Analytics",
    type: "Real-Time Tracking",
    link: "#",
    cta: "Case Study",
    image: "/p2.png",
  },
  {
    id: "003",
    title: "OrderEase",
    type: "SaaS Product",
    link: "https://github.com/virtuousloom/orderease",
    cta: "View on GitHub",
    image: "/p3.png",
  },
  {
    id: "004",
    title: "BusBuddy Transit",
    type: "Mobile + Web",
    link: "https://github.com/virtuousloom/busbuddy",
    cta: "View on GitHub",
    image: "/p4.png",
  },
];

// ── Abstract shape positions within the 200vw × 200vh container ──────────────
// Adapted from pk's featuredCardPosSmall (for screens < 1600px)
const SHAPE_POSITIONS = [
  { x: 1000, y: 100 },
  { x: 100,  y: 1500 },
  { x: 1950, y: 1250 },
  { x: 850,  y: 1500 },
  { x: 2100, y: 200 },
  { x: 600,  y: 250 },
  { x: 1650, y: 1100 },
  { x: 800,  y: 1000 },
  { x: 2200, y: 900 },
  { x: 1600, y: 150 },
];

// ── Abstract geometric SVG shapes (10 unique) ─────────────────────────────────
const SHAPES = [
  // 0 — concentric circles
  <svg viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5"/>
    <circle cx="100" cy="100" r="62" stroke="rgba(255,255,255,0.33)" strokeWidth="1"/>
    <circle cx="100" cy="100" r="32" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
  </svg>,
  // 1 — solid circle
  <svg viewBox="0 0 200 200" fill="none">
    <circle cx="100" cy="100" r="86" fill="rgba(255,255,255,0.88)"/>
  </svg>,
  // 2 — nested squares
  <svg viewBox="0 0 200 200" fill="none">
    <rect x="12" y="12" width="176" height="176" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5"/>
    <rect x="42" y="42" width="116" height="116" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
    <rect x="72" y="72" width="56"  height="56"  stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>
  </svg>,
  // 3 — solid diamond
  <svg viewBox="0 0 200 200" fill="none">
    <polygon points="100,10 190,100 100,190 10,100" fill="rgba(255,255,255,0.9)"/>
  </svg>,
  // 4 — crosshair
  <svg viewBox="0 0 200 200" fill="none">
    <line x1="100" y1="15"  x2="100" y2="185" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5"/>
    <line x1="15"  y1="100" x2="185" y2="100" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5"/>
    <circle cx="100" cy="100" r="20" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none"/>
  </svg>,
  // 5 — triangle outline
  <svg viewBox="0 0 200 200" fill="none">
    <polygon points="100,12 188,178 12,178" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" fill="none"/>
    <polygon points="100,50 158,162 42,162" stroke="rgba(255,255,255,0.3)"  strokeWidth="1"   fill="none"/>
  </svg>,
  // 6 — concentric arcs
  <svg viewBox="0 0 200 200" fill="none">
    <path d="M 12,175 A 100,100 0 0,1 188,175" stroke="rgba(255,255,255,0.7)"  strokeWidth="2"   fill="none"/>
    <path d="M 35,175 A 76,76   0 0,1 165,175" stroke="rgba(255,255,255,0.42)" strokeWidth="1.5" fill="none"/>
    <path d="M 60,175 A 48,48   0 0,1 140,175" stroke="rgba(255,255,255,0.22)" strokeWidth="1"   fill="none"/>
  </svg>,
  // 7 — scan lines
  <svg viewBox="0 0 200 200" fill="none">
    {[25, 48, 71, 94, 117, 140, 163].map((y) => (
      <line key={y} x1="15" y1={y} x2="185" y2={y} stroke="rgba(255,255,255,0.5)" strokeWidth="1.5"/>
    ))}
  </svg>,
  // 8 — circle cluster
  <svg viewBox="0 0 200 200" fill="none">
    <circle cx="65"  cy="65"  r="30" fill="rgba(255,255,255,0.8)"/>
    <circle cx="142" cy="62"  r="20" fill="rgba(255,255,255,0.5)"/>
    <circle cx="75"  cy="142" r="36" fill="rgba(255,255,255,0.7)"/>
    <circle cx="150" cy="148" r="15" fill="rgba(255,255,255,0.9)"/>
  </svg>,
  // 9 — dot grid
  <svg viewBox="0 0 200 200" fill="none">
    {[40, 80, 120, 160].flatMap((x) =>
      [40, 80, 120, 160].map((y) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="rgba(255,255,255,0.6)"/>
      ))
    )}
  </svg>,
];

// ── Main component ─────────────────────────────────────────────────────────────
const SelectedWorks = () => {
  const sectionRef   = useRef<HTMLElement>(null);
  const titlesRef    = useRef<HTMLDivElement>(null);
  const imagesRef    = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1001px)", () => {
      let st: ScrollTrigger | null = null;

      const init = () => {
        if (st) st.kill();

        // Total horizontal travel: 3 viewport-widths (to show all 4 slides)
        const moveDistance = window.innerWidth * 3;

        const shapeCards = Array.from(
          imagesRef.current?.querySelectorAll<HTMLElement>(".fw-shape-card") ?? []
        );
        const indicators = Array.from(
          indicatorRef.current?.querySelectorAll<HTMLElement>(".fw-indicator") ?? []
        );

        // Place shapes at their scattered positions and hide them behind the viewer
        shapeCards.forEach((card, i) => {
          const pos = SHAPE_POSITIONS[i];
          gsap.set(card, { x: pos.x, y: pos.y, z: -1500, scale: 0 });
        });

        st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start:   "top top",
          end:     `+=${window.innerHeight * 5}`,
          pin:     true,
          scrub:   1,
          onUpdate: (self) => {
            // Slide the titles row left
            gsap.set(titlesRef.current, { x: -moveDistance * self.progress });

            // Fly each shape from z: -1500 → +1500 with per-card stagger
            shapeCards.forEach((card, i) => {
              const staggerOffset      = i * 0.075;
              const scaledProgress     = (self.progress - staggerOffset) * 2;
              const individualProgress = Math.max(0, Math.min(1, scaledProgress));
              gsap.set(card, {
                z:     -1500 + 3000 * individualProgress,
                scale: Math.max(0, Math.min(1, individualProgress * 10)),
              });
            });

            // Light up progress indicators sequentially
            const perIndicator = 1 / indicators.length;
            indicators.forEach((el, i) => {
              gsap.to(el, {
                opacity:  self.progress > i * perIndicator ? 1 : 0.2,
                duration: 0.3,
              });
            });
          },
        });
      };

      init();
      window.addEventListener("resize", init);
      return () => {
        window.removeEventListener("resize", init);
        st?.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      {/* ── Marquee header ── */}
      <div className="w-full h-[25vh] lg:h-[40vh] border-b border-white/20 overflow-hidden flex items-center bg-black">
        <div className="marquee-selected-works">
          <div className="marquee-selected-works__track">
            {[0, 1, 2, 3].map((k) => (
              <div
                key={k}
                className="marquee-selected-works__segment"
                aria-hidden={k > 0 ? "true" : undefined}
              >
                <span className="marquee-selected-works__text">What We Do</span>
                <span className="marquee-selected-works__dash">—</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Featured Work — pinned section ── */}
      <section ref={sectionRef} className="fw-section">

        {/* Horizontal scrolling project title slides */}
        <div ref={titlesRef} className="fw-titles">
          {projects.map((project) => (
            <div key={project.id} className="fw-title-wrapper">
              {/* Thumbnail (mobile only) */}
              <div className="fw-title-img">
                <img src={project.image} alt={project.title} />
              </div>
              {/* Small label */}
              <span className="fw-title-meta">{project.id} — {project.type}</span>
              {/* Main title */}
              <h2 className="fw-title">{project.title}</h2>
              {/* CTA (mobile only) */}
              <a
                href={project.link}
                target={project.link.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="fw-title-cta"
              >
                {project.cta} ↗
              </a>
            </div>
          ))}
        </div>

        {/* Abstract 3D geometric shapes (desktop backdrop) */}
        <div ref={imagesRef} className="fw-images">
          {SHAPE_POSITIONS.map((_, i) => (
            <div key={i} className="fw-shape-card">
              {SHAPES[i]}
            </div>
          ))}
        </div>

        {/* Progress indicator pill */}
        <div ref={indicatorRef} className="fw-indicator-pill">
          {projects.map((p) => (
            <span key={p.id} style={{ display: "contents" }}>
              <span className="fw-indicator-label">{p.id}</span>
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="fw-indicator" />
              ))}
            </span>
          ))}
        </div>

        {/* Footer bar */}
        <div className="fw-footer">
          <span className="fw-footer-label">What We Do [04]</span>
          <a href="#contact" className="fw-footer-cta">Start a Project →</a>
        </div>
      </section>
    </>
  );
};

export default SelectedWorks;
