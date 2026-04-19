import prisma from '@/lib/prisma';
import PortfolioClient from './PortfolioClient';

export const metadata = {
  title: 'Our Work - Fluxify Media',
  description: 'Projects that speak results.',
};

export default async function PortfolioPage() {
  const projects = await prisma.portfolioItem.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category))).filter(Boolean)];

  return <PortfolioClient projects={projects} categories={categories as string[]} />;
}
