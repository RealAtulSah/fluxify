'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, KeyRound } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await signIn('credentials', { email, password, redirect: false });
      if (res?.error) setError('Invalid credentials');
      else router.push('/admin');
    } catch { setError('Login failed'); }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon"><Lock size={28} /></div>
        <h1>Fluxify Admin</h1>
        <p>Sign in to manage your website</p>
        {error && <div className="login-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="input-group"><label>Email</label><div className="input-icon"><Mail size={18} /><input className="input" type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin" required /></div></div>
          <div className="input-group"><label>Password</label><div className="input-icon"><KeyRound size={18} /><input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••" required /></div></div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', marginTop: 8 }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
      <style jsx>{`
        .login-page { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: #f1f1f1; padding: 24px; }
        .login-card { background: white; border-radius: var(--radius); padding: 48px 40px; max-width: 420px; width: 100%; box-shadow: var(--shadow-lg); text-align: center; }
        .login-icon { width: 64px; height: 64px; border-radius: 50%; background: rgba(123,47,255,0.08); color: var(--primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
        .login-card h1 { font-size: 1.5rem; margin-bottom: 4px; }
        .login-card > p { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 24px; }
        .login-error { background: rgba(239,68,68,0.08); color: #ef4444; padding: 10px 16px; border-radius: var(--radius-sm); font-size: 0.85rem; margin-bottom: 16px; }
        .input-icon { position: relative; }
        .input-icon svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: var(--text-muted); }
        .input-icon .input { padding-left: 42px; }
      `}</style>
    </div>
  );
}
