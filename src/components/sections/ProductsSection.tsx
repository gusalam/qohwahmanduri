import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Leaf, Heart, Zap, Coffee, Package, ArrowRight } from 'lucide-react';
import productImage1 from '@/assets/product-gallery-1.png';
import productImage2 from '@/assets/product-gallery-2.png';
import productImage3 from '@/assets/product-gallery-3.png';
import productImage4 from '@/assets/product-gallery-4.png';

const SHOPEE_LINK = 'https://s.shopee.co.id/20pgTNkUwl';

const products = [
  {
    id: 1,
    name: 'Qohwah Manduri Box',
    description: 'Paket box berisi 10 sachet kopi rempah tradisional premium dengan racikan rempah alami khas Nusantara.',
    image: productImage1,
    badge: 'Best Seller',
    info: '10 Sachet × 20g',
  },
  {
    id: 2,
    name: 'Qohwah Manduri Sachet',
    description: 'Sachet praktis kopi Qohwah Manduri untuk dinikmati kapan saja. Tinggal seduh, nikmat terasa.',
    image: productImage2,
    badge: 'Praktis',
    info: '1 Sachet × 20g',
  },
  {
    id: 3,
    name: 'Qohwah Manduri Premium Pack',
    description: 'Paket premium berisi 20 sachet kopi rempah Qohwah Manduri. Cocok untuk hadiah atau stok bulanan.',
    image: productImage3,
    badge: 'Hemat',
    info: '20 Sachet × 20g',
  },
];

const keunggulan = [
  { icon: Leaf, text: 'Terbuat dari 100% bahan alami' },
  { icon: Coffee, text: 'Perpaduan kopi dan rempah tradisional' },
  { icon: Heart, text: 'Aroma khas, rasa lembut dan tidak pahit' },
  { icon: Check, text: 'Dapat diminum bersama ampasnya' },
  { icon: Zap, text: 'Cocok untuk penikmat kopi rempah tradisional' },
];

const manfaatTradisional = [
  'Memberikan rasa hangat pada tubuh',
  'Menjaga stamina dan daya tahan tubuh',
  'Membantu meredakan pegal dan kelelahan',
  'Memberikan efek relaksasi',
  'Menunjang vitalitas pria',
];

