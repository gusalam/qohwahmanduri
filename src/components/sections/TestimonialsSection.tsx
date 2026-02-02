import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Budi Santoso',
    location: 'Jakarta',
    text: 'Kopi Qohwah Manduri benar-benar berbeda! Rasanya hangat dan menyehatkan. Sudah jadi kopi favorit saya setiap pagi.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    location: 'Surabaya',
    text: 'Aroma rempahnya sangat khas Indonesia. Qohwah Manduri membawa kenangan kopi tradisional nenek saya dulu.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Ahmad Fauzi',
    location: 'Bandung',
    text: 'Sangat praktis dan rasanya konsisten enak. Kopi qohwah manduri cocok untuk menemani kerja dari rumah.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    location: 'Yogyakarta',
    text: 'Saya suka karena tanpa bahan kimia. Kopi rempah yang aman untuk dikonsumsi setiap hari.',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section 
      id="testimoni" 
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
      aria-label="Testimoni Pelanggan Qohwah Manduri"
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 backdrop-blur-sm" />
      
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
            Testimoni
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-cream mb-6">
            Kata Mereka Tentang <span className="text-gradient-gold">Qohwah Manduri</span>
          </h2>
          
          <div className="decorative-line mb-6" />
        </motion.div>
        
        {/* Testimonial Slider */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
              style={{ background: 'var(--gradient-gold)' }}
            >
              <Quote className="w-6 h-6 text-coffee-dark" />
            </div>
            
            {/* Testimonial Card */}
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center"
              style={{
                background: 'hsla(35, 40%, 95%, 0.1)',
                backdropFilter: 'blur(20px)',
                border: '1px solid hsla(42, 70%, 50%, 0.2)',
              }}
            >
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <span key={i} className="text-accent text-xl">★</span>
                  ))}
                </div>
                
                {/* Quote */}
                <p className="font-serif text-xl md:text-2xl text-cream/90 italic leading-relaxed mb-8">
                  "{testimonials[currentIndex].text}"
                </p>
                
                {/* Author */}
                <div>
                  <p className="font-serif text-lg font-semibold text-gold">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-cream/60 font-sans text-sm">
                    {testimonials[currentIndex].location}
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-center items-center gap-6 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-all hover:bg-gold/10 hover:border-gold"
                aria-label="Testimoni sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      index === currentIndex 
                        ? 'bg-gold w-8' 
                        : 'bg-cream/30 hover:bg-cream/50'
                    }`}
                    aria-label={`Lihat testimoni ${index + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-all hover:bg-gold/10 hover:border-gold"
                aria-label="Testimoni selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
