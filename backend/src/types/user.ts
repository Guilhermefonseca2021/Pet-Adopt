import { ObjectId } from "mongoose";

interface User {
  _id: ObjectId
  name: string;
  email: string;
  password: String;
  confirmpassword: string;
  image: Express.Multer.File;
  phone: number;
  createdAt: string;
  updatedAt: string;
}

