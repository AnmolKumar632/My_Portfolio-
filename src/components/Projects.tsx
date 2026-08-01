import { motion, useInView } from "framer-motion";
import { useRef, useState, type MouseEvent } from "react";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { GithubIcon } from "./Icons";

function ChurnAnimation() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <defs>
        <linearGradient id="churnGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <rect fill="#0a0a1a" width="800" height="500" />
      {[100,200,300,400,500,600,700].map((x,i) => (
        <rect key={i} x={x-15} y={80} width={30} rx={6} fill="url(#churnGrad)" opacity={0.12 + i*0.1}>
          <animate attributeName="height" values={`${100+i*25};${160+i*20};${100+i*25}`} dur={`${2.2+i*0.3}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`${400-100-i*25};${400-160-i*20};${400-100-i*25}`} dur={`${2.2+i*0.3}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <polyline points="50,280 150,230 280,300 400,180 520,250 650,150 750,120" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="1000" to="0" dur="2.5s" fill="freeze" />
        <animate attributeName="stroke-dasharray" from="0,1000" to="1000,0" dur="2.5s" fill="freeze" />
      </polyline>
      <circle cx="750" cy="120" r="8" fill="#8b5cf6">
        <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <text x="400" y="480" textAnchor="middle" fill="#a78bfa" fontSize="16" fontFamily="monospace" opacity="0.5">94% Accuracy</text>
    </svg>
  );
}

function ResumeAnimation() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <rect fill="#0a0a1a" width="800" height="500" />
      <rect x="250" y="60" width="300" height="380" rx="12" fill="#1a1a2e" stroke="#6366f1" strokeWidth="1.5" opacity="0.7" />
      <rect x="280" y="90" width="120" height="10" rx="5" fill="#8b5cf6" opacity="0.7">
        <animate attributeName="width" values="120;200;120" dur="3s" repeatCount="indefinite" />
      </rect>
      <rect x="280" y="115" width="200" height="6" rx="3" fill="#6366f1" opacity="0.35" />
      <rect x="280" y="132" width="170" height="6" rx="3" fill="#6366f1" opacity="0.35" />
      <rect x="280" y="149" width="210" height="6" rx="3" fill="#6366f1" opacity="0.35" />
      <rect x="280" y="175" width="100" height="6" rx="3" fill="#8b5cf6" opacity="0.3" />
      <rect x="280" y="192" width="150" height="6" rx="3" fill="#6366f1" opacity="0.3" />
      <circle cx="520" cy="250" r="60" fill="none" stroke="#8b5cf6" strokeWidth="2.5" opacity="0.6">
        <animate attributeName="r" values="60;68;60" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="520" y="258" textAnchor="middle" fill="#a78bfa" fontSize="24" fontFamily="monospace">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
        AI
      </text>
      <circle cx="520" cy="250" r="80" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="5 5" opacity="0.3">
        <animateTransform attributeName="transform" type="rotate" from="0 520 250" to="360 520 250" dur="12s" repeatCount="indefinite" />
      </circle>
      <circle cx="280" cy="310" r="5" fill="#22c55e">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="305" cy="350" r="5" fill="#22c55e">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="330" cy="390" r="5" fill="#22c55e">
        <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="1s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function DashboardAnimation() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <rect fill="#0a0a1a" width="800" height="500" />
      <rect x="40" y="40" width="340" height="190" rx="10" fill="#1a1a2e" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" />
      <polyline points="70,195 130,155 190,175 250,110 310,140 360,90" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="500" to="0" dur="1.8s" fill="freeze" />
        <animate attributeName="stroke-dasharray" from="0,500" to="500,0" dur="1.8s" fill="freeze" />
      </polyline>
      <rect x="420" y="40" width="340" height="190" rx="10" fill="#1a1a2e" stroke="#6366f1" strokeWidth="1" opacity="0.5" />
      {[445,490,535,580,625,670].map((x,i) => (
        <rect key={i} x={x} width="30" rx={5} fill="#8b5cf6" opacity={0.35 + i*0.1}>
          <animate attributeName="height" values={`${35+i*15};${70+i*12};${35+i*15}`} dur={`${1.6+i*0.2}s`} repeatCount="indefinite" />
          <animate attributeName="y" values={`${210-35-i*15};${210-70-i*12};${210-35-i*15}`} dur={`${1.6+i*0.2}s`} repeatCount="indefinite" />
        </rect>
      ))}
      <rect x="40" y="260" width="720" height="200" rx="10" fill="#1a1a2e" stroke="#6366f1" strokeWidth="1" opacity="0.5" />
      {[100,180,260,340,420,500,580,660].map((x,i) => (
        <circle key={i} cx={x} cy={370 - Math.sin(i*0.8)*35} r="5" fill="#8b5cf6">
          <animate attributeName="cy" values={`${370-Math.sin(i*0.8)*35};${350-Math.sin(i*0.8)*35};${370-Math.sin(i*0.8)*35}`} dur={`${2.2+i*0.3}s`} repeatCount="indefinite" />
        </circle>
      ))}
      <polyline points="100,370 180,345 260,360 340,320 420,340 500,310 580,325 660,290" fill="none" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" opacity="0.6">
        <animate attributeName="stroke-dashoffset" from="800" to="0" dur="2.5s" fill="freeze" />
        <animate attributeName="stroke-dasharray" from="0,800" to="800,0" dur="2.5s" fill="freeze" />
      </polyline>
    </svg>
  );
}

