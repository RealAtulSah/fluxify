import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLeadNotification(lead: {
  name: string;
  email: string;
  businessName?: string;
  phone?: string;
  service?: string;
  budget?: string;
  message?: string;
}) {
  if (!process.env.SMTP_USER || !process.env.NOTIFICATION_EMAIL) {
    console.log('Email not configured, skipping notification');
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: process.env.NOTIFICATION_EMAIL,
      subject: `🔥 New Lead: ${lead.name} - ${lead.businessName || 'N/A'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #7B2FFF, #FF6B35); padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0;">New Lead Received! 🎉</h1>
          </div>
          <div style="padding: 24px; background: #f9f9f9; border-radius: 0 0 12px 12px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold;">Name:</td><td>${lead.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${lead.email}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Business:</td><td>${lead.businessName || 'N/A'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td>${lead.phone || 'N/A'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Service:</td><td>${lead.service || 'N/A'}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Budget:</td><td>${lead.budget || 'N/A'}</td></tr>
            </table>
            ${lead.message ? `<div style="margin-top: 16px; padding: 16px; background: white; border-radius: 8px;"><strong>Message:</strong><p>${lead.message}</p></div>` : ''}
          </div>
        </div>
      `,
    });
    console.log('Lead notification email sent successfully');
  } catch (error) {
    console.error('Failed to send lead notification:', error);
  }
}
