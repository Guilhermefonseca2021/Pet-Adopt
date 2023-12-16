import { Request, Response } from "express";
import Pet from "../models/pet";
import auth from "../config/auth";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { ObjectId } from "mongodb";
import petRoutes from "./../routes/PetRoutes";
import { UpdateData } from "../types/pet";

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

    if (!user) {
      return res.status(422).json({ message: "Please make a login first." });
    }

    const newPet = new Pet({
      name,
      age,
      description,
      weight,
      color,
      available,
      images: [],
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    await newPet.save();

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
    const pets = await Pet.find({}).sort("-createdAt");

    res.status(200).json({
      pets: pets,
    });
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllUserPet(req: Request, res: Response) {
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, auth.secret as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const pets = await Pet.find({ "user._id": user._id }).sort("-createdAt");

    return res.status(200).json({ pets: pets });
  } catch (err: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAllUserAdoptions(req: Request, res: Response) {
  const id = req.params.id;
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, auth.secret as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const pets = await Pet.find({ "adopter._id": user._id }).sort("-createdAt");

    return res.status(200).json({ pets });
  } catch (err: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPetById(req: Request, res: Response) {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(422).json({ message: "ID invalid" });
  }

  const pet = await Pet.findById(id);

  if (!pet) {
    return res.status(404).json({ message: "Pet not found." });
  }

  res.status(200).json({ pet: pet });
}

async function removePetById(req: Request, res: Response) {
  const id = req.params.id;
  const authHeader = req.headers.authorization;

  try {
    if (!authHeader) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, auth.secret as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({ message: "Something went wrong." });
    }

    res.status(200).json({ pet });
  } catch (err: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function updatePet(req: Request, res: Response) {
  const id = req.params.id;
  const { name, age, description, weight, color } = req.body;
  let images = (req.files as Express.Multer.File[]) || [];
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const decoded = jwt.verify(token, auth.secret as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    if (pet.user._id.toString() !== user._id.toString()) {
      return res.status(422).json({ message: "Something went wrong." });
    }

    if (!name || !age || !description || !weight || !color || !images) {
      return res.status(422).json({ message: "Please fill up all fields." });
    }

    let updateData = {
      name: name as string,
      description: description as string,
      color: color as string,
      age: age as number,
      weight: weight as number,
      images: [] as string[],
    };

    images.map((image) => {
      updateData.images.push(image.filename);
    });

    const updatedPet = await Pet.findByIdAndUpdate(id, updateData);

    res
      .status(200)
      .json({ message: "pet updated with successfully.", updatedPet });
  } catch (err: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function scheduleAdoption(req: Request, res: Response) {
  const id = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const decoded = jwt.verify(token, auth.secret as string) as { id: string };
    const user = await User.findById(decoded.id);

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    if (!user) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    if (pet.user._id.equals(user._id)) {
      return res
        .status(422)
        .json({ message: "Your pet cannot accept your own schedule." });
    }

    if (pet.adopter) {
      if (pet.adopter._id.equals(user._id)) {
        return res
          .status(422)
          .json({ message: "You already schedule." });
      }
      return
    }

    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image
    }

    await Pet.findByIdAndUpdate(id, pet)

    res.status(200).json({ message: 'Schedule with successfull contact the owner',pet })
  } catch (err: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function concludeAdoption(req: Request, res: Response) {
  const id = req.params.id;
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const decoded = jwt.verify(token, auth.secret as string) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(422)
        .json({ message: "Unauthorized token, please log in!" });
    }

    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ message: "Pet not found." });
    }

    pet.available = false;

    await Pet.findByIdAndUpdate(id, pet);

    res
      .status(200)
      .json({ messafge: "Adoption concludes, thanks for your interest." });
  } catch (err: any) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export {
  create,
  getAll,
  getAllUserPet,
  getAllUserAdoptions,
  getPetById,
  removePetById,
  updatePet,
  scheduleAdoption,
  concludeAdoption,
};
