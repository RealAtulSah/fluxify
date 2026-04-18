'use client';
import { useState, useEffect } from 'react';
import { X, ExternalLink } from 'lucide-react';

const categories = ['All', 'SEO', 'Social Media', 'Web Design', 'Ads'];
const projects = [
  { title: 'E-commerce Website Redesign', client: 'Singh Electronics', category: 'Web Design', stat: '300% traffic increase', desc: 'Complete e-commerce website redesign with modern UI, fast checkout, and mobile optimization.' },
  { title: 'Instagram Growth Campaign', client: "Anita's Boutique", category: 'Social Media', stat: '15K followers in 4 months', desc: 'Strategic Instagram growth campaign with professional content creation.' },
  { title: 'Google Ads Campaign', client: "Kumar's Restaurant", category: 'Ads', stat: '180% footfall increase', desc: 'Hyper-local Google Ads campaigns driving consistent customer acquisition.' },
  { title: 'SEO Domination Strategy', client: 'TechFix Solutions', category: 'SEO', stat: '#1 ranking in 90 days', desc: 'Comprehensive SEO strategy from page 5 to position 1.' },
  { title: 'Brand Identity Design', client: 'GreenLeaf Organics', category: 'Web Design', stat: '250% brand recall', desc: 'Complete brand identity including logo, packaging, and digital assets.' },
  { title: 'Facebook Lead Generation', client: 'HomeFit Gym', category: 'Ads', stat: '500+ leads/month', desc: 'Lead generation campaign driving gym memberships.' },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="page-hero"><div className="container">
        <span className="section-label">Our Work</span>
        <h1>Projects That <span className="gradient-text">Speak Results</span></h1>
        <p style={{ color: 'var(--text-light)', maxWidth: 600, margin: '0 auto', fontSize: '1.15rem' }}>Real projects, real results. Browse our portfolio of successful digital marketing campaigns.</p>
      </div></section>

      <section className="section reveal">
        <div className="container">
          <div className="filter-bar">
            {categories.map(c => <button key={c} onClick={() => setFilter(c)} className={`filter-btn ${filter === c ? 'active' : ''}`}>{c}</button>)}
          </div>
          <div className="grid-3">
            {filtered.map((p, i) => (
              <div key={i} className="card portfolio-card" onClick={() => setSelected(p)}>
                <div className="portfolio-thumb"><span className="portfolio-initial">{p.client[0]}</span></div>
                <span className="badge badge-purple">{p.category}</span>
                <h3>{p.title}</h3>
                <p className="portfolio-client">{p.client}</p>
                <div className="portfolio-stat">{p.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-card" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X size={20} /></button>
            <span className="badge badge-purple">{selected.category}</span>
            <h2>{selected.title}</h2>
            <p><strong>Client:</strong> {selected.client}</p>
            <p style={{ marginTop: 12 }}>{selected.desc}</p>
            <div className="modal-stat"><span>{selected.stat}</span></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-hero { padding: 120px 0 80px; text-align: center; background: var(--bg-alt); }
        .page-hero h1 { margin: 16px 0; }
        .filter-bar { display: flex; gap: 12px; justify-content: center; margin-bottom: 48px; flex-wrap: wrap; }
        .filter-btn { padding: 10px 24px; border-radius: var(--radius-full); border: 1.5px solid var(--border); background: white; font-weight: 600; font-size: 0.9rem; transition: all 0.2s; cursor: pointer; }
        .filter-btn.active { background: var(--primary); color: white; border-color: var(--primary); }
        .filter-btn:hover:not(.active) { border-color: var(--primary); color: var(--primary); }
        .portfolio-card { cursor: pointer; }
        .portfolio-thumb { width: 100%; height: 180px; border-radius: var(--radius-sm); background: linear-gradient(135deg, rgba(123,47,255,0.1), rgba(255,107,53,0.1)); display: flex; align-items: center; justify-content: center; margin-bottom: 16px; }
        .portfolio-initial { font-size: 3rem; font-weight: 900; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .portfolio-card .badge { margin-bottom: 12px; }
        .portfolio-card h3 { font-size: 1.05rem; margin-bottom: 4px; }
        .portfolio-client { color: var(--text-muted); font-size: 0.85rem; margin-bottom: 12px; }
        .portfolio-stat { font-weight: 700; color: var(--primary); font-size: 0.95rem; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 24px; animation: fadeIn 0.3s; }
        .modal-card { background: white; border-radius: var(--radius); padding: 40px; max-width: 520px; width: 100%; position: relative; animation: fadeInUp 0.3s; }
        .modal-close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--text-muted); }
        .modal-card h2 { margin: 12px 0; font-size: 1.5rem; }
        .modal-stat { margin-top: 20px; padding: 16px; background: var(--bg-alt); border-radius: var(--radius-sm); text-align: center; }
        .modal-stat span { font-size: 1.3rem; font-weight: 800; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
      `}</style>
    </>
  );
}
