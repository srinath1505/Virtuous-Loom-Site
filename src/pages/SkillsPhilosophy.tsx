import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import FlowingMenu from "./FlowingMenu";

const skillCategories = [
  {
    link: "#",
    text: "Languages",
    items: [
      { name: "C++", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Python", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Javascript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
      { name: "SQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "HTML/CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "Numpy", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Pandas", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" }
    ]
  },
  {
    link: "#",
    text: "Developer Tools",
    items: [
      { name: "VS Code", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "PyCharm", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg" },
      { name: "Jupyter", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
      { name: "Bash", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
      { name: "Spyder", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spyder/spyder-original.svg" },
      { name: "Colab", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecolab/googlecolab-original.svg" }
    ]
  },
  {
    link: "#",
    text: "Technologies",
    items: [
      { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Node", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" }
    ]
  }
];

// ─── Spinning Wheel ───────────────────────────────────────────────────────────
const KineticWheel = () => {
  const wheelRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    let angle = 0;
    let raf: number;
    const spin = () => {
      angle = (angle + 0.3) % 360;
      if (wheelRef.current) {
        wheelRef.current.setAttribute("transform", `rotate(${angle}, 110, 110)`);
      }
      raf = requestAnimationFrame(spin);
    };
    raf = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(raf);
  }, []);

  const RADIUS = 90;
  const CX = 110;
  const CY = 110;
  const circleId = "wheel-text-path";
  const text = "ANALYZE · DESIGN · BUILD · DELIVER · ";

  return (
    // fluid container: fills column width, never exceeds 160px, stays square
    <div style={{ width: "100%", maxWidth: 160, aspectRatio: "1 / 1", flexShrink: 0 }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 220 220"
        aria-hidden="true"
      >
        <defs>
          <path
            id={circleId}
            d={`M ${CX},${CY} m -${RADIUS},0 a ${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a ${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
          />
        </defs>

        <circle cx={CX} cy={CY} r={6} fill="#000" />
        <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke="#000" strokeWidth="1" />

        <text
          ref={wheelRef}
          fill="#000"
          fontSize="10"
          fontFamily='"supply-mono", "Courier New", monospace'
          fontWeight="500"
          letterSpacing="2"
        >
          <textPath href={`#${circleId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>
    </div>
  );
};

// ─── Main component ──────────────────────────────────────────────────────────
const SkillsPhilosophy = () => {
  return (
    <section className="min-h-screen bg-white text-black font-sans flex flex-col">

      {/* ── The Wheel + Philosophy quote — grows to fill available space ── */}
      <div className="flex-1 flex items-center w-full px-6 md:px-12 lg:px-16 py-16 bg-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full grid grid-cols-1 md:grid-cols-5 gap-y-8 items-center"
        >
          {/* Left: section label + spinning wheel */}
          <div className="md:col-span-1 flex flex-col items-start gap-8">
            <h2 className="text-xs font-bold uppercase tracking-widest">Skills &amp; Philosophy</h2>
            <KineticWheel />
          </div>

          {/* Right: Grady Booch quote */}
          <div className="md:col-span-4">
            <blockquote className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight">
              "The function of good software is to make the complex appear to be simple."
            </blockquote>
            <p className="mt-6">— Grady Booch</p>
          </div>
        </motion.div>
      </div>

      {/* ── Stats data grid (black background) ── */}
      <div className="w-full bg-black text-white border-t border-white/10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full px-6 md:px-12 lg:px-16 py-16 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10"
        >
          {[
            { stat: "10+", label: "Projects Completed" },
            { stat: "2+", label: "Years Experience" },
            { stat: "500+", label: "Engineering Hours" },
          ].map(({ stat, label }) => (
            <div key={label} className="flex flex-col gap-2 py-10 sm:py-0 sm:px-10 first:pl-0 last:pr-0">
              <span className="font-black text-5xl md:text-6xl tracking-tight leading-none">{stat}</span>
              <span className="font-sans text-xs font-bold uppercase tracking-widest text-white/50">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Skills flowing menu ── */}
      <div className="w-full border-t border-black relative overflow-hidden">
        <FlowingMenu
          items={skillCategories}
          speed={3}
          marqueeBgColor="#000000"
        />
      </div>
    </section>
  );
};

export default SkillsPhilosophy;