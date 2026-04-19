'use client';
import Link from 'next/link';
import { Zap, Mail, Phone, MapPin, ArrowRight, Globe, ExternalLink } from 'lucide-react';

export default function Footer({ settings }: { settings?: Record<string, string> }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo"><Zap size={24} /><span>Fluxify<span style={{color:'var(--accent)'}}>Media</span></span></div>
            <p>{settings?.tagline || 'We help small businesses and local shops amplify their brand and dominate digital marketing.'}</p>
            <div className="footer-social">
              {settings?.instagram_url && <a href={settings.instagram_url} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><Globe size={20} /></a>}
              {settings?.facebook_url && <a href={settings.facebook_url} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><Globe size={20} /></a>}
              {settings?.linkedin_url && <a href={settings.linkedin_url} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><ExternalLink size={20} /></a>}
              {settings?.twitter_url && <a href={settings.twitter_url} aria-label="Twitter" target="_blank" rel="noopener noreferrer"><Globe size={20} /></a>}
            </div>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li><Link href="/services">SEO Optimization</Link></li>
              <li><Link href="/services">Social Media Marketing</Link></li>
              <li><Link href="/services">Website Design</Link></li>
              <li><Link href="/services">Paid Advertising</Link></li>
              <li><Link href="/services">Content Creation</Link></li>
              <li><Link href="/services">Branding</Link></li>
            </ul>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/testimonials">Testimonials</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact Info</h4>
            <ul className="footer-contact">
              <li><Mail size={16} /><span>{settings?.contact_email || 'hello@fluxifymedia.com'}</span></li>
              <li><Phone size={16} /><span>{settings?.contact_phone || '+91 98765 43210'}</span></li>
              <li><MapPin size={16} /><span>{settings?.office_address || 'Noida, Uttar Pradesh'}</span></li>
            </ul>
            <div className="footer-newsletter">
              <h4>Newsletter</h4>
              <form onSubmit={e => e.preventDefault()} className="newsletter-form">
                <input type="email" placeholder="Your email" className="input" />
                <button type="submit" className="btn btn-primary btn-sm"><ArrowRight size={18} /></button>
              </form>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Fluxify Media. All rights reserved.</p>
        </div>
      </div>
      <style jsx>{`
        .footer { background: var(--bg-dark); color: #ccc; padding: 80px 0 24px; }
        .footer-grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1.5fr; gap: 48px; }
        .footer-logo { display: flex; align-items: center; gap: 8px; font-size: 1.4rem; font-weight: 800; color: white; margin-bottom: 16px; }
        .footer-brand p { font-size: 0.9rem; line-height: 1.7; margin-bottom: 20px; }
        .footer-social { display: flex; gap: 12px; }
        .footer-social a { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: center; color: #ccc; transition: all 0.3s; }
        .footer-social a:hover { background: var(--primary); color: white; transform: translateY(-2px); }
        .footer h4 { color: white; font-size: 1rem; font-weight: 700; margin-bottom: 20px; }
        .footer ul { list-style: none; }
        .footer ul li { margin-bottom: 10px; }
        .footer ul li a { font-size: 0.9rem; color: #aaa; transition: color 0.2s; }
        .footer ul li a:hover { color: var(--accent); }
        .footer-contact li { display: flex; align-items: center; gap: 10px; font-size: 0.9rem; }
        .footer-newsletter { margin-top: 24px; }
        .newsletter-form { display: flex; gap: 8px; margin-top: 10px; }
        .newsletter-form .input { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.1); color: white; padding: 10px 14px; font-size: 0.85rem; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.08); margin-top: 48px; padding-top: 24px; text-align: center; font-size: 0.85rem; }
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
