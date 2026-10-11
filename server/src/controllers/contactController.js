import { Contact, inMemoryContacts } from '../models/Contact.js';
import { sendContactNotification } from '../utils/emailService.js';
import { getDBStatus } from '../config/db.js';

export const handleContactSubmit = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'Unknown';

    // 1. Attempt sending email notification first
    const emailResult = await sendContactNotification({ name, email, subject, message });

    let recordId = null;
    let savedInDb = false;

    // 2. Persist message in MongoDB (or in-memory store) independently of email result
    if (getDBStatus()) {
      try {
        const newContact = await Contact.create({
          name,
          email,
          subject,
          message,
          ipAddress: String(ipAddress),
          emailSent: emailResult.success,
          emailError: emailResult.error || null,
        });
        recordId = newContact._id;
        savedInDb = true;
      } catch (dbError) {
        console.warn('[DB Error on save, falling back to memory]:', dbError.message);
      }
    }

    if (!savedInDb) {
      const fallbackRecord = {
        _id: 'mem_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name,
        email,
        subject,
        message,
        ipAddress: String(ipAddress),
        emailSent: emailResult.success,
        emailError: emailResult.error || null,
        createdAt: new Date(),
      };
      inMemoryContacts.push(fallbackRecord);
      recordId = fallbackRecord._id;
    }

    // 3. Return response based on actual email delivery outcome
    if (!emailResult.success) {
      const isUnconfigured = emailResult.unconfigured;
      const status = isUnconfigured ? 503 : 502;
      const clientMessage = isUnconfigured
        ? 'Email service is temporarily unconfigured on the server. Your message has been saved to the database, but please reach out directly via email in the meantime.'
        : 'Failed to deliver notification email to the recipient inbox. Your message was recorded, but please send an email directly.';

      return res.status(status).json({
        success: false,
        message: clientMessage,
        details: emailResult.error,
        savedLocally: true,
        data: {
          id: recordId,
          name,
          email,
        },
      });
    }

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.',
      data: {
        id: recordId,
        name,
        email,
        emailNotification: emailResult.simulated ? 'simulated' : 'sent',
      },
    });
  } catch (error) {
    next(error);
  }
};

// Endpoint to retrieve portfolio projects (synced with Lalit Chaudhari's resume)
export const getProjects = async (req, res) => {
  const projects = [
    {
      id: 'proj-1',
      title: 'AI Phishing Detection: Hybrid Scam Analysis System',
      category: 'AI/ML',
      description: 'A research project that accurately classifies incoming SMS and messages as legitimate or potentially malicious phishing/scam content using transformer-based NLP architectures.',
      technologies: ['Machine Learning', 'NLP', 'DistilBERT', 'PyTorch', 'Scikit-learn', 'Python'],
      githubUrl: 'https://github.com/Roa07/AI-Phishing-Detection',
      liveDemoUrl: null,
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
        'Generates actionable error diagnostics to help users fix queries before execution',
        'Boosts developer productivity by catching common SQL errors at input stage rather than runtime',
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
  ];

  return res.status(200).json({
    success: true,
    count: projects.length,
    data: projects,
  });
};