function SentimentAnimation() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <rect fill="#0a0a1a" width="800" height="500" />
      <circle cx="400" cy="220" r="90" fill="none" stroke="#06b6d4" strokeWidth="3">
        <animate attributeName="r" values="90;98;90" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="372" cy="200" r="10" fill="#06b6d4">
        <animate attributeName="cy" values="200;193;200" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="428" cy="200" r="10" fill="#06b6d4">
        <animate attributeName="cy" values="200;193;200" dur="1.5s" begin="0.3s" repeatCount="indefinite" />
      </circle>
      <path d="M355,250 Q400,290 445,250" fill="none" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round">
        <animate attributeName="d" values="M355,250 Q400,290 445,250;M355,258 Q400,282 445,258;M355,250 Q400,290 445,250" dur="3s" repeatCount="indefinite" />
      </path>
      {["😊","😐","😞","😡","🤩"].map((emoji,i) => (
        <text key={i} x={100+i*150} y="420" textAnchor="middle" fontSize="36" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur={`${2.2+i*0.4}s`} begin={`${i*0.5}s`} repeatCount="indefinite" />
          {emoji}
        </text>
      ))}
      <text x="400" y="480" textAnchor="middle" fill="#06b6d4" fontSize="14" fontFamily="monospace" opacity="0.5">Real-time Sentiment</text>
    </svg>
  );
}

function InventoryAnimation() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <rect fill="#0a0a1a" width="800" height="500" />
      {[120,270,420,570].map((x,i) => (
        <g key={i}>
          <rect x={x} y={350-i*40} width="80" height={100+i*40} rx="6" fill="#10b981" opacity={0.12+i*0.08}>
            <animate attributeName="height" values={`${100+i*40};${130+i*35};${100+i*40}`} dur={`${2.2+i*0.3}s`} repeatCount="indefinite" />
            <animate attributeName="y" values={`${350-i*40};${320-i*40};${350-i*40}`} dur={`${2.2+i*0.3}s`} repeatCount="indefinite" />
          </rect>
          <rect x={x+10} y={350-i*40+10} width="60" height="5" rx="2" fill="#10b981" opacity="0.4" />
          <rect x={x+10} y={350-i*40+22} width="40" height="5" rx="2" fill="#10b981" opacity="0.3" />
        </g>
      ))}
      <polyline points="160,310 310,255 460,280 610,210" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" from="600" to="0" dur="2s" fill="freeze" />
        <animate attributeName="stroke-dasharray" from="0,600" to="600,0" dur="2s" fill="freeze" />
      </polyline>
      <polygon points="610,203 620,215 600,215" fill="#22c55e">
        <animate attributeName="opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
      </polygon>
      <text x="400" y="480" textAnchor="middle" fill="#10b981" fontSize="14" fontFamily="monospace" opacity="0.5">-35% Stockout</text>
    </svg>
  );
}

