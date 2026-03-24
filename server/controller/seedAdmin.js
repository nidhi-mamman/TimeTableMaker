// seedAdmin.js
const bcrypt = require("bcrypt");
const User = require("../model/User");
const Admin = require("../model/Admin");

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL;

  const exists = await User.findOne({ email });
  if (exists) {
    console.log("Admin already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    10
  );

  const user = await User.create({
    name: "Super Admin",
    email,
    password: hashedPassword,
    role: "admin"
  });

  await Admin.create({
    userId: user._id,
    permissions: ["ALL"]
  });

  console.log("Admin created successfully");
};

module.exports = seedAdmin;
