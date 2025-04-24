const HOD = require('../model/index')
const bcrypt = require("bcryptjs")

function capitalizeName(fname) {
    return fname
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

const createHOD = async (req, res) => {
    try {
        const { fname, email, password, securityQuestion, securityAnswer } = req.body
        if (!securityAnswer || !securityQuestion || !fname || !email || !password) {
            return res.status(400).json({ msg: "Please enter all fields" })
        }

        //Regex for name,email,password for entry validations
        const namePattern = /^[A-Za-z]+(\s[A-Za-z]+)*$/;
        const emailPattern =
            /^[a-zA-Z0-9](?!.*\.\.)[a-zA-Z0-9._]*[a-zA-Z0-9]@(gmail\.com|yahoo\.com)$/;
        const passwordPattern =
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

        const formattedName = capitalizeName(fname);

        if (!formattedName || !email || !password || !securityQuestion || !securityAnswer) {
            return res.status(400).json({
                msg: "Please Enter all fields.",
            });
        }

        if (!namePattern.test(formattedName)) {
            return res.status(400).json({
                msg: "Name should only contain alphabets",
            });
        }

        if (!emailPattern.test(email)) {
            return res.status(400).json({
                msg: "Invalid email! Use a valid Gmail or Yahoo email (e.g., example@gmail.com).",
            });
        }

        if (!passwordPattern.test(password)) {
            return res.status(400).json({
                msg: "Password must have atleast 8 characters containing alphanumerics(lowercase and uppercase),special symbols",
            });
        }

        const existingUser = await HOD.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                msg: "HOD already exists.",
            });
        }
        const encPassword = await bcrypt.hash(password, 10)
        const hashedAnswer = await bcrypt.hash(securityAnswer, 10);

        const hod = await HOD.create({
            fname: formattedName,
            email: email,
            password: encPassword,
            securityQuestion: securityQuestion,
            securityAnswer: hashedAnswer
        })

        if (hod) {
            return res.status(200).json({
                msg: "Signed Up successfully",
                hod: hod
            })
        }

    } catch (error) {
        return res.status(500).json({ msg: error })
    }

}


const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                msg: "Please enter the fields!"
            })
        }
        const hod = await HOD.findOne({ email })
        if (!hod) {
            return res.status(400).json({
                msg: "HOD not found"
            })
        }
        const passwordMatch = await bcrypt.compare(password, hod.password);
        if (passwordMatch) {
            return res.status(200).json({
                msg: "Signed In successfully",
                hod: hod
            })
        } else {
            return res.status(400).json({
                msg: "Invalid email or password"
            })
        }
    } catch (error) {
        console.error("SignIn error:", error);
        return res.status(500).json({ msg: error })
    }
}

const getSecurityQuestion = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: "Email is required." });
    }

    const user = await HOD.findOne({ email });

    if (!user) {
        return res.status(404).json({ msg: "User not found." });
    }

    return res.status(200).json({
        email: user.email,
        securityQuestion: user.securityQuestion
    });
};


const verifySecurityAnswer = async (req, res) => {
    try {
        const { email, securityAnswer } = req.body;

        if (!email || !securityAnswer) {
            return res.status(400).json({ msg: "Email and security answer are required." });
        }

        const hod = await HOD.findOne({ email });

        if (!hod) {
            return res.status(404).json({ msg: "User not found." });
        }

        const isMatch = await bcrypt.compare(securityAnswer, hod.securityAnswer);
        if (!isMatch) {
            return res.status(401).json({ msg: "Incorrect security answer." });
        }

        return res.status(200).json({ msg: "Answer verified. Proceed to reset password." });

    } catch (error) {
        console.error("Error in verifySecurityAnswer:", error);
        return res.status(500).json({ msg: "Internal server error.", error: error.message });
    }
};


const resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await HOD.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ success: true, msg: 'Password reset successful' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server error' });
    }
};


module.exports = { createHOD, SignIn, getSecurityQuestion, verifySecurityAnswer, resetPassword }