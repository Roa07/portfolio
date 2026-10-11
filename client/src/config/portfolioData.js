export const portfolioData = {
  personal: {
    name: 'Lalit Chaudhari',
    title: 'AI/ML Enthusiast & Full-Stack Developer | M.Sc. Industrial Mathematics Student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    avatarFallback: 'LC',
    bioShort: 'Motivated M.Sc. Industrial Mathematics with Computer Applications student passionate about Machine Learning, NLP, Deep Learning, Statistics, and full-stack software development.',
    location: 'Pune, India (Open to Relocation & Remote)',
    email: 'chaudharivlalit16@gmail.com',
    phone: '+91-8177975128',
    socials: {
      github: 'https://github.com/Roa07',
      linkedin: 'https://www.linkedin.com/in/lalit-chaudhari-b32306325/?isSelfProfile=true',
    },
    resumeUrl: '/resume.pdf',
  },
  about: {
    introduction: `Motivated M.Sc. Industrial Mathematics with Computer Applications student with a strong foundation in Python, Machine Learning, Deep Learning, Statistics, and NLP. 

Hands-on experience developing AI/ML projects using Scikit-learn, PyTorch, Pandas, NumPy, and DistilBERT, along with practical knowledge of data analysis, feature engineering, and model evaluation. Also experienced in Java, Spring Boot, SQL, and full-stack application development.

Strong problem-solving and analytical skills with an interest in applying machine learning and mathematical concepts to real-world problems. Seeking opportunities in AI/ML, Data Science, and research-oriented roles.`,
    careerObjective: `Seeking challenging roles in AI/ML, Data Science, and research-oriented software engineering to build intelligent, scalable systems and solve real-world problems with mathematical modeling and modern deep learning architectures.`,
    areasOfInterest: [
      'Machine Learning & Deep Learning',
      'Natural Language Processing (NLP) & Transformers',
      'Applied Industrial Mathematics & Statistical Modeling',
      'Data Analysis & Exploratory Data Analysis (EDA)',
      'Full-Stack Application Development (Java, Spring Boot, React)',
      'Database Architecture & SQL Optimization',
    ],
    learningGoals: [
      'JLPT N5 (Japanese Language Proficiency Test) Certification',
      'Advanced Large Language Models (LLMs) & Transformer Fine-Tuning',
      'Deepening Competitive Programming & Algorithm Mastery',
    ],
    strengths: [
      {
        title: 'Strong Mathematical & Statistical Foundation',
        description: 'Rigorous background in Industrial Mathematics, statistics, and algorithmic problem formulation.',
      },
      {
        title: 'Applied AI/ML & NLP Experience',
        description: 'Hands-on project work with PyTorch, Scikit-learn, DistilBERT, feature engineering, and model evaluation.',
      },
      {
        title: 'Full-Stack & Backend Capability',
        description: 'Competent across Java, Spring Boot, Python, SQL, REST APIs, and modern frontend technologies.',
      },
      {
        title: 'Analytical Mentorship & Communication',
        description: 'Demonstrated experience mentoring 30+ students in debugging, project development, and group coding.',
      },
    ],
    spokenLanguages: ['English', 'Hindi', 'Marathi', 'Japanese (Basic - JLPT N5 candidate)'],
  },
  education: [
    {
      degree: 'M.Sc. Industrial Mathematics with Computer Applications',
      institution: 'Fergusson College, Pune',
      period: 'Expected Jul 2027',
      grade: 'First Year Grade: 6.8',
      courses: [
        'Advanced Mathematics',
        'Machine Learning & Deep Learning',
        'Data Structures & Algorithms',
        'Computer Networks & DBMS',
        'Statistical Modeling & Numerical Analysis',
      ],
      description: 'Focusing on advanced applied mathematics, computational intelligence, statistical modeling, and software engineering.',
    },
    {
      degree: 'B.Sc. Mathematics, Computer Science & Electronics',
      institution: 'St. Francis De Sales College, Nagpur',
      period: '2022 – 2025',
      grade: 'CGPA: 6.8',
      courses: [
        'Higher Mathematics',
        'Object-Oriented Programming',
        'Electronics & Microprocessors',
        'Operating Systems',
        'Database Management Systems',
      ],
      description: 'Built foundational strengths in linear algebra, calculus, electronics circuits, data structures, and computer science principles.',
    },
  ],
  skills: {
    categories: [
      {
        id: 'languages',
        name: 'Programming Languages',
        skills: [
          { name: 'Python', level: 'Advanced' },
          { name: 'Java', level: 'Advanced' },
          { name: 'JavaScript', level: 'Proficient' },
          { name: 'C', level: 'Intermediate' },
          { name: 'C++', level: 'Intermediate' },
        ],
      },
      {
        id: 'aiml',
        name: 'Machine Learning & NLP',
        skills: [
          { name: 'Machine Learning', level: 'Advanced' },
          { name: 'Deep Learning', level: 'Proficient' },
          { name: 'Natural Language Processing (NLP)', level: 'Advanced' },
          { name: 'PyTorch', level: 'Proficient' },
          { name: 'DistilBERT & Transformers', level: 'Proficient' },
          { name: 'Scikit-learn', level: 'Advanced' },
          { name: 'Feature Engineering & Model Evaluation', level: 'Advanced' },
        ],
      },
      {
        id: 'data',
        name: 'Data & Statistics',
        skills: [
          { name: 'Pandas', level: 'Advanced' },
          { name: 'NumPy', level: 'Advanced' },
          { name: 'Exploratory Data Analysis (EDA)', level: 'Advanced' },
          { name: 'Matplotlib', level: 'Proficient' },
          { name: 'Statistical Testing & Modeling', level: 'Advanced' },
        ],
      },
      {
        id: 'backend',
        name: 'Backend & Full-Stack',
        skills: [
          { name: 'Java Spring Boot', level: 'Proficient' },
          { name: 'RESTful API Development', level: 'Proficient' },
          { name: 'React.js', level: 'Proficient' },
          { name: 'HTML5 & CSS3', level: 'Advanced' },
        ],
      },
      {
        id: 'databases',
        name: 'Databases',
        skills: [
          { name: 'MySQL', level: 'Advanced' },
          { name: 'SQL Query Optimization', level: 'Advanced' },
          { name: 'Database Management Systems (DBMS)', level: 'Advanced' },
        ],
      },
      {
        id: 'core_tools',
        name: 'Core CS & Tools',
        skills: [
          { name: 'Data Structures & Algorithms', level: 'Advanced' },
          { name: 'Object-Oriented Programming (OOP)', level: 'Advanced' },
          { name: 'Computer Networks & Operating Systems', level: 'Proficient' },
          { name: 'Git & GitHub', level: 'Advanced' },
          { name: 'VS Code & IntelliJ IDEA', level: 'Advanced' },
          { name: 'Postman', level: 'Proficient' },
        ],
      },
    ],
  },
  projects: [
    {
      id: 'proj-1',
      title: 'AI Phishing Detection: Hybrid Scam Analysis System',
      category: 'AI/ML',
      description: 'A research project that accurately classifies incoming SMS and messages as legitimate or potentially malicious phishing/scam content using transformer-based NLP architectures.',
      technologies: ['Machine Learning', 'NLP', 'DistilBERT', 'PyTorch', 'Scikit-learn', 'Python'],
      githubUrl: 'https://github.com/Roa07/AI-Phishing-Detection',
      liveDemoUrl: null, // Gracefully marked as research pipeline
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
      featured: true,
      keyFeatures: [
        'Trained and evaluated on labeled dataset of legitimate and malicious SMS messages',
        'Fine-tuned DistilBERT transformer combined with Scikit-learn feature extractors',
        'High precision and recall for real-time mobile message security',
      ],
    },
    {
      id: 'proj-2',
      title: 'SQL Validator – Query Validation Tool',
      category: 'Web Development',
      description: 'A Python-based SQL query validation engine that inspects query syntax, SQL keywords, and table/column schema validity prior to database execution.',
      technologies: ['Python', 'SQL', 'MySQL', 'AST / Parser Logic'],
      githubUrl: 'https://github.com/Roa07/Sql-validator',
      liveDemoUrl: 'https://sql-validator-demo.example.com',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
      featured: true,
      keyFeatures: [
        'Inspects syntax, SQL keyword positioning, and schema table/column names',
        'Generates actionable error diagnostics to help developers resolve query bugs instantly',
        'Boosts developer productivity by preventing runtime database failures at input stage',
      ],
    },
    {
      id: 'proj-3',
      title: 'Complaint System App',
      category: 'Web Development',
      description: 'Full-stack complaint logging and issue tracking system with automated status workflows, department routing, and responsive dashboard.',
      technologies: ['Full-Stack', 'Java / Python', 'SQL', 'React', 'REST API'],
      githubUrl: 'https://github.com/Roa07/Complaint-System-app',
      liveDemoUrl: null,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
      featured: true,
      keyFeatures: [
        'Centralized issue logging with categorisation and ticket tracking',
        'Relational database architecture for reliable records management',
        'Clean user interface with status indicators and search capabilities',
      ],
    },
    {
      id: 'proj-4',
      title: 'Ad Exposure Count Prediction – ML Predictive Model',
      category: 'AI/ML',
      description: 'Machine learning regression model trained to forecast digital ad exposure counts by analyzing user interaction demographics and promotional features.',
      technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib'],
      githubUrl: 'https://github.com/Roa07',
      liveDemoUrl: null,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      featured: false,
      keyFeatures: [
        'Conducted thorough Exploratory Data Analysis (EDA) and feature engineering',
        'Formulated statistical hypothesis testing to identify high-impact variables',
        'Trained and validated robust predictive regression models with measurable accuracy',
      ],
    },
  ],
  experienceAndAchievements: {
    internships: [
      {
        role: 'Programming Mentor',
        company: 'Disha Computer Institute',
        location: 'Pune / Maharashtra',
        period: 'Past / Recent',
        description: 'Guided students through debugging challenges, programming fundamentals, and project development. Conducted group coding sessions and created structured learning curricula for 30+ students.',
      },
    ],
    certifications: [
      {
        title: 'LeetCode Problem Solver (70+ Problems)',
        issuer: 'LeetCode',
        date: 'Active',
        link: 'https://leetcode.com',
      },
      {
        title: 'M.Sc. Industrial Mathematics with Computer Applications',
        issuer: 'Fergusson College, Pune',
        date: 'Enrolled (Expected 2027)',
        link: 'https://fergusson.edu',
      },
    ],
    hackathons: [
      {
        title: 'Japanese Language Study & JLPT N5 Preparation',
        description: 'Preparing for Japanese Language Proficiency Test (JLPT N5). Fluent in Hiragana, Katakana, basic Kanji, vocabulary, and daily conversational grammar.',
        year: '2026',
      },
    ],
    positions: [
      {
        role: 'Programming Mentor & Workshop Lead',
        organization: 'Disha Computer Institute',
        period: '30+ Students Mentored',
        description: 'Prepared structured learning materials and led hands-on programming labs in Python, C/C++, and core computer science fundamentals.',
      },
    ],
  },
};
