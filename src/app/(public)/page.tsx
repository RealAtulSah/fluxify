'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Search, Share2, Code, Target, PenTool, Palette, TrendingUp, Users, Award, Clock, ArrowRight, Star, ChevronRight } from 'lucide-react';

const services = [
  { icon: <Search size={28} />, title: 'SEO Optimization', desc: 'Dominate search rankings and drive organic traffic that converts.' },
  { icon: <Share2 size={28} />, title: 'Social Media Marketing', desc: 'Build communities, create viral content, grow your audience.' },
  { icon: <Code size={28} />, title: 'Website Design & Dev', desc: 'Stunning websites that turn visitors into paying customers.' },
  { icon: <Target size={28} />, title: 'Google & Meta Ads', desc: 'Maximize ROI with data-driven paid advertising campaigns.' },
  { icon: <PenTool size={28} />, title: 'Content Creation', desc: 'Engaging content that educates, entertains, and converts.' },
  { icon: <Palette size={28} />, title: 'Branding & Identity', desc: 'Memorable brand identities that make you unforgettable.' },
];

const stats = [
  { num: 150, suffix: '+', label: 'Clients Served' },
  { num: 3, suffix: 'X', label: 'Average ROI' },
  { num: 98, suffix: '%', label: 'Client Satisfaction' },
  { num: 5, suffix: '+', label: 'Years Experience' },
];

const reasons = [
  { icon: <TrendingUp size={24} />, title: 'Results-Driven', desc: 'Every strategy is backed by data and focused on measurable growth.' },
  { icon: <Users size={24} />, title: 'Dedicated Team', desc: 'A passionate team that treats your business like their own.' },
  { icon: <Award size={24} />, title: 'Proven Track Record', desc: '150+ businesses scaled with consistent, measurable results.' },
  { icon: <Clock size={24} />, title: 'Fast Turnaround', desc: 'Quick execution without compromising on quality or strategy.' },
];

