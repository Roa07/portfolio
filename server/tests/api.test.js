import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import request from 'supertest';
import app from '../src/server.js';
import * as emailService from '../src/utils/emailService.js';

describe('Server API Endpoints', () => {
  it('GET /api/health should return 200 and healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('database');
  });

  it('GET /api/projects should return list of projects', async () => {
    const res = await request(app).get('/api/projects');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThanOrEqual(4);
  });

  it('POST /api/contact should fail when required fields are missing', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: '',
        email: 'invalid-email',
      });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  it('POST /api/contact should succeed with valid inputs when email succeeds', async () => {
    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Jane Doe',
        email: 'jane@example.com',
        subject: 'Collaboration opportunity',
        message: 'Hello, I saw your portfolio and would love to collaborate on a project.',
      });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Jane Doe');
    expect(res.body.data.email).toBe('jane@example.com');
  });

  it('POST /api/contact should return 502 error and save locally when SMTP delivery fails', async () => {
    const emailSpy = vi.spyOn(emailService, 'sendContactNotification').mockResolvedValueOnce({
      success: false,
      unconfigured: false,
      code: 'ESOCKET',
      error: 'Connection timeout with mail server',
    });

    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'John Smith',
        email: 'john@example.com',
        subject: 'Project inquiry',
        message: 'Testing connection failure scenario in contact endpoint.',
      });

    expect(res.status).toBe(502);
    expect(res.body.success).toBe(false);
    expect(res.body.savedLocally).toBe(true);
    expect(res.body.message).toContain('Failed to deliver notification email');
    expect(res.body.data).toHaveProperty('id');

    emailSpy.mockRestore();
  });

  it('POST /api/contact should return 503 error when email service is unconfigured', async () => {
    const emailSpy = vi.spyOn(emailService, 'sendContactNotification').mockResolvedValueOnce({
      success: false,
      unconfigured: true,
      error: 'Email service is unconfigured',
    });

    const res = await request(app)
      .post('/api/contact')
      .send({
        name: 'Alice Wonder',
        email: 'alice@example.com',
        subject: 'Consulting request',
        message: 'Testing unconfigured SMTP credentials scenario.',
      });

    expect(res.status).toBe(503);
    expect(res.body.success).toBe(false);
    expect(res.body.savedLocally).toBe(true);
    expect(res.body.message).toContain('Email service is temporarily unconfigured');

    emailSpy.mockRestore();
  });
});
