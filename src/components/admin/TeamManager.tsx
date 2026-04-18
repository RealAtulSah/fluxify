'use client';
import { useState } from 'react';
import { createTeamMember, updateTeamMember, deleteTeamMember, reorderTeamMembers } from '@/lib/actions';
import { Plus, Trash2, Edit, GripVertical, Save } from 'lucide-react';

type M = { id: string; name: string; role: string; bio: string | null; photo: string | null; linkedinUrl: string | null; twitterUrl: string | null; sortOrder: number };

export default function TeamManager({ members: initial }: { members: M[] }) {
  const [members, setMembers] = useState(initial);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', role: '', bio: '', linkedinUrl: '', twitterUrl: '' });

  const handleAdd = async () => {
    await createTeamMember({ ...form, sortOrder: members.length });
    setForm({ name: '', role: '', bio: '', linkedinUrl: '', twitterUrl: '' });
    setShowForm(false);
  };

  const moveUp = (i: number) => { if (i === 0) return; const arr = [...members]; [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; setMembers(arr); };
  const saveOrder = () => reorderTeamMembers(members.map((m, i) => ({ id: m.id, sortOrder: i })));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24, gap: 12, flexWrap: 'wrap' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Team ({members.length})</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-secondary btn-sm" onClick={saveOrder}><Save size={16} /> Save Order</button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}><Plus size={16} /> Add Member</button>
        </div>
      </div>
      {showForm && (
        <div style={{ background: 'white', borderRadius: 12, padding: 24, marginBottom: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div className="grid-2">
            <div className="input-group"><label>Name</label><input className="input" value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></div>
            <div className="input-group"><label>Role</label><input className="input" value={form.role} onChange={e => setForm({...form, role: e.target.value})} /></div>
          </div>
          <div className="input-group"><label>Bio</label><textarea className="textarea" value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} /></div>
          <div className="grid-2">
            <div className="input-group"><label>LinkedIn URL</label><input className="input" value={form.linkedinUrl} onChange={e => setForm({...form, linkedinUrl: e.target.value})} /></div>
            <div className="input-group"><label>Twitter URL</label><input className="input" value={form.twitterUrl} onChange={e => setForm({...form, twitterUrl: e.target.value})} /></div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className="btn btn-primary btn-sm" onClick={handleAdd}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        {members.map((m, i) => (
          <div key={m.id} style={{ padding: '16px 20px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <button onClick={() => moveUp(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><GripVertical size={18} /></button>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.8rem', flexShrink: 0 }}>{m.name.split(' ').map(n => n[0]).join('')}</div>
            <div style={{ flex: 1 }}><strong style={{ fontSize: '0.9rem' }}>{m.name}</strong><div style={{ fontSize: '0.8rem', color: '#888' }}>{m.role}</div></div>
            <button onClick={() => { if (confirm('Delete this member?')) deleteTeamMember(m.id); }} style={{ padding: 6, borderRadius: 6, color: '#ef4444', background: '#ef444410', border: 'none', cursor: 'pointer' }}><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
