import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 z-[60] origin-left"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
