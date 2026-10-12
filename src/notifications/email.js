async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const from = process.env.SENDGRID_FROM_EMAIL;
  if (!apiKey || !from) {
    console.warn('SendGrid not configured, skipping email');
    return null;
  }

  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(apiKey);

  const msg = { to, from, subject, html };
  const result = await sgMail.send(msg);
  return result;
}

module.exports = { sendEmail };
