import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, Mail, MapPin, CheckCircle, Loader2, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

const contactInfo = [
  { icon: Mail, label: "Email", value: "anmolkumar27818@gmail.com", href: "mailto:anmolkumar27818@gmail.com" },
  { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/anmol-kumar-b709762b7", href: "https://www.linkedin.com/in/anmol-kumar-b709762b7" },
  { icon: GithubIcon, label: "GitHub", value: "github.com/AnmolKumar632", href: "https://github.com/AnmolKumar632/AnmolKumar632/tree/main" },
  { icon: MapPin, label: "Address", value: "Halasuru, Bangalore-560008", href: "#" },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [accessKey] = useState("10fea155-cb00-44e2-8f76-465aa45bcfd1");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: "Anmol Kumar",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-12 md:py-16 px-6 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-1.5 text-xs font-semibold tracking-wider text-violet-400 border border-violet-400/20 rounded-full bg-violet-400/5 uppercase mb-4"
          >
            Contact
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight overflow-visible">
            Get In{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-slate-300 max-w-md mx-auto">
            Let&apos;s work together on your next data project
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-slate-200 mb-4">
              Let&apos;s talk
            </h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              I&apos;m always open to discussing data science projects, AI
              collaborations, or opportunities to turn your data into actionable
              insights. Feel free to reach out!
            </p>

            <div className="space-y-4">
              {contactInfo.map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 8, borderColor: "rgba(139,92,246,0.4)" }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 shadow-xl group"
                >
                  <div className="p-3 rounded-xl bg-violet-600/10 text-violet-400 group-hover:bg-violet-600/20 transition-colors group-hover:shadow-lg group-hover:shadow-violet-500/10">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-medium text-slate-200">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl text-slate-200 placeholder-slate-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 hover:border-indigo-500/40"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl text-slate-200 placeholder-slate-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 hover:border-indigo-500/40"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl text-slate-200 placeholder-slate-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 hover:border-indigo-500/40"
                  placeholder="Project inquiry"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3.5 bg-slate-900/60 border border-slate-800/80 backdrop-blur-md rounded-2xl text-slate-200 placeholder-slate-600 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all duration-300 hover:border-indigo-500/40 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}
                whileTap={{ scale: 0.98 }}
                disabled={status === "sending"}
                className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 btn-shine ${
                  status === "sent"
                    ? "bg-emerald-600 text-white"
                    : status === "error"
                    ? "bg-red-600 text-white"
                    : "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-violet-500/25"
                }`}
              >
                {status === "sending" ? (
                  <><Loader2 size={18} className="animate-spin" /> Sending...</>
                ) : status === "sent" ? (
                  <><CheckCircle size={18} /> Message Sent Successfully!</>
                ) : status === "error" ? (
                  <><X size={18} /> Failed to send. Try again!</>
                ) : (
                  <><Send size={18} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
