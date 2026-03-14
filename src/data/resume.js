export const personalInfo = {
  name: 'Abhishek Myana',
  email: 'amyana.email@gmail.com',
  phone: '+91 986 726 1632',
  linkedin: 'https://linkedin.com/in/abhishekmyana',
  location: 'Mumbai | Bangalore',
}

export const experience = [
  {
    id: 1,
    company: 'Samsung R&D',
    role: 'Senior Software Engineer',
    period: "Jan '22 – Present",
    location: 'Bangalore',
    active: true,
    points: [
      'Designed, developed and tested LTE MAC features — Network Sharing, QoS Scheduling and Power Allocation',
      'Debugged PLMs and field issues related to UE Attach, sumb Crash, RREs, KPI degradation and feature functionality',
      'Enhanced test framework functionality to automate test cases',
      'Travelled to Samsung HQ, South Korea for SVR23B release',
      'Undertook code quality improvement activities and code reviews',
      'Delivered training sessions to explain LTE concepts',
      'Cleared Professional level in Software Competency (SWC) Test',
    ],
    tags: ['C', 'C++', 'LTE MAC', 'QoS', 'Embedded'],
  },
  {
    id: 2,
    company: 'Deloitte',
    role: 'Technology Analyst',
    period: "Jul '21 – Jan '22",
    location: 'Mumbai',
    active: false,
    points: [
      'Worked with Informatica MDM and Data Quality to generate dashboards providing insights on available data',
      'Developed a POC demonstrating Informatica Analyst and its integration with Informatica Data Quality',
      'Presented functionality working demonstrations to client',
    ],
    tags: ['Informatica MDM', 'Data Quality', 'Analytics'],
  },
  {
    id: 3,
    company: 'Isoport',
    role: 'Software Intern',
    period: "Apr '21 – Jun '21",
    location: 'Remote',
    active: false,
    points: [
      'Developed REST APIs using Django and MySQL database',
      'Created responsive user interface with ReactJS and Bootstrap',
      'Deployed application on AWS using EC2, RDS and S3 services',
    ],
    tags: ['Django', 'ReactJS', 'AWS', 'MySQL'],
  },
]

export const projects = [
  {
    id: 1,
    num: '01',
    title: 'Community Social Network',
    description:
      'A private social networking platform where users create posts with images and videos, like and comment, with admin-controlled relationships and scheduled video calls.',
    tags: ['ReactJS', 'Django', 'AWS', 'Bootstrap'],
    period: "Feb '22 – May '22",
  },
  {
    id: 2,
    num: '02',
    title: 'E-Commerce Website',
    description:
      'Full-featured ecommerce platform with admin dashboard — authentication, cart management, shipping details, order placement and inventory tracking.',
    tags: ['ReactJS', 'Redux', 'Firebase', 'Bootstrap'],
    period: "Sept '21 – Nov '21",
  },
  {
    id: 3,
    num: '03',
    title: 'Authentication via Keystroke Dynamics',
    description:
      'Analysed keystroke dynamics benchmark dataset, trained ML models, built a data-collection website, plotted visualisations and retrained on custom dataset.',
    tags: ['Python', 'ML', 'Django', 'Firebase'],
    period: "Aug '20 – Mar '21",
  },
  {
    id: 4,
    num: '04',
    title: 'Image Editor',
    description:
      'Java application supporting image rotation, cropping, brightness control, RGB modification and visual filters — grayscale, sepia and more.',
    tags: ['Java', 'Image Processing'],
    period: "Aug '20 – Nov '20",
  },
]

export const skills = {
  Languages: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'SQL'],
  'Frameworks & Libraries': ['ReactJS', 'Django', 'Redux', 'Bootstrap'],
  'Infrastructure & Tools': ['AWS EC2', 'AWS RDS', 'AWS S3', 'Docker', 'MySQL', 'NoSQL', 'Firebase'],
  'Core CS': ['Data Structures', 'Algorithms', 'LTE MAC', 'Machine Learning', 'Deep Learning'],
}

export const education = [
  {
    id: 1,
    institution: 'VJTI, Mumbai',
    degree: 'B.Tech · ECE · 2021',
    score: '8.04 / 10',
    icon: '🎓',
  },
  {
    id: 2,
    institution: 'KC College',
    degree: 'HSC · 2016',
    score: '91.69%',
    icon: '📚',
  },
  {
    id: 3,
    institution: 'Salvation High School',
    degree: 'SSC · 2014',
    score: '91.40%',
    icon: '🏫',
  },
]

export const rankings = [
  { exam: 'GATE CS 2021', rank: 'AIR 800', icon: '🏆' },
  { exam: 'JEE Advanced 2017', rank: 'AIR 6930', icon: '🚀' },
]

export const courses = [
  { title: 'Deep Learning Specialization', icon: '🧠' },
  { title: 'Machine Learning', icon: '📊' },
  { title: 'Responsive Web Design', icon: '🎨' },
]
