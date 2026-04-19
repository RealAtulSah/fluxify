import prisma from '@/lib/prisma';
import PortfolioClient from './PortfolioClient';

export const metadata = {
  title: 'Our Work - Fluxify Media',
  description: 'Projects that speak results.',
};

export default async function PortfolioPage() {
  const projects = await prisma.portfolioProject.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category))).filter(Boolean)];

  return <PortfolioClient projects={projects} categories={categories as string[]} />;
}
