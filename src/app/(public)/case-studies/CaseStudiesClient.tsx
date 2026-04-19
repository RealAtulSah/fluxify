'use client';
import { useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudiesClient({ caseStudies }: { caseStudies: any[] }) {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <section className="page-hero"><div className="container">
        <span className="section-label">Case Studies</span>
        <h1>Proven Results, <span className="gradient-text">Real Stories</span></h1>
        <p style={{ color: 'var(--text-light)', maxWidth: 600, margin: '0 auto', fontSize: '1.15rem' }}>Deep-dive into how we helped real businesses achieve extraordinary growth.</p>
      </div></section>

      {caseStudies.length === 0 && (
        <section className="section" style={{ textAlign: 'center' }}>
          <div className="container">
            <p>More case studies coming soon.</p>
          </div>
        </section>
      )}

      {caseStudies.map((cs, i) => {
        const before = JSON.parse(cs.beforeStats || '{}');
        const after = JSON.parse(cs.afterStats || '{}');
        return (
          <section key={cs.id} className={`section ${i % 2 !== 0 ? 'section-alt' : ''} reveal`}>
            <div className="container">
              <span className="badge badge-purple">{cs.category || 'Growth'}</span>
              <h2 style={{ margin: '12px 0 24px', fontSize: '1.75rem' }}>{cs.title}</h2>
              <div className="cs-grid">
                <div><h3>The Challenge</h3><p>{cs.challenge}</p></div>
                <div><h3>Our Strategy</h3><p>{cs.strategy}</p></div>
              </div>
              <div className="comparison">
                <div className="comp-col before">
                  <h4>Before</h4>
                  {Object.entries(before).map(([k, v]) => <div key={k} className="comp-row"><span>{k}</span><strong>{String(v)}</strong></div>)}
                </div>
                <div className="comp-arrow"><ArrowRight size={32} /></div>
                <div className="comp-col after">
                  <h4>After</h4>
                  {Object.entries(after).map(([k, v]) => <div key={k} className="comp-row"><span>{k}</span><strong>{String(v)}</strong></div>)}
                </div>
              </div>
              {cs.testimonialQuote && (
                <blockquote className="cs-quote">&ldquo;{cs.testimonialQuote}&rdquo;<cite>— {cs.client}</cite></blockquote>
              )}
            </div>
          </section>
        );
      })}

      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Want Results Like These?</h2>
          <p style={{ color: 'var(--text-light)', margin: '12px 0 32px' }}>Let{"'"}s create your success story together.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Start Your Growth Journey <ArrowUpRight size={20} /></Link>
        </div>
      </section>

      <style jsx>{`
        .page-hero { padding: 120px 0 80px; text-align: center; background: var(--bg-alt); }
        .page-hero h1 { margin: 16px 0; }
        .cs-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-bottom: 40px; }
        .cs-grid h3 { font-size: 1.1rem; margin-bottom: 8px; color: var(--primary); }
        .cs-grid p { color: var(--text-light); }
        .comparison { display: flex; align-items: center; gap: 24px; margin-bottom: 32px; }
        .comp-col { flex: 1; border-radius: var(--radius); padding: 28px; }
        .comp-col.before { background: rgba(239,68,68,0.04); border: 1px solid rgba(239,68,68,0.15); }
        .comp-col.after { background: rgba(16,185,129,0.04); border: 1px solid rgba(16,185,129,0.15); }
        .comp-col h4 { font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 16px; }
        .before h4 { color: #ef4444; }
        .after h4 { color: #10b981; }
        .comp-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.05); font-size: 0.9rem; }
        .comp-row:last-child { border-bottom: none; }
        .comp-arrow { color: var(--primary); flex-shrink: 0; }
        .cs-quote { font-size: 1.15rem; font-style: italic; color: var(--text-light); padding: 20px 28px; border-left: 3px solid var(--primary); background: var(--bg-alt); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
        .cs-quote cite { display: block; margin-top: 8px; font-size: 0.9rem; font-weight: 600; color: var(--text); font-style: normal; }
        @media (max-width: 768px) { .cs-grid { grid-template-columns: 1fr; } .comparison { flex-direction: column; } .comp-arrow { transform: rotate(90deg); } }
      `}</style>
    </>
  );
}
