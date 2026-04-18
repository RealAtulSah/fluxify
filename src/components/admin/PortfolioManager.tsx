'use client';
import { useState } from 'react';
import { createPortfolioProject, updatePortfolioProject, deletePortfolioProject } from '@/lib/actions';
import { Plus, Trash2, Edit, Eye, EyeOff } from 'lucide-react';

type P = { id: string; title: string; client: string; category: string; image: string | null; resultStat: string | null; published: boolean };

export default function PortfolioManager({ projects }: { projects: P[] }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', client: '', category: 'Web Design', image: '', resultStat: '', description: '', challenge: '', solution: '', published: false });

  const handleAdd = async () => {
    await createPortfolioProject(form);
    setForm({ title: '', client: '', category: 'Web Design', image: '', resultStat: '', description: '', challenge: '', solution: '', published: false });
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Portfolio ({projects.length})</h2>
        <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}><Plus size={16} /> Add Project</button>
      </div>
      {showForm && (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="grid-2">
            <div className="input-group"><label>Title</label><input className="input" value={form.title} onChange={e => setForm({...form, title: e.target.value})} /></div>
            <div className="input-group"><label>Client</label><input className="input" value={form.client} onChange={e => setForm({...form, client: e.target.value})} /></div>
          </div>
          <div className="grid-2">
            <div className="input-group"><label>Category</label><select className="select" value={form.category} onChange={e => setForm({...form, category: e.target.value})}><option>Web Design</option><option>SEO</option><option>Social Media</option><option>Ads</option></select></div>
            <div className="input-group"><label>Result Stat</label><input className="input" value={form.resultStat} onChange={e => setForm({...form, resultStat: e.target.value})} placeholder="e.g. 300% traffic increase" /></div>
          </div>
          <div className="input-group"><label>Description</label><textarea className="textarea" value={form.description} onChange={e => setForm({...form, description: e.target.value})} /></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="grid-3">
        {projects.map(p => (
          <div key={p.id} style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <div style={{ height: 120, borderRadius: 8, background: 'linear-gradient(135deg, #7B2FFF10, #FF6B3510)', marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 900, color: '#7B2FFF20' }}>{p.title[0]}</div>
            <span className="badge badge-purple">{p.category}</span>
            <h3 style={{ fontSize: '0.95rem', margin: '8px 0 4px' }}>{p.title}</h3>
            <p style={{ fontSize: '0.8rem', color: '#888' }}>{p.client}</p>
            {p.resultStat && <p style={{ fontSize: '0.8rem', color: '#7B2FFF', fontWeight: 600, marginTop: 4 }}>{p.resultStat}</p>}
            <div style={{ display: 'flex', gap: 6, marginTop: 12 }}>
              <button onClick={() => updatePortfolioProject(p.id, { published: !p.published })} style={{ padding: 6, borderRadius: 6, border: 'none', cursor: 'pointer', color: p.published ? '#10b981' : '#888', background: p.published ? '#10b98110' : '#8880f' }}>{p.published ? <Eye size={16} /> : <EyeOff size={16} />}</button>
              <button onClick={() => { if (confirm('Delete?')) deletePortfolioProject(p.id); }} style={{ padding: 6, borderRadius: 6, color: '#ef4444', background: '#ef444410', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
