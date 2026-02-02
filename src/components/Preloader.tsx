import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Duration of preloader (2.5 seconds)
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onComplete();
    }
  };

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'hsl(30, 25%, 95%)' }}
        >
          <div className="relative flex flex-col items-center">
            {/* Steam Animation */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex gap-3">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-1 rounded-full"
                  style={{ 
                    background: 'linear-gradient(to top, hsl(25, 55%, 25%), transparent)',
                    height: '40px'
                  }}
                  initial={{ opacity: 0, y: 20, scaleY: 0.5 }}
                  animate={{ 
                    opacity: [0, 0.6, 0],
                    y: [20, -30, -50],
                    scaleY: [0.5, 1, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </div>

            {/* Coffee Cup Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="text-coffee-dark"
              >
                <motion.path
                  d="M17 8h1a4 4 0 0 1 0 8h-1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <motion.path
                  d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              </svg>
            </motion.div>

            {/* Logo Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <h1 
                className="font-serif text-3xl md:text-4xl font-bold mb-2"
                style={{ color: 'hsl(25, 55%, 20%)' }}
              >
                Kopi{' '}
                <span 
                  className="bg-clip-text text-transparent"
                  style={{ 
                    backgroundImage: 'linear-gradient(135deg, hsl(42, 70%, 45%), hsl(35, 80%, 55%))'
                  }}
                >
                  Qohwah Manduri
                </span>
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="font-sans text-sm tracking-[0.3em] uppercase"
                style={{ color: 'hsl(25, 30%, 40%)' }}
              >
                Healthy • Strong • Happy
              </motion.p>
            </motion.div>

            {/* Loading Indicator */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
              className="mt-8 h-0.5 w-32 rounded-full origin-left"
              style={{ 
                background: 'linear-gradient(90deg, hsl(42, 70%, 45%), hsl(35, 80%, 55%))'
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
