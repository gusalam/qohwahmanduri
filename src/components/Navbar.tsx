import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingBag, Music2 } from 'lucide-react';

const SHOPEE_LINK = 'https://s.shopee.co.id/20pgTNkUwl';
const TOKOPEDIA_LINK = 'https://vt.tokopedia.com/t/ZS91prYtK3nCn-lM7t4/';
const TIKTOK_LINK = 'https://www.tiktok.com/@mas_gian_?_r=1&_t=ZS-93aH9z5I3sI';

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
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);

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
              <div className="flex items-center gap-2">
                <a
                  href={SHOPEE_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-semibold font-sans transition-all hover:-translate-y-0.5"
                  style={{ 
                    background: 'var(--gradient-gold)',
                    color: 'hsl(var(--coffee-dark))',
                  }}
                >
                  Shopee
                </a>
                <a
                  href={TOKOPEDIA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full text-sm font-semibold font-sans transition-all hover:-translate-y-0.5 border border-gold/50 text-gold hover:bg-gold/10"
                >
                  Tokopedia
                </a>
              </div>
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
                
                {/* Order Dropdown */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 relative"
                >
                  <button
                    onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
                    className="inline-flex items-center gap-2 w-fit px-8 py-3 rounded-full text-lg font-semibold font-sans"
                    style={{ 
                      background: 'var(--gradient-gold)',
                      color: 'hsl(var(--coffee-dark))',
                    }}
                  >
                    Pesan Sekarang
                    <ChevronDown className={`w-5 h-5 transition-transform ${isOrderDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOrderDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-56 rounded-xl shadow-lg z-50 overflow-hidden"
                        style={{ background: 'hsl(var(--coffee-medium))' }}
                      >
                        <div className="py-2">
                          <a
                            href={SHOPEE_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setIsOrderDropdownOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 text-cream hover:bg-gold/20 transition-colors"
                          >
                            <ShoppingBag className="w-5 h-5 text-gold" />
                            <span className="font-sans">Shopee</span>
                          </a>
                          <a
                            href={TIKTOK_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setIsOrderDropdownOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 text-cream hover:bg-gold/20 transition-colors"
                          >
                            <Music2 className="w-5 h-5 text-gold" />
                            <span className="font-sans">TikTok</span>
                          </a>
                          <a
                            href={TOKOPEDIA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => {
                              setIsOrderDropdownOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className="flex items-center gap-3 px-4 py-3 text-cream hover:bg-gold/20 transition-colors"
                          >
                            <ShoppingBag className="w-5 h-5 text-gold" />
                            <span className="font-sans">Tokopedia</span>
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
