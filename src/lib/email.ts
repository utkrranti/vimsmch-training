import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── Shared layout ────────────────────────────────────────────────────────────
function layout(content: string, previewText: string = "") {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>VIMSMCH Vocational Training</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;600;700&display=swap');
  body { margin:0; padding:0; background:#f1f5f7; font-family:'Work Sans',Arial,sans-serif; color:#010608; }
  .wrap { max-width:600px; margin:0 auto; }
  .header { background:linear-gradient(135deg,#011e2c 0%,#04415f 60%,#065a82 100%); padding:36px 40px; text-align:center; }
  .header-sub { color:rgba(255,255,255,0.55); font-size:11px; letter-spacing:0.18em; text-transform:uppercase; margin-top:6px; }
  .card { background:#ffffff; border-radius:0 0 16px 16px; overflow:hidden; box-shadow:0 8px 32px rgba(0,0,0,0.08); }
  .body { padding:36px 40px; }
  .accent-bar { height:4px; background:linear-gradient(90deg,#04415f,#2086b8,#04415f); }
  .tag { display:inline-block; background:#e6edf0; color:#04415f; font-size:11px; font-weight:600; letter-spacing:0.05em; padding:4px 12px; border-radius:20px; }
  .course-box { background:#f1f5f7; border-left:4px solid #04415f; border-radius:0 12px 12px 0; padding:16px 20px; margin:20px 0; }
  .course-box .label { color:#010608; opacity:0.45; font-size:10px; text-transform:uppercase; letter-spacing:0.12em; margin-bottom:4px; }
  .course-box .name { color:#011e2c; font-size:16px; font-weight:700; }
  h1 { color:#011e2c; font-size:22px; font-weight:700; margin:0 0 6px; }
  p { color:#010608; opacity:0.65; font-size:14px; line-height:1.7; margin:12px 0; }
  .strong { color:#011e2c; font-weight:600; opacity:1; }
  .btn { display:inline-block; background:#04415f; color:#ffffff !important; text-decoration:none; font-weight:600; font-size:14px; padding:14px 28px; border-radius:10px; margin:20px 0 8px; }
  .divider { height:1px; background:#e6edf0; margin:24px 0; }
  .info-row { display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid #f1f5f7; font-size:13px; }
  .info-row .key { color:#010608; opacity:0.45; }
  .info-row .val { color:#011e2c; font-weight:500; text-align:right; max-width:60%; }
  .footer { background:#011e2c; padding:24px 40px; text-align:center; border-radius:0 0 16px 16px; }
  .footer p { color:rgba(255,255,255,0.4); font-size:11px; margin:4px 0; opacity:1; }
  .footer a { color:rgba(255,255,255,0.6); text-decoration:none; }
  .steps { counter-reset:step; }
  .step { display:flex; gap:14px; margin:14px 0; align-items:flex-start; }
  .step-num { flex-shrink:0; width:28px; height:28px; background:#04415f; color:#fff; border-radius:50%; font-size:12px; font-weight:700; display:flex; align-items:center; justify-content:center; }
  .step-text { color:#010608; opacity:0.7; font-size:13px; line-height:1.6; padding-top:4px; }
  .reply-box { background:#f8fafb; border:1px solid #e6edf0; border-radius:12px; padding:20px 24px; margin:16px 0; }
  .reply-box p { font-size:14px; line-height:1.7; color:#011e2c; opacity:0.8; margin:0; white-space:pre-wrap; }
</style>
</head>
<body>
${previewText ? `<div style="display:none;max-height:0;overflow:hidden;">${previewText}</div>` : ""}
<div class="wrap">
  <div class="header">
    <div style="font-size:13px;color:rgba(255,255,255,0.9);font-weight:700;letter-spacing:0.04em;">VIMSMCH</div>
    <div class="header-sub">Dr. Vithalrao Vikhe Patil Foundation · Vocational Training Division</div>
  </div>
  <div class="card">
    <div class="accent-bar"></div>
    <div class="body">${content}</div>
    <div class="footer">
      <p>VIMSMCH, Ahmednagar-Vilad Road, Gangapur Road, Ahmednagar 414 111</p>
      <p>📞 +91 241 230 6600 &nbsp;·&nbsp; <a href="mailto:support@vimsmch.edu.in">support@vimsmch.edu.in</a></p>
      <p style="margin-top:12px;font-size:10px;opacity:0.4;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</div>
</body>
</html>`;
}

// ─── Templates ────────────────────────────────────────────────────────────────
export function inquiryConfirmationHtml(name: string, courseName?: string) {
  return layout(`
    <h1>Thank you, ${name}!</h1>
    <p>We have received your enquiry and our admissions counsellor will get back to you within <span class="strong">1 working day</span>.</p>
    ${courseName ? `
    <div class="course-box">
      <div class="label">You enquired about</div>
      <div class="name">${courseName}</div>
    </div>` : ""}
    <div class="divider"></div>
    <p style="font-size:13px;">Here's what happens next:</p>
    <div class="steps">
      <div class="step"><div class="step-num">1</div><div class="step-text">Our counsellor reviews your enquiry</div></div>
      <div class="step"><div class="step-num">2</div><div class="step-text">You receive a call or WhatsApp message from our team</div></div>
      <div class="step"><div class="step-num">3</div><div class="step-text">We share admission details and fee payment process</div></div>
      <div class="step"><div class="step-num">4</div><div class="step-text">You secure your seat by completing enrolment</div></div>
    </div>
    <div class="divider"></div>
    <p style="font-size:12px;">If you have urgent queries, call us at <span class="strong">+91 241 230 6600</span> or email <a href="mailto:support@vimsmch.edu.in" style="color:#04415f;">support@vimsmch.edu.in</a></p>
  `, `Your enquiry for ${courseName ?? "a vocational course"} has been received.`);
}

export function adminNewInquiryHtml(data: {
  name: string;
  phone: string;
  email?: string | null;
  courseName?: string | null;
  message?: string | null;
}) {
  return layout(`
    <span class="tag">New Enquiry</span>
    <h1 style="margin-top:16px;">New inquiry received</h1>
    <p>A new course enquiry has been submitted on the vocational training portal.</p>
    <div class="divider"></div>
    <div class="info-row"><span class="key">Name</span><span class="val">${data.name}</span></div>
    <div class="info-row"><span class="key">Phone</span><span class="val">${data.phone}</span></div>
    <div class="info-row"><span class="key">Email</span><span class="val">${data.email || "—"}</span></div>
    <div class="info-row"><span class="key">Course</span><span class="val">${data.courseName || "General"}</span></div>
    ${data.message ? `<div class="divider"></div><p style="font-size:12px;color:#010608;opacity:0.5;margin-bottom:4px;">Message</p><div class="reply-box"><p>${data.message}</p></div>` : ""}
    <div class="divider"></div>
    <a href="${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/admin/inquiries" class="btn">View in Admin Panel →</a>
  `, `New enquiry from ${data.name}`);
}

export function inquiryReplyHtml(name: string, courseName: string | null, replyMessage: string) {
  return layout(`
    <h1>Response to your enquiry</h1>
    <p>The VIMSMCH Vocational Training Division has responded to your enquiry${courseName ? ` about <span class="strong">${courseName}</span>` : ""}.</p>
    <div class="divider"></div>
    <p style="font-size:12px;color:#010608;opacity:0.45;margin-bottom:6px;">Message from our counsellor</p>
    <div class="reply-box"><p>${replyMessage}</p></div>
    <div class="divider"></div>
    <p style="font-size:13px;">If you have further questions, please feel free to reach out:</p>
    <p style="font-size:13px;">📞 <span class="strong">+91 241 230 6600</span><br/>📧 <a href="mailto:support@vimsmch.edu.in" style="color:#04415f;">support@vimsmch.edu.in</a></p>
    <p style="font-size:12px;opacity:0.5;">We look forward to welcoming you to VIMSMCH Vocational Training!</p>
  `, `Reply from VIMSMCH regarding your enquiry`);
}

// ─── Send helper ──────────────────────────────────────────────────────────────
export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  if (!process.env.SMTP_USER) return; // silently skip if not configured
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to,
    subject,
    html,
  });
}
