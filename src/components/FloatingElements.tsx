import { motion } from "framer-motion";

const shapes = [
  { size: 60, x: "10%", y: "20%", delay: 0, duration: 20, color: "violet" },
  { size: 40, x: "85%", y: "15%", delay: 2, duration: 25, color: "indigo" },
  { size: 30, x: "75%", y: "60%", delay: 4, duration: 18, color: "purple" },
  { size: 50, x: "15%", y: "75%", delay: 1, duration: 22, color: "violet" },
  { size: 25, x: "50%", y: "85%", delay: 3, duration: 20, color: "indigo" },
  { size: 35, x: "90%", y: "45%", delay: 5, duration: 23, color: "purple" },
];

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden hidden md:block">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-[0.03]"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            background:
              shape.color === "violet"
                ? "radial-gradient(circle, #8b5cf6, transparent)"
                : shape.color === "indigo"
                ? "radial-gradient(circle, #6366f1, transparent)"
                : "radial-gradient(circle, #a855f7, transparent)",
          }}
          animate={{
            y: [0, -40, 0, 40, 0],
            x: [0, 20, 0, -20, 0],
            scale: [1, 1.2, 1, 0.8, 1],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
