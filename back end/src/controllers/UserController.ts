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

    res.status(200).json({ message: "Login successfully", token: token });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function checkUser(req: Request, res: Response) {
  let currentUser;

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, auth.secret as string) as { id: string };

    currentUser = await User.findById(decoded.id);

    currentUser?.password ?? undefined;
  } else {
    currentUser = null;
  }
  
  res.status(200).json(currentUser);
}

async function getUserById(req: Request, res: Response) {
  const id = req.params.id;

  const user = await User.findById(id).select("-password");

  if (!user) {
    return res.status(422).json({
      message: "User not found!",
    });
  }

  res.status(200).json(user);
}

async function editUser(req: Request, res: Response) {
  let currentUser;
  const id = req.params.id;
  const authHeader = req.headers.authorization;
  const { name, email, password, confirmpassword, phone } = req.body;
  let image = "";

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    
    if (!name || !email || !password || !confirmpassword || !phone) {
      return res.status(422).json({ message: "Fill up all fields." });
    }
    
    if (req.file) {
      user.image  = req.file.filename;
    }

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      const decoded = jwt.verify(token, auth.secret as string) as {
        id: string;
      };
      
      currentUser = await User.findById(decoded.id);

      currentUser?.password ?? undefined;
    } else {
      currentUser = null;
    }

    if (password != confirmpassword) {
      return res
        .status(422)
        .json({ message: "Make sure that confirmpassword is right." });
    } else if (password === confirmpassword && password != null) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();
    }

    const userExists = await User.findOne({ email: email });

    if (user?.email !== email && userExists) {
      return res.status(422).json({ message: "Email is already in use." });
    }

    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
      confirmpassword,
      image,
      phone,
    });
    
    res.status(200).json({
      message: "User updated",
      user: updatedUser,
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { createUser, loginUser, checkUser, getUserById, editUser };
