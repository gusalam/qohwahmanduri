import { motion } from 'framer-motion';
import heroBg from '@/assets/hero-coffee-bg.jpg';
import CoffeeBubbles from '../CoffeeBubbles';

export default function HeroSection() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero Section Kopi Qohwah Manduri"
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-coffee-gradient opacity-80" />
      </div>
      
      {/* Coffee Bubbles Animation */}
      <CoffeeBubbles />
      
      {/* Content */}
      <div className="relative z-10 section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative Element */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block px-6 py-2 border border-gold/40 rounded-full text-gold text-sm font-sans tracking-widest uppercase">
              Kopi Rempah Premium Indonesia
            </span>
          </motion.div>
          
          {/* Main Headline - H1 for SEO */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-tight"
          >
            Kopi{' '}
            <span className="text-gradient-gold">Qohwah Manduri</span>
          </motion.h1>
          
          {/* Subheadline - H2 for SEO */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-serif text-xl md:text-2xl lg:text-3xl text-cream/90 mb-4 italic"
          >
            Kopi Rempah Tradisional Asli Indonesia
          </motion.h2>
          
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex justify-center items-center gap-4 md:gap-6 mb-10 text-gold"
          >
            <span className="font-sans font-semibold tracking-wide">Healthy</span>
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="font-sans font-semibold tracking-wide">Strong</span>
            <span className="w-2 h-2 rounded-full bg-gold" />
            <span className="font-sans font-semibold tracking-wide">Happy</span>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a 
              href="#produk" 
              className="btn-hero-primary"
            >
              Lihat Produk
            </a>
            <a 
              href="#tentang" 
              className="btn-hero-secondary"
            >
              Tentang Qohwah Manduri
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2 text-cream/60">
            <span className="text-xs font-sans tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-cream/30 rounded-full flex justify-center pt-2"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
