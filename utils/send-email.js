const mailgun = require("mailgun-js");

const sendEmail = async (email, subject, text) => {
  try {
    const mg = mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
      retry: 5
    });

    const data = {
      from: `${subject} <no-reply@delivpro.com>`,
      to: email,
      // bcc: ,
      subject,
      html: `<h1>${subject}</h1><p>Here is your verification code: <b>${text}</b></p>`
    };

    await mg.messages().send(data);

    console.log("email sent successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;