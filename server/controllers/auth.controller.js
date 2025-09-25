import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";
import db from "../models/index.js";
import VerificationToken from "../models/verificationToken.model.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/email.js";
import path from "path";

const User = db.User;
// const Admin = db.Admin;
// const Teacher = db.Teacher;
// const Judge = db.Judge;
// const VerificationToken = VerificationToken;

//Register
const signUp = async (req, res) => {
  const { email, password, type, name, school, phone } = req.body;
  try {
    //Check validation request
    if (!email || !password || !type || !name) {
      return res
        .status(400)
        .send({ message: "Email, password, type and name are requird !" });
    }
    //Validate user type
    const allowedType = ["admin", "teacher", "judge"];
    if (!allowedType.includes(type)) {
      return res.status(400).send({
        message: "In valid user type. Must be admin,teacher or judge",
      });
    }
    //Addition validation
    if (type === "teacher" && (!school || !phone)) {
      return res
        .status(400)
        .send({ message: "school and phone are required for teacher!" });
    }

    //check if user already exists
    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingUser) {
      return res.status(400).send({ message: "Email already in use!" });
    }
    //create user object base on type
    const userData = {
      name: name,
      email: email,
      password: password,
      type: type,
      isVerified: false,
    };
    if (type === "teacher") {
      userData.school = school;
      userData.phone = phone;
    }

    //create new user
    const user = await User.create(userData);
    //if user is a teacher, create and send verification email
    if (type === "teacher") {
      try {
        //create verification token
        const token = crypto.randomBytes(32).toString("hex");
        const verification = await db.VerificationToken.create({
          token: token,
          userId: user.id,
          expiredAt: new Date(Date.now() + 24 * 60 * 60 + 1000), //24h
        });
        console.log("Verification token created ", verification);

        await sendVerificationEmail(user.email, token, user.name);
        console.log("Verification email sent successfully!");
      } catch (err) {
        console.error("Verification token error:", err);
      }
    }
    res.status(201).send({
      message:
        user.type === "teacher"
          ? "Registration successfully! Please check your email to verify your account"
          : "User registered successfully!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        type: user.email,
        ...(user.type === "teacher" && { isVerified: user.isVerified }),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .send({ message: error.message || "Some error occurred" });
  }
};

const verifyEmail = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    res.status(400).send({ message: "Token is missing" });
  }
  try {
    const verificationToken = await db.VerificationToken.findOne({
      where: { token },
    });
    if (!verificationToken) {
      return res.status(404).send({ message: "Invalid verification token" });
    }
    //Check if token is expired
    if (new Date() > verificationToken.expiredAt) {
      await verificationToken.destroy();
      return res
        .status(400)
        .send({ message: "Verification token has expired" });
    }
    const user = await User.findByPk(verificationToken.userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    await user.update({ isVerified: true });
    await verificationToken.destroy();
    //return web view
    const htmlPath = path.join(
      process.cwd(),
      "views",
      "verification-success.html"
    );
    res.sendFile(htmlPath);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while verifying the user",
    });
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required!" });
    }

    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(404).send({ message: "User not fround!" });
    }
    const passwordIsvalid = await user.comparePassword(password);
    if (!passwordIsvalid) {
      return res.status(401).send({ message: "Invalid password" });
    }

    if (user.type === "teacher" && !user.isVerified) {
      return res
        .status(403)
        .send({ message: "Please verify your email to activate your account" });
    }

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 24 * 60 * 60, //86400 sec = 24h
    });

    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
    };
    if (user.type === "teacher") {
      userData.isVerified = user.isVerified;
      userData.phone = user.phone;
      userData.school = user.school;
    }

    return res.status(200).send({
      message: "Login successfully",
      user: userData,
      accessToken: token,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred while logging in user",
    });
  }
};

const authController = {
  signUp,
  signIn,
  verifyEmail,
};

export default authController;
