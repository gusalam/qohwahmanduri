import { motion } from 'framer-motion';
import { useMemo } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: string;
  delay: number;
  duration: number;
}

export default function CoffeeBubbles() {
  const bubbles = useMemo<Bubble[]>(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 12 + 4, // 4-16px
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 8, // 8-14s
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: bubble.left,
            bottom: '-20px',
            background: `radial-gradient(circle at 30% 30%, rgba(201, 169, 98, 0.6), rgba(139, 105, 20, 0.3))`,
            boxShadow: `inset 0 0 ${bubble.size / 3}px rgba(255, 255, 255, 0.3)`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(bubble.id) * 30, 0, Math.sin(bubble.id + 1) * -20, 0],
            opacity: [0, 0.7, 0.6, 0.4, 0],
            scale: [0.5, 1, 1.1, 0.9, 0.5],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
