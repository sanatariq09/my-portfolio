export interface CaseStudy {
  problem: string;
  solution: string;
  results: string[];
  role: string;
  duration: string;
  screenshots: Screenshot[];
}

export interface Screenshot {
  label: string;
  // src: string  ← replace with a real URL when you have screenshots
  // Using gradient placeholders until real images are added
  gradient: string;
}

export interface Project {
  label: string;
  thumbVariant: string;
  name: string;
  description: string;
  tags: string[];
  linkLabel: string;
  href: string;
  // ── NEW: media fields ──────────────────────────────────
  image?: string;   // /projects/project1.jpg  OR  https://…
  video?: string;   // /projects/project1.mp4  OR  https://youtube.com/embed/…
  // ──────────────────────────────────────────────────────
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    label: 'WEB APP',
    thumbVariant: 'pt1',
    name: 'Inventory Management System',
    description: 'Stock management web application with product CRUD operations, inventory tracking, and admin dashboard functionality.',
    tags: ['PHP', 'MySQL', 'CRUD', 'Admin Panel'],
    linkLabel: 'Project ↗️',
    href: '#',
    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/inventory.jpg',
    video: '/projects/inventory.mp4',
    // ──────────────────────────────────────────────────────
    caseStudy: {
      role: 'Full-Stack Developer',
      duration: 'Personal Project',
      problem: 'Businesses needed a simple system to manage stock records, product inventory, and admin operations efficiently.',
      solution: 'Developed a complete inventory management system using PHP and MySQL with CRUD operations, stock tracking, and responsive admin panels.',
      results: [
        'Implemented product and inventory management features',
        'Built responsive admin dashboard',
        'Enabled secure CRUD operations',
        'Improved stock tracking workflow',
      ],
      screenshots: [
        { label: 'Admin Dashboard', gradient: 'linear-gradient(135deg,#ff6b35 0%,#ff9f1c 100%)' },
        { label: 'Product Management', gradient: 'linear-gradient(135deg,#ff9f1c 0%,#ffd166 100%)' },
        { label: 'Inventory Tracking', gradient: 'linear-gradient(135deg,#e63946 0%,#ff6b35 100%)' },
        { label: 'Reports Section', gradient: 'linear-gradient(135deg,#f4845f 0%,#f7b267 100%)' },
      ],
    },
  },

  {
    label: 'WEB APP',
    thumbVariant: 'pt2',
    name: 'Notes App | Node.js',
    description:
      'Notes management application built with Node.js, featuring create, edit, delete, and organized note management functionality.',

    tags: ['Node.js', 'Express.js', 'Notes App', 'CRUD Operations'],

    linkLabel: 'Project ↗️',

    href: '#',
    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/notes.jpg',
    video: '/projects/notes.mp4',
    // video intentionally omitted → modal will show image-only
    // ──────────────────────────────────────────────────────
    caseStudy: {
      role: 'Backend Developer',
      duration: 'Personal Project',
      problem: 'Users needed a simple and organized way to create, manage, and store notes efficiently.',
      solution: 'Developed a Notes App using Node.js with CRUD functionality, allowing users to create, edit, delete, and manage notes securely.',
      results: [
        'Implemented full CRUD operations',
        'Created an organized notes management system',
        'Improved user experience with simple navigation',
        'Built a secure and efficient backend',
      ],
      screenshots: [
        { label: 'SMS Dashboard', gradient: 'linear-gradient(135deg,#06d6a0 0%,#028a57 100%)' },
        { label: 'Bulk Messaging', gradient: 'linear-gradient(135deg,#1db954 0%,#06d6a0 100%)' },
        { label: 'User Management', gradient: 'linear-gradient(135deg,#028a57 0%,#023430 100%)' },
        { label: 'Analytics', gradient: 'linear-gradient(135deg,#52b788 0%,#1db954 100%)' },
      ],
    },
  },

  {
    label: 'WEB APP',
    thumbVariant: 'pt3',
    name: 'Social Media Web Application',
    description: 'MERN stack social media platform with authentication, posts, likes, comments, and RESTful APIs.',
    tags: ['React.js', 'Node.js', 'MongoDB', 'Express.js', 'JWT'],
    linkLabel: 'Application ↗️',
    href: '#',
    // ── Dummy media – YouTube embed example ───────────────
    image: '/projects/social.jpg',
    video: '/projects/social.mp4',
    // ──────────────────────────────────────────────────────
    caseStudy: {
      role: 'Full-Stack Developer',
      duration: 'Personal Project',
      problem: 'Users required a modern social media platform with secure authentication and interactive engagement features.',
      solution: 'Developed a MERN stack application with JWT authentication, post management, comments, likes, and scalable backend APIs.',
      results: [
        'Implemented JWT authentication system',
        'Built posts and comments functionality',
        'Created RESTful APIs with MongoDB',
        'Enabled responsive frontend experience',
      ],
      screenshots: [
        { label: 'Feed Interface', gradient: 'linear-gradient(135deg,#3b82f6 0%,#6c21b5 100%)' },
        { label: 'User Profile', gradient: 'linear-gradient(135deg,#6c21b5 0%,#a855f7 100%)' },
        { label: 'Post Management', gradient: 'linear-gradient(135deg,#1d4ed8 0%,#3b82f6 100%)' },
        { label: 'Comments', gradient: 'linear-gradient(135deg,#7c3aed 0%,#6c21b5 100%)' },
      ],
    },
  },

  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'BurgerBoot App | React.js',
    description: 'Modern MERN stack e-commerce website with product listings, cart system, checkout flow, and admin management.',
    tags: ['MERN Stack', 'E-Commerce', 'MongoDB', 'REST APIs'],
    linkLabel: 'Store ↗️',
    href: '#',
    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/boot.jpg',
    video: '/projects/boot.mp4',
    // ──────────────────────────────────────────────────────
    caseStudy: {
      role: 'Full-Stack Developer',
      duration: 'Personal Project',
      problem: 'The store required a secure and scalable shopping experience with modern product management and checkout functionality.',
      solution: 'Built a complete MERN stack e-commerce platform with product listings, cart features, checkout system, and admin dashboard.',
      results: [
        'Implemented secure checkout system',
        'Built responsive shopping experience',
        'Created admin management panel',
        'Integrated backend APIs for product handling',
      ],
      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },
  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'CRUD system for AirPods products  | React.js',
    description: 'Modern MERN stack e-commerce website with product listings, cart system, checkout flow, and admin management.',
    tags: ['MERN Stack', 'E-Commerce', 'MongoDB', 'REST APIs'],
    linkLabel: 'Store ↗️',
    href: '#',
    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/airpots.jpg',
    video: '/projects/airpots.mp4',
    // ──────────────────────────────────────────────────────
    caseStudy: {
      role: 'Full-Stack Developer',
      duration: 'Personal Project',
      problem: 'The store required a secure and scalable shopping experience with modern product management and checkout functionality.',
      solution: 'Built a complete MERN stack e-commerce platform with product listings, cart features, checkout system, and admin dashboard.',
      results: [
        'Implemented secure checkout system',
        'Built responsive shopping experience',
        'Created admin management panel',
        'Integrated backend APIs for product handling',
      ],
      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },
  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'Dynamic WordPress site using PHP from scratch',
    description:
      'Custom WordPress website built with PHP, featuring dynamic content management, responsive design, and admin customization.',
    tags: ['WordPress', 'PHP', 'Custom Theme', 'CMS'],
    linkLabel: 'Store ↗️',
    href: '#',
    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/laptops.jpg',
    video: '/projects/laptops.mp4',
    // ──────────────────────────────────────────────────────
    caseStudy: {
      role: 'WordPress Developer',
      duration: 'Personal Project',
      problem:
        'The website required a dynamic and easy-to-manage content system with a responsive and user-friendly design.',
      solution:
        'Developed a custom WordPress website using PHP with dynamic content management, admin customization, and responsive layouts.',
      results: [
        'Built a fully responsive WordPress website',
        'Implemented dynamic content management',
        'Created custom admin functionality',
        'Improved website usability and performance',
      ],
      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },
  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'WordPress site using Elementor',
    description:
      'Custom WordPress website built with PHP, featuring dynamic content management, responsive design, and admin customization.',
    tags: ['WordPress', 'PHP', 'Custom Theme', 'CMS'],
    linkLabel: 'Store ↗️',
    href: '#',
    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/travel.jpg',
    video: '/projects/travel.mp4',
    // ──────────────────────────────────────────────────────
    caseStudy: {
      role: 'WordPress Developer',
      duration: 'Personal Project',
      problem:
        'The website required a dynamic and easy-to-manage content system with a responsive and user-friendly design.',
      solution:
        'Developed a custom WordPress website using PHP with dynamic content management, admin customization, and responsive layouts.',
      results: [
        'Built a fully responsive WordPress website',
        'Implemented dynamic content management',
        'Created custom admin functionality',
        'Improved website usability and performance',
      ],
      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },
  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'Dynamic PHP Website using CRUD Operations',

    description:
      'Dynamic PHP website built with CRUD operations, featuring content management, responsive design, and admin functionality.',

    tags: ['PHP', 'CRUD Operations', 'MySQL', 'Admin Panel'],

    linkLabel: 'Project ↗️',

    href: '#',

    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/kid.jpg',
    video: '/projects/kid.mp4',
    // ──────────────────────────────────────────────────────

    caseStudy: {
      role: 'PHP Developer',

      duration: 'Personal Project',

      problem:
        'The website required a dynamic system to manage data efficiently with secure admin controls and responsive functionality.',

      solution:
        'Developed a dynamic PHP website using CRUD operations with data management features, admin controls, and responsive layouts.',

      results: [
        'Implemented complete CRUD functionality',
        'Built responsive website layouts',
        'Created secure admin management system',
        'Improved data handling and usability',
      ],

      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },
  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'Resto | Bootstrap | JavaScript',

    description:
      'Modern restaurant website built with Bootstrap and JavaScript, featuring responsive layouts, interactive UI sections, and smooth user experience.',

    tags: ['Bootstrap', 'JavaScript', 'Responsive Design', 'UI/UX'],

    linkLabel: 'Project ↗️',

    href: '#',

    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/resto.jpg',
    video: '/projects/resto.mp4',
    // ──────────────────────────────────────────────────────

    caseStudy: {
      role: 'Frontend Developer',

      duration: 'Personal Project',

      problem:
        'The restaurant website required a responsive and interactive frontend design to improve user engagement and browsing experience.',

      solution:
        'Developed a modern restaurant website using Bootstrap and JavaScript with responsive layouts, interactive sections, and optimized UI components.',

      results: [
        'Built fully responsive website layouts',
        'Implemented interactive UI components',
        'Improved user browsing experience',
        'Created modern and clean frontend design',
      ],


      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },
  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'QuizVerse | Laravel 10',

    description:
      'Online quiz management system built with Laravel 10, featuring quiz creation, category management, admin panel, timer-based quizzes, and result tracking.',

    tags: ['Laravel 10', 'PHP', 'Quiz System', 'Admin Panel'],

    linkLabel: 'Project ↗️',

    href: '#',

    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/quiz.jpg',
    video: '/projects/quiz.mp4',
    // ──────────────────────────────────────────────────────

    caseStudy: {
      role: 'Laravel Developer',

      duration: 'Personal Project',

      problem:
        'The platform required an efficient system for managing quizzes, questions, categories, and user participation with a secure admin panel.',

      solution:
        'Developed a quiz management system using Laravel 10 with quiz creation, category management, timer-based participation, result tracking, and admin controls.',

      results: [
        'Implemented dynamic quiz management',
        'Built secure admin panel functionality',
        'Created timer-based quiz system',
        'Improved user participation experience',
      ],



      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },
  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'Dynamic Multi-Page Car Dealership Website',

    description:
      'Modern car dealership website featuring multi-page navigation, vehicle listings, detailed car pages, and inquiry/contact system for customers.',

    tags: ['HTML', 'CSS', 'JavaScript', 'Multi-Page Website'],

    linkLabel: 'Project ↗️',

    href: '#',

    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/car.jpg',
    video: '/projects/car.mp4',
    // ──────────────────────────────────────────────────────

    caseStudy: {
      role: 'Frontend Developer',

      duration: 'Personal Project',

      problem:
        'The dealership needed a structured and user-friendly platform to showcase cars with detailed information and improve customer inquiries.',

      solution:
        'Developed a multi-page car dealership website with vehicle listings, detailed car pages, and a contact/inquiry system using modern frontend technologies.',

      results: [
        'Built structured multi-page website',
        'Implemented dynamic car listing pages',
        'Created detailed car information layout',
        'Improved user inquiry and navigation experience',
      ],



      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },

  {
    label: 'SHOP',
    thumbVariant: 'pt4',
    name: 'CodeSmasher | wordpress Elementor',

    description:
      'Modern WordPress website built with Elementor, featuring responsive design, custom layouts, and visually engaging sections for better user experience.',

    tags: ['WordPress', 'Elementor', 'Responsive Design', 'CMS'],

    linkLabel: 'Project ↗️',

    href: '#',

    // ── Dummy media – replace with real paths ─────────────
    image: '/projects/code.jpg',
    video: '/projects/code.mp4',
    // ──────────────────────────────────────────────────────

    caseStudy: {
      role: 'WordPress Developer',

      duration: 'Personal Project',

      problem:
        'The client needed a modern, visually appealing, and easy-to-manage website built with a page builder for better flexibility and design control.',

      solution:
        'Developed a responsive WordPress website using Elementor with custom layouts, drag-and-drop design structure, and optimized UI components.',

      results: [
        'Built a fully responsive Elementor website',
        'Created custom layout sections',
        'Improved UI/UX design quality',
        'Enhanced website performance and usability',
      ],



      screenshots: [
        { label: 'Homepage', gradient: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)' },
        { label: 'Product Listing', gradient: 'linear-gradient(135deg,#f97316 0%,#fb923c 100%)' },
        { label: 'Shopping Cart', gradient: 'linear-gradient(135deg,#db2777 0%,#ec4899 100%)' },
        { label: 'Checkout', gradient: 'linear-gradient(135deg,#9d174d 0%,#db2777 100%)' },
      ],
    },
  },

];
