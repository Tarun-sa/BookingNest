import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";

const router = express.Router();

// /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { email, password } = req.body;
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1d" },
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res
        .status(200)
        .json({ message: "User logged in successfully", userId: user._id });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
);
export default router;
