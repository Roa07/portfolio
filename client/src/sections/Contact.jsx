import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { Mail, Send, CheckCircle2, AlertCircle, Loader2, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons';
import { API_BASE_URL } from '../config/api';

export const Contact = ({ personalData }) => {
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = async (formData) => {
    setSubmitStatus({ loading: true, success: false, error: null });

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to send message. Please try again.');
      }

      setSubmitStatus({
        loading: false,
        success: true,
        error: null,
      });
      reset();
    } catch (err) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: err.message || 'Something went wrong. Please check your internet connection or email directly.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading subtitle="Get in Touch" title="Contact Me" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Let's discuss something great together
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Whether you have an upcoming project, freelance inquiry, research collaboration, or just want to connect — my inbox is always open.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">Email</span>
                    <a href={`mailto:${personalData.email}`} className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition">
                      {personalData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">Location</span>
                    <span className="font-semibold">{personalData.location}</span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/80">
                <span className="block text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-3">
                  Connect on Socials
                </span>
                <div className="flex items-center gap-3">
                  {personalData.socials.github && (
                    <a
                      href={personalData.socials.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
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
                      className="p-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="glass p-8 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Jane Doe"
                    {...register('name', {
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' },
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition text-sm ${
                      errors.name
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jane@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: 'Please enter a valid email address',
                      },
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition text-sm ${
                      errors.email
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Project Inquiry / Job Opportunity"
                    {...register('subject', {
                      required: 'Subject is required',
                      minLength: { value: 3, message: 'Subject must be at least 3 characters' },
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition text-sm ${
                      errors.subject
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Hello Alex, I'd like to talk about..."
                    {...register('message', {
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                    })}
                    className={`w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition text-sm ${
                      errors.message
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-slate-300 dark:border-slate-700 focus:ring-blue-500'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Feedback notifications */}
                {submitStatus.success && (
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-emerald-500" />
                    <span>Your message was sent successfully! Thank you for reaching out.</span>
                  </div>
                )}

                {submitStatus.error && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-500/20 text-red-700 dark:text-red-300 flex items-start gap-2.5 text-sm">
                    <AlertCircle size={18} className="shrink-0 mt-0.5 text-red-500" />
                    <span>{submitStatus.error}</span>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
                >
                  {submitStatus.loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Sending message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
