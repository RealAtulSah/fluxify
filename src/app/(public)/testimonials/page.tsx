import prisma from '@/lib/prisma';
import TestimonialsClient from './TestimonialsClient';

export const metadata = {
  title: 'Testimonials - Fluxify Media',
  description: 'Hear from the businesses we\'ve helped grow.',
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { published: true },
    orderBy: { sortOrder: 'asc' },
  });

  return <TestimonialsClient testimonials={testimonials} />;
}
