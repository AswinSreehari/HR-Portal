import nodemailer from "nodemailer"

interface InterviewEmailData {
  candidateEmail: string
  candidateName: string
  date: string
  time: string
  location: string
  interviewer: string
  meetingLink: string
  interviewType: string
}

export const sendInterviewEmail = async (emailData: InterviewEmailData) => {
  const { candidateEmail, candidateName,  interviewType } = emailData
  // date, time, location, interviewer, meetingLink,
  // Configure email transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Email content with improved template
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: candidateEmail,
    subject: `${interviewType} Interview Invitation - ${candidateName}`,
    html: getEmailTemplate(emailData),
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`Email sent to ${candidateEmail}`)
  } catch (error) {
    console.error("Email sending failed:", error)
    throw new Error("Failed to send email")
  }
}

function getEmailTemplate(data: InterviewEmailData): string {
  const { candidateName, date, time, location, interviewer, meetingLink, interviewType } = data

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Interview Invitation</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          border: 1px solid #e1e1e1;
          border-radius: 8px;
          overflow: hidden;
        }
        .email-header {
          background-color: #4F46E5;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .email-body {
          padding: 30px;
          background-color: #ffffff;
        }
        .email-footer {
          background-color: #f9fafb;
          padding: 20px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
          border-top: 1px solid #e1e1e1;
        }
        .interview-details {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .detail-row {
          margin-bottom: 12px;
          display: flex;
        }
        .detail-label {
          font-weight: bold;
          width: 120px;
          color: #4b5563;
        }
        .detail-value {
          flex: 1;
        }
        .button {
          display: inline-block;
          background-color: #4F46E5;
          color: white;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 4px;
          font-weight: 500;
          margin-top: 20px;
        }
        .greeting {
          font-size: 18px;
          margin-bottom: 20px;
        }
        .message {
          margin-bottom: 20px;
        }
        .signature {
          margin-top: 30px;
        }
        @media only screen and (max-width: 600px) {
          .detail-row {
            flex-direction: column;
          }
          .detail-label {
            width: 100%;
            margin-bottom: 4px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>Interview Invitation</h1>
        </div>
        <div class="email-body">
          <div class="greeting">Hi ${candidateName},</div>
          
          <div class="message">
            We're excited to invite you for a <strong>${interviewType} Interview</strong> with our team. We look forward to discussing your experience and how you might contribute to our organization.
          </div>
          
          <div class="interview-details">
            <div class="detail-row">
              <div class="detail-label">Date:</div>
              <div class="detail-value">${date}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Time:</div>
              <div class="detail-value">${time}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Location:</div>
              <div class="detail-value">${location}</div>
            </div>
            <div class="detail-row">
              <div class="detail-label">Interviewer:</div>
              <div class="detail-value">${interviewer}</div>
            </div>
          </div>
          
          <div style="text-align: center;">
            <a href="${meetingLink}" class="button" target="_blank" style="color: white; text-decoration: none;" >Join Meeting</a>
          </div>
          
          <div class="message" style="margin-top: 30px;">
            Please confirm your attendance by replying to this email. If you need to reschedule or have any questions, please let us know as soon as possible.
          </div>
          
          <div class="signature">
            <p>Best Regards,</p>
            <p><strong>Your Company HR Team</strong></p>
          </div>
        </div>
        <div class="email-footer">
          <p>© ${new Date().getFullYear()} Your Company. All rights reserved.</p>
          <p>This email contains confidential information and is intended only for the named recipient.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

