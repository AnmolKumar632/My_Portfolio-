import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, BarChart3, MapPin, GraduationCap } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";

const infoItems = [
  { icon: GraduationCap, label: "Education", value: "B.Tech (Data Science)" },
  { icon: Brain, label: "Focus", value: "AI & ML" },
  { icon: BarChart3, label: "Specialty", value: "Data Science" },
  { icon: MapPin, label: "Location", value: "Bangalore" },
];

const stats = [
  { label: "Projects", value: 15, suffix: "+" },
  { label: "Skills", value: 12, suffix: "+" },
  { label: "Datasets Analyzed", value: 50, suffix: "+" },
  { label: "Models Built", value: 20, suffix: "+" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-12 md:py-16 px-6 relative scroll-mt-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4 }}
            className="inline-block px-4 py-1.5 text-xs font-semibold tracking-[0.22em] text-violet-400 border border-violet-400/20 rounded-full bg-violet-400/5 uppercase mb-4"
          >
            About Me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight overflow-visible">
            Turning{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Data
            </span>{" "}
            Into Decisions
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-10 lg:gap-16 xl:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col gap-4 w-full max-w-[20rem] sm:max-w-[22rem] lg:max-w-[24rem] mx-auto lg:mx-0 lg:justify-self-end">
              <div className="relative group">
                <div className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
                  <img
                    src="/profile.jpg"
                    alt="Anmol Kumar"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-full h-full rounded-[2rem] border-2 border-violet-600/20 -z-10" />
                <div className="absolute -top-3 -left-3 w-full h-full rounded-[2rem] border border-indigo-600/10 -z-10" />
              </div>

              <div className="flex flex-wrap gap-2 mt-2 justify-center lg:justify-start">
                {infoItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.3)" }}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs bg-slate-900/60 border border-slate-800/80 rounded-full text-slate-300 cursor-default backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 shadow-xl"
                  >
                    <item.icon className="w-3.5 h-3.5 text-violet-400" />
                    <span>{item.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full max-w-[34rem] mx-auto lg:mx-0 lg:pl-4 xl:pl-8 [transform:none]"
          >
            <div className="max-w-prose pr-4">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-5 text-slate-200 leading-tight text-left">
                A dedicated Data Scientist & AI Engineer based in Bangalore
              </h3>
              <p className="text-[15px] sm:text-base text-slate-300 leading-8 mb-4 text-left text-pretty">
                I&apos;m currently pursuing my <span className="text-violet-400 font-semibold">B.Tech in Data Science</span>,
                where I&apos;m building a strong foundation in machine learning, data analysis,
                and intelligent systems. My academic journey fuels my passion for turning
                raw data into meaningful insights and creating AI solutions that solve real-world problems.
              </p>
              <p className="text-[15px] sm:text-base text-slate-300 leading-8 mb-8 text-left text-pretty">
                With strong skills in Python, SQL, Power BI, and modern AI tools, I work
                across the full data pipeline — from collection and cleaning to
                modeling and visualization. When I&apos;m not analyzing data, you&apos;ll
                find me exploring new ML techniques, building dashboards, or
                contributing to data-driven projects.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-[34rem]">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(139,92,246,0.4)" }}
                  className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-center transition-all duration-300 hover:border-indigo-500/40 shadow-xl"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl font-bold text-violet-400">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
