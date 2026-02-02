import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Zap, Heart, Leaf, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Membantu Stamina Tubuh',
    description: 'Kopi Qohwah Manduri membantu meningkatkan energi dan stamina secara alami tanpa efek samping berlebihan.',
  },
  {
    icon: Heart,
    title: 'Menghangatkan Badan',
    description: 'Perpaduan rempah pilihan memberikan sensasi hangat yang nyaman, cocok untuk segala cuaca.',
  },
  {
    icon: Leaf,
    title: 'Kopi Rempah Alami',
    description: 'Dibuat dari bahan-bahan alami tanpa pewarna dan pengawet buatan. 100% aman untuk dikonsumsi.',
  },
  {
    icon: Shield,
    title: 'Tanpa Bahan Kimia',
    description: 'Qohwah Manduri diproses secara tradisional tanpa tambahan bahan kimia berbahaya.',
  },
];

export default function BenefitsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="manfaat" 
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
      aria-label="Manfaat Kopi Qohwah Manduri"
    >
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-gold/20 text-gold rounded-full text-sm font-sans font-medium tracking-wide mb-6">
            Manfaat
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-6">
            Manfaat <span className="text-gradient-gold">Qohwah Manduri</span>
          </h2>
          
          <div className="decorative-line mb-6" />
          
          <p className="text-cream/70 font-sans leading-relaxed">
            Rasakan manfaat luar biasa dari kopi rempah tradisional Indonesia yang telah dipercaya selama generasi.
          </p>
        </motion.div>
        
        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2"
                  style={{
                    background: 'hsla(35, 40%, 95%, 0.08)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid hsla(42, 70%, 50%, 0.15)',
                  }}
                >
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: 'var(--gradient-gold)' }}
                  >
                    <Icon className="w-7 h-7 text-coffee-dark" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-serif text-xl font-bold text-cream mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-cream/60 font-sans text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
