import { faviconUrl } from '../utils/timelineLogo';

export interface TimelineItem {
  id: string;
  type: 'work' | 'education';
  role: string;
  org: string;
  period: string;
  location: string;
  desc: string;
  tags: string[];
  /** Company / school icon (URL). If missing or broken, initials are shown. */
  logo?: string;
}

export const timelineItems: TimelineItem[] = [
  {
  id: 'w1',
  type: 'work',
  role: 'Full Stack Developer Intern',
  org: 'Apexcify Technologies',
  period: '2025',
  location: 'Karachi, Pakistan',
  desc: 'Developed full-stack web applications using Laravel, PHP, JavaScript, HTML, CSS, and Bootstrap with responsive frontend and backend API integration.',
  tags: ['Laravel', 'PHP', 'JavaScript', 'Bootstrap', 'REST APIs', 'Responsive Design'],
  logo: '/logos/apexcify.png',
},

{
  id: 'w2',
  type: 'work',
  role: 'Backend Developer Intern',
  org: 'Syntecxhub',
  period: '2025',
  location: 'Karachi, Pakistan',
  desc: 'Built RESTful APIs using Node.js and Express.js with JWT authentication, MongoDB integration, middleware-secured routes, and API testing.',
  tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs', 'Postman'],
  logo: '/logos/syntecxhub.png',
},

{
  id: 'p1',
  type: 'project',
  role: 'Inventory Management System',
  org: 'Personal Project',
  period: '2025',
  location: 'Pakistan',
  desc: 'Developed a stock management system with product CRUD operations, inventory tracking, and admin management features using PHP and MySQL.',
  tags: ['PHP', 'MySQL', 'CRUD', 'Admin Panel'],
  logo: '/logos/project.png',
},

{
  id: 'p2',
  type: 'project',
  role: 'Social Media Web Application',
  org: 'Personal Project',
  period: '2025',
  location: 'Pakistan',
  desc: 'Built a MERN stack social media application with authentication, posts, likes, comments, and RESTful API integration.',
  tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
  logo: '/logos/project.png',
},

{
  id: 'p3',
  type: 'project',
  role: 'E-Commerce Website',
  org: 'Personal Project',
  period: '2025',
  location: 'Pakistan',
  desc: 'Created a full-stack e-commerce platform with product listings, shopping cart, checkout system, admin panel, and secure backend APIs.',
  tags: ['MERN Stack', 'E-Commerce', 'REST APIs', 'MongoDB'],
  logo: '/logos/project.png',
},

{
  id: 'e1',
  type: 'education',
  role: 'Bachelor of Computer Science',
  org: 'Virtual University of Pakistan',
  period: '2021 — 2025',
  location: 'Pakistan',
  desc: 'Completed undergraduate studies focused on computer science, software development, web technologies, and programming fundamentals.',
  tags: ['Computer Science', 'Software Development', 'Web Technologies'],
  logo: '/logos/vu.png',
},

{
  id: 'e2',
  type: 'education',
  role: 'Intermediate',
  org: 'Degree Girls College',
  period: '2020',
  location: 'Pakistan',
  desc: 'Completed intermediate education with focus on academic and computer-related studies.',
  tags: ['Intermediate', 'Education'],
  logo: '/logos/college.png',
},
];

export interface TechStackEntry {
  name: string;
  icon: string;
  color: string;
  category: string;
  /** Official project / docs homepage */
  website: string;
}

