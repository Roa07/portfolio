import nodemailer from 'nodemailer';

export const sendContactNotification = async ({ name, email, subject, message }) => {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const port = parseInt(process.env.EMAIL_PORT, 10) || 587;
  const secure = process.env.EMAIL_SECURE === 'true';
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || user;

  // Check if SMTP is unconfigured or left with unpopulated placeholder password
  const isUnconfigured = !host || !user || !pass || pass === 'your_app_specific_password' || pass === 'your-email-app-password';

  if (isUnconfigured) {
    if (process.env.NODE_ENV === 'test') {
      return {
        success: true,
        simulated: true,
        message: 'Email notification simulated for test environment',
      };
    }

    console.warn(`[Nodemailer Notice] Email sending cannot proceed: Missing or placeholder SMTP credentials in server environment variables (EMAIL_HOST=${host}, EMAIL_USER=${user}).`);
    return {
      success: false,
      unconfigured: true,
      error: 'Email service is currently unconfigured. Please configure EMAIL_USER and EMAIL_PASS (App Password) in the server environment.',
    };
  }

  try {
    const isGmail = host === 'smtp.gmail.com' || process.env.EMAIL_SERVICE === 'gmail';
    
    const transportOptions = isGmail
      ? {
          service: 'gmail',
          auth: {
            user,
            pass,
          },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 20000,
        }
      : {
          host,
          port,
          secure: secure || port === 465,
          auth: {
            user,
            pass,
          },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 20000,
          tls: {
            rejectUnauthorized: process.env.NODE_ENV === 'production',
          },
        };

    const transporter = nodemailer.createTransport(transportOptions);

    const mailOptions = {
      from: `"${name.replace(/["\r\n]/g, '')} via Portfolio" <${user}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `[Portfolio Contact] ${subject.replace(/[\r\n]/g, '')}`,
      text: `You have received a new message from your portfolio website:
      
Sender Name: ${name}
Sender Email: ${email}
Subject: ${subject}
Date: ${new Date().toLocaleString()}

Message:
${message}
      `,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #2563eb, #4f46e5); color: #ffffff; padding: 24px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New Portfolio Contact Message</h2>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <p style="margin: 0 0 8px 0;"><strong>Sender Name:</strong> ${name}</p>
            <p style="margin: 0 0 8px 0;"><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></p>
            <p style="margin: 0 0 16px 0;"><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #64748b; letter-spacing: 0.05em;">Message Body:</h3>
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap; font-size: 14px; color: #334155;">
              ${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 14px 24px; font-size: 12px; color: #64748b; text-align: center;">
            Sent directly from your Personal Portfolio Website Contact Form
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[Nodemailer Success] Contact notification email successfully dispatched (messageId: ${info.messageId}) to ${receiverEmail}`);
    return {
      success: true,
      simulated: false,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error(`[Nodemailer Delivery Error]: Code: ${error.code || 'UNKNOWN'} | Message: ${error.message}`);
    return {
      success: false,
      unconfigured: false,
      code: error.code,
      error: error.message || 'SMTP transport failed to deliver message',
    };
  }
};
