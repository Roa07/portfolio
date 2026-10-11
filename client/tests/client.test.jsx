import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Navbar } from '../src/components/Navbar';
import { Skills } from '../src/sections/Skills';
import { Projects } from '../src/sections/Projects';
import { Contact } from '../src/sections/Contact';
import { portfolioData } from '../src/config/portfolioData';

describe('Frontend Component Tests', () => {
  it('renders Navbar brand, navigation links, and theme toggle', () => {
    const toggleThemeMock = vi.fn();
    render(
      <Navbar
        theme="dark"
        toggleTheme={toggleThemeMock}
        personalData={portfolioData.personal}
      />
    );

    expect(screen.getByText(portfolioData.personal.name)).toBeInTheDocument();
    expect(screen.getAllByText('Projects').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Skills').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);

    const themeToggleBtn = screen.getByLabelText(/toggle color theme/i);
    fireEvent.click(themeToggleBtn);
    expect(toggleThemeMock).toHaveBeenCalledTimes(1);
  });

  it('filters project cards accurately on category tab click', async () => {
    render(<Projects initialProjects={portfolioData.projects} />);

    // Check that all initial projects render
    expect(screen.getByText(/AI Phishing Detection/i)).toBeInTheDocument();
    expect(screen.getByText(/SQL Validator/i)).toBeInTheDocument();

    // Click on AI/ML filter
    const aimlFilter = screen.getByRole('button', { name: /^AI\/ML$/i });
    fireEvent.click(aimlFilter);

    // AI/ML project should be visible
    expect(screen.getByText(/AI Phishing Detection/i)).toBeInTheDocument();
    // Non AI/ML project should exit and not be in document
    await waitFor(() => {
      expect(screen.queryByText(/SQL Validator/i)).not.toBeInTheDocument();
    });
  });

  it('switches skills categories when clicking skill tabs', () => {
    render(<Skills skillsData={portfolioData.skills} />);

    // Initially Programming Languages is active
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();

    // Click Machine Learning & NLP tab
    const mlTab = screen.getByRole('button', { name: /Machine Learning & NLP/i });
    fireEvent.click(mlTab);

    expect(screen.getByText(/DistilBERT & Transformers/i)).toBeInTheDocument();
    expect(screen.getByText('PyTorch')).toBeInTheDocument();
  });

  it('validates contact form fields and flags errors when submitted empty', async () => {
    render(<Contact personalData={portfolioData.personal} />);

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Subject is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
    });
  });

  it('successfully submits contact form when filled properly', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Message received successfully!',
      }),
    });

    render(<Contact personalData={portfolioData.personal} />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), {
      target: { value: 'Lalit Chaudhari' },
    });
    fireEvent.change(screen.getByLabelText(/Your Email/i), {
      target: { value: 'chaudharivlalit16@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText(/Subject/i), {
      target: { value: 'Collaboration on AI/ML Research' },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: 'Hi Lalit, we would love to discuss an AI/ML and NLP research role.' },
    });

    const submitBtn = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/Your message was sent successfully!/i)).toBeInTheDocument();
    });
  });
});