export const techStack: TechStackEntry[] = [
  /* ── Backend ── */
  { name: 'PHP',        icon: 'php',         color: '#777BB4', category: 'Backend',  website: 'https://www.php.net/' },
  { name: 'Laravel',    icon: 'laravel',     color: '#FF2D20', category: 'Backend',  website: 'https://laravel.com/' },
  // { name: 'Magento 2',  icon: 'magento',     color: '#EE672F', category: 'Backend',  website: 'https://magento.com/' },
  { name: 'Node.js',    icon: 'nodedotjs',   color: '#5FA04E', category: 'Backend',  website: 'https://nodejs.org/' },
  { name: 'Express',    icon: 'express',     color: '#000000', category: 'Backend',  website: 'https://expressjs.com/' },
  // { name: 'NestJS',     icon: 'nestjs',      color: '#E0234E', category: 'Backend',  website: 'https://nestjs.com/' },
  // { name: 'GraphQL',    icon: 'graphql',     color: '#E10098', category: 'Backend',  website: 'https://graphql.org/' },
  // { name: 'Stripe',     icon: 'stripe',      color: '#635BFF', category: 'Backend',  website: 'https://stripe.com/' },

  /* ── Frontend ── */
  { name: 'React',      icon: 'react',       color: '#61DAFB', category: 'Frontend', website: 'https://react.dev/' },
  // { name: 'Next.js',    icon: 'nextdotjs',   color: '#ffffff', category: 'Frontend', website: 'https://nextjs.org/' },
  // { name: 'TypeScript', icon: 'typescript',  color: '#3178C6', category: 'Language', website: 'https://www.typescriptlang.org/' },
  { name: 'JavaScript', icon: 'javascript',  color: '#F7DF1E', category: 'Language', website: 'https://developer.mozilla.org/docs/Web/JavaScript' },
  { name: 'HTML',       icon: 'html5',       color: '#E34F26', category: 'Frontend', website: 'https://developer.mozilla.org/docs/Web/HTML' },
  { name: 'CSS',        icon: 'css3',        color: '#1572B6', category: 'Frontend', website: 'https://developer.mozilla.org/docs/Web/CSS' },
  { name: 'Tailwind',   icon: 'tailwindcss', color: '#06B6D4', category: 'Frontend', website: 'https://tailwindcss.com/' },
  // { name: 'Framer Motion', icon: 'framer', color: '#0055FF', category: 'Frontend', website: 'https://motion.dev/' },
  { name: 'jQuery',     icon: 'jquery',      color: '#0769AD', category: 'Frontend', website: 'https://jquery.com/' },

  /* ── Database ── */
  { name: 'MySQL',      icon: 'mysql',       color: '#4479A1', category: 'Database', website: 'https://www.mysql.com/' },
  { name: 'Mongodb', icon: 'mongodb',  color: '#4169E1', category: 'Database', website: 'https://www.mongodb.com/' },
  // { name: 'Redis',      icon: 'redis',       color: '#FF4438', category: 'Database', website: 'https://redis.io/' },
  // { name: 'Prisma',     icon: 'prisma',      color: '#2D3748', category: 'Database', website: 'https://www.prisma.io/' },
  // { name: 'Supabase',   icon: 'supabase',    color: '#3FCF8E', category: 'Database', website: 'https://supabase.com/' },

  /* ── DevOps & Cloud ── */
  // { name: 'Docker',     icon: 'docker',      color: '#2496ED', category: 'DevOps',   website: 'https://www.docker.com/' },
  { name: 'Git',        icon: 'git',         color: '#F05032', category: 'DevOps',   website: 'https://git-scm.com/' },
  // { name: 'Linux',      icon: 'linux',       color: '#FCC624', category: 'DevOps',   website: 'https://www.linux.org/' },
  // { name: 'Nginx',      icon: 'nginx',       color: '#009639', category: 'DevOps',   website: 'https://nginx.org/' },
  // { name: 'AWS',        icon: 'amazonaws',   color: '#FF9900', category: 'Cloud',    website: 'https://aws.amazon.com/' },
  // { name: 'Vercel',     icon: 'vercel',      color: '#ffffff', category: 'Cloud',    website: 'https://vercel.com/' },

  /* ── Tooling & Mobile ── */
  { name: 'Vite',       icon: 'vite',        color: '#646CFF', category: 'Tooling',  website: 'https://vite.dev/' },
  // { name: 'Expo',       icon: 'expo',        color: '#000020', category: 'Mobile',   website: 'https://expo.dev/' },
];
