export interface Testimonial {
  text: string;
  initials: string;
  avatarVariant: string;
  name: string;
  role: string;
  /** Local path under `public/testimonials` */
  photo?: string;
}

export const testimonials: Testimonial[] = [
  {
    text: "I have had the privilege of working alongside Ubaid at Cooperative Computing on different projects. He is an exceptional software developer, consistently demonstrating expertise in different programming languages and frameworks. His problem-solving skills and ability to deliver efficient, clean code are impressive.\n\nUbaid has been instrumental in migrating legacy systems and developing high-impact features. His collaboration and proactive attitude make him a valuable asset to any team.\n\nOne of his standout qualities is his ability to learn and adapt to new tools quickly. I am confident that Ubaid would thrive in any challenging environment.\n\nI highly recommend Ubaid as a software developer.",
    initials: 'MA',
    avatarVariant: 'av1',
    name: 'Muhammad Aaqib Mumtaz',
    role: 'DevOps Engineering · Cyber Security',
    photo: '/testimonials/muhammad-aaqib-mumtaz.jpg',
  },
  {
    text: "I had the pleasure of working with Ubaid Nawab, who joined our team as a junior developer. From the very beginning, Ubaid demonstrated a remarkable eagerness to learn and grow. Over his tenure with our company, he mastered multiple programming languages and quickly adapted to various technologies, showing a level of dedication that is truly commendable.\n\nUbaid's ability to handle pressure and stay focused on targets is one of his strongest attributes. He consistently approached every task calmly and composedly, even in challenging situations. His quick learning abilities and commitment to deepening his understanding of complex topics ensured that he always delivered high-quality work.\n\nI highly recommend Ubaid for any role that requires technical expertise, a strong work ethic, and a positive attitude.",
    initials: 'FA',
    avatarVariant: 'av2',
    name: 'Farhan Ahmed',
    role: 'Engineering Manager · Full-Stack · System Architecture',
    photo: '/testimonials/farhan-ahmed.jpg',
  },
  {
    text: "I had an opportunity to work together with Ubaid and during the project from start to delivery I found him knowledgeable and professional for his expertise in software development. I'm sure he'd add high value wherever he'll be serving in the industry. I wish him great luck ahead for his future endeavors.",
    initials: 'KS',
    avatarVariant: 'av3',
    name: 'Kashif Ahmed Saeed',
    role: 'Business Optimization · CloudSec · Digitalization',
    photo: '/testimonials/kashif-ahmed-saeed.jpg',
  },
  {
    text: "I had the pleasure of working with Ubaid Nawab, and I can confidently say he is an exceptional software engineer. Ubaid consistently demonstrates a deep understanding of software development principles and excels in creating innovative solutions to complex problems. His technical skills are matched by his ability to collaborate effectively with teams, ensuring that projects are delivered on time and to the highest standard.\n\nUbaid's dedication, problem-solving abilities, and proactive approach make him a valuable asset to any organization. I highly recommend him for any role that demands expertise, reliability, and a passion for software engineering.",
    initials: 'MI',
    avatarVariant: 'av4',
    name: 'Muhammad Inshal',
    role: 'Software Engineer · Arpatech',
    photo: '/testimonials/muhammad-inshal.jpg',
  },
  {
    text: "I'm pleased to recommend Ubaid Nawab, who has consistently demonstrated exceptional skills and dedication as a software engineer. Ubaid possesses a deep understanding of software development principles and excels in designing, coding, and implementing robust solutions. It's been close to a decade since I know Ubaid in person and he's such a calm and great personality. I think he can be a good addition to any tech team or organisation that truly believes in growth.",
    initials: 'WA',
    avatarVariant: 'av5',
    name: 'Waqas Ali',
    role: 'Senior Software Engineer · MIM Riyadh',
    photo: '/testimonials/waqas-ali.jpg',
  },
];
