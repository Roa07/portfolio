import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';

export const Projects = ({ initialProjects }) => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Web Development', 'AI/ML', 'Other'];

  const filteredProjects = initialProjects.filter((project) => {
    if (filter === 'All') return true;
    return project.category === filter;
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Portfolio Showcase" title="Featured Projects" />

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                filter === cat
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                  : 'glass text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass rounded-2xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80 hover:shadow-xl hover:border-blue-500/40 transition-all flex flex-col group"
              >
                {/* Card Top Category & Tech Banner */}
                <div className="px-6 pt-6 pb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                    {project.category}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {project.technologies[0]}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Key features bullets */}
                    {project.keyFeatures && (
                      <ul className="mb-4 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {project.keyFeatures.slice(0, 2).map((feat, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 size={13} className="text-emerald-500 shrink-0" />
                            <span className="truncate">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-medium border border-blue-200/50 dark:border-blue-800/40"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links / Actions */}
                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition"
                        >
                          <GithubIcon size={14} />
                          <span>Source Code</span>
                        </a>
                      )}

                      {project.liveDemoUrl ? (
                        <a
                          href={project.liveDemoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
                        >
                          <ExternalLink size={14} />
                          <span>Live Demo</span>
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-medium">
                          <AlertCircle size={13} />
                          <span>Demo Offline</span>
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modal for Detailed Project View */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-900 max-w-xl w-full rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedProject.title}
                </h3>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 font-bold text-lg"
                >
                  ✕
                </button>
              </div>

              <div className="mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {selectedProject.category}
                </span>
              </div>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Key Highlights</h4>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  {selectedProject.keyFeatures?.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((t, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 font-medium">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Close
                </button>
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700"
                  >
                    View Repository
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
