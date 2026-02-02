import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  {
    number: '01',
    title: 'Sobek Sachet',
    description: 'Sobek sachet kopi Qohwah Manduri dengan hati-hati',
    icon: '✂️',
  },
  {
    number: '02',
    title: 'Tuang ke Cangkir',
    description: 'Tuangkan bubuk kopi ke dalam cangkir favorit Anda',
    icon: '☕',
  },
  {
    number: '03',
    title: 'Seduh Air Panas',
    description: 'Seduh dengan 150ml air panas (tidak mendidih)',
    icon: '🫖',
  },
  {
    number: '04',
    title: 'Nikmati',
    description: 'Aduk dan nikmati aroma kopi rempah yang menenangkan',
    icon: '✨',
  },
];

export default function ServingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="penyajian" 
      className="relative py-24 lg:py-32 bg-cream-gradient overflow-hidden"
      aria-label="Cara Penyajian Kopi Qohwah Manduri"
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-30" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-sans font-medium tracking-wide mb-6">
            Cara Penyajian
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Cara Menyajikan <span className="text-gradient-gold">Qohwah Manduri</span>
          </h2>
          
          <div className="decorative-line mb-6" />
          
          <p className="text-muted-foreground font-sans leading-relaxed">
            Ikuti langkah sederhana ini untuk menikmati kopi Qohwah Manduri dengan sempurna.
          </p>
        </motion.div>
        
        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent/30 to-transparent -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                <div className="glass-card rounded-2xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lg">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-sans"
                    style={{ 
                      background: 'var(--gradient-gold)',
                      color: 'hsl(var(--coffee-dark))',
                    }}
                  >
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="text-5xl mb-6 mt-4">
                    {step.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-serif text-xl font-bold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
