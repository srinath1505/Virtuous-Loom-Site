import { motion } from "framer-motion";
import "./TeamSection.css";

// ─── Team data ────────────────────────────────────────────────────────────────
const team = [
  {
    initials: "AS",
    name: "Aravind Sriraman",
    role: "Chief Executive Officer",
    descriptor: "Vision & Strategy",
    bio: "Aravind built Virtuous Loom on a single conviction: that the gap between a great idea and a great product should be measured in days, not months. He leads the firm's direction, shapes client relationships, and holds every engagement to the standard the name demands.",
    bg: "#ffffff",
    fg: "#0a0a0a",
    photoOverlay: "rgba(0,0,0,0.06)",
    photoBorder: "rgba(0,0,0,0.08)",
    initialsColor: "rgba(0,0,0,0.15)",
  },
  {
    initials: "MR",
    name: "Muhammed Riyaz S",
    role: "Chief Operating Officer",
    descriptor: "Delivery & Standards",
    bio: "Riyaz is the operational backbone of every product Virtuous Loom ships. He owns the delivery process end-to-end — from blueprint sign-off through to deployment — ensuring every project runs on time, on spec, and at the quality standard the firm is known for.",
    bg: "#e4e4e4",
    fg: "#0a0a0a",
    photoOverlay: "rgba(0,0,0,0.06)",
    photoBorder: "rgba(0,0,0,0.08)",
    initialsColor: "rgba(0,0,0,0.15)",
  },
  {
    initials: "SS",
    name: "Srinath Selvakumar",
    role: "Chief Technology Officer",
    descriptor: "Engineering & Architecture",
    bio: "Srinath sets the technical foundation that everything else is built on. He defines the engineering standards every product must meet before it leaves the firm's hands — ensuring what ships is not just functional, but structurally sound, scalable, and secure.",
    bg: "#b0b0b0",
    fg: "#0a0a0a",
    photoOverlay: "rgba(0,0,0,0.08)",
    photoBorder: "rgba(0,0,0,0.1)",
    initialsColor: "rgba(0,0,0,0.18)",
  },
  {
    initials: "SK",
    name: "Sarath Kumar B",
    role: "Chief Marketing Officer",
    descriptor: "Growth & Positioning",
    bio: "Sarath leads the commercial growth of Virtuous Loom with deliberate, methodical precision. He identifies the right markets, positions the firm's value with clarity, and structures partnerships that deliver genuine returns on both sides.",
    bg: "#2e2e2e",
    fg: "#ffffff",
    photoOverlay: "rgba(255,255,255,0.06)",
    photoBorder: "rgba(255,255,255,0.1)",
    initialsColor: "rgba(255,255,255,0.18)",
  },
  {
    initials: "KB",
    name: "Kajal Bhandari",
    role: "Chief Accounts Officer",
    descriptor: "Client Success & Relationships",
    bio: "Kajal is the constant that clients feel from first contact to final delivery — and long after. Sharp on positioning, precise on communication, and genuinely invested in outcomes, Kajal ensures every client of Virtuous Loom feels exactly that: a client of Virtuous Loom. Not a ticket in a queue.",
    bg: "#0a0a0a",
    fg: "#ffffff",
    photoOverlay: "rgba(255,255,255,0.05)",
    photoBorder: "rgba(255,255,255,0.1)",
    initialsColor: "rgba(255,255,255,0.15)",
  },
];

// ─── Main section ─────────────────────────────────────────────────────────────
const TeamSection = () => {
  return (
    <section id="team" className="vl-team-section">

      {/* ── Section header ── */}
      <div className="vl-team-header">
        <motion.p
          className="vl-team-eyebrow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          The People Behind the Product
        </motion.p>

        <div style={{ overflow: "hidden" }}>
          <motion.h1
            className="vl-team-headline"
            initial={{ y: "110%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          >
            Your Vision.<br />Our Expertise.
          </motion.h1>
        </div>

        <motion.p
          className="vl-team-subtext"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          A tight-knit team of engineers, architects, and operators who care
          about the craft. Every brief gets our full attention.
          Every product ships with intent.
        </motion.p>
      </div>

      {/* ── Stacking cards (CSS sticky) ── */}
      {team.map((member, i) => (
        <div
          className="vl-team-card"
          key={member.name}
          id={`vl-team-card-${i + 1}`}
          style={{ zIndex: i + 1 }}
        >
          <div
            className="vl-team-card-inner"
            style={{ backgroundColor: member.bg, color: member.fg }}
          >
            {/* ── Left: member info ── */}
            <div className="vl-team-card-content">
              <div className="vl-team-card-meta">
                <span className="vl-team-card-index">0{i + 1}</span>
                <span className="vl-team-card-rule" aria-hidden="true" />
                <span className="vl-team-card-descriptor">{member.descriptor}</span>
              </div>

              <h2 className="vl-team-card-name">{member.name}</h2>
              <p className="vl-team-card-role">{member.role}</p>
              <p className="vl-team-card-bio">{member.bio}</p>
            </div>

            {/* ── Right: photo placeholder ── */}
            <div className="vl-team-card-photo-col">
              <div
                className="vl-team-card-photo-frame"
                style={{
                  background: member.photoOverlay,
                  border: `1px solid ${member.photoBorder}`,
                }}
              >
                <span
                  className="vl-team-card-initials"
                  style={{ color: member.initialsColor }}
                >
                  {member.initials}
                </span>
                <span
                  className="vl-team-card-photo-hint"
                  style={{ color: member.initialsColor }}
                >
                  Photo
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Scroll runway — keeps Card 5 fully visible before the section exits */}
      <div style={{ height: "50vh", background: "#0a0a0a" }} />
    </section>
  );
};

export default TeamSection;
