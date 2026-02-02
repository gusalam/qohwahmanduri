import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Apa itu Kopi Qohwah Manduri?',
    answer: 'Kopi Qohwah Manduri adalah kopi rempah tradisional Indonesia yang terbuat dari perpaduan kopi Robusta pilihan dengan rempah-rempah alami seperti jintan hitam (habbatussauda), kapulaga, dan kencur. Kombinasi ini menghasilkan cita rasa kopi yang unik dengan manfaat kesehatan.'
  },
  {
    question: 'Apa saja kandungan dalam Qohwah Manduri?',
    answer: 'Qohwah Manduri mengandung kopi Robusta premium, jintan hitam (habbatussauda) yang kaya antioksidan, kapulaga untuk aroma dan pencernaan, serta kencur yang membantu menjaga stamina. Semua bahan 100% alami tanpa pengawet atau pewarna buatan.'
  },
  {
    question: 'Apa manfaat kesehatan dari Qohwah Manduri?',
    answer: 'Qohwah Manduri memiliki berbagai manfaat kesehatan berkat kandungan rempah alaminya: meningkatkan daya tahan tubuh, membantu melancarkan pencernaan, menjaga stamina dan vitalitas, serta kaya akan antioksidan yang baik untuk kesehatan jantung dan otak.'
  },
  {
    question: 'Bagaimana cara menyajikan Qohwah Manduri?',
    answer: 'Sangat mudah! Tuangkan 1 sachet Qohwah Manduri ke dalam cangkir, tambahkan 150-200ml air panas, aduk rata, dan nikmati. Anda bisa menambahkan gula atau susu sesuai selera. Untuk rasa terbaik, gunakan air dengan suhu sekitar 90°C.'
  },
  {
    question: 'Apakah Qohwah Manduri aman untuk dikonsumsi setiap hari?',
    answer: 'Ya, Qohwah Manduri aman dikonsumsi setiap hari karena terbuat dari bahan-bahan alami. Namun, seperti kopi pada umumnya, konsumsi yang disarankan adalah 1-3 cangkir per hari. Bagi yang memiliki kondisi kesehatan tertentu, sebaiknya konsultasikan dengan dokter.'
  },
  {
    question: 'Di mana saya bisa membeli Qohwah Manduri?',
    answer: 'Anda bisa membeli Qohwah Manduri melalui toko resmi kami di Shopee atau menghubungi langsung via WhatsApp untuk pemesanan. Kami melayani pengiriman ke seluruh Indonesia dengan berbagai pilihan ekspedisi.'
  },
  {
    question: 'Berapa lama masa simpan Qohwah Manduri?',
    answer: 'Qohwah Manduri memiliki masa simpan sekitar 12 bulan dari tanggal produksi jika disimpan dengan benar. Simpan di tempat kering dan sejuk, hindari paparan sinar matahari langsung dan kelembaban tinggi.'
  },
  {
    question: 'Apakah Qohwah Manduri halal?',
    answer: 'Ya, Qohwah Manduri 100% halal. Semua bahan yang digunakan adalah bahan alami yang halal, dan proses produksi dilakukan dengan standar kebersihan dan kehalalan yang terjaga.'
  }
];

export default function FAQSection() {
  return (
    <section 
      id="faq" 
      className="relative py-24 overflow-hidden"
      style={{ background: 'var(--gradient-hero)' }}
      aria-labelledby="faq-heading"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase mb-4 font-sans"
            style={{ 
              background: 'linear-gradient(135deg, hsl(var(--gold) / 0.2), hsl(var(--gold) / 0.1))',
              color: 'hsl(var(--gold))',
              border: '1px solid hsl(var(--gold) / 0.3)'
            }}
          >
            Pertanyaan Umum
          </span>
          <h2 id="faq-heading" className="font-serif text-4xl md:text-5xl font-bold text-cream mb-4">
            Frequently Asked <span className="text-gradient-gold">Questions</span>
          </h2>
          <p className="text-cream/70 font-sans max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang Kopi Qohwah Manduri
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-gold/20 overflow-hidden"
                style={{ background: 'hsl(var(--coffee-dark) / 0.5)' }}
              >
                <AccordionTrigger className="px-6 py-5 text-left font-serif text-lg text-cream hover:text-gold hover:no-underline transition-colors [&[data-state=open]]:text-gold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-cream/70 font-sans leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-cream/60 font-sans mb-4">
            Masih punya pertanyaan lain?
          </p>
          <a
            href="https://wa.me/6281249622253"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold font-sans transition-all hover:-translate-y-1"
            style={{ 
              background: 'var(--gradient-gold)',
              color: 'hsl(var(--coffee-dark))',
            }}
          >
            Hubungi Kami via WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
