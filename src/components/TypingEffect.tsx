import { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";

export default function TypingEffect() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const ref = useRef(null);

  const words = useMemo(
    () => [
      "Machine Learning",
      "Data Science",
      "AI Engineering",
      "Power BI Dashboards",
      "Predictive Analytics",
      "Deep Learning",
    ],
    []
  );

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <motion.span
      ref={ref}
      className="inline-block text-violet-400"
    >
      {text}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
        className="text-violet-400"
      >
        |
      </motion.span>
    </motion.span>
  );
}
