import { Request, Response } from "express";
import User from "../models/user";
import auth from "../config/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function createUser(req: Request, res: Response) {
  const { name, email, password, confirmpassword, image, phone } = req.body;

  try {
    if (!name || !email || !password || !confirmpassword || !phone) {
      return res.status(422).json({ message: "Fill up all fields." });
    }

    if (password !== confirmpassword) {
      return res.status(422).json({ message: "Passwords do not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists." });
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      image,
      phone,
    });

    const token = jwt.sign({ id: newUser._id }, auth.secret as string, {
      expiresIn: auth.expiresIn,
    });

    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      },
      token: token,
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(422).json({ message: "Fill up all fields." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(422).json({ message: "User do not exists." });
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return res.status(422).json({
        message: "Password Invalid.",
      });
    }

    const token = jwt.sign({ id: user._id }, auth.secret as string, {
      expiresIn: auth.expiresIn,
    });

    res
      .status(200)
      .json({ message: "Login successfully", token: token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { createUser, loginUser };
