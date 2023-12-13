import { Request, Response } from "express";
import Pet from "../models/pet";
import auth from "../config/auth";
import jwt from "jsonwebtoken";
import User from "../models/user";

async function create(req: Request, res: Response) {
  const { name, age, description, weight, color } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  let images = (req.files as Express.Multer.File[]) || [];
  let available = true;

  try {
    if (!name || !age || !description || !weight || !color) {
      return res.status(422).json({ message: "please fill up all fields. " });
    }

    if (!token) {
      return res
        .status(422)
        .json({ message: "Please make a login first or create a account" });
    }

    const decoded = jwt.verify(token, auth.secret as string) as {
      id: string;
    };

    if (!images) {
      return res.status(422).json({ message: "Please send images." });
    }

    const user = await User.findById(decoded.id);

    const newPet = new Pet({
      name,
      description,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user?._id,
        name: user?.name,
        image: user?.image,
        phone: user?.phone,
      },
    });

    images.map((image) => {
      newPet.images.push(image?.filename);
    });

    res.status(201).json({
      message: "ta tudo certo.",
      newPet,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

async function getAll(req: Request, res: Response) {
  try {
    const pets = await Pet.find().sort("-createdAt");

    res.status(200).json({
      pets: pets,
    });
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { create, getAll };