function HRAnimation() {
  return (
    <svg viewBox="0 0 800 500" className="w-full h-full">
      <rect fill="#0a0a1a" width="800" height="500" />
      {[220,330,440].map((x,i) => (
        <g key={i}>
          <circle cx={x} cy="130" r="28" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity={0.35+i*0.2}>
            <animate attributeName="r" values="28;32;28" dur={`${2.2+i*0.5}s`} repeatCount="indefinite" />
          </circle>
          <rect x={x-16} y="166" width="32" height="40" rx="12" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity={0.35+i*0.2} />
        </g>
      ))}
      <circle cx="580" cy="130" r="28" fill="none" stroke="#ef4444" strokeWidth="2.5" opacity="0.5" strokeDasharray="5 5">
        <animateTransform attributeName="transform" type="rotate" from="0 580 130" to="360 580 130" dur="4s" repeatCount="indefinite" />
      </circle>
      <rect x="564" y="166" width="32" height="40" rx="12" fill="none" stroke="#ef4444" strokeWidth="2.5" opacity="0.5" />
      <polyline points="80,250 180,280 280,230 380,300 480,240 580,280 700,250" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" opacity="0.5">
        <animate attributeName="stroke-dashoffset" from="800" to="0" dur="2s" fill="freeze" />
        <animate attributeName="stroke-dasharray" from="0,800" to="800,0" dur="2s" fill="freeze" />
      </polyline>
      <rect x="100" y="320" width="140" height="100" rx="8" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="1" opacity="0.45" />
      <rect x="330" y="320" width="140" height="100" rx="8" fill="#1a1a2e" stroke="#f59e0b" strokeWidth="1" opacity="0.45" />
      <rect x="560" y="320" width="140" height="100" rx="8" fill="#1a1a2e" stroke="#ef4444" strokeWidth="1" opacity="0.45" />
      <text x="170" y="375" textAnchor="middle" fill="#f59e0b" fontSize="13" fontFamily="monospace" opacity="0.6">Hire</text>
      <text x="400" y="375" textAnchor="middle" fill="#f59e0b" fontSize="13" fontFamily="monospace" opacity="0.6">Retain</text>
      <text x="630" y="375" textAnchor="middle" fill="#ef4444" fontSize="13" fontFamily="monospace" opacity="0.6">Churn</text>
      <text x="170" y="400" textAnchor="middle" fill="#22c55e" fontSize="22" fontFamily="monospace">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
        72%
      </text>
      <text x="400" y="400" textAnchor="middle" fill="#22c55e" fontSize="22" fontFamily="monospace">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="0.5s" repeatCount="indefinite" />
        61%
      </text>
      <text x="630" y="400" textAnchor="middle" fill="#ef4444" fontSize="22" fontFamily="monospace">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
        28%
      </text>
    </svg>
  );
}

const projectAnimations = [ChurnAnimation, ResumeAnimation, DashboardAnimation, SentimentAnimation, InventoryAnimation, HRAnimation];

