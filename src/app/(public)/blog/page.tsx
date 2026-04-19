import prisma from '@/lib/prisma';
import BlogClient from './BlogClient';

export const metadata = {
  title: 'Blog - Fluxify Media',
  description: 'Marketing Tips & Insights.',
};

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  const categories = ['All', ...Array.from(new Set(posts.map((p) => p.category))).filter(Boolean)];

  return <BlogClient posts={posts} categories={categories as string[]} />;
}
