import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { Briefcase, Award, Trophy, Users, ExternalLink } from 'lucide-react';

export const Achievements = ({ data }) => {
  const { internships, certifications, hackathons, positions } = data || {};

  const hasAnyData =
    (internships && internships.length > 0) ||
    (certifications && certifications.length > 0) ||
    (hackathons && hackathons.length > 0) ||
    (positions && positions.length > 0);

  if (!hasAnyData) return null;

  return (
    <section id="achievements" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Track Record" title="Experience & Achievements" />

        <div className="space-y-16">
          {/* Internships & Work Experience */}
          {internships && internships.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-500" />
                Internships & Work Experience
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {internships.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                        {item.role}
                      </h4>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                        {item.period}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-3">
                      {item.company} • {item.location}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Hackathons & Competitions */}
          {hackathons && hackathons.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" />
                Hackathons & Competitions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hackathons.map((hack, idx) => (
                  <div
                    key={idx}
                    className="glass p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {hack.title}
                      </h4>
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {hack.year}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {hack.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Award size={20} className="text-emerald-500" />
                Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="glass p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                        {cert.title}
                      </h4>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                        {cert.issuer} • {cert.date}
                      </div>
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold mt-2"
                      >
                        <span>Verify Credential</span>
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Positions of Responsibility */}
          {positions && positions.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <Users size={20} className="text-indigo-500" />
                Positions of Responsibility
              </h3>
              <div className="space-y-4">
                {positions.map((pos, idx) => (
                  <div
                    key={idx}
                    className="glass p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm"
                  >
                    <div className="flex flex-wrap justify-between items-center mb-1">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {pos.role}
                      </h4>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {pos.period}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
                      {pos.organization}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pos.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
