import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import aboutVideo from '@/assets/about-video.mp4';

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      id="tentang" 
      className="relative py-24 lg:py-32 bg-cream-gradient overflow-hidden"
      aria-label="Tentang Qohwah Manduri"
    >
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 bg-coffee-pattern opacity-50" />
      
      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Looping Video */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <video
              src={aboutVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            {/* Section Label */}
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-sans font-medium tracking-wide mb-6">
              Tentang Kami
            </span>
            
            {/* Section Title */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 leading-tight">
              Cerita <span className="text-gradient-gold">Qohwah Manduri</span>
            </h2>
            
            {/* Decorative Line */}
            <div className="decorative-line mb-8 ml-0" />
            
            {/* Description - SEO optimized with keywords */}
            <div className="space-y-6 text-foreground/80 font-sans leading-relaxed">
              <p className="text-lg">
                <strong className="text-primary">Kopi Qohwah Manduri</strong> adalah warisan kopi rempah tradisional Indonesia yang telah diwariskan turun-temurun. Nama "Qohwah" berasal dari bahasa Arab yang berarti kopi, sementara "Manduri" melambangkan kekuatan dan kesejahteraan.
              </p>
              
              <p>
                Kami menghadirkan kembali kearifan lokal Indonesia melalui perpaduan sempurna antara biji kopi pilihan dengan rempah-rempah nusantara seperti jahe, kayu manis, dan cengkeh. Setiap tegukan <strong>Qohwah Manduri</strong> membawa kehangatan dan manfaat kesehatan yang telah dipercaya generasi.
              </p>
              
              <p>
                Diproses dengan teknologi modern namun tetap mempertahankan cita rasa otentik, kopi rempah kami menjadi pilihan tepat bagi Anda yang menginginkan pengalaman ngopi yang berbeda – sehat, kuat, dan penuh kebahagiaan.
              </p>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-6 mt-10">
              {[
                { number: '100%', label: 'Alami' },
                { number: '7+', label: 'Rempah' },
                { number: '1000+', label: 'Pelanggan' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="font-serif text-2xl md:text-3xl font-bold text-accent mb-1">
                    {item.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-sans">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
