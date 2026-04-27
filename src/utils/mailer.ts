import nodemailer from "nodemailer"


export const sendOTP = async (email: string, otp: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER as string,
            pass: process.env.EMAIL_PASS as string
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    await transporter.sendMail({
        from: `"Service App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        html: `
    <div style="font-family: Arial, sans-serif; background-color:#f4f4f4; padding:20px;">
      <div style="max-width:500px; margin:auto; background:white; padding:20px; border-radius:10px; text-align:center;">
        
        <h2 style="color:#333;">🔐 Verify Your Email</h2>
        
        <p style="color:#555;">Use the OTP below to verify your account</p>
        
        <div style="margin:20px 0; font-size:30px; font-weight:bold; letter-spacing:5px; color:#4CAF50;">
          ${otp}
        </div>

        <p style="color:#999;">This OTP is valid for 5 minutes</p>

        <hr />

        <p style="font-size:12px; color:#aaa;">
          If you didn’t request this, ignore this email.
        </p>

      </div>
    </div>
  `
    });
}

