import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowDown, Mail, Download } from "lucide-react";
import * as THREE from "three";
import { GithubIcon, LinkedinIcon } from "./Icons";
import ParticleField from "./ParticleField";
import HeroObject from "./HeroObject";
import TypingEffect from "./TypingEffect";

function CanvasLoader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

export default function Hero() {
  const [isWebGLSupported, setIsWebGLSupported] = useState(false);

  useEffect(() => {
    const supported = typeof window !== "undefined" && Boolean(window.WebGLRenderingContext);
    setIsWebGLSupported(supported);
  }, []);

  const shouldRender3DObjects = isWebGLSupported || import.meta.env.MODE === "test";
  const shouldRenderNativeLights = isWebGLSupported && import.meta.env.MODE !== "test";

  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center justify-center overflow-visible"
    >
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
        >
          {shouldRenderNativeLights ? (
            <>
              <primitive object={new THREE.AmbientLight(0xffffff, 0.4)} />
              <primitive object={new THREE.DirectionalLight(0xffffff, 0.6)} position={[5, 5, 5]} />
            </>
          ) : null}
          {shouldRender3DObjects ? (
            <Suspense fallback={<CanvasLoader />}>
              <ParticleField />
              <HeroObject />
            </Suspense>
          ) : null}
        </Canvas>
        {!isWebGLSupported && !import.meta.env.SSR ? (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="relative h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full border border-violet-400/20 bg-[radial-gradient(circle_at_center,_rgba(139,92,246,0.25),_transparent_65%)] shadow-[0_0_80px_rgba(99,102,241,0.2)]" />
            <div className="absolute h-[220px] w-[220px] rounded-full border border-indigo-400/20" />
            <div className="absolute h-[140px] w-[140px] rounded-full border border-violet-400/20" />
          </div>
        ) : null}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-4"
        >
          <motion.div
            className="w-28 h-28 mx-auto rounded-full overflow-hidden ring-2 ring-indigo-500/50 shadow-lg shadow-indigo-500/20"
            whileHover={{ scale: 1.1, boxShadow: "0 0 0 4px rgba(139, 92, 246, 0.3)" }}
          >
            <img
              src="/profile.jpg"
              alt="Anmol Kumar"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-6"
        >
          <span className="inline-block px-5 py-2 text-xs font-semibold tracking-wider text-violet-400 border border-violet-400/30 rounded-full bg-violet-400/10 backdrop-blur-sm uppercase">
            Welcome to my portfolio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-5xl md:text-8xl font-bold mb-4 leading-tight"
        >
          Hi, I&apos;m{" "}
          <motion.span
            className="inline-block bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Anmol Kumar
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xl md:text-2xl text-slate-300 mb-2"
        >
          Data Scientist / AI Engineer
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-lg md:text-xl text-slate-400 mb-6 h-8 overflow-visible"
        >
          <span className="whitespace-nowrap">
            Specializing in <TypingEffect />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-full transition-all duration-300 flex items-center gap-2 btn-shine"
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-full hover:border-violet-400 hover:text-violet-400 transition-all duration-300 flex items-center gap-2 btn-shine"
          >
            Contact Me
          </motion.a>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(139,92,246,0.2)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-full hover:border-violet-400 hover:text-violet-400 transition-all duration-300 flex items-center gap-2 btn-shine"
          >
            <Download size={18} />
            Get Resume
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="https://github.com/AnmolKumar632/AnmolKumar632/tree/main"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full border border-slate-700 text-slate-400 hover:text-violet-400 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
          >
            <GithubIcon width={20} height={20} />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/anmol-kumar-b709762b7"
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full border border-slate-700 text-slate-400 hover:text-violet-400 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
          >
            <LinkedinIcon width={20} height={20} />
          </motion.a>
          <motion.a
            href="mailto:anmolkumar27818@gmail.com"
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full border border-slate-700 text-slate-400 hover:text-violet-400 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
          >
            <Mail size={20} />
          </motion.a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-2 text-slate-500 hover:text-violet-400 transition-colors">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ArrowDown size={18} />
        </div>
      </motion.a>
    </section>
  );
}
