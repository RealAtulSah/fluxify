'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost, updateBlogPost } from '@/lib/actions';
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('@/components/admin/TiptapEditor'), { ssr: false });

type PostData = { id?: string; title: string; slug: string; category: string; tags: string[]; coverImage: string; excerpt: string; content: string; published: boolean };

export default function BlogEditor({ initial }: { initial?: PostData }) {
  const router = useRouter();
  const [form, setForm] = useState<PostData>(initial || { title: '', slug: '', category: 'SEO Tips', tags: [], coverImage: '', excerpt: '', content: '', published: false });
  const [tagsInput, setTagsInput] = useState(initial?.tags?.join(', ') || '');
  const [saving, setSaving] = useState(false);

  const generateSlug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    const data = { ...form, tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean), published: publish ?? form.published };
    try {
      if (initial?.id) await updateBlogPost(initial.id, data);
      else await createBlogPost(data);
      router.push('/admin/blog');
    } catch (e) { console.error(e); }
    setSaving(false);
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <div className="input-group">
        <label>Title</label>
        <input className="input" value={form.title} onChange={e => { setForm({ ...form, title: e.target.value, slug: initial?.id ? form.slug : generateSlug(e.target.value) }); }} placeholder="Post title" />
      </div>
      <div className="input-group">
        <label>Slug</label>
        <input className="input" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} />
      </div>
      <div className="grid-2">
        <div className="input-group">
          <label>Category</label>
          <select className="select" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
            <option>SEO Tips</option><option>Social Media</option><option>Marketing Trends</option><option>Business Growth</option>
          </select>
        </div>
        <div className="input-group">
          <label>Tags (comma-separated)</label>
          <input className="input" value={tagsInput} onChange={e => setTagsInput(e.target.value)} placeholder="SEO, Marketing, Tips" />
        </div>
      </div>
      <div className="input-group">
        <label>Cover Image URL</label>
        <input className="input" value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} placeholder="https://..." />
      </div>
      <div className="input-group">
        <label>Excerpt <span style={{ color: '#888', fontSize: '0.8rem' }}>({form.excerpt.length}/200)</span></label>
        <textarea className="textarea" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value.slice(0, 200) })} maxLength={200} style={{ minHeight: 80 }} placeholder="Brief summary of the post..." />
      </div>
      <div className="input-group">
        <label>Content</label>
        <TiptapEditor content={form.content} onChange={c => setForm({ ...form, content: c })} />
      </div>
      <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
        <button className="btn btn-secondary" onClick={() => handleSave(false)} disabled={saving}>{saving ? 'Saving...' : 'Save Draft'}</button>
        <button className="btn btn-primary" onClick={() => handleSave(true)} disabled={saving}>{saving ? 'Publishing...' : 'Publish'}</button>
        {initial?.id && <a href={`/blog/${form.slug}`} target="_blank" className="btn btn-secondary">Preview</a>}
      </div>
    </div>
  );
}
