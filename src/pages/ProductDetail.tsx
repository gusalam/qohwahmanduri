import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Leaf, Heart, Zap, Coffee, Package, ShoppingBag, Star, Truck, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/sections/Footer';
import productImage1 from '@/assets/product-gallery-1.png';
import productImage2 from '@/assets/product-gallery-2.png';
import productImage3 from '@/assets/product-gallery-3.png';
import productImage4 from '@/assets/product-gallery-4.png';

const SHOPEE_LINK = 'https://s.shopee.co.id/20pgTNkUwl';

const productImages = [productImage1, productImage4, productImage2, productImage3];

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

const komposisi = [
  'Kopi Robusta Pilihan',
  'Jintan Hitam (Habbatussauda)',
  'Kapulaga',
  'Kencur',
  'Kayu Manis',
  'Jahe Merah',
  'Gula Aren',
];

export default function ProductDetail() {
  return (
    <main className="overflow-hidden bg-background min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 bg-cream-gradient">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="section-container relative z-10">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/#produk" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              Kembali ke Produk
            </Link>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Product Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square">
                <img
                  src={productImages[0]}
                  alt="Qohwah Manduri - Kopi Rempah Tradisional Premium Indonesia"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 z-20 px-4 py-2 rounded-full text-sm font-semibold font-sans"
                  style={{
                    background: 'var(--gradient-gold)',
                    color: 'hsl(var(--coffee-dark))',
                  }}
                >
                  Best Seller
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((img, index) => (
                  <div 
                    key={index}
                    className={`rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                      index === 0 ? 'ring-2 ring-accent' : 'hover:ring-2 hover:ring-accent/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Qohwah Manduri Gallery ${index + 1}`}
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Right: Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-sans font-medium tracking-wide mb-4">
                  Kopi Rempah Premium
                </span>
                <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-2">
                  Qohwah Manduri
                </h1>
                <p className="text-xl text-gradient-gold font-serif font-semibold">
                  Kopi Rempah Tradisional Asli Indonesia
                </p>
              </div>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-muted-foreground font-sans text-sm">(500+ ulasan)</span>
              </div>
              
              {/* Price */}
              <div className="py-4 border-y border-primary/10">
                <p className="text-sm text-muted-foreground font-sans mb-1">Harga mulai dari</p>
                <p className="text-3xl font-bold text-primary font-sans">
                  Rp 35.000
                  <span className="text-lg font-normal text-muted-foreground ml-2">/ Box (10 Sachet)</span>
                </p>
              </div>
              
              {/* Product Info Tags */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg">
                  <Package className="w-5 h-5 text-accent" />
                  <span className="font-sans text-sm text-primary font-medium">10 Sachet/Box</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg">
                  <Coffee className="w-5 h-5 text-accent" />
                  <span className="font-sans text-sm text-primary font-medium">±20g/Sachet</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-lg">
                  <Leaf className="w-5 h-5 text-accent" />
                  <span className="font-sans text-sm text-primary font-medium">100% Alami</span>
                </div>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground font-sans leading-relaxed">
                <strong className="text-primary">Qohwah Manduri</strong> adalah kopi premium yang dibuat dari perpaduan biji kopi Robusta pilihan dengan racikan rempah-rempah alami khas Nusantara, seperti jintan hitam, kapulaga, kencur, dan bahan alami lainnya.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <motion.a
                  href={SHOPEE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-lg font-semibold font-sans transition-all duration-300"
                  style={{
                    background: '#EE4D2D',
                    color: 'white',
                    boxShadow: '0 8px 24px -4px rgba(238, 77, 45, 0.4)',
                  }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Beli di Shopee
                </motion.a>
              </div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-primary/10">
                <div className="text-center">
                  <Truck className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-sans">Pengiriman Cepat</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-sans">Produk Original</p>
                </div>
                <div className="text-center">
                  <Check className="w-6 h-6 text-accent mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground font-sans">Garansi Kualitas</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Detail Sections */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Komposisi */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="font-serif text-xl lg:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-gold)' }}>
                  <Coffee className="w-5 h-5" style={{ color: 'hsl(var(--coffee-dark))' }} />
                </span>
                Komposisi
              </h2>
              
              <ul className="space-y-3">
                {komposisi.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                    <span className="text-muted-foreground font-sans">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Keunggulan */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="font-serif text-xl lg:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-gold)' }}>
                  <Check className="w-5 h-5" style={{ color: 'hsl(var(--coffee-dark))' }} />
                </span>
                Keunggulan
              </h2>
              
              <ul className="space-y-4">
                {keunggulan.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-muted-foreground font-sans text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* Manfaat */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-8"
            >
              <h2 className="font-serif text-xl lg:text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                <span className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--gradient-gold)' }}>
                  <Heart className="w-5 h-5" style={{ color: 'hsl(var(--coffee-dark))' }} />
                </span>
                Manfaat Tradisional
              </h2>
              
              <ul className="space-y-3">
                {manfaatTradisional.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground font-sans text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              
              <p className="text-xs text-muted-foreground/70 font-sans mt-6 pt-4 border-t border-primary/10 italic">
                * Berdasarkan pengetahuan tradisional, bukan klaim medis.
              </p>
            </motion.div>
          </div>
          
          {/* Cara Penyajian */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 glass-card rounded-2xl p-8 lg:p-12"
          >
            <h2 className="font-serif text-2xl lg:text-3xl font-bold text-primary mb-8 text-center">
              Cara <span className="text-gradient-gold">Penyajian</span>
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: '1', title: 'Siapkan', desc: 'Tuang 1 sachet ke dalam cangkir' },
                { step: '2', title: 'Seduh', desc: 'Tambahkan 150ml air panas (±90°C)' },
                { step: '3', title: 'Aduk', desc: 'Aduk rata hingga larut sempurna' },
                { step: '4', title: 'Nikmati', desc: 'Sajikan hangat, bisa dengan ampasnya' },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 font-serif text-xl font-bold"
                    style={{
                      background: 'var(--gradient-gold)',
                      color: 'hsl(var(--coffee-dark))',
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 className="font-serif text-lg font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-muted-foreground font-sans text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA Bottom */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground font-sans mb-6">
              Siap merasakan kenikmatan kopi rempah tradisional Indonesia?
            </p>
            <motion.a
              href={SHOPEE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl text-lg font-semibold font-sans transition-all duration-300"
              style={{
                background: '#EE4D2D',
                color: 'white',
                boxShadow: '0 8px 24px -4px rgba(238, 77, 45, 0.4)',
              }}
            >
              <ShoppingBag className="w-5 h-5" />
              Pesan Sekarang di Shopee
            </motion.a>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
