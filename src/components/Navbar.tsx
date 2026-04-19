'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar({ settings = {} }: { settings?: Record<string, string> }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoText = settings.site_name || 'FluxifyMedia';
  const splitIndex = logoText.indexOf('Media');
  const logoMain = splitIndex > -1 ? logoText.substring(0, splitIndex) : logoText;
  const logoSuffix = splitIndex > -1 ? 'Media' : '';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container navbar-inner">
          <Link href="/" className="navbar-logo">
            <Zap size={28} />
            <span>{logoMain}<span className="logo-accent">{logoSuffix}</span></span>
          </Link>
          <div className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/contact" className="btn btn-primary btn-sm nav-cta" onClick={() => setMobileOpen(false)}>
              Get Free Quote
            </Link>
          </div>
          <button className="navbar-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>
      <style jsx>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          padding: 16px 0; transition: all 0.3s ease;
          background: transparent;
        }
        .navbar-scrolled {
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          box-shadow: 0 2px 20px rgba(0,0,0,0.06);
          padding: 10px 0;
        }
        .navbar-inner {
          display: flex; align-items: center; justify-content: space-between;
        }
        .navbar-logo {
          display: flex; align-items: center; gap: 8px;
          font-size: 1.5rem; font-weight: 800; color: var(--primary);
        }
        .logo-accent { color: var(--accent); }
        .navbar-links {
          display: flex; align-items: center; gap: 28px;
        }
        .navbar-links a {
          font-size: 0.9rem; font-weight: 500; color: var(--text);
          transition: color 0.2s; position: relative;
        }
        .navbar-links a:hover { color: var(--primary); }
        .nav-cta { margin-left: 8px; }
        .navbar-toggle { display: none; background: none; border: none; color: var(--text); }
        @media (max-width: 900px) {
          .navbar-toggle { display: block; }
          .navbar-links {
            position: fixed; top: 0; right: -100%; width: 280px; height: 100vh;
            background: white; flex-direction: column; padding: 80px 32px 32px;
            gap: 20px; transition: right 0.3s ease;
            box-shadow: -4px 0 30px rgba(0,0,0,0.1);
          }
          .navbar-links.open { right: 0; }
          .nav-cta { width: 100%; text-align: center; margin-left: 0; margin-top: 16px; }
        }
      `}</style>
    </>
  );
}