function ProductCard({ product, index }: { product: typeof products[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div 
        className="glass-card rounded-2xl overflow-hidden transition-all duration-500"
        style={{
          transform: isHovered ? 'translateY(-8px) rotateX(2deg)' : 'translateY(0) rotateX(0)',
          boxShadow: isHovered 
            ? '0 24px 60px -12px hsla(25, 55%, 12%, 0.25), 0 0 0 1px hsla(42, 70%, 50%, 0.3)' 
            : 'var(--shadow-card)',
        }}
      >
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full text-xs font-semibold font-sans"
            style={{
              background: 'var(--gradient-gold)',
              color: 'hsl(var(--coffee-dark))',
            }}
          >
            {product.badge}
          </div>
        )}
        
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <motion.img
            src={product.image}
            alt={`Produk ${product.name} - Kopi Qohwah Manduri Kopi Rempah Tradisional`}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/60 via-transparent to-transparent" />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="font-serif text-xl font-bold text-primary mb-2">
            {product.name}
          </h3>
          <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-3">
            {product.description}
          </p>
          
          {/* Product Info */}
          <div className="flex items-center gap-2 mb-4">
            <Package className="w-4 h-4 text-accent" />
            <span className="text-xs text-muted-foreground font-sans">{product.info}</span>
          </div>
          
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/produk/qohwah-manduri"
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors font-sans flex items-center gap-1"
            >
              Lihat Detail
              <ArrowRight className="w-4 h-4" />
            </Link>
            <motion.a
              href={SHOPEE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold font-sans transition-all duration-300"
              style={{
                background: 'var(--gradient-gold)',
                color: 'hsl(var(--coffee-dark))',
                boxShadow: isHovered ? 'var(--shadow-gold)' : 'none',
              }}
            >
              Pesan Sekarang
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProductDescriptionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="mt-20 lg:mt-28"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left: Product Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={productImage4}
              alt="Qohwah Manduri - Kopi Rempah Tradisional Premium Indonesia"
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-coffee-dark/30 via-transparent to-transparent" />
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-6 px-6 py-3 rounded-xl shadow-xl"
            style={{
              background: 'var(--gradient-gold)',
            }}
          >
            <p className="font-serif text-lg font-bold" style={{ color: 'hsl(var(--coffee-dark))' }}>
              100% Alami
            </p>
          </div>
        </motion.div>
        
        {/* Right: Product Description */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-6"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-sans font-medium tracking-wide mb-4">
              Deskripsi Produk
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
              Qohwah Manduri
              <span className="block text-gradient-gold">Kopi Rempah Tradisional Premium</span>
            </h2>
          </div>
          
          <p className="text-muted-foreground font-sans leading-relaxed">
            <strong className="text-primary">Qohwah Manduri</strong> adalah kopi premium yang dibuat dari perpaduan biji kopi Robusta pilihan dengan racikan rempah-rempah alami khas Nusantara, seperti jintan hitam, kapulaga, kencur, dan bahan alami lainnya.
          </p>
          
          <p className="text-muted-foreground font-sans leading-relaxed">
            Kopi rempah tradisional ini memiliki ciri khas aroma rempah yang hangat dan menenangkan, namun tetap menghadirkan rasa kopi yang nikmat dan seimbang. Setiap tegukan memberikan sensasi hangat, nyaman, serta membantu meningkatkan semangat dalam menjalani aktivitas sehari-hari.
          </p>
          
          {/* Product Info */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg">
              <Package className="w-5 h-5 text-accent" />
              <span className="font-sans text-sm text-primary font-medium">Isi: 10 Sachet</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg">
              <Coffee className="w-5 h-5 text-accent" />
              <span className="font-sans text-sm text-primary font-medium">Netto: ±20g/sachet</span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Keunggulan & Manfaat Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-16">
        {/* Keunggulan */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="font-serif text-xl lg:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-gold)' }}>
              <Check className="w-5 h-5" style={{ color: 'hsl(var(--coffee-dark))' }} />
            </span>
            Keunggulan Produk
          </h3>
          
          <ul className="space-y-4">
            {keunggulan.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-muted-foreground font-sans">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        {/* Manfaat Tradisional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="glass-card rounded-2xl p-8"
        >
          <h3 className="font-serif text-xl lg:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-gold)' }}>
              <Heart className="w-5 h-5" style={{ color: 'hsl(var(--coffee-dark))' }} />
            </span>
            Manfaat Tradisional
          </h3>
          
          <p className="text-sm text-muted-foreground font-sans mb-4 italic">
            Secara tradisional, Qohwah Manduri dikenal membantu:
          </p>
          
          <ul className="space-y-3">
            {manfaatTradisional.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-muted-foreground font-sans">{item}</span>
              </motion.li>
            ))}
          </ul>
          
          <p className="text-xs text-muted-foreground/70 font-sans mt-6 pt-4 border-t border-primary/10 italic">
            * Informasi manfaat berdasarkan pengetahuan tradisional, bukan klaim medis.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ProductsSection() {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="produk" 
      className="relative py-24 lg:py-32 bg-cream-gradient overflow-hidden"
      aria-label="Produk Kopi Qohwah Manduri - Kopi Rempah Tradisional"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-sans font-medium tracking-wide mb-6">
            Produk Kami
          </span>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Produk <span className="text-gradient-gold">Kopi Qohwah Manduri</span>
          </h2>
          
          <div className="decorative-line mb-6" />
          
          <p className="text-muted-foreground font-sans leading-relaxed">
            Kopi Qohwah Manduri merupakan kopi rempah tradisional alami dengan cita rasa khas dan manfaat kesehatan. 
            Pilih produk yang sesuai dengan kebutuhan Anda.
          </p>
        </motion.div>
        
        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
        
        {/* Product Description Section */}
        <ProductDescriptionSection />
      </div>
    </section>
  );
}
