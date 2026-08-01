import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
  {
    title: "Languages & AI",
    icon: "🤖",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "Machine Learning", icon: "🧠" },
      { name: "AI Tools", icon: "⚡" },
      { name: "TensorFlow", icon: "📊" },
      { name: "Scikit-learn", icon: "📈" },
    ],
  },
  {
    title: "Data & Analytics",
    icon: "📈",
    skills: [
      { name: "Power BI", icon: "📊" },
      { name: "Excel", icon: "📗" },
      { name: "SQL (MySQL)", icon: "🗃️" },
      { name: "Statistics", icon: "📉" },
      { name: "Pandas / NumPy", icon: "🐼" },
    ],
  },
  {
    title: "Databases & Tools",
    icon: "🛠️",
    skills: [
      { name: "MySQL", icon: "🐬" },
      { name: "MongoDB", icon: "🍃" },
      { name: "Jupyter / Colab", icon: "📓" },
      { name: "Git", icon: "🔧" },
      { name: "Docker", icon: "🐳" },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-12 md:py-16 px-6 relative scroll-mt-24">
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
            Expertise
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight overflow-visible">
            My{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-slate-300 max-w-md mx-auto">
            Technologies & tools I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              whileHover={{ y: -4, borderColor: "rgba(139,92,246,0.4)" }}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 shadow-xl group"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-lg font-bold text-slate-200 group-hover:text-violet-400 transition-colors">
                  {category.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: catIndex * 0.15 + skillIndex * 0.06 }}
                    whileHover={{ scale: 1.08, borderColor: "rgba(139,92,246,0.4)" }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-300 bg-slate-800/50 rounded-full border border-slate-700/50 hover:text-violet-300 hover:bg-violet-500/10 transition-all cursor-default"
                  >
                    <span className="text-xs">{skill.icon}</span>
                    {skill.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
