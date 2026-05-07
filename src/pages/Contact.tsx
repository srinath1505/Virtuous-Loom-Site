import { motion } from "framer-motion";
import { useState, Suspense } from "react";
import IDCard from "./IDCard";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz6_hmNogiRhIAkAdfWU9q0wQb2WdEvswPCTHCd9U-giehtMTgKcmZq2NsQES-XYuxd/exec";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const body = new URLSearchParams(formData);
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      setStatus("success");
      setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen bg-white text-black font-sans overflow-hidden grid grid-cols-1 lg:grid-cols-2"
    >
      {/* ── LEFT COLUMN: heading + form ── */}
      <motion.div
        className="flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Tag */}
        <motion.p
          variants={itemVariants}
          className="text-xs font-bold uppercase tracking-widest text-black/50 mb-4"
        >
          Start a project
        </motion.p>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="font-black uppercase leading-[0.85] tracking-tight text-left mb-6"
          style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}
        >
          Contact<br />
          Us <span style={{ display: "inline-block", marginLeft: "0.15em" }}>→</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-base font-normal leading-relaxed text-black/70 mb-10 max-w-sm"
        >
          Tell us about your project. We'll have a blueprint ready in 48 hours.
        </motion.p>

        {/* Form */}
        <motion.form
          variants={itemVariants}
          className="flex flex-col gap-5 max-w-lg"
          onSubmit={handleSubmit}
        >
          {/* Name row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider">
                First Name *
              </label>
              <input
                type="text" id="firstName" name="firstName"
                value={formData.firstName} onChange={handleChange}
                className="w-full bg-transparent border-b border-black/30 py-1 text-base font-medium focus:border-black focus:outline-none transition-colors"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider">
                Last Name *
              </label>
              <input
                type="text" id="lastName" name="lastName"
                value={formData.lastName} onChange={handleChange}
                className="w-full bg-transparent border-b border-black/30 py-1 text-base font-medium focus:border-black focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider">
              Email *
            </label>
            <input
              type="email" id="email" name="email"
              value={formData.email} onChange={handleChange}
              className="w-full bg-transparent border-b border-black/30 py-1 text-base font-medium focus:border-black focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Subject */}
          <div className="flex flex-col gap-1">
            <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider">
              Subject *
            </label>
            <input
              type="text" id="subject" name="subject"
              value={formData.subject} onChange={handleChange}
              className="w-full bg-transparent border-b border-black/30 py-1 text-base font-medium focus:border-black focus:outline-none transition-colors"
              required
            />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider">
              Message *
            </label>
            <textarea
              id="message" name="message" rows={3}
              value={formData.message} onChange={handleChange}
              className="w-full bg-transparent border-b border-black/30 py-1 text-base font-medium focus:border-black focus:outline-none transition-colors resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="mt-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="group flex items-center gap-3 text-base font-bold uppercase tracking-wider hover:text-black/60 transition-colors disabled:opacity-50"
            >
              {status === "sending" ? "Sending…" : "Send Message"}
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </button>
            {status === "success" && (
              <p className="text-sm text-green-600 font-medium mt-2">✓ Message sent! We'll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500 font-medium mt-2">✗ Something went wrong. Please try again.</p>
            )}
          </div>
        </motion.form>
      </motion.div>

      {/* ── RIGHT COLUMN: 3-D ID card — full height, no grey background ── */}
      <div
        className="relative hidden lg:flex items-center justify-center"
        style={{
          background: "#f5f5f5",
          minHeight: "100vh",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 1 }}>
          <Suspense fallback={null}>
            <IDCard />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Contact;
