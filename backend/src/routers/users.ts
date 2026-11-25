import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

const router = express.Router();

// /api/users/register
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("firstName").isString().withMessage("First name should be a string"),
    body("lastName").isString().withMessage("Last name should be a string"),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        },
      );
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000, //1 day
      });
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Something went wrong" });
    }
  },
);

export default router;
