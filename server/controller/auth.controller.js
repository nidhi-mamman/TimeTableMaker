const User = require('../model/User')
const bcryptjs = require('bcrypt')
const HOD = require('../model/HOD');
const Teacher = require('../model/Teacher')
const Student = require('../model/Student')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      department,
      yearsOfExperience,
      subject,
      qualification,
      rollNumber,
      course,
      semester
    } = req.body;

    const hashPass = await bcryptjs.hash(password, 10)

    // 1️⃣ Create user (common)
    const user = await User.create({
      name,
      email,
      password: hashPass,
      role
    });

    // 2️⃣ Role-specific creation
    switch (role) {
      case "hod":
        await HOD.create({
          userId: user._id,
          department,
          yearsOfExperience
        });
        break;

      case "teacher":
        await Teacher.create({
          userId: user._id,
          department,
          subject,
          qualification
        });
        break;

      case "student":
        await Student.create({
          userId: user._id,
          rollNumber,
          course,
          semester
        });
        break;

      default:
        return res.status(400).json({ message: "Invalid role" });
    }

    res.status(201).json({
      message: "Signup successful",
      userId: user._id
    });

  } catch (error) {
    res.status(500).json({
      message: "Signup failed",
      error: error.message
    });
  }
};

const MAX_ATTEMPTS = 2;
const LOCK_TIME = 15 * 60 * 1000; //15 minutes

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid email or password" });
    }

    if (user.lockUntil && user.lockUntil > Date.now()) {
      return res.status(423).json({
        msg: "Account locked. Try again later."
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      user.loginAttempts += 1;

      if (user.loginAttempts >= MAX_ATTEMPTS) {
        user.lockUntil = new Date(Date.now() + LOCK_TIME);
      }

      await user.save();

      return res.status(401).json({
        msg: "Invalid email or password"
      });
    }

    // ✅ Reset lock
    user.loginAttempts = 0;
    user.lockUntil = null;

    // 🔐 ACCESS TOKEN
    const accessToken = jwt.sign(
      { userID: user._id, email: user.email },
      process.env.SECRET_KEY,
      { expiresIn: "15m" }
    );

    // 🔐 REFRESH TOKEN
    const refreshToken = jwt.sign(
      { userID: user._id },
      process.env.REFRESH_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // Save refresh token in DB
    user.refreshToken = refreshToken;
    await user.save();

    // Send refresh token as cookie (secure way)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, // true in production https
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      msg: "Signed in successfully",
      role: user.role,
      userId: user._id,
      access:accessToken,
      refresh:refreshToken
    });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}
const logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  const user = await User.findOne({ refreshToken });

  if (user) {
    user.refreshToken = null;
    await user.save();
  }

  res.clearCookie("refreshToken");

  res.json({ msg: "Logged out" });
};

module.exports = { signup, signin,logout};
