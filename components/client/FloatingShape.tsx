import { motion } from "framer-motion";

export const FloatingShape = ({ className }: { className: string }) => (
  <motion.div
    animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    className={`absolute rounded-full blur-3xl opacity-40 -z-10 ${className}`}
  />
);
