import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const SHOPEE_LINK = 'https://s.shopee.co.id/20pgTNkUwl';

const navLinks = [
  { label: 'Beranda', href: '#' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Produk', href: '#produk' },
  { label: 'Manfaat', href: '#manfaat' },
  { label: 'Testimoni', href: '#testimoni' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 backdrop-blur-lg' 
            : 'py-5'
        }`}
        style={{
          background: isScrolled 
            ? 'hsla(25, 55%, 12%, 0.95)' 
            : 'transparent',
          borderBottom: isScrolled ? '1px solid hsla(42, 70%, 50%, 0.1)' : 'none',
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href="#" className="flex items-center gap-3">
              <img 
                src="/favicon.png" 
                alt="Qohwah Manduri Logo" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain"
              />
              <span className="font-serif text-xl md:text-2xl font-bold text-cream">
                Qohwah <span className="text-gradient-gold">Manduri</span>
              </span>
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-cream/80 hover:text-gold transition-colors font-sans text-sm font-medium tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={SHOPEE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 rounded-full text-sm font-semibold font-sans transition-all hover:-translate-y-0.5"
                style={{ 
                  background: 'var(--gradient-gold)',
                  color: 'hsl(var(--coffee-dark))',
                }}
              >
                Beli Sekarang
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-cream"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 pt-20 md:hidden"
            style={{ background: 'hsl(var(--coffee-dark))' }}
          >
            <div className="section-container py-8">
              <div className="flex flex-col gap-6">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="font-serif text-2xl text-cream/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.a
                  href={SHOPEE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-fit px-8 py-3 rounded-full text-lg font-semibold font-sans mt-4"
                  style={{ 
                    background: 'var(--gradient-gold)',
                    color: 'hsl(var(--coffee-dark))',
                  }}
                >
                  Pesan Sekarang
                </motion.a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
