'use client';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <>
      <a href="https://wa.me/919999999999" target="_blank" rel="noopener noreferrer" className="whatsapp-btn" aria-label="Chat on WhatsApp">
        <MessageCircle size={28} />
      </a>
      <style jsx>{`
        .whatsapp-btn {
          position: fixed; bottom: 24px; right: 24px; z-index: 999;
          width: 60px; height: 60px; border-radius: 50%;
          background: #25D366; color: white;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 20px rgba(37,211,102,0.4);
          transition: all 0.3s ease;
          animation: pulse 2s ease-in-out infinite;
        }
        .whatsapp-btn:hover { transform: scale(1.1); box-shadow: 0 6px 30px rgba(37,211,102,0.5); }
      `}</style>
    </>
  );
}
