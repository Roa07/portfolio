import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { Compass, Sparkles, BookOpen, CheckCircle, Globe } from 'lucide-react';

export const About = ({ aboutData }) => {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Discover" title="About Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Introduction & Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-slate-700 dark:text-slate-300"
          >
            <div className="p-6 rounded-2xl glass shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="text-blue-500" size={20} />
                Background & Narrative
              </h3>
              <p className="leading-relaxed whitespace-pre-line text-slate-600 dark:text-slate-300">
                {aboutData.introduction}
              </p>
            </div>

            <div className="p-6 rounded-2xl glass shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="text-indigo-500" size={20} />
                Career Objective
              </h3>
              <p className="leading-relaxed text-slate-600 dark:text-slate-300">
                {aboutData.careerObjective}
              </p>
            </div>

            {/* Current learning goals */}
            <div className="p-6 rounded-2xl glass shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="text-emerald-500" size={20} />
                Current Learning Goals
              </h3>
              <ul className="space-y-2">
                {aboutData.learningGoals.map((goal, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm sm:text-base">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Core Strengths & Areas of Interest & Spoken Languages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Professional Strengths */}
            <div className="p-6 rounded-2xl glass shadow-sm space-y-5">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Professional Strengths
              </h3>
              <div className="space-y-4">
                {aboutData.strengths.map((item, idx) => (
                  <div key={idx} className="border-l-2 border-blue-500 pl-4 py-1">
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <CheckCircle size={14} className="text-blue-500" />
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas of Interest Tags */}
            <div className="p-6 rounded-2xl glass shadow-sm space-y-4">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Areas of Interest
              </h3>
              <div className="flex flex-wrap gap-2">
                {aboutData.areasOfInterest.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Spoken Languages */}
            {aboutData.spokenLanguages && (
              <div className="p-6 rounded-2xl glass shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Globe className="text-blue-500" size={20} />
                  Languages Known
                </h3>
                <div className="flex flex-wrap gap-2">
                  {aboutData.spokenLanguages.map((lang, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
