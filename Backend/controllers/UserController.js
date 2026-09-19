import bcrypt from "bcryptjs";
import userModel from "../models/User.js";
import sendEmail from "../configs/nodemailer.js";
import jwt from "jsonwebtoken";

// SEND REGISTER OTP EMAIL

const sendRegisterOtpEmail = async (email, name, otp) => {
  await sendEmail({
    to: email,

    subject: "🌸 Verify Your Email - Flower Website",

    html: `
<div style="
  width: 100%;
  margin: 0;
  padding: 40px 15px;
  background-color: #f8f7f5;
  font-family: Arial, Helvetica, sans-serif;
  box-sizing: border-box;
">

  <div style="
    max-width: 560px;
    margin: 0 auto;
    background-color: #ffffff;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid #ece8e5;
    box-shadow: 0 12px 40px rgba(0,0,0,0.07);
  ">

    <!-- HEADER -->

    <div style="
      padding: 38px 25px 32px;
      text-align: center;
      background: linear-gradient(135deg, #fff7f8, #fffdf9);
      border-bottom: 1px solid #f0ece9;
    ">

      <div style="
        width: 72px;
        height: 72px;
        margin: 0 auto 16px;
        background-color: #ffffff;
        border-radius: 50%;
        line-height: 72px;
        font-size: 36px;
        box-shadow: 0 8px 22px rgba(180, 120, 90, 0.12);
      ">
        🌸
      </div>

      <h1 style="
        margin: 0;
        color: #292524;
        font-size: 30px;
        font-weight: 700;
        letter-spacing: 0.5px;
      ">
        Flower
      </h1>

      <p style="
        margin: 8px 0 0;
        color: #9a918c;
        font-size: 13px;
        letter-spacing: 0.3px;
      ">
        Beautiful flowers, beautiful moments
      </p>

    </div>


    <!-- CONTENT -->

    <div style="
      padding: 42px 32px 38px;
      text-align: center;
    ">

      <div style="
        display: inline-block;
        padding: 7px 15px;
        margin-bottom: 15px;
        background-color: #f8f5f2;
        border-radius: 30px;
      ">

        <span style="
          color: #8b6f61;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
        ">
          Email Verification
        </span>

      </div>


      <h2 style="
        margin: 0 0 14px;
        color: #292524;
        font-size: 26px;
        line-height: 1.3;
        font-weight: 700;
      ">
        Verify Your Email 💐
      </h2>


      <p style="
        margin: 0 0 10px;
        color: #44403c;
        font-size: 15px;
        line-height: 1.6;
      ">
        Hello <strong>${name}</strong> 👋
      </p>


      <p style="
        max-width: 420px;
        margin: 0 auto 30px;
        color: #78716c;
        font-size: 14px;
        line-height: 1.8;
      ">
        Welcome to Flower! We're happy to have you with us.
        Enter the verification code below to confirm your email
        and continue creating your account.
      </p>


      <!-- OTP BOX -->

      <div style="
        max-width: 350px;
        margin: 0 auto 25px;
        padding: 26px 20px;
        background: linear-gradient(135deg, #fff8f5, #fff2f4);
        border: 1px solid #f0d9d2;
        border-radius: 18px;
      ">

        <p style="
          margin: 0 0 13px;
          color: #a08d84;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2.5px;
        ">
          Verification Code
        </p>



<div style="
  color: #b4536b;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 5px;
  line-height: 1.3;
  padding-left: 5px;
  white-space: nowrap;
  text-align: center;
">
  ${otp}
</div>



      </div>


      <!-- TIMER -->

      <div style="
        display: inline-block;
        padding: 9px 17px;
        margin-bottom: 22px;
        background-color: #f7f6f4;
        border-radius: 30px;
      ">

        <span style="
          color: #78716c;
          font-size: 12px;
        ">
          ⏱️ This code expires in
          <strong style="color: #44403c;">
            10 minutes
          </strong>
        </span>

      </div>


      <p style="
        max-width: 400px;
        margin: 0 auto;
        color: #a8a29e;
        font-size: 11px;
        line-height: 1.8;
      ">
        For your security, never share this verification code
        with anyone. If you didn't request this code, you can
        safely ignore this email.
      </p>

    </div>


    <!-- FOOTER -->

    <div style="
      padding: 25px 20px;
      text-align: center;
      background-color: #faf9f7;
      border-top: 1px solid #eeeae7;
    ">

      <p style="
        margin: 0 0 7px;
        color: #57504c;
        font-size: 14px;
        font-weight: 700;
      ">
        Flower 🌸
      </p>

      <p style="
        margin: 0;
        color: #a8a29e;
        font-size: 11px;
      ">
        Thank you for choosing Flower.
      </p>

      <p style="
        margin: 11px 0 0;
        color: #c4bfbb;
        font-size: 10px;
      ">
        © 2026 Flower. All rights reserved.
      </p>

    </div>

  </div>

</div>
`,
  });
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, phone, email, password, role } = req.body;

    // Check required fields

    if (!name || !phone || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check existing user

    const existingUser = await userModel.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6 digit OTP

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP expires after 10 minutes

    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    // Create user

    const newUser = new userModel({
      name,

      phone,

      email,

      password: hashedPassword,

      otp,

      otpExpire,
      role,

      isVerified: false,
    });

    // Send OTP email

    await sendRegisterOtpEmail(email, name, otp);

    // Save user

    await newUser.save();

    return res.status(201).json({
      success: true,

      message: "User registered successfully. OTP sent to your email.",
      data: email,
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      success: false,

      message: "Registration failed",
    });
  }
};
// VERIFY REGISTER OTP
export const verifyRegisterOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;

    // Check required fields

    if (!email || !otp) {
      return res.status(400).json({
        success: false,

        message: "Email and OTP are required",
      });
    }

    // Find user

    const userExist = await userModel.findOne({
      email,
    });

    if (!userExist) {
      return res.status(404).json({
        success: false,

        message: "User not found",
      });
    }

    // Check already verified

    if (userExist.isVerified) {
      return res.status(400).json({
        success: false,

        message: "Email is already verified",
      });
    }

    // Check OTP

    if (otp !== userExist.otp) {
      return res.status(400).json({
        success: false,

        message: "Invalid OTP",
      });
    }

    // Check OTP expiry

    if (!userExist.otpExpire || Date.now() > userExist.otpExpire.getTime()) {
      return res.status(400).json({
        success: false,

        message: "OTP has expired",
      });
    }

    // Verify user

    userExist.isVerified = true;

    userExist.otp = null;

    userExist.otpExpire = null;

    // Save changes

    await userExist.save();

    return res.status(200).json({
      success: true,

      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP Error:", error);

    return res.status(500).json({
      success: false,

      message: "OTP verification failed",
    });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const userExist = await userModel.findOne({ email });

    if (!userExist) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check email verification
    if (!userExist.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }

    // Check password
    const checkPassword = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!checkPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: userExist._id,
        role: userExist.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      partitioned: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Login successful
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        role: userExist.role,
        phone:userExist.phone
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // OTP valid for 10 minutes
    const otpExpire = new Date(Date.now() + 10 * 60 * 1000);

    // Save OTP
    user.otp = otp;
    user.otpExpire = otpExpire;

    await user.save();

    // Send email
    await sendEmail({
      to: email,
      subject: "Flower - Password Reset OTP",
      html: `
        <div style="
          max-width:560px;
          margin:0 auto;
          padding:30px 15px;
          background:#f8f7f5;
          font-family:Arial,sans-serif;
        ">

          <div style="
            background:#ffffff;
            border-radius:22px;
            overflow:hidden;
            text-align:center;
            box-shadow:0 10px 35px rgba(0,0,0,0.08);
          ">

            <div style="
              padding:35px 20px;
              background:#fff7f8;
              border-bottom:1px solid #eee;
            ">

              <div style="
                font-size:42px;
                margin-bottom:10px;
              ">
                🌸
              </div>

              <h1 style="
                margin:0;
                color:#292524;
                font-size:30px;
              ">
                Flower
              </h1>

              <p style="
                color:#999;
                font-size:13px;
                margin-top:8px;
              ">
                Beautiful flowers, beautiful moments
              </p>

            </div>

            <div style="padding:40px 25px;">

              <p style="
                color:#a16b78;
                font-size:11px;
                font-weight:bold;
                letter-spacing:2px;
                text-transform:uppercase;
              ">
                Password Reset
              </p>

              <h2 style="
                color:#292524;
                font-size:25px;
                margin-bottom:15px;
              ">
                Reset Your Password 🔐
              </h2>

              <p style="
                color:#666;
                font-size:14px;
                line-height:1.7;
              ">
                We received a request to reset your Flower account
                password. Use the OTP below to continue.
              </p>

              <div style="
                margin:30px auto;
                max-width:320px;
                padding:25px 15px;
                background:#fff5f7;
                border:1px solid #efd7dc;
                border-radius:16px;
              ">

                <p style="
                  margin:0 0 12px;
                  color:#999;
                  font-size:10px;
                  letter-spacing:2px;
                  font-weight:bold;
                ">
                  YOUR OTP
                </p>

                <div style="
                  color:#b4536b;
                  font-size:30px;
                  font-weight:bold;
                  letter-spacing:4px;
                  white-space:nowrap;
                ">
                  ${otp}
                </div>

              </div>

              <p style="
                color:#777;
                font-size:12px;
              ">
                ⏱️ This OTP expires in
                <strong>10 minutes</strong>.
              </p>

              <p style="
                color:#aaa;
                font-size:11px;
                line-height:1.7;
                margin-top:25px;
              ">
                If you didn't request a password reset,
                you can safely ignore this email.
              </p>

            </div>

            <div style="
              padding:20px;
              background:#faf9f7;
              border-top:1px solid #eee;
            ">

              <p style="
                margin:0;
                color:#777;
                font-size:12px;
              ">
                Flower 🌸
              </p>

              <p style="
                margin:7px 0 0;
                color:#aaa;
                font-size:10px;
              ">
                © 2026 Flower. All rights reserved.
              </p>

            </div>

          </div>

        </div>
      `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
      data: email,
    });
  } catch (error) {
    console.error("Forget Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP",
    });
  }
};
export const forgetPasswordOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // OTP expired check
    if (!user.otpExpire || user.otpExpire < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired",
      });
    }

    // OTP check
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // OTP verified
    user.otp = null;
    user.otpExpire = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      data: email,
    });
  } catch (error) {
    console.error("Forget Password OTP Error:", error);

    return res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Find user
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;
    user.isVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
      data: email,
    });
  } catch (error) {
    console.error("Update Password Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};
// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;

    // Check required fields
    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    // Find logged-in user
    const user = await userModel.findById(req.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update profile
    user.name = name.trim();
    user.phone = phone.trim();

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};
export const updateProfilePassword = async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    // Logged-in user ko req.id se find karenge
    const user = await userModel.findById(req.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password
    user.password = hashedPassword;
    user.isVerified = true;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(
      "Update Profile Password Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update password",
    });
  }
};