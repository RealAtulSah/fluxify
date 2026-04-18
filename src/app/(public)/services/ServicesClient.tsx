'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Star, Search, Share2, Code, Target, PenTool, Palette } from 'lucide-react';

const iconsMap: Record<string, React.ReactNode> = {
  '🚀': <Search size={32} />,
  'Search': <Search size={32} />,
  'Share2': <Share2 size={32} />,
  'Code': <Code size={32} />,
  'Target': <Target size={32} />,
  'PenTool': <PenTool size={32} />,
  'Palette': <Palette size={32} />
};

type S = { id: string; title: string; icon: string; description: string | null; features: string[] };
type P = { id: string; name: string; price: string; features: string[]; popular: boolean; ctaLabel: string; period: string };

export default function ServicesClient({ services, plans }: { services: S[]; plans: P[] }) {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="page-hero"><div className="container">
        <span className="section-label">Our Services</span>
        <h1>Everything You Need to <span className="gradient-text">Grow Online</span></h1>
        <p className="hero-sub">Comprehensive digital marketing solutions tailored for small businesses and local shops.</p>
      </div></section>

      <section className="section">
        <div className="container">
          {services.map((s, i) => {
            const colors = ['#7B2FFF', '#FF6B35', '#06b6d4', '#10b981', '#f43f5e', '#8b5cf6'];
            const color = colors[i % colors.length];
            // Render icon directly from string if not in map (e.g. emoji)
            const icon = iconsMap[s.icon] || <span style={{ fontSize: '2rem' }}>{s.icon}</span>;

            return (
              <div key={s.id} className={`service-row reveal ${i % 2 !== 0 ? 'reverse' : ''}`}>
                <div className="service-info">
                  <div className="service-icon-lg" style={{ background: `${color}15`, color: color }}>{icon}</div>
                  <h2>{s.title}</h2>
                  <p className="service-desc">{s.description}</p>
                  <ul className="feature-list">
                    {s.features.map((f, j) => (
                      <li key={j}><Check size={18} style={{ color: color }} />{f}</li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn btn-primary btn-sm">Get Started <ArrowRight size={16} /></Link>
                </div>
                <div className="service-visual">
                  <div className="service-visual-bg" style={{ background: `linear-gradient(135deg, ${color}20, ${color}05)` }}>
                    <div className="service-visual-icon" style={{ color: color }}>{icon}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="section section-alt reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Pricing</span>
            <h2 className="section-title">Simple, Transparent <span className="gradient-text">Pricing</span></h2>
            <p className="section-subtitle">Choose a plan that fits your business. No hidden fees, no surprises.</p>
          </div>
          <div className="grid-3">
            {plans.map((p) => (
              <div key={p.id} className={`card pricing-card ${p.popular ? 'popular' : ''}`}>
                {p.popular && <div className="popular-badge"><Star size={14} /> Most Popular</div>}
                <h3>{p.name}</h3>
                <div className="price">{p.price}<span>{p.period}</span></div>
                <ul className="pricing-features">
                  {p.features.map((f, j) => <li key={j}><Check size={16} />{f}</li>)}
                </ul>
                <Link href="/contact" className={`btn ${p.popular ? 'btn-primary' : 'btn-secondary'}`} style={{ width: '100%' }}>{p.ctaLabel}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .page-hero { padding: 120px 0 80px; text-align: center; background: var(--bg-alt); }
        .page-hero h1 { margin: 16px 0; }
        .hero-sub { max-width: 600px; margin: 0 auto; color: var(--text-light); font-size: 1.15rem; }
        .service-row { display: flex; gap: 64px; align-items: center; margin-bottom: 80px; }
        .service-row.reverse { flex-direction: row-reverse; }
        .service-info { flex: 1; }
        .service-visual { flex: 1; display: flex; justify-content: center; }
        .service-visual-bg { width: 300px; height: 300px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; }
        .service-visual-icon { transform: scale(4); opacity: 0.3; }
        .service-icon-lg { width: 64px; height: 64px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .service-info h2 { font-size: 1.75rem; margin-bottom: 12px; }
        .service-desc { color: var(--text-light); margin-bottom: 20px; font-size: 1rem; }
        .feature-list { list-style: none; margin-bottom: 24px; }
        .feature-list li { display: flex; align-items: center; gap: 10px; padding: 6px 0; font-size: 0.95rem; }
        .pricing-card { text-align: center; padding: 40px 32px; position: relative; }
        .pricing-card.popular { border: 2px solid var(--primary); transform: scale(1.05); }
        .popular-badge { position: absolute; top: -14px; left: 50%; transform: translateX(-50%); background: var(--gradient); color: white; padding: 4px 16px; border-radius: var(--radius-full); font-size: 0.75rem; font-weight: 700; display: flex; align-items: center; gap: 4px; white-space: nowrap; }
        .pricing-card h3 { font-size: 1.2rem; margin-bottom: 12px; }
        .price { font-size: 2.5rem; font-weight: 900; margin-bottom: 24px; }
        .price span { font-size: 1rem; color: var(--text-muted); font-weight: 400; }
        .pricing-features { list-style: none; text-align: left; margin-bottom: 28px; }
        .pricing-features li { display: flex; align-items: center; gap: 8px; padding: 8px 0; font-size: 0.9rem; color: var(--text-light); border-bottom: 1px solid var(--border); }
        .pricing-features li:last-child { border-bottom: none; }
        @media (max-width: 768px) { .service-row, .service-row.reverse { flex-direction: column; gap: 32px; } .service-visual-bg { width: 200px; height: 200px; } .pricing-card.popular { transform: none; } }
      `}</style>
    </>
  );
}
