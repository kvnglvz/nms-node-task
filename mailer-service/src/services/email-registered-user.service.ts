import nodemailer from 'nodemailer';

export default async function emailRegisteredUserService (
  { email, username }
) {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const info = await transporter.sendMail({
    from: '"No-Reply 👻" <no-reply@nms.com.ph>',
    to: email,
    subject: 'Successfully Registered ✔',
    text: `Welcome ${username}`,
    html: `<b>Welcome ${username}</b>`,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}