const projects = [
  {
    title: "Customer Churn Prediction",
    description:
      "ML model predicting customer churn using ensemble methods with 94% accuracy. Built with Python, Scikit-learn, and interactive Power BI dashboard.",
    imagePrompt: "A high-tech 3D data visualization featuring vibrant glowing neon graphs, futuristic bar charts, and flowing dynamic lines representing customer metrics, dark modern UI theme, bright purple and cyan accents, minimalist glassmorphism, isometric perspective, octane render, 8k resolution.",
    image: "/projects/churn-prediction.png",
    tags: ["Python", "Scikit-learn", "Power BI", "SQL"],
    github: "https://github.com/AnmolKumar632/AnmolKumar632/tree/main",
    live: "#contact",
    liveLabel: "Discuss",
    accent: "from-violet-500 to-purple-600",
    accentText: "text-violet-400",
    accentBorder: "border-violet-500/30",
    accentBg: "bg-violet-500/10",
  },
  {
    title: "AI-Powered Resume Screening",
    description:
      "NLP-based system that auto-screens and ranks resumes using keyword extraction and semantic matching with OpenAI embeddings.",
    imagePrompt: "Abstract digital AI scanning interface, glowing documents with binary code streams, subtle neural network overlay, neon violet and deep blue lighting, sleek futuristic dashboard style, minimalist composition, glossy modern UI concept, 8k resolution.",
    image: "/projects/resume-screening.png",
    tags: ["Python", "NLP", "OpenAI", "MongoDB"],
    github: "https://github.com/AnmolKumar632/AnmolKumar632/tree/main",
    live: "#contact",
    liveLabel: "Discuss",
    accent: "from-indigo-500 to-blue-600",
    accentText: "text-indigo-400",
    accentBorder: "border-indigo-500/30",
    accentBg: "bg-indigo-500/10",
  },
  {
    title: "Sales Analytics Dashboard",
    description:
      "Interactive Power BI dashboard visualizing sales trends, KPIs, and regional performance with real-time data from MySQL.",
    imagePrompt: "Modern financial data visualization, vibrant 3D glowing trend graphs and bar charts, emerald green and electric blue neon lighting, dark mode aesthetic, smooth translucent glass bar charts, isometric dynamic view, highly detailed, octane render.",
    image: "/projects/sales-dashboard.png",
    tags: ["Power BI", "MySQL", "Excel", "DAX"],
    github: "https://github.com/AnmolKumar632/AnmolKumar632/tree/main",
    live: "#contact",
    liveLabel: "Discuss",
    accent: "from-purple-500 to-pink-600",
    accentText: "text-purple-400",
    accentBorder: "border-purple-500/30",
    accentBg: "bg-purple-500/10",
  },
  {
    title: "Sentiment Analysis Engine",
    description:
      "Deep learning model for real-time sentiment analysis of social media data, achieving 91% accuracy on multilingual datasets.",
    imagePrompt: "Abstract representation of human emotions and artificial intelligence, glowing 3D emoji-inspired neon spheres emitting vibrant light beams, digital wave patterns, vibrant magenta and cyan glow, deep dark backplate, sleek modern tech aesthetic, 8k render.",
    image: "/projects/sentiment-analysis.png",
    tags: ["Python", "TensorFlow", "BERT", "Flask"],
    github: "https://github.com/AnmolKumar632/AnmolKumar632/tree/main",
    live: "#contact",
    liveLabel: "Discuss",
    accent: "from-cyan-500 to-teal-600",
    accentText: "text-cyan-400",
    accentBorder: "border-cyan-500/30",
    accentBg: "bg-cyan-500/10",
  },
  {
    title: "Inventory Optimization ML",
    description:
      "Machine learning pipeline for demand forecasting and inventory optimization, reducing stockout by 35% using time-series models.",
    imagePrompt: "Futuristic automated warehouse logistics visual, abstract glowing neon supply chain network, 3D isometric boxes connected by vibrant orange and teal light paths, high-tech machine learning concept art, dark background, ultra-detailed.",
    image: "/projects/inventory-optimization.png",
    tags: ["Python", "XGBoost", "Pandas", "SQL"],
    github: "https://github.com/AnmolKumar632/AnmolKumar632/tree/main",
    live: "#contact",
    liveLabel: "Discuss",
    accent: "from-emerald-500 to-green-600",
    accentText: "text-emerald-400",
    accentBorder: "border-emerald-500/30",
    accentBg: "bg-emerald-500/10",
  },
  {
    title: "HR Analytics & Attrition Report",
    description:
      "Comprehensive data analysis of employee attrition factors using Excel and Power BI with actionable HR recommendations.",
    imagePrompt: "Abstract high-tech workforce network visualization, glowing 3D connected avatar nodes, vibrant crimson and sapphire blue light waves, sleek modern UI metrics overlay, dark theme background, minimal glassmorphism design, highly detailed.",
    image: "/projects/hr-analytics.png",
    tags: ["Excel", "Power BI", "SQL", "Statistics"],
    github: "https://github.com/AnmolKumar632/AnmolKumar632/tree/main",
    live: "#contact",
    liveLabel: "Discuss",
    accent: "from-amber-500 to-orange-600",
    accentText: "text-amber-400",
    accentBorder: "border-amber-500/30",
    accentBg: "bg-amber-500/10",
  },
];

