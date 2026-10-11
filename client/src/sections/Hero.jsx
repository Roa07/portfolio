import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileDown, Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';

export const Hero = ({ personalData }) => {
  const handleScroll = (selector) => {
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-500/15 via-indigo-500/15 to-purple-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          {/* Avatar Monogram */}
          <div className="relative mb-6 group">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 blur opacity-60 group-hover:opacity-100 transition duration-500"></div>
            <div
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-700 text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center border-4 border-white dark:border-slate-900 shadow-xl tracking-wider select-none"
            >
              {personalData.avatarFallback || 'LC'}
            </div>
          </div>

          {/* Availability pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Available for Opportunities & Collaborations</span>
          </div>

          {/* Full Name & Title */}
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            Hi, I'm <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">{personalData.name}</span>
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4 max-w-2xl">
            {personalData.title}
          </p>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed mb-6">
            {personalData.bioShort}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 mb-8">
            <MapPin size={16} className="text-blue-500" />
            <span>{personalData.location}</span>
          </div>

          {/* Call to actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <button
              onClick={() => handleScroll('#projects')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>View Projects</span>
              <ArrowRight size={16} />
            </button>

            <a
              href={personalData.resumeUrl || '/resume.pdf'}
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileDown size={16} />
              <span>Download Resume</span>
            </a>

            <button
              onClick={() => handleScroll('#contact')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm border border-slate-300 dark:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Mail size={16} />
              <span>Contact Me</span>
            </button>
          </div>

          {/* Social Profiles */}
          <div className="flex items-center gap-4">
            {personalData.socials.github && (
              <a
                href={personalData.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
              >
                <GithubIcon size={20} />
              </a>
            )}

            {personalData.socials.linkedin && (
              <a
                href={personalData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
              >
                <LinkedinIcon size={20} />
              </a>
            )}

            {personalData.email && (
              <a
                href={`mailto:${personalData.email}`}
                aria-label="Email Direct"
                className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all hover:text-blue-600 dark:hover:text-blue-400 shadow-sm"
              >
                <Mail size={20} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
