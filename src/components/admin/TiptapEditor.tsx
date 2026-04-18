'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TiptapLink from '@tiptap/extension-link';
import TiptapImage from '@tiptap/extension-image';
import { Bold, Italic, Heading1, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Quote, Code, Undo, Redo } from 'lucide-react';

export default function TiptapEditor({ content, onChange }: { content: string; onChange: (c: string) => void }) {
  const editor = useEditor({
    extensions: [StarterKit, TiptapLink.configure({ openOnClick: false }), TiptapImage],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) return <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>Loading editor...</div>;

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) editor.chain().focus().setLink({ href: url }).run();
  };

  const addImage = () => {
    const url = prompt('Enter image URL:');
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const btnStyle = (active: boolean) => ({
    padding: '6px 8px', border: 'none', borderRadius: 6, cursor: 'pointer',
    background: active ? '#7B2FFF20' : 'transparent', color: active ? '#7B2FFF' : '#555',
  });

  return (
    <div style={{ border: '1.5px solid #e8e8e8', borderRadius: 10, overflow: 'hidden', background: 'white' }}>
      <div style={{ display: 'flex', gap: 2, padding: '8px 12px', borderBottom: '1px solid #eee', flexWrap: 'wrap' }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()} style={btnStyle(editor.isActive('bold'))}><Bold size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} style={btnStyle(editor.isActive('italic'))}><Italic size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} style={btnStyle(editor.isActive('heading', { level: 1 }))}><Heading1 size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} style={btnStyle(editor.isActive('heading', { level: 2 }))}><Heading2 size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} style={btnStyle(editor.isActive('heading', { level: 3 }))}><Heading3 size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} style={btnStyle(editor.isActive('bulletList'))}><List size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} style={btnStyle(editor.isActive('orderedList'))}><ListOrdered size={16} /></button>
        <button onClick={addLink} style={btnStyle(editor.isActive('link'))}><LinkIcon size={16} /></button>
        <button onClick={addImage} style={btnStyle(false)}><ImageIcon size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()} style={btnStyle(editor.isActive('blockquote'))}><Quote size={16} /></button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} style={btnStyle(editor.isActive('codeBlock'))}><Code size={16} /></button>
        <div style={{ width: 1, background: '#eee', margin: '0 4px' }} />
        <button onClick={() => editor.chain().focus().undo().run()} style={btnStyle(false)}><Undo size={16} /></button>
        <button onClick={() => editor.chain().focus().redo().run()} style={btnStyle(false)}><Redo size={16} /></button>
      </div>
      <EditorContent editor={editor} style={{ padding: '16px 20px', minHeight: 300 }} />
    </div>
  );
}
