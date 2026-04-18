'use client';
import { useState } from 'react';
import { createClientLogo, deleteClientLogo, reorderLogos } from '@/lib/actions';
import { Plus, Trash2, GripVertical, Save } from 'lucide-react';

type Logo = { id: string; company: string; logoImage: string; websiteUrl: string | null; sortOrder: number };

export default function LogosManager({ logos: initial }: { logos: Logo[] }) {
  const [logos, setLogos] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ company: '', logoImage: '', websiteUrl: '' });

  const handleAdd = async () => {
    await createClientLogo({ company: form.company, logoImage: form.logoImage || '/logos/placeholder.svg', websiteUrl: form.websiteUrl || undefined, sortOrder: logos.length });
    setForm({ company: '', logoImage: '', websiteUrl: '' });
    setShowForm(false);
  };

  const moveUp = (i: number) => { if (i === 0) return; const arr = [...logos]; [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; setLogos(arr); };
  const saveOrder = () => reorderLogos(logos.map((l, i) => ({ id: l.id, sortOrder: i })));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Client Logos ({logos.length})</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={saveOrder}><Save size={16} /> Save Order</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}><Plus size={16} /> Add Logo</button>
        </div>
      </div>
      {showForm && (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="grid-2">
            <div className="input-group"><label>Company Name</label><input className="input" value={form.company} onChange={e => setForm({...form, company: e.target.value})} /></div>
            <div className="input-group"><label>Website URL</label><input className="input" value={form.websiteUrl} onChange={e => setForm({...form, websiteUrl: e.target.value})} /></div>
          </div>
          <div className="input-group"><label>Logo Image URL</label><input className="input" value={form.logoImage} onChange={e => setForm({...form, logoImage: e.target.value})} placeholder="Upload to Cloudinary and paste URL" /></div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="grid-4">
        {logos.map((l, i) => (
          <div key={l.id} style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textAlign: 'center' }}>
            <div style={{ height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12, fontSize: '1.5rem', fontWeight: 800, color: '#7B2FFF20' }}>{l.company[0]}</div>
            <p style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: 8 }}>{l.company}</p>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              <button onClick={() => moveUp(i)} style={{ padding: 6, borderRadius: 6, background: '#f5f5f5', border: 'none', cursor: 'pointer', color: '#888' }}><GripVertical size={14} /></button>
              <button onClick={() => { if (confirm('Delete?')) deleteClientLogo(l.id); }} style={{ padding: 6, borderRadius: 6, color: '#ef4444', background: '#ef444410', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
