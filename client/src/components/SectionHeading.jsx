import React from 'react';

export const SectionHeading = ({ subtitle, title, alignment = 'center' }) => {
  const alignClasses =
    alignment === 'center'
      ? 'text-center items-center'
      : alignment === 'left'
      ? 'text-left items-start'
      : 'text-right items-end';

  return (
    <div className={`flex flex-col mb-12 ${alignClasses}`}>
      {subtitle && (
        <span className="text-sm font-semibold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
        {title}
      </h2>
      <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full mt-3"></div>
    </div>
  );
};
