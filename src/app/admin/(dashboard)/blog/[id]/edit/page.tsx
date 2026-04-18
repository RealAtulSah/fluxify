import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import BlogEditor from '@/components/admin/BlogEditor';

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 24 }}>Edit Blog Post</h2>
      <BlogEditor initial={JSON.parse(JSON.stringify(post))} />
    </div>
  );
}
