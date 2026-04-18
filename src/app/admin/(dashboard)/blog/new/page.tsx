import BlogEditor from '@/components/admin/BlogEditor';

export default function NewBlogPage() {
  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 24 }}>New Blog Post</h2>
      <BlogEditor />
    </div>
  );
}
