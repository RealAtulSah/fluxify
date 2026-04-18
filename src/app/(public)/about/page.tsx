'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { Rocket, Heart, Lightbulb, Shield, Users, Globe, ExternalLink, ArrowRight, Target, Zap, Eye } from 'lucide-react';

const values = [
  { icon: <Rocket size={24} />, title: 'Innovation First', desc: 'We stay ahead of trends to give you cutting-edge strategies.' },
  { icon: <Heart size={24} />, title: 'Client Obsessed', desc: 'Your success is our success. We treat every client like family.' },
  { icon: <Lightbulb size={24} />, title: 'Data-Driven', desc: 'Every decision backed by analytics, not guesswork.' },
  { icon: <Shield size={24} />, title: 'Transparency', desc: '100% transparency in reporting, pricing, and communication.' },
  { icon: <Users size={24} />, title: 'Collaboration', desc: 'We work with you, not just for you. True partnership.' },
  { icon: <Target size={24} />, title: 'Results Focused', desc: 'We measure success by your growth, not vanity metrics.' },
];

const team = [
  { name: 'Rahul Sharma', role: 'Founder & CEO', bio: '8+ years in digital marketing. Passionate about helping small businesses grow.' },
  { name: 'Priya Patel', role: 'Head of SEO', bio: 'Helped 100+ businesses rank on Google\'s first page.' },
  { name: 'Arjun Mehta', role: 'Creative Director', bio: 'Award-winning designer creating stunning brand experiences.' },
  { name: 'Sneha Gupta', role: 'Social Media Lead', bio: 'Turning followers into loyal customers since 2019.' },
];

const milestones = [
  { year: '2020', title: 'Founded', desc: 'Started with a vision to help small businesses go digital.' },
  { year: '2021', title: '50 Clients', desc: 'Crossed our first major milestone of 50 happy clients.' },
  { year: '2022', title: 'Team of 15', desc: 'Expanded our team with specialists in every domain.' },
  { year: '2023', title: '100+ Clients', desc: 'Doubled our client base with outstanding results.' },
  { year: '2024', title: 'Award Winning', desc: 'Recognized as a top digital marketing agency in NCR.' },
  { year: '2025', title: '150+ Clients', desc: 'Continuing to grow and deliver exceptional results.' },
];

export default function AboutPage() {
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
      <section className="about-hero">
        <div className="container">
          <span className="section-label">About Us</span>
          <h1>The Team Behind <span className="gradient-text">Your Growth</span></h1>
          <p className="hero-sub">We{"'"}re not a faceless corporation. We{"'"}re a passionate team of marketers, designers, and strategists who live and breathe digital marketing.</p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="section reveal">
        <div className="container">
          <div className="mv-grid">
            <div className="card mv-card">
              <div className="mv-icon"><Eye size={28} /></div>
              <h3>Our Vision</h3>
              <p>To become India{"'"}s most trusted digital marketing partner for small businesses, making world-class marketing accessible to every entrepreneur.</p>
            </div>
            <div className="card mv-card">
              <div className="mv-icon"><Zap size={28} /></div>
              <h3>Our Mission</h3>
              <p>To amplify small business brands through innovative, data-driven digital marketing strategies that deliver measurable results and sustainable growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section section-alt reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What We <span className="gradient-text">Stand For</span></h2>
          </div>
          <div className="grid-3">
            {values.map((v, i) => (
              <div key={i} className="card" style={{ textAlign: 'center' }}>
                <div className="value-icon">{v.icon}</div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Team</span>
            <h2 className="section-title">Meet the <span className="gradient-text">Experts</span></h2>
          </div>
          <div className="grid-4">
            {team.map((t, i) => (
              <div key={i} className="card team-card">
                <div className="team-avatar">{t.name.split(' ').map(n => n[0]).join('')}</div>
                <h3>{t.name}</h3>
                <span className="badge badge-purple">{t.role}</span>
                <p>{t.bio}</p>
                <div className="team-social">
                  <a href="#"><ExternalLink size={18} /></a>
                  <a href="#"><Globe size={18} /></a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-alt reveal">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Our Journey</span>
            <h2 className="section-title">Milestones & <span className="gradient-text">Growth</span></h2>
          </div>
          <div className="timeline">
            {milestones.map((m, i) => (
              <div key={i} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                <div className="timeline-dot" />
                <div className="card timeline-card">
                  <span className="badge badge-purple">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2>Ready to Work <span className="gradient-text">Together?</span></h2>
          <p style={{ color: 'var(--text-light)', marginBottom: 32, fontSize: '1.1rem' }}>Let{"'"}s discuss how we can help your business grow.</p>
          <Link href="/contact" className="btn btn-primary btn-lg">Get In Touch <ArrowRight size={20} /></Link>
        </div>
      </section>

      <style jsx>{`
        .about-hero { padding: 120px 0 80px; text-align: center; background: var(--bg-alt); }
        .about-hero h1 { margin: 16px 0; }
        .hero-sub { max-width: 600px; margin: 0 auto; color: var(--text-light); font-size: 1.15rem; }
        .mv-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
        .mv-card { text-align: center; padding: 48px 32px; }
        .mv-icon { width: 56px; height: 56px; border-radius: 14px; background: rgba(123,47,255,0.08); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .mv-card h3 { margin-bottom: 12px; }
        .mv-card p { color: var(--text-light); }
        .value-icon { width: 48px; height: 48px; border-radius: 12px; background: rgba(123,47,255,0.08); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
        .team-card { text-align: center; padding: 36px 24px; }
        .team-avatar { width: 72px; height: 72px; border-radius: 50%; background: var(--gradient); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.2rem; margin: 0 auto 16px; }
        .team-card h3 { font-size: 1.05rem; margin-bottom: 8px; }
        .team-card .badge { margin-bottom: 12px; }
        .team-card p { font-size: 0.85rem; color: var(--text-light); margin-bottom: 16px; }
        .team-social { display: flex; gap: 10px; justify-content: center; }
        .team-social a { width: 36px; height: 36px; border-radius: 50%; background: var(--bg-alt); display: flex; align-items: center; justify-content: center; color: var(--text-muted); transition: all 0.2s; }
        .team-social a:hover { background: var(--primary); color: white; }
        .timeline { position: relative; padding: 20px 0; max-width: 700px; margin: 0 auto; }
        .timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; background: var(--border); transform: translateX(-50%); }
        .timeline-item { position: relative; margin-bottom: 32px; display: flex; }
        .timeline-item.left { justify-content: flex-start; padding-right: 52%; }
        .timeline-item.right { justify-content: flex-end; padding-left: 52%; }
        .timeline-dot { position: absolute; left: 50%; top: 20px; width: 16px; height: 16px; border-radius: 50%; background: var(--gradient); transform: translateX(-50%); z-index: 1; }
        .timeline-card { padding: 20px; }
        .timeline-card h3 { font-size: 1rem; margin: 8px 0 4px; }
        .timeline-card p { font-size: 0.85rem; color: var(--text-light); }
        @media (max-width: 640px) {
          .mv-grid { grid-template-columns: 1fr; }
          .timeline::before { left: 20px; }
          .timeline-item.left, .timeline-item.right { padding-left: 48px; padding-right: 0; justify-content: flex-start; }
          .timeline-dot { left: 20px; }
        }
      `}</style>
    </>
  );
}
