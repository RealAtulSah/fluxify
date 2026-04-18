import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, Tag } from 'lucide-react';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.blogPost.findUnique({ where: { slug, published: true } });
  if (!post) notFound();

  return (
    <>
      <article style={{ maxWidth: 760, margin: '0 auto', padding: '120px 24px 80px' }}>
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginBottom: 24 }}>
          <ArrowLeft size={16} /> Back to Blog
        </Link>
        <span className="badge badge-purple" style={{ display: 'inline-block', marginBottom: 12 }}>{post.category}</span>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 16 }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: 16, color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 40 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={14} />{post.createdAt.toLocaleDateString()}</span>
          {post.tags && JSON.parse(post.tags).length > 0 && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Tag size={14} />{JSON.parse(post.tags).join(', ')}</span>}
        </div>
        {post.excerpt && <p style={{ fontSize: '1.15rem', color: 'var(--text-light)', lineHeight: 1.8, marginBottom: 32, borderLeft: '3px solid var(--primary)', paddingLeft: 20 }}>{post.excerpt}</p>}
        <div className="blog-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <style>{`
        .blog-content { line-height: 1.8; color: var(--text); }
        .blog-content h2 { font-size: 1.75rem; margin: 40px 0 16px; }
        .blog-content h3 { font-size: 1.3rem; margin: 32px 0 12px; }
        .blog-content p { margin-bottom: 16px; color: var(--text-light); }
        .blog-content ul, .blog-content ol { margin: 16px 0; padding-left: 24px; }
        .blog-content li { margin-bottom: 8px; color: var(--text-light); }
        .blog-content blockquote { border-left: 3px solid var(--primary); padding: 16px 20px; margin: 24px 0; background: var(--bg-alt); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; font-style: italic; }
        .blog-content a { color: var(--primary); text-decoration: underline; }
        .blog-content img { border-radius: var(--radius-sm); margin: 24px 0; }
      `}</style>
    </>
  );
}
