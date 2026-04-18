import prisma from '@/lib/prisma';
import Link from 'next/link';
import BlogTable from '@/components/admin/BlogTable';

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } });
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Blog Posts ({posts.length})</h2>
        <Link href="/admin/blog/new" className="btn btn-primary btn-sm">+ New Post</Link>
      </div>
      <BlogTable posts={JSON.parse(JSON.stringify(posts))} />
    </div>
  );
}
