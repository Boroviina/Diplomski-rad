const nodemailer = require('nodemailer')
const config = require('../config/config');
const transport = nodemailer.createTransport(config.email.smtp);


const sendEmail = async (to, subject, text, html = undefined) => {
    const msg = {from: config.email.from, to, subject, text, html: html ? `<div>${html}</div>` : undefined};
    await transport.sendMail(msg);
};

const sendSuccessfulProbblemApplicationEmail = async (to, name) => {
    const subject = "Job application submitted";
    const text = `Dear ${name}, your job application has been successfully submitted.`;
    const html = `
    <div>
      <p>Dear <b>${name}</b>,</p>
      <p>Your job application has been successfully submitted.</p>
      <p>Thank you for applying.</p>
    </div>
  `;
    await sendEmail(to, subject, text, html);
};

module.exports = {sendSuccessfulProbblemApplicationEmail}