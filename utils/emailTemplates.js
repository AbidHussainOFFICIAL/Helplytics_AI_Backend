const APP_NAME = 'Helplytics AI';
const SUPPORT_EMAIL = 'Helplytics@yourapp.com';

const baseTemplate = ({ title, content }) => {
  return `
  <!DOCTYPE html>
  <html>
  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    
    <!-- Hidden Preheader (Email Preview Text) -->
    <span style="display:none;opacity:0;color:transparent;height:0;width:0;">
      Secure OTP for your account
    </span>

    <div style="max-width:500px;margin:40px auto;background:#ffffff;border-radius:8px;padding:30px;text-align:center;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
      
      <!-- Logo / App Name -->
      <div style="font-size:22px;font-weight:bold;color:#4f46e5;margin-bottom:20px;">
        ${APP_NAME}
      </div>

      <!-- Title -->
      <h1 style="font-size:22px;margin-bottom:10px;color:#111;">
        ${title}
      </h1>

      <!-- Dynamic Content -->
      <div style="color:#555;font-size:14px;line-height:1.6;">
        ${content}
      </div>

      <!-- Divider -->
      <hr style="margin:30px 0;border:none;border-top:1px solid #eee;" />

      <!-- Footer -->
      <p style="font-size:12px;color:#999;margin:0;">
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="font-size:12px;color:#999;margin:10px 0 0;">
        Never share this code with anyone.
      </p>

      <p style="font-size:12px;color:#999;margin:10px 0 0;">
        Need help? Contact <a href="mailto:${SUPPORT_EMAIL}" style="color:#4f46e5;text-decoration:none;">${SUPPORT_EMAIL}</a>
      </p>

    </div>
  </body>
  </html>
  `;
};

// Email Verification
const verifyEmailTemplate = (otp) => {
  return baseTemplate({
    title: 'Verify Your Email',
    content: `
      <p>Use the OTP below to verify your email address:</p>

      <div style="font-size:32px;font-weight:bold;letter-spacing:4px;margin:20px 0;color:#111;">
        ${otp}
      </div>

      <p>This code will expire in <strong>10 minutes</strong>.</p>
    `,
  });
};

// Reset Password (after user already initiated reset)
const resetPasswordTemplate = (otp) => {
  return baseTemplate({
    title: 'Reset Your Password',
    content: `
      <p>Use the OTP below to reset your password:</p>

      <div style="font-size:32px;font-weight:bold;letter-spacing:4px;margin:20px 0;color:#111;">
        ${otp}
      </div>

      <p>This code will expire in <strong>10 minutes</strong>.</p>
    `,
  });
};

// Forgot Password (initial request)
const forgotPasswordTemplate = (otp) => {
  return baseTemplate({
    title: 'Forgot Password Request',
    content: `
      <p>We received a request to reset your password.</p>

      <div style="font-size:32px;font-weight:bold;letter-spacing:4px;margin:20px 0;color:#111;">
        ${otp}
      </div>

      <p>This code will expire in <strong>10 minutes</strong>.</p>
    `,
  });
};

module.exports = {
  verifyEmailTemplate,
  resetPasswordTemplate,
  forgotPasswordTemplate,
};