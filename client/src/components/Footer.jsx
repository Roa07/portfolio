import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export const Footer = ({ personalData }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
          {/* Brand info */}
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              {personalData.name}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {personalData.title}
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Socials & Back to top */}
          <div className="flex items-center gap-3">
            {personalData.socials.github && (
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition"
                aria-label="GitHub"
              >
                <GithubIcon size={18} />
              </a>
            )}
            {personalData.socials.linkedin && (
              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={18} />
              </a>
            )}
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition"
              aria-label="Back to top"
              title="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div>
            © {currentYear} {personalData.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Built with React, Tailwind CSS, Framer Motion & Node.js
          </div>
        </div>
      </div>
    </footer>
  );
};
