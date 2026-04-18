'use client';
import { useState, useEffect } from 'react';
import { X, Gift } from 'lucide-react';

export default function AuditPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('audit-popup-dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => { setShow(false); sessionStorage.setItem('audit-popup-dismissed', '1'); };

  if (!show) return null;

  return (
    <>
      <div className="popup-overlay" onClick={dismiss}>
        <div className="popup-card" onClick={e => e.stopPropagation()}>
          <button className="popup-close" onClick={dismiss}><X size={20} /></button>
          <div className="popup-icon"><Gift size={36} /></div>
          <h3>Free Digital Marketing Audit! 🎉</h3>
          <p>Get a complete analysis of your online presence — absolutely FREE. Limited time offer!</p>
          <a href="/contact" className="btn btn-primary" onClick={dismiss}>Claim Your Free Audit</a>
        </div>
      </div>
      <style jsx>{`
        .popup-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease; padding: 24px; }
        .popup-card { background: white; border-radius: var(--radius); padding: 48px 36px; max-width: 440px; width: 100%; text-align: center; position: relative; animation: fadeInUp 0.4s ease; }
        .popup-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--text-muted); }
        .popup-icon { width: 72px; height: 72px; border-radius: 50%; background: rgba(123,47,255,0.08); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: var(--primary); }
        .popup-card h3 { margin-bottom: 12px; font-size: 1.5rem; }
        .popup-card p { color: var(--text-light); margin-bottom: 24px; }
      `}</style>
    </>
  );
}
