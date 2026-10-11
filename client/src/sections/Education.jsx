import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { GraduationCap, Calendar, Award, BookOpen } from 'lucide-react';

export const Education = ({ educationData }) => {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Academic Journey" title="Education" />

        <div className="relative border-l-2 border-blue-500/30 dark:border-blue-500/20 ml-4 sm:ml-8 space-y-12">
          {educationData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-6 sm:pl-10"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[17px] sm:-left-[17px] top-1.5 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                <GraduationCap size={16} />
              </div>

              {/* Education Card */}
              <div className="glass p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {item.degree}
                  </h3>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300">
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="text-base font-medium text-blue-600 dark:text-blue-400 mb-3">
                  {item.institution}
                </div>

                {item.grade && (
                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md mb-4 border border-emerald-500/20">
                    <Award size={14} />
                    <span>{item.grade}</span>
                  </div>
                )}

                {item.description && (
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.description}
                  </p>
                )}

                {item.courses && item.courses.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 flex items-center gap-1.5">
                      <BookOpen size={13} />
                      Relevant Coursework:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {item.courses.map((course, cIdx) => (
                        <span
                          key={cIdx}
                          className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