const caseStudies = [
  { client: 'Singh Electronics', stat: '300%', metric: 'Traffic Increase', category: 'SEO', desc: 'From zero online presence to dominating local search results.' },
  { client: "Anita's Boutique", stat: '15K', metric: 'New Followers', category: 'Social Media', desc: 'Instagram growth that translated directly into sales.' },
  { client: "Kumar's Restaurant", stat: '180%', metric: 'Footfall Increase', category: 'Paid Ads', desc: 'Hyper-local ads driving consistent new customers daily.' },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        let start = 0;
        const step = target / 40;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 30);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <div ref={ref}>{count}{suffix}</div>;
}

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-shape hero-shape-1" />
          <div className="hero-shape hero-shape-2" />
          <div className="hero-shape hero-shape-3" />
        </div>
        <div className="container hero-content">
          <span className="section-label">🚀 #1 Digital Marketing Agency for Small Businesses</span>
          <h1>We <span className="gradient-text">Amplify</span> Your Brand,<br />You Focus on Business</h1>
          <p className="hero-sub">More customers. More sales. Less stress. We help small businesses and local shops skyrocket their growth with proven digital marketing strategies.</p>
          <div className="hero-btns">
            <Link href="/contact" className="btn btn-primary btn-lg">Get Free Consultation <ArrowRight size={20} /></Link>
            <Link href="/portfolio" className="btn btn-secondary btn-lg">See Our Work <ChevronRight size={20} /></Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-num"><Counter target={s.num} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What We Do</span>
            <h2 className="section-title">Services That <span className="gradient-text">Deliver Results</span></h2>
            <p className="section-subtitle">From SEO to branding, we offer everything your business needs to dominate the digital space.</p>
          </div>
          <div className="grid-3">
            {services.map((s, i) => (
              <div key={i} className="card service-card">
                <div className="service-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <Link href="/services" className="card-link">Learn More <ArrowRight size={16} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-alt reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Us</span>
            <h2 className="section-title">Why Choose <span className="gradient-text">Fluxify Media?</span></h2>
            <p className="section-subtitle">We{"'"}re not just another agency. We{"'"}re your growth partner.</p>
          </div>
          <div className="grid-4">
            {reasons.map((r, i) => (
              <div key={i} className="card reason-card">
                <div className="reason-icon">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="section reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Success Stories</span>
            <h2 className="section-title">Real Results for <span className="gradient-text">Real Businesses</span></h2>
          </div>
          <div className="grid-3">
            {caseStudies.map((cs, i) => (
              <div key={i} className="card case-card">
                <span className="badge badge-purple">{cs.category}</span>
                <div className="case-stat">{cs.stat}</div>
                <div className="case-metric">{cs.metric}</div>
                <h3>{cs.client}</h3>
                <p>{cs.desc}</p>
                <Link href="/case-studies" className="card-link">View Case Study <ArrowRight size={16} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos Marquee */}
      <section className="section section-alt reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Trusted By</span>
            <h2 className="section-title">Brands That <span className="gradient-text">Trust Us</span></h2>
          </div>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {['Singh Electronics','Anita\'s Boutique','Kumar\'s Restaurant','TechFix Solutions','GreenLeaf Organics','HomeFit Gym','Singh Electronics','Anita\'s Boutique','Kumar\'s Restaurant','TechFix Solutions','GreenLeaf Organics','HomeFit Gym'].map((name,i) => (
              <div key={i} className="marquee-item">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2>Ready to <span className="gradient-text">Grow?</span> Let{"'"}s Talk.</h2>
            <p>Get a free consultation and see how we can amplify your brand.</p>
            <Link href="/contact" className="btn btn-primary btn-lg">Get Free Consultation <ArrowRight size={20} /></Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .hero { position: relative; min-height: 100vh; display: flex; align-items: center; overflow: hidden; padding: 120px 0 80px; }
        .hero-bg { position: absolute; inset: 0; overflow: hidden; }
        .hero-shape { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; }
        .hero-shape-1 { width: 600px; height: 600px; background: var(--primary); top: -200px; right: -100px; animation: float 6s ease-in-out infinite; }
        .hero-shape-2 { width: 400px; height: 400px; background: var(--accent); bottom: -100px; left: -100px; animation: float 8s ease-in-out infinite reverse; }
        .hero-shape-3 { width: 300px; height: 300px; background: #00d4ff; top: 50%; left: 50%; animation: float 7s ease-in-out infinite; }
        .hero-content { position: relative; z-index: 1; max-width: 800px; }
        .hero-content h1 { margin: 20px 0; }
        .hero-sub { font-size: 1.2rem; color: var(--text-light); margin-bottom: 36px; max-width: 600px; line-height: 1.8; }
        .hero-btns { display: flex; gap: 16px; flex-wrap: wrap; }

        .stats-bar { background: var(--bg-dark); padding: 48px 0; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; text-align: center; }
        .stat-num { font-size: 2.5rem; font-weight: 900; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .stat-label { color: #aaa; font-size: 0.9rem; font-weight: 500; margin-top: 4px; }

        .service-icon { width: 56px; height: 56px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; color: white; }
        .service-card:nth-child(1) .service-icon { background: linear-gradient(135deg, #7B2FFF, #a855f7); }
        .service-card:nth-child(2) .service-icon { background: linear-gradient(135deg, #FF6B35, #f97316); }
        .service-card:nth-child(3) .service-icon { background: linear-gradient(135deg, #06b6d4, #0ea5e9); }
        .service-card:nth-child(4) .service-icon { background: linear-gradient(135deg, #10b981, #34d399); }
        .service-card:nth-child(5) .service-icon { background: linear-gradient(135deg, #f43f5e, #fb7185); }
        .service-card:nth-child(6) .service-icon { background: linear-gradient(135deg, #8b5cf6, #a78bfa); }
        .service-card h3 { font-size: 1.15rem; margin-bottom: 8px; }
        .service-card p { color: var(--text-light); font-size: 0.9rem; margin-bottom: 16px; }
        .card-link { display: inline-flex; align-items: center; gap: 6px; color: var(--primary); font-weight: 600; font-size: 0.9rem; transition: gap 0.2s; }
        .card-link:hover { gap: 10px; }

        .reason-card { text-align: center; }
        .reason-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(123,47,255,0.08); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .reason-card h3 { font-size: 1.05rem; margin-bottom: 8px; }
        .reason-card p { color: var(--text-light); font-size: 0.85rem; }

        .case-card { text-align: center; }
        .case-stat { font-size: 3rem; font-weight: 900; background: var(--gradient); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 16px 0 4px; }
        .case-metric { color: var(--text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px; }
        .case-card h3 { font-size: 1.1rem; margin-bottom: 8px; }
        .case-card p { color: var(--text-light); font-size: 0.9rem; margin-bottom: 16px; }

        .marquee-wrap { overflow: hidden; padding: 20px 0; }
        .marquee-track { display: flex; gap: 48px; animation: marquee 20s linear infinite; width: max-content; }
        .marquee-item { font-size: 1.3rem; font-weight: 700; color: var(--text-muted); white-space: nowrap; opacity: 0.5; }

        .cta-section { padding: 100px 0; }
        .cta-card { background: var(--bg-dark); border-radius: var(--radius); padding: 80px 48px; text-align: center; }
        .cta-card h2 { color: white; margin-bottom: 16px; }
        .cta-card p { color: #aaa; font-size: 1.1rem; margin-bottom: 32px; }

        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
          .stat-num { font-size: 2rem; }
          .hero { padding: 100px 0 60px; min-height: auto; }
          .cta-card { padding: 48px 24px; }
        }
      `}</style>
    </>
  );
}
