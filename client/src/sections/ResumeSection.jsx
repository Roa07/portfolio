import React, { useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { FileDown, Eye, AlertCircle, CheckCircle } from 'lucide-react';

export const ResumeSection = ({ resumeUrl }) => {
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleDownload = () => {
    setDownloadStatus('Downloading...');
    setTimeout(() => {
      setDownloadStatus('Download initiated! Check your downloads folder.');
    }, 800);
  };

  return (
    <section id="resume" className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <SectionHeading subtitle="Curriculum Vitae" title="My Resume" />

        <div className="glass p-8 sm:p-12 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-md">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-6">
            <FileDown size={32} />
          </div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Looking for a complete overview of my qualifications?
          </h3>

          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Download my updated resume to view detailed work history, research experience, technical skills, and recommendations.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={resumeUrl || '/resume.pdf'}
              download="Lalit_Chaudhari_Resume.pdf"
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <FileDown size={18} />
              <span>Download PDF Resume</span>
            </a>

            <a
              href={resumeUrl || '/resume.pdf'}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Eye size={18} />
              <span>Preview in Browser</span>
            </a>
          </div>

          {downloadStatus && (
            <div className="mt-4 inline-flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1.5 rounded-lg">
              <CheckCircle size={14} />
              <span>{downloadStatus}</span>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <AlertCircle size={14} />
            <span>Format: PDF (Verified & Virus Checked) • Last Updated: October 2026</span>
          </div>
        </div>
      </div>
    </section>
  );
};
