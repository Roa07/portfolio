import React, { useState, useEffect } from 'react';
import { portfolioData } from './config/portfolioData';
import { useTheme } from './hooks/useTheme';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Education } from './sections/Education';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { ResumeSection } from './sections/ResumeSection';
import { Contact } from './sections/Contact';
import { Footer } from './components/Footer';

import { API_BASE_URL } from './config/api';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [projects, setProjects] = useState(portfolioData.projects);

  // Optionally fetch dynamic projects from backend if server is up, else fallback to portfolioData
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
        }
      })
      .catch(() => {
        // Fallback gracefully to client config
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-900 dark:text-slate-100 selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        personalData={portfolioData.personal}
      />

      {/* Main Content Sections */}
      <main className="relative overflow-hidden">
        <Hero personalData={portfolioData.personal} />
        <About aboutData={portfolioData.about} />
        <Education educationData={portfolioData.education} />
        <Skills skillsData={portfolioData.skills} />
        <Projects initialProjects={projects} />
        <ResumeSection resumeUrl={portfolioData.personal.resumeUrl} />
        <Contact personalData={portfolioData.personal} />
      </main>

      {/* Footer */}
      <Footer personalData={portfolioData.personal} />
    </div>
  );
}

export default App;
