'use server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createBlogPost(data: { title: string; slug: string; category: string; tags: string[]; coverImage?: string; excerpt?: string; content: string; published: boolean }) {
  await prisma.blogPost.create({ data: { ...data, tags: JSON.stringify(data.tags) } });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

export async function updateBlogPost(id: string, data: { title: string; slug: string; category: string; tags: string[]; coverImage?: string; excerpt?: string; content: string; published: boolean }) {
  await prisma.blogPost.update({ where: { id }, data: { ...data, tags: JSON.stringify(data.tags) } });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

export async function deleteBlogPost(id: string) {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath('/admin/blog');
}

export async function toggleBlogPublished(id: string, published: boolean) {
  await prisma.blogPost.update({ where: { id }, data: { published } });
  revalidatePath('/admin/blog');
  revalidatePath('/blog');
}

// Testimonials
export async function createTestimonial(data: { name: string; business: string; role?: string; photo?: string; rating: number; review: string }) {
  await prisma.testimonial.create({ data });
  revalidatePath('/admin/testimonials');
}

export async function updateTestimonial(id: string, data: { name?: string; business?: string; role?: string; photo?: string; rating?: number; review?: string; approved?: boolean; featured?: boolean }) {
  await prisma.testimonial.update({ where: { id }, data });
  revalidatePath('/admin/testimonials');
  revalidatePath('/testimonials');
}

export async function deleteTestimonial(id: string) {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath('/admin/testimonials');
}

// Portfolio
export async function createPortfolioProject(data: { title: string; client: string; category: string; image?: string; resultStat?: string; description?: string; challenge?: string; solution?: string; published: boolean }) {
  await prisma.portfolioProject.create({ data });
  revalidatePath('/admin/portfolio');
}

export async function updatePortfolioProject(id: string, data: Record<string, unknown>) {
  await prisma.portfolioProject.update({ where: { id }, data });
  revalidatePath('/admin/portfolio');
  revalidatePath('/portfolio');
}

export async function deletePortfolioProject(id: string) {
  await prisma.portfolioProject.delete({ where: { id } });
  revalidatePath('/admin/portfolio');
}

// Case Studies
export async function createCaseStudy(data: Record<string, unknown>) {
  await prisma.caseStudy.create({ data: { ...data, beforeStats: data.beforeStats ? JSON.stringify(data.beforeStats) : undefined, afterStats: data.afterStats ? JSON.stringify(data.afterStats) : undefined } as any });
  revalidatePath('/admin/case-studies');
}

export async function updateCaseStudy(id: string, data: Record<string, unknown>) {
  await prisma.caseStudy.update({ where: { id }, data: { ...data, beforeStats: data.beforeStats ? JSON.stringify(data.beforeStats) : undefined, afterStats: data.afterStats ? JSON.stringify(data.afterStats) : undefined } as any });
  revalidatePath('/admin/case-studies');
  revalidatePath('/case-studies');
}

export async function deleteCaseStudy(id: string) {
  await prisma.caseStudy.delete({ where: { id } });
  revalidatePath('/admin/case-studies');
}

// Services
export async function createService(data: { title: string; icon: string; description?: string; features?: string[]; sortOrder: number }) {
  await prisma.service.create({ data: { ...data, features: data.features ? JSON.stringify(data.features) : '[]' } });
  revalidatePath('/admin/services');
  revalidatePath('/services');
}

export async function updateService(id: string, data: { title?: string; icon?: string; description?: string; features?: string[] }) {
  await prisma.service.update({ where: { id }, data: { ...data, features: data.features ? JSON.stringify(data.features) : undefined } });
  revalidatePath('/admin/services');
  revalidatePath('/services');
}

export async function deleteService(id: string) {
  await prisma.service.delete({ where: { id } });
  revalidatePath('/admin/services');
  revalidatePath('/services');
}

export async function reorderServices(items: { id: string; sortOrder: number }[]) {
  await Promise.all(items.map(i => prisma.service.update({ where: { id: i.id }, data: { sortOrder: i.sortOrder } })));
  revalidatePath('/admin/services');
}

// Pricing
export async function updatePricingPlan(id: string, data: { name?: string; price?: string; features?: string[]; popular?: boolean; ctaLabel?: string }) {
  await prisma.pricingPlan.update({ where: { id }, data: { ...data, features: data.features ? JSON.stringify(data.features) : undefined } });
  revalidatePath('/admin/pricing');
  revalidatePath('/services');
}

// Team
export async function createTeamMember(data: { name: string; role: string; bio?: string; photo?: string; linkedinUrl?: string; twitterUrl?: string; sortOrder: number }) {
  await prisma.teamMember.create({ data });
  revalidatePath('/admin/team');
}

export async function updateTeamMember(id: string, data: Record<string, unknown>) {
  await prisma.teamMember.update({ where: { id }, data });
  revalidatePath('/admin/team');
  revalidatePath('/about');
}

export async function deleteTeamMember(id: string) {
  await prisma.teamMember.delete({ where: { id } });
  revalidatePath('/admin/team');
}

export async function reorderTeamMembers(items: { id: string; sortOrder: number }[]) {
  await Promise.all(items.map(i => prisma.teamMember.update({ where: { id: i.id }, data: { sortOrder: i.sortOrder } })));
  revalidatePath('/admin/team');
}

// Logos
export async function createClientLogo(data: { company: string; logoImage: string; websiteUrl?: string; sortOrder: number }) {
  await prisma.clientLogo.create({ data });
  revalidatePath('/admin/logos');
}

export async function deleteClientLogo(id: string) {
  await prisma.clientLogo.delete({ where: { id } });
  revalidatePath('/admin/logos');
}

export async function reorderLogos(items: { id: string; sortOrder: number }[]) {
  await Promise.all(items.map(i => prisma.clientLogo.update({ where: { id: i.id }, data: { sortOrder: i.sortOrder } })));
  revalidatePath('/admin/logos');
}

// Leads
export async function updateLeadStatus(id: string, status: string) {
  await prisma.lead.update({ where: { id }, data: { status } });
  revalidatePath('/admin/leads');
}

export async function updateLeadNotes(id: string, internalNotes: string) {
  await prisma.lead.update({ where: { id }, data: { internalNotes } });
  revalidatePath('/admin/leads');
}

// Settings
export async function updateSiteSettings(settings: { key: string; value: string }[]) {
  await Promise.all(settings.map(s => prisma.siteSetting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s })));
  revalidatePath('/admin/settings');
}
