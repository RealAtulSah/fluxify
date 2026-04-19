import prisma from '@/lib/prisma';
import TestimonialsClient from './TestimonialsClient';

export const metadata = {
  title: 'Testimonials - Fluxify Media',
  description: 'Hear from the businesses we\'ve helped grow.',
};

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: 'desc' },
  });

  return <TestimonialsClient testimonials={testimonials} />;
}
