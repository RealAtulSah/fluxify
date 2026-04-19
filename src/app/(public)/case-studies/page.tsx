import prisma from '@/lib/prisma';
import CaseStudiesClient from './CaseStudiesClient';

export const metadata = {
  title: 'Case Studies - Fluxify Media',
  description: 'Deep-dive into how we helped real businesses achieve extraordinary growth.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });

  return <CaseStudiesClient caseStudies={caseStudies} />;
}
