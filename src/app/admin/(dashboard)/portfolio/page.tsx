import prisma from '@/lib/prisma';
import PortfolioManager from '@/components/admin/PortfolioManager';

export default async function AdminPortfolioPage() {
  const projects = await prisma.portfolioProject.findMany({ orderBy: { createdAt: 'desc' } });
  return <PortfolioManager projects={JSON.parse(JSON.stringify(projects))} />;
}
