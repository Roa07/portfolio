import nodemailer from 'nodemailer';

export const sendContactNotification = async ({ name, email, subject, message }) => {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const port = parseInt(process.env.EMAIL_PORT, 10) || 465;
  const secure = process.env.EMAIL_SECURE !== 'false'; // default to true for port 465 SSL
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || user;
  const resendApiKey = process.env.RESEND_API_KEY;

  // 1. Resend HTTP API Strategy (Bypasses Render's complete SMTP block)
  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [receiverEmail],
          reply_to: email,
          subject: `[Portfolio Contact] ${subject.replace(/[\r\n]/g, '')}`,
          text: `You have received a new message from your portfolio website:\n\nSender Name: ${name}\nSender Email: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background: linear-gradient(135deg, #2563eb, #4f46e5); color: #ffffff; padding: 20px; text-align: center;">
                <h2 style="margin: 0; font-size: 20px;">New Portfolio Contact Message</h2>
              </div>
              <div style="padding: 24px; background-color: #ffffff;">
                <p><strong>Sender:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">
                  ${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
                </div>
              </div>
            </div>
          `,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(`[Resend HTTP API Success] Dispatched message ID: ${data.id} to ${receiverEmail}`);
        return { success: true, simulated: false, messageId: data.id };
      } else {
        console.error('[Resend API Error]:', data);
      }
    } catch (err) {
      console.error('[Resend Fetch Error]:', err.message);
    }
  }

  // 2. Check if SMTP is unconfigured or placeholder
  const isUnconfigured = !host || !user || !pass || pass === 'your_app_specific_password' || pass === 'your-email-app-password';

  if (isUnconfigured) {
    if (process.env.NODE_ENV === 'test') {
      return {
        success: true,
        simulated: true,
        message: 'Email notification simulated for test environment',
      };
    }

    console.warn(`[Email Notice] Unconfigured credentials (HOST=${host}, USER=${user}).`);
    return {
      success: false,
      unconfigured: true,
      error: 'Email service is unconfigured in server environment variables.',
    };
  }

  // 3. SMTP Transport (Works locally or on unblocked hosts)
  try {
    const isGmail = host === 'smtp.gmail.com' || process.env.EMAIL_SERVICE === 'gmail' || user.endsWith('@gmail.com');
    
    const transportOptions = isGmail
      ? {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user,
            pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
        }
      : {
          host,
          port,
          secure,
          auth: {
            user,
            pass,
          },
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 15000,
        };

    const transporter = nodemailer.createTransport(transportOptions);

    const mailOptions = {
      from: `"${name.replace(/["\r\n]/g, '')} via Portfolio" <${user}>`,
      replyTo: email,
      to: receiverEmail,
      subject: `[Portfolio Contact] ${subject.replace(/[\r\n]/g, '')}`,
      text: `New Portfolio Message:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #2563eb, #4f46e5); color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 20px;">New Portfolio Contact Message</h2>
          </div>
          <div style="padding: 24px; background-color: #ffffff;">
            <p><strong>Sender:</strong> ${name} (&lt;<a href="mailto:${email}">${email}</a>&gt;)</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
            <div style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; white-space: pre-wrap;">
              ${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`[SMTP Success] Dispatched email (messageId: ${info.messageId}) to ${receiverEmail}`);
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