function ProjectCard({
  project,
  index,
  isInView,
  AnimationComponent,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
  AnimationComponent: React.FC;
}) {
  const [imageError, setImageError] = useState(false);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, link: string) => {
    if (!link) return;
    event.preventDefault();
    if (/^https?:\/\//i.test(link) || /^mailto:/i.test(link)) {
      if (link.startsWith("http")) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = link;
      }
      return;
    }
    if (link.startsWith("#")) {
      const targetId = link.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      window.history.pushState(null, "", link);
      return;
    }
    window.location.assign(link);
  };

  const showImage = project.image && !imageError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative rounded-2xl overflow-hidden border border-slate-800/80 bg-slate-900/40 backdrop-blur-md transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-violet-500/10 hover:border-indigo-500/40`}
    >
      {/* Image / Animation Area */}
      <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-[#0a0a1a]">
        {showImage ? (
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <AnimationComponent />
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

        {/* Top-right GitHub icon */}
        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-2 group-hover:translate-y-0">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleLinkClick(e, project.github)}
            className="p-2.5 rounded-xl bg-slate-900/70 backdrop-blur-md border border-slate-700/50 text-slate-300 hover:text-white hover:border-violet-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20"
          >
            <GithubIcon width={16} height={16} />
          </a>
          <a
            href={project.live}
            target={project.live.startsWith("#") ? undefined : "_blank"}
            rel={project.live.startsWith("#") ? undefined : "noreferrer"}
            onClick={(e) => handleLinkClick(e, project.live)}
            className="p-2.5 rounded-xl bg-slate-900/70 backdrop-blur-md border border-slate-700/50 text-slate-300 hover:text-white hover:border-violet-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/20"
          >
            <ExternalLink size={16} />
          </a>
        </div>

        {/* Title overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
          <h3 className={`text-xl font-bold text-white mb-2 flex items-center gap-2 transition-colors duration-300`}>
            {project.title}
            <ArrowUpRight
              size={18}
              className={`${project.accentText} opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0`}
            />
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-300 bg-slate-800/80 backdrop-blur-sm rounded-full border border-slate-700/50 transition-colors duration-300`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5">
        <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        <div className="flex gap-3">
          <a
            href={project.live}
            target={project.live.startsWith("#") ? undefined : "_blank"}
            rel={project.live.startsWith("#") ? undefined : "noreferrer"}
            onClick={(e) => handleLinkClick(e, project.live)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-gradient-to-r ${project.accent} text-white hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 btn-shine`}
          >
            <ExternalLink size={14} />
            {project.liveLabel}
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => handleLinkClick(e, project.github)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-300 hover:text-white hover:border-indigo-500/40 hover:bg-slate-800 transition-all duration-300 btn-shine"
          >
            <GithubIcon width={14} height={14} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-12 md:py-16 px-6 relative scroll-mt-24">
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
            Portfolio
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight overflow-visible">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-300 max-w-md mx-auto">
            A showcase of my data science & AI work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isInView={isInView}
              AnimationComponent={projectAnimations[i]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
