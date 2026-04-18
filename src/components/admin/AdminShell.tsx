'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { LayoutDashboard, FileText, Star, Briefcase, BarChart2, Settings2, DollarSign, Users, Image, Inbox, Settings, LogOut, Menu, X, Zap } from 'lucide-react';

const links = [
  { href: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { href: '/admin/blog', icon: <FileText size={18} />, label: 'Blog Posts' },
  { href: '/admin/testimonials', icon: <Star size={18} />, label: 'Testimonials' },
  { href: '/admin/portfolio', icon: <Briefcase size={18} />, label: 'Portfolio' },
  { href: '/admin/case-studies', icon: <BarChart2 size={18} />, label: 'Case Studies' },
  { href: '/admin/services', icon: <Settings2 size={18} />, label: 'Services' },
  { href: '/admin/pricing', icon: <DollarSign size={18} />, label: 'Pricing' },
  { href: '/admin/team', icon: <Users size={18} />, label: 'Team' },
  { href: '/admin/logos', icon: <Image size={18} />, label: 'Client Logos' },
  { href: '/admin/leads', icon: <Inbox size={18} />, label: 'Leads Inbox' },
  { href: '/admin/settings', icon: <Settings size={18} />, label: 'Settings' },
];

export default function AdminShell({ children, userName }: { children: React.ReactNode; userName: string }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentPage = links.find(l => pathname === l.href || (l.href !== '/admin' && pathname.startsWith(l.href)))?.label || 'Dashboard';

  return (
    <div className="admin-shell">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo"><Zap size={22} /><span>Fluxify <span style={{ color: '#FF6B35' }}>Admin</span></span></div>
        <nav className="sidebar-nav">
          {links.map(l => (
            <Link key={l.href} href={l.href} className={`sidebar-link ${(pathname === l.href || (l.href !== '/admin' && pathname.startsWith(l.href))) ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}>
              {l.icon}<span>{l.label}</span>
            </Link>
          ))}
        </nav>
        <button className="sidebar-logout" onClick={() => signOut({ callbackUrl: '/admin/login' })}><LogOut size={18} /><span>Logout</span></button>
      </aside>
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}
      <div className="admin-main">
        <header className="admin-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <button className="mobile-menu" onClick={() => setSidebarOpen(true)}><Menu size={24} /></button>
            <h1>{currentPage}</h1>
          </div>
          <span className="admin-user">{userName}</span>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
