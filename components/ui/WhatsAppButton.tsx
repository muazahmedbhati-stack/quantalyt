'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/923397444694?text=Hi%20Quantalyt!%20I'm%20interested%20in%20your%20services."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
      style={{ background: '#25D366' }}
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse ring */}
      <span
        className="absolute inset-0 rounded-full animate-ping opacity-30"
        style={{ background: '#25D366' }}
      />
      <MessageCircle size={26} className="text-white fill-current" />
    </motion.a>
  );
}
