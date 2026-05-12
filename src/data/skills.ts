export interface Skill {
  icon: string;
  iconColor: string;
  name: string;
  description: string;
  tags: string[];
  proficiency: number;   // 0-100
}


export const skills: Skill[] = [
 {
  icon: '🛠️', iconColor: 'green', proficiency: 95,
  name: 'Backend Development',
  description: 'Building secure backend systems, REST APIs, authentication, CRUD operations, and scalable server-side applications.',
  tags: [
    'PHP',
    'Laravel',
    'Node.js',
    'Express.js',
    'REST APIs',
    'JWT Authentication',
    'CRUD Operations',
    'Multer',
    'API Integration',
    'Postman',
  ],
},

{
  icon: '⚡', iconColor: 'orange', proficiency: 92,
  name: 'Frontend Development',
  description: 'Creating responsive, modern, and user-friendly interfaces with clean UI design and smooth user experience.',
  tags: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'React.js',
    'Bootstrap',
    'Tailwind CSS',
    'SASS',
    'Responsive Design',
    'UI/UX',
    'Elementor',
  ],
},

{
  icon: '🗄️', iconColor: 'amber', proficiency: 88,
  name: 'Databases & Storage',
  description: 'Managing relational and NoSQL databases with optimized queries, secure storage, and scalable data structures.',
  tags: [
    'MySQL',
    'MongoDB',
    'Database Design',
    'MongoDB Schemas',
    'Query Optimization',
    'Data Management',
  ],
},

{
  icon: '☁️', iconColor: 'purple', proficiency: 75,
  name: 'Tools & Deployment',
  description: 'Using modern development tools, version control systems, deployment workflows, and performance optimization techniques.',
  tags: [
    'GitHub',
    'Git',
    'REST APIs',
    'Performance Optimization',
    'Website Optimization',
    'Deployment',
    'Linux',
  ],
},

{
  icon: '📱', iconColor: 'blue', proficiency: 70,
  name: 'WordPress Development',
  description: 'Custom WordPress website development with theme customization, plugin integration, WooCommerce, and SEO optimization.',
  tags: [
    'WordPress',
    'Elementor',
    'WooCommerce',
    'Theme Customization',
    'Plugin Development',
    'Hooks & Filters',
    'SEO Optimization',
  ],
},

{
  icon: '🎨', iconColor: 'pink', proficiency: 80,
  name: 'UI/UX & Web Design',
  description: 'Designing clean, responsive, and visually appealing website layouts focused on user experience and accessibility.',
  tags: [
    'UI Design',
    'UX Principles',
    'Responsive Layouts',
    'Modern Web Design',
    'Animations',
    'Portfolio Design',
    'Business Websites',
  ],
},



];
