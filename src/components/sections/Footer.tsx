import { motion } from 'framer-motion';
import { Phone, Instagram, Facebook, Mail, MapPin, ShoppingBag } from 'lucide-react';

const WHATSAPP_NUMBER = '6281249622253';
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;
const MAPS_LINK = 'https://maps.app.goo.gl/xsz5KHyMSPPQMGd36';
const SHOPEE_LINK = 'https://s.shopee.co.id/20pgTNkUwl';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative pt-20 pb-8 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
      aria-label="Footer Kopi Qohwah Manduri"
    >
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1"
        style={{ background: 'var(--gradient-gold)' }}
      />
      
      <div className="section-container">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <h3 className="font-serif text-3xl font-bold text-cream mb-4">
              Kopi <span className="text-gradient-gold">Qohwah Manduri</span>
            </h3>
            <p className="text-cream/70 font-sans leading-relaxed mb-6 max-w-md">
              Kopi Qohwah Manduri adalah kopi rempah tradisional Indonesia dengan rasa khas, alami, dan menyehatkan. 
              Nikmati pengalaman ngopi yang berbeda dengan Qohwah Manduri.
            </p>
            
            {/* Tagline */}
            <div className="flex items-center gap-3 text-gold font-sans font-medium mb-6">
              <span>Healthy</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Strong</span>
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span>Happy</span>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-4">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: ShoppingBag, href: SHOPEE_LINK, label: 'Shopee' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold transition-all hover:bg-gold hover:text-coffee-dark"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-serif text-lg font-semibold text-cream mb-6">
              Menu
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Beranda', href: '#' },
                { label: 'Tentang Kami', href: '#tentang' },
                { label: 'Produk', href: '#produk' },
                { label: 'Manfaat', href: '#manfaat' },
                { label: 'Testimoni', href: '#testimoni' },
                { label: 'Belanja di Shopee', href: SHOPEE_LINK, external: true },
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-cream/60 hover:text-gold transition-colors font-sans text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-serif text-lg font-semibold text-cream mb-6">
              Hubungi Kami
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cream/60 hover:text-gold transition-colors font-sans text-sm"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  +62 812-4962-2253
                </a>
              </li>
              <li>
                <a
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-cream/60 hover:text-gold transition-colors font-sans text-sm"
                >
                  <MapPin className="w-4 h-4 text-gold mt-0.5" />
                  <span>Lihat Lokasi di Google Maps</span>
                </a>
              </li>
              <li>
                <a
                  href={SHOPEE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-cream/60 hover:text-gold transition-colors font-sans text-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  Toko Shopee Official
                </a>
              </li>
            </ul>
            
            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full text-sm font-semibold font-sans transition-all hover:-translate-y-1"
              style={{ 
                background: 'var(--gradient-gold)',
                color: 'hsl(var(--coffee-dark))',
              }}
            >
              <Phone className="w-4 h-4" />
              Pesan via WhatsApp
            </a>
          </motion.div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-cream/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/50 font-sans text-sm text-center md:text-left">
              © {currentYear} Kopi Qohwah Manduri. All rights reserved. Kopi Rempah Tradisional Premium Asli Indonesia.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-cream/40 font-sans text-xs">
                Qohwah Manduri - Healthy • Strong • Happy
              </p>
              <span className="hidden md:inline text-cream/30">|</span>
              <a
                href="https://tretandevelopment.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/40 hover:text-gold font-sans text-xs transition-colors"
              >
                Developed by Tretan Development
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
