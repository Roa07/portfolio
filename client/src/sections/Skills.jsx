import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { Code2, Layout, Server, Database, Brain, Wrench, Check } from 'lucide-react';

const categoryIcons = {
  languages: Code2,
  frontend: Layout,
  backend: Server,
  databases: Database,
  aiml: Brain,
  tools: Wrench,
};

export const Skills = ({ skillsData }) => {
  const [activeTab, setActiveTab] = useState(skillsData.categories[0]?.id || 'languages');

  const selectedCategory = skillsData.categories.find((c) => c.id === activeTab);

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Capabilities" title="Technical Skills" />

        {/* Category Pills / Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {skillsData.categories.map((category) => {
            const Icon = categoryIcons[category.id] || Code2;
            const isActive = activeTab === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-105'
                    : 'glass text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <Icon size={16} />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Cards Grid */}
        {selectedCategory && (
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {selectedCategory.skills.map((skill, index) => (
              <div
                key={index}
                className="glass p-5 rounded-2xl flex items-center justify-between group hover:border-blue-500/50 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs">
                    <Check size={16} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                      {skill.name}
                    </h4>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Proficiency: {skill.level}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                    skill.level === 'Advanced'
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      : skill.level === 'Proficient'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {skill.level}
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
