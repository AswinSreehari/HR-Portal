import nodemailer from "nodemailer";

export const sendInterviewEmail = async (emailData: any) => {
  const { candidateEmail, candidateName, date, time, location, interviewer, meetingLink } = emailData;

  // Configure email transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: candidateEmail,
    subject: `Interview Invitation - ${candidateName}`,
    html: `
      <p>Hi ${candidateName},</p>
      <p>We are pleased to invite you for an interview.</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Location:</strong> ${location}</p>
      <p><strong>Interviewer:</strong> ${interviewer}</p>
      <p>Meeting Link: <a href="${meetingLink}" target="_blank">${meetingLink}</a></p>
      <hr/>
      <p>Best Regards,</p>
      <p>Your Company HR Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${candidateEmail}`);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};
