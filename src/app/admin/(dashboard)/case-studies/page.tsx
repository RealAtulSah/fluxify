import prisma from '@/lib/prisma';
import CaseStudiesManager from '@/components/admin/CaseStudiesManager';

export default async function AdminCaseStudiesPage() {
  const studies = await prisma.caseStudy.findMany({ orderBy: { createdAt: 'desc' } });
  
  // We need to stringify it properly since Prisma returns DateTime objects
  const serialized = studies.map(s => ({
    ...s,
    createdAt: s.createdAt.toISOString(),
    updatedAt: s.updatedAt.toISOString(),
  }));

  return <CaseStudiesManager studies={serialized as any} />;
}
