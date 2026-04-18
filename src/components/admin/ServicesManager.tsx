'use client';
import { useState } from 'react';
import { createService, updateService, deleteService, reorderServices } from '@/lib/actions';
import { GripVertical, Edit, Save, Trash2, Plus, X } from 'lucide-react';

type S = { id: string; title: string; icon: string; description: string | null; features: string[]; sortOrder: number };

export default function ServicesManager({ services: initial }: { services: S[] }) {
  const [services, setServices] = useState(initial);
  const [editing, setEditing] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState<Partial<S>>({});
  const [featuresText, setFeaturesText] = useState('');

  const startEdit = (s: S) => { setEditing(s.id); setForm(s); setFeaturesText(s.features.join('\n')); setIsAdding(false); };
  const startAdd = () => { setForm({ title: '', icon: '', description: '' }); setFeaturesText(''); setIsAdding(true); setEditing(null); };

  const saveEdit = async () => {
    const features = featuresText.split('\n').filter(Boolean);
    if (isAdding) {
      await createService({ title: form.title || 'New Service', icon: form.icon || '🚀', description: form.description || '', features, sortOrder: services.length });
    } else if (editing) {
      await updateService(editing, { title: form.title, icon: form.icon, description: form.description || '', features });
    }
    setIsAdding(false);
    setEditing(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
      setServices(services.filter(s => s.id !== id));
    }
  };

  const saveOrder = async () => {
    await reorderServices(services.map((s, i) => ({ id: s.id, sortOrder: i })));
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const arr = [...services]; [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; setServices(arr);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Services</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-secondary btn-sm" onClick={startAdd}><Plus size={16} /> Add Service</button>
          <button className="btn btn-primary btn-sm" onClick={saveOrder}><Save size={16} /> Save Order</button>
        </div>
      </div>
      <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        {services.map((s, i) => (
          <div key={s.id} style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => moveUp(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><GripVertical size={18} /></button>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, flex: 1 }}>{s.title}</span>
            <span style={{ fontSize: '0.8rem', color: '#888' }}>{s.icon}</span>
            <button onClick={() => startEdit(s)} style={{ padding: 6, borderRadius: 6, color: '#7B2FFF', background: '#7B2FFF10', border: 'none', cursor: 'pointer' }}><Edit size={16} /></button>
            <button onClick={() => handleDelete(s.id)} style={{ padding: 6, borderRadius: 6, color: '#ef4444', background: '#ef444410', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
      {(editing || isAdding) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} onClick={() => {setEditing(null); setIsAdding(false);}}>
          <div style={{ background: 'white', borderRadius: 12, padding: 32, maxWidth: 500, width: '100%' }} onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: 16 }}>{isAdding ? 'Add Service' : 'Edit Service'}</h3>
            <div className="input-group"><label>Title</label><input className="input" value={form.title || ''} onChange={e => setForm({...form, title: e.target.value})} /></div>
            <div className="input-group"><label>Icon</label><input className="input" value={form.icon || ''} onChange={e => setForm({...form, icon: e.target.value})} /></div>
            <div className="input-group"><label>Description</label><textarea className="textarea" value={form.description || ''} onChange={e => setForm({...form, description: e.target.value})} /></div>
            <div className="input-group"><label>Features (one per line)</label><textarea className="textarea" value={featuresText} onChange={e => setFeaturesText(e.target.value)} style={{ minHeight: 120 }} /></div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={saveEdit}>Save</button>
              <button className="btn btn-secondary btn-sm" onClick={() => {setEditing(null); setIsAdding(false);}}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
