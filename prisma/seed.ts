import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import * as bcrypt from 'bcryptjs';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('1234', 12);
  await prisma.user.upsert({
    where: { email: 'admin' },
    update: {},
    create: {
      email: 'admin',
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  });
  console.log('✅ Admin user created (email: admin, password: 1234)');

  // Seed services
  const services = [
    {
      title: 'Search Engine Optimization',
      icon: 'search',
      description: 'Dominate Google search results and drive organic traffic to your website. Our data-driven SEO strategies help you rank higher, get found by the right customers, and grow your business sustainably.',
      features: ['Keyword Research & Strategy', 'On-Page & Technical SEO', 'Link Building & Authority', 'Local SEO Optimization', 'Monthly Analytics Reports'],
      sortOrder: 0,
    },
    {
      title: 'Social Media Marketing',
      icon: 'share2',
      description: 'Build a powerful social media presence that converts followers into customers. We create scroll-stopping content, manage your communities, and run targeted campaigns across all platforms.',
      features: ['Content Calendar & Strategy', 'Community Management', 'Instagram & Facebook Growth', 'Social Media Analytics', 'Influencer Collaborations'],
      sortOrder: 1,
    },
    {
      title: 'Website Design & Development',
      icon: 'code',
      description: 'Get a stunning, fast-loading website that turns visitors into paying customers. We build modern, mobile-first websites that look incredible and perform even better.',
      features: ['Custom Website Design', 'Mobile Responsive Development', 'E-commerce Solutions', 'Landing Page Design', 'Website Maintenance & Support'],
      sortOrder: 2,
    },
    {
      title: 'Google & Meta Paid Ads',
      icon: 'target',
      description: 'Maximize your ROI with expertly managed paid advertising campaigns. We create, optimize, and scale your ads on Google, Facebook, and Instagram to deliver real results.',
      features: ['Google Ads Management', 'Facebook & Instagram Ads', 'Remarketing Campaigns', 'A/B Testing & Optimization', 'Detailed ROI Tracking'],
      sortOrder: 3,
    },
    {
      title: 'Content Creation',
      icon: 'pen-tool',
      description: 'Engage your audience with compelling content that tells your brand story. From blog posts to videos, we create content that educates, entertains, and converts.',
      features: ['Blog Writing & SEO Content', 'Video Production & Editing', 'Graphic Design & Infographics', 'Email Marketing Content', 'Brand Storytelling'],
      sortOrder: 4,
    },
    {
      title: 'Branding & Identity',
      icon: 'palette',
      description: 'Stand out from the crowd with a powerful brand identity. We create memorable logos, brand guidelines, and visual systems that make your business unforgettable.',
      features: ['Logo Design & Brand Mark', 'Brand Style Guide', 'Business Card & Stationery', 'Brand Strategy & Positioning', 'Visual Identity System'],
      sortOrder: 5,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.title.toLowerCase().replace(/\s+/g, '-').slice(0, 25) },
      update: { ...service, features: JSON.stringify(service.features) },
      create: { id: service.title.toLowerCase().replace(/\s+/g, '-').slice(0, 25), ...service, features: JSON.stringify(service.features) },
    });
  }
  console.log('✅ 6 services seeded');

  // Seed pricing plans
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '₹9,999/mo',
      features: [
        'Social Media Management (2 platforms)',
        'Basic SEO Optimization',
        '4 Blog Posts / Month',
        'Monthly Performance Report',
        'Email Support',
      ],
      popular: false,
      ctaLabel: 'Get Started',
      sortOrder: 0,
    },
    {
      id: 'growth',
      name: 'Growth',
      price: '₹24,999/mo',
      features: [
        'Social Media Management (4 platforms)',
        'Advanced SEO & Link Building',
        '8 Blog Posts / Month',
        'Google Ads Management',
        'Content Creation & Graphics',
        'Bi-Weekly Strategy Calls',
        'Priority Support',
      ],
      popular: true,
      ctaLabel: 'Scale Now',
      sortOrder: 1,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹49,999/mo',
      features: [
        'Full Social Media Management',
        'Complete SEO Suite',
        'Unlimited Blog Posts',
        'Google + Meta Ads Management',
        'Video Content Production',
        'Brand Strategy & Design',
        'Dedicated Account Manager',
        'Weekly Strategy Calls',
        '24/7 Priority Support',
      ],
      popular: false,
      ctaLabel: 'Go Pro',
      sortOrder: 2,
    },
  ];

  for (const plan of plans) {
    await prisma.pricingPlan.upsert({
      where: { id: plan.id },
      update: { ...plan, features: JSON.stringify(plan.features) },
      create: { ...plan, features: JSON.stringify(plan.features) },
    });
  }
  console.log('✅ 3 pricing plans seeded');

  // Seed site settings
  const settings = [
    { key: 'hero_headline', value: 'We Amplify Your Brand, You Focus on Business' },
    { key: 'hero_subheadline', value: 'More customers. More sales. Less stress. Fluxify Media helps small businesses dominate digital marketing.' },
    { key: 'tagline', value: 'We Amplify Your Brand, You Focus on Business' },
    { key: 'whatsapp_number', value: '+919999999999' },
    { key: 'office_address', value: '123 Digital Avenue, Sector 62, Noida, Uttar Pradesh 201301' },
    { key: 'contact_email', value: 'hello@fluxifymedia.com' },
    { key: 'contact_phone', value: '+91 98765 43210' },
    { key: 'instagram_url', value: 'https://instagram.com/fluxifymedia' },
    { key: 'facebook_url', value: 'https://facebook.com/fluxifymedia' },
    { key: 'linkedin_url', value: 'https://linkedin.com/company/fluxifymedia' },
    { key: 'twitter_url', value: 'https://twitter.com/fluxifymedia' },
    { key: 'meta_title', value: 'Fluxify Media — Digital Marketing Agency for Small Businesses' },
    { key: 'meta_description', value: 'Fluxify Media helps small businesses and local shops grow online with SEO, Social Media Marketing, Web Design, Paid Ads, Content Creation, and Branding.' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('✅ Site settings seeded');

  // Seed team members
  const teamMembers = [
    { name: 'Rahul Sharma', role: 'Founder & CEO', bio: 'Digital marketing veteran with 8+ years of experience helping businesses grow online.', sortOrder: 0 },
    { name: 'Priya Patel', role: 'Head of SEO', bio: 'SEO specialist who has helped 100+ businesses rank on Google\'s first page.', sortOrder: 1 },
    { name: 'Arjun Mehta', role: 'Creative Director', bio: 'Award-winning designer creating stunning brand identities and web experiences.', sortOrder: 2 },
    { name: 'Sneha Gupta', role: 'Social Media Manager', bio: 'Social media strategist who turns followers into loyal customers.', sortOrder: 3 },
  ];

  for (const member of teamMembers) {
    const id = member.name.toLowerCase().replace(/\s+/g, '-');
    await prisma.teamMember.upsert({
      where: { id },
      update: member,
      create: { id, ...member },
    });
  }
  console.log('✅ Team members seeded');

  // Seed sample testimonials
  const testimonials = [
    {
      name: 'Vikram Singh',
      business: 'Singh Electronics',
      role: 'Owner',
      rating: 5,
      review: 'Fluxify Media transformed our online presence completely! Our website traffic increased by 300% in just 3 months, and we\'re getting 5x more leads than before. Best investment we ever made for our business.',
      approved: true,
      featured: true,
    },
    {
      name: 'Anita Desai',
      business: 'Anita\'s Boutique',
      role: 'Founder',
      rating: 5,
      review: 'The social media strategy they created for our boutique was phenomenal. We went from 500 followers to 15,000 in just 4 months. Our online sales have skyrocketed and we couldn\'t be happier!',
      approved: true,
      featured: true,
    },
    {
      name: 'Rajesh Kumar',
      business: 'Kumar\'s Restaurant Chain',
      role: 'Managing Director',
      rating: 5,
      review: 'Working with Fluxify Media has been a game-changer for our restaurant chain. Their Google Ads campaigns bring us a consistent flow of new customers every single day. Highly recommended!',
      approved: true,
      featured: true,
    },
  ];

  for (const testimonial of testimonials) {
    await prisma.testimonial.create({ data: testimonial });
  }
  console.log('✅ Sample testimonials seeded');

  // Seed sample case studies
  const caseStudies = [
    {
      title: 'Singh Electronics: From Local Shop to E-commerce Leader',
      client: 'Singh Electronics',
      category: 'SEO',
      background: '<p>Singh Electronics, a family-owned electronics store in Delhi, wanted to expand beyond their local market and establish an online presence.</p>',
      challenge: '<p>The client had zero online visibility, no website, and was losing customers to online competitors. They needed a complete digital transformation.</p>',
      strategy: '<p>We built a modern e-commerce website, implemented a comprehensive SEO strategy targeting local and national keywords, and launched Google Shopping campaigns.</p>',
      results: '<p>Within 6 months, Singh Electronics saw a 300% increase in website traffic, 500% growth in online sales, and became the top-ranked electronics store in their region on Google.</p>',
      beforeStats: { 'Monthly Traffic': '200', 'Online Sales': '₹0', 'Google Ranking': 'Not ranked', 'Monthly Leads': '5' },
      afterStats: { 'Monthly Traffic': '8,500', 'Online Sales': '₹4,50,000', 'Google Ranking': 'Top 3', 'Monthly Leads': '150' },
      testimonialQuote: 'Fluxify Media didn\'t just build us a website — they built us an entire business channel.',
      published: true,
    },
    {
      title: 'Anita\'s Boutique: Social Media Success Story',
      client: 'Anita\'s Boutique',
      category: 'Social Media',
      background: '<p>Anita\'s Boutique is a premium fashion boutique in Mumbai looking to attract younger customers through social media marketing.</p>',
      challenge: '<p>Despite having beautiful products, the boutique struggled to reach their target audience online. Their social media had minimal engagement and no strategy.</p>',
      strategy: '<p>We created a vibrant Instagram-first strategy with professional product photography, influencer partnerships, and targeted ad campaigns focused on fashion-conscious women aged 18-35.</p>',
      results: '<p>In 4 months, we grew their Instagram following from 500 to 15,000, achieved a 12% engagement rate, and increased in-store visits by 200%.</p>',
      beforeStats: { 'Instagram Followers': '500', 'Engagement Rate': '1.2%', 'Monthly Revenue': '₹2,00,000', 'Online Orders': '10/month' },
      afterStats: { 'Instagram Followers': '15,000', 'Engagement Rate': '12%', 'Monthly Revenue': '₹8,50,000', 'Online Orders': '150/month' },
      testimonialQuote: 'Our social media went from dead to absolutely buzzing. The team at Fluxify truly gets our brand.',
      published: true,
    },
    {
      title: 'Kumar\'s Restaurant: Paid Ads Driving Footfall',
      client: 'Kumar\'s Restaurant Chain',
      category: 'Ads',
      background: '<p>Kumar\'s Restaurant Chain operates 5 locations across NCR and wanted to increase footfall during weekdays and promote new menu items.</p>',
      challenge: '<p>Weekday occupancy was below 40%, and new menu launches weren\'t getting enough traction. Traditional advertising wasn\'t delivering results.</p>',
      strategy: '<p>We launched hyper-local Google and Meta ad campaigns targeting food lovers within 5km of each location, with compelling offers for weekday dining and new menu highlights.</p>',
      results: '<p>Weekday footfall increased by 180%, cost per acquisition dropped by 65%, and new menu items saw 3x faster adoption compared to previous launches.</p>',
      beforeStats: { 'Weekday Occupancy': '40%', 'Cost Per Acquisition': '₹350', 'Monthly Ad Spend': '₹50,000', 'New Customers/Month': '80' },
      afterStats: { 'Weekday Occupancy': '85%', 'Cost Per Acquisition': '₹120', 'Monthly Ad Spend': '₹75,000', 'New Customers/Month': '400' },
      testimonialQuote: 'The ROI on our ad campaigns has been incredible. Every rupee spent brings back 5x in revenue.',
      published: true,
    },
  ];

  for (const cs of caseStudies) {
    await prisma.caseStudy.create({ data: { ...cs, beforeStats: JSON.stringify(cs.beforeStats), afterStats: JSON.stringify(cs.afterStats) } });
  }
  console.log('✅ Sample case studies seeded');

  // Seed sample portfolio projects
  const portfolioProjects = [
    { title: 'E-commerce Website Redesign', client: 'Singh Electronics', category: 'Web Design', resultStat: '300% traffic increase', published: true, description: '<p>Complete e-commerce website redesign with modern UI, fast checkout, and mobile optimization.</p>' },
    { title: 'Instagram Growth Campaign', client: 'Anita\'s Boutique', category: 'Social Media', resultStat: '15K followers in 4 months', published: true, description: '<p>Strategic Instagram growth campaign with professional content creation and influencer collaborations.</p>' },
    { title: 'Google Ads Campaign', client: 'Kumar\'s Restaurant', category: 'Ads', resultStat: '180% footfall increase', published: true, description: '<p>Hyper-local Google Ads campaigns driving consistent new customer acquisition.</p>' },
    { title: 'SEO Domination Strategy', client: 'TechFix Solutions', category: 'SEO', resultStat: '#1 ranking in 90 days', published: true, description: '<p>Comprehensive SEO strategy taking the client from page 5 to position 1 on Google.</p>' },
    { title: 'Brand Identity Design', client: 'GreenLeaf Organics', category: 'Web Design', resultStat: '250% brand recall improvement', published: true, description: '<p>Complete brand identity including logo, packaging, and digital assets.</p>' },
    { title: 'Facebook Lead Generation', client: 'HomeFit Gym', category: 'Ads', resultStat: '500+ leads/month', published: true, description: '<p>Lead generation campaign on Facebook and Instagram driving gym memberships.</p>' },
  ];

  for (const project of portfolioProjects) {
    await prisma.portfolioProject.create({ data: project });
  }
  console.log('✅ Sample portfolio projects seeded');

  // Seed sample blog posts
  const blogPosts = [
    {
      title: '10 SEO Strategies Every Small Business Needs in 2025',
      slug: '10-seo-strategies-small-business-2025',
      category: 'SEO Tips',
      tags: ['SEO', 'Small Business', 'Digital Marketing'],
      excerpt: 'Discover the top 10 SEO strategies that can help your small business rank higher on Google and drive more organic traffic in 2025.',
      content: '<h2>Why SEO Matters for Small Businesses</h2><p>In today\'s digital landscape, having a strong SEO strategy is no longer optional — it\'s essential for survival. Here are the top 10 strategies you need to implement right now.</p><h3>1. Optimize for Local Search</h3><p>Claim your Google Business Profile and ensure all your information is accurate and up-to-date.</p><h3>2. Focus on Long-tail Keywords</h3><p>Target specific, less competitive keywords that your ideal customers are actually searching for.</p><h3>3. Create Quality Content Regularly</h3><p>Publish helpful, informative content that addresses your customers\' pain points and questions.</p><h3>4. Optimize Page Speed</h3><p>A fast-loading website improves both user experience and search rankings.</p><h3>5. Build Quality Backlinks</h3><p>Earn links from reputable websites in your industry to boost your domain authority.</p>',
      published: true,
    },
    {
      title: 'How to Create a Winning Social Media Strategy',
      slug: 'winning-social-media-strategy',
      category: 'Social Media',
      tags: ['Social Media', 'Strategy', 'Instagram', 'Facebook'],
      excerpt: 'Learn how to build a social media strategy that actually works — from choosing the right platforms to creating content that converts.',
      content: '<h2>Building Your Social Media Empire</h2><p>Social media marketing is one of the most powerful tools available to small businesses today. But without a clear strategy, you\'re just posting into the void.</p><h3>Choose Your Platforms Wisely</h3><p>You don\'t need to be on every platform. Focus on where your target audience spends their time.</p><h3>Content is King, Consistency is Queen</h3><p>Post regularly, maintain a consistent brand voice, and always provide value to your audience.</p>',
      published: true,
    },
    {
      title: '5 Digital Marketing Trends to Watch in 2025',
      slug: '5-digital-marketing-trends-2025',
      category: 'Marketing Trends',
      tags: ['Trends', 'Digital Marketing', 'AI', '2025'],
      excerpt: 'Stay ahead of the competition by understanding these 5 game-changing digital marketing trends that are shaping 2025.',
      content: '<h2>The Future of Digital Marketing</h2><p>The digital marketing landscape is evolving faster than ever. Here are the trends you need to watch.</p><h3>1. AI-Powered Personalization</h3><p>Artificial intelligence is enabling hyper-personalized customer experiences at scale.</p><h3>2. Short-Form Video Dominance</h3><p>Reels, Shorts, and TikTok continue to dominate engagement across all demographics.</p><h3>3. Voice Search Optimization</h3><p>With smart speakers everywhere, optimizing for voice search is becoming crucial.</p>',
      published: true,
    },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: { ...post, tags: JSON.stringify(post.tags) } });
  }
  console.log('✅ Sample blog posts seeded');

  // Seed sample client logos
  const clientLogos = [
    { company: 'Singh Electronics', logoImage: '/logos/placeholder.svg', sortOrder: 0 },
    { company: 'Anita\'s Boutique', logoImage: '/logos/placeholder.svg', sortOrder: 1 },
    { company: 'Kumar\'s Restaurant', logoImage: '/logos/placeholder.svg', sortOrder: 2 },
    { company: 'TechFix Solutions', logoImage: '/logos/placeholder.svg', sortOrder: 3 },
    { company: 'GreenLeaf Organics', logoImage: '/logos/placeholder.svg', sortOrder: 4 },
    { company: 'HomeFit Gym', logoImage: '/logos/placeholder.svg', sortOrder: 5 },
  ];

  for (const logo of clientLogos) {
    await prisma.clientLogo.create({ data: logo });
  }
  console.log('✅ Client logos seeded');

  console.log('🎉 Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